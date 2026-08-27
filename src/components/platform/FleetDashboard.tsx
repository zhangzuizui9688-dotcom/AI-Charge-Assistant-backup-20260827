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
import { SeverityTag, StatusTag } from "@/components/common/StatusTag";
import { MetricInfo } from "@/components/common/MetricInfo";
import {
  ABNORMAL_CHARGE_ORDERS,
  ABNORMAL_DEFINITION,
  FLEET_CHARGE_STATS,
  FLEET_FAULT_DISCLAIMER,
  FLEET_FAULT_VEHICLES,
  FLEET_RANGE_LABEL,
  FLEET_VEHICLE_LIST,
  FLEET_VEHICLE_STATS,
  ORDER_PERIOD_DISTRIBUTION,
  PRICE_PERIODS,
  type FleetRangeKey,
} from "@/data/fleet-dashboard";

const RANGES: FleetRangeKey[] = ["yesterday", "7d", "30d"];

export function FleetDashboard() {
  const [range, setRange] = useState<FleetRangeKey>("yesterday");
  const stats = FLEET_CHARGE_STATS[range];
  const maxOrders = Math.max(...ORDER_PERIOD_DISTRIBUTION.map((p) => p.orders));
  const faultBlocking = FLEET_FAULT_VEHICLES.filter((v) => v.blocksDispatch).length;

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-base font-semibold text-foreground">车队管理工作台（演示数据）</h2>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-foreground">车辆管理（演示数据）</h3>
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">车队车辆总数</p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {FLEET_VEHICLE_STATS.total} 辆
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">正常车辆数量</p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {FLEET_VEHICLE_STATS.normal} 辆
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">停工车辆数量</p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {FLEET_VEHICLE_STATS.stopped} 辆
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-3">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>车牌号</TableHead>
                  <TableHead>当前状态</TableHead>
                  <TableHead>状态更新时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FLEET_VEHICLE_LIST.map((v) => (
                  <TableRow key={v.plate}>
                    <TableCell className="font-medium">{v.plate}</TableCell>
                    <TableCell>
                      <StatusTag text={v.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{v.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">车辆充电记录（演示数据）</h3>
          <div className="flex gap-2">
            {RANGES.map((r) => (
              <Button
                key={r}
                size="sm"
                variant={range === r ? "default" : "outline"}
                onClick={() => setRange(r)}
              >
                {FLEET_RANGE_LABEL[r]}
              </Button>
            ))}
          </div>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">仅统计当前演示车队名下车辆的充电订单。</p>
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                车辆充电订单数
                <MetricInfo metric="orderCount" />
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">{stats.orders} 单</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">车辆充电开支总计</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{stats.totalFee}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                车辆充电电量总计
                <MetricInfo metric="chargedKwh" />
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">{stats.totalKwh}</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">最近充电记录（演示数据）</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>车牌号</TableHead>
                  <TableHead>充电站点</TableHead>
                  <TableHead>充电时间</TableHead>
                  <TableHead>充电时段</TableHead>
                  <TableHead>充电量</TableHead>
                  <TableHead>充电费用</TableHead>
                  <TableHead>订单状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.records.map((r) => (
                  <TableRow key={`${r.plate}-${r.time}`}>
                    <TableCell className="font-medium">{r.plate}</TableCell>
                    <TableCell>{r.station}</TableCell>
                    <TableCell className="text-muted-foreground">{r.time}</TableCell>
                    <TableCell>{r.period}时段</TableCell>
                    <TableCell>{r.kwh} 度</TableCell>
                    <TableCell>¥{r.fee}</TableCell>
                    <TableCell>
                      <StatusTag text={r.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
          异常充电记录（演示数据）
          <MetricInfo metric="abnormalChargeRecords" />
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">{ABNORMAL_DEFINITION}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">当天计费时段表（演示）</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>时段</TableHead>
                    <TableHead>时间范围</TableHead>
                    <TableHead>电价</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PRICE_PERIODS.map((p) => (
                    <TableRow key={p.period}>
                      <TableCell className="font-medium">{p.period}</TableCell>
                      <TableCell>{p.hours}</TableCell>
                      <TableCell>{p.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">当天充电订单时段分布（演示）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ORDER_PERIOD_DISTRIBUTION.map((p) => (
                <div key={p.period} className="flex items-center gap-3 text-sm">
                  <span className="w-10 text-muted-foreground">{p.period}时段</span>
                  <div className="h-2.5 flex-1 rounded-full bg-muted">
                    <div
                      className="h-2.5 rounded-full bg-primary"
                      style={{ width: `${(p.orders / maxOrders) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-foreground">{p.orders} 单</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">异常订单列表（演示数据）</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>车牌号</TableHead>
                  <TableHead>司机</TableHead>
                  <TableHead>充电站点</TableHead>
                  <TableHead>开始时间</TableHead>
                  <TableHead>所属时段</TableHead>
                  <TableHead>充电量</TableHead>
                  <TableHead>预计可优化费用</TableHead>
                  <TableHead>优化建议</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ABNORMAL_CHARGE_ORDERS.map((o) => (
                  <TableRow key={`${o.plate}-${o.startedAt}`}>
                    <TableCell className="font-medium">{o.plate}</TableCell>
                    <TableCell>{o.driver}</TableCell>
                    <TableCell>{o.station}</TableCell>
                    <TableCell className="text-muted-foreground">{o.startedAt}</TableCell>
                    <TableCell>{o.period}时段</TableCell>
                    <TableCell>{o.kwh} 度</TableCell>
                    <TableCell>预计可优化 ¥{o.optimizableFee}</TableCell>
                    <TableCell className="text-muted-foreground">{o.suggestion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
          车辆故障监控（演示数据）
          <MetricInfo metric="vehicleFaultMonitor" />
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">
          仅统计故障类型为“车故障”和“桩/车故障”的演示记录。
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                当前车辆故障数量
                <MetricInfo metric="vehicleFaultMonitor" />
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {FLEET_FAULT_VEHICLES.length} 条
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">影响出车数量</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{faultBlocking} 辆</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-3">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>车牌号</TableHead>
                  <TableHead>故障类型</TableHead>
                  <TableHead>故障描述</TableHead>
                  <TableHead>严重程度</TableHead>
                  <TableHead>是否影响出车</TableHead>
                  <TableHead>司机最新反馈</TableHead>
                  <TableHead>当前处理状态</TableHead>
                  <TableHead>报障时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FLEET_FAULT_VEHICLES.map((v) => (
                  <TableRow key={v.plate}>
                    <TableCell className="font-medium">{v.plate}</TableCell>
                    <TableCell>{v.faultType}</TableCell>
                    <TableCell className="text-muted-foreground">{v.description}</TableCell>
                    <TableCell>
                      <SeverityTag severity={v.severity} />
                    </TableCell>
                    <TableCell>{v.blocksDispatch ? "是" : "否"}</TableCell>
                    <TableCell className="text-muted-foreground">{v.driverFeedback}</TableCell>
                    <TableCell>
                      <StatusTag text={v.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{v.reportedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-muted-foreground">{FLEET_FAULT_DISCLAIMER}</p>
      </section>
    </div>
  );
}
