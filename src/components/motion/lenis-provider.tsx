"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./use-reduced-motion";

type LenisContextValue = {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const value: LenisContextValue = {
    scrollTo: (target, options) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof target !== "number" && typeof target !== "string") {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
  };

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
