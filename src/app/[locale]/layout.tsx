import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const content = getSiteContent(locale as Locale);

  return {
    title: {
      default: content.meta.title,
      template: `%s | ${content.meta.title}`,
    },
    description: content.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const content = getSiteContent(locale as Locale);

  return (
    <LenisProvider>
      <div className="site-background">
        <SiteHeader locale={locale as Locale} navigation={content.navigation} />
        <main>{children}</main>
        <SiteFooter locale={locale as Locale} footer={content.footer} />
      </div>
    </LenisProvider>
  );
}
