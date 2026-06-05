export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  zh: "中",
};

export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}