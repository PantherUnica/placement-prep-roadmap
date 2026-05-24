import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ModuleCard } from "@/components/module-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { pmSections, collectIds } from "@/lib/content";
import { useChecksProgress } from "@/lib/store";

export const Route = createFileRoute("/pm-roadmap")({ component: Page });

function Page() {
  const { done, total, pct } = useChecksProgress(collectIds(pmSections));
  return (
    <AppShell>
      <PageHeader
        eyebrow="Track B · maintenance + sharpening"
        title="Product Management Roadmap"
        description="You already think like a PM. This formalizes the frameworks so you don't fumble under interview pressure."
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
        {pmSections.map((m) => <ModuleCard key={m.id} module={m} />)}
      </div>
    </AppShell>
  );
}
