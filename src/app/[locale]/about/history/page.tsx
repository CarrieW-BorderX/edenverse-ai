import { AboutPlaceholderPage } from "@/components/pages/about-placeholder-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type AboutHistoryRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutHistoryRoute({
  params,
}: AboutHistoryRouteProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);

  return <AboutPlaceholderPage content={content.about.history} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
