import { ar, arCopy } from "./ar";
import { fr, frCopy } from "./fr";
import { pl, plCopy } from "./pl";
import { pt, ptCopy } from "./pt";
import type { LanguageCode, LocaleContent } from "./types";

export { ar, arCopy, fr, frCopy, pl, plCopy, pt, ptCopy };
export type { LanguageCode, LocaleContent, QuizQuestion, Theme, ThemeId } from "./types";

type WidenStrings<T> = T extends string
  ? string
  : T extends object
    ? { [Key in keyof T]: WidenStrings<T[Key]> }
    : T;

export type SiteCopy = WidenStrings<typeof frCopy>;

export const contentByLanguage: Record<LanguageCode, LocaleContent> = { FR: fr, PL: pl, PT: pt, AR: ar };
export const copyByLanguage: Record<LanguageCode, SiteCopy> = { FR: frCopy, PL: plCopy, PT: ptCopy, AR: arCopy };

export const languages = [
  { code: "FR" as const, native: "Français", active: true, direction: "ltr" as const },
  { code: "PL" as const, native: "Polski", active: true, direction: "ltr" as const },
  { code: "PT" as const, native: "Português", active: true, direction: "ltr" as const },
  { code: "AR" as const, native: "العربية", active: true, direction: "rtl" as const },
];
