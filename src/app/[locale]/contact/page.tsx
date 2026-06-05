import { ContactPage } from "@/components/pages/contact-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type ContactRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactRoute({ params }: ContactRouteProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);

  return <ContactPage content={content} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
