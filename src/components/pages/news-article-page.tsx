import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { ImageCarousel, ImageSlide } from "@/components/media/image-carousel";
import { NewsBadge } from "@/components/media/news-badge";
import { NewsVideo } from "@/components/media/news-video";
import { NewsCoverParallax } from "@/components/pages/news-cover-parallax";
import type { SiteContent } from "@/data/site-content";
import { localePrefix, type Locale } from "@/lib/i18n";
import type { NewsArticle, NewsArticleMeta } from "@/lib/news-types";
import { formatNewsDate } from "@/lib/news-date";

// next-mdx-remote/rsc only forwards string-literal attributes from MDX.
// Components that need structured data use the children-composition shape
// (see `ImageCarousel` + `ImageSlide`).
const mdxComponents: MDXRemoteProps["components"] = {
  ImageCarousel,
  ImageSlide,
  NewsBadge,
  NewsVideo,
};

type NewsArticlePageProps = {
  locale: Locale;
  content: SiteContent;
  article: NewsArticle;
  previous: NewsArticleMeta | null;
  next: NewsArticleMeta | null;
};

export function NewsArticlePage({
  locale,
  content,
  article,
  previous,
  next,
}: NewsArticlePageProps) {
  const { meta } = content.news;
  const formattedDate = formatNewsDate(article.date, locale);

  return (
    <div className="page-shell news-article">
      <section className="section-container page-hero-section news-article-hero">
        <div className="news-article-meta">
          <span className="news-card-category">{article.category}</span>
          <span className="news-card-date">{formattedDate}</span>
        </div>
        <h1 className="news-article-title">{article.title}</h1>
        <p className="news-article-summary">{article.summary}</p>
      </section>

      {article.hideCover ? null : (
        <NewsCoverParallax
          src={article.coverImage}
          alt={article.coverAlt ?? article.title}
        />
      )}

      <section className="section-container section-spacing news-article-body">
        <aside className="news-article-sidebar is-sticky">
          <div className="news-article-sidebar-row">
            <span className="news-article-sidebar-label">
              {meta.categoryLabel}
            </span>
            <span className="news-article-sidebar-value">
              {article.category}
            </span>
          </div>
          <div className="news-article-sidebar-row">
            <span className="news-article-sidebar-label">{meta.dateLabel}</span>
            <span className="news-article-sidebar-value">{formattedDate}</span>
          </div>
          {article.isFallback ? (
            <p className="news-article-sidebar-notice">{meta.notTranslatedYet}</p>
          ) : null}
          <Link
            className="news-article-sidebar-back"
            href={`${localePrefix(locale)}/media-center/news`}
          >
            ← {meta.backToNews}
          </Link>
        </aside>

        <div className="rich-text">
          <MDXRemote source={article.body} components={mdxComponents} />
        </div>
      </section>

      <nav className="section-container news-article-nav" aria-label={meta.paginationLabel}>
        <div className="news-article-nav-slot">
          {previous ? (
            <Link
              className="news-article-nav-link news-article-nav-previous"
              href={`${localePrefix(locale)}/media-center/${previous.slug}`}
            >
              <span className="news-article-nav-direction">
                ← {meta.previousArticle}
              </span>
              <span className="news-article-nav-title">{previous.title}</span>
            </Link>
          ) : null}
        </div>
        <div className="news-article-nav-slot news-article-nav-slot-right">
          {next ? (
            <Link
              className="news-article-nav-link news-article-nav-next"
              href={`${localePrefix(locale)}/media-center/${next.slug}`}
            >
              <span className="news-article-nav-direction">
                {meta.nextArticle} →
              </span>
              <span className="news-article-nav-title">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </div>
  );
}
