import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readdir, readFile, mkdir, writeFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { JSDOM } from 'jsdom';

// Actual React rendering and events in a DOM. Network is a controlled fixture.
// These are not browser layout tests or live Google/Cloudflare tests.
test('React : FR/PL/PT/AR, identification, RTL, retry persistant, nouvelle tentative, langue et quiz historique', async () => {
  const temp=await mkdtemp(path.resolve('.ui-test-'));
  async function compile(relative='') {
    for(const name of await readdir(path.join('src',relative))) {
      const rel=path.join(relative,name), source=path.join('src',rel);
      if((await stat(source)).isDirectory()) {await compile(rel);continue;}
      if(!/\.tsx?$/.test(name)) continue;
      const destination=path.join(temp,rel.replace(/\.tsx?$/,'.js'));
      let output=ts.transpileModule(await readFile(source,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
      output=output.replace(/(from\s+["'])(\.[^"']+)(["'])/g,(_,start,imported,end) => {
        // Match the existing file structure: relative imports target TS files or content/index.
        const target=imported.endsWith('/content') || imported==='./content' ? imported+'/index.js' : imported+'.js';
        return start+target+end;
      });
      await mkdir(path.dirname(destination),{recursive:true});await writeFile(destination,output);
    }
  }
  await compile();
  const dom=new JSDOM('<div id="root"></div>',{url:'https://portal.example',pretendToBeVisual:true});
  const globals={};
  for(const key of ['window','document','localStorage','HTMLElement','Event','MouseEvent','IS_REACT_ACT_ENVIRONMENT']) globals[key]=globalThis[key];
  globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.localStorage=dom.window.localStorage;
  globalThis.HTMLElement=dom.window.HTMLElement;globalThis.Event=dom.window.Event;globalThis.MouseEvent=dom.window.MouseEvent;
  globalThis.IS_REACT_ACT_ENVIRONMENT=true;
  dom.window.scrollTo=()=>{};
  const { default:React, act }=await import('react');
  const { createRoot }=await import('react-dom/client');
  const originalFetch=globalThis.fetch;
  const posts=[];let fail=false;
  const titles={FR:'Démo française',PL:'Polski quiz',PT:'Questionário português',AR:'اختبار تجريبي'};
  const quiz=language=>({id:'DEMO',version:'V1',type:'QCM',title:titles[language],description:'Description',language,
    identification:language==='PL'?'PSEUDO':language==='AR'?'ANONYME':'NOM',scoreMin:0.8,token:'fixture.'+language,
    questions:[{id:'Q1',order:1,text:titles[language]+' ?',answers:['Alpha','Bravo','Charlie','Delta'],correct:'B',points:1,explanation:'Explication'}]});
  globalThis.fetch=async (input,options={})=>{
    if(options.method==='POST') {
      const p=JSON.parse(options.body);posts.push(p);
      if(fail) throw new Error('offline');
      const correct=p.answers[0]==='B'?1:0;
      return Response.json({ok:true,data:{sessionId:p.sessionId,score:correct,scoreMin:0.8,status:correct?'VALIDE':'A_REVOIR',correct,questions:1,points:correct,max:1,attempt:p.attempt}});
    }
    const url=new URL(input,'https://portal.example'),language=url.searchParams.get('language');
    const q=quiz(language);
    return Response.json({ok:true,data:url.searchParams.get('action')==='getQuiz'?q:[q]});
  };
  const {default:DynamicQuiz}=await import(pathToFileURL(path.join(temp,'dynamic/DynamicQuiz.js')));
  const {dynamicCopy}=await import(pathToFileURL(path.join(temp,'dynamic/copy.js')));
  let root=createRoot(document.getElementById('root'));
  const tick=async()=>{await act(async()=>{await new Promise(resolve=>setTimeout(resolve,0));});};
  const render=async language=>{await act(async()=>root.render(React.createElement(DynamicQuiz,{language,visible:true})));await tick();};
  const click=async selector=>{
    const node=typeof selector==='string'?document.querySelector(selector):selector;
    assert.ok(node,'control exists');assert.equal(node.disabled,false,'control enabled');
    await act(async()=>node.click());await tick();
  };
  const button=text=>[...document.querySelectorAll('button')].find(n=>n.textContent.trim()===text && !n.closest('[hidden]'));
  const fill=async value=>{
    const input=document.querySelector('input');
    await act(async()=>{
      Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype,'value').set.call(input,value);
      input.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
      input.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
    });
    await tick();
  };
  try {
    // Anonymous AR path exercises RTL and all four response controls without input events.
    await render('AR');await click('.dynamic-list button');
    assert.equal(document.querySelector('input'),null);
    await click(button(dynamicCopy.AR.start));
    assert.equal(document.querySelector('.quiz-card').dir,'rtl');
    assert.equal(document.querySelectorAll('.answers button').length,4);
    await click(document.querySelectorAll('.answers button')[1]);
    fail=true;await click(button(dynamicCopy.AR.submit));
    assert.equal(posts.length,1);assert.equal(posts[0].participant,'');
    assert.ok(localStorage.getItem('pomembal.quiz.pending.v1').includes(posts[0].sessionId));
    const first=posts[0].sessionId;
    // Reload/remount; completed attempt persists and can be retried in another UI language.
    await act(async()=>root.unmount());root=createRoot(document.getElementById('root'));
    await render('FR');assert.ok(document.querySelector('.pending-row'));
    fail=false;await click(button(dynamicCopy.FR.retry));
    assert.equal(posts.at(-1).sessionId,first);
    assert.equal(JSON.parse(localStorage.getItem('pomembal.quiz.pending.v1')).length,0);
    for(const language of ['FR','PL','PT','AR']) {
      await render(language);assert.equal(document.querySelector('.dynamic-list strong').textContent,titles[language]);
    }
    await click('.dynamic-list button');await click(button(dynamicCopy.AR.start));
    await click(document.querySelectorAll('.answers button')[1]);await click(button(dynamicCopy.AR.submit));
    assert.equal(posts.at(-1).attempt,2);
    await click(button(dynamicCopy.AR.restart));
    await click(document.querySelectorAll('.answers button')[0]);await click(button(dynamicCopy.AR.submit));
    assert.equal(posts.at(-1).attempt,3);assert.notEqual(posts.at(-1).sessionId,posts.at(-2).sessionId);
    assert.ok(document.body.textContent.includes(dynamicCopy.AR.review));
    await click(button(dynamicCopy.AR.finish));await render('FR');await click('.dynamic-list button');
    assert.ok(document.body.textContent.includes(dynamicCopy.FR.name));
    assert.equal(document.querySelector('input').required,true);
    await fill('Jean Exemple');await click(button(dynamicCopy.FR.start));
    await click(document.querySelectorAll('.answers button')[1]);await click(button(dynamicCopy.FR.submit));
    assert.equal(posts.at(-1).participant,'Jean Exemple');
    await click(button(dynamicCopy.FR.finish));await render('PL');await click('.dynamic-list button');
    assert.ok(document.body.textContent.includes(dynamicCopy.PL.pseudo));
    // Change language during identification: same quiz, no new language question.
    await render('PT');assert.ok(document.body.textContent.includes(dynamicCopy.PT.name));
    assert.equal(document.querySelectorAll('input').length,1);
    await render('PL');await fill('Tester');await click(button(dynamicCopy.PL.start));
    await click(document.querySelectorAll('.answers button')[1]);
    await render('PT');
    assert.equal(document.querySelectorAll('.answers button')[1].getAttribute('aria-pressed'),'true');
    await click(button(dynamicCopy.PT.submit));
    assert.equal(posts.at(-1).participant,'Tester');
    assert.equal(posts.at(-1).token,'fixture.PT');
    await act(async()=>root.unmount());root=createRoot(document.getElementById('root'));
    const {default:App}=await import(pathToFileURL(path.join(temp,'App.js')));
    await act(async()=>root.render(React.createElement(App)));await tick();
    await click(button('Démarrer'));
    await click([...document.querySelectorAll('.language-card')].find(n=>n.textContent.includes('Français')));
    assert.ok(document.querySelector('.portal-card.evaluations'));
    await click('.portal-card.training');
    assert.equal(document.querySelectorAll('.theme-card').length,8);
    // Existing hygiene quiz remains reachable with its own content and feedback.
    await click(document.querySelector('.quiz-invite button'));
    assert.equal(document.querySelectorAll('.answers button').length,3);
    await click(document.querySelector('.answers button'));
    assert.ok(document.querySelector('.feedback'));
  } finally {
    await act(async()=>root.unmount());dom.window.close();globalThis.fetch=originalFetch;
    for(const key of Object.keys(globals)) {if(globals[key]===undefined) delete globalThis[key];else globalThis[key]=globals[key];}
    await rm(temp,{recursive:true,force:true});
  }
});
