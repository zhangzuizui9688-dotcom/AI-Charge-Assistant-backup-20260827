import { cn } from "@/lib/utils";
import { RISK_LABEL, type FaultSeverity, type RiskLevel } from "@/data/demo";

const RISK_CLASS: Record<RiskLevel, string> = {
  green: "bg-risk-green-soft text-risk-green border-risk-green/30",
  yellow: "bg-risk-yellow-soft text-risk-yellow border-risk-yellow/30",
  orange: "bg-risk-orange-soft text-risk-orange border-risk-orange/30",
  red: "bg-risk-red-soft text-risk-red border-risk-red/30",
};

export function RiskTag({ level, text }: { level: RiskLevel; text?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        RISK_CLASS[level],
      )}
    >
      {text ?? `${RISK_LABEL[level]}风险`}
    </span>
  );
}

const SEVERITY_CLASS: Record<FaultSeverity, string> = {
  一般: "bg-muted text-muted-foreground border-border",
  重要: "bg-risk-yellow-soft text-risk-yellow border-risk-yellow/30",
  紧急: "bg-risk-red-soft text-risk-red border-risk-red/30",
};

export function SeverityTag({ severity }: { severity: FaultSeverity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        SEVERITY_CLASS[severity],
      )}
    >
      {severity}
    </span>
  );
}

export function StatusTag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
      {text}
    </span>
  );
}
