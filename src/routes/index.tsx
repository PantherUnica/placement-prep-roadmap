import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Target, Briefcase, Bot, Compass, CheckCircle2, BarChart3, Clock, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCareerStore, useChecksProgress } from "@/lib/store";
import {
  aiModules,
  pmSections,
  analyticsTracks,
  adobeMilestones,
  dailyHabits,
  phases,
  collectIds,
  collectMilestoneIds,
} from "@/lib/content";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
  const streak = useCareerStore((s) => s.streak);
  const pingStreak = useCareerStore((s) => s.pingStreak);

  const ai = useChecksProgress(collectIds(aiModules));
  const pm = useChecksProgress(collectIds(pmSections));
  const an = useChecksProgress(collectIds(analyticsTracks));
  const ad = useChecksProgress(collectMilestoneIds(adobeMilestones));
  const habits = useChecksProgress(dailyHabits.map((h) => h.id));

  const today = habits.pct;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Welcome back, Aditya"
        title="The next 60 days are your unfair advantage."
        description="Track A: Win the Adobe PPO. Track B: Stay placement-ready. Everything else is noise."
        actions={
          <Button onClick={pingStreak} size="sm" variant="outline">
            <Flame className="mr-1.5 h-3.5 w-3.5" />
            Mark today
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Streak" value={`${streak.count} days`} hint="Daily check-in" icon={Flame} />
        <StatCard label="Today's habits" value={`${habits.done}/${habits.total}`} hint={`${today}% complete`} icon={CheckCircle2} />
        <StatCard label="Adobe progress" value={`${ad.pct}%`} hint={`${ad.done}/${ad.total} milestones`} icon={Briefcase} />
        <StatCard label="AI roadmap" value={`${ai.pct}%`} hint={`${ai.done}/${ai.total} topics`} icon={Bot} />
      </div>

      {/* Current phase */}
      <Card className="mt-6 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Current phase
            </p>
            <h2 className="mt-1 text-lg font-semibold">{phases[0].name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{phases[0].goal}</p>
          </div>
          <Badge variant="secondary">{phases[0].weeks}</Badge>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {phases.map((p, i) => {
            const pct = i === 0 ? ai.pct : i === 1 ? ad.pct : pm.pct;
            return (
              <div key={p.id} className="rounded-md border bg-muted/30 p-3">
                <p className="text-xs font-medium">{p.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{p.weeks}</p>
                <Progress value={pct} className="mt-2 h-1" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Roadmap progress */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <RoadmapTile to="/ai-roadmap" icon={Bot} title="Agentic AI Roadmap" pct={ai.pct} done={ai.done} total={ai.total} hint="LLMs · Agents · RAG · LangGraph · MCP" />
        <RoadmapTile to="/pm-roadmap" icon={Compass} title="Product Management" pct={pm.pct} done={pm.done} total={pm.total} hint="Sense · Metrics · Strategy · PRDs · AI PM" />
        <RoadmapTile to="/analytics" icon={BarChart3} title="Analytics Backup" pct={an.pct} done={an.done} total={an.total} hint="SQL · Python · A/B testing · Cohorts" />
        <RoadmapTile to="/adobe" icon={Briefcase} title="Adobe Internship Tracker" pct={ad.pct} done={ad.done} total={ad.total} hint="8 weekly milestones · PPO path" />
      </div>

      {/* Today focus + time allocation */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Today's daily focus</h3>
            <Link to="/execution" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
              Open tracker <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Front-load AI fundamentals. One mini-build per day &gt; passive video bingeing.
          </p>
          <div className="mt-4 space-y-1.5">
            {dailyHabits.slice(0, 5).map((h) => (
              <HabitRow key={h.id} id={h.id} text={h.text} />
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold">Weekly time allocation</h3>
          <p className="mt-1 text-xs text-muted-foreground">During internship</p>
          <div className="mt-4 space-y-3 text-sm">
            <Alloc label="Adobe deep work" hrs="40–45h" pct={80} />
            <Alloc label="Agentic AI learning" hrs="4–5h" pct={10} />
            <Alloc label="PM frameworks" hrs="2h" pct={5} />
            <Alloc label="Placement prep" hrs="1.5h" pct={3} />
            <Alloc label="LinkedIn / brand" hrs="0.5h" pct={2} />
          </div>
        </Card>
      </div>

      {/* Upcoming milestones */}
      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Upcoming Adobe milestones</h3>
          <Link to="/adobe" className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {adobeMilestones.slice(0, 4).map((m) => (
            <div key={m.id} className="flex items-start gap-3 rounded-md border p-3">
              <Target className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.week}</p>
                <p className="text-sm font-medium">{m.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

function RoadmapTile({
  to, icon: Icon, title, pct, done, total, hint,
}: { to: string; icon: any; title: string; pct: number; done: number; total: number; hint: string }) {
  return (
    <Link to={to}>
      <Card className="p-5 transition-colors hover:bg-muted/30">
        <div className="flex items-start justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs tabular-nums text-muted-foreground">{done}/{total}</span>
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

function Alloc({ label, hrs, pct }: { label: string; hrs: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span>{label}</span>
        <span className="text-muted-foreground tabular-nums">
          <Clock className="mr-1 inline h-3 w-3" />
          {hrs}
        </span>
      </div>
      <Progress value={pct} className="mt-1 h-1" />
    </div>
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
