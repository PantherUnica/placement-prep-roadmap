import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCareerStore } from "@/lib/store";

export const Route = createFileRoute("/notes")({ component: Page });

const tags = ["General", "AI", "PM", "Adobe", "Interview", "Reflection"];

function Page() {
  const journal = useCareerStore((s) => s.journal);
  const add = useCareerStore((s) => s.addJournal);
  const del = useCareerStore((s) => s.deleteJournal);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");

  const submit = () => {
    if (!title.trim() && !body.trim()) return;
    add({ title: title.trim() || "Untitled", body: body.trim(), tag });
    setTitle("");
    setBody("");
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Capture"
        title="Notes & Journal"
        description="Quick capture, weekly reflections, internship learnings. Local + private."
      />

      <Card className="mb-6 p-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g. 'Friday update wins')"
          className="border-0 px-0 text-base font-semibold shadow-none focus-visible:ring-0"
        />
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What did I ship? What did I learn? What's next?"
          className="mt-2 min-h-[120px] resize-y border-0 px-0 shadow-none focus-visible:ring-0"
        />
        <div className="mt-2 flex items-center justify-between border-t pt-3">
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {tags.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={submit} size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Save entry
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        {journal.length === 0 && (
          <Card className="p-8 text-center text-sm text-muted-foreground">
            No entries yet. Your first "1-line: what did I ship today?" goes a long way.
          </Card>
        )}
        {journal.map((e) => (
          <Card key={e.id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold">{e.title}</h3>
                  {e.tag && <Badge variant="secondary" className="text-[10px]">{e.tag}</Badge>}
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(e.date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </span>
                </div>
                {e.body && (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{e.body}</p>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => del(e.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
