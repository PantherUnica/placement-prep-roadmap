import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ModuleCard } from "@/components/module-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { aiModules, collectIds } from "@/lib/content";
import { useChecksProgress } from "@/lib/store";

export const Route = createFileRoute("/ai-roadmap")({ component: Page });

function Page() {
  const { done, total, pct } = useChecksProgress(collectIds(aiModules));
  return (
    <AppShell>
      <PageHeader
        eyebrow="Phase 1 · Pre-internship sprint"
        title="Agentic AI Learning Roadmap"
        description="10 modules. Beginner → intermediate. Goal: walk into Adobe Day 1 fluent in agents."
      />
      <Card className="mb-6 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-semibold">{done}</span>
            <span className="text-muted-foreground"> / {total} topics complete</span>
          </p>
          <span className="text-2xl font-semibold tabular-nums">{pct}%</span>
        </div>
        <Progress value={pct} className="mt-3 h-2" />
      </Card>
      <div className="space-y-3">
        {aiModules.map((m) => <ModuleCard key={m.id} module={m} />)}
      </div>
    </AppShell>
  );
}
