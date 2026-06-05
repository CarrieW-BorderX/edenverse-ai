import { AboutTeamPage } from "@/components/pages/about-team-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type AboutTeamRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutTeamRoute({ params }: AboutTeamRouteProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);

  return <AboutTeamPage content={content} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
