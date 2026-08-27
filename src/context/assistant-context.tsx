import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ROLE_LABEL, STATIONS, type FaultStatus, type Role } from "@/data/demo";
import { ROLE_WELCOME } from "@/data/roles";
import type { IntentId } from "@/data/roles";
import { matchIntent } from "@/lib/assistant/intents";
import { buildReply } from "@/lib/assistant/responses";
import { EMPTY_OVERRIDES, type ChatMessage, type DemoOverrides } from "@/lib/assistant/types";

const STORAGE_KEY = "charge-assistant-demo-v1";
const ROLES: Role[] = ["boss", "fleet", "safety"];

type ByRole<T> = Record<Role, T>;

function nowLabel() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

let seq = 0;
function nextId() {
  seq += 1;
  return `m${Date.now()}-${seq}`;
}

function welcomeMessage(role: Role): ChatMessage {
  return { id: nextId(), role: "assistant", text: ROLE_WELCOME[role], at: nowLabel() };
}

function initialMessages(): ByRole<ChatMessage[]> {
  return {
    boss: [welcomeMessage("boss")],
    fleet: [welcomeMessage("fleet")],
    safety: [welcomeMessage("safety")],
  };
}

function initialOverrides(): ByRole<DemoOverrides> {
  return {
    boss: { ...EMPTY_OVERRIDES, timelineExtra: [], approvals: [], faultStatus: {} },
    fleet: { ...EMPTY_OVERRIDES, timelineExtra: [], approvals: [], faultStatus: {} },
    safety: { ...EMPTY_OVERRIDES, timelineExtra: [], approvals: [], faultStatus: {} },
  };
}

