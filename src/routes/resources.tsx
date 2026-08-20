import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, ExternalLink, Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { library, categoryMeta, type Category } from "@/lib/content";
import { useCareerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({ component: Page });

type LibCategory = Category | "Interview";
const categories: { value: LibCategory | "All"; label: string }[] = [
  { value: "All", label: "All" },
  { value: "product", label: categoryMeta.product.short },
  { value: "analytics", label: categoryMeta.analytics.short },
  { value: "tech", label: categoryMeta.tech.short },
  { value: "business", label: categoryMeta.business.short },
  { value: "domain", label: categoryMeta.domain.short },
  { value: "Interview", label: "Interview" },
];

function Page() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<LibCategory | "All">("All");
  const checks = useCareerStore((s) => s.checks);
  const toggle = useCareerStore((s) => s.toggleCheck);

  const filtered = useMemo(() => {
    return library.filter((r) => {
      if (cat !== "All" && r.category !== cat) return false;
      if (
        q &&
        !r.title.toLowerCase().includes(q.toLowerCase()) &&
        !r.why.toLowerCase().includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [q, cat]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Curated"
        title="Resource Library"
        description="High-signal AI, PM, and analytics resources. No fluff, no Medium SEO posts."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search resources…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <Button
              key={c.value}
              size="sm"
              variant={cat === c.value ? "default" : "outline"}
              onClick={() => setCat(c.value)}
              className="h-8 text-xs"
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((r) => {
          const done = !!checks[r.id];
          return (
            <Card key={r.id} className={cn("p-4 transition-colors", done && "bg-muted/30")}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">
                    {r.category === "Interview" ? "Interview" : categoryMeta[r.category].short}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {r.type}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {r.difficulty}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">· {r.time}</span>
                </div>
                <button
                  onClick={() => toggle(r.id)}
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                    done ? "border-foreground bg-foreground text-background" : "hover:bg-muted",
                  )}
                >
                  {done && <Check className="h-3 w-3" />}
                </button>
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                {r.title}
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
              <p className="mt-1 text-xs text-muted-foreground">{r.why}</p>
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <Card className="p-8 text-center text-sm text-muted-foreground">No matches.</Card>
      )}
    </AppShell>
  );
}
