import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RiskTag, StatusTag } from "@/components/common/StatusTag";
import { MetricInfo } from "@/components/common/MetricInfo";
import type { MetricKey } from "@/data/metric-definitions";
import { Sparkline } from "@/components/platform/Sparkline";
import {
  BOSS_CALIBER_NOTE,
  BOSS_CAMPAIGNS,
  BOSS_FAULT_ALARMS,
  BOSS_OVERVIEW,
  BOSS_RANGE_DATA,
  BOSS_RANK_NOTE,
  BOSS_WEATHER_ALERTS,
  BOSS_WEATHER_NOTICE,
  WEATHER_ADVICE,
  type RangeKey,
} from "@/data/boss-dashboard";

const OVERVIEW_ITEMS: { label: string; value: string; metric?: MetricKey }[] = [
  { label: "充电量", value: BOSS_OVERVIEW.chargedKwh, metric: "chargedKwh" },
  { label: "充电收入", value: BOSS_OVERVIEW.chargeRevenue, metric: "chargeRevenue" },
  { label: "电费收入", value: BOSS_OVERVIEW.electricityRevenue },
  { label: "充电盈利", value: BOSS_OVERVIEW.chargeProfit, metric: "chargeProfit" },
  { label: "枪利用率", value: BOSS_OVERVIEW.gunUtilization, metric: "gunUtilization" },
  { label: "订单数量", value: BOSS_OVERVIEW.orderCount, metric: "orderCount" },
  { label: "车队充电占比", value: BOSS_OVERVIEW.fleetChargeShare, metric: "fleetChargeShare" },
];

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "过去7天" },
  { key: "30d", label: "过去30天" },
];

export function BossDashboard() {
  const [range, setRange] = useState<RangeKey>("7d");
  const series = BOSS_RANGE_DATA[range];
  const alarms = BOSS_FAULT_ALARMS[range];

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-base font-semibold text-foreground">场站经营工作台（演示数据）</h2>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-foreground">经营概览（昨日演示数据）</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
          {OVERVIEW_ITEMS.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  {item.label}（昨日演示数据）
                  {item.metric ? <MetricInfo metric={item.metric} /> : null}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{BOSS_CALIBER_NOTE}</p>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">场站运营（演示数据）</h3>
          <div className="flex gap-2">
            {RANGES.map((r) => (
              <Button
                key={r.key}
                size="sm"
                variant={range === r.key ? "default" : "outline"}
                onClick={() => setRange(r.key)}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <Sparkline
            labels={series.labels}
            values={series.chargedKwh}
            title="充电量"
            metric="chargedKwh"
            unit="kWh"
          />
          <Sparkline
            labels={series.labels}
            values={series.revenue}
            title="充电收入"
            metric="chargeRevenue"
            unit="元"
          />
          <Sparkline
            labels={series.labels}
            values={series.profit}
            title="充电盈利"
            metric="chargeProfit"
            unit="元"
          />
          <Sparkline
            labels={series.labels}
            values={series.orders}
            title="订单数量"
            metric="orderCount"
            unit="单"
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                充电盈利总额
                <MetricInfo metric="chargeProfit" />
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{series.profitTotal}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                毛利率
                <MetricInfo metric="grossMargin" />
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{series.grossMargin}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                枪利用率
                <MetricInfo metric="gunUtilization" />
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{series.gunUtilization}</p>
            </CardContent>
          </Card>
        </div>

        <h4 className="mt-4 mb-2 flex items-center gap-1 text-sm font-medium text-foreground">
          进行中的活动（演示数据）
          <MetricInfo metric="ongoingCampaigns" />
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {BOSS_CAMPAIGNS.map((c) => (
            <Card key={c.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{c.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>活动时间：{c.period}</p>
                <p>优惠规则：{c.rule}</p>
                <p className="flex items-center gap-1">
                  参与人数：{c.participants} 人
                  <MetricInfo metric="campaignParticipants" />
                </p>
                <p className="flex items-center gap-1">
                  已核销优惠金额：¥{c.redeemedAmount.toLocaleString("zh-CN")}
                  <MetricInfo metric="campaignCost" />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
          天气预警（演示数据）
          <MetricInfo metric="weatherAlert" />
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">{BOSS_WEATHER_NOTICE}</p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {BOSS_WEATHER_ALERTS.map((a) => (
            <Card key={a.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>{a.type}预警</span>
                  <RiskTag level={a.level} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>影响站点：{a.station}</p>
                <p className="text-xs">发布时间：{a.issuedAt}</p>
                <p className="text-xs">更新时间：{a.updatedAt}</p>
                <p className="text-foreground">{WEATHER_ADVICE[a.type]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          故障告警（{range === "7d" ? "过去7天" : "过去30天"}演示数据）
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                设备告警次数
                <MetricInfo metric="faultAlarmCount" />
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{alarms.alarmCount} 次</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                异常订单数量
                <MetricInfo metric="abnormalOrders" />
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {alarms.abnormalOrders} 单
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                异常订单率
                <MetricInfo metric="abnormalRate" />
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{alarms.abnormalRate}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">设备告警频率排行（演示数据）</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>排名</TableHead>
                  <TableHead>设备编号</TableHead>
                  <TableHead>所属站点</TableHead>
                  <TableHead>告警次数</TableHead>
                  <TableHead>最近告警时间</TableHead>
                  <TableHead>当前状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alarms.ranking.map((d) => (
                  <TableRow key={d.deviceNo}>
                    <TableCell>{d.rank}</TableCell>
                    <TableCell className="font-medium">{d.deviceNo}</TableCell>
                    <TableCell>{d.station}</TableCell>
                    <TableCell>{d.alarmCount} 次</TableCell>
                    <TableCell className="text-muted-foreground">{d.lastAlarmAt}</TableCell>
                    <TableCell>
                      <StatusTag text={d.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-muted-foreground">{BOSS_RANK_NOTE}</p>
      </section>
    </div>
  );
}
