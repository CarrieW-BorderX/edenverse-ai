"use client";

import Link from "next/link";
import { ImageSequence } from "@/components/motion/image-sequence";
import { rxBrainFrames } from "@/data/rx-brain-frames";
import type { RxBrainContent } from "@/data/site-content";
import type { Locale } from "@/lib/i18n";

type RxBrainSectionProps = {
  locale: Locale;
  content: RxBrainContent;
};

export function RxBrainSection({ locale, content }: RxBrainSectionProps) {
  return (
    <section className="rx-brain-section">
      <ImageSequence
        manifest={rxBrainFrames}
        pinnedHeight="200vh"
        ariaLabel={content.imageSequenceAriaLabel}
      >
        <div className="rx-brain-overlay">
          <div className="rx-brain-copy">
            <span className="rx-brain-kicker">{content.kicker}</span>
            <span className="rx-brain-wordmark">{content.wordmark}</span>
            <h2 className="rx-brain-subtitle">{content.subtitle}</h2>
            <p className="rx-brain-description">{content.description}</p>
            {/* <div className="button-row">
              <Link className="primary-button" href={`/${locale}/technology`}>
                {content.ctaLabel}
              </Link>
            </div> */}
          </div>
        </div>
      </ImageSequence>
    </section>
  );
}
