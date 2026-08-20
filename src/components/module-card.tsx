import { useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Clock,
  Zap,
  Lock,
  MessageCircleQuestion,
  ListChecks,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checklist } from "./checklist";
import { useCareerStore, useChecksProgress } from "@/lib/store";
import { allModules, priorityMeta, type Module } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ModuleCard({ module: m, defaultOpen }: { module: Module; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const ids = m.topics.map((t) => t.id);
  const { done, total, pct } = useChecksProgress(ids);
  const practiceIds = (m.practice ?? []).map((t) => t.id);
  const practiceProgress = useChecksProgress(practiceIds);
  const notes = useCareerStore((s) => s.notes);
  const setNote = useCareerStore((s) => s.setNote);
  const checks = useCareerStore((s) => s.checks);

  const prereqModules = (m.prerequisites ?? [])
    .map((pid) => allModules.find((mm) => mm.id === pid))
    .filter((x): x is Module => !!x);
  const prereqsMet = prereqModules.every((pm) => {
    const pids = pm.topics.map((t) => t.id);
    const pdone = pids.filter((id) => checks[id]).length;
    return pids.length === 0 || pdone / pids.length >= 0.8;
  });

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold">{m.title}</h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                priorityMeta[m.priority].cls,
              )}
            >
              {priorityMeta[m.priority].label}
            </span>
            <Badge variant="secondary" className="text-[10px] capitalize">
              {m.level}
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {m.hours}h
            </span>
            {!prereqsMet && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <Lock className="h-3 w-3" />
                Prereqs pending
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{m.why}</p>
          {prereqModules.length > 0 && (
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Prerequisites: {prereqModules.map((p) => p.title).join(", ")}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {done}/{total}
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <CardContent className="border-t bg-muted/20 pt-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-5">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  1. Concept checklist
                </h4>
                <Checklist items={m.topics} />
              </div>

              {m.practice && m.practice.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <ListChecks className="mr-1 inline h-3 w-3" />
                      3. Practice
                    </h4>
                    <span className="text-[11px] tabular-nums text-muted-foreground">
                      {practiceProgress.done}/{practiceProgress.total}
                    </span>
                  </div>
                  <Checklist items={m.practice} dense />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  2. Videos & resources (video-first)
                </h4>
                <ul className="space-y-1.5">
                  {m.resources.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60"
                      >
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="flex-1">
                          {r.title}
                          <Badge variant="outline" className="ml-2 text-[10px] capitalize">
                            {r.type}
                          </Badge>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {m.projects && m.projects.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Zap className="mr-1 inline h-3 w-3" />
                    4. Project
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {m.projects.map((p) => (
                      <li key={p} className="leading-snug">
                        • {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {m.interviewQuestions && m.interviewQuestions.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <MessageCircleQuestion className="mr-1 inline h-3 w-3" />
                    5. Interview questions
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {m.interviewQuestions.map((q) => (
                      <li key={q} className="leading-snug">
                        • {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Notes
            </h4>
            <Textarea
              value={notes[`note-${m.id}`] ?? ""}
              onChange={(e) => setNote(`note-${m.id}`, e.target.value)}
              placeholder="Capture insights, gotchas, links…"
              className="min-h-[80px] resize-y bg-background text-sm"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
