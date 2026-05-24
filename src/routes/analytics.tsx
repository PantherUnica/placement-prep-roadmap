import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ModuleCard } from "@/components/module-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/stat-card";
import { analyticsTracks, collectIds } from "@/lib/content";
import { useCareerStore, useChecksProgress } from "@/lib/store";

export const Route = createFileRoute("/analytics")({ component: Page });

function Page() {
  const { done, total, pct } = useChecksProgress(collectIds(analyticsTracks));
  const streak = useCareerStore((s) => s.streak);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Backup track · 1–2 hrs / week"
        title="Analytics Backup Tracker"
        description="Product analytics roles are your insurance. SQL fluency closes your biggest gap."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Progress" value={`${pct}%`} hint={`${done}/${total} topics`} />
        <StatCard label="SQL streak" value={`${streak.count}d`} hint="Mark daily" icon={Flame} />
        <StatCard label="Goal" value="60 SQL" hint="StrataScratch by Week 8" />
      </div>

      <Card className="mb-6 p-5">
        <Progress value={pct} className="h-2" />
      </Card>

      <div className="space-y-3">
        {analyticsTracks.map((m) => <ModuleCard key={m.id} module={m} />)}
      </div>
    </AppShell>
  );
}
