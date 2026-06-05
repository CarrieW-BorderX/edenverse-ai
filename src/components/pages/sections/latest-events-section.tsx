"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { localePrefix, type Locale } from "@/lib/i18n";
import type { NewsArticleMeta } from "@/lib/news-types";
import { formatNewsDate } from "@/lib/news-date";

type LatestEventsCopy = {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  previousLabel: string;
  nextLabel: string;
  currentOfTotalLabel: string;
};

type LatestEventsSectionProps = {
  locale: Locale;
  articles: NewsArticleMeta[];
  copy: LatestEventsCopy;
  readArticleLabel: string;
};

const AUTOPLAY_INTERVAL_MS = 6000;

export function LatestEventsSection({
  locale,
  articles,
  copy,
  readArticleLabel,
}: LatestEventsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const containerReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAutoplayEnabled(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!autoplayEnabled || isPaused || articles.length <= 1) {
      return;
    }
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % articles.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [autoplayEnabled, isPaused, articles.length]);

  if (articles.length === 0) {
    return null;
  }

  const spotlight = articles[activeIndex];
  const total = articles.length;

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + total) % total);
  };
  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  const currentLabel = copy.currentOfTotalLabel
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(total));

  return (
    <section
      className="section-container section-spacing latest-events-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="latest-events-header section-stack">
        <span className="section-kicker">{copy.kicker}</span>
        <h2 className="section-title">{copy.title}</h2>
        <p className="section-copy">{copy.description}</p>
      </div>

      <div className="latest-events-layout" ref={containerReference}>
        <div className="latest-events-spotlight">
          <Link
            key={spotlight.slug}
            className="latest-events-spotlight-link"
            href={`${localePrefix(locale)}/media-center/${spotlight.slug}`}
          >
            <div className="latest-events-spotlight-media">
              <Image
                src={spotlight.coverImage}
                alt={spotlight.coverAlt ?? spotlight.title}
                fill
                sizes="(max-width: 960px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="latest-events-spotlight-info">
              <div className="news-card-meta-row">
                <span className="news-card-category">{spotlight.category}</span>
                <span className="news-card-date">
                  {formatNewsDate(spotlight.date, locale)}
                </span>
              </div>
              <h3 className="latest-events-spotlight-title">
                {spotlight.title}
              </h3>
              <p className="latest-events-spotlight-summary">
                {spotlight.summary}
              </p>
              <span className="news-card-readmore">
                {readArticleLabel} →
              </span>
            </div>
          </Link>

          <div className="latest-events-controls">
            <button
              type="button"
              className="latest-events-arrow"
              onClick={handlePrev}
              aria-label={copy.previousLabel}
            >
              ←
            </button>
            <div className="latest-events-dots">
              {articles.map((article, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={article.slug}
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    aria-label={article.title}
                    className={`latest-events-dot ${isActive ? "latest-events-dot-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  />
                );
              })}
            </div>
            <span className="latest-events-counter">
              {currentLabel}
            </span>
            <button
              type="button"
              className="latest-events-arrow"
              onClick={handleNext}
              aria-label={copy.nextLabel}
            >
              →
            </button>
          </div>
        </div>

        <ul className="latest-events-rail">
          {articles.map((article, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={article.slug}
                className={`latest-events-rail-item ${isActive ? "latest-events-rail-item-active" : ""}`}
              >
                <Link
                  className="latest-events-rail-link"
                  href={`${localePrefix(locale)}/media-center/${article.slug}`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className="news-card-category">
                    {article.category}
                  </span>
                  <span className="latest-events-rail-title">
                    {article.title}
                  </span>
                  <span className="news-card-date">
                    {formatNewsDate(article.date, locale)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="latest-events-cta-row">
        <Link className="secondary-button" href={`${localePrefix(locale)}${copy.ctaHref}`}>
          {copy.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
