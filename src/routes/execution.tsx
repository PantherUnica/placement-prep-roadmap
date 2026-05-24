import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checklist } from "@/components/checklist";
import { dailyHabits, weeklyHabits } from "@/lib/content";
import { useCareerStore, useChecksProgress } from "@/lib/store";

export const Route = createFileRoute("/execution")({ component: Page });

function Page() {
  const daily = useChecksProgress(dailyHabits.map((h) => h.id));
  const weekly = useChecksProgress(weeklyHabits.map((h) => h.id));
  const streak = useCareerStore((s) => s.streak);
  const pingStreak = useCareerStore((s) => s.pingStreak);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Productivity OS"
        title="Daily / Weekly Execution Tracker"
        description="The system runs you. Not the other way around. Reset checklist each morning."
        actions={
          <Button size="sm" variant="outline" onClick={pingStreak}>
            <Flame className="mr-1.5 h-3.5 w-3.5" />
            Streak: {streak.count}d
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Daily ritual</h3>
            <span className="text-xs tabular-nums text-muted-foreground">{daily.done}/{daily.total}</span>
          </div>
          <Progress value={daily.pct} className="mt-3 h-1.5" />
          <div className="mt-4">
            <Checklist items={dailyHabits} />
          </div>
          <p className="mt-4 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            Anchor habit: lights out 10:30 PM. Everything else collapses without sleep.
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Weekly cadence</h3>
            <span className="text-xs tabular-nums text-muted-foreground">{weekly.done}/{weekly.total}</span>
          </div>
          <Progress value={weekly.pct} className="mt-3 h-1.5" />
          <div className="mt-4">
            <Checklist items={weeklyHabits} />
          </div>
          <p className="mt-4 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            Friday update to manager is the single highest-leverage 10 min of your week.
          </p>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h3 className="text-sm font-semibold">Daily rhythm</h3>
        <p className="mt-1 text-xs text-muted-foreground">Internship-mode schedule</p>
        <div className="mt-4 divide-y rounded-md border">
          {[
            ["6:30 AM", "Wake — no phone for 20 min"],
            ["7:00 AM", "30 min: PM/AI article"],
            ["8:00 AM", "Internship starts"],
            ["6:00 PM", "Internship ends"],
            ["6:30 PM", "30 min decompress walk"],
            ["7:00 PM", "Learning block (Mon/Wed/Fri AI · Tue/Thu PM)"],
            ["9:00 PM", "Wind down · 1-line journal"],
            ["10:30 PM", "Lights out"],
          ].map(([t, label]) => (
            <div key={t} className="flex items-center gap-4 px-3 py-2 text-sm">
              <span className="w-20 font-mono text-xs text-muted-foreground">{t}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
