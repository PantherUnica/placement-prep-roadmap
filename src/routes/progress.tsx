import { createFileRoute, Link } from "@tanstack/react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import {
  productModules,
  analyticsModules,
  techModules,
  businessModules,
  domainModules,
  allModules,
  roadmapWeeks,
  dailyHabits,
  weeklyHabits,
  caseBank,
  companies,
  library,
  categoryMeta,
  collectIds,
} from "@/lib/content";
import { useCareerStore, useChecksProgress } from "@/lib/store";
import { Target, Flame, CheckCircle2, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/progress")({ component: Page });

function Page() {
  const product = useChecksProgress(collectIds(productModules));
  const analytics = useChecksProgress(collectIds(analyticsModules));
  const tech = useChecksProgress(collectIds(techModules));
  const business = useChecksProgress(collectIds(businessModules));
  const domain = useChecksProgress(collectIds(domainModules));

  const daily = useChecksProgress(dailyHabits.map((h) => h.id));
  const weekly = useChecksProgress(weeklyHabits.map((h) => h.id));
  const cases = useChecksProgress(caseBank.map((c) => `case-done-${c.id}`));
  const companyPrep = useChecksProgress(companies.flatMap((c) => c.items.map((i) => i.id)));
  const resourceLib = useChecksProgress(library.map((r) => r.id));

  const streak = useCareerStore((s) => s.streak);
  const checks = useCareerStore((s) => s.checks);
  const reset = useCareerStore((s) => s.resetAll);

  const overallIds = collectIds(allModules);
  const overall = useChecksProgress(overallIds);

  // Weeks completed = weeks whose module topic checklists are 100% done
  const weeksCompleted = roadmapWeeks.filter((w) => {
    const ids = w.moduleIds.flatMap(
      (id) => allModules.find((m) => m.id === id)?.topics.map((t) => t.id) ?? [],
    );
    if (ids.length === 0) return false;
    return ids.every((id) => checks[id]);
  }).length;

  const trackData = [
    { name: "Product", pct: product.pct },
    { name: "Analytics", pct: analytics.pct },
    { name: "Tech", pct: tech.pct },
    { name: "Business", pct: business.pct },
    { name: "Domain", pct: domain.pct },
    { name: "Cases", pct: cases.pct },
    { name: "Companies", pct: companyPrep.pct },
  ];

  const trackRows: { label: string; p: { done: number; total: number; pct: number } }[] = [
    { label: categoryMeta.product.label, p: product },
    { label: categoryMeta.analytics.label, p: analytics },
    { label: categoryMeta.tech.label, p: tech },
    { label: categoryMeta.business.label, p: business },
    { label: categoryMeta.domain.label, p: domain },
    { label: "Case bank", p: cases },
    { label: "Company prep", p: companyPrep },
    { label: "Resource library", p: resourceLib },
    { label: "Daily habits", p: daily },
    { label: "Weekly cadence", p: weekly },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="At a glance"
        title="Placement Readiness Dashboard"
        description="One weighted score across every track — Product, Analytics, Tech & GenAI, Business & Growth, Domain, plus interview and habit systems."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Reset ALL progress, notes, and journal? This cannot be undone."))
                reset();
            }}
          >
            Reset all data
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Placement readiness"
          value={`${overall.pct}%`}
          hint={`${overall.done}/${overall.total} topics across all tracks`}
          icon={Target}
        />
        <StatCard
          label="Streak"
          value={`${streak.count} days`}
          hint={streak.lastDate ?? "Not started"}
          icon={Flame}
        />
        <StatCard
          label="Weeks completed"
          value={`${weeksCompleted}/${roadmapWeeks.length}`}
          hint="Of the 10-week plan"
          icon={CalendarClock}
        />
        <StatCard
          label="Case bank"
          value={`${cases.done}/${cases.total}`}
          hint={`${cases.pct}% drilled`}
          icon={CheckCircle2}
        />
      </div>

      <Card className="mt-6 p-5">
        <h3 className="text-sm font-semibold">Completion by track</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trackData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />
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
        {trackRows.map((row) => (
          <Card key={row.label} className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{row.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {row.p.done}/{row.p.total} · {row.p.pct}%
              </span>
            </div>
            <Progress value={row.p.pct} className="mt-2 h-1.5" />
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Week-by-week status</h3>
          <Link to="/roadmap" className="text-xs text-muted-foreground hover:text-foreground">
            Open full roadmap →
          </Link>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {roadmapWeeks.map((w) => {
            const ids = w.moduleIds.flatMap(
              (id) => allModules.find((m) => m.id === id)?.topics.map((t) => t.id) ?? [],
            );
            const done = ids.filter((id) => checks[id]).length;
            const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;
            return (
              <div key={w.id} className="rounded-md border p-3">
                <p className="text-xs font-semibold">Week {w.week}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{w.title}</p>
                <Progress value={pct} className="mt-2 h-1" />
                <p className="mt-1 text-[10px] tabular-nums text-muted-foreground">{pct}%</p>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}
