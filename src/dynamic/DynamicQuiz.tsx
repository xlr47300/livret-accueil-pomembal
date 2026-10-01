import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronRight, GraduationCap, ClipboardCheck, Route, PackageSearch } from 'lucide-react';
import type { LanguageCode } from '../content';
import { dynamicCopy } from './copy';
import { getQuiz, listQuizzes, submitAttempt } from './api';
import { nextAttempt, readPending, removePending, savePending } from './storage';
import CompanyBrand from '../CompanyBrand';
import { companyQuizCopy, quizCompany } from './company';
import type { Company, Letter, Pending, Questionnaire, QuizSummary, Result } from './types';

export default function DynamicQuiz({ language, visible, company, onHygieneQuiz, onTraining, haccpRequest = 0, traceRequest = 0 }: { language: LanguageCode; visible: boolean; company?: Company; onHygieneQuiz?: () => void; onTraining?: (quizId?: string) => void; haccpRequest?: number; traceRequest?: number }) {
  const labels = dynamicCopy[language];
  const sectionCopy = companyQuizCopy[language];
  const [list, setList] = useState<QuizSummary[]>([]);
  const [quiz, setQuiz] = useState<Questionnaire | null>(null);
  const [participant, setParticipant] = useState('');
  const [stage, setStage] = useState<'list' | 'identify' | 'questions' | 'result'>('list');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(Letter | null)[]>([]);
  const [pending, setPending] = useState<Pending[]>([]);
  const sectionPending = pending.filter(item => !company || quizCompany(item.quiz) === company);
  const [result, setResult] = useState<Result | null>(null);
  const [current, setCurrent] = useState<Pending | null>(null);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<'load' | 'local' | 'save' | null>(null);
  const [saved, setSaved] = useState(false);
  const [reload, setReload] = useState(0);
  const running = useRef(false);
  const loadId = useRef(0);
  const started = useRef(Date.now());
  const attempt = useRef(1);
  const sessionId = useRef('');
  const lastLanguage = useRef(language);
  const consumedRequest = useRef(0);
  const consumedTraceRequest = useRef(0);
  const effectiveLabels = labels;

  const refreshPending = () => {
    try { setPending(readPending()); } catch { setError('local'); }
  };
  useEffect(refreshPending, []);
  useEffect(() => {
    if (!visible) return;
    // A completed attempt keeps its original language and snapshot.
    // On a language change during a quiz, retain the answers by question ID.
    if (lastLanguage.current !== language && quiz && stage !== 'result') {
      const original = quiz;
      const oldAnswers = answers;
      const generation = ++loadId.current;
      setBusy(true); setError(null);
      getQuiz(original.id, original.version, language).then(updated => {
        if (generation !== loadId.current) return;
        setAnswers(updated.questions.map(q => oldAnswers[original.questions.findIndex(old => old.id === q.id)] || null));
        setQuiz(updated); setIndex(Math.min(index, updated.questions.length - 1));
        lastLanguage.current = language;
      }).catch(() => { if (generation === loadId.current) setError('load'); })
        .finally(() => { if (generation === loadId.current) setBusy(false); });
      return () => { loadId.current++; };
    }
    if (stage !== 'list') return;
    lastLanguage.current = language;
    const generation = ++loadId.current;
    setBusy(true); setError(null);
    listQuizzes(language).then(items => {
      if (generation === loadId.current) setList(items.filter(item => item.type === 'QCM' && (!company || quizCompany(item) === company)));
    }).catch(() => { if (generation === loadId.current) setError('load'); })
      .finally(() => { if (generation === loadId.current) setBusy(false); });
    return () => { loadId.current++; };
  // answers are intentionally captured only when a language change starts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, visible, stage, reload, company]);

  async function select(summary: QuizSummary) {
    const generation = ++loadId.current;
    setBusy(true); setError(null);
    try {
      const loaded = await getQuiz(summary.id, summary.version, language);
      if (generation !== loadId.current) return;
      setQuiz(loaded); setParticipant(''); setAnswers(loaded.questions.map(() => null)); setIndex(0);
      setCurrent(null); setResult(null); setSaved(false); lastLanguage.current = language;
      setStage('identify');
    } catch { if (generation === loadId.current) setError('load'); }
    finally { if (generation === loadId.current) setBusy(false); }
  }
  useEffect(() => {
    if (!visible) return;
    const trace = traceRequest !== consumedTraceRequest.current;
    const haccp = haccpRequest !== consumedRequest.current;
    if (!trace && !haccp) return;
    const targetId = trace ? 'TRACABILITE_TRADIPOM' : 'HACCP_TRADIPOM';
    consumedRequest.current = haccpRequest;
    consumedTraceRequest.current = traceRequest;
    if (quiz?.id === targetId) return;
    const generation = ++loadId.current;
    setBusy(true); setError(null);
    listQuizzes(language).then(items => {
      if (generation !== loadId.current) return;
      const target = items.find(item => item.id === targetId && item.type === 'QCM');
      if (!target) { setError('load'); setBusy(false); return; }
      void select(target);
    }).catch(() => { if (generation === loadId.current) { setError('load'); setBusy(false); } });
  // A new request selects once; revisiting the training keeps the current attempt.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, haccpRequest, traceRequest]);

  function start() {
    if (!quiz || running.current) return;
    try {
      attempt.current = nextAttempt(quiz.id, quiz.version, quiz.identification === 'ANONYME' ? '' : participant.trim());
      sessionId.current = crypto.randomUUID(); started.current = Date.now();
      setAnswers(quiz.questions.map(() => null)); setIndex(0); setResult(null); setCurrent(null);
      setSaved(false); setError(null); setStage('questions');
    } catch { setError('local'); }
  }
  async function send(item: Pending) {
    if (running.current) return;
    running.current = true; setSaving(true); setError(null);
    try {
      const confirmed = await submitAttempt(item.payload);
      // If removal fails the server has still saved it; a retry is idempotent.
      removePending(item.payload.sessionId); refreshPending();
      if (current?.payload.sessionId === item.payload.sessionId || sessionId.current === item.payload.sessionId) {
        setResult(confirmed); setSaved(true);
      }
    } catch { setError('save'); refreshPending(); }
    finally { running.current = false; setSaving(false); }
  }
  function complete() {
    if (!quiz || running.current || answers.some(a => !a)) return;
    let points = 0, max = 0, correct = 0;
    quiz.questions.forEach((q, i) => {
      max += q.points;
      if (answers[i] === q.correct) { points += q.points; correct++; }
    });
    const provisional: Result = { sessionId: sessionId.current, score: points / max, scoreMin: quiz.scoreMin,
      status: points / max >= quiz.scoreMin ? 'VALIDE' : 'A_REVOIR', correct, questions: quiz.questions.length,
      points, max, attempt: attempt.current };
    const item: Pending = { quiz, result: provisional, payload: {
      action: 'submitAttempt', sessionId: sessionId.current, token: quiz.token,
      participant: quiz.identification === 'ANONYME' ? '' : participant.trim(), attempt: attempt.current,
      duration: Math.max(0, Math.round((Date.now() - started.current) / 1000)), answers: answers as Letter[]
    } };
    try { savePending(item); refreshPending(); }
    catch { setError('local'); return; }
    setCurrent(item); setResult(provisional); setStage('result');
    void send(item);
  }
  function finish() {
    setStage('list'); setQuiz(null); setCurrent(null); setResult(null); setError(null); setSaved(false);
  }
  const q = quiz?.questions[index];
  const hub = ({
    FR: { title: 'Formations et évaluations Tradipom', learn: 'Se former', assess: 'Évaluer ses connaissances', intro: 'Consultez les supports de formation, puis vérifiez vos connaissances avec les quiz.', quiz: 'Commencer le quiz', note: 'Les résultats des quiz sont enregistrés pour le suivi de formation.' },
    PL: { title: 'Szkolenia i oceny Tradipom', learn: 'Szkolenia', assess: 'Sprawdź swoją wiedzę', intro: 'Zapoznaj się z materiałami szkoleniowymi, a następnie sprawdź swoją wiedzę w quizach.', quiz: 'Rozpocznij quiz', note: 'Wyniki quizów są zapisywane do monitorowania szkoleń.' },
    PT: { title: 'Formações e avaliações Tradipom', learn: 'Aprender', assess: 'Avaliar os conhecimentos', intro: 'Consulte os materiais de formação e depois verifique os seus conhecimentos com os questionários.', quiz: 'Começar o questionário', note: 'Os resultados são guardados para acompanhamento da formação.' },
    AR: { title: 'تدريبات وتقييمات Tradipom', learn: 'التعلّم', assess: 'تقييم المعرفة', intro: 'اطّلع على مواد التدريب ثم اختبر معرفتك بالاختبارات.', quiz: 'بدء الاختبار', note: 'تُحفظ نتائج الاختبارات لمتابعة التدريب.' },
  })[language];
  const quizCards = <div className="dynamic-list">{list.map(item => <button className="portal-card training" key={item.id} onClick={() => void select(item)}>
    <span className="portal-card-icon">{company === 'TRADIPOM' ? <ClipboardCheck /> : <GraduationCap />}</span>
    <span className="portal-card-copy">{company === 'TRADIPOM' && (item.id === 'HACCP_TRADIPOM' || item.id === 'TRACABILITE_TRADIPOM') && <span className="tradipom-module-tag">{item.id === 'HACCP_TRADIPOM' ? 'Module 01 · HACCP' : 'Module 02 · Traçabilité et alerte'}</span>}<strong>{item.title}</strong><small>{item.description}</small></span>
    <span className="portal-card-action">{company === 'TRADIPOM' ? hub.quiz : labels.start}<ChevronRight /></span>
  </button>)}</div>;

  return <div hidden={!visible}>
    <main className={`quiz-shell dynamic-quiz ${company === 'TRADIPOM' && stage === 'list' ? 'tradipom-hub' : ''}`} aria-busy={busy || saving}>
      {company === 'TRADIPOM' && onTraining && stage !== 'list' && (quiz?.id === 'HACCP_TRADIPOM' || quiz?.id === 'TRACABILITE_TRADIPOM') && <div className="tradipom-training-link" lang="fr" dir="ltr">
        <button className="secondary-button" onClick={() => onTraining(quiz?.id)}><GraduationCap size={20} /> {quiz?.id === 'TRACABILITE_TRADIPOM' ? 'Consulter la formation Traçabilité et alerte' : 'Consulter la formation HACCP'}</button>
      </div>}
      {stage === 'list' && <>
        <div className="section-heading company-quiz-heading">{company && <CompanyBrand company={company} />}<h1>{company === 'TRADIPOM' ? hub.title : `${labels.title}${company ? ' Pomembal' : ''}`}</h1><p>{company === 'TRADIPOM' ? hub.intro : company ? sectionCopy[company] : labels.description}</p></div>
        {company === 'POMEMBAL' && onHygieneQuiz && <div className="dynamic-list hygiene-quiz-entry"><button className="portal-card training" onClick={onHygieneQuiz}>
          <span className="portal-card-icon"><GraduationCap /></span>
          <span className="portal-card-copy"><strong>{sectionCopy.hygieneTitle}</strong><small>{sectionCopy.hygieneText}</small></span>
          <span className="portal-card-action">{labels.start}<ChevronRight /></span>
        </button></div>}
        {sectionPending.length > 0 && <section className="quiz-card pending-attempts">
          <h2>{labels.pending}</h2>
          {sectionPending.map(item => <div className="pending-row" key={item.payload.sessionId}>
            <span>{item.quiz.title} · {labels.attempt} {item.payload.attempt}</span>
            <button className="secondary-button" disabled={saving} onClick={() => void send(item)}>{labels.retry}</button>
          </div>)}
        </section>}
        {company === 'TRADIPOM' ? <div className="tradipom-hub-columns">
          <section className="tradipom-learn" aria-labelledby="tradipom-learn-title">
            <h2 id="tradipom-learn-title"><GraduationCap /> {hub.learn}</h2>
            <button className="tradipom-formation-card" onClick={() => onTraining?.('HACCP_TRADIPOM')} lang="fr" dir="ltr">
              <img src="/images/tradipom-haccp-infographie.webp" alt="Aperçu de l’infographie HACCP Tradipom" />
              <span className="tradipom-formation-copy"><span className="tradipom-formation-meta">10 à 15 min · Français · Consultation libre</span><span className="tradipom-module-tag">Module 01 · HACCP</span><strong>Formation HACCP</strong><span>Comprendre les dangers, maîtriser les risques et adopter les bons réflexes dans l’activité de Tradipom.</span><span className="tradipom-formation-action">Consulter la formation <ChevronRight /></span></span>
            </button>
            <button className="tradipom-formation-card traceability-formation-card" onClick={() => onTraining?.('TRACABILITE_TRADIPOM')} lang="fr" dir="ltr">
              <span className="traceability-card-visual" aria-hidden="true"><PackageSearch /><span>Fournisseur / station</span><Route /><span>Lot</span><Route /><span>Client</span></span>
              <span className="tradipom-formation-copy"><span className="tradipom-formation-meta">10 à 15 min · Français · Consultation libre</span><span className="tradipom-module-tag">Module 02 · Traçabilité et alerte</span><strong>Sécurité des aliments — Traçabilité et gestion d’une alerte</strong><span>Retrouver un lot, identifier les clients concernés et réagir avec les bonnes personnes.</span><span className="tradipom-formation-action">Consulter la formation <ChevronRight /></span></span>
            </button>
          </section>
          <section className="tradipom-assess" aria-labelledby="tradipom-assess-title">
            <h2 id="tradipom-assess-title"><ClipboardCheck /> {hub.assess}</h2><p className="tradipom-assess-note">{hub.note}</p>
            {busy && <p role="status">{labels.loading}</p>}
            {!busy && !error && (list.length ? quizCards : <p role="status">{labels.empty}</p>)}
          </section>
        </div> : <>
          {!busy && !error && list.length === 0 && !(company === 'POMEMBAL' && onHygieneQuiz) && <p role="status">{labels.empty}</p>}
          {!busy && !error && quizCards}
        </>}
      </>}
      {busy && !(company === 'TRADIPOM' && stage === 'list') && <p role="status">{labels.loading}</p>}
      {error && <div className="feedback learn" role="alert">
        <div><p>{error === 'local' ? labels.localError : error === 'save' ? labels.failed : labels.error}</p>
          {error === 'load' && <button className="text-button" onClick={() => { setStage('list'); setQuiz(null); setReload(n => n + 1); }}>{labels.back}</button>}
        </div>
      </div>}
      {stage === 'identify' && quiz && quiz.language === language && !busy && <form className="quiz-card" onSubmit={e => { e.preventDefault(); start(); }}>
        <h1>{quiz.title}</h1><p>{quiz.description}</p>
        {quiz.identification !== 'ANONYME' && <label className="quiz-identification">
          <span>{quiz.identification === 'NOM' ? effectiveLabels.name : effectiveLabels.pseudo}</span>
          <input autoComplete={quiz.identification === 'NOM' ? 'name' : 'off'} required maxLength={150}
            value={participant} onChange={e => setParticipant(e.target.value)} />
        </label>}
        <button className="primary-button quiz-next" disabled={quiz.identification !== 'ANONYME' && !participant.trim()}>{effectiveLabels.start}</button>
        <button type="button" className="text-button" onClick={finish}>{labels.back}</button>
      </form>}
      {stage === 'questions' && quiz && quiz.language === language && q && !busy && <>
        <div className="quiz-topline"><span>{effectiveLabels.position(index + 1, quiz.questions.length)}</span><span>{effectiveLabels.attempt} {attempt.current}</span></div>
        <div className="quiz-progress" role="progressbar" aria-label={effectiveLabels.position(index + 1, quiz.questions.length)}
          aria-valuemin={0} aria-valuemax={quiz.questions.length} aria-valuenow={index + 1}>
          <span style={{ width: `${(index + 1) / quiz.questions.length * 100}%` }} />
        </div>
        <section className="quiz-card" dir={quiz.language === 'AR' ? 'rtl' : 'ltr'} lang={quiz.language.toLowerCase()}>
          <p className="kicker plain">{effectiveLabels.choose}</p><h1>{q.text}</h1>
          <div className="answers">{q.answers.map((text, i) => {
            const letter = 'ABCD'[i] as Letter;
            return <button key={letter} className={answers[index] === letter ? 'selected' : ''} aria-pressed={answers[index] === letter}
              onClick={() => setAnswers(old => old.map((value, n) => n === index ? letter : value))}>
              <span>{letter}</span>{text}
            </button>;
          })}</div>
          <button className="primary-button quiz-next" disabled={!answers[index]}
            onClick={() => index === quiz.questions.length - 1 ? complete() : setIndex(i => i + 1)}>
            {index === quiz.questions.length - 1 ? effectiveLabels.submit : effectiveLabels.next}
          </button>
        </section>
      </>}
      {stage === 'result' && result && quiz && <section className="quiz-card" dir={language === 'AR' ? 'rtl' : 'ltr'} lang={language.toLowerCase()}>
        <div className="quiz-symbol"><CheckCircle2 /></div><h1>{quiz.title}</h1>
        <p className="dynamic-score">{new Intl.NumberFormat(quiz.language.toLowerCase(), { style:'percent', maximumFractionDigits:1 }).format(result.score)}</p>
        <h2>{result.status === 'VALIDE' ? effectiveLabels.valid : effectiveLabels.review}</h2>
        <p>{effectiveLabels.correct} : {result.correct} / {result.questions}</p>
        <p>{effectiveLabels.attempt} {result.attempt}</p>
        <p role="status">{saving ? effectiveLabels.saving : saved ? effectiveLabels.saved : effectiveLabels.provisional}</p>
        {!saved && !saving && current && <button className="secondary-button quiz-next" onClick={() => void send(current)}>{effectiveLabels.retry}</button>}
        <div className="dynamic-actions">
          <button className="primary-button" disabled={saving || !saved} onClick={start}>{effectiveLabels.restart}</button>
          <button className="secondary-button" disabled={saving} onClick={finish}>{effectiveLabels.finish}</button>
        </div>
      </section>}
    </main>
  </div>;
}

