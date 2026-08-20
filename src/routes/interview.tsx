import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checklist } from "@/components/checklist";
import {
  caseBank,
  companies,
  behavioralQuestions,
  resumeChecklist,
  type CaseItem,
} from "@/lib/content";
import { useCareerStore, useChecksProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interview")({ component: Page });

const kindLabel: Record<CaseItem["kind"], string> = {
  design: "Product Design",
  strategy: "Strategy",
  rca: "Root Cause",
  guesstimate: "Guesstimate",
  gtm: "GTM",
};
const kinds = ["all", "design", "strategy", "rca", "guesstimate", "gtm"] as const;

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Practice"
        title="Interview Prep System"
        description="Product, Analytics, Technical/TPM, and Behavioral prep — case bank, target companies, and resume checklist."
      />

      <Tabs defaultValue="cases">
        <TabsList>
          <TabsTrigger value="cases">Case Bank</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="resume">Resume + LinkedIn</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="mt-4">
          <CaseBank />
        </TabsContent>

        <TabsContent value="companies" className="mt-4 space-y-3">
          {companies.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </TabsContent>

        <TabsContent value="behavioral" className="mt-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Eight signature stories (STAR format)</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Write each once, rehearse cold. These power most PM/Analytics behavioral rounds.
            </p>
            <div className="mt-4">
              <Checklist items={behavioralQuestions} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="mt-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Resume + brand refresh</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Lock this by Week 9 so you can submit instantly when applications open.
            </p>
            <div className="mt-4">
              <Checklist items={resumeChecklist} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function CaseBank() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("all");
  const checks = useCareerStore((s) => s.checks);
  const toggle = useCareerStore((s) => s.toggleCheck);

  const filtered = useMemo(
    () => (kind === "all" ? caseBank : caseBank.filter((c) => c.kind === kind)),
    [kind],
  );
  const { done, total, pct } = useChecksProgress(caseBank.map((c) => `case-done-${c.id}`));

  return (
    <div>
      <Card className="mb-4 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Case bank progress</span>
          <span className="tabular-nums text-muted-foreground">
            {done}/{total} · {pct}%
          </span>
        </div>
        <Progress value={pct} className="mt-2 h-1.5" />
      </Card>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {kinds.map((k) => (
          <Button
            key={k}
            size="sm"
            variant={kind === k ? "default" : "outline"}
            onClick={() => setKind(k)}
            className="h-8 text-xs capitalize"
          >
            {k === "all" ? "All" : kindLabel[k]}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((c) => {
          const id = `case-done-${c.id}`;
          const isDone = !!checks[id];
          return (
            <label
              key={c.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-md border bg-background p-3 text-sm hover:bg-muted/40",
                isDone && "bg-muted/30",
              )}
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggle(id)}
                className="mt-0.5 h-4 w-4 rounded border-input accent-foreground"
              />
              <span className="flex-1">
                <Badge variant="outline" className="mr-2 text-[10px]">
                  {kindLabel[c.kind]}
                </Badge>
                <span className={isDone ? "text-muted-foreground line-through" : ""}>{c.text}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function CompanyCard({ company }: { company: (typeof companies)[number] }) {
  const [open, setOpen] = useState(false);
  const { done, total, pct } = useChecksProgress(company.items.map((i) => i.id));

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 p-5 text-left hover:bg-muted/30"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{company.name}</h3>
            <Badge variant="secondary" className="text-[10px]">
              {company.role}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{company.notes}</p>
          <div className="mt-3 flex items-center gap-3">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-xs tabular-nums text-muted-foreground">
              {done}/{total}
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <CardContent className="border-t bg-muted/20 pt-5">
          <Checklist items={company.items} />
        </CardContent>
      )}
    </Card>
  );
}
