import { FAULTS } from "@/data/demo";
import type { IntentId } from "@/data/roles";
import type { CardPayload, MessageAction } from "./types";

export interface IntentReply {
  text?: string;
  card?: CardPayload;
  actions?: MessageAction[];
}

const SAFETY_ACTIONS: MessageAction[] = [
  { label: "查看风险依据", intent: "rules" },
  { label: "查看正在充电的车辆", intent: "chargingVehicles" },
  { label: "通知现场负责人", intent: "notify" },
  { label: "发起停桩审批", intent: "approval" },
  { label: "查看事件时间线", intent: "timeline" },
  { label: "生成安全事件报告", intent: "report" },
];

export function buildReply(intent: IntentId, plate?: string): IntentReply {
  switch (intent) {
    case "weather":
      return {
        text: "以下为当前演示环境中的恶劣天气与站点风险情况：",
        card: { type: "risk" },
        actions: SAFETY_ACTIONS,
      };
    case "rules":
      return {
        text: "A站雷暴橙色风险的判定规则与匹配情况如下（演示规则）：",
        card: { type: "rules" },
      };
    case "chargingVehicles":
      return {
        text: "受预警影响的站点当前在充车辆（演示数据，A站18辆/16台设备，B站6辆）：",
        card: { type: "vehicles" },
      };
    case "notify":
      return { text: "" }; // 由 Context 直接处理，生成模拟记录回执
    case "approval":
      return { text: "" }; // 由 Context 打开二次确认框
    case "timeline":
      return { text: "当前演示事件的处置时间线：", card: { type: "timeline" } };
    case "report":
      return { text: "已根据当前演示数据生成安全事件报告：", card: { type: "report" } };

    case "briefing":
    case "profit":
      return { text: "昨日经营简报（演示数据）：", card: { type: "briefing" } };
    case "offpeak":
    case "saving":
      return {
        text: "非谷平期充电优化情况（演示数据）：",
        card: { type: "offpeak" },
        actions: [{ label: "查看待优化车辆", intent: "optimizeVehicles" }],
      };
    case "optimizeVehicles":
      return {
        text: "待优化车辆清单（演示数据，共23辆，展示前5辆）：",
        card: { type: "optimizeVehicles" },
      };

    case "faultsToday":
      return {
        text: "今日新增车辆报障（首页汇总为演示汇总数据，以下为5条完整演示详情）：",
        card: { type: "faults", filter: "today" },
      };
    case "faultsBlocking":
      return {
        text: "以下报障可能影响出车（演示数据）：",
        card: { type: "faults", filter: "blocking" },
      };
    case "faultsOverdue":
      return {
        text: "以下为超时未处理的报障（演示数据）：",
        card: { type: "faults", filter: "overdue" },
      };
    case "faultsRepeat":
      return {
        text: "以下为出现重复故障的车辆（演示数据）：",
        card: { type: "faults", filter: "repeat" },
      };
    case "faultDetail": {
      const target = plate ?? FAULTS[0]?.plate ?? "";
      return {
        text: `${target} 的报障详情（演示数据）：`,
        card: { type: "faultDetail", plate: target },
      };
    }
    case "faultStatus":
      return {
        text: "请先选择一辆车查看报障详情，再在详情卡片中进行模拟状态更新。",
        card: { type: "faults", filter: "today" },
      };
    case "weekCompare":
      return { text: "本周与上周收益对比（演示数据）：", card: { type: "weekCompare" } };
    case "repeatIssues":
      return {
        text: "统计周期内重复发生故障的设备与车辆汇总（演示数据）：",
        card: { type: "repeatIssues" },
      };
    case "marketingWeek":
      return {
        text: "营销周报（演示数据）：",
        card: { type: "marketing", period: "week" },
        actions: [{ label: "查看营销月报", intent: "marketingMonth" }],
      };
    case "marketingMonth":
      return {
        text: "营销月报（演示数据）：",
        card: { type: "marketing", period: "month" },
        actions: [{ label: "查看营销周报", intent: "marketingWeek" }],
      };
    case "profitTrend":
      return { text: "近7日充电盈利波动（演示数据）：", card: { type: "profitTrend" } };
    case "utilization":
      return { text: "设备与站点利用率（演示数据）：", card: { type: "utilization" } };
    case "orderStats":
      return { text: "订单数量及变化（演示数据）：", card: { type: "orderStats" } };
    case "heat":
      return { text: "各站点充电热力分布（演示数据）：", card: { type: "heat" } };
    case "campaigns":
      return {
        text: "进行中的营销活动情况（演示数据）：",
        card: { type: "campaigns" },
        actions: [{ label: "查看优惠额度与收益对比", intent: "discountCompare" }],
      };
    case "discountCompare":
      return { text: "优惠额度与收益对比（演示数据）：", card: { type: "discountCompare" } };

    case "fleetSaving":
      return { text: "周期内充电费用节省情况（演示数据）：", card: { type: "fleetSaving" } };
    case "fleetBill":
      return { text: "车队整体充电账单（演示数据）：", card: { type: "fleetBill" } };
    case "bestChargeTime":
      return { text: "最佳充电时间建议（演示数据）：", card: { type: "bestChargeTime" } };
    default:
      return { text: "暂无可展示的演示内容。" };
  }
}
