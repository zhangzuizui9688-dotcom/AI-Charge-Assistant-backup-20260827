import { Info } from "lucide-react";
import { DEMO_NOTICE } from "@/data/demo";

export function DemoBanner() {
  return (
    <div className="flex items-center gap-2 border-b border-risk-orange/30 bg-risk-orange-soft px-6 py-2 text-sm text-risk-orange">
      <Info className="h-4 w-4 shrink-0" aria-hidden />
      <span>{DEMO_NOTICE}。本试用版全部为模拟数据与模拟操作，不连接、不控制任何真实充电设备。</span>
    </div>
  );
}
