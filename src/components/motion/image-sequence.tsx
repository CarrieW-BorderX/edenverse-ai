"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MediaLoadingPulse } from "./media-loading-pulse";
import { useReducedMotion } from "./use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ImageSequenceManifest = {
  readonly widths: readonly number[];
  readonly count: number;
  readonly path: (width: number, index: number) => string;
};

type ImageSequenceProps = {
  manifest: ImageSequenceManifest;
  pinnedHeight: string;
  ariaLabel: string;
  className?: string;
  children?: ReactNode;
};

function pickWidth(widths: readonly number[]): number {
  if (typeof window === "undefined") return widths[widths.length - 1];
  const vw = window.innerWidth;
  if (vw < 768) return widths[0];
  if (vw < 1440) return widths[1];
  return widths[widths.length - 1];
}

export function ImageSequence({
  manifest,
  pinnedHeight,
  ariaLabel,
  className,
  children,
}: ImageSequenceProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bitmapsRef = useRef<Array<ImageBitmap | null>>([]);
  const firstFrameDrawnRef = useRef(false);
  const [firstFrameDrawn, setFirstFrameDrawn] = useState(false);
  const [width, setWidth] = useState<number>(manifest.widths[manifest.widths.length - 1]);

  useEffect(() => {
    setWidth(pickWidth(manifest.widths));
  }, [manifest.widths]);

  useGSAP(
    () => {
      if (reducedMotion) return;
      if (!containerRef.current || !canvasRef.current) return;

      let cancelled = false;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const bitmaps: Array<ImageBitmap | null> = new Array(manifest.count).fill(null);
      bitmapsRef.current = bitmaps;
      let currentFrame = -1;

      const drawFrame = (index: number) => {
        const bitmap = bitmaps[index];
        if (!bitmap) return;
        if (canvas.width !== bitmap.width || canvas.height !== bitmap.height) {
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
        }
        ctx.drawImage(bitmap, 0, 0);
        currentFrame = index;
      };

      const loadFrame = async (index: number) => {
        if (cancelled || bitmaps[index]) return;
        try {
          const response = await fetch(manifest.path(width, index));
          const blob = await response.blob();
          const bitmap = await createImageBitmap(blob);
          if (cancelled) {
            bitmap.close();
            return;
          }
          bitmaps[index] = bitmap;
          if (currentFrame === -1 && index === 0) {
            drawFrame(0);
            if (!firstFrameDrawnRef.current) {
              firstFrameDrawnRef.current = true;
              setFirstFrameDrawn(true);
            }
          }
        } catch {
          // ignore, drawFrame will no-op
        }
      };

      const schedule = (
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback
          : (cb: () => void) => window.setTimeout(cb, 50)
      ) as (cb: () => void) => void;

      const queue = Array.from({ length: manifest.count }, (_, i) => i);
      // Prioritise frame 0, then evenly sampled frames, then remaining
      queue.sort((a, b) => {
        if (a === 0) return -1;
        if (b === 0) return 1;
        const aMod = a % 4;
        const bMod = b % 4;
        return aMod - bMod || a - b;
      });

      const CONCURRENCY = 6;
      let active = 0;
      let qIdx = 0;
      const pump = () => {
        while (active < CONCURRENCY && qIdx < queue.length) {
          const next = queue[qIdx++];
          active++;
          loadFrame(next).finally(() => {
            active--;
            if (!cancelled) schedule(pump);
          });
        }
      };
      schedule(pump);

      const resolvePinDistance = () => {
        if (pinnedHeight.endsWith("vh")) {
          const n = parseFloat(pinnedHeight);
          return Math.round((window.innerHeight * n) / 100);
        }
        const px = parseFloat(pinnedHeight);
        return Number.isFinite(px) ? px : window.innerHeight;
      };

      const st = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${resolvePinDistance()}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                manifest.count - 1,
                Math.max(0, Math.floor(self.progress * (manifest.count - 1))),
              );
              drawFrame(idx);
            },
          },
        },
      );

      return () => {
        cancelled = true;
        st.scrollTrigger?.kill();
        st.kill();
        for (const b of bitmaps) b?.close();
        bitmapsRef.current = [];
      };
    },
    {
      dependencies: [reducedMotion, width, manifest, pinnedHeight],
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={containerRef}
      className={`image-sequence-root ${className ?? ""}`}
      role="img"
      aria-label={ariaLabel}
    >
      <MediaLoadingPulse className="image-sequence-priority" />
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="image-sequence-canvas"
          aria-hidden="true"
          style={{ opacity: firstFrameDrawn ? 1 : 0 }}
        />
      )}
      {children}
    </div>
  );
}
