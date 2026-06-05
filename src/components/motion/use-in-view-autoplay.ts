"use client";

import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * Plays/pauses a `<video>` based on whether it is in the viewport.
 * Respects `prefers-reduced-motion` — never autoplays when set.
 *
 * The video element is expected to carry `preload="none"` + a `poster` so
 * network I/O only starts when the row scrolls into view. We call .load() on
 * first intersection so Safari actually picks up the source change.
 */
export function useInViewAutoPlay(
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: { threshold?: number; rootMargin?: string },
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    let hasLoaded = false;
    const threshold = options?.threshold ?? 0.35;
    const rootMargin = options?.rootMargin ?? "0px";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!hasLoaded) {
              video.load();
              hasLoaded = true;
            }
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(() => {
                // Autoplay may be blocked (rare for muted video) — ignore.
              });
            }
          } else {
            video.pause();
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [videoRef, reducedMotion, options?.threshold, options?.rootMargin]);
}
