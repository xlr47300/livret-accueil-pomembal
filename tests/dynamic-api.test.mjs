import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createHmac, randomUUID } from 'node:crypto';
import { onRequest } from '../functions/api/quiz.js';

function backend() {
  const sheets = new Map();
  let failure = false;
  const properties = new Map();
  const context = vm.createContext({
    console, Date, JSON, Number, String, Object, Array, Set, Math, isFinite,
    SpreadsheetApp: { openById: () => ({ getSheetByName: name => sheets.get(name) }), flush() {} },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key), setProperty: (key, value) => properties.set(key, value) }) },
    Utilities: {
      getUuid: randomUUID, Charset: { UTF_8:'UTF-8' },
      base64EncodeWebSafe: value => Buffer.from(value).toString('base64url'),
      base64DecodeWebSafe: value => Buffer.from(value, 'base64url'),
      computeHmacSha256Signature: (body, key) => createHmac('sha256', key).update(body).digest(),
      newBlob: bytes => ({ getDataAsString: () => Buffer.from(bytes).toString('utf8') })
    },
    ContentService: { MimeType: { JSON:'application/json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) }
  });
  vm.runInContext(readFileSync('apps-script/Code.gs','utf8'), context);
  for (const [name, header] of [['QUIZ', 'QUIZ_HEADERS'], ['QUESTIONS', 'QUESTION_HEADERS'], ['RESULTATS','RESULT_HEADERS'], ['REPONSES','ANSWER_HEADERS']]) {
    const headers = [...context[header]];
    const values = [headers];
    const sheet = {
      values, getDataRange: () => ({ getValues: () => values.map(row => [...row]) }),
      getLastRow: () => values.length, getMaxRows: () => 1000, insertRowsAfter() {},
      getRange: (start, col, rows, columns) => ({ setNumberFormat() {}, setValues: data => {
        if (name === 'RESULTATS' && failure) { failure = false; throw new Error('SIMULATED_FAILURE'); }
        data.forEach((row,i) => { values[start - 1 + i] = [...row]; });
      } })
    };
    sheets.set(name, sheet);
  }
  const insert = (name, object) => {
    const sheet = sheets.get(name);
    sheet.values.push(sheet.values[0].map(key => object[key] ?? ''));
  };
  insert('QUIZ', { QUIZ_ID:'DEMO', ACTIF:true, ORDRE:1, TYPE:'QCM', VERSION:'V1', SCORE_MIN:0.8, IDENTIFICATION:'NOM', TITRE_FR:'Démo', DESCRIPTION_FR:'Test' });
  insert('QUESTIONS', { QUIZ_ID:'DEMO', VERSION:'V1', QUESTION_ID:'Q1', ORDRE:1, ACTIF:true, BONNE_REPONSE:'B', POINTS:1,
    QUESTION_FR:'Question ?', REP_A_FR:'A', REP_B_FR:'Bonne réponse', REP_C_FR:'C', REP_D_FR:'D', EXPLICATION_FR:'Explication' });
  const get = params => context.doGet({ parameter:params });
  const submit = data => context.doPost({ postData:{ contents:JSON.stringify(data) } });
  const payload = quiz => ({ action:'submitAttempt', token:quiz.token, sessionId:randomUUID(), participant:'Jean Exemple', answers:['B'], attempt:1, duration:10 });
  return { context, sheets, insert, get, submit, payload, fail:() => { failure = true; } };
}

test('liste : langue disponible, ordre, version active unique et QCM uniquement', () => {
  const b = backend();
  assert.equal(b.get({ action:'listQuizzes', language:'FR' }).data.length,1);
  for (const language of ['PL','PT','AR']) assert.equal(b.get({ action:'listQuizzes', language }).data.length,0);
  for (const version of ['V2','V10']) {
    b.insert('QUIZ', { QUIZ_ID:'DEMO', ACTIF:true, ORDRE:1, TYPE:'QCM', VERSION:version, SCORE_MIN:0.8, IDENTIFICATION:'ANONYME', TITRE_FR:version });
    b.insert('QUESTIONS', { QUIZ_ID:'DEMO', VERSION:version, QUESTION_ID:'Q1', ORDRE:1, ACTIF:true, BONNE_REPONSE:'A', POINTS:1,
      QUESTION_FR:'Autre ?', REP_A_FR:'A', REP_B_FR:'B', REP_C_FR:'C', REP_D_FR:'D' });
  }
  b.insert('QUIZ',{ QUIZ_ID:'SONDAGE', ACTIF:true, TYPE:'SONDAGE', VERSION:'V1' });
  const items=b.get({ action:'listQuizzes', language:'FR' }).data;
  assert.equal(items.length,1); assert.equal(items[0].version,'V10');
});

test('instantané et score préservés après modification du Sheet ; relance sans doublon', () => {
  const b=backend(), quiz=b.get({ action:'getQuiz', quizId:'DEMO', language:'FR' }).data;
  const p=b.payload(quiz);
  const question=b.sheets.get('QUESTIONS');
  question.values[1][question.values[0].indexOf('QUESTION_FR')]='Nouveau texte';
  question.values[1][question.values[0].indexOf('BONNE_REPONSE')]='A';
  const first=b.submit(p);
  assert.equal(first.ok,true); assert.equal(first.data.score,1); assert.equal(first.data.correct,1);
  assert.equal(b.submit(p).data.score,1);
  assert.equal(b.sheets.get('RESULTATS').values.length,2);
  const answers=b.sheets.get('REPONSES').values;
  assert.equal(answers.length,2);
  assert.equal(answers[1][answers[0].indexOf('QUESTION_TEXTE')],'Question ?');
  assert.equal(answers[1][answers[0].indexOf('BONNE_REPONSE')],'B');
});

