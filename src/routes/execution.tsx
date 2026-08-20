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
        eyebrow="Execution system"
        title="Daily / Weekly Execution Tracker"
        description="The system runs you, not the other way around. Reset the daily checklist each morning."
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
            <span className="text-xs tabular-nums text-muted-foreground">
              {daily.done}/{daily.total}
            </span>
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
            <span className="text-xs tabular-nums text-muted-foreground">
              {weekly.done}/{weekly.total}
            </span>
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
        <h3 className="text-sm font-semibold">Suggested daily block structure</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          ~3–4 hours of focused prep a day gets you through the 10-week plan. Slot these blocks
          wherever they fit around college, work, or internship hours — order matters more than
          exact clock time.
        </p>
        <div className="mt-4 divide-y rounded-md border">
          {[
            [
              "Block 1 · 60–75 min",
              "Watch this week's video resource(s) for the current module, uninterrupted",
            ],
            ["Block 2 · 20 min", "Write a 5-line concept summary in your own words (Notes page)"],
            [
              "Block 3 · 45–60 min",
              "Practice: 1 SQL problem set, 1 case drill, or 1 hands-on exercise from the module",
            ],
            [
              "Block 4 · 20 min",
              "Answer 1 interview question out loud — record it or say it to a mirror",
            ],
            ["Block 5 · 15 min", "Check the Revision queue and clear anything due today"],
            ["Wind-down · 5 min", "1-line journal entry: what did I learn today?"],
          ].map(([t, label]) => (
            <div key={t} className="flex items-start gap-4 px-3 py-2.5 text-sm">
              <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground">{t}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          Protect sleep and one full day off per week — burnout costs more prep time than it saves.
        </p>
      </Card>
    </AppShell>
  );
}
