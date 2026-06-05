"use client";

import Image from "next/image";
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { MediaLoadingPulse } from "@/components/motion/media-loading-pulse";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/**
 * A single image in an ImageCarousel.
 *
 * - `src` is the public URL (usually under `/media/...`).
 * - `alt` is required; use a descriptive alt, never an empty string. If the
 *   image is purely decorative, do not put it in a carousel.
 * - `caption` renders below the image.
 * - `width` / `height` are optional intrinsic hints; the visual aspect ratio
 *   is driven by the carousel's `aspect` prop, not these values.
 */
export type ImageCarouselSlide = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type ImageCarouselProps = {
  /**
   * Programmatic slides. When present, takes precedence over `children`.
   * Outside MDX prefer this; inside MDX use `<ImageSlide>` children —
   * next-mdx-remote/rsc forwards only string attributes, so array props
   * from MDX do not arrive.
   */
  slides?: ImageCarouselSlide[];
  /**
   * MDX-authored `<ImageSlide>` children. Ignored when `slides` is set.
   * Note: children are identified structurally by `src` + `alt` props
   * (see `readSlidesFromChildren`) — any element with both will be treated
   * as a slide. Do not wrap other components inside `<ImageCarousel>`.
   */
  children?: ReactNode;
  /** CSS `aspect-ratio` for each slide. Defaults to "3 / 2" (our web exports). */
  aspect?: string;
  /** Accessible name for the carousel region. Defaults to "Image carousel". */
  ariaLabel?: string;
  className?: string;
};

/**
 * Marker child for MDX authoring:
 *
 *     <ImageCarousel ariaLabel="...">
 *       <ImageSlide src="/media/..." alt="..." caption="..." />
 *       <ImageSlide src="/media/..." alt="..." />
 *     </ImageCarousel>
 *
 * Renders nothing on its own — `ImageCarousel` reads slide data from the
 * props of its children.
 */
export const ImageSlide: FC<ImageCarouselSlide> = () => null;
ImageSlide.displayName = "ImageSlide";

// Read slides from JSX children. We deliberately do not match on the child's
// `type === ImageSlide`: in next-mdx-remote/rsc the children arrive as
// client-reference wrappers whose `.type` is a react.lazy Symbol, not the
// original function. Props, however, are preserved across the RSC boundary,
// so we identify slides structurally by the presence of `src` + `alt`.
function readSlidesFromChildren(children: ReactNode): ImageCarouselSlide[] {
  const out: ImageCarouselSlide[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const props = child.props as Partial<ImageCarouselSlide>;
    if (!props.src || !props.alt) return;
    out.push({
      src: props.src,
      alt: props.alt,
      caption: props.caption,
      width: props.width,
      height: props.height,
    });
  });
  return out;
}

