// 全部为演示模拟数据，不代表真实运营结果。

export type RiskLevel = "green" | "yellow" | "orange" | "red";
export type FaultSeverity = "一般" | "重要" | "紧急";
export type Role = "boss" | "fleet" | "safety";

export const RISK_LABEL: Record<RiskLevel, string> = {
  green: "正常",
  yellow: "黄色",
  orange: "橙色",
  red: "红色",
};

export const ROLE_LABEL: Record<Role, string> = {
  boss: "老板",
  fleet: "车管人员",
  safety: "安全负责人",
};

export const DEMO_NOTICE = "当前为演示数据，不代表真实运营结果";

/* ---------------- 站点与天气 ---------------- */

export interface Station {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  deviceCount: number;
  chargingVehicles: number;
  owner: { name: string; contact: string };
  weatherSummary: string;
}

export const STATIONS: Station[] = [
  {
    id: "A",
    name: "A站（城东充电站）",
    riskLevel: "orange",
    deviceCount: 16,
    chargingVehicles: 18,
    owner: { name: "王站长（演示）", contact: "138****0021" },
    weatherSummary: "雷暴橙色预警",
  },
  {
    id: "B",
    name: "B站（临港充电站）",
    riskLevel: "yellow",
    deviceCount: 12,
    chargingVehicles: 6,
    owner: { name: "李站长（演示）", contact: "139****0075" },
    weatherSummary: "暴雨黄色预警",
  },
  {
    id: "C",
    name: "C站（高新充电站）",
    riskLevel: "green",
    deviceCount: 10,
    chargingVehicles: 4,
    owner: { name: "赵站长（演示）", contact: "137****0138" },
    weatherSummary: "当前正常，无天气风险",
  },
];

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  matched: boolean;
}

export interface WeatherAlert {
  id: string;
  stationId: string;
  type: "雷暴" | "暴雨";
  level: RiskLevel;
  source: string;
  issuedAt: string;
  updatedAt: string;
  headline: string;
  rules: AlertRule[];
}

export const WEATHER_ALERTS: WeatherAlert[] = [
  {
    id: "WA-A-001",
    stationId: "A",
    type: "雷暴",
    level: "orange",
    source: "市气象台（演示数据源）",
    issuedAt: "2026-08-18 14:20",
    updatedAt: "2026-08-18 16:10",
    headline: "A站所在区域发布雷暴橙色预警，未来3小时可能出现强雷电与短时大风。",
    rules: [
      { id: "R1", name: "雷暴预警等级", condition: "气象预警等级 ≥ 橙色", matched: true },
      { id: "R2", name: "站点在充规模", condition: "站点同时在充车辆 ≥ 10 辆", matched: true },
      { id: "R3", name: "露天场站", condition: "场站为露天或半露天结构", matched: true },
      { id: "R4", name: "积水风险", condition: "近1小时降水量 ≥ 30mm", matched: false },
    ],
  },
  {
    id: "WA-B-001",
    stationId: "B",
    type: "暴雨",
    level: "yellow",
    source: "市气象台（演示数据源）",
    issuedAt: "2026-08-18 15:05",
    updatedAt: "2026-08-18 16:05",
    headline: "B站所在区域发布暴雨黄色预警，注意场站排水与线缆积水。",
    rules: [
      { id: "R1", name: "暴雨预警等级", condition: "气象预警等级 ≥ 黄色", matched: true },
      { id: "R2", name: "站点在充规模", condition: "站点同时在充车辆 ≥ 5 辆", matched: true },
      { id: "R3", name: "历史积水记录", condition: "近30天出现积水告警", matched: false },
    ],
  },
];

/* ---------------- 在充车辆 ---------------- */

export interface ChargingVehicle {
  id: string;
  plate: string;
  model: string;
  stationId: string;
  soc: number;
  startedAt: string;
  etaFullMin: number;
  driver: string;
}

