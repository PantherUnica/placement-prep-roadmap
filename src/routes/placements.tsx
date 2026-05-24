import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checklist } from "@/components/checklist";
import { companies, placementBehavioral, resumeChecklist } from "@/lib/content";
import { useChecksProgress } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/placements")({ component: Page });

function Page() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Track B · campus readiness"
        title="Placement Prep System"
        description="Not generic DSA. PM, Product Analytics, Strategy, AI PM roles only."
      />

      <Tabs defaultValue="companies">
        <TabsList>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="resume">Resume + LinkedIn</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="mt-4 space-y-3">
          {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
        </TabsContent>

        <TabsContent value="behavioral" className="mt-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Eight signature stories (STAR format)</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Write each once, rehearse cold. These power 90% of PM behavioral rounds.
            </p>
            <div className="mt-4">
              <Checklist items={placementBehavioral} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resume" className="mt-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold">Resume + brand refresh</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Lock by end of Week 7 so you can submit instantly when forms open.
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

function CompanyCard({ company }: { company: typeof companies[number] }) {
  const [open, setOpen] = useState(false);
  const { done, total, pct } = useChecksProgress(company.items.map((i) => i.id));

  return (
    <Card className="overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start gap-3 p-5 text-left hover:bg-muted/30">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{company.name}</h3>
            <Badge variant="secondary" className="text-[10px]">{company.role}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{company.notes}</p>
          <div className="mt-3 flex items-center gap-3">
            <Progress value={pct} className="h-1.5 flex-1" />
            <span className="text-xs tabular-nums text-muted-foreground">{done}/{total}</span>
          </div>
        </div>
        <ChevronDown className={cn("mt-1 h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <CardContent className="border-t bg-muted/20 pt-5">
          <Checklist items={company.items} />
        </CardContent>
      )}
    </Card>
  );
}
