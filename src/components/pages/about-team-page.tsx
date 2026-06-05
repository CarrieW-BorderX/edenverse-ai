import type { SiteContent } from "@/data/site-content";

type AboutTeamPageProps = {
  content: SiteContent;
};

export function AboutTeamPage({ content }: AboutTeamPageProps) {
  const { pageHero, members } = content.about.team;

  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker">{pageHero.kicker}</span>
          <h1 className="section-title">{pageHero.title}</h1>
          <p className="section-copy">{pageHero.description}</p>
        </div>
      </section>

      <section className="section-container section-spacing">
        <ul className="team-grid">
          {members.map((member) => (
            <li key={member.name} className="team-member-card">
              <span className="section-kicker">{member.role}</span>
              <h2 className="team-member-name">{member.name}</h2>
              <p className="team-member-bio">{member.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
