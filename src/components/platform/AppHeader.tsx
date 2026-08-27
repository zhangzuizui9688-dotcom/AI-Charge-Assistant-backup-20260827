import { Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_LABEL, type Role } from "@/data/demo";
import { useAssistant } from "@/context/assistant-context";

export function AppHeader() {
  const { role, setRole } = useAssistant();

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-primary px-6 py-3 text-primary-foreground">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5" aria-hidden />
        <h1 className="text-base font-semibold">AI充电运营助手试用版</h1>
        <span className="rounded-md bg-primary-foreground/15 px-2 py-0.5 text-xs">演示环境</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-primary-foreground/80">演示角色</span>
        <Select value={role} onValueChange={(v) => setRole(v as Role)}>
          <SelectTrigger className="h-9 w-40 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
              <SelectItem key={r} value={r}>
                {ROLE_LABEL[r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
