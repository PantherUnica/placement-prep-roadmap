import { useState } from "react";
import { ChevronDown, ExternalLink, Clock, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checklist } from "./checklist";
import { useCareerStore, useChecksProgress } from "@/lib/store";
import type { Module } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ModuleCard({ module: m }: { module: Module }) {
  const [open, setOpen] = useState(false);
  const ids = m.topics.map((t) => t.id);
  const { done, total, pct } = useChecksProgress(ids);
  const notes = useCareerStore((s) => s.notes);
  const setNote = useCareerStore((s) => s.setNote);

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold">{m.title}</h3>
            <Badge variant="secondary" className="text-[10px] capitalize">{m.level}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {m.hours}h
            </span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{m.why}</p>
          <div className="mt-3 flex items-center gap-3">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {done}/{total}
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <CardContent className="border-t bg-muted/20 pt-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Learning Checklist
              </h4>
              <Checklist items={m.topics} />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Resources
                </h4>
                <ul className="space-y-1.5">
                  {m.resources.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60"
                      >
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="flex-1">
                          {r.title}
                          <Badge variant="outline" className="ml-2 text-[10px] capitalize">
                            {r.type}
                          </Badge>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {m.projects && m.projects.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Zap className="mr-1 inline h-3 w-3" />
                    Mini-projects
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {m.projects.map((p) => (
                      <li key={p} className="leading-snug">• {p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Notes
            </h4>
            <Textarea
              value={notes[`note-${m.id}`] ?? ""}
              onChange={(e) => setNote(`note-${m.id}`, e.target.value)}
              placeholder="Capture insights, gotchas, links…"
              className="min-h-[80px] resize-y bg-background text-sm"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
