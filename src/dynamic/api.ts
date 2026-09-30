import type { Attempt, Questionnaire, QuizSummary, Result } from './types';
import type { LanguageCode } from '../content';
export async function request<T>(params: Record<string, string> | Attempt): Promise<T> {
  const post = params.action === 'submitAttempt';
  const query = post ? '' : '?' + new URLSearchParams(params as Record<string, string>);
  const response = await fetch('/api/quiz' + query, {
    method: post ? 'POST' : 'GET', cache: 'no-store',
    headers: post ? { 'Content-Type': 'application/json' } : undefined,
    body: post ? JSON.stringify(params) : undefined,
    signal: AbortSignal.timeout(35000)
  });
  const body = await response.json();
  if (!response.ok || !body.ok) throw new Error(body.error || 'NETWORK');
  return body.data as T;
}
export const listQuizzes = (language: LanguageCode) => request<QuizSummary[]>({ action: 'listQuizzes', language });
export const getQuiz = (id: string, version: string, language: LanguageCode) => request<Questionnaire>({ action: 'getQuiz', quizId: id, version, language });
export const submitAttempt = (attempt: Attempt) => request<Result>(attempt);
