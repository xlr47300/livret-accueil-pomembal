import type { LanguageCode } from '../content';
import type { Company, QuizSummary } from './types';

// Compatibility while the user updates the deployed Apps Script.
// New questionnaires use the explicit company selected in GESTION.
export function quizCompany(quiz: Pick<QuizSummary, 'id' | 'company'>): Company {
  return quiz.company || (/TRADIPOM/i.test(quiz.id) ? 'TRADIPOM' : 'POMEMBAL');
}
export const companyQuizCopy: Record<LanguageCode, {
  POMEMBAL: string; TRADIPOM: string; hygieneTitle: string; hygieneText: string;
}> = {
  FR: { POMEMBAL: 'Hygiène, sécurité et bons réflexes pour le personnel de la station.', TRADIPOM: 'HACCP et formations liées à l’activité de Tradipom.', hygieneTitle: 'Quiz des bons réflexes', hygieneText: 'Hygiène et sécurité · 8 questions · entraînement avec correction immédiate.' },
  PL: { POMEMBAL: 'Higiena, bezpieczeństwo i dobre praktyki dla pracowników zakładu.', TRADIPOM: 'HACCP i szkolenia związane z działalnością Tradipom.', hygieneTitle: 'Quiz dobrych praktyk', hygieneText: 'Higiena i bezpieczeństwo · 8 pytań · ćwiczenie z natychmiastową informacją zwrotną.' },
  PT: { POMEMBAL: 'Higiene, segurança e boas práticas para o pessoal da central.', TRADIPOM: 'HACCP e formações ligadas à atividade da Tradipom.', hygieneTitle: 'Questionário de boas práticas', hygieneText: 'Higiene e segurança · 8 perguntas · treino com correção imediata.' },
  AR: { POMEMBAL: 'النظافة والسلامة والممارسات الجيدة للعاملين في محطة التعبئة.', TRADIPOM: 'نظام HACCP والتدريبات المرتبطة بنشاط Tradipom.', hygieneTitle: 'اختبار الممارسات الجيدة', hygieneText: 'النظافة والسلامة · 8 أسئلة · تدريب مع تصحيح فوري.' },
};
