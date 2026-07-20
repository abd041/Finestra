import { en } from "./en";
import { nl } from "./nl";
import type { Dictionary, Locale } from "./types";

export const locales: Locale[] = ["nl", "en"];
export const defaultLocale: Locale = "nl";

const dictionaries: Record<Locale, Dictionary> = { nl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.nl;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type { Dictionary, Locale };