export const CHARGING_VEHICLES: ChargingVehicle[] = [
  {
    id: "V1",
    plate: "沪A·D2317",
    model: "轻卡（演示）",
    stationId: "A",
    soc: 62,
    startedAt: "15:12",
    etaFullMin: 38,
    driver: "陈师傅",
  },
  {
    id: "V2",
    plate: "沪A·D4482",
    model: "轻卡（演示）",
    stationId: "A",
    soc: 45,
    startedAt: "15:26",
    etaFullMin: 54,
    driver: "刘师傅",
  },
  {
    id: "V3",
    plate: "沪A·D5090",
    model: "厢货（演示）",
    stationId: "A",
    soc: 78,
    startedAt: "14:48",
    etaFullMin: 21,
    driver: "周师傅",
  },
  {
    id: "V4",
    plate: "沪A·D6621",
    model: "厢货（演示）",
    stationId: "A",
    soc: 33,
    startedAt: "15:40",
    etaFullMin: 66,
    driver: "吴师傅",
  },
  {
    id: "V5",
    plate: "沪A·D7734",
    model: "轻卡（演示）",
    stationId: "A",
    soc: 88,
    startedAt: "14:30",
    etaFullMin: 12,
    driver: "郑师傅",
  },
  {
    id: "V6",
    plate: "沪A·D8156",
    model: "中巴（演示）",
    stationId: "B",
    soc: 51,
    startedAt: "15:18",
    etaFullMin: 44,
    driver: "孙师傅",
  },
  {
    id: "V7",
    plate: "沪A·D8890",
    model: "中巴（演示）",
    stationId: "B",
    soc: 27,
    startedAt: "15:52",
    etaFullMin: 72,
    driver: "钱师傅",
  },
];

/* ---------------- 事件时间线与审批 ---------------- */

export interface TimelineEntry {
  at: string;
  actor: string;
  action: string;
  result: string;
}

export const BASE_TIMELINE: TimelineEntry[] = [
  {
    at: "14:20",
    actor: "气象数据源（演示）",
    action: "接收雷暴橙色预警",
    result: "系统生成演示风险事件",
  },
  {
    at: "14:22",
    actor: "风险规则引擎（演示）",
    action: "匹配到 3 条触发规则",
    result: "A站风险等级判定为橙色",
  },
  { at: "16:10", actor: "气象数据源（演示）", action: "预警信息更新", result: "等级维持橙色" },
];

export interface Approval {
  id: string;
  type: "停桩审批";
  status: "待审批";
  isDemo: true;
  affectedStationId: string;
  affectedDeviceCount: number;
  affectedVehicleCount: number;
  createdAt: string;
}

/* ---------------- 经营简报 ---------------- */

export interface DailyBriefing {
  date: string;
  revenue: number;
  cost: number;
  grossProfit: number;
  grossMargin: string;
  revenueDeltaVs7dAvg: string;
  profitDeltaVs7dAvg: string;
  reasons: string[];
  costScope: string;
  estimatedSaving: number;
  actualSaving: number;
  dataUpdatedAt: string;
  isDemo: true;
}

export const DAILY_BRIEFING: DailyBriefing = {
  date: "昨日（演示）",
  revenue: 38620,
  cost: 27850,
  grossProfit: 10770,
  grossMargin: "27.89%",
  revenueDeltaVs7dAvg: "较近7日平均值上升 3.2%",
  profitDeltaVs7dAvg: "较近7日平均值上升 5.1%",
  reasons: [
    "A站雷暴预警前出现集中补电，充电量高于日常水平。",
    "部分车辆在非谷平期充电，购电成本上升，抵消了部分收入增长。",
    "B站设备可用率恢复，服务费收入回升。",
  ],
  costScope: "当前已统计成本仅包含购电成本，不代表完整运营成本。",
  estimatedSaving: 1460,
  actualSaving: 0,
  dataUpdatedAt: "2026-08-18 08:00（演示）",
  isDemo: true,
};

export interface OffPeakChargingOptimization {
  pendingVehicles: number;
  shiftableKwh: number;
  extraCost: number;
  estimatedSaving: number;
  actualSaving: number;
  vehicles: { plate: string; offPeakKwh: number; suggestion: string; estimatedSaving: number }[];
}

export const OFF_PEAK_OPTIMIZATION: OffPeakChargingOptimization = {
  pendingVehicles: 23,
  shiftableKwh: 2180,
  extraCost: 1460,
  estimatedSaving: 1460,
  actualSaving: 0,
  vehicles: [
    {
      plate: "沪A·D2317",
      offPeakKwh: 186,
      suggestion: "建议调整为 23:00 后开始充电",
      estimatedSaving: 128,
    },
    {
      plate: "沪A·D4482",
      offPeakKwh: 164,
      suggestion: "建议调整为 23:30 后开始充电",
      estimatedSaving: 112,
    },
    {
      plate: "沪A·D5090",
      offPeakKwh: 152,
      suggestion: "建议减少午间平期补电",
      estimatedSaving: 96,
    },
    {
      plate: "沪A·D6621",
      offPeakKwh: 141,
      suggestion: "建议调整为夜间集中充电",
      estimatedSaving: 88,
    },
    {
      plate: "沪A·D7734",
      offPeakKwh: 133,
      suggestion: "建议错峰 1 小时开始充电",
      estimatedSaving: 74,
    },
  ],
};