interface AssistantContextValue {
  role: Role;
  setRole: (role: Role) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  messages: ChatMessage[];
  isThinking: boolean;
  overrides: DemoOverrides;
  send: (text: string) => void;
  askPreset: (question: string, intent: IntentId) => void;
  runIntent: (intent: IntentId, plate?: string) => void;
  clearCurrentRole: () => void;
  approvalDialogOpen: boolean;
  closeApprovalDialog: () => void;
  confirmApproval: () => void;
  updateFaultStatus: (faultId: string, plate: string, status: FaultStatus) => void;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("safety");
  const [isOpen, setOpen] = useState(false);
  const [messagesByRole, setMessagesByRole] = useState<ByRole<ChatMessage[]>>(initialMessages);
  const [overridesByRole, setOverridesByRole] = useState<ByRole<DemoOverrides>>(initialOverrides);
  const [isThinking, setThinking] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const hydrated = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          role?: Role;
          messagesByRole?: ByRole<ChatMessage[]>;
          demoOverridesByRole?: ByRole<DemoOverrides>;
        };
        if (parsed.role && ROLES.includes(parsed.role)) setRoleState(parsed.role);
        if (parsed.messagesByRole) setMessagesByRole(parsed.messagesByRole);
        if (parsed.demoOverridesByRole) setOverridesByRole(parsed.demoOverridesByRole);
      }
    } catch {
      /* 忽略本地存储读取异常 */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ role, messagesByRole, demoOverridesByRole: overridesByRole }),
      );
    } catch {
      /* 忽略本地存储写入异常 */
    }
  }, [role, messagesByRole, overridesByRole]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => clearTimeout(t));
  }, []);

  const pushMessage = useCallback((target: Role, message: ChatMessage) => {
    setMessagesByRole((prev) => ({ ...prev, [target]: [...(prev[target] ?? []), message] }));
  }, []);

  const respond = useCallback(
    (target: Role, message: Omit<ChatMessage, "id" | "role" | "at">) => {
      setThinking(true);
      const timer = setTimeout(() => {
        pushMessage(target, { id: nextId(), role: "assistant", at: nowLabel(), ...message });
        setThinking(false);
      }, 700);
      timers.current.push(timer);
    },
    [pushMessage],
  );

  const stationA = STATIONS[0];

  const handleIntent = useCallback(
    (target: Role, intent: IntentId, plate?: string) => {
      if (intent === "notify") {
        setOverridesByRole((prev) => ({
          ...prev,
          [target]: {
            ...prev[target],
            timelineExtra: [
              ...prev[target].timelineExtra,
              {
                at: nowLabel(),
                actor: "当前用户（演示）",
                action: "创建了一条模拟现场通知记录",
                result: "未触达真实人员",
              },
            ],
          },
        }));
        respond(target, {
          text: "模拟通知记录已创建。本操作未向任何真实人员发送消息。\n（模拟记录已创建 / 真实消息未发送 / 真实人员未触达 / 真实设备未控制）",
          card: { type: "timeline" },
        });
        return;
      }
      if (intent === "approval") {
        setApprovalDialogOpen(true);
        return;
      }
      const reply = buildReply(intent, plate);
      respond(target, reply);
    },
    [respond],
  );

  const send = useCallback(
    (text: string) => {
      const content = text.trim();
      if (!content) return;
      const target = role;
      pushMessage(target, { id: nextId(), role: "user", text: content, at: nowLabel() });
      const result = matchIntent(content, target);
      if (result.kind === "intent" && result.intent) {
        handleIntent(target, result.intent, result.plate);
      } else {
        respond(target, { text: result.message ?? "我暂时无法识别该问题。" });
      }
    },
    [role, pushMessage, handleIntent, respond],
  );

  const askPreset = useCallback(
    (question: string, intent: IntentId) => {
      const target = role;
      pushMessage(target, { id: nextId(), role: "user", text: question, at: nowLabel() });
      handleIntent(target, intent);
    },
    [role, pushMessage, handleIntent],
  );

  const runIntent = useCallback(
    (intent: IntentId, plate?: string) => handleIntent(role, intent, plate),
    [handleIntent, role],
  );

  const confirmApproval = useCallback(() => {
    setApprovalDialogOpen(false);
    const target = role;
    const approval = {
      id: "DEMO-AP-001",
      type: "停桩审批" as const,
      status: "待审批" as const,
      isDemo: true as const,
      affectedStationId: stationA?.id ?? "A",
      affectedDeviceCount: stationA?.deviceCount ?? 16,
      affectedVehicleCount: stationA?.chargingVehicles ?? 18,
      createdAt: nowLabel(),
    };
    setOverridesByRole((prev) => ({
      ...prev,
      [target]: {
        ...prev[target],
        approvals: [...prev[target].approvals, approval],
        timelineExtra: [
          ...prev[target].timelineExtra,
          {
            at: nowLabel(),
            actor: "当前用户（演示）",
            action: "创建了一条模拟停桩审批记录（DEMO-AP-001）",
            result: "未连接或控制真实充电设备",
          },
        ],
      },
    }));
    respond(target, {
      text: "模拟停桩审批已创建，编号DEMO-AP-001，状态为待审批。本操作未连接或控制真实充电设备。\n（模拟记录已创建 / 真实消息未发送 / 真实人员未触达 / 真实设备未控制）",
      card: { type: "timeline" },
    });
  }, [respond, role, stationA]);

  const updateFaultStatus = useCallback(
    (faultId: string, plate: string, status: FaultStatus) => {
      const target = role;
      setOverridesByRole((prev) => ({
        ...prev,
        [target]: {
          ...prev[target],
          faultStatus: { ...prev[target].faultStatus, [faultId]: status },
        },
      }));
      respond(target, {
        text: `模拟执行结果：${plate}（${faultId}）的处理状态已在演示环境中更新为「${status}」。本操作仅更新演示记录，未同步任何真实工单系统。`,
        card: { type: "faultDetail", plate },
      });
    },
    [respond, role],
  );

  const setRole = useCallback(
    (next: Role) => {
      if (next === role) return;
      setRoleState(next);
      setThinking(false);
      pushMessage(next, {
        id: nextId(),
        role: "system",
        text: `当前已切换至【${ROLE_LABEL[next]}】演示视角。`,
        at: nowLabel(),
      });
    },
    [role, pushMessage],
  );

  const clearCurrentRole = useCallback(() => {
    const target = role;
    setMessagesByRole((prev) => ({ ...prev, [target]: [welcomeMessage(target)] }));
    setOverridesByRole((prev) => ({
      ...prev,
      [target]: { timelineExtra: [], approvals: [], faultStatus: {} },
    }));
  }, [role]);

  const value = useMemo<AssistantContextValue>(
    () => ({
      role,
      setRole,
      isOpen,
      setOpen,
      messages: messagesByRole[role] ?? [],
      isThinking,
      overrides: overridesByRole[role] ?? EMPTY_OVERRIDES,
      send,
      askPreset,
      runIntent,
      clearCurrentRole,
      approvalDialogOpen,
      closeApprovalDialog: () => setApprovalDialogOpen(false),
      confirmApproval,
      updateFaultStatus,
    }),
    [
      role,
      setRole,
      isOpen,
      messagesByRole,
      isThinking,
      overridesByRole,
      send,
      askPreset,
      runIntent,
      clearCurrentRole,
      approvalDialogOpen,
      confirmApproval,
      updateFaultStatus,
    ],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within AssistantProvider");
  return ctx;
}
