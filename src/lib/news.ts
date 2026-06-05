import "server-only";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import {
  newsCategoryKeys,
  type NewsArticle,
  type NewsArticleMeta,
  type NewsCategoryKey,
} from "@/lib/news-types";

export type {
  NewsArticle,
  NewsArticleMeta,
  NewsCategoryKey,
} from "@/lib/news-types";

const NEWS_ROOT = join(process.cwd(), "content", "news");

type FrontMatter = {
  title?: string;
  date?: string;
  category?: string;
  categoryKey?: string;
  summary?: string;
  coverImage?: string;
  coverAlt?: string;
  featured?: boolean;
  hideCover?: boolean;
};

function isCategoryKey(value: unknown): value is NewsCategoryKey {
  return (
    typeof value === "string" &&
    (newsCategoryKeys as readonly string[]).includes(value)
  );
}

function listSlugDirs(): string[] {
  try {
    return readdirSync(NEWS_ROOT).filter((entry) => {
      try {
        return statSync(join(NEWS_ROOT, entry)).isDirectory();
      } catch {
        return false;
      }
    });
  } catch {
    return [];
  }
}

function readArticleFile(
  slug: string,
  locale: Locale,
): { data: FrontMatter; content: string; actualLocale: Locale } | null {
  const primaryPath = join(NEWS_ROOT, slug, `${locale}.mdx`);
  const fallbackPath = join(NEWS_ROOT, slug, "en.mdx");

  let raw: string;
  let actualLocale: Locale = locale;

  try {
    raw = readFileSync(primaryPath, "utf8");
  } catch {
    if (locale === "en") {
      return null;
    }
    try {
      raw = readFileSync(fallbackPath, "utf8");
      actualLocale = "en";
    } catch {
      return null;
    }
  }

  const parsed = matter(raw);
  return {
    data: parsed.data as FrontMatter,
    content: parsed.content,
    actualLocale,
  };
}

function toMeta(
  slug: string,
  requestedLocale: Locale,
  file: { data: FrontMatter; actualLocale: Locale },
): NewsArticleMeta | null {
  const { data } = file;

  if (!data.title || !data.date || !data.category || !data.summary || !data.coverImage) {
    return null;
  }
  if (!isCategoryKey(data.categoryKey)) {
    return null;
  }

  return {
    slug,
    locale: requestedLocale,
    title: data.title,
    date: data.date,
    category: data.category,
    categoryKey: data.categoryKey,
    summary: data.summary,
    coverImage: data.coverImage,
    coverAlt: data.coverAlt,
    featured: Boolean(data.featured),
    hideCover: data.hideCover === true ? true : undefined,
  };
}

export function listNewsArticles(locale: Locale): NewsArticleMeta[] {
  const slugs = listSlugDirs();
  const metas: NewsArticleMeta[] = [];

  for (const slug of slugs) {
    const file = readArticleFile(slug, locale);
    if (!file) continue;
    const meta = toMeta(slug, locale, file);
    if (meta) metas.push(meta);
  }

  return metas.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function listLatestNewsArticles(
  locale: Locale,
  limit = 4,
): NewsArticleMeta[] {
  return listNewsArticles(locale).slice(0, limit);
}

export function listNewsArticlesByCategoryKey(
  locale: Locale,
  categoryKey: NewsCategoryKey,
): NewsArticleMeta[] {
  return listNewsArticles(locale).filter(
    (article) => article.categoryKey === categoryKey,
  );
}

export function getNewsArticle(
  slug: string,
  locale: Locale,
): NewsArticle | null {
  const file = readArticleFile(slug, locale);
  if (!file) return null;
  const meta = toMeta(slug, locale, file);
  if (!meta) return null;

  return {
    ...meta,
    body: file.content,
    isFallback: file.actualLocale !== locale,
  };
}

export function listAllNewsSlugs(): string[] {
  return listSlugDirs();
}
