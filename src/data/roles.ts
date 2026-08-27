import type { Role } from "./demo";

export type IntentId =
  // 安全负责人
  | "weather"
  | "rules"
  | "chargingVehicles"
  | "notify"
  | "approval"
  | "timeline"
  | "report"
  // 老板
  | "briefing"
  | "profit"
  | "offpeak"
  | "optimizeVehicles"
  | "saving"
  // 车管人员
  | "faultsToday"
  | "faultsBlocking"
  | "faultsOverdue"
  | "faultsRepeat"
  | "faultDetail"
  | "faultStatus"
  // 老板（预设问题补充）
  | "weekCompare"
  | "repeatIssues"
  | "marketingWeek"
  | "marketingMonth"
  | "profitTrend"
  | "utilization"
  | "orderStats"
  | "heat"
  | "campaigns"
  | "discountCompare"
  // 车管人员（预设问题补充）
  | "fleetSaving"
  | "fleetBill"
  | "bestChargeTime";

export const ROLE_INTENTS: Record<Role, IntentId[]> = {
  boss: [
    "briefing",
    "profit",
    "offpeak",
    "optimizeVehicles",
    "saving",
    "weekCompare",
    "repeatIssues",
    "marketingWeek",
    "marketingMonth",
    "profitTrend",
    "utilization",
    "orderStats",
    "heat",
    "campaigns",
    "discountCompare",
  ],
  fleet: [
    "faultsToday",
    "faultsBlocking",
    "faultsOverdue",
    "faultsRepeat",
    "faultDetail",
    "faultStatus",
    "fleetSaving",
    "fleetBill",
    "bestChargeTime",
  ],
  safety: ["weather", "rules", "chargingVehicles", "notify", "approval", "timeline", "report"],
};

export const ROLE_WELCOME: Record<Role, string> = {
  boss: "您好，我是AI充电运营助手。您当前为【老板】演示视角，可以查询昨日经营简报、收入成本毛利、非谷平期充电情况与预计可节省费用。当前全部为模拟数据。",
  fleet:
    "您好，我是AI充电运营助手。您当前为【车管人员】演示视角，可以查询今日新增车辆报障、影响出车的故障、司机反馈、超时与重复故障，并做模拟状态更新。当前全部为模拟数据。",
  safety:
    "您好，我是AI充电运营助手。当前A站存在1条雷暴橙色预警，有18辆车正在充电。您可以查看风险依据、在充车辆或发起演示停桩审批。当前全部为模拟数据。",
};

export const ROLE_QUICK_QUESTIONS: Record<Role, string[]> = {
  boss: [
    "昨日经营情况怎么样？",
    "毛利率为什么变化？",
    "有哪些车在非谷平期充电？",
    "优化后预计能省多少钱？",
  ],
  fleet: [
    "今日新增了哪些车辆报障？",
    "哪些故障会影响出车？",
    "有哪些超时未处理的报障？",
    "有重复故障的车辆吗？",
  ],
  safety: [
    "当前有哪些恶劣天气预警？",
    "受影响的站点和在充车辆有多少？",
    "这个风险等级的判断依据是什么？",
    "生成一份安全事件报告。",
  ],
};

export const ROLE_SCOPE_HINT: Record<Role, string> = {
  boss: "经营简报、充电收入与成本、毛利与毛利率、非谷平期充电、待优化车辆、预计可节省费用、本周收益对比、盈利波动、订单变化、设备利用率、充电热力分布、重复故障汇总、营销活动与周报月报、优惠额度与收益对比",
  fleet:
    "今日新增车辆报障、影响出车的故障、司机最新反馈、超时未处理报障、重复故障、单辆车报障详情、模拟更新处理状态、周期内预计可节省费用、车队充电账单、最佳充电时间建议",
  safety:
    "恶劣天气预警、风险依据与触发规则、受影响站点、正在充电的车辆与设备、模拟通知记录、模拟停桩审批、事件时间线、安全事件报告",
};

export interface PresetQuestion {
  id: string;
  text: string;
  intent: IntentId;
}

export const PRESET_QUESTIONS: Record<Role, PresetQuestion[]> = {
  boss: [
    { id: "b1", text: "昨日经营情况怎么样？", intent: "briefing" },
    { id: "b2", text: "本周收益和上周相比有什么变化？", intent: "weekCompare" },
    { id: "b3", text: "最近盈利波动大吗？", intent: "profitTrend" },
    { id: "b4", text: "今天订单数量和昨天比如何？", intent: "orderStats" },
    { id: "b5", text: "设备利用率怎么样？", intent: "utilization" },
    { id: "b6", text: "各站点充电热力分布如何？", intent: "heat" },
    { id: "b7", text: "有哪些重复发生的故障？", intent: "repeatIssues" },
    { id: "b8", text: "进行中的营销活动效果如何？", intent: "campaigns" },
    { id: "b9", text: "优惠额度和收益对比如何？", intent: "discountCompare" },
    { id: "b10", text: "生成一份营销周报。", intent: "marketingWeek" },
  ],
  fleet: [
    { id: "f1", text: "今日新增了哪些车辆报障？", intent: "faultsToday" },
    { id: "f2", text: "哪些故障会影响出车？", intent: "faultsBlocking" },
    { id: "f3", text: "有哪些超时未处理的报障？", intent: "faultsOverdue" },
    { id: "f4", text: "有重复故障的车辆吗？", intent: "faultsRepeat" },
    { id: "f5", text: "周期内节省了多少充电费用？", intent: "fleetSaving" },
    { id: "f6", text: "车队整体充电账单是多少？", intent: "fleetBill" },
    { id: "f7", text: "什么时间充电最划算？", intent: "bestChargeTime" },
  ],
  safety: [
    { id: "s1", text: "当前有哪些恶劣天气预警？", intent: "weather" },
    { id: "s2", text: "受影响的站点和在充车辆有多少？", intent: "chargingVehicles" },
    { id: "s3", text: "这个风险等级的判断依据是什么？", intent: "rules" },
    { id: "s4", text: "生成一份安全事件报告。", intent: "report" },
    { id: "s5", text: "查看事件处置时间线。", intent: "timeline" },
  ],
};
