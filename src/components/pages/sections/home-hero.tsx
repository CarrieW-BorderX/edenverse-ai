"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type HomeHeroContent = {
  kicker: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  backgroundVideoSrc: string;
  backgroundPosterSrc: string;
  videoAriaLabel: string;
};

type HomeHeroProps = {
  locale: Locale;
  content: HomeHeroContent;
};

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <section
      className="hero-section media-background-section hero-section-sequence"
      id="hero"
    >
      <div className="hero-media-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-media-poster"
          src={content.backgroundPosterSrc}
          alt={content.videoAriaLabel}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <video
          className="hero-media-video"
          src={content.backgroundVideoSrc}
          poster={content.backgroundPosterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="hero-media-overlay" />
        <div className="section-container hero-layout">
          <div className="hero-copy-panel">
            {content.kicker ? (
              <span className="section-kicker">{content.kicker}</span>
            ) : null}
            <h1 className="hero-title">{content.title}</h1>
            <p className="hero-copy">{content.description}</p>
            <div className="button-row">
              <Link className="primary-button" href={`/${locale}/solutions`}>
                {content.primaryAction}
              </Link>
              <Link className="secondary-button" href={`/${locale}/contact`}>
                {content.secondaryAction}
              </Link>
            </div>
            <div className="hero-sign-container">
              <a
                href= "https://www.nvidia.com/en-us/startups/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hero-sequence-sign"
                  width={150}
                  height={75}
                  alt="NVIDIA Inception Program Sign"
                  src="https://cdn.shopify.com/s/files/1/0764/3063/9301/files/nvidia-inception-program-sign.png?v=1778891941"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
