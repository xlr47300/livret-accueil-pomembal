import type { LanguageCode } from '../content';
export type Letter = 'A' | 'B' | 'C' | 'D';
export type QuizSummary = { id: string; version: string; type: 'QCM' | 'SONDAGE'; title: string; description: string };
export type Question = { id: string; order: number; text: string; answers: string[]; correct: Letter; points: number; explanation: string };
export type Questionnaire = QuizSummary & { language: LanguageCode; identification: 'NOM' | 'PSEUDO' | 'ANONYME'; scoreMin: number; questions: Question[]; token: string };
export type Attempt = { action: 'submitAttempt'; sessionId: string; token: string; participant: string; attempt: number; duration: number; answers: Letter[] };
export type Result = { sessionId: string; score: number; scoreMin: number; status: 'VALIDE' | 'A_REVOIR'; correct: number; questions: number; points: number; max: number; attempt: number };
export type Pending = { payload: Attempt; quiz: Questionnaire; result: Result };
