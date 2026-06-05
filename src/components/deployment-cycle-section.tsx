"use client";

import { useEffect, useRef, useState } from "react";
type DeploymentCycleItem = {
  key: string;
  label: string;
};

type DeploymentCycleSectionProps = {
  description: string;
  items: DeploymentCycleItem[];
};

const cycleSegments = [
  {
    path: "M 216.7 105.5 A 96 96 0 0 1 290.2 232.8",
    colorClassName: "deployment-cycle-segment-deploy",
    labelClassName: "deployment-cycle-label-deploy",
  },
  {
    path: "M 273.5 261.7 A 96 96 0 0 1 126.5 261.7",
    colorClassName: "deployment-cycle-segment-learn",
    labelClassName: "deployment-cycle-label-learn",
  },
  {
    path: "M 109.8 232.8 A 96 96 0 0 1 183.3 105.5",
    colorClassName: "deployment-cycle-segment-evolve",
    labelClassName: "deployment-cycle-label-evolve",
  },
] as const;

export function DeploymentCycleSection({
  description,
  items,
}: DeploymentCycleSectionProps) {
  const [visibleItemCount, setVisibleItemCount] = useState(0);
  const sectionReference = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionReference.current;

    if (!sectionElement) {
      return;
    }

    let timeoutIds: number[] = [];

    const startRevealSequence = () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      setVisibleItemCount(0);
      timeoutIds = items.map((_, index) =>
        window.setTimeout(() => {
          setVisibleItemCount(index + 1);
        }, index * 360),
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startRevealSequence();
        } else {
          timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
          setVisibleItemCount(0);
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(sectionElement);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      observer.disconnect();
    };
  }, [items]);

  return (
    <section ref={sectionReference} className="section-container deployment-cycle-section">
      <div className="section-stack">
        <h3 className="section-deploy-cycle-header section-copy-wide deployment-cycle-description">
          {description}
        </h3>
      </div>

      <div className="deployment-cycle-visual">
        <div className="deployment-cycle-diagram" aria-label="Deploy Learn Evolve cycle">
          <svg
            className="deployment-cycle-svg"
            viewBox="0 0 400 400"
            role="img"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="deployment-arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="2"
                refY="2"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 4 2 L 0 4 z" className="deployment-cycle-arrowhead" />
              </marker>
            </defs>

            {cycleSegments.map((segment, index) => {
              const isVisible = index < visibleItemCount;

              return (
                <path
                  key={segment.colorClassName}
                  d={segment.path}
                  markerEnd="url(#deployment-arrowhead)"
                  className={`deployment-cycle-segment ${segment.colorClassName} ${
                    isVisible ? "deployment-cycle-segment-visible" : ""
                  }`}
                />
              );
            })}
          </svg>

          {items.map((item, index) => {
            const segment = cycleSegments[index];
            const isVisible = index < visibleItemCount;

            return (
              <span
                key={item.key}
                className={`deployment-cycle-label ${segment.labelClassName} ${
                  isVisible ? "deployment-cycle-label-visible" : ""
                }`}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
