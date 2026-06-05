"use client";

import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { MediaLoadingPulse } from "@/components/motion/media-loading-pulse";
import { useInViewAutoPlay } from "@/components/motion/use-in-view-autoplay";

/**
 * A single inline video in a news article body.
 *
 * Designed for MDX authoring via `next-mdx-remote/rsc`, which only forwards
 * string-literal attributes across the RSC boundary — every prop here is a
 * plain string.
 *
 * Playback is gated by `useInViewAutoPlay`: the video auto-plays when it
 * scrolls into view and pauses on exit. That hook already respects
 * `prefers-reduced-motion`, so no separate gate is needed here.
 */
export type NewsVideoProps = {
  /** Public URL for the video, usually under `/media/news/<slug>/<file>.mp4`. */
  src: string;
  /** Optional poster image shown before the first frame loads. */
  poster?: string;
  /** Optional caption rendered below the video. */
  caption?: string;
  /** Accessible label for the video element. Falls back to caption, then "Video". */
  ariaLabel?: string;
  /**
   * CSS `aspect-ratio` for the video frame. Defaults to "9 / 16" for the
   * portrait phone captures that ship with the first news article. Override
   * to "16 / 9" for landscape clips.
   */
  aspect?: string;
  className?: string;
};

export function NewsVideo({
  src,
  poster,
  caption,
  ariaLabel,
  aspect = "9 / 16",
  className,
}: NewsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useInViewAutoPlay(videoRef);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const rootStyle = useMemo(
    () => ({ "--news-video-aspect": aspect } as CSSProperties),
    [aspect],
  );

  const label = ariaLabel ?? caption ?? "Video";

  return (
    <figure
      className={`news-video${className ? ` ${className}` : ""}`}
      style={rootStyle}
    >
      <div className="news-video__frame">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={handleLoadedData}
        />
        {isLoaded ? null : <MediaLoadingPulse className="news-video__pulse" />}
      </div>
      {caption ? (
        <figcaption className="news-video__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