export function ImageCarousel({
  slides: slidesProp,
  children,
  aspect = "3 / 2",
  ariaLabel = "Image carousel",
  className,
}: ImageCarouselProps) {
  const slides = slidesProp ?? readSlidesFromChildren(children);
  const reduceMotion = useReducedMotion();
  const reactId = useId();
  const railRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const pendingIndexRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const slideCount = slides.length;
  const hasMultiple = slideCount > 1;
  const scrollBehavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  const rootStyle = useMemo(
    () => ({ "--image-carousel-aspect": aspect } as React.CSSProperties),
    [aspect],
  );

  const markLoaded = useCallback((index: number) => {
    setLoadedSlides((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      const slide = slideRefs.current[index];
      if (!rail || !slide) return;
      // Drive ARIA state from programmatic navigation so the live region,
      // dot `aria-current`, and disabled states update even if the
      // IntersectionObserver fails to fire (it can miss when all slides sit
      // inside the rail's layout box, e.g. before overflow clip kicks in).
      setActiveIndex(index);
      rail.scrollTo({ left: slide.offsetLeft, behavior: scrollBehavior });
    },
    [scrollBehavior],
  );

  // Track the active slide via IntersectionObserver on the rail.
  // State updates are coalesced with requestAnimationFrame so that a
  // rapid-fire snap doesn't thrash React.
  useEffect(() => {
    if (!hasMultiple) return;
    const rail = railRef.current;
    const slideElements = slideRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (!rail || slideElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          )[0];
        if (!best) return;
        const raw = best.target.getAttribute("data-slide-index");
        const next = raw === null ? NaN : Number(raw);
        if (Number.isNaN(next)) return;
        pendingIndexRef.current = next;
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const queued = pendingIndexRef.current;
          pendingIndexRef.current = null;
          if (queued === null) return;
          setActiveIndex((prev) => (prev === queued ? prev : queued));
        });
      },
      { root: rail, threshold: [0.6] },
    );

    slideElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      pendingIndexRef.current = null;
    };
  }, [hasMultiple, slideCount]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (!hasMultiple) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(Math.min(activeIndex + 1, slideCount - 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }
    },
    [activeIndex, hasMultiple, scrollToIndex, slideCount],
  );

  // Single-slide fast path: render a plain image with caption, no controls.
  if (!hasMultiple) {
    const only = slides[0];
    if (!only) return null;
    const isLoaded = loadedSlides.has(0);
    return (
      <section
        className={`image-carousel image-carousel--single${
          className ? ` ${className}` : ""
        }`}
        role="region"
        aria-label={ariaLabel}
        style={rootStyle}
      >
        <figure className="image-carousel__slide-figure">
          <div className="image-carousel__media">
            <Image
              src={only.src}
              alt={only.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 960px) 100vw, 860px"
              onLoad={() => markLoaded(0)}
            />
            {isLoaded ? null : (
              <MediaLoadingPulse className="image-carousel__pulse" />
            )}
          </div>
          {only.caption ? (
            <figcaption className="image-carousel__caption">
              {only.caption}
            </figcaption>
          ) : null}
        </figure>
      </section>
    );
  }

  const liveRegionId = `${reactId}-live`;

  return (
    <section
      className={`image-carousel${className ? ` ${className}` : ""}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={rootStyle}
    >
      <div
        ref={railRef}
        className="image-carousel__rail"
        data-reduce-motion={reduceMotion ? "true" : "false"}
      >
        <div className="image-carousel__track">
          {slides.map((slide, index) => {
            const isLoaded = loadedSlides.has(index);
            const isFirst = index === 0;
            return (
              <div
                key={`${slide.src}-${index}`}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="image-carousel__slide"
                data-slide-index={index}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slideCount}`}
              >
                <figure className="image-carousel__slide-figure">
                  <div className="image-carousel__media">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={isFirst}
                      fetchPriority={isFirst ? "high" : "auto"}
                      loading={isFirst ? "eager" : "lazy"}
                      sizes="(max-width: 960px) 100vw, 860px"
                      onLoad={() => markLoaded(index)}
                    />
                    {isLoaded ? null : (
                      <MediaLoadingPulse className="image-carousel__pulse" />
                    )}
                  </div>
                  {slide.caption ? (
                    <figcaption className="image-carousel__caption">
                      {slide.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      <div className="image-carousel__controls">
        <button
          type="button"
          className="image-carousel__nav image-carousel__nav--prev"
          aria-label="Previous slide"
          disabled={activeIndex === 0}
          onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="image-carousel__dots" aria-label="Slides">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`dot-${slide.src}-${index}`}
                type="button"
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to slide ${index + 1}`}
                className={`image-carousel__dot${
                  isActive ? " image-carousel__dot--active" : ""
                }`}
                onClick={() => scrollToIndex(index)}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="image-carousel__nav image-carousel__nav--next"
          aria-label="Next slide"
          disabled={activeIndex >= slideCount - 1}
          onClick={() =>
            scrollToIndex(Math.min(activeIndex + 1, slideCount - 1))
          }
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div
        id={liveRegionId}
        className="image-carousel__live"
        aria-live="polite"
        aria-atomic="true"
      >
        {`Slide ${activeIndex + 1} of ${slideCount}`}
      </div>
    </section>
  );
}