test('écriture partielle réparée ; tentative suivante distincte ; score insuffisant', () => {
  const b=backend(), quiz=b.get({action:'getQuiz',quizId:'DEMO',language:'FR'}).data, p=b.payload(quiz);
  b.fail(); assert.equal(b.submit(p).ok,false);
  assert.equal(b.sheets.get('REPONSES').values.length,2);
  assert.equal(b.sheets.get('RESULTATS').values.length,1);
  assert.equal(b.submit(p).ok,true);
  assert.equal(b.sheets.get('REPONSES').values.length,2);
  const next={...p, sessionId:randomUUID(), answers:['A'], attempt:2};
  assert.equal(b.submit(next).data.status,'A_REVOIR');
  assert.equal(b.sheets.get('RESULTATS').values.length,3);
});

test('refuse signature modifiée, réponses invalides ; neutralise les formules', () => {
  const b=backend(), quiz=b.get({action:'getQuiz',quizId:'DEMO',language:'FR'}).data, p=b.payload(quiz);
  assert.equal(b.submit({...p,token:p.token+'x'}).ok,false);
  assert.equal(b.submit({...p,answers:['Z']}).ok,false);
  assert.equal(b.sheets.get('RESULTATS').values.length,1);
  assert.equal(b.submit({...p,participant:'=IMPORTXML("x")'}).ok,true);
  const values=b.sheets.get('RESULTATS').values;
  assert.equal(values[1][values[0].indexOf('PARTICIPANT')], "'=IMPORTXML(\"x\")");
});

test('proxy : configuration manquante, actions interdites, origine étrangère', async () => {
  assert.equal((await onRequest({request:new Request('https://example.com/api/quiz'),env:{}})).status,503);
  const env={APPS_SCRIPT_URL:'https://script.google.com/macros/s/DEMO/exec'};
  assert.equal((await onRequest({request:new Request('https://example.com/api/quiz?action=delete'),env})).status,400);
  assert.equal((await onRequest({request:new Request('https://example.com/api/quiz',{method:'POST',headers:{Origin:'https://evil.example'},body:'{}'}),env})).status,403);
});

test('proxy : GET et POST, redirects suivis et erreurs Google/connexion', async () => {
  const original=globalThis.fetch;
  const env={APPS_SCRIPT_URL:'https://script.google.com/macros/s/DEMO/exec'};
  try {
    globalThis.fetch=async (url,options) => {
      assert.equal(options.redirect,'follow');
      assert.ok(url.startsWith(env.APPS_SCRIPT_URL));
      if(options.method==='POST') assert.equal(JSON.parse(options.body).action,'submitAttempt');
      return Response.json({ok:true,data:[]});
    };
    for(const method of ['GET','POST']) {
      const request=new Request('https://example.com/api/quiz?action=listQuizzes&language=FR',{
        method,body:method==='POST' ? JSON.stringify({action:'submitAttempt'}) : undefined
      });
      assert.equal((await onRequest({request,env})).status,200);
    }
    globalThis.fetch=async () => new Response('<html>Connexion Google</html>');
    assert.equal((await onRequest({request:new Request('https://example.com/api/quiz?action=listQuizzes'),env})).status,502);
    globalThis.fetch=async () => {throw new Error('offline');};
    assert.equal((await onRequest({request:new Request('https://example.com/api/quiz?action=listQuizzes'),env})).status,502);
  } finally {globalThis.fetch=original;}
});

test('seuil 80 % : 6/8 à revoir, 7/8 validé ; anonyme sans nom et points pondérés', () => {
  const b=backend();
  for(let i=2;i<=8;i++) b.insert('QUESTIONS', { QUIZ_ID:'DEMO', VERSION:'V1', QUESTION_ID:'Q'+i, ORDRE:i, ACTIF:true, BONNE_REPONSE:'B', POINTS:1,
    QUESTION_FR:'Question '+i, REP_A_FR:'A', REP_B_FR:'B', REP_C_FR:'C', REP_D_FR:'D' });
  const quiz=b.get({action:'getQuiz',quizId:'DEMO',language:'FR'}).data;
  const p=b.payload(quiz);
  const six=b.submit({...p,answers:['B','B','B','B','B','B','A','A']}).data;
  assert.equal(six.score,0.75);assert.equal(six.status,'A_REVOIR');
  const seven=b.submit({...p,sessionId:randomUUID(),attempt:2,answers:['B','B','B','B','B','B','B','A']}).data;
  assert.equal(seven.score,0.875);assert.equal(seven.status,'VALIDE');
  const sheet=b.sheets.get('QUIZ');sheet.values[1][sheet.values[0].indexOf('IDENTIFICATION')]='ANONYME';
  const anonymous=b.get({action:'getQuiz',quizId:'DEMO',language:'FR'}).data;
  assert.equal(b.submit({...b.payload(anonymous),participant:'Ignored',answers:Array(8).fill('B')}).ok,true);
  const results=b.sheets.get('RESULTATS').values;
  assert.equal(results.at(-1)[results[0].indexOf('PARTICIPANT')],'');
  const questions=b.sheets.get('QUESTIONS');questions.values[1][questions.values[0].indexOf('POINTS')]=2;
  const weighted=b.get({action:'getQuiz',quizId:'DEMO',language:'FR'}).data;
  const result=b.submit({...b.payload(weighted),answers:['A','B','B','B','B','B','B','B']}).data;
  assert.equal(result.points,7);assert.equal(result.max,9);assert.equal(result.status,'A_REVOIR');
});
