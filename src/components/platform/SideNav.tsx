import { BarChart3, Building2, FileText, Truck, Wrench } from "lucide-react";

const ITEMS = [
  { label: "运营总览", icon: BarChart3, active: true },
  { label: "站点管理", icon: Building2, active: false },
  { label: "车辆管理", icon: Truck, active: false },
  { label: "报障工单", icon: Wrench, active: false },
  { label: "报表中心", icon: FileText, active: false },
];

export function SideNav() {
  return (
    <aside
      aria-hidden
      className="hidden w-52 shrink-0 border-r border-border bg-sidebar px-3 py-5 lg:block"
    >
      <p className="px-3 pb-3 text-xs font-medium tracking-wide text-muted-foreground">
        运营平台（演示）
      </p>
      <ul className="space-y-1">
        {ITEMS.map(({ label, icon: Icon, active }) => (
          <li
            key={label}
            className={
              active
                ? "flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
                : "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground"
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
