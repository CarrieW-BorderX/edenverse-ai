import type { SiteContent } from "@/data/site-content";
import { AboutStats } from "@/components/pages/sections/about-stats";

type AboutPageProps = {
  content: SiteContent;
};

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div className="page-shell">
      <section className="media-background-section">
        <div className="page-hero-video-frame">
          <video
            className="hero-media-video"
            src="https://cdn.shopify.com/videos/c/o/v/d6f84cb53bf04f7b9ff0b6acc9c490a7.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="hero-media-overlay" />
          <div className="section-container page-hero-video-copy">
            <div className="section-stack">
              <span className="section-kicker">{content.about.pageHero.kicker}</span>
              <h1 className="section-title">{content.about.pageHero.title}</h1>
              <p className="section-copy">{content.about.pageHero.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container content-grid section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.about.mission.kicker}</span>
          <h2 className="section-title">{content.about.mission.title}</h2>
          <p className="section-copy">{content.about.mission.description}</p>
        </div>
        <div className="panel-grid">
          {content.about.mission.values.map((value) => (
            <article key={value.title} className="feature-panel">
              <h3 className="feature-panel-title">{value.title}</h3>
              <p className="feature-panel-copy">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container story-layout section-spacing">
        <div className="section-stack">
          <span className="section-kicker">{content.about.advantage.kicker}</span>
          <h2 className="section-title">{content.about.advantage.title}</h2>
          <p className="section-copy">{content.about.advantage.description}</p>
        </div>
        <div className="story-rail">
          {content.about.advantage.points.map((point) => (
            <article key={point.title} className="story-step-card">
              <span className="story-step-index">{point.index}</span>
              <h3 className="feature-panel-title">{point.title}</h3>
              <p className="feature-panel-copy">{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container traction-section section-spacing">
        <div className="section-stack traction-header">
          <span className="section-kicker">{content.about.traction.kicker}</span>
          <h2 className="section-title">{content.about.traction.title}</h2>
          <p className="section-copy">{content.about.traction.description}</p>
        </div>
        <AboutStats stats={content.about.traction.stats} />
        <div className="panel-grid">
          {content.about.traction.partners.map((partner) => (
            <article key={partner.name} className="feature-panel">
              <h3 className="feature-panel-title">{partner.name}</h3>
              <p className="feature-panel-copy">{partner.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vision-section section-spacing">
        <div className="section-container">
          <span className="section-kicker vision-kicker">{content.about.vision.kicker}</span>
          <p className="vision-statement">{content.about.vision.statement}</p>
        </div>
      </section>
    </div>
  );
}
