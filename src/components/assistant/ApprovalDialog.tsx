import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { STATIONS } from "@/data/demo";
import { useAssistant } from "@/context/assistant-context";

export function ApprovalDialog() {
  const { approvalDialogOpen, closeApprovalDialog, confirmApproval } = useAssistant();
  const station = STATIONS[0];

  return (
    <Dialog open={approvalDialogOpen} onOpenChange={(o) => !o && closeApprovalDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认创建模拟停桩审批</DialogTitle>
          <DialogDescription>
            本操作仅在演示环境中创建一条模拟审批记录，不会连接或控制任何真实设备。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 rounded-md border border-border bg-secondary p-3 text-sm">
          <p>
            站点：<span className="font-medium">{station?.name ?? "A站"}</span>
          </p>
          <p>
            涉及设备：<span className="font-medium">{station?.deviceCount ?? 16} 台</span>
          </p>
          <p>
            当前正在充电车辆：
            <span className="font-medium">{station?.chargingVehicles ?? 18} 辆</span>
          </p>
          <p>操作性质：仅创建模拟审批记录</p>
          <p>不会连接或控制任何真实设备</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeApprovalDialog}>
            取消
          </Button>
          <Button onClick={confirmApproval}>确认创建模拟审批</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
