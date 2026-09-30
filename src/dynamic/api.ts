import type { Attempt, Questionnaire, QuizSummary, Result } from './types';
import type { LanguageCode } from '../content';
export async function request<T>(params: Record<string, string> | Attempt): Promise<T> {
  const post = params.action === 'submitAttempt';
  const query = post ? '' : '?' + new URLSearchParams(params as Record<string, string>);
  const response = await fetch('/api/quiz' + query, {
    method: post ? 'POST' : 'GET', cache: 'no-store',
    headers: post ? { 'Content-Type': 'application/json' } : undefined,
    body: post ? JSON.stringify(params) : undefined,
    signal: AbortSignal.timeout(65000)
  });
  const body = await response.json();
  if (!response.ok || !body.ok) throw new Error(body.error || 'NETWORK');
  return body.data as T;
}
const lists = new Map<LanguageCode, { expires: number; promise: Promise<QuizSummary[]> }>();
export const listQuizzes = (language: LanguageCode) => {
  const cached = lists.get(language);
  if (cached && cached.expires > Date.now()) return cached.promise;
  const promise = request<QuizSummary[]>({ action: 'listQuizzes', language }).catch(error => {
    lists.delete(language); throw error;
  });
  lists.set(language, { expires: Date.now() + 30000, promise });
  return promise;
};
export const getQuiz = (id: string, version: string, language: LanguageCode) => request<Questionnaire>({ action: 'getQuiz', quizId: id, version, language });
export const submitAttempt = (attempt: Attempt) => request<Result>(attempt);
