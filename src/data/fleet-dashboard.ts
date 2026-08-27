// 全部为演示模拟数据，不代表真实运营结果。

export type FleetRangeKey = "yesterday" | "7d" | "30d";

export const FLEET_RANGE_LABEL: Record<FleetRangeKey, string> = {
  yesterday: "昨日",
  "7d": "过去7天",
  "30d": "过去30天",
};

export const FLEET_VEHICLE_STATS = {
  total: 86,
  normal: 79,
  stopped: 7,
};

export interface FleetVehicleStatus {
  plate: string;
  status: "正常" | "停工";
  updatedAt: string;
}

export const FLEET_VEHICLE_LIST: FleetVehicleStatus[] = [
  { plate: "沪A·D2317", status: "停工", updatedAt: "2026-08-18 07:45" },
  { plate: "沪A·D4482", status: "停工", updatedAt: "2026-08-18 09:07" },
  { plate: "沪A·D5090", status: "正常", updatedAt: "2026-08-18 12:10" },
  { plate: "沪A·D6621", status: "正常", updatedAt: "2026-08-18 13:26" },
  { plate: "沪A·D7734", status: "正常", updatedAt: "2026-08-18 14:02" },
  { plate: "沪A·D8156", status: "停工", updatedAt: "2026-08-18 10:38" },
  { plate: "沪A·D8890", status: "正常", updatedAt: "2026-08-18 15:20" },
];

export interface ChargeRecord {
  plate: string;
  station: string;
  time: string;
  period: "尖" | "峰" | "平" | "谷";
  kwh: number;
  fee: number;
  status: "已完成" | "进行中" | "异常结束";
}

export interface FleetChargeStats {
  orders: number;
  totalFee: string;
  totalKwh: string;
  records: ChargeRecord[];
}

const BASE_RECORDS: ChargeRecord[] = [
  {
    plate: "沪A·D2317",
    station: "A站（城东充电站）",
    time: "2026-08-17 15:12",
    period: "峰",
    kwh: 96.4,
    fee: 128.5,
    status: "已完成",
  },
  {
    plate: "沪A·D4482",
    station: "A站（城东充电站）",
    time: "2026-08-17 11:26",
    period: "尖",
    kwh: 88.2,
    fee: 132.3,
    status: "已完成",
  },
  {
    plate: "沪A·D5090",
    station: "B站（临港充电站）",
    time: "2026-08-17 23:48",
    period: "谷",
    kwh: 112.6,
    fee: 96.4,
    status: "已完成",
  },
  {
    plate: "沪A·D6621",
    station: "C站（高新充电站）",
    time: "2026-08-17 09:40",
    period: "平",
    kwh: 74.8,
    fee: 82.1,
    status: "已完成",
  },
  {
    plate: "沪A·D7734",
    station: "A站（城东充电站）",
    time: "2026-08-17 19:30",
    period: "峰",
    kwh: 68.3,
    fee: 91.7,
    status: "异常结束",
  },
  {
    plate: "沪A·D8156",
    station: "B站（临港充电站）",
    time: "2026-08-17 22:15",
    period: "谷",
    kwh: 104.1,
    fee: 88.9,
    status: "已完成",
  },
];

export const FLEET_CHARGE_STATS: Record<FleetRangeKey, FleetChargeStats> = {
  yesterday: {
    orders: 34,
    totalFee: "¥4,286",
    totalKwh: "3,180 kWh",
    records: BASE_RECORDS,
  },
  "7d": {
    orders: 226,
    totalFee: "¥28,940",
    totalKwh: "21,460 kWh",
    records: BASE_RECORDS,
  },
  "30d": {
    orders: 962,
    totalFee: "¥122,380",
    totalKwh: "91,700 kWh",
    records: BASE_RECORDS,
  },
};

export interface PricePeriod {
  period: "尖" | "峰" | "平" | "谷";
  hours: string;
  price: string;
}

