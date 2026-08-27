import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RiskTag, SeverityTag, StatusTag } from "@/components/common/StatusTag";
import { MetricInfo } from "@/components/common/MetricInfo";
import type { MetricKey } from "@/data/metric-definitions";
import { useAssistant } from "@/context/assistant-context";
import {
  BASE_TIMELINE,
  CHARGING_VEHICLES,
  DAILY_BRIEFING,
  FAULTS,
  FAULT_DISCLAIMER,
  OFF_PEAK_OPTIMIZATION,
  STATIONS,
  WEATHER_ALERTS,
  type FaultStatus,
} from "@/data/demo";
import {
  BEST_CHARGE_TIME,
  CAMPAIGN_DETAILS,
  DISCOUNT_COMPARE,
  FLEET_BILL,
  FLEET_SAVING,
  HEAT_DISTRIBUTION,
  HEAT_NOTE,
  MARKETING_REPORTS,
  ORDER_STATS,
  PROFIT_TREND,
  REPEAT_ISSUES,
  REPEAT_NOTE,
  STATION_UTILIZATION,
  UTILIZATION_EXTREMES,
  WEEK_COMPARE,
  WEEK_COMPARE_REASONS,
} from "@/data/assistant-extra";
import type { CardPayload } from "@/lib/assistant/types";

