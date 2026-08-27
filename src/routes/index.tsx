import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/platform/AppHeader";
import { DemoBanner } from "@/components/platform/DemoBanner";
import { SideNav } from "@/components/platform/SideNav";
import { Dashboard } from "@/components/platform/Dashboard";
import { BossDashboard } from "@/components/platform/BossDashboard";
import { FleetDashboard } from "@/components/platform/FleetDashboard";
import { AssistantLauncher, AssistantPanel } from "@/components/assistant/AssistantPanel";
import { AssistantProvider, useAssistant } from "@/context/assistant-context";

const TITLE = "AI充电运营助手试用版 — 充电运营演示平台";
const DESC =
  "面向充电运营客户的试用版网页助手演示：恶劣天气充电安全卫士与角色化运营简报、车辆报障助手，全部为模拟数据。";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function RoleWorkbench() {
  const { role } = useAssistant();
  return (
    <main className="min-w-0 flex-1">
      {role === "boss" ? <BossDashboard /> : role === "fleet" ? <FleetDashboard /> : <Dashboard />}
    </main>
  );
}

function Index() {
  return (
    <AssistantProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <AppHeader />
        <DemoBanner />
        <div className="flex flex-1">
          <SideNav />
          <RoleWorkbench />
        </div>
        <AssistantLauncher />
        <AssistantPanel />
      </div>
    </AssistantProvider>
  );
}
