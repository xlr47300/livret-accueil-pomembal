// Real HTTPS calls to the deployed Cloudflare site; no API mock.
// Optional --write-test creates one clearly named test attempt in the Sheet.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
const site = process.argv[2];
if (!site || !/^https:\/\//.test(site)) throw new Error('Usage: node scripts/test-live-quiz.mjs https://votre-site [--write-test]');
const base = new URL('/api/quiz', site);
async function call(params) {
  const post = params.action === 'submitAttempt';
  const url = new URL(base);
  if (!post) url.search = new URLSearchParams(params);
  const response = await fetch(url, {
    method: post ? 'POST' : 'GET',
    headers: post ? { 'Content-Type':'application/json', Origin:base.origin } : undefined,
    body: post ? JSON.stringify(params) : undefined,
    signal: AbortSignal.timeout(40000)
  });
  assert.equal(response.headers.get('Content-Type')?.includes('application/json'),true,'API JSON attendue, et non page HTML');
  const body=await response.json();
  assert.equal(response.ok,true,JSON.stringify(body));assert.equal(body.ok,true,JSON.stringify(body));return body.data;
}
for (const language of ['FR','PL','PT','AR']) {
  const list=await call({action:'listQuizzes',language});
  assert.ok(Array.isArray(list));
  assert.equal(new Set(list.map(q=>q.id)).size,list.length);
  console.log(language+': '+list.length+' quiz disponible(s)');
}
const list=await call({action:'listQuizzes',language:'FR'});
const summary=list.find(q=>q.id==='HACCP_TRADIPOM');
assert.ok(summary,'HACCP_TRADIPOM actif et traduit en FR attendu');
const quiz=await call({action:'getQuiz',quizId:summary.id,version:summary.version,language:'FR'});
assert.ok(quiz.token && quiz.questions.length>0);
console.log('Lecture réelle Cloudflare → Apps Script → Sheet : OK');
if (process.argv.includes('--write-test')) {
  const payload={action:'submitAttempt',sessionId:randomUUID(),token:quiz.token,participant:'TEST TECHNIQUE PORTAIL',
    attempt:1,duration:1,answers:quiz.questions.map(q=>q.correct)};
  const result=await call(payload);
  assert.equal(result.sessionId,payload.sessionId);assert.equal(result.score,1);assert.equal(result.correct,quiz.questions.length);
  const retry=await call(payload);assert.deepEqual(retry,result);
  console.log('Écriture réelle et relance : OK. SESSION_ID='+payload.sessionId);
  console.log('Vérifier dans le Sheet une seule ligne RESULTATS et '+quiz.questions.length+' lignes REPONSES pour cette session.');
} else {
  console.log('Écriture non testée. Ajouter --write-test pour créer une tentative TEST TECHNIQUE PORTAIL.');
}
