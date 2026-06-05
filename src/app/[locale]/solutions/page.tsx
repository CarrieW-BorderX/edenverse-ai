import { SolutionsPage } from "@/components/pages/solutions-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type SolutionsRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function SolutionsRoute({ params }: SolutionsRouteProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const content = getSiteContent(locale);

  return <SolutionsPage content={content} locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
