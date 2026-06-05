import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/pages/news-article-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";
import {
  getNewsArticle,
  listAllNewsSlugs,
  listNewsArticles,
} from "@/lib/news";

type ArticleRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = listAllNewsSlugs();
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const article = getNewsArticle(slug, locale as Locale);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function MediaCenterArticleRoute({
  params,
}: ArticleRouteProps) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const article = getNewsArticle(slug, typedLocale);
  if (!article) {
    notFound();
  }

  const content = getSiteContent(typedLocale);
  const all = listNewsArticles(typedLocale);
  const currentIndex = all.findIndex((entry) => entry.slug === slug);
  const previous = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < all.length - 1
      ? all[currentIndex + 1]
      : null;

  return (
    <NewsArticlePage
      locale={typedLocale}
      content={content}
      article={article}
      previous={previous}
      next={next}
    />
  );
}
