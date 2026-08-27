// 全部为演示模拟数据，不代表真实运营结果。
import type { RiskLevel } from "./demo";

export type RangeKey = "7d" | "30d";

export const BOSS_OVERVIEW = {
  chargedKwh: "18,650 kWh",
  chargeRevenue: "¥38,620",
  electricityRevenue: "¥27,850",
  chargeProfit: "¥10,770",
  gunUtilization: "68.4%",
  orderCount: "326 单",
  fleetChargeShare: "42.6%",
};

export const BOSS_CALIBER_NOTE =
  "当前数据为模拟数据。充电收入包含电费与服务费；充电盈利按服务费实收口径展示，不代表企业完整净利润。";

export interface RangeSeries {
  labels: string[];
  chargedKwh: number[];
  revenue: number[];
  profit: number[];
  orders: number[];
  profitTotal: string;
  grossMargin: string;
  gunUtilization: string;
}

export const BOSS_RANGE_DATA: Record<RangeKey, RangeSeries> = {
  "7d": {
    labels: ["8-12", "8-13", "8-14", "8-15", "8-16", "8-17", "8-18"],
    chargedKwh: [16200, 17100, 15800, 18300, 19050, 17600, 18650],
    revenue: [33800, 35600, 32900, 37400, 39800, 36500, 38620],
    profit: [9200, 9800, 8900, 10200, 11100, 9900, 10770],
    orders: [288, 302, 279, 316, 334, 305, 326],
    profitTotal: "¥69,870",
    grossMargin: "27.6%",
    gunUtilization: "66.8%",
  },
  "30d": {
    labels: ["第1周", "第2周", "第3周", "第4周", "本周"],
    chargedKwh: [108000, 112500, 105300, 118600, 71800],
    revenue: [225000, 234800, 219600, 247300, 149500],
    profit: [61200, 64100, 58900, 67400, 40800],
    orders: [1950, 2040, 1880, 2160, 1290],
    profitTotal: "¥292,400",
    grossMargin: "26.9%",
    gunUtilization: "64.2%",
  },
};

export interface Campaign {
  id: string;
  name: string;
  period: string;
  rule: string;
  participants: number;
  redeemedAmount: number;
}

export const BOSS_CAMPAIGNS: Campaign[] = [
  {
    id: "C1",
    name: "夜间谷期充电立减（演示）",
    period: "2026-08-01 至 2026-08-31",
    rule: "23:00-次日6:00 充电，服务费每度立减 0.10 元",
    participants: 268,
    redeemedAmount: 4820,
  },
  {
    id: "C2",
    name: "车队月度充电返券（演示）",
    period: "2026-08-05 至 2026-09-05",
    rule: "单月累计充电满 3000 度返 200 元充电券",
    participants: 42,
    redeemedAmount: 2600,
  },
];

export type WeatherType = "高温" | "雷暴" | "暴雨" | "台风";

export const WEATHER_ADVICE: Record<WeatherType, string> = {
  高温: "建议及时清理设备灰尘，关注模块过温。",
  雷暴: "建议雷暴期间引导司机暂停充电，避免影响充电桩及车辆安全。",
  暴雨: "建议加强漏电和积水检查，引导司机尽量避免充电。",
  台风: "建议检查设备固定、防水及周边异物风险，必要时按照安全流程处置。",
};

export interface BossWeatherAlert {
  id: string;
  type: WeatherType;
  level: RiskLevel;
  station: string;
  issuedAt: string;
  updatedAt: string;
}

export const BOSS_WEATHER_ALERTS: BossWeatherAlert[] = [
  {
    id: "BW1",
    type: "雷暴",
    level: "orange",
    station: "A站（城东充电站）",
    issuedAt: "2026-08-18 14:20",
    updatedAt: "2026-08-18 16:10",
  },
  {
    id: "BW2",
    type: "暴雨",
    level: "yellow",
    station: "B站（临港充电站）",
    issuedAt: "2026-08-18 15:05",
    updatedAt: "2026-08-18 16:05",
  },
  {
    id: "BW3",
    type: "高温",
    level: "yellow",
    station: "C站（高新充电站）",
    issuedAt: "2026-08-18 10:30",
    updatedAt: "2026-08-18 15:40",
  },
  {
    id: "BW4",
    type: "台风",
    level: "green",
    station: "全部站点（外围影响，演示）",
    issuedAt: "2026-08-17 18:00",
    updatedAt: "2026-08-18 09:00",
  },
];

export const BOSS_WEATHER_NOTICE = "当前为模拟气象预警，未连接真实气象数据。";

export interface DeviceAlarmRank {
  rank: number;
  deviceNo: string;
  station: string;
  alarmCount: number;
  lastAlarmAt: string;
  status: string;
}

export interface FaultAlarmStats {
  alarmCount: number;
  abnormalOrders: number;
  abnormalRate: string;
  ranking: DeviceAlarmRank[];
}

export const BOSS_FAULT_ALARMS: Record<RangeKey, FaultAlarmStats> = {
  "7d": {
    alarmCount: 48,
    abnormalOrders: 21,
    abnormalRate: "1.9%",
    ranking: [
      {
        rank: 1,
        deviceNo: "A-CD-003",
        station: "A站（城东充电站）",
        alarmCount: 11,
        lastAlarmAt: "2026-08-18 09:05",
        status: "运行中",
      },
      {
        rank: 2,
        deviceNo: "A-CD-011",
        station: "A站（城东充电站）",
        alarmCount: 8,
        lastAlarmAt: "2026-08-18 07:22",
        status: "运行中",
      },
      {
        rank: 3,
        deviceNo: "B-CD-005",
        station: "B站（临港充电站）",
        alarmCount: 6,
        lastAlarmAt: "2026-08-17 21:14",
        status: "待检查",
      },
      {
        rank: 4,
        deviceNo: "B-CD-002",
        station: "B站（临港充电站）",
        alarmCount: 5,
        lastAlarmAt: "2026-08-17 15:48",
        status: "运行中",
      },
      {
        rank: 5,
        deviceNo: "C-CD-007",
        station: "C站（高新充电站）",
        alarmCount: 3,
        lastAlarmAt: "2026-08-16 19:30",
        status: "运行中",
      },
    ],
  },
  "30d": {
    alarmCount: 196,
    abnormalOrders: 88,
    abnormalRate: "2.3%",
    ranking: [
      {
        rank: 1,
        deviceNo: "A-CD-003",
        station: "A站（城东充电站）",
        alarmCount: 42,
        lastAlarmAt: "2026-08-18 09:05",
        status: "运行中",
      },
      {
        rank: 2,
        deviceNo: "B-CD-005",
        station: "B站（临港充电站）",
        alarmCount: 35,
        lastAlarmAt: "2026-08-17 21:14",
        status: "待检查",
      },
      {
        rank: 3,
        deviceNo: "A-CD-011",
        station: "A站（城东充电站）",
        alarmCount: 28,
        lastAlarmAt: "2026-08-18 07:22",
        status: "运行中",
      },
      {
        rank: 4,
        deviceNo: "C-CD-007",
        station: "C站（高新充电站）",
        alarmCount: 19,
        lastAlarmAt: "2026-08-16 19:30",
        status: "运行中",
      },
      {
        rank: 5,
        deviceNo: "B-CD-002",
        station: "B站（临港充电站）",
        alarmCount: 16,
        lastAlarmAt: "2026-08-17 15:48",
        status: "运行中",
      },
    ],
  },
};

export const BOSS_RANK_NOTE =
  "排名靠前表示设备在统计周期内上报告警较多，建议进一步检查，不代表已经确认设备存在故障。";
