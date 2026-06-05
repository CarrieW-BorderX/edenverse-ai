"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MediaLoadingPulse } from "@/components/motion/media-loading-pulse";
import type { SiteContent } from "@/data/site-content";

type SolutionCard = SiteContent["solutions"]["cards"][number];

type SolutionsCarouselSectionProps = {
  kicker: string;
  title: string;
  description: string;
  cards: SolutionCard[];
};

export function SolutionsCarouselSection({
  kicker,
  title,
  description,
  cards,
}: SolutionsCarouselSectionProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [visitedCards, setVisitedCards] = useState<ReadonlySet<number>>(
    () => new Set([0, 1]),
  );
  const [loadedCards, setLoadedCards] = useState<ReadonlySet<number>>(
    () => new Set(),
  );
  const cardReferences = useRef<Array<HTMLElement | null>>([]);
  const videoReferences = useRef<Array<HTMLVideoElement | null>>([]);
  const activeCardIndexRef = useRef(0);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayedIndex = hoveredCardIndex ?? activeCardIndex;
  const activeCard = cards[displayedIndex] ?? cards[0];

  const markLoaded = useCallback((index: number) => {
    setLoadedCards((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const markVisited = useCallback(
    (near: number) => {
      setVisitedCards((prev) => {
        const additions: number[] = [];
        for (let offset = -1; offset <= 1; offset += 1) {
          const candidate = near + offset;
          if (
            candidate >= 0 &&
            candidate < cards.length &&
            !prev.has(candidate)
          ) {
            additions.push(candidate);
          }
        }
        if (additions.length === 0) return prev;
        const next = new Set(prev);
        additions.forEach((i) => next.add(i));
        return next;
      });
    },
    [cards.length],
  );

  useEffect(() => {
    const cardElements = cardReferences.current.filter(
      (cardElement): cardElement is HTMLElement => cardElement !== null,
    );

    if (cardElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.intersectionRatio - entryA.intersectionRatio,
          );

        if (visibleEntries.length === 0) {
          return;
        }

        const nextIndex = Number(
          visibleEntries[0].target.getAttribute("data-card-index"),
        );

        if (!Number.isNaN(nextIndex) && nextIndex !== activeCardIndexRef.current) {
          if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
          scrollDebounceRef.current = setTimeout(() => {
            activeCardIndexRef.current = nextIndex;
            setActiveCardIndex(nextIndex);
            setHoveredCardIndex(null);
            markVisited(nextIndex);
          }, 100);
        }
      },
      {
        root: null,
        threshold: [0.35, 0.5, 0.7, 0.9],
        rootMargin: "-12% 0px -18% 0px",
      },
    );

    cardElements.forEach((cardElement) => {
      observer.observe(cardElement);
    });

    return () => {
      observer.disconnect();
      if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
    };
  }, [cards, markVisited]);

  useEffect(() => {
    visitedCards.forEach((index) => {
      const video = videoReferences.current[index];
      if (video && video.readyState === 0) {
        video.load();
      }
    });
  }, [visitedCards]);

  return (
    <section
      className="section-spacing solutions-carousel-section"
      aria-labelledby="solutions-carousel-title"
    >
      <div className="section-container solutions-carousel-shell">
        <div className="solutions-carousel-intro">
          <div className="solutions-carousel-description-card section-stack">
            <span className="section-kicker">{kicker}</span>
            <h2 className="section-title" id="solutions-carousel-title">
              {title}
            </h2>
            <p className="section-copy">{description}</p>
          </div>

          <article
            key={displayedIndex}
            className="solutions-carousel-active-copy"
          >
            <h3 className="solutions-carousel-active-title">
              {activeCard.title}
            </h3>
            {/* <p className="solutions-carousel-active-description">
                {activeCard.description}
              </p> */}
            <ul className="solutions-carousel-highlight-list">
              {activeCard.highlights.map((highlight) => (
                <li key={highlight} className="solutions-carousel-highlight">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div
          className="solutions-carousel-stage"
          onMouseLeave={() => setHoveredCardIndex(null)}
        >
          {cards.map((card, index) => {
            const showVideo = Boolean(card.backgroundVideoSrc);
            const nearIndex = hoveredCardIndex ?? activeCardIndex;
            const isNearActive = Math.abs(index - nearIndex) <= 1;
            const shouldHaveSource = visitedCards.has(index) || isNearActive;
            const shouldShowPulse = !loadedCards.has(index);

            return (
              <article
                key={card.title}
                ref={(element) => {
                  cardReferences.current[index] = element;
                }}
                className={`solutions-carousel-card${
                  index === activeCardIndex
                    ? " solutions-carousel-card-active"
                    : ""
                }`}
                data-card-index={index}
                onMouseEnter={() => {
                  setHoveredCardIndex(index);
                  markVisited(index);
                }}
              >
                <div className="solutions-carousel-media">
                  {showVideo ? (
                    <>
                      <video
                        ref={(element) => {
                          videoReferences.current[index] = element;
                          if (element && element.readyState >= 3) {
                            markLoaded(index);
                          }
                        }}
                        className="solutions-carousel-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={card.backgroundPosterSrc}
                        onCanPlay={() => markLoaded(index)}
                        onLoadedData={() => markLoaded(index)}
                      >
                        {shouldHaveSource ? (
                          <source src={card.backgroundVideoSrc} type="video/mp4" />
                        ) : null}
                      </video>
                      {shouldShowPulse ? (
                        <MediaLoadingPulse className="solutions-carousel-video-pulse" />
                      ) : null}
                    </>
                  ) : card.imageSrc ? (
                    <div
                      className="solutions-carousel-image"
                      style={{
                        backgroundImage: `url(${card.imageSrc})`,
                      }}
                    />
                  ) : (
                    <MediaLoadingPulse className="solutions-carousel-video-pulse" />
                  )}
                  <div className="solutions-carousel-media-overlay" />
                </div>

                <div className="solutions-carousel-card-footer">
                  <div className="solutions-carousel-card-heading">
                    <span
                      className="solutions-carousel-card-square"
                      aria-hidden="true"
                    />
                    <span className="solutions-carousel-card-tag">
                      {card.tag}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
