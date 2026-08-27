// 全部为演示模拟数据，不代表真实运营结果。
// 本文件仅补充对话预设问题所需的最少模拟字段，首页已有数据继续复用。

/* ---------------- 老板：本周收益变化 ---------------- */

export interface WeekCompareRow {
  label: string;
  thisWeek: string;
  lastWeek: string;
  delta: string;
}

export const WEEK_COMPARE: WeekCompareRow[] = [
  { label: "充电收入", thisWeek: "¥254,620", lastWeek: "¥241,380", delta: "+5.5%" },
  { label: "充电盈利", thisWeek: "¥69,870", lastWeek: "¥65,240", delta: "+7.1%" },
  { label: "毛利率", thisWeek: "27.6%", lastWeek: "27.0%", delta: "+0.6 个百分点" },
];

export const WEEK_COMPARE_REASONS = [
  "夜间谷期充电立减活动参与车辆增加，订单量环比上升。",
  "A站雷暴预警前出现集中补电，单日充电量高于日常水平。",
  "尖峰时段订单占比略有下降，平均度电成本回落。",
  "部分设备告警导致少量订单异常结束，对收入形成小幅拖累。",
];

/* ---------------- 老板：重复发生故障（汇总） ---------------- */

export interface RepeatIssueRow {
  target: string;
  kind: "设备" | "车辆";
  station: string;
  repeatCount: number;
  lastAt: string;
  status: string;
}

export const REPEAT_ISSUES: RepeatIssueRow[] = [
  {
    target: "A-CD-003",
    kind: "设备",
    station: "A站（城东充电站）",
    repeatCount: 11,
    lastAt: "2026-08-18 09:05",
    status: "运行中",
  },
  {
    target: "A-CD-011",
    kind: "设备",
    station: "A站（城东充电站）",
    repeatCount: 8,
    lastAt: "2026-08-18 07:22",
    status: "运行中",
  },
  {
    target: "B-CD-005",
    kind: "设备",
    station: "B站（临港充电站）",
    repeatCount: 6,
    lastAt: "2026-08-17 21:14",
    status: "待检查",
  },
  {
    target: "沪A·D2317",
    kind: "车辆",
    station: "A站（城东充电站）",
    repeatCount: 3,
    lastAt: "2026-08-18 07:42",
    status: "待处理",
  },
  {
    target: "沪A·D4482",
    kind: "车辆",
    station: "A站（城东充电站）",
    repeatCount: 2,
    lastAt: "2026-08-18 09:05",
    status: "处理中",
  },
];

export const REPEAT_NOTE = "重复次数较多仅表示建议优先排查，不代表已经确认设备或车辆存在质量问题。";

/* ---------------- 老板：营销周报 / 月报 ---------------- */

export interface MarketingReport {
  period: string;
  revenue: string;
  profit: string;
  orders: string;
  newUsers: number;
  loyalUsers: number;
  recalledUsers: number;
  churnedUsers: number;
  campaignParticipants: number;
  redeemedAmount: string;
  summary: string;
  suggestions: string[];
}

export const MARKETING_REPORTS: Record<"week" | "month", MarketingReport> = {
  week: {
    period: "2026-08-12 至 2026-08-18（演示周报）",
    revenue: "¥254,620",
    profit: "¥69,870",
    orders: "2,150 单",
    newUsers: 86,
    loyalUsers: 312,
    recalledUsers: 41,
    churnedUsers: 27,
    campaignParticipants: 268,
    redeemedAmount: "¥4,820",
    summary:
      "夜间谷期立减活动带动谷期订单占比提升，新用户与召回用户合计 127 人，优惠核销金额占充电收入约 1.9%。",
    suggestions: [
      "延续夜间谷期立减，适度提高车队客户的满额返券门槛。",
      "对 27 位流失用户推送定向补电券，观察下周回访率。",
      "A站尖峰时段订单占比偏高，建议引导错峰以改善毛利率。",
    ],
  },
  month: {
    period: "2026-07-19 至 2026-08-18（演示月报）",
    revenue: "¥1,076,200",
    profit: "¥292,400",
    orders: "9,320 单",
    newUsers: 342,
    loyalUsers: 468,
    recalledUsers: 153,
    churnedUsers: 96,
    campaignParticipants: 1024,
    redeemedAmount: "¥21,460",
    summary:
      "月度充电收入环比上升 4.8%，活动参与人数突破 1000 人，优惠成本占收入约 2.0%，整体毛利率稳定在 26.9%。",
    suggestions: [
      "保留两个主力活动，减少低核销率的临时活动。",
      "针对忠诚用户推出月度充电量阶梯返券，稳住基本盘。",
      "结合设备告警排行优先检修高频告警设备，降低异常订单率。",
    ],
  },
};

/* ---------------- 老板：盈利波动 ---------------- */

export const PROFIT_TREND = {
  labels: ["8-12", "8-13", "8-14", "8-15", "8-16", "8-17", "8-18"],
  values: [9200, 9800, 8900, 10200, 11100, 9900, 10770],
  max: "¥11,100（8-16）",
  min: "¥8,900（8-14）",
  avg: "¥9,981",
  reasons: [
    "盈利高点与当日充电量、谷期订单占比同步走高，两者呈正相关。",
    "盈利低点当天异常结束订单较多，可能与设备告警相关。",
    "活动核销金额上升时，单日盈利增速略低于收入增速。",
  ],
  note: "以上仅描述演示数据中的相关性，不能作为已经确认的因果结论。",
};

/* ---------------- 老板：设备利用率 ---------------- */

export interface StationUtilization {
  station: string;
  utilization: string;
  guns: number;
}

