import Link from "next/link";
import { DeploymentCycleSection } from "@/components/deployment-cycle-section";
import { HomeHero } from "@/components/pages/sections/home-hero";
import { LatestEventsSection } from "@/components/pages/sections/latest-events-section";
import { RxBrainSection } from "@/components/pages/sections/rx-brain-section";
import { SolutionDetailRow } from "@/components/pages/sections/solution-detail-row";
import { RevealSection } from "@/components/reveal-section";
import type { SiteContent } from "@/data/site-content";
import { localePrefix, type Locale } from "@/lib/i18n";
import type { NewsArticleMeta } from "@/lib/news-types";

type HomePageProps = {
  locale: Locale;
  content: SiteContent;
  latestArticles: NewsArticleMeta[];
};

export function HomePage({ locale, content, latestArticles }: HomePageProps) {
  return (
    <>
      <HomeHero locale={locale} content={content.home.hero} />

      <RevealSection className="section-spacing">
        <section className="section-container company-introduction-panel">
          <div className="section-stack">
            <span className="section-kicker">
              {content.home.companyIntroduction.kicker}
            </span>
            <h2 className="section-title">
              {content.home.companyIntroduction.title}
            </h2>
            <p className="section-copy section-copy-wide">
              {content.home.companyIntroduction.description}
            </p>
          </div>
        </section>
        <DeploymentCycleSection
          description={content.home.deploymentCycle.description}
          items={content.home.deploymentCycle.items}
        />
      </RevealSection>

      <section className="section-spacing solutions-feature-section">
        <div className="section-container">
          <div className="section-stack solutions-feature-header">
            <span className="section-kicker">{content.home.solutions.kicker}</span>
            <h2 className="section-title">{content.home.solutions.title}</h2>
            <p className="section-copy">{content.home.solutions.description}</p>
          </div>
          <div className="solutions-detail-stack">
            {content.home.featuredSolutions.map((solution) => (
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
          </div>
        </div>
      </section>

      <RxBrainSection locale={locale} content={content.home.rxBrain} />

      <LatestEventsSection
        locale={locale}
        articles={latestArticles}
        copy={content.home.latestEvents}
        readArticleLabel={content.news.meta.readArticle}
      />

      

      <RevealSection className="section-spacing">
        <section
          className="section-container callout-panel"
          id="contact-callout"
        >
          <div className="section-stack">
            <span className="section-kicker">
              {content.home.callout.kicker}
            </span>
            <h2 className="section-title">{content.home.callout.title}</h2>
            <p className="section-copy">{content.home.callout.description}</p>
          </div>
          <div className="button-row">
            <Link className="primary-button" href={`${localePrefix(locale)}/contact`}>
              {content.home.callout.primaryAction}
            </Link>
            <Link className="secondary-button" href={`${localePrefix(locale)}/about`}>
              {content.home.callout.secondaryAction}
            </Link>
          </div>
        </section>
      </RevealSection>
    </>
  );
}
