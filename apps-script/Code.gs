/** API uniquement : ne crée, ne supprime et ne réinitialise aucun onglet. */
var SPREADSHEET_ID = '1G6FRtZoj0bdDodSWvvXV3UmXXxYO87NgpaR8JWrxmvc';
var QUIZ_HEADERS = ['QUIZ_ID','ACTIF','ORDRE','TYPE','VERSION','SCORE_MIN','IDENTIFICATION','TITRE_FR','TITRE_PL','TITRE_PT','TITRE_AR','DESCRIPTION_FR','DESCRIPTION_PL','DESCRIPTION_PT','DESCRIPTION_AR'];
var QUESTION_HEADERS = ['QUIZ_ID','VERSION','QUESTION_ID','ORDRE','ACTIF','BONNE_REPONSE','POINTS','QUESTION_FR','REP_A_FR','REP_B_FR','REP_C_FR','REP_D_FR','EXPLICATION_FR','QUESTION_PL','REP_A_PL','REP_B_PL','REP_C_PL','REP_D_PL','EXPLICATION_PL','QUESTION_PT','REP_A_PT','REP_B_PT','REP_C_PT','REP_D_PT','EXPLICATION_PT','QUESTION_AR','REP_A_AR','REP_B_AR','REP_C_AR','REP_D_AR','EXPLICATION_AR'];
var RESULT_HEADERS = ['SESSION_ID','HORODATAGE','PARTICIPANT','MODE_IDENTIFICATION','LANGUE','QUIZ_ID','TITRE_QUIZ','VERSION','TENTATIVE','NB_QUESTIONS','POINTS_OBTENUS','POINTS_MAX','SCORE_PCT','SCORE_MIN','STATUT','DUREE_SEC'];
var ANSWER_HEADERS = ['SESSION_ID','HORODATAGE','PARTICIPANT','LANGUE','QUIZ_ID','VERSION','QUESTION_ID','ORDRE','QUESTION_TEXTE','REPONSE','REPONSE_TEXTE','BONNE_REPONSE','BONNE_REPONSE_TEXTE','CORRECT','POINTS'];
function output_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e) {
  try {
    var p = e.parameter || {};
    var lang = language_(p.language);
    if (p.action === 'listQuizzes') return output_({ok:true, data:list_(lang)});
    if (p.action === 'getQuiz') return output_({ok:true, data:getQuiz_(p.quizId, p.version, lang)});
    throw new Error('ACTION');
  } catch (err) { return output_({ok:false, error:String(err.message)}); }
}
function doPost(e) {
  try {
    if (!e.postData || e.postData.contents.length > 250000) throw new Error('SIZE');
    var p = JSON.parse(e.postData.contents);
    if (p.action !== 'submitAttempt') throw new Error('ACTION');
    return output_({ok:true, data:submit_(p)});
  } catch (err) { return output_({ok:false, error:String(err.message)}); }
}
function language_(lang) {
  if (['FR','PL','PT','AR'].indexOf(lang) < 0) throw new Error('LANGUAGE');
  return lang;
}
function table_(name, headers) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sheet) throw new Error('SCHEMA');
  var values = sheet.getDataRange().getValues();
  if (JSON.stringify(values[0]) !== JSON.stringify(headers)) throw new Error('SCHEMA');
  return {sheet:sheet, rows:values.slice(1).filter(function(r){return r[0] !== '';}).map(function(row){
    var o={}; headers.forEach(function(h,i){o[h]=row[i];}); return o;
  })};
}
function active_(value) { return value === true || String(value).toUpperCase() === 'TRUE'; }
function num_(value) { var n=Number(value); if (!isFinite(n)) throw new Error('CONFIGURATION'); return n; }
function versionCompare_(a,b) {
  var x=String(a).match(/\d+|\D+/g)||[], y=String(b).match(/\d+|\D+/g)||[];
  for(var i=0;i<Math.max(x.length,y.length);i++) {
    if(x[i]===undefined) return -1; if(y[i]===undefined) return 1;
    var d=/^\d+$/.test(x[i]) && /^\d+$/.test(y[i]) ? Number(x[i])-Number(y[i]) : x[i].localeCompare(y[i]);
    if(d) return d;
  } return 0;
}
function activeQuizzes_() {
  var byId=Object.create(null);
  table_('QUIZ',QUIZ_HEADERS).rows.forEach(function(q){
    if(!active_(q.ACTIF) || q.TYPE !== 'QCM') return;
    var previous=byId[q.QUIZ_ID];
    if(!previous || versionCompare_(q.VERSION,previous.VERSION)>0) byId[q.QUIZ_ID]=q;
  });
  return Object.keys(byId).map(function(id){return byId[id];}).sort(function(a,b){
    return num_(a.ORDRE)-num_(b.ORDRE) || String(a.QUIZ_ID).localeCompare(String(b.QUIZ_ID));
  });
}
function snapshot_(q,lang) {
  var questions=table_('QUESTIONS',QUESTION_HEADERS).rows.filter(function(r){
    return r.QUIZ_ID===q.QUIZ_ID && r.VERSION===q.VERSION && active_(r.ACTIF);
  }).sort(function(a,b){return num_(a.ORDRE)-num_(b.ORDRE);});
  if(!q['TITRE_'+lang] || !questions.length) return null;
  var seen=Object.create(null);
  var mapped=questions.map(function(r){
    if(seen[r.QUESTION_ID]) throw new Error('DUPLICATE_QUESTION'); seen[r.QUESTION_ID]=true;
    var answers=['A','B','C','D'].map(function(a){return String(r['REP_'+a+'_'+lang]||'');});
    if(!r['QUESTION_'+lang] || answers.some(function(a){return !a.trim();})) return null;
    var points=num_(r.POINTS);
    if(points<=0 || ['A','B','C','D'].indexOf(r.BONNE_REPONSE)<0) throw new Error('CONFIGURATION');
    return {id:String(r.QUESTION_ID),order:num_(r.ORDRE),text:String(r['QUESTION_'+lang]),answers:answers,
      correct:r.BONNE_REPONSE,points:points,explanation:String(r['EXPLICATION_'+lang]||'')};
  });
  if(mapped.some(function(r){return r===null;})) return null;
  var threshold=num_(q.SCORE_MIN);
  if(threshold<0 || threshold>1 || ['NOM','PSEUDO','ANONYME'].indexOf(q.IDENTIFICATION)<0) throw new Error('CONFIGURATION');
  return {id:q.QUIZ_ID,version:q.VERSION,type:q.TYPE,language:lang,title:String(q['TITRE_'+lang]),
    description:String(q['DESCRIPTION_'+lang]||''),identification:q.IDENTIFICATION,scoreMin:threshold,questions:mapped};
}
function list_(lang) {
  return activeQuizzes_().map(function(q){return snapshot_(q,lang);}).filter(Boolean).map(function(s){
    return {id:s.id,version:s.version,type:s.type,title:s.title,description:s.description};
  });
}
// Signature conservée uniquement dans les propriétés du script, jamais dans GitHub.
function secret_() {
  var properties=PropertiesService.getScriptProperties();
  var key=properties.getProperty('SNAPSHOT_SIGNING_KEY');
  if(key) return key;
  var lock=LockService.getScriptLock(); lock.waitLock(30000);
  try {
    key=properties.getProperty('SNAPSHOT_SIGNING_KEY');
    if(!key){key=Utilities.getUuid()+Utilities.getUuid();properties.setProperty('SNAPSHOT_SIGNING_KEY',key);}
    return key;
  } finally {lock.releaseLock();}
}
function sign_(body,key) {return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(body,key));}
function getQuiz_(id,version,lang) {
  var q=activeQuizzes_().filter(function(r){return r.QUIZ_ID===id && (!version || r.VERSION===version);})[0];
  if(!q) throw new Error('NOT_AVAILABLE');
  var s=snapshot_(q,lang); if(!s) throw new Error('NOT_TRANSLATED');
  var body=Utilities.base64EncodeWebSafe(JSON.stringify(s),Utilities.Charset.UTF_8);
  s.token=body+'.'+sign_(body,secret_()); return s;
}
function decode_(token) {
  if(typeof token!=='string' || token.length>200000) throw new Error('TOKEN');
  var parts=token.split('.'); if(parts.length!==2 || sign_(parts[0],secret_())!==parts[1]) throw new Error('TOKEN');
  return JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString('UTF-8'));
}
function safe_(value) {
  var text=String(value || ''); return /^[=+@-]/.test(text) ? "'"+text : text;
}
function append_(table,headers,objects) {
  if(!objects.length) return;
  var start=table.sheet.getLastRow()+1, end=start+objects.length-1;
  if(end>table.sheet.getMaxRows()) table.sheet.insertRowsAfter(table.sheet.getMaxRows(),end-table.sheet.getMaxRows());
  table.sheet.getRange(start,1,objects.length,headers.length).setValues(objects.map(function(o){
    return headers.map(function(h){return typeof o[h]==='string' ? safe_(o[h]) : o[h];});
  }));
  headers.forEach(function(h,i){
    if(h==='HORODATAGE') table.sheet.getRange(start,i+1,objects.length,1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    if(h==='SCORE_MIN' || h==='SCORE_PCT') table.sheet.getRange(start,i+1,objects.length,1).setNumberFormat('0.##%');
  });
}
function result_(r) {
  return {sessionId:r.SESSION_ID,score:r.SCORE_PCT,scoreMin:r.SCORE_MIN,status:r.STATUT,
    correct:r._correct,questions:r.NB_QUESTIONS,points:r.POINTS_OBTENUS,max:r.POINTS_MAX,attempt:r.TENTATIVE};
}
function submit_(p) {
  var s=decode_(p.token);
  if(!/^[0-9a-f-]{36}$/i.test(p.sessionId||'')) throw new Error('SESSION');
  if(!Number.isInteger(p.attempt) || p.attempt<1 || p.attempt>100000) throw new Error('ATTEMPT');
  if(!Number.isInteger(p.duration) || p.duration<0 || p.duration>31536000) throw new Error('DURATION');
  if(!Array.isArray(p.answers) || p.answers.length!==s.questions.length) throw new Error('ANSWERS');
  var participant=s.identification==='ANONYME' ? '' : String(p.participant||'').trim();
  if(s.identification!=='ANONYME' && (!participant || participant.length>150)) throw new Error('IDENTIFICATION');
  var points=0,max=0,correct=0;
  s.questions.forEach(function(q,i){
    if(['A','B','C','D'].indexOf(p.answers[i])<0) throw new Error('ANSWERS');
    max+=q.points; if(p.answers[i]===q.correct){points+=q.points;correct++;}
  });
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    var results=table_('RESULTATS',RESULT_HEADERS), responses=table_('REPONSES',ANSWER_HEADERS);
    var existing=results.rows.filter(function(r){return r.SESSION_ID===p.sessionId;})[0];
    if(existing){
      if(existing.QUIZ_ID!==s.id || existing.VERSION!==s.version || existing.LANGUE!==s.language) throw new Error('SESSION_CONFLICT');
      existing._correct=responses.rows.filter(function(r){return r.SESSION_ID===p.sessionId && active_(r.CORRECT);}).length;
      return result_(existing);
    }
    var partial=responses.rows.filter(function(r){return r.SESSION_ID===p.sessionId;});
    partial.forEach(function(r){
      var index=s.questions.findIndex(function(q){return q.id===r.QUESTION_ID;});
      if(index<0 || r.REPONSE!==p.answers[index] || r.VERSION!==s.version || r.QUIZ_ID!==s.id || r.LANGUE!==s.language) throw new Error('SESSION_CONFLICT');
    });
    var stamp=partial.length ? partial[0].HORODATAGE : new Date();
    var detail=s.questions.map(function(q,i){return {
      SESSION_ID:p.sessionId,HORODATAGE:stamp,PARTICIPANT:participant,LANGUE:s.language,QUIZ_ID:s.id,VERSION:s.version,
      QUESTION_ID:q.id,ORDRE:q.order,QUESTION_TEXTE:q.text,REPONSE:p.answers[i],
      REPONSE_TEXTE:q.answers['ABCD'.indexOf(p.answers[i])],BONNE_REPONSE:q.correct,
      BONNE_REPONSE_TEXTE:q.answers['ABCD'.indexOf(q.correct)],CORRECT:p.answers[i]===q.correct,
      POINTS:p.answers[i]===q.correct ? q.points : 0
    };}).filter(function(r){return !partial.some(function(old){return old.QUESTION_ID===r.QUESTION_ID;});});
    // Détails d'abord, résultat ensuite : une relance répare une écriture partielle.
    append_(responses,ANSWER_HEADERS,detail); SpreadsheetApp.flush();
    var r={SESSION_ID:p.sessionId,HORODATAGE:stamp,PARTICIPANT:participant,MODE_IDENTIFICATION:s.identification,
      LANGUE:s.language,QUIZ_ID:s.id,TITRE_QUIZ:s.title,VERSION:s.version,TENTATIVE:p.attempt,
      NB_QUESTIONS:s.questions.length,POINTS_OBTENUS:points,POINTS_MAX:max,SCORE_PCT:points/max,
      SCORE_MIN:s.scoreMin,STATUT:points/max>=s.scoreMin ? 'VALIDE' : 'A_REVOIR',DUREE_SEC:p.duration,_correct:correct};
    append_(results,RESULT_HEADERS,[r]);SpreadsheetApp.flush();return result_(r);
  } finally {lock.releaseLock();}
}
