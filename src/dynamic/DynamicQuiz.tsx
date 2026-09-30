import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import type { LanguageCode } from '../content';
import { dynamicCopy } from './copy';
import { getQuiz, listQuizzes, submitAttempt } from './api';
import { nextAttempt, readPending, removePending, savePending } from './storage';
import type { Letter, Pending, Questionnaire, QuizSummary, Result } from './types';

export default function DynamicQuiz({ language, visible }: { language: LanguageCode; visible: boolean }) {
  const labels = dynamicCopy[language];
  const [list, setList] = useState<QuizSummary[]>([]);
  const [quiz, setQuiz] = useState<Questionnaire | null>(null);
  const [participant, setParticipant] = useState('');
  const [stage, setStage] = useState<'list' | 'identify' | 'questions' | 'result'>('list');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(Letter | null)[]>([]);
  const [pending, setPending] = useState<Pending[]>([]);
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
      if (generation === loadId.current) setList(items.filter(item => item.type === 'QCM'));
    }).catch(() => { if (generation === loadId.current) setError('load'); })
      .finally(() => { if (generation === loadId.current) setBusy(false); });
    return () => { loadId.current++; };
  // answers are intentionally captured only when a language change starts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, visible, stage, reload]);

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
  return <div hidden={!visible}>
    <main className="quiz-shell dynamic-quiz" aria-busy={busy || saving}>
      {stage === 'list' && <>
        <div className="section-heading"><h1>{labels.title}</h1><p>{labels.description}</p></div>
        {pending.length > 0 && <section className="quiz-card pending-attempts">
          <h2>{labels.pending}</h2>
          {pending.map(item => <div className="pending-row" key={item.payload.sessionId}>
            <span>{item.quiz.title} · {labels.attempt} {item.payload.attempt}</span>
            <button className="secondary-button" disabled={saving} onClick={() => void send(item)}>{labels.retry}</button>
          </div>)}
        </section>}
        {!busy && !error && list.length === 0 && <p role="status">{labels.empty}</p>}
        {!busy && !error && <div className="dynamic-list">{list.map(item => <button className="portal-card training" key={item.id} onClick={() => void select(item)}>
          <span className="portal-card-icon"><GraduationCap /></span>
          <span className="portal-card-copy"><strong>{item.title}</strong><small>{item.description}</small></span>
          <span className="portal-card-action">{labels.start}<ChevronRight /></span>
        </button>)}</div>}
      </>}
      {busy && <p role="status">{labels.loading}</p>}
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
