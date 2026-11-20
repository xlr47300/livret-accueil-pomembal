import type { LanguageCode } from '../content';

// The training quiz is deliberately not recorded; only the named assessment is.
export const assessmentPathCopy: Record<LanguageCode, {
  practiceNotice: string;
  practiceFinished: string;
  officialButton: string;
  officialHint: string;
  practiceLabel: string;
  leaveWarning: string;
}> = {
  FR: {
    practiceNotice: 'Entraînement uniquement : ce quiz ne demande pas votre nom et ses réponses ne sont pas enregistrées dans le suivi des formations.',
    practiceFinished: 'Vous avez terminé le quiz d’entraînement. Ce résultat n’est pas enregistré. Pour valider votre formation, passez l’évaluation nominative.',
    officialButton: 'Passer l’évaluation officielle',
    officialHint: 'Nom et prénom obligatoires. Votre évaluation est validée dans le suivi uniquement après confirmation de son enregistrement.',
    practiceLabel: 'Quiz d’entraînement (non enregistré)',
    leaveWarning: 'L’évaluation n’a pas encore été enregistrée. Quitter maintenant peut retarder son envoi. Les réponses envoyées restent en attente sur cet appareil, si son stockage est disponible. Quitter malgré tout ?',
  },
  PL: {
    practiceNotice: 'To tylko ćwiczenie: ten quiz nie wymaga imienia i nazwiska, a odpowiedzi nie są zapisywane w rejestrze szkoleń.',
    practiceFinished: 'Quiz ćwiczeniowy został ukończony, ale wynik nie został zapisany. Aby potwierdzić ukończenie szkolenia, wypełnij ocenę imienną.',
    officialButton: 'Przejdź do oficjalnej oceny',
    officialHint: 'Wpisz imię i nazwisko. Wynik zostanie uwzględniony w rejestrze dopiero po potwierdzeniu zapisu.',
    practiceLabel: 'Quiz ćwiczeniowy (bez zapisu)',
    leaveWarning: 'Ocena nie została jeszcze zapisana. Wyjście teraz może opóźnić wysłanie odpowiedzi. Jeśli pamięć urządzenia działa, odpowiedzi pozostaną tutaj do ponownej próby. Czy mimo to wyjść?',
  },
  PT: {
    practiceNotice: 'Apenas para treino: este questionário não pede o seu nome e as respostas não são registadas no acompanhamento da formação.',
    practiceFinished: 'Terminou o questionário de treino. Este resultado não foi registado. Para validar a formação, faça a avaliação com identificação.',
    officialButton: 'Fazer a avaliação oficial',
    officialHint: 'Nome e apelido obrigatórios. O resultado só conta para o acompanhamento após a confirmação do registo.',
    practiceLabel: 'Questionário de treino (sem registo)',
    leaveWarning: 'A avaliação ainda não foi guardada. Sair agora pode atrasar o envio. Se o armazenamento deste dispositivo estiver disponível, as respostas ficarão pendentes. Quer sair mesmo assim?',
  },
  AR: {
    practiceNotice: 'هذا اختبار للتدريب فقط: لا يطلب الاسم ولا تُحفظ الإجابات في سجل متابعة التدريب.',
    practiceFinished: 'أكملت اختبار التدريب، لكن نتيجته غير مسجلة. لاعتماد التدريب، يرجى إجراء التقييم الرسمي باسمك.',
    officialButton: 'بدء التقييم الرسمي',
    officialHint: 'الاسم الكامل إلزامي. لا تُعتمد النتيجة في سجل التدريب إلا بعد تأكيد الحفظ.',
    practiceLabel: 'اختبار تدريبي (غير مسجل)',
    leaveWarning: 'لم يتم حفظ التقييم بعد. قد يؤخر المغادرة الآن إرسال الإجابات. ستبقى الإجابات معلقة على هذا الجهاز إذا كان التخزين متاحًا. هل تريد المغادرة رغم ذلك؟',
  },
};
