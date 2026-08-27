import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { METRIC_CAVEAT, METRIC_DEFINITIONS, type MetricKey } from "@/data/metric-definitions";

export function MetricInfo({ metric }: { metric: MetricKey }) {
  const def = METRIC_DEFINITIONS[metric];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${def.name}口径说明`}
          className="inline-flex items-center align-middle text-muted-foreground transition-colors hover:text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 space-y-2 text-xs">
        <p className="text-sm font-semibold text-foreground">{def.name}</p>
        <div>
          <p className="text-muted-foreground">计算公式 / 定义</p>
          <p className="text-foreground">{def.formula}</p>
        </div>
        <div>
          <p className="text-muted-foreground">含义 / 注意事项</p>
          <p className="text-foreground">{def.meaning}</p>
        </div>
        <p className="text-muted-foreground">{METRIC_CAVEAT}</p>
      </PopoverContent>
    </Popover>
  );
}

/** 字段名称 + 说明图标 */
export function MetricLabel({
  metric,
  text,
  className,
}: {
  metric: MetricKey;
  text?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      {text ?? METRIC_DEFINITIONS[metric].name}
      <MetricInfo metric={metric} />
    </span>
  );
}
