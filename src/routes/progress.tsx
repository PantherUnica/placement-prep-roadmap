import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import {
  aiModules, pmSections, analyticsTracks, adobeMilestones,
  dailyHabits, weeklyHabits, companies,
  collectIds, collectMilestoneIds,
} from "@/lib/content";
import { useCareerStore, useChecksProgress } from "@/lib/store";

export const Route = createFileRoute("/progress")({ component: Page });

function Page() {
  const ai = useChecksProgress(collectIds(aiModules));
  const pm = useChecksProgress(collectIds(pmSections));
  const an = useChecksProgress(collectIds(analyticsTracks));
  const ad = useChecksProgress(collectMilestoneIds(adobeMilestones));
  const daily = useChecksProgress(dailyHabits.map((h) => h.id));
  const weekly = useChecksProgress(weeklyHabits.map((h) => h.id));
  const place = useChecksProgress(companies.flatMap((c) => c.items.map((i) => i.id)));

  const streak = useCareerStore((s) => s.streak);
  const reset = useCareerStore((s) => s.resetAll);

  const overall = Math.round(((ai.pct + pm.pct + an.pct + ad.pct + place.pct) / 500) * 100);

  const data = [
    { name: "Adobe", pct: ad.pct },
    { name: "AI", pct: ai.pct },
    { name: "PM", pct: pm.pct },
    { name: "Analytics", pct: an.pct },
    { name: "Placements", pct: place.pct },
    { name: "Daily", pct: daily.pct },
    { name: "Weekly", pct: weekly.pct },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="At a glance"
        title="Progress Analytics"
        description="A single source of truth across all five tracks. Optimize for consistency, not perfection."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Reset ALL progress, notes, and journal? This cannot be undone.")) reset();
            }}
          >
            Reset all data
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall score" value={`${overall}%`} hint="Weighted across tracks" />
        <StatCard label="Streak" value={`${streak.count} days`} hint={streak.lastDate ?? "Not started"} />
        <StatCard label="Today" value={`${daily.done}/${daily.total}`} hint="Daily habits" />
        <StatCard label="This week" value={`${weekly.done}/${weekly.total}`} hint="Weekly cadence" />
      </div>

      <Card className="mt-6 p-5">
        <h3 className="text-sm font-semibold">Completion by track</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="pct" fill="var(--foreground)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          ["Adobe Internship", ad],
          ["Agentic AI", ai],
          ["Product Management", pm],
          ["Analytics", an],
          ["Placements", place],
          ["Daily habits", daily],
        ].map(([label, p]) => (
          <Card key={label as string} className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{label as string}</span>
              <span className="tabular-nums text-muted-foreground">
                {(p as any).done}/{(p as any).total} · {(p as any).pct}%
              </span>
            </div>
            <Progress value={(p as any).pct} className="mt-2 h-1.5" />
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
