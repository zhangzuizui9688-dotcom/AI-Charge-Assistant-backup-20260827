export interface MetricDefinition {
  /** 字段名称 */
  name: string;
  /** 计算公式或定义 */
  formula: string;
  /** 含义 / 注意事项 */
  meaning: string;
}

export const METRIC_CAVEAT = "当前为演示数据，说明仅展示统一统计口径，不代表真实订单计算结果。";

export const METRIC_DEFINITIONS = {
  chargeRevenue: {
    name: "充电收入",
    formula: "时段内所有充电订单金额总和",
    meaning:
      "自然日按 00:00—24:00 统计，按支付时间字段判断归属日期；不包含 24:00 前尚未停止充电的订单。",
  },
  chargeProfit: {
    name: "充电盈利",
    formula: "时段内所有充电订单的服务费实收金额总和",
    meaning:
      "实收需扣除部分运营平台 10%—15% 的服务费抽成，以实际入账金额为准，不等同于服务费应收金额。",
  },
  weeklyProfit: {
    name: "周盈利情况",
    formula: "充电截止时间在周一 00:00 至周日 24:00 之间的所有充电订单服务费实收金额总和",
    meaning: "按充电截止时间归属自然周，跨周订单归入截止时间所在周。",
  },
  grossMargin: {
    name: "毛利率",
    formula: "服务费总计 ÷ 充电收入总计",
    meaning: "充电收入＝电费＋服务费；电费需缴纳给国家电网，属于固定支出，不计入毛利。",
  },
  gunOccupancy: {
    name: "枪占用率",
    formula: "充电枪充电时间 ÷ 统计周期总小时数",
    meaning: "充电时间为全部订单充电时长总和，跨天订单只统计至当天 24:00。与“枪利用率”口径不同。",
  },
  gunUtilization: {
    name: "枪利用率",
    formula: "产生过订单的充电枪数量 ÷ 可用充电枪数量",
    meaning: "按枪的“是否被使用”统计，与按充电时间计算的“枪占用率”区分，两者不可直接比较。",
  },
  chargedKwh: {
    name: "充电量",
    formula: "选择时段内所有订单的充电量总和",
    meaning: "单位为度（kWh），按订单归属时段汇总。",
  },
  orderCount: {
    name: "订单数量",
    formula: "选择时段内所有完成支付订单的数量总和",
    meaning: "仅统计完成支付的订单，未支付或已取消订单不计入。",
  },
  serviceFeeRevenue: {
    name: "服务费收入",
    formula: "充电截止时间为当日 24:00 前的所有充电订单服务费实收金额总和",
    meaning: "按充电截止时间归属当日，实收口径已扣除平台抽成。",
  },
  newUsers: {
    name: "新用户",
    formula: "首次在该场站充电的用户",
    meaning: "只在周报、月报显示；统计周期为“天”时不统计用户类型。",
  },
  loyalUsers: {
    name: "忠诚用户",
    formula: "近两周均至少有一笔订单的用户",
    meaning: "两周内任一周没有订单则不计入忠诚用户。",
  },
  recalledUsers: {
    name: "召回用户",
    formula: "近一周内下过订单，且此前只在一个月前有订单的用户",
    meaning: "用于衡量沉默用户被重新激活的规模。",
  },
  churnedUsers: {
    name: "流失用户",
    formula: "过去 30 天有订单，但最近 14 天没有订单的用户",
    meaning: "口径基于订单时间窗口判断，不代表用户主动注销。",
  },
  fleetChargeShare: {
    name: "车队充电占比",
    formula: "车队库内车辆充电电量 ÷ 同期整个场站充电电量",
    meaning: "分子仅包含已纳入车队库的车辆，分母为同期场站全部充电电量。",
  },
  campaignCost: {
    name: "活动成本",
    formula: "活动期间已经核销的优惠券金额总和",
    meaning: "表示需要商家承担的优惠金额，未核销的已发放优惠券不计入成本。",
  },
  campaignParticipants: {
    name: "活动人数",
    formula: "领取优惠券的用户总数",
    meaning: "同一用户领取多张优惠券需要去重，只计 1 人。",
  },
  campaignKwh: {
    name: "活动电量",
    formula: "使用优惠券订单的充电量总和",
    meaning: "仅统计实际核销优惠券的订单充电量。",
  },
  ongoingCampaigns: {
    name: "进行中的活动",
    formula: "当前仍在活动有效期内的活动详情及优惠券使用规则",
    meaning: "有效期结束的活动不再展示在进行中列表。",
  },
  weatherAlert: {
    name: "天气预警",
    formula: "气象台发布的天气预警信息",
    meaning:
      "高温建议及时清灰、防止模块过温；雷暴期间建议引导司机停止充电，避免影响充电桩和车辆安全；暴雨期间注意漏电防护，并建议司机尽量避免充电。",
  },
  faultAlarmCount: {
    name: "故障告警数量",
    formula: "场站内设备产生的告警信息数量",
    meaning: "按告警条数统计，同一设备多次告警会重复计数。",
  },
  abnormalOrders: {
    name: "异常订单数量",
    formula: "统计周期内状态为“异常订单”的订单数量总和",
    meaning: "以订单状态字段为准，不含正常完成的订单。",
  },
  abnormalRate: {
    name: "异常订单率",
    formula: "异常订单数量 ÷ 全部订单数量",
    meaning: "分母为统计周期内全部订单数量。",
  },
  abnormalChargeRecords: {
    name: "异常充电记录",
    formula: "车管人员端展示在“尖”“峰”时段充电的订单及对应车辆信息",
    meaning: "用于识别高电价时段充电行为，不代表订单本身出现故障。",
  },
  vehicleFaultMonitor: {
    name: "车辆故障监控",
    formula: "从故障告警中筛选故障类型为“车故障”或“桩/车故障”的记录",
    meaning: "统计故障数量及对应车辆信息，其他故障类型不计入。",
  },
} as const;

export type MetricKey = keyof typeof METRIC_DEFINITIONS;
