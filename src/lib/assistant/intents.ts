import { FAULTS, ROLE_LABEL, type Role } from "@/data/demo";
import { ROLE_INTENTS, ROLE_SCOPE_HINT, type IntentId } from "@/data/roles";

const KEYWORDS: Record<IntentId, string[]> = {
  weather: ["天气", "预警", "雷暴", "暴雨", "气象", "风险等级", "恶劣"],
  rules: ["依据", "规则", "为什么是橙色", "判断", "怎么判定", "触发"],
  chargingVehicles: ["在充", "正在充电", "充电车辆", "哪些车在充", "受影响车辆"],
  notify: ["通知", "现场负责人", "站长", "告知"],
  approval: ["停桩", "审批", "停止充电", "停机"],
  timeline: ["时间线", "处置记录", "过程", "事件记录"],
  report: ["报告", "安全事件报告", "生成报告", "总结报告"],

  briefing: ["经营", "简报", "昨日", "经营情况", "日报"],
  profit: ["收入", "成本", "毛利", "毛利率", "利润", "变化原因"],
  offpeak: ["非谷平", "谷平", "错峰", "峰时", "充电时段", "优化充电"],
  optimizeVehicles: ["待优化车辆", "哪些车需要优化", "优化清单", "待优化"],
  saving: ["节省", "省多少", "省钱", "节约"],

  faultsToday: ["新增报障", "今日报障", "报障", "故障", "工单"],
  faultsBlocking: ["影响出车", "出车", "不能出车", "停运"],
  faultsOverdue: ["超时", "未处理", "积压"],
  faultsRepeat: ["重复", "反复", "多次故障"],
  faultDetail: ["详情", "具体情况", "这辆车", "车牌"],
  faultStatus: ["更新状态", "处理状态", "改为", "标记为", "关闭工单"],

  weekCompare: ["本周", "上周", "环比", "周对比", "收益变化"],
  repeatIssues: ["重复发生", "重复故障", "反复故障", "高频告警"],
  marketingWeek: ["营销周报", "周报"],
  marketingMonth: ["营销月报", "月报"],
  profitTrend: ["盈利波动", "波动", "盈利趋势", "利润波动"],
  utilization: ["利用率", "枪利用率", "设备利用率"],
  orderStats: ["订单数量", "订单变化", "多少单", "单量"],
  heat: ["热力", "热力分布", "站点分布", "充电分布"],
  campaigns: ["营销活动", "活动效果", "进行中的活动", "活动情况"],
  discountCompare: ["优惠额度", "优惠成本", "券", "优惠与收益", "收益对比"],

  fleetSaving: ["节省了多少", "节省费用", "省了多少", "周期内节省"],
  fleetBill: ["账单", "充电开支", "花了多少", "费用总计"],
  bestChargeTime: ["最佳充电时间", "什么时间充电", "几点充电", "划算"],
};

const PLATE_RE =
  /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]\s?[A-Za-z]\s?[·.-]?\s?[A-Za-z0-9]{4,6}/g;

function normalizePlate(text: string) {
  return text.replace(/[·.\s-]/g, "").toUpperCase();
}

export interface MatchResult {
  kind: "intent" | "denied" | "unknown";
  intent?: IntentId;
  plate?: string;
  message?: string;
}

function findPlate(text: string): { plate?: string; mentioned?: string } {
  const direct = FAULTS.find(
    (f) => text.includes(f.plate) || normalizePlate(text).includes(normalizePlate(f.plate)),
  );
  if (direct) return { plate: direct.plate };
  const candidates = text.match(PLATE_RE);
  if (candidates && candidates.length > 0) {
    const raw = candidates[0] as string;
    const norm = normalizePlate(raw);
    const hit = FAULTS.find((f) => normalizePlate(f.plate) === norm);
    if (hit) return { plate: hit.plate };
    return { mentioned: raw.trim() };
  }
  return {};
}

export function matchIntent(rawInput: string, role: Role): MatchResult {
  const text = rawInput.trim();
  if (!text) return { kind: "unknown" };

  const allowed = ROLE_INTENTS[role];
  const scores = new Map<IntentId, number>();

  (Object.keys(KEYWORDS) as IntentId[]).forEach((intent) => {
    let score = 0;
    KEYWORDS[intent].forEach((kw) => {
      if (text.includes(kw)) score += kw.length;
    });
    if (score > 0) scores.set(intent, score);
  });

  const { plate, mentioned } = findPlate(text);
  if (plate) scores.set("faultDetail", (scores.get("faultDetail") ?? 0) + 8);
  if (mentioned) {
    return {
      kind: "unknown",
      message: `当前演示数据中未找到该车辆（${mentioned}）。演示环境仅包含 ${FAULTS.map((f) => f.plate).join("、")} 共 ${FAULTS.length} 辆车的报障详情。`,
    };
  }

  if (scores.size === 0) {
    return {
      kind: "unknown",
      message: `我暂时无法识别该问题。当前【${ROLE_LABEL[role]}】演示视角可以询问：${ROLE_SCOPE_HINT[role]}。`,
    };
  }

  const sorted = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const allowedHit = sorted.find(([intent]) => allowed.includes(intent));

  if (!allowedHit) {
    return {
      kind: "denied",
      message: `当前【${ROLE_LABEL[role]}】演示视角不提供该类信息，请切换到对应角色后查询。`,
    };
  }

  return { kind: "intent", intent: allowedHit[0], ...(plate ? { plate } : {}) };
}
