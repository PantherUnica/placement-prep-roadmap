import { Checkbox } from "@/components/ui/checkbox";
import { useCareerStore } from "@/lib/store";
import type { ChecklistItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Checklist({ items, dense }: { items: ChecklistItem[]; dense?: boolean }) {
  const checks = useCareerStore((s) => s.checks);
  const toggle = useCareerStore((s) => s.toggleCheck);

  return (
    <ul className={cn("flex flex-col", dense ? "gap-1" : "gap-1.5")}>
      {items.map((item) => {
        const done = !!checks[item.id];
        return (
          <li key={item.id}>
            <label
              className={cn(
                "flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted/60",
                done && "text-muted-foreground",
              )}
            >
              <Checkbox
                checked={done}
                onCheckedChange={() => toggle(item.id)}
                className="mt-0.5"
              />
              <span className={cn("flex-1 leading-snug", done && "line-through")}>
                {item.text}
                {item.hint && (
                  <span className="ml-1 text-xs text-muted-foreground">— {item.hint}</span>
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
