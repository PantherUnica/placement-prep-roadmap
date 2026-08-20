import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  Target,
  Compass,
  BarChart3,
  Cpu,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCareerStore, useChecksProgress } from "@/lib/store";
import {
  productModules,
  analyticsModules,
  techModules,
  businessModules,
  domainModules,
  allModules,
  roadmapWeeks,
  dailyHabits,
  categoryMeta,
  priorityMeta,
  collectIds,
  getNextModule,
} from "@/lib/content";

export const Route = createFileRoute("/")({ component: Dashboard });

const trackConfig = [
  { to: "/product", icon: Compass, key: "product" as const, modules: productModules },
  { to: "/analytics", icon: BarChart3, key: "analytics" as const, modules: analyticsModules },
  { to: "/tech", icon: Cpu, key: "tech" as const, modules: techModules },
  { to: "/business", icon: TrendingUp, key: "business" as const, modules: businessModules },
  { to: "/domain", icon: Globe2, key: "domain" as const, modules: domainModules },
];

function Dashboard() {
  const streak = useCareerStore((s) => s.streak);
  const pingStreak = useCareerStore((s) => s.pingStreak);
  const checks = useCareerStore((s) => s.checks);

  const trackProgress = trackConfig.map((t) => {
    const ids = collectIds(t.modules);
    const done = ids.filter((id) => checks[id]).length;
    const total = ids.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { ...t, progress: { done, total, pct } };
  });

  const overallIds = collectIds(allModules);
  const overall = useChecksProgress(overallIds);
  const habits = useChecksProgress(dailyHabits.map((h) => h.id));

  const nextModule = getNextModule(checks);
  const currentWeek =
    roadmapWeeks.find((w) => {
      const ids = w.moduleIds.flatMap(
        (id) => allModules.find((m) => m.id === id)?.topics.map((t) => t.id) ?? [],
      );
      if (ids.length === 0) return false;
      const done = ids.filter((id) => checks[id]).length;
      return done < ids.length;
    }) ?? roadmapWeeks[roadmapWeeks.length - 1];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Welcome back"
        title="Your 10-week placement-readiness system."
        description="Product · Analytics · Tech & GenAI · Business & Growth · Domain knowledge — one tracker, one score."
        actions={
          <Button onClick={pingStreak} size="sm" variant="outline">
            <Flame className="mr-1.5 h-3.5 w-3.5" />
            Mark today
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Placement readiness"
          value={`${overall.pct}%`}
          hint={`${overall.done}/${overall.total} topics`}
          icon={Target}
        />
        <StatCard
          label="Streak"
          value={`${streak.count} days`}
          hint="Daily check-in"
          icon={Flame}
        />
        <StatCard
          label="Today's habits"
          value={`${habits.done}/${habits.total}`}
          hint={`${habits.pct}% complete`}
          icon={CheckCircle2}
        />
        <StatCard
          label="Current week"
          value={`Week ${currentWeek.week}`}
          hint={currentWeek.title}
          icon={Sparkles}
        />
      </div>

      {/* What should I learn next */}
      {nextModule && (
        <Card className="mt-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                What should I learn next?
              </p>
              <p className="mt-0.5 text-sm font-semibold">{nextModule.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {categoryMeta[nextModule.category].label} · {nextModule.hours}h ·{" "}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${priorityMeta[nextModule.priority].cls}`}
                >
                  {priorityMeta[nextModule.priority].label}
                </span>
              </p>
            </div>
          </div>
          <Link to={`/${nextModule.category === "product" ? "product" : nextModule.category}`}>
            <Button size="sm">
              Start module <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </Card>
      )}

      {/* Track tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trackProgress.map((t) => (
          <RoadmapTile
            key={t.key}
            to={t.to}
            icon={t.icon}
            title={categoryMeta[t.key].label}
            pct={t.progress.pct}
            done={t.progress.done}
            total={t.progress.total}
            hint={`${t.modules.length} modules`}
          />
        ))}
      </div>

      {/* This week + daily focus */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">This week's focus — {currentWeek.title}</h3>
            <Link
              to="/roadmap"
              className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
            >
              Open roadmap <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{currentWeek.theme}</p>
          <div className="mt-4 space-y-1.5">
            {currentWeek.moduleIds.map((id) => {
              const m = allModules.find((mm) => mm.id === id);
              if (!m) return null;
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm"
                >
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityMeta[m.priority].cls}`}
                  >
                    {priorityMeta[m.priority].label}
                  </span>
                  <span className="flex-1">{m.title}</span>
                  <span className="text-xs text-muted-foreground">{m.hours}h</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            Deliverable: {currentWeek.deliverable}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Today's habits</h3>
            <Link
              to="/execution"
              className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground"
            >
              Open <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Video-first learning loop</p>
          <div className="mt-4 space-y-1.5">
            {dailyHabits.map((h) => (
              <HabitRow key={h.id} id={h.id} text={h.text} />
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function RoadmapTile({
  to,
  icon: Icon,
  title,
  pct,
  done,
  total,
  hint,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  pct: number;
  done: number;
  total: number;
  hint: string;
}) {
  return (
    <Link to={to}>
      <Card className="p-5 transition-colors hover:bg-muted/30">
        <div className="flex items-start justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs tabular-nums text-muted-foreground">
            {done}/{total}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold">{title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        <div className="mt-4 flex items-center gap-3">
          <Progress value={pct} className="h-1.5 flex-1" />
          <span className="text-xs font-medium tabular-nums">{pct}%</span>
        </div>
      </Card>
    </Link>
  );
}

function HabitRow({ id, text }: { id: string; text: string }) {
  const checked = useCareerStore((s) => !!s.checks[id]);
  const toggle = useCareerStore((s) => s.toggleCheck);
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => toggle(id)}
        className="h-4 w-4 rounded border-input accent-foreground"
      />
      <span className={checked ? "text-muted-foreground line-through" : ""}>{text}</span>
    </label>
  );
}
