"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type NewsCoverParallaxProps = {
  src: string;
  alt: string;
};

export function NewsCoverParallax({ src, alt }: NewsCoverParallaxProps) {
  const containerReference = useRef<HTMLDivElement | null>(null);
  const imageReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerReference.current;
    const imageWrap = imageReference.current;
    if (!container || !imageWrap) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(imageWrap, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="news-article-cover" ref={containerReference}>
      <div className="news-article-cover-inner" ref={imageReference}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