const REPORT_DISCLAIMER =
  "本报告使用模拟数据，用于展示系统预警、通知和处置记录能力，不代表真实事件，不直接替代专业事故调查或法律责任认定。";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mt-2 border-border">
      <CardContent className="space-y-2 p-3 text-sm">{children}</CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  metric,
}: {
  label: string;
  value: React.ReactNode;
  metric?: MetricKey;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="flex items-center gap-1 text-muted-foreground">
        {label}
        {metric ? <MetricInfo metric={metric} /> : null}
      </span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function RiskCard() {
  return (
    <Shell>
      {STATIONS.map((s) => {
        const alert = WEATHER_ALERTS.find((a) => a.stationId === s.id);
        return (
          <div key={s.id} className="rounded-md border border-border p-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{s.name}</span>
              <RiskTag level={s.riskLevel} />
            </div>
            <p className="mt-1 text-muted-foreground">{s.weatherSummary}</p>
            <p className="text-muted-foreground">
              在充车辆 {s.chargingVehicles} 辆 · 设备 {s.deviceCount} 台
            </p>
            {alert ? (
              <p className="text-xs text-muted-foreground">
                来源：{alert.source} · 发布 {alert.issuedAt} · 更新 {alert.updatedAt}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">当前无生效气象预警</p>
            )}
          </div>
        );
      })}
    </Shell>
  );
}

function RulesCard() {
  const alert = WEATHER_ALERTS[0];
  if (!alert) return null;
  return (
    <Shell>
      <p className="text-muted-foreground">{alert.headline}</p>
      <Separator />
      {alert.rules.map((r) => (
        <div key={r.id} className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.condition}</p>
          </div>
          <StatusTag text={r.matched ? "已触发" : "未触发"} />
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        风险等级由以上演示规则综合判定，仅用于试用展示。
      </p>
    </Shell>
  );
}

function VehiclesCard() {
  return (
    <Shell>
      <div className="space-y-2">
        {CHARGING_VEHICLES.map((v) => (
          <div key={v.id} className="rounded-md border border-border p-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{v.plate}</span>
              <StatusTag text={`${v.stationId}站`} />
            </div>
            <p className="text-xs text-muted-foreground">
              {v.model} · SOC {v.soc}% · 开始 {v.startedAt} · 预计还需 {v.etaFullMin} 分钟 ·
              {v.driver}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        以上为演示明细，A站共18辆、B站共6辆在充车辆（演示汇总）。
      </p>
    </Shell>
  );
}

function TimelineCard() {
  const { overrides } = useAssistant();
  const entries = [...BASE_TIMELINE, ...overrides.timelineExtra];
  return (
    <Shell>
      {entries.map((e, i) => (
        <div key={`${e.at}-${i}`} className="border-l-2 border-primary/30 pl-3">
          <p className="text-xs text-muted-foreground">{e.at}</p>
          <p className="font-medium text-foreground">
            {e.actor}
            {e.action}
          </p>
          <p className="text-xs text-muted-foreground">{e.result}</p>
        </div>
      ))}
      {overrides.approvals.length > 0 && (
        <>
          <Separator />
          {overrides.approvals.map((a) => (
            <div key={a.id + a.createdAt} className="rounded-md bg-secondary p-2 text-xs">
              模拟审批 {a.id} · 状态 {a.status} · 站点 {a.affectedStationId}站 · 设备{" "}
              {a.affectedDeviceCount} 台 · 在充车辆 {a.affectedVehicleCount} 辆 · 创建于{" "}
              {a.createdAt}（isDemo: true）
            </div>
          ))}
        </>
      )}
    </Shell>
  );
}

function buildReportText(extraLines: string[]) {
  const a = WEATHER_ALERTS[0];
  const s = STATIONS[0];
  return [
    "安全事件报告（演示）",
    `事件站点：${s?.name ?? "A站"}`,
    `预警类型：${a?.type ?? "雷暴"}（${a ? "橙色" : ""}）`,
    `预警来源：${a?.source ?? ""}，更新时间 ${a?.updatedAt ?? ""}`,
    `受影响设备：${s?.deviceCount ?? 16} 台；正在充电车辆：${s?.chargingVehicles ?? 18} 辆`,
    "触发规则：雷暴预警等级≥橙色、站点同时在充车辆≥10辆、露天场站",
    "处置记录：",
    ...BASE_TIMELINE.map((t) => `  ${t.at} ${t.actor}${t.action} — ${t.result}`),
    ...extraLines,
    "",
    REPORT_DISCLAIMER,
  ].join("\n");
}

function ReportCard() {
  const { overrides } = useAssistant();
  const [copied, setCopied] = useState(false);
  const extra = overrides.timelineExtra.map((t) => `  ${t.at} ${t.actor}${t.action} — ${t.result}`);
  const text = buildReportText(extra);

  return (
    <Shell>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-secondary p-2 text-xs text-secondary-foreground">
        {text}
      </pre>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          void navigator.clipboard?.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "已复制报告文本" : "复制报告文本"}
      </Button>
      <p className="text-xs text-muted-foreground">{REPORT_DISCLAIMER}</p>
    </Shell>
  );
}

function BriefingCard() {
  const b = DAILY_BRIEFING;
  return (
    <Shell>
      <Row
        metric="chargeRevenue"
        label="充电收入"
        value={`¥${b.revenue.toLocaleString("zh-CN")}`}
      />
      <Row label="已统计成本" value={`¥${b.cost.toLocaleString("zh-CN")}`} />
      <Row label="经营毛利" value={`¥${b.grossProfit.toLocaleString("zh-CN")}`} />
      <Row metric="grossMargin" label="毛利率" value={b.grossMargin} />
      <Row label="收入变化" value={b.revenueDeltaVs7dAvg} />
      <Row label="毛利变化" value={b.profitDeltaVs7dAvg} />
      <Separator />
      <p className="font-medium text-foreground">收益变化原因（演示分析）</p>
      <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
        {b.reasons.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <Separator />
      <Row label="预计可节省费用" value={`¥${b.estimatedSaving.toLocaleString("zh-CN")}`} />
      <Row label="已实现节省费用" value={`¥${b.actualSaving.toLocaleString("zh-CN")}`} />
      <p className="text-xs text-muted-foreground">
        预计可节省费用为测算值，尚未执行，不代表已经取得的收益。
      </p>
      <p className="text-xs text-muted-foreground">{b.costScope}</p>
      <p className="text-xs text-muted-foreground">数据更新时间：{b.dataUpdatedAt}</p>
    </Shell>
  );
}

function OffPeakCard() {
  const o = OFF_PEAK_OPTIMIZATION;
  return (
    <Shell>
      <Row label="待优化车辆" value={`${o.pendingVehicles} 辆`} />
      <Row label="可转移电量" value={`${o.shiftableKwh.toLocaleString("zh-CN")} 度`} />
      <Row label="预计增加电费" value={`¥${o.extraCost.toLocaleString("zh-CN")}`} />
      <Row label="预计可节省费用" value={`¥${o.estimatedSaving.toLocaleString("zh-CN")}`} />
      <Row label="已实现节省费用" value={`¥${o.actualSaving.toLocaleString("zh-CN")}`} />
      <p className="text-xs text-muted-foreground">
        预计节省为测算结果，第一版没有真实执行数据，已实现节省为 0 元。
      </p>
    </Shell>
  );
}

function OptimizeVehiclesCard() {
  return (
    <Shell>
      {OFF_PEAK_OPTIMIZATION.vehicles.map((v) => (
        <div key={v.plate} className="rounded-md border border-border p-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{v.plate}</span>
            <span className="text-xs text-muted-foreground">预计可节省 ¥{v.estimatedSaving}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            非谷平期充电 {v.offPeakKwh} 度 · {v.suggestion}
          </p>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        以上为演示建议，节省金额为预计值，尚未实际执行。
      </p>
    </Shell>
  );
}

function FaultsCard({ filter }: { filter: "today" | "blocking" | "overdue" | "repeat" }) {
  const { overrides, runIntent } = useAssistant();
  const list = FAULTS.filter((f) => {
    if (filter === "blocking") return f.blocksDispatch;
    if (filter === "overdue") return f.overdue;
    if (filter === "repeat") return f.repeatCount > 1;
    return true;
  });

  return (
    <Shell>
      {list.length === 0 && (
        <p className="text-muted-foreground">当前演示数据中没有符合条件的报障。</p>
      )}
      {list.map((f) => (
        <div key={f.id} className="rounded-md border border-border p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">
              {f.plate} · {f.id}
            </span>
            <SeverityTag severity={f.severity} />
          </div>
          <p className="text-xs text-muted-foreground">
            {f.category} · 报障 {f.reportedAt} · 已 {f.ageHours} 小时
            {f.blocksDispatch ? " · 影响出车" : ""}
            {f.overdue ? " · 超时未处理" : ""}
            {f.repeatCount > 1 ? ` · 重复 ${f.repeatCount} 次` : ""}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <StatusTag text={overrides.faultStatus[f.id] ?? f.status} />
            <Button size="sm" variant="outline" onClick={() => runIntent("faultDetail", f.plate)}>
              查看详情
            </Button>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">{FAULT_DISCLAIMER}</p>
    </Shell>
  );
}

const STATUS_OPTIONS: FaultStatus[] = ["待处理", "处理中", "已解决"];

function FaultDetailCard({ plate }: { plate: string }) {
  const { overrides, updateFaultStatus } = useAssistant();
  const fault = FAULTS.find((f) => f.plate === plate);
  if (!fault) return null;
  const status = overrides.faultStatus[fault.id] ?? fault.status;

  return (
    <Shell>
      <Row label="车牌" value={fault.plate} />
      <Row label="工单号" value={fault.id} />
      <Row label="初步分类" value={fault.category} />
      <Row label="严重度" value={<SeverityTag severity={fault.severity} />} />
      <Row label="影响出车" value={fault.blocksDispatch ? "是" : "否"} />
      <Row label="重复次数" value={`${fault.repeatCount} 次`} />
      <Row label="当前状态" value={<StatusTag text={status} />} />
      <Separator />
      <p className="font-medium text-foreground">司机反馈</p>
      {fault.driverFeedback.map((d) => (
        <p key={d.at} className="text-xs text-muted-foreground">
          {d.at} · {d.text}
        </p>
      ))}
      <Separator />
      <p className="font-medium text-foreground">处理记录（演示）</p>
      {fault.history.map((h) => (
        <p key={h.at + h.action} className="text-xs text-muted-foreground">
          {h.at} · {h.actor}：{h.action}
        </p>
      ))}
      <Separator />
      <p className="font-medium text-foreground">模拟更新处理状态</p>
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={s === status ? "default" : "outline"}
            onClick={() => updateFaultStatus(fault.id, fault.plate, s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{FAULT_DISCLAIMER}</p>
    </Shell>
  );
}

function Note({ text }: { text: string }) {
  return <p className="text-xs text-muted-foreground">{text}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function WeekCompareCard() {
  return (
    <Shell>
      {WEEK_COMPARE.map((r) => (
        <Row
          key={r.label}
          label={r.label}
          value={`${r.thisWeek}（上周 ${r.lastWeek}，${r.delta}）`}
        />
      ))}
      <Separator />
      <p className="font-medium text-foreground">变化原因（演示分析）</p>
      <Bullets items={WEEK_COMPARE_REASONS} />
      <Note text="以上为演示数据的对比结果，不代表真实经营业绩。" />
    </Shell>
  );
}

function RepeatIssuesCard() {
  return (
    <Shell>
      {REPEAT_ISSUES.map((r) => (
        <div key={r.target} className="rounded-md border border-border p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">
              {r.target} · {r.kind}
            </span>
            <StatusTag text={r.status} />
          </div>
          <p className="text-xs text-muted-foreground">
            {r.station} · 重复 {r.repeatCount} 次 · 最近 {r.lastAt}
          </p>
        </div>
      ))}
      <Note text={REPEAT_NOTE} />
    </Shell>
  );
}

function MarketingCard({ period }: { period: "week" | "month" }) {
  const r = MARKETING_REPORTS[period];
  return (
    <Shell>
      <Row label="统计周期" value={r.period} />
      <Row metric="chargeRevenue" label="充电收入" value={r.revenue} />
      <Row metric="chargeProfit" label="充电盈利" value={r.profit} />
      <Row metric="orderCount" label="订单数量" value={r.orders} />
      <Separator />
      <Row metric="newUsers" label="新增用户" value={`${r.newUsers} 人`} />
      <Row metric="loyalUsers" label="忠诚用户" value={`${r.loyalUsers} 人`} />
      <Row metric="recalledUsers" label="召回用户" value={`${r.recalledUsers} 人`} />
      <Row metric="churnedUsers" label="流失用户" value={`${r.churnedUsers} 人`} />
      <Row
        metric="campaignParticipants"
        label="活动参与人数"
        value={`${r.campaignParticipants} 人`}
      />
      <Row metric="campaignCost" label="已核销优惠金额" value={r.redeemedAmount} />
      <Separator />
      <p className="text-muted-foreground">{r.summary}</p>
      <p className="font-medium text-foreground">运营建议（演示）</p>
      <Bullets items={r.suggestions} />
      <Note text="本报告为演示数据生成，不代表真实营销结果，也不构成投放承诺。" />
    </Shell>
  );
}

function ProfitTrendCard() {
  const max = Math.max(...PROFIT_TREND.values);
  return (
    <Shell>
      <div className="flex h-24 items-end gap-1">
        {PROFIT_TREND.values.map((v, i) => (
          <div key={PROFIT_TREND.labels[i]} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-primary/70"
              style={{ height: `${Math.round((v / max) * 72)}px` }}
            />
            <span className="text-[10px] text-muted-foreground">{PROFIT_TREND.labels[i]}</span>
          </div>
        ))}
      </div>
      <Row label="最高" value={PROFIT_TREND.max} />
      <Row label="最低" value={PROFIT_TREND.min} />
      <Row label="日均" value={PROFIT_TREND.avg} />
      <Separator />
      <p className="font-medium text-foreground">波动原因（演示分析）</p>
      <Bullets items={PROFIT_TREND.reasons} />
      <Note text={PROFIT_TREND.note} />
    </Shell>
  );
}

function UtilizationCard() {
  return (
    <Shell>
      <Row metric="gunUtilization" label="整体枪利用率" value={UTILIZATION_EXTREMES.overall} />
      <Row label="最高设备" value={UTILIZATION_EXTREMES.highest} />
      <Row label="最低设备" value={UTILIZATION_EXTREMES.lowest} />
      <Separator />
      {STATION_UTILIZATION.map((s) => (
        <Row key={s.station} label={s.station} value={`${s.utilization} · ${s.guns} 把枪`} />
      ))}
      <Separator />
      <Bullets items={UTILIZATION_EXTREMES.suggestions} />
      <Note text="以上为演示数据统计口径，不代表真实设备运行状态。" />
    </Shell>
  );
}

function OrderStatsCard() {
  return (
    <Shell>
      <Row metric="orderCount" label="今日订单" value={ORDER_STATS.today} />
      <Row label="昨日订单" value={ORDER_STATS.yesterday} />
      <Row label="近7日平均" value={ORDER_STATS.avg7d} />
      <Row label="与昨日对比" value={ORDER_STATS.deltaVsYesterday} />
      <Row label="与近7日对比" value={ORDER_STATS.deltaVs7d} />
      <Separator />
      <p className="font-medium text-foreground">时段分布（演示）</p>
      {ORDER_STATS.peakHours.map((h) => (
        <Row key={h.hours} label={h.hours} value={`${h.orders} 单`} />
      ))}
      <Note text="订单数据为演示模拟值，与首页演示数据保持一致。" />
    </Shell>
  );
}

function HeatCard() {
  return (
    <Shell>
      {HEAT_DISTRIBUTION.map((h) => (
        <div key={h.station} className="rounded-md border border-border p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">{h.station}</span>
            <StatusTag text={`热度 ${h.level}`} />
          </div>
          <p className="text-xs text-muted-foreground">
            {h.orders} 单 · {h.kwh} · 高峰 {h.peakTime}
          </p>
        </div>
      ))}
      <Note text={HEAT_NOTE} />
    </Shell>
  );
}

function CampaignsCard() {
  return (
    <Shell>
      {CAMPAIGN_DETAILS.map((c) => (
        <div key={c.id} className="rounded-md border border-border p-2">
          <p className="font-medium text-foreground">{c.name}</p>
          <p className="text-xs text-muted-foreground">
            {c.period} · {c.rule}
          </p>
          <p className="text-xs text-muted-foreground">
            参与 {c.participants} 人 · 发券 {c.couponsIssued} 张 · 核销 {c.couponsRedeemed} 张 ·
            活动充电量 {c.campaignKwh}
          </p>
        </div>
      ))}
      <Note text="以上为演示活动数据，不代表真实活动效果。" />
    </Shell>
  );
}

function DiscountCompareCard() {
  const d = DISCOUNT_COMPARE;
  return (
    <Shell>
      <Row label="已发放优惠额度" value={d.issuedAmount} />
      <Row metric="campaignCost" label="已核销优惠金额" value={d.redeemedAmount} />
      <Row label="活动期间充电收入" value={d.campaignRevenue} />
      <Row label="活动期间充电盈利" value={d.campaignProfit} />
      <Row label="优惠成本占收入比" value={d.costRatio} />
      <Note text={d.note} />
    </Shell>
  );
}

function FleetSavingCard() {
  const f = FLEET_SAVING;
  return (
    <Shell>
      <Row label="统计周期" value={f.range} />
      <Row label="预计可节省费用" value={f.estimatedSaving} />
      <Row label="已实现节省费用" value={f.actualSaving} />
      <Row label="可调整电量" value={f.shiftableKwh} />
      <Row label="待优化车辆" value={`${f.pendingVehicles} 辆`} />
      <Note text={f.note} />
    </Shell>
  );
}

function FleetBillCard() {
  const b = FLEET_BILL;
  return (
    <Shell>
      <Row label="统计周期" value={b.range} />
      <Row label="充电订单" value={b.orders} />
      <Row metric="chargedKwh" label="充电电量" value={b.kwh} />
      <Row label="充电开支" value={b.fee} />
      <Separator />
      {b.periods.map((p) => (
        <Row key={p.period} label={`${p.period}时段`} value={`${p.fee} · 占比 ${p.share}`} />
      ))}
      <Row label="环比变化" value={b.delta} />
      <Note text={b.note} />
    </Shell>
  );
}

function BestChargeTimeCard() {
  const t = BEST_CHARGE_TIME;
  return (
    <Shell>
      <Row label="推荐时段" value={t.recommended} />
      <Row label="次选时段" value={t.secondary} />
      <Row label="建议避开" value={t.avoid} />
      <Row label="可调整车辆" value={`${t.adjustableVehicles} 辆`} />
      <Row label="预计可优化费用" value={t.estimatedReduction} />
      <Separator />
      <Bullets items={t.suggestions} />
      <Note text={t.note} />
    </Shell>
  );
}

export function MessageCard({ card }: { card: CardPayload }) {
  switch (card.type) {
    case "risk":
      return <RiskCard />;
    case "rules":
      return <RulesCard />;
    case "vehicles":
      return <VehiclesCard />;
    case "timeline":
      return <TimelineCard />;
    case "report":
      return <ReportCard />;
    case "briefing":
      return <BriefingCard />;
    case "offpeak":
      return <OffPeakCard />;
    case "optimizeVehicles":
      return <OptimizeVehiclesCard />;
    case "faults":
      return <FaultsCard filter={card.filter} />;
    case "faultDetail":
      return <FaultDetailCard plate={card.plate} />;
    case "weekCompare":
      return <WeekCompareCard />;
    case "repeatIssues":
      return <RepeatIssuesCard />;
    case "marketing":
      return <MarketingCard period={card.period} />;
    case "profitTrend":
      return <ProfitTrendCard />;
    case "utilization":
      return <UtilizationCard />;
    case "orderStats":
      return <OrderStatsCard />;
    case "heat":
      return <HeatCard />;
    case "campaigns":
      return <CampaignsCard />;
    case "discountCompare":
      return <DiscountCompareCard />;
    case "fleetSaving":
      return <FleetSavingCard />;
    case "fleetBill":
      return <FleetBillCard />;
    case "bestChargeTime":
      return <BestChargeTimeCard />;
    default:
      return null;
  }
}
