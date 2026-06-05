"use client";

import { useEffect, useState } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as NavigatorWithConnection;
    const saveData = Boolean(nav.connection?.saveData);
    const lowCores = (navigator.hardwareConcurrency ?? 8) < 4;

    const update = () => setReduced(mq.matches || saveData || lowCores);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
