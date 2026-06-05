"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NewsArticleMeta } from "@/lib/news-types";
import { formatNewsDate } from "@/lib/news-date";
import { localePrefix, type Locale } from "@/lib/i18n";

type NewsGridRevealProps = {
  locale: Locale;
  articles: NewsArticleMeta[];
  readArticleLabel: string;
};

export function NewsGridReveal({
  locale,
  articles,
  readArticleLabel,
}: NewsGridRevealProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const gridReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gridElement = gridReference.current;
    if (!gridElement) return;

    let timeoutIds: number[] = [];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const run = () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
      if (reducedMotion.matches) {
        setVisibleCount(articles.length);
        return;
      }
      setVisibleCount(0);
      timeoutIds = articles.map((_, index) =>
        window.setTimeout(() => {
          setVisibleCount((current) => Math.max(current, index + 1));
        }, index * 60),
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(gridElement);

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
    };
  }, [articles]);

  return (
    <div className="news-grid" ref={gridReference}>
      {articles.map((article, index) => {
        const isVisible = index < visibleCount;
        return (
          <Link
            key={article.slug}
            className={`news-card ${isVisible ? "news-card-visible" : ""}`}
            href={`${localePrefix(locale)}/media-center/${article.slug}`}
          >
            <div className="news-card-media">
              <Image
                src={article.coverImage}
                alt={article.coverAlt ?? article.title}
                fill
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </div>
            <div className="news-card-info">
              <div className="news-card-meta-row">
                <span className="news-card-category">{article.category}</span>
                <span className="news-card-date">
                  {formatNewsDate(article.date, locale)}
                </span>
              </div>
              <h3 className="news-card-title">{article.title}</h3>
              <span className="news-card-readmore">{readArticleLabel} →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
