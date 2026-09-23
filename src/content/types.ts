export type LanguageCode = "FR" | "PL" | "PT" | "AR";

export type ThemeId =
  | "entree"
  | "mains"
  | "sante"
  | "allergenes"
  | "fruits"
  | "nettoyage"
  | "securite"
  | "urgence";

export type Theme = {
  id: ThemeId;
  number: string;
  title: string;
  description: string;
  color: "green" | "teal" | "orange" | "red";
  available: boolean;
  image?: string;
  imageAlt?: string;
  sections?: Array<{
    eyebrow?: string;
    title: string;
    items?: string[];
    statement?: string;
    tone?: "light" | "navy" | "warning";
    colorGroups?: Array<{
      title: string;
      entries: Array<{ label: string; color: string; border?: boolean }>;
    }>;
  }>;
};

export type QuizQuestion = {
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
  wrongExplanation?: string;
};

export type LocaleContent = {
  code: LanguageCode;
  direction: "ltr" | "rtl";
  themes: Theme[];
  quizQuestions: QuizQuestion[];
  essentialReflexes: string[];
};
