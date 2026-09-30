import type { Pending } from './types';
const KEY = 'pomembal.quiz.pending.v1';
export function readPending(): Pending[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error('LOCAL_STORAGE');
  return data as Pending[];
}
export function savePending(item: Pending) {
  const items = readPending().filter(old => old.payload.sessionId !== item.payload.sessionId);
  localStorage.setItem(KEY, JSON.stringify([...items, item]));
}
export function removePending(id: string) {
  localStorage.setItem(KEY, JSON.stringify(readPending().filter(item => item.payload.sessionId !== id)));
}
export function nextAttempt(id: string, version: string, participant: string): number {
  const key = 'pomembal.quiz.attempt.' + JSON.stringify([id, version, participant]);
  const previous = Number(localStorage.getItem(key) || 0);
  const next = Number.isInteger(previous) && previous >= 0 ? previous + 1 : 1;
  localStorage.setItem(key, String(next));
  return next;
}
