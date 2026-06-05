import type { SiteContent } from "@/data/site-content";

type AboutPlaceholderContent = SiteContent["about"]["history"];

type Props = {
  content: AboutPlaceholderContent;
};

export function AboutPlaceholderPage({ content }: Props) {
  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker">{content.pageHero.kicker}</span>
          <span className="status-badge">{content.pageHero.statusBadge}</span>
          <h1 className="section-title">{content.pageHero.title}</h1>
          <p className="section-copy">{content.pageHero.description}</p>
        </div>
      </section>
    </div>
  );
}
