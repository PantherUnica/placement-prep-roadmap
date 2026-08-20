import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/category-page";
import { techModules } from "@/lib/content";

export const Route = createFileRoute("/tech")({ component: Page });

function Page() {
  return (
    <CategoryPage
      category="tech"
      eyebrow="Track · Tech, Systems & GenAI"
      title="Tech & GenAI Roadmap"
      description="Web/API/DB fundamentals → system architecture → SDLC/Git → ML → GenAI, agents, RAG, LangChain/LangGraph/MCP."
      modules={techModules}
    />
  );
}
