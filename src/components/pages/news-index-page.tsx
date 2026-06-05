import { NewsGridReveal } from "@/components/pages/news-grid-reveal";
import type { SiteContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";
import type { NewsArticleMeta } from "@/lib/news";

type NewsIndexHero = {
  kicker: string;
  title: string;
  description: string;
};

type NewsIndexPageProps = {
  locale: Locale;
  content: SiteContent;
  articles: NewsArticleMeta[];
  hero: NewsIndexHero;
};

export function NewsIndexPage({
  locale,
  content,
  articles,
  hero,
}: NewsIndexPageProps) {
  const { meta } = content.news;

  return (
    <div className="page-shell">
      <section className="section-container page-hero-section news-hero">
        <div className="news-hero-inner">
          <div className="news-hero-copy">
            <span className="section-kicker news-hero-kicker">
              {hero.kicker}
            </span>
            <h1 className="news-hero-title">{hero.title}</h1>
          </div>
          <p className="news-hero-description">{hero.description}</p>
        </div>
      </section>

      <section className="section-container section-spacing">
        <NewsGridReveal
          locale={locale}
          articles={articles}
          readArticleLabel={meta.readArticle}
        />
      </section>
    </div>
  );
}