export const STATION_UTILIZATION: StationUtilization[] = [
  { station: "A站（城东充电站）", utilization: "74.2%", guns: 32 },
  { station: "B站（临港充电站）", utilization: "65.8%", guns: 24 },
  { station: "C站（高新充电站）", utilization: "58.1%", guns: 20 },
];

export const UTILIZATION_EXTREMES = {
  overall: "68.4%",
  highest: "A-CD-003（A站）· 88.6%",
  lowest: "C-CD-007（C站）· 41.3%",
  suggestions: [
    "C站低利用率设备可考虑在活动中增加谷期立减引导。",
    "A站高负荷设备建议纳入优先巡检，降低告警影响。",
  ],
};

/* ---------------- 老板：订单数量及变化 ---------------- */

export const ORDER_STATS = {
  today: "218 单（截至当前时点）",
  yesterday: "326 单",
  avg7d: "307 单",
  deltaVsYesterday: "今日进度较昨日同时段 +4.1%",
  deltaVs7d: "昨日较近7日平均 +6.2%",
  peakHours: [
    { hours: "08:00-11:00", orders: 74 },
    { hours: "11:00-13:00", orders: 46 },
    { hours: "13:00-19:00", orders: 98 },
    { hours: "19:00-23:00", orders: 52 },
    { hours: "23:00-次日07:00", orders: 56 },
  ],
};

/* ---------------- 老板：充电热力分布 ---------------- */

export interface HeatRow {
  station: string;
  orders: number;
  kwh: string;
  peakTime: string;
  level: "高" | "中" | "低";
}

export const HEAT_DISTRIBUTION: HeatRow[] = [
  {
    station: "A站（城东充电站）",
    orders: 148,
    kwh: "8,920 kWh",
    peakTime: "13:00-19:00",
    level: "高",
  },
  {
    station: "B站（临港充电站）",
    orders: 106,
    kwh: "6,150 kWh",
    peakTime: "23:00-次日03:00",
    level: "中",
  },
  {
    station: "C站（高新充电站）",
    orders: 72,
    kwh: "3,580 kWh",
    peakTime: "08:00-11:00",
    level: "低",
  },
];

export const HEAT_NOTE = "以上为模拟热力分布，未接入地图或真实定位服务。";

/* ---------------- 老板：营销活动情况 ---------------- */

export interface CampaignDetail {
  id: string;
  name: string;
  period: string;
  rule: string;
  participants: number;
  couponsIssued: number;
  couponsRedeemed: number;
  campaignKwh: string;
}

export const CAMPAIGN_DETAILS: CampaignDetail[] = [
  {
    id: "C1",
    name: "夜间谷期充电立减（演示）",
    period: "2026-08-01 至 2026-08-31",
    rule: "23:00-次日6:00 充电，服务费每度立减 0.10 元",
    participants: 268,
    couponsIssued: 640,
    couponsRedeemed: 412,
    campaignKwh: "48,200 kWh",
  },
  {
    id: "C2",
    name: "车队月度充电返券（演示）",
    period: "2026-08-05 至 2026-09-05",
    rule: "单月累计充电满 3000 度返 200 元充电券",
    participants: 42,
    couponsIssued: 96,
    couponsRedeemed: 52,
    campaignKwh: "21,400 kWh",
  },
];

/* ---------------- 老板：优惠额度与收益对比 ---------------- */

export const DISCOUNT_COMPARE = {
  issuedAmount: "¥26,400",
  redeemedAmount: "¥7,420",
  campaignRevenue: "¥254,620",
  campaignProfit: "¥69,870",
  costRatio: "2.9%",
  note: "充电收入为活动期间的营业收入口径，不是净收益；优惠成本占比按已核销金额/充电收入计算。",
};

/* ---------------- 车管：周期内节省的充电费用 ---------------- */

export const FLEET_SAVING = {
  range: "最近7天（演示）",
  estimatedSaving: "¥1,860",
  actualSaving: "¥0",
  shiftableKwh: "2,340 度",
  pendingVehicles: 23,
  note: "当前没有真实执行数据，已实现节省费用为 0 元；预计可节省费用为测算值，不代表已经取得的成果。",
};

/* ---------------- 车管：车队整体账单 ---------------- */

export const FLEET_BILL = {
  range: "最近7天（演示）",
  orders: "226 单",
  kwh: "21,460 kWh",
  fee: "¥28,940",
  periods: [
    { period: "尖", fee: "¥6,180", share: "21.4%" },
    { period: "峰", fee: "¥10,240", share: "35.4%" },
    { period: "平", fee: "¥5,320", share: "18.4%" },
    { period: "谷", fee: "¥7,200", share: "24.8%" },
  ],
  delta: "较上一周期充电开支 +3.6%，充电电量 +2.8%",
  note: "以上为模拟账单，不提供真实支付、对账或开票功能。",
};

/* ---------------- 车管：最佳充电时间 ---------------- */

export const BEST_CHARGE_TIME = {
  recommended: "23:00-次日07:00（谷期，¥0.52/度）",
  secondary: "07:00-08:00、21:00-23:00（平期，¥0.86/度）",
  avoid: "11:00-13:00、19:00-21:00（尖期，¥1.42/度）",
  adjustableVehicles: 23,
  estimatedReduction: "¥1,860 / 7天（预计）",
  suggestions: [
    "将尖时段补电的 9 辆车调整至夜间谷期集中充电。",
    "午间平期补电控制在 30% SOC 以内，其余电量放到夜间。",
    "出车计划紧张的车辆保留峰期快充，不强制错峰。",
  ],
  note: "以上建议基于演示电价和充电记录生成，实际执行前需结合车辆SOC、出车计划和现场运营要求。",
};