export const PRICE_PERIODS: PricePeriod[] = [
  { period: "尖", hours: "11:00-13:00、19:00-21:00", price: "¥1.42/度" },
  { period: "峰", hours: "08:00-11:00、13:00-19:00", price: "¥1.18/度" },
  { period: "平", hours: "07:00-08:00、21:00-23:00", price: "¥0.86/度" },
  { period: "谷", hours: "23:00-次日07:00", price: "¥0.52/度" },
];

export const ORDER_PERIOD_DISTRIBUTION: { period: "尖" | "峰" | "平" | "谷"; orders: number }[] = [
  { period: "尖", orders: 6 },
  { period: "峰", orders: 11 },
  { period: "平", orders: 7 },
  { period: "谷", orders: 10 },
];

export interface AbnormalChargeOrder {
  plate: string;
  driver: string;
  station: string;
  startedAt: string;
  period: "尖" | "峰";
  kwh: number;
  optimizableFee: number;
  suggestion: string;
}

export const ABNORMAL_CHARGE_ORDERS: AbnormalChargeOrder[] = [
  {
    plate: "沪A·D4482",
    driver: "刘师傅",
    station: "A站（城东充电站）",
    startedAt: "2026-08-18 11:26",
    period: "尖",
    kwh: 88.2,
    optimizableFee: 79,
    suggestion: "建议调整为 23:00 后谷期充电",
  },
  {
    plate: "沪A·D2317",
    driver: "陈师傅",
    station: "A站（城东充电站）",
    startedAt: "2026-08-18 15:12",
    period: "峰",
    kwh: 96.4,
    optimizableFee: 64,
    suggestion: "建议错峰至 21:00 后开始充电",
  },
  {
    plate: "沪A·D7734",
    driver: "郑师傅",
    station: "A站（城东充电站）",
    startedAt: "2026-08-18 19:30",
    period: "尖",
    kwh: 68.3,
    optimizableFee: 61,
    suggestion: "建议避开 19:00-21:00 尖时段",
  },
  {
    plate: "沪A·D8890",
    driver: "钱师傅",
    station: "B站（临港充电站）",
    startedAt: "2026-08-18 12:05",
    period: "尖",
    kwh: 52.7,
    optimizableFee: 47,
    suggestion: "建议改为午后平期或夜间谷期补电",
  },
];

export const ABNORMAL_DEFINITION = "异常充电记录定义为：在尖时段或峰时段充电的订单及对应车辆信息。";

export interface FleetFaultVehicle {
  plate: string;
  faultType: "车故障" | "桩/车故障";
  description: string;
  severity: "一般" | "重要" | "紧急";
  blocksDispatch: boolean;
  driverFeedback: string;
  status: string;
  reportedAt: string;
}

export const FLEET_FAULT_VEHICLES: FleetFaultVehicle[] = [
  {
    plate: "沪A·D2317",
    faultType: "车故障",
    description: "上电后仪表报动力电池故障，车辆无法起步。",
    severity: "紧急",
    blocksDispatch: true,
    driverFeedback: "重启两次仍然报警，今天出不了车。",
    status: "待处理",
    reportedAt: "2026-08-18 07:42",
  },
  {
    plate: "沪A·D4482",
    faultType: "桩/车故障",
    description: "A站3号桩插枪后无法启动充电，换桩可以充。",
    severity: "重要",
    blocksDispatch: true,
    driverFeedback: "换到5号桩正常，怀疑车端充电口接触不良。",
    status: "处理中",
    reportedAt: "2026-08-18 09:05",
  },
  {
    plate: "沪A·D8156",
    faultType: "车故障",
    description: "行驶中偶发低压报警，仪表提示检查车辆。",
    severity: "一般",
    blocksDispatch: false,
    driverFeedback: "报警会自动消失，暂时不影响跑车。",
    status: "处理中",
    reportedAt: "2026-08-18 10:36",
  },
];

export const FLEET_FAULT_DISCLAIMER =
  "以上为基于当前演示数据的初步判断，不能替代车辆检修结论，也不直接确定事故或故障责任方。";
