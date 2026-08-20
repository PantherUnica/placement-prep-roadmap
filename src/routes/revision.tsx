import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { RotateCcw, CheckCircle2, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import { allModules, categoryMeta } from "@/lib/content";
import { useCareerStore } from "@/lib/store";

export const Route = createFileRoute("/revision")({ component: Page });

const REVIEW_INTERVAL_DAYS = 7;

function Page() {
  const checks = useCareerStore((s) => s.checks);
  const reviewedAt = useCareerStore((s) => s.reviewedAt);
  const markReviewed = useCareerStore((s) => s.markReviewed);

  const dueItems = useMemo(() => {
    const now = Date.now();
    const items: {
      id: string;
      text: string;
      moduleTitle: string;
      category: string;
      overdueDays: number;
    }[] = [];
    for (const m of allModules) {
      for (const t of m.topics) {
        if (!checks[t.id]) continue;
        const last = reviewedAt[t.id];
        const lastMs = last ? new Date(last).getTime() : 0;
        const daysSince = (now - lastMs) / 86400000;
        if (!last || daysSince >= REVIEW_INTERVAL_DAYS) {
          items.push({
            id: t.id,
            text: t.text,
            moduleTitle: m.title,
            category: categoryMeta[m.category].short,
            overdueDays: last ? Math.floor(daysSince) : -1,
          });
        }
      }
    }
    return items.sort((a, b) => b.overdueDays - a.overdueDays);
  }, [checks, reviewedAt]);

  const totalCompleted = allModules.reduce(
    (acc, m) => acc + m.topics.filter((t) => checks[t.id]).length,
    0,
  );
  const totalReviewed = Object.keys(reviewedAt).filter((id) => checks[id]).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Spaced review"
        title="Revision Queue"
        description="Completed topics resurface here every 7 days so they stay sharp for interviews, not just checked off once."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Topics completed" value={totalCompleted} icon={CheckCircle2} />
        <StatCard label="Ever reviewed" value={totalReviewed} icon={Sparkles} />
        <StatCard label="Due for review now" value={dueItems.length} icon={RotateCcw} />
      </div>

      {dueItems.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">
          Nothing due for revision. Complete topics in your tracks and they'll show up here 7 days
          after you last reviewed them.
        </Card>
      ) : (
        <div className="space-y-2">
          {dueItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">{item.moduleTitle}</span>
                  {item.overdueDays >= 0 && (
                    <span className="text-[11px] text-muted-foreground">
                      · {item.overdueDays}d since last review
                    </span>
                  )}
                  {item.overdueDays < 0 && (
                    <span className="text-[11px] text-muted-foreground">· never reviewed</span>
                  )}
                </div>
                <p className="mt-1 text-sm">{item.text}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => markReviewed(item.id)}>
                Mark reviewed
              </Button>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
