import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { businessModules } from "@/lib/content";

export const Route = createFileRoute("/business")({ component: Page });

function Page() {
  return (
    <CategoryPage
      category="business"
      eyebrow="Track · Business, Growth & Marketing"
      title="Business & Growth Roadmap"
      description="Business strategy → growth loops & lifecycle marketing → digital marketing, SEO, ASO & GA4."
      modules={businessModules}
    />
  );
}
