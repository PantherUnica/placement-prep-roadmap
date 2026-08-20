import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { ModuleCard } from "@/components/module-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Category, Module, Priority } from "@/lib/content";
import { priorityMeta, collectIds } from "@/lib/content";
import { useChecksProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

const priorityOrder: Priority[] = ["must", "important", "optional"];

export function CategoryPage({
  category,
  title,
  description,
  eyebrow,
  modules,
}: {
  category: Category;
  title: string;
  description: string;
  eyebrow: string;
  modules: Module[];
}) {
  const [filter, setFilter] = useState<"all" | Priority>("all");
  const [q, setQ] = useState("");
  const { done, total, pct } = useChecksProgress(collectIds(modules));

  const sorted = useMemo(
    () =>
      [...modules].sort(
        (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority),
      ),
    [modules],
  );
  const byPriority = filter === "all" ? sorted : sorted.filter((m) => m.priority === filter);
  const filtered = useMemo(() => {
    if (!q.trim()) return byPriority;
    const needle = q.trim().toLowerCase();
    return byPriority.filter((m) => {
      if (m.title.toLowerCase().includes(needle)) return true;
      if (m.why.toLowerCase().includes(needle)) return true;
      if (m.topics.some((t) => t.text.toLowerCase().includes(needle))) return true;
      if (m.interviewQuestions?.some((q2) => q2.toLowerCase().includes(needle))) return true;
      return false;
    });
  }, [byPriority, q]);

  return (
    <AppShell>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <Card className="mb-4 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-semibold">{done}</span>
            <span className="text-muted-foreground"> / {total} topics complete</span>
          </p>
          <span className="text-2xl font-semibold tabular-nums">{pct}%</span>
        </div>
        <Progress value={pct} className="mt-3 h-2" />
      </Card>

      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search modules, topics, interview questions…"
          className="pl-9"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="h-8 text-xs"
        >
          All ({modules.length})
        </Button>
        {priorityOrder.map((p) => {
          const count = modules.filter((m) => m.priority === p).length;
          if (count === 0) return null;
          return (
            <Button
              key={p}
              size="sm"
              variant={filter === p ? "default" : "outline"}
              onClick={() => setFilter(p)}
              className={cn("h-8 text-xs")}
            >
              {priorityMeta[p].label} ({count})
            </Button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((m) => (
          <ModuleCard key={m.id} module={m} />
        ))}
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            No modules match{q.trim() ? ` "${q.trim()}"` : " this filter"}.
          </Card>
        )}
      </div>
    </AppShell>
  );
}
