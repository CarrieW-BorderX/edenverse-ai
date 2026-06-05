import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type TechnologyRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function TechnologyRoute({ params }: TechnologyRouteProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);
  const { pageHero } = content.technology;

  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker">{pageHero.kicker}</span>
          <h1 className="section-title">{pageHero.title}</h1>
          <p className="section-copy">{pageHero.description}</p>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
