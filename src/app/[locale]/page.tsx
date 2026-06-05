import { HomePage } from "@/components/pages/home-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";
import { listLatestNewsArticles } from "@/lib/news";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const content = getSiteContent(typedLocale);
  const latestArticles = listLatestNewsArticles(typedLocale, 4);

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={content.home.hero.backgroundPosterSrc}
        fetchPriority="high"
      />
      <HomePage
        locale={typedLocale}
        content={content}
        latestArticles={latestArticles}
      />
    </>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
