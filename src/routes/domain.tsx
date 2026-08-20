import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { domainModules } from "@/lib/content";

export const Route = createFileRoute("/domain")({ component: Page });

function Page() {
  return (
    <CategoryPage
      category="domain"
      eyebrow="Track · Domain Knowledge"
      title="Domain Knowledge Roadmap"
      description="FinTech payments & credit · Healthcare workflows · Enterprise software & B2B SaaS."
      modules={domainModules}
    />
  );
}
