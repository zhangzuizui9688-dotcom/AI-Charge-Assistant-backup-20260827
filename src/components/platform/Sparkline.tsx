import { MetricInfo } from "@/components/common/MetricInfo";
import type { MetricKey } from "@/data/metric-definitions";

interface SparklineProps {
  labels: string[];
  values: number[];
  title: string;
  unit?: string;
  metric?: MetricKey;
}

export function Sparkline({ labels, values, title, unit, metric }: SparklineProps) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const w = 240;
  const h = 64;
  const step = values.length > 1 ? w / (values.length - 1) : 0;
  const points = values
    .map((v, i) => `${(i * step).toFixed(1)},${(h - ((v - min) / span) * (h - 8) - 4).toFixed(1)}`)
    .join(" ");
  const area = `0,${h} ${points} ${w},${h}`;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        {title}
        {unit ? `（${unit}）` : ""}
        {metric ? <MetricInfo metric={metric} /> : null}
      </p>
      <p className="mt-1 text-lg font-semibold text-foreground">
        {values[values.length - 1]?.toLocaleString("zh-CN")}
      </p>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-2 h-16 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${title}趋势（演示数据）`}
      >
        <polygon points={area} className="fill-primary/10" />
        <polyline
          points={points}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
}
