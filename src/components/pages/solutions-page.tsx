import Link from "next/link";
import { SolutionDetailRow } from "@/components/pages/sections/solution-detail-row";
import type { SiteContent } from "@/data/site-content";
import { localePrefix, type Locale } from "@/lib/i18n";

type SolutionsPageProps = {
  content: SiteContent;
  locale: Locale;
};

export function SolutionsPage({ content, locale }: SolutionsPageProps) {
  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker">{content.solutions.pageHero.kicker}</span>
          <h1 className="section-title">{content.solutions.pageHero.title}</h1>
          <p className="section-copy">{content.solutions.pageHero.description}</p>
        </div>
      </section>

      <section className="section-container solutions-detail-stack section-spacing">
        {content.solutions.cards.map((solution) => (
          <SolutionDetailRow
            key={solution.title}
            tag={solution.tag}
            title={solution.title}
            description={solution.description}
            highlights={solution.highlights}
            imageSrc={solution.imageSrc}
            backgroundVideoSrc={solution.backgroundVideoSrc}
            backgroundPosterSrc={solution.backgroundPosterSrc}
          />
        ))}
      </section>

      <section className="section-container callout-panel section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.solutions.callout.kicker}</span>
          <h2 className="section-title">{content.solutions.callout.title}</h2>
          <p className="section-copy">{content.solutions.callout.description}</p>
        </div>
        <div className="button-row">
          <Link className="primary-button" href={`${localePrefix(locale)}${content.solutions.callout.primaryHref}`}>
            {content.solutions.callout.primaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
