import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { productModules } from "@/lib/content";

export const Route = createFileRoute("/product")({ component: Page });

function Page() {
  return (
    <CategoryPage
      category="product"
      eyebrow="Track · Product Management"
      title="Product Management Roadmap"
      description="PMLC → product sense → research → strategy → PRDs → UX → agile → GTM. Video-first, checklist-driven."
      modules={productModules}
    />
  );
}
