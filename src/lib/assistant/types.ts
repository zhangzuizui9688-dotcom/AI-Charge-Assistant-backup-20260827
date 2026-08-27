import type { Approval, FaultStatus, TimelineEntry } from "@/data/demo";
import type { IntentId } from "@/data/roles";

export type CardPayload =
  | { type: "risk" }
  | { type: "rules" }
  | { type: "vehicles" }
  | { type: "timeline" }
  | { type: "report" }
  | { type: "briefing" }
  | { type: "offpeak" }
  | { type: "optimizeVehicles" }
  | { type: "faults"; filter: "today" | "blocking" | "overdue" | "repeat" }
  | { type: "faultDetail"; plate: string }
  | { type: "weekCompare" }
  | { type: "repeatIssues" }
  | { type: "marketing"; period: "week" | "month" }
  | { type: "profitTrend" }
  | { type: "utilization" }
  | { type: "orderStats" }
  | { type: "heat" }
  | { type: "campaigns" }
  | { type: "discountCompare" }
  | { type: "fleetSaving" }
  | { type: "fleetBill" }
  | { type: "bestChargeTime" };

export interface MessageAction {
  label: string;
  intent: IntentId;
  plate?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  text?: string;
  card?: CardPayload;
  actions?: MessageAction[];
  at: string;
}

export interface DemoOverrides {
  timelineExtra: TimelineEntry[];
  approvals: Approval[];
  faultStatus: Record<string, FaultStatus>;
}

export const EMPTY_OVERRIDES: DemoOverrides = {
  timelineExtra: [],
  approvals: [],
  faultStatus: {},
};
