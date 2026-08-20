import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Target, ArrowRight, ImageIcon } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { roadmapWeeks, allModules, priorityMeta, categoryMeta, type Module } from "@/lib/content";
import { useChecksProgress } from "@/lib/store";

export const Route = createFileRoute("/roadmap")({ component: Page });

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="10-week plan"
        title="Placement Roadmap"
        description="Videos → Concept → Practice → Project → Interview Question, sequenced week by week across Product, Analytics, Tech, Business, and Domain."
      />

      <div className="space-y-3">
        {roadmapWeeks.map((w) => (
          <WeekCard key={w.id} week={w} />
        ))}
      </div>

      <Card className="mt-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">Original planning whiteboard</p>
            <p className="text-xs text-muted-foreground">
              The raw notes this roadmap was structured from — Concepts of Product, Analytics, Tech.
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent">
              View whiteboard
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <img
              src="/planning-whiteboard.png"
              alt="Original hand-written planning whiteboard covering Concepts of Product, Analytics, and Tech"
              className="w-full rounded-md border"
            />
          </DialogContent>
        </Dialog>
      </Card>
    </AppShell>
  );
}

function WeekCard({ week }: { week: (typeof roadmapWeeks)[number] }) {
  const [open, setOpen] = useState(week.week === 1);
  const modules = week.moduleIds
    .map((id) => allModules.find((m) => m.id === id))
    .filter((x): x is Module => !!x);
  const ids = modules.flatMap((m) => m.topics.map((t) => t.id));
  const { done, total, pct } = useChecksProgress(ids);

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              <CalendarDays className="mr-1 h-3 w-3" />
              Week {week.week}
            </Badge>
            <h3 className="text-base font-semibold">{week.title}</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{week.theme}</p>
          <p className="mt-1 text-xs text-muted-foreground">{week.goal}</p>
          {total > 0 && (
            <div className="mt-3 flex items-center gap-3">
              <Progress value={pct} className="h-1.5 flex-1 max-w-xs" />
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {done}/{total}
              </span>
            </div>
          )}
        </div>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "none" }}
        />
      </button>

      {open && (
        <div className="border-t bg-muted/20 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                This week's modules
              </h4>
              {modules.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No new modules — this week is dedicated to mocks, revision, and applications.
                </p>
              ) : (
                <ul className="space-y-2">
                  {modules.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center gap-2 rounded-md border bg-background p-2.5"
                    >
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityMeta[m.priority].cls}`}
                      >
                        {priorityMeta[m.priority].label}
                      </span>
                      <span className="flex-1 text-sm">{m.title}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {categoryMeta[m.category].short}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-3">
              <div className="rounded-md border bg-background p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Target className="h-3 w-3" />
                  Deliverable
                </p>
                <p className="mt-1 text-sm">{week.deliverable}</p>
              </div>
              <div className="rounded-md border bg-background p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Interview focus
                </p>
                <p className="mt-1 text-sm">{week.interviewFocus}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
