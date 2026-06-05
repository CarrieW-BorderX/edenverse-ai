import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsIndexPage } from "@/components/pages/news-index-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";
import { listNewsArticlesByCategoryKey } from "@/lib/news";

type MediaCenterNewsRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MediaCenterNewsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = getSiteContent(locale as Locale);
  return {
    title: content.news.hero.title,
    description: content.news.hero.description,
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function MediaCenterNewsRoute({
  params,
}: MediaCenterNewsRouteProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const content = getSiteContent(typedLocale);
  const articles = listNewsArticlesByCategoryKey(typedLocale, "press-release");

  return (
    <NewsIndexPage
      locale={typedLocale}
      content={content}
      articles={articles}
      hero={content.news.hero}
    />
  );
}
