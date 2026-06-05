import type { Locale } from "@/lib/i18n";

export type NewsCategoryKey = "press-release" | "deployment";

export const newsCategoryKeys: readonly NewsCategoryKey[] = [
  "press-release",
  "deployment",
] as const;

export type NewsArticleMeta = {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  category: string;
  categoryKey: NewsCategoryKey;
  summary: string;
  coverImage: string;
  coverAlt?: string;
  featured: boolean;
  hideCover?: boolean;
};

export type NewsArticle = NewsArticleMeta & {
  body: string;
  isFallback: boolean;
};
