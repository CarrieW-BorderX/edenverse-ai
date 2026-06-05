import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * A narrow inline badge for partner-program / certification / award
 * announcements inside a news article body.
 *
 * Designed for MDX authoring via `next-mdx-remote/rsc`, which only forwards
 * string-literal attributes across the RSC boundary — every prop here is a
 * plain string or number. No interactivity, so this is a server component.
 *
 * The image renders with its natural aspect ratio (next/image width+height)
 * inside a max-width figure that sits centered in the rich-text column.
 * For partner badges that ship as a remote asset (e.g. cdn.shopify.com),
 * the host must be listed in `next.config.ts` -> `images.remotePatterns`.
 */
export type NewsBadgeProps = {
  /** Public or remote URL for the badge image. */
  src: string;
  /** Required descriptive alt text. */
  alt: string;
  /** Optional small caption rendered below the badge. */
  caption?: string;
  /** Optional click-through URL; opens in a new tab. */
  href?: string;
  /** Rendered pixel width of the image. Defaults to 320. */
  width?: number;
  /** Intrinsic pixel height; defaults to 1.5x width for typical vertical badges. */
  height?: number;
  className?: string;
};

export function NewsBadge({
  src,
  alt,
  caption,
  href,
  width = 320,
  height,
  className,
}: NewsBadgeProps) {
  const finalHeight = height ?? Math.round(width * 1.5);
  const rootStyle = {
    "--news-inline-badge-width": `${width}px`,
  } as CSSProperties;

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={finalHeight}
      sizes={`(max-width: 480px) 80vw, ${width}px`}
    />
  );

  return (
    <figure
      className={`news-inline-badge${className ? ` ${className}` : ""}`}
      style={rootStyle}
    >
      <div className="news-inline-badge__media">
        {href ? (
          <a
            className="news-inline-badge__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      {caption ? (
        <figcaption className="news-inline-badge__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
