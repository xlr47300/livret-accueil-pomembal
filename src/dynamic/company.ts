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
  FR: { POMEMBAL: 'Évaluations du personnel : nom et prénom obligatoires, résultats enregistrés pour le suivi de formation. L’entraînement reste en accès libre et non enregistré.', TRADIPOM: 'HACCP et formations liées à l’activité de Tradipom.', hygieneTitle: 'Entraînement — non enregistré', hygieneText: 'Hygiène et sécurité · 8 questions · entraînement avec correction immédiate.' },
  PL: { POMEMBAL: 'Oceny pracowników: imię i nazwisko są obowiązkowe, wyniki zapisywane do monitorowania szkoleń. Ćwiczenie jest dostępne bez zapisywania wyników.', TRADIPOM: 'HACCP i szkolenia związane z działalnością Tradipom.', hygieneTitle: 'Ćwiczenie — wynik nie jest zapisywany', hygieneText: 'Higiena i bezpieczeństwo · 8 pytań · ćwiczenie z natychmiastową informacją zwrotną.' },
  PT: { POMEMBAL: 'Avaliações do pessoal: nome e apelido obrigatórios, resultados guardados para acompanhamento da formação. O treino continua disponível sem guardar resultados.', TRADIPOM: 'HACCP e formações ligadas à atividade da Tradipom.', hygieneTitle: 'Treino — resultado não guardado', hygieneText: 'Higiene e segurança · 8 perguntas · treino com correção imediata.' },
  AR: { POMEMBAL: 'تقييمات العاملين: الاسم الكامل إلزامي وتُحفظ النتائج لمتابعة التدريب. يبقى التدريب متاحًا دون حفظ النتائج.', TRADIPOM: 'نظام HACCP والتدريبات المرتبطة بنشاط Tradipom.', hygieneTitle: 'تدريب — لا تُحفظ النتيجة', hygieneText: 'النظافة والسلامة · 8 أسئلة · تدريب مع تصحيح فوري.' },
};

