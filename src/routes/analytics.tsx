import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { analyticsModules } from "@/lib/content";

export const Route = createFileRoute("/analytics")({ component: Page });

function Page() {
  return (
    <CategoryPage
      category="analytics"
      eyebrow="Track · Data & Product Analytics"
      title="Analytics Roadmap"
      description="SQL → advanced SQL → Excel/Tableau/Power BI → statistics → product metrics → A/B testing."
      modules={analyticsModules}
    />
  );
}