/* ---------------- 车辆报障 ---------------- */

export type FaultCategory =
  "疑似车辆问题" | "疑似充电桩问题" | "疑似司机操作问题" | "疑似通信或平台问题" | "暂时无法判断";

export type FaultStatus = "待处理" | "处理中" | "已解决";

export interface Fault {
  id: string;
  plate: string;
  category: FaultCategory;
  severity: FaultSeverity;
  blocksDispatch: boolean;
  reportedAt: string;
  ageHours: number;
  overdue: boolean;
  repeatCount: number;
  driverFeedback: { at: string; text: string }[];
  status: FaultStatus;
  history: { at: string; actor: string; action: string }[];
}

export const FAULT_DISCLAIMER = "以上为基于当前演示数据的初步判断，不能替代车辆检修结论。";

export const FAULTS: Fault[] = [
  {
    id: "F-2601",
    plate: "沪A·D2317",
    category: "疑似车辆问题",
    severity: "紧急",
    blocksDispatch: true,
    reportedAt: "2026-08-18 07:42",
    ageHours: 9,
    overdue: true,
    repeatCount: 3,
    driverFeedback: [
      { at: "07:42", text: "上电后仪表报动力电池故障，车辆无法起步。" },
      { at: "10:15", text: "重启两次仍然报警，今天出不了车。" },
    ],
    status: "待处理",
    history: [
      { at: "07:45", actor: "系统（演示）", action: "自动创建报障工单" },
      { at: "08:10", actor: "车管人员（演示）", action: "标记为影响出车" },
    ],
  },
  {
    id: "F-2602",
    plate: "沪A·D4482",
    category: "疑似充电桩问题",
    severity: "重要",
    blocksDispatch: true,
    reportedAt: "2026-08-18 09:05",
    ageHours: 7,
    overdue: false,
    repeatCount: 2,
    driverFeedback: [{ at: "09:05", text: "A站3号桩插枪后无法启动充电，换桩可以充。" }],
    status: "处理中",
    history: [
      { at: "09:07", actor: "系统（演示）", action: "自动创建报障工单" },
      { at: "09:40", actor: "运维（演示）", action: "远程复位演示记录" },
    ],
  },
  {
    id: "F-2603",
    plate: "沪A·D5090",
    category: "疑似司机操作问题",
    severity: "一般",
    blocksDispatch: false,
    reportedAt: "2026-08-18 11:20",
    ageHours: 5,
    overdue: false,
    repeatCount: 1,
    driverFeedback: [{ at: "11:20", text: "充电一直不启动，后来发现枪没插到位。" }],
    status: "已解决",
    history: [
      { at: "11:22", actor: "系统（演示）", action: "自动创建报障工单" },
      { at: "11:35", actor: "车管人员（演示）", action: "电话指导后恢复（演示记录）" },
    ],
  },
  {
    id: "F-2604",
    plate: "沪A·D6621",
    category: "疑似通信或平台问题",
    severity: "重要",
    blocksDispatch: false,
    reportedAt: "2026-08-18 12:48",
    ageHours: 3,
    overdue: false,
    repeatCount: 1,
    driverFeedback: [{ at: "12:48", text: "App 上显示离线，实际车辆在正常充电。" }],
    status: "处理中",
    history: [
      { at: "12:50", actor: "系统（演示）", action: "自动创建报障工单" },
      { at: "13:10", actor: "平台运维（演示）", action: "记录数据上报延迟" },
    ],
  },
  {
    id: "F-2605",
    plate: "沪A·D8156",
    category: "暂时无法判断",
    severity: "一般",
    blocksDispatch: false,
    reportedAt: "2026-08-18 13:30",
    ageHours: 2,
    overdue: false,
    repeatCount: 1,
    driverFeedback: [{ at: "13:30", text: "偶发充电中断，重新插枪后能继续，原因不清楚。" }],
    status: "待处理",
    history: [{ at: "13:32", actor: "系统（演示）", action: "自动创建报障工单" }],
  },
];

export interface FaultSummary {
  newToday: number;
  blockingDispatch: number;
  inProgress: number;
  overdue: number;
  repeated: number;
  awaitingDriverFeedback: number;
}

export const FAULT_SUMMARY: FaultSummary = {
  newToday: 7,
  blockingDispatch: 2,
  inProgress: 5,
  overdue: 1,
  repeated: 2,
  awaitingDriverFeedback: 1,
};
