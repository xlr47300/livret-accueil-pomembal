import type { LanguageCode } from "./types";

export type UiExtras = {
  welcome: {
    heroAlt: string;
    stamp: string;
    promiseLabel: string;
    promises: Array<{ title: string; text: string }>;
  };
  themeProgress: (completed: number) => string;
  progressText: (completed: number) => string;
  quizPosition: (current: number, total: number) => string;
  quizScore: (score: number) => string;
  quizProgressLabel: string;
  emergencyAlt: string;
  emergencyCaption: string;
};

export const uiExtrasByLanguage: Record<LanguageCode, UiExtras> = {
  FR: {
    welcome: {
      heroAlt: "Deux salariés en tenue d’hygiène dans une station de conditionnement",
      stamp: "Voir · Agir · Alerter",
      promiseLabel: "Objectifs de la sensibilisation",
      promises: [
        { title: "Voir", text: "une situation à risque" },
        { title: "Agir", text: "selon la règle du site" },
        { title: "Alerter", text: "sans attendre" },
      ],
    },
    themeProgress: (completed) => `${completed} / 8 thèmes terminés`,
    progressText: (completed) => `${completed} thème${completed > 1 ? "s" : ""} terminé${completed > 1 ? "s" : ""} sur 8`,
    quizPosition: (current, total) => `Question ${current} sur ${total}`,
    quizScore: (score) => `${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""}`,
    quizProgressLabel: "Progression du quiz",
    emergencyAlt: "Main actionnant un bouton d’arrêt d’urgence",
    emergencyCaption: "En cas de danger : arrêt si nécessaire, puis alerte.",
  },
  PL: {
    welcome: {
      heroAlt: "Dwoje pracowników w odzieży higienicznej w sortowni",
      stamp: "Zauważ · Działaj · Zgłaszaj",
      promiseLabel: "Cele szkolenia",
      promises: [
        { title: "Zauważ", text: "sytuację zagrożenia" },
        { title: "Działaj", text: "zgodnie z zasadą zakładu" },
        { title: "Zgłaszaj", text: "bez zwłoki" },
      ],
    },
    themeProgress: (completed) => `Ukończone tematy: ${completed} / 8`,
    progressText: (completed) => `Ukończono ${completed} z 8 tematów`,
    quizPosition: (current, total) => `Pytanie ${current} z ${total}`,
    quizScore: (score) => `Prawidłowe odpowiedzi: ${score}`,
    quizProgressLabel: "Postęp quizu",
    emergencyAlt: "Dłoń naciskająca wyłącznik awaryjny",
    emergencyCaption: "W razie zagrożenia: w razie potrzeby zatrzymaj, a następnie zaalarmuj.",
  },
  PT: {
    welcome: {
      heroAlt: "Dois trabalhadores com vestuário de higiene numa central de acondicionamento",
      stamp: "Ver · Agir · Alertar",
      promiseLabel: "Objetivos da sensibilização",
      promises: [
        { title: "Ver", text: "uma situação de risco" },
        { title: "Agir", text: "de acordo com a regra das instalações" },
        { title: "Alertar", text: "sem demora" },
      ],
    },
    themeProgress: (completed) => `${completed} / 8 temas concluídos`,
    progressText: (completed) => `${completed} de 8 temas concluídos`,
    quizPosition: (current, total) => `Pergunta ${current} de ${total}`,
    quizScore: (score) => `Respostas corretas: ${score}`,
    quizProgressLabel: "Progresso do questionário",
    emergencyAlt: "Mão a acionar um botão de paragem de emergência",
    emergencyCaption: "Em caso de perigo: pare, se necessário, e depois dê o alerta.",
  },
  AR: {
    welcome: {
      heroAlt: "عاملان يرتديان ملابس النظافة داخل محطة التعبئة",
      stamp: "لاحظ · تصرّف · أبلغ",
      promiseLabel: "أهداف التوعية",
      promises: [
        { title: "لاحظ", text: "حالة خطرة" },
        { title: "تصرّف", text: "وفق قاعدة الموقع" },
        { title: "أبلغ", text: "دون تأخير" },
      ],
    },
    themeProgress: (completed) => `${completed} / 8 مواضيع مكتملة`,
    progressText: (completed) => `اكتمل ${completed} من 8 مواضيع`,
    quizPosition: (current, total) => `السؤال ${current} من ${total}`,
    quizScore: (score) => `الإجابات الصحيحة: ${score}`,
    quizProgressLabel: "تقدم الاختبار",
    emergencyAlt: "يد تضغط زر إيقاف الطوارئ",
    emergencyCaption: "عند وجود خطر: أوقف عند الضرورة ثم أبلغ.",
  },
};
