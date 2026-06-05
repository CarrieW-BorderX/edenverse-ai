import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsIndexPage } from "@/components/pages/news-index-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";
import { listNewsArticlesByCategoryKey } from "@/lib/news";

type DemoCenterRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: DemoCenterRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const content = getSiteContent(locale as Locale);
  return {
    title: content.demoCenter.hero.title,
    description: content.demoCenter.hero.description,
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DemoCenterRoute({
  params,
}: DemoCenterRouteProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const content = getSiteContent(typedLocale);
  const articles = listNewsArticlesByCategoryKey(typedLocale, "deployment");

  return (
    <NewsIndexPage
      locale={typedLocale}
      content={content}
      articles={articles}
      hero={content.demoCenter.hero}
    />
  );
}
