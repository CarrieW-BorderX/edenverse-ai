import type { SiteContent } from "@/data/site-content";

type Stat = SiteContent["about"]["traction"]["stats"][number];

export function AboutStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="metrics-panel about-stats-panel">
      {stats.map((stat) => (
        <div key={stat.label} className="metric-card">
          <span className="metric-value">{stat.value}</span>
          <span className="metric-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
