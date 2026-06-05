import { AboutPage } from "@/components/pages/about-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type AboutRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutRoute({ params }: AboutRouteProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);

  return <AboutPage content={content} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
