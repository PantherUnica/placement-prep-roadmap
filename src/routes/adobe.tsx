import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checklist } from "@/components/checklist";
import { adobeMilestones, collectMilestoneIds } from "@/lib/content";
import { useCareerStore, useChecksProgress, type Status } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/adobe")({ component: AdobePage });

const statusMeta: Record<Status, { label: string; cls: string }> = {
  todo: { label: "Not Started", cls: "bg-muted text-muted-foreground" },
  doing: { label: "In Progress", cls: "bg-[color:var(--info)]/15 text-[color:var(--info)]" },
  done: { label: "Completed", cls: "bg-[color:var(--success)]/15 text-[color:var(--success)]" },
};

function AdobePage() {
  const overall = useChecksProgress(collectMilestoneIds(adobeMilestones));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Track A · 70% energy"
        title="Adobe Internship Tracker"
        description="The PPO is won in execution + relationships, not technical brilliance. 8 weeks, 8 milestones."
      />

      <Card className="mb-6 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">Internship Progress</p>
              <p className="text-xs text-muted-foreground">{overall.done} of {overall.total} actions complete</p>
            </div>
          </div>
          <span className="text-2xl font-semibold tabular-nums">{overall.pct}%</span>
        </div>
        <Progress value={overall.pct} className="mt-4 h-2" />
      </Card>

      <div className="space-y-3">
        {adobeMilestones.map((m) => (
          <MilestoneCard key={m.id} milestone={m} />
        ))}
      </div>
    </AppShell>
  );
}

function MilestoneCard({ milestone }: { milestone: typeof adobeMilestones[number] }) {
  const [open, setOpen] = useState(false);
  const ids = milestone.items.map((i) => i.id);
  const { done, total, pct } = useChecksProgress(ids);
  const status = useCareerStore((s) => s.statuses[milestone.id] ?? (pct === 100 ? "done" : pct > 0 ? "doing" : "todo"));
  const setStatus = useCareerStore((s) => s.setStatus);
  const note = useCareerStore((s) => s.notes[`note-${milestone.id}`] ?? "");
  const setNote = useCareerStore((s) => s.setNote);

  return (
    <Card className="overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start gap-3 p-5 text-left hover:bg-muted/30">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-[10px]">{milestone.week}</Badge>
            <h3 className="text-base font-semibold">{milestone.title}</h3>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", statusMeta[status].cls)}>
              {statusMeta[status].label}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
          <div className="mt-3 flex items-center gap-3">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-xs font-medium tabular-nums text-muted-foreground">{done}/{total}</span>
          </div>
        </div>
        <ChevronDown className={cn("mt-1 h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <CardContent className="border-t bg-muted/20 pt-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action items</h4>
              <Checklist items={milestone.items} />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</h4>
                <Select value={status} onValueChange={(v) => setStatus(milestone.id, v as Status)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">Not Started</SelectItem>
                    <SelectItem value="doing">In Progress</SelectItem>
                    <SelectItem value="done">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes & reflections</h4>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(`note-${milestone.id}`, e.target.value)}
                  placeholder="Manager feedback, blockers, wins…"
                  className="min-h-[120px] resize-y bg-background text-sm"
                />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
