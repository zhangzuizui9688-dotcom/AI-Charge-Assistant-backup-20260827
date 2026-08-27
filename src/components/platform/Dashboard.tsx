import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiskTag, SeverityTag, StatusTag } from "@/components/common/StatusTag";
import { DAILY_BRIEFING, FAULTS, FAULT_SUMMARY, STATIONS, WEATHER_ALERTS } from "@/data/demo";

const KPIS = [
  { label: "昨日充电收入", value: `¥${DAILY_BRIEFING.revenue.toLocaleString("zh-CN")}` },
  { label: "已统计成本", value: `¥${DAILY_BRIEFING.cost.toLocaleString("zh-CN")}` },
  { label: "经营毛利", value: `¥${DAILY_BRIEFING.grossProfit.toLocaleString("zh-CN")}` },
  { label: "毛利率", value: DAILY_BRIEFING.grossMargin },
  {
    label: "当前在充车辆",
    value: `${STATIONS.reduce((s, x) => s + x.chargingVehicles, 0)} 辆`,
  },
];

const SUMMARY_ITEMS = [
  { label: "今日新增报障", value: FAULT_SUMMARY.newToday },
  { label: "影响出车", value: FAULT_SUMMARY.blockingDispatch },
  { label: "处理中", value: FAULT_SUMMARY.inProgress },
  { label: "超时未处理", value: FAULT_SUMMARY.overdue },
  { label: "重复故障", value: FAULT_SUMMARY.repeated },
  { label: "待补充司机反馈", value: FAULT_SUMMARY.awaitingDriverFeedback },
];

export function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">经营概览（演示数据）</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {KPIS.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 text-xl font-semibold text-foreground">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{DAILY_BRIEFING.costScope}</p>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          气象预警（演示数据源：市气象台）
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {STATIONS.map((station) => {
            const alert = WEATHER_ALERTS.find((a) => a.stationId === station.id);
            return (
              <Card key={station.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span>{station.name}</span>
                    <RiskTag level={station.riskLevel} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p className="text-foreground">{station.weatherSummary}</p>
                  <p>
                    在充车辆 {station.chargingVehicles} 辆 · 设备 {station.deviceCount} 台
                  </p>
                  <p className="text-xs">
                    {alert ? `更新时间 ${alert.updatedAt}` : "暂无预警信息"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">站点运行状态（演示数据）</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>站点</TableHead>
                  <TableHead>风险等级</TableHead>
                  <TableHead>设备数</TableHead>
                  <TableHead>在充车辆</TableHead>
                  <TableHead>现场负责人（演示）</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STATIONS.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>
                      <RiskTag level={s.riskLevel} />
                    </TableCell>
                    <TableCell>{s.deviceCount} 台</TableCell>
                    <TableCell>{s.chargingVehicles} 辆</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.owner.name} · {s.owner.contact}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold text-foreground">车辆报障概览</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          以下为演示汇总数据，与下方演示详情数量不要求一一对应。
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {SUMMARY_ITEMS.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-xl font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-3">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>工单号</TableHead>
                  <TableHead>车牌</TableHead>
                  <TableHead>初步分类</TableHead>
                  <TableHead>严重度</TableHead>
                  <TableHead>影响出车</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FAULTS.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{f.id}</TableCell>
                    <TableCell>{f.plate}</TableCell>
                    <TableCell>{f.category}</TableCell>
                    <TableCell>
                      <SeverityTag severity={f.severity} />
                    </TableCell>
                    <TableCell>{f.blocksDispatch ? "是" : "否"}</TableCell>
                    <TableCell>
                      <StatusTag text={f.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
