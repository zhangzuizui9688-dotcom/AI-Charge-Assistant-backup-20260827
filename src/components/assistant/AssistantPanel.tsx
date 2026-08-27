import { useEffect, useRef, useState } from "react";
import { Bot, ChevronDown, ChevronUp, Send, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageCard } from "@/components/assistant/MessageCards";
import { ApprovalDialog } from "@/components/assistant/ApprovalDialog";
import { useAssistant } from "@/context/assistant-context";
import { DEMO_NOTICE, ROLE_LABEL } from "@/data/demo";
import { PRESET_QUESTIONS } from "@/data/roles";

export function AssistantPanel() {
  const {
    isOpen,
    setOpen,
    role,
    messages,
    isThinking,
    send,
    askPreset,
    runIntent,
    clearCurrentRole,
  } = useAssistant();
  const [draft, setDraft] = useState("");
  const [showAllPresets, setShowAllPresets] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, role, isThinking]);

  useEffect(() => {
    setShowAllPresets(false);
  }, [role]);

  const presets = PRESET_QUESTIONS[role];
  const visiblePresets = showAllPresets ? presets : presets.slice(0, 4);

  const submit = (text: string) => {
    send(text);
    setDraft("");
    inputRef.current?.focus();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-[440px]">
          <SheetHeader className="gap-1 border-b border-border px-4 py-3">
            <SheetTitle className="flex items-center gap-2 text-base">
              <Bot className="h-5 w-5 text-primary" aria-hidden />
              AI充电运营助手
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-normal text-secondary-foreground">
                {ROLE_LABEL[role]}视角
              </span>
            </SheetTitle>
            <p className="text-xs text-muted-foreground">{DEMO_NOTICE}</p>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((m) => {
                if (m.role === "system") {
                  return (
                    <p key={m.id} className="text-center text-xs text-muted-foreground">
                      {m.text}
                    </p>
                  );
                }
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="flex justify-end">
                      <div className="max-w-[85%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                        {m.text}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={m.id} className="text-sm text-foreground">
                    {m.text && <p className="whitespace-pre-wrap">{m.text}</p>}
                    {m.card && <MessageCard card={m.card} />}
                    {m.actions && m.actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <Button
                            key={a.label}
                            size="sm"
                            variant="outline"
                            onClick={() => runIntent(a.intent, a.plate)}
                          >
                            {a.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {isThinking && <p className="text-sm text-muted-foreground">思考中…</p>}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <Separator />
          <div className="space-y-2 px-4 py-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">常用问题</p>
              <div className="flex flex-wrap gap-2">
                {visiblePresets.map((q) => (
                  <Button
                    key={q.id}
                    size="sm"
                    variant="secondary"
                    disabled={isThinking}
                    onClick={() => {
                      askPreset(q.text, q.intent);
                      setDraft("");
                      inputRef.current?.focus();
                    }}
                  >
                    {q.text}
                  </Button>
                ))}
                {presets.length > 4 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground"
                    onClick={() => setShowAllPresets((v) => !v)}
                  >
                    {showAllPresets ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        收起
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        查看更多
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                submit(draft);
              }}
            >
              <Input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`向助手提问（${ROLE_LABEL[role]}演示视角）`}
              />
              <Button type="submit" size="icon" disabled={!draft.trim() || isThinking}>
                <Send className="h-4 w-4" />
                <span className="sr-only">发送</span>
              </Button>
            </form>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={clearCurrentRole}
            >
              <Trash2 className="h-4 w-4" />
              清空当前角色对话
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <ApprovalDialog />
    </>
  );
}

export function AssistantLauncher() {
  const { setOpen } = useAssistant();
  return (
    <Button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-40 h-12 gap-2 rounded-full px-5 shadow-lg"
    >
      <Bot className="h-5 w-5" />
      AI充电运营助手
    </Button>
  );
}
