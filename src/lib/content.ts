// Pre-filled, opinionated content for Aditya's 2-month Career OS.
// All IDs are stable and used as keys for checklist/note persistence.

export interface Resource {
  title: string;
  url: string;
  type: "video" | "course" | "blog" | "repo" | "doc" | "paper";
}

export interface ChecklistItem {
  id: string;
  text: string;
  hint?: string;
}

export interface Module {
  id: string;
  title: string;
  why: string;
  hours: number;
  level: "beginner" | "intermediate" | "advanced";
  topics: ChecklistItem[];
  resources: Resource[];
  projects?: string[];
}

// ───────────────── AGENTIC AI ─────────────────
export const aiModules: Module[] = [
  {
    id: "ai-llm",
    title: "LLM Fundamentals",
    why: "Every agent is an LLM in a loop. You can't reason about agents without fluency in tokens, context windows, temperature, and prompting.",
    hours: 4,
    level: "beginner",
    topics: [
      { id: "ai-llm-1", text: "Tokens, embeddings, and context windows" },
      { id: "ai-llm-2", text: "Temperature, top-p, top-k sampling" },
      { id: "ai-llm-3", text: "System vs user vs assistant roles" },
      { id: "ai-llm-4", text: "API basics (OpenAI, Anthropic, Gemini)" },
      { id: "ai-llm-5", text: "Cost / latency tradeoffs across model tiers" },
    ],
    resources: [
      { title: "Karpathy — Intro to LLMs (1hr)", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", type: "video" },
      { title: "OpenAI Cookbook", url: "https://github.com/openai/openai-cookbook", type: "repo" },
    ],
    projects: ["Build a 30-line CLI chatbot using raw OpenAI SDK"],
  },
  {
    id: "ai-prompt",
    title: "Prompt Engineering",
    why: "The cheapest, fastest lever you have. Adobe will judge your ability to coax behavior out of models without fine-tuning.",
    hours: 3,
    level: "beginner",
    topics: [
      { id: "ai-prompt-1", text: "Zero-shot, few-shot, chain-of-thought" },
      { id: "ai-prompt-2", text: "ReAct prompting (Reason + Act)" },
      { id: "ai-prompt-3", text: "Self-critique and reflection loops" },
      { id: "ai-prompt-4", text: "Structured output (JSON mode, tool schemas)" },
      { id: "ai-prompt-5", text: "Prompt versioning and evaluation" },
    ],
    resources: [
      { title: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type: "doc" },
      { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "doc" },
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    why: "The Adobe project almost certainly is an agent. ReAct + tool use is the literal bedrock.",
    hours: 6,
    level: "intermediate",
    topics: [
      { id: "ai-agents-1", text: "ReAct loop: Perceive → Reason → Act → Observe" },
      { id: "ai-agents-2", text: "Tools, function calling, JSON schemas" },
      { id: "ai-agents-3", text: "Memory types: short-term, long-term, episodic" },
      { id: "ai-agents-4", text: "Planning vs reactive agents" },
      { id: "ai-agents-5", text: "Guardrails and failure modes" },
    ],
    resources: [
      { title: "Lilian Weng — LLM Powered Autonomous Agents", url: "https://lilianweng.github.io/posts/2023-06-23-agent/", type: "blog" },
      { title: "HuggingFace Agents Course", url: "https://huggingface.co/learn/agents-course", type: "course" },
      { title: "ReAct paper", url: "https://arxiv.org/abs/2210.03629", type: "paper" },
    ],
    projects: ["Build a single-agent research assistant with a web-search tool"],
  },
  {
    id: "ai-mas",
    title: "Multi-Agent Systems",
    why: "Adobe's workflows are inherently multi-step. Orchestrator + worker patterns are the future of creative tooling.",
    hours: 5,
    level: "intermediate",
    topics: [
      { id: "ai-mas-1", text: "Orchestrator + workers pattern" },
      { id: "ai-mas-2", text: "Pipeline / sequential agents" },
      { id: "ai-mas-3", text: "Debate and critique patterns" },
      { id: "ai-mas-4", text: "Message passing and shared state" },
      { id: "ai-mas-5", text: "Cost and latency at scale" },
    ],
    resources: [
      { title: "DeepLearning.AI — Multi AI Agent Systems with CrewAI", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", type: "course" },
      { title: "AutoGen", url: "https://github.com/microsoft/autogen", type: "repo" },
    ],
  },
  {
    id: "ai-rag",
    title: "RAG (Retrieval-Augmented Generation)",
    why: "Every enterprise agent needs grounding. Adobe will care about quality of retrieval over fancy models.",
    hours: 5,
    level: "intermediate",
    topics: [
      { id: "ai-rag-1", text: "Embeddings: what they are, how to pick a model" },
      { id: "ai-rag-2", text: "Chunking strategies (fixed, semantic, recursive)" },
      { id: "ai-rag-3", text: "Vector DB basics: pgvector, Chroma, Pinecone" },
      { id: "ai-rag-4", text: "Retrieval pipeline: query rewriting, reranking" },
      { id: "ai-rag-5", text: "Context injection and prompt assembly" },
      { id: "ai-rag-6", text: "RAG evaluation (faithfulness, relevance)" },
    ],
    resources: [
      { title: "DeepLearning.AI — Building Agentic RAG with LlamaIndex", url: "https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/", type: "course" },
      { title: "LangChain RAG docs", url: "https://python.langchain.com/docs/tutorials/rag/", type: "doc" },
    ],
    projects: ["Build a RAG chatbot over Adobe Help Center PDFs"],
  },
  {
    id: "ai-langchain",
    title: "LangChain",
    why: "Industry standard for stitching LLMs to tools and data. Even if Adobe uses something else, the abstractions transfer.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "ai-lc-1", text: "Runnables and LCEL syntax" },
      { id: "ai-lc-2", text: "Chains: sequential, parallel, conditional" },
      { id: "ai-lc-3", text: "Tools and tool-calling agents" },
      { id: "ai-lc-4", text: "Memory modules" },
      { id: "ai-lc-5", text: "Streaming and callbacks" },
    ],
    resources: [
      { title: "LangChain Docs", url: "https://python.langchain.com/docs/introduction/", type: "doc" },
      { title: "AssemblyAI LangChain Playlist", url: "https://www.youtube.com/@AssemblyAI", type: "video" },
    ],
  },
  {
    id: "ai-langgraph",
    title: "LangGraph",
    why: "Stateful, graph-based agent workflows. The right primitive when ReAct loops aren't enough.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "ai-lg-1", text: "State graphs and nodes" },
      { id: "ai-lg-2", text: "Conditional edges and routing" },
      { id: "ai-lg-3", text: "Human-in-the-loop checkpoints" },
      { id: "ai-lg-4", text: "Persistence and time-travel" },
    ],
    resources: [
      { title: "LangChain Academy — Intro to LangGraph", url: "https://academy.langchain.com/courses/intro-to-langgraph", type: "course" },
    ],
  },
  {
    id: "ai-crewai",
    title: "CrewAI",
    why: "Most readable MAS framework. Best for demoing concepts to stakeholders quickly.",
    hours: 3,
    level: "beginner",
    topics: [
      { id: "ai-crew-1", text: "Agents, tasks, crews mental model" },
      { id: "ai-crew-2", text: "Process types: sequential, hierarchical" },
      { id: "ai-crew-3", text: "Tool integrations" },
    ],
    resources: [
      { title: "CrewAI GitHub", url: "https://github.com/crewAIInc/crewAI", type: "repo" },
      { title: "AI Jason — CrewAI tutorials", url: "https://www.youtube.com/@AIJasonZ", type: "video" },
    ],
  },
  {
    id: "ai-mcp",
    title: "MCP (Model Context Protocol)",
    why: "USB-C for AI. Anthropic's standard, rapidly becoming the universal connector. Adobe will care.",
    hours: 2,
    level: "intermediate",
    topics: [
      { id: "ai-mcp-1", text: "MCP servers vs clients" },
      { id: "ai-mcp-2", text: "Tool, resource, prompt primitives" },
      { id: "ai-mcp-3", text: "Building a simple MCP server" },
    ],
    resources: [
      { title: "MCP Spec", url: "https://modelcontextprotocol.io/introduction", type: "doc" },
    ],
  },
  {
    id: "ai-pm",
    title: "AI Product Thinking",
    why: "What separates an AI PM from a generalist PM: evals, hallucination, trust UX, model selection.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "ai-pm-1", text: "Evals: golden datasets, LLM-as-judge" },
      { id: "ai-pm-2", text: "Trust UX: confidence, citations, undo" },
      { id: "ai-pm-3", text: "Latency vs quality vs cost tradeoffs" },
      { id: "ai-pm-4", text: "Guardrails: input/output safety" },
      { id: "ai-pm-5", text: "Agent UX patterns: streaming, interrupts, approvals" },
    ],
    resources: [
      { title: "Latent Space", url: "https://www.latent.space/", type: "blog" },
      { title: "Lenny's Newsletter — AI PM posts", url: "https://www.lennysnewsletter.com/", type: "blog" },
    ],
  },
];

// ───────────────── ADOBE INTERNSHIP ─────────────────
export interface Milestone {
  id: string;
  week: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

export const adobeMilestones: Milestone[] = [
  {
    id: "adobe-w0",
    week: "Pre-Week 1",
    title: "Pre-onboarding",
    description: "Show up Day 1 already fluent. Don't waste anyone's time.",
    items: [
      { id: "adobe-w0-1", text: "Complete 4 DeepLearning.AI agent courses" },
      { id: "adobe-w0-2", text: "Read Lilian Weng's agents post end to end" },
      { id: "adobe-w0-3", text: "Skim Adobe's last 3 AI announcements (Firefly, Acrobat AI Assistant, Express)" },
      { id: "adobe-w0-4", text: "Set up dev environment: Python, uv, LangChain, .env workflow" },
      { id: "adobe-w0-5", text: "Prep a 30-sec self-intro for the team" },
    ],
  },
  {
    id: "adobe-w1",
    week: "Week 1",
    title: "Understand project scope",
    description: "Spend the first week listening, mapping, and writing. Don't ship.",
    items: [
      { id: "adobe-w1-1", text: "Ask manager: 'What does success look like in 8 weeks?'" },
      { id: "adobe-w1-2", text: "Document the project in your own words (1-pager)" },
      { id: "adobe-w1-3", text: "Identify the end user and their current pain" },
      { id: "adobe-w1-4", text: "List 5 biggest open questions" },
      { id: "adobe-w1-5", text: "Meet 3 people outside your immediate team" },
      { id: "adobe-w1-6", text: "Send first Friday update (5 lines)" },
    ],
  },
  {
    id: "adobe-w2",
    week: "Week 2",
    title: "Learn AI agents in Adobe's context",
    description: "Translate generic agent knowledge to Adobe's stack and constraints.",
    items: [
      { id: "adobe-w2-1", text: "Read internal docs / past PRDs for the project area" },
      { id: "adobe-w2-2", text: "Reproduce one existing internal demo end-to-end" },
      { id: "adobe-w2-3", text: "Identify which framework the team uses (LangGraph, OpenAI Agents SDK, custom)" },
      { id: "adobe-w2-4", text: "Write a brief comparing your project to 2 external products" },
      { id: "adobe-w2-5", text: "Friday update + propose initial direction" },
    ],
  },
  {
    id: "adobe-w3",
    week: "Week 3",
    title: "Build first prototype",
    description: "Ship something rough but real. Demoable > perfect.",
    items: [
      { id: "adobe-w3-1", text: "Define MVP scope with manager (1 page)" },
      { id: "adobe-w3-2", text: "Build v0 prototype" },
      { id: "adobe-w3-3", text: "Set up evaluation harness (even 10 examples)" },
      { id: "adobe-w3-4", text: "Demo to manager + capture feedback" },
      { id: "adobe-w3-5", text: "Document architecture in Confluence/Notion" },
    ],
  },
  {
    id: "adobe-w4",
    week: "Week 4",
    title: "Midpoint feedback",
    description: "Critical inflection. Ask explicitly for PPO signal.",
    items: [
      { id: "adobe-w4-1", text: "Schedule explicit midpoint review with manager" },
      { id: "adobe-w4-2", text: "Ask: 'What would push my work from good to great?'" },
      { id: "adobe-w4-3", text: "Ask: 'Am I on PPO trajectory?' (yes, ask it)" },
      { id: "adobe-w4-4", text: "Iterate prototype based on feedback" },
      { id: "adobe-w4-5", text: "Present demo to 1 stakeholder outside your team" },
    ],
  },
  {
    id: "adobe-w5",
    week: "Week 5",
    title: "Deepen execution",
    description: "Move from prototype to production-considerations.",
    items: [
      { id: "adobe-w5-1", text: "Add proper evaluation: faithfulness, latency, cost" },
      { id: "adobe-w5-2", text: "Surface 2 'adjacent problems' you noticed" },
      { id: "adobe-w5-3", text: "Pair with an engineer for code review" },
      { id: "adobe-w5-4", text: "Lunch with cross-functional partner (design or research)" },
    ],
  },
  {
    id: "adobe-w6",
    week: "Week 6",
    title: "PPO signal assessment",
    description: "Read the tea leaves honestly. Adjust placement intensity accordingly.",
    items: [
      { id: "adobe-w6-1", text: "Self-assess PPO probability (gut + signals)" },
      { id: "adobe-w6-2", text: "Have a candid PPO conversation with manager" },
      { id: "adobe-w6-3", text: "Lock final deliverable scope" },
      { id: "adobe-w6-4", text: "Start drafting final presentation outline" },
    ],
  },
  {
    id: "adobe-w7",
    week: "Week 7",
    title: "Final push + documentation",
    description: "Leave something behind that Adobe references after you're gone.",
    items: [
      { id: "adobe-w7-1", text: "Polish final prototype" },
      { id: "adobe-w7-2", text: "Write handover doc (problem, approach, results, next steps)" },
      { id: "adobe-w7-3", text: "Record async demo video for distribution" },
      { id: "adobe-w7-4", text: "Collect 3 written testimonials / Slack quotes" },
    ],
  },
  {
    id: "adobe-w8",
    week: "Week 8",
    title: "Final presentation + farewell",
    description: "Land the plane. Be remembered.",
    items: [
      { id: "adobe-w8-1", text: "Final presentation to extended team" },
      { id: "adobe-w8-2", text: "1:1 thank-yous to manager + 5 key collaborators" },
      { id: "adobe-w8-3", text: "Update LinkedIn with Adobe role + 1-line outcome" },
      { id: "adobe-w8-4", text: "Update resume with quantified Adobe bullets" },
      { id: "adobe-w8-5", text: "Connect with 10 Adobe folks on LinkedIn with personal note" },
    ],
  },
];

// ───────────────── PM ROADMAP ─────────────────
export const pmSections: Module[] = [
  {
    id: "pm-sense",
    title: "Product Sense",
    why: "The most-tested PM interview skill. Frameworks reduce ambiguity under time pressure.",
    hours: 6,
    level: "intermediate",
    topics: [
      { id: "pm-sense-1", text: "Jobs To Be Done (JTBD)" },
      { id: "pm-sense-2", text: "User journey mapping" },
      { id: "pm-sense-3", text: "Pain/Gain map" },
      { id: "pm-sense-4", text: "Persona construction" },
      { id: "pm-sense-5", text: "Solution brainstorm → prioritize → MVP" },
    ],
    resources: [
      { title: "Decode and Conquer — Lewis Lin (sample chapters)", url: "https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417", type: "blog" },
      { title: "Exponent PM Mock Interviews", url: "https://www.tryexponent.com/", type: "video" },
    ],
  },
  {
    id: "pm-metrics",
    title: "Metrics & Analytics",
    why: "You name metrics well but don't yet decompose them. Fix this before placements.",
    hours: 5,
    level: "intermediate",
    topics: [
      { id: "pm-metrics-1", text: "AARRR funnel" },
      { id: "pm-metrics-2", text: "North Star Metric + counter-metrics" },
      { id: "pm-metrics-3", text: "Metric tree decomposition" },
      { id: "pm-metrics-4", text: "Leading vs lagging indicators" },
      { id: "pm-metrics-5", text: "Diagnosing metric drops (segmentation tree)" },
    ],
    resources: [
      { title: "Reforge — Metric trees", url: "https://www.reforge.com/", type: "blog" },
      { title: "Amplitude North Star playbook", url: "https://amplitude.com/north-star", type: "doc" },
    ],
  },
  {
    id: "pm-strategy",
    title: "Strategy",
    why: "You think in TAM/SOM naturally. Formalize Porter, BCG, market entry frameworks.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "pm-strat-1", text: "Porter's Five Forces" },
      { id: "pm-strat-2", text: "Market sizing (top-down + bottom-up)" },
      { id: "pm-strat-3", text: "Build vs buy vs partner" },
      { id: "pm-strat-4", text: "Competitive teardowns" },
    ],
    resources: [
      { title: "Stratechery", url: "https://stratechery.com/", type: "blog" },
    ],
  },
  {
    id: "pm-prio",
    title: "Prioritization",
    why: "Interviewers test frameworks, not opinions. Pick 2, master them.",
    hours: 2,
    level: "beginner",
    topics: [
      { id: "pm-prio-1", text: "RICE scoring" },
      { id: "pm-prio-2", text: "MoSCoW" },
      { id: "pm-prio-3", text: "Kano model" },
      { id: "pm-prio-4", text: "Cost of Delay / WSJF" },
    ],
    resources: [
      { title: "Intercom on Product Management", url: "https://www.intercom.com/resources/books/intercom-on-product-management", type: "blog" },
    ],
  },
  {
    id: "pm-research",
    title: "User Research",
    why: "Adobe will expect you to talk to users. Know the methods.",
    hours: 3,
    level: "beginner",
    topics: [
      { id: "pm-research-1", text: "Generative vs evaluative research" },
      { id: "pm-research-2", text: "User interview structure (5-whys, ladder)" },
      { id: "pm-research-3", text: "Usability testing basics" },
      { id: "pm-research-4", text: "Survey design pitfalls" },
    ],
    resources: [
      { title: "NN/g articles", url: "https://www.nngroup.com/articles/", type: "blog" },
    ],
  },
  {
    id: "pm-gtm",
    title: "Go-To-Market",
    why: "Wind Teacher work was strong but informal. Add structure.",
    hours: 3,
    level: "intermediate",
    topics: [
      { id: "pm-gtm-1", text: "Positioning (April Dunford framework)" },
      { id: "pm-gtm-2", text: "Launch tiers and channels" },
      { id: "pm-gtm-3", text: "Pricing & packaging fundamentals" },
      { id: "pm-gtm-4", text: "Activation metrics" },
    ],
    resources: [
      { title: "April Dunford — Obviously Awesome", url: "https://www.aprildunford.com/", type: "blog" },
    ],
  },
  {
    id: "pm-prd",
    title: "PRD Writing",
    why: "You've never written a real PRD. Write 2 before placements.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "pm-prd-1", text: "Problem statement + user + jobs" },
      { id: "pm-prd-2", text: "Goals, non-goals, success metrics" },
      { id: "pm-prd-3", text: "User stories and acceptance criteria" },
      { id: "pm-prd-4", text: "Edge cases and open questions" },
      { id: "pm-prd-5", text: "Rollout plan and rollback" },
    ],
    resources: [
      { title: "Lenny — PRD templates", url: "https://www.lennysnewsletter.com/p/the-ultimate-list-of-product-templates", type: "blog" },
    ],
    projects: [
      "Write a PRD for an Adobe Express AI agent feature",
      "Write a PRD for a Razorpay merchant insights chatbot",
    ],
  },
  {
    id: "pm-aipm",
    title: "AI Product Management",
    why: "Your specific bet. This category is being defined right now.",
    hours: 5,
    level: "intermediate",
    topics: [
      { id: "pm-aipm-1", text: "Eval-driven development" },
      { id: "pm-aipm-2", text: "Hallucination mitigation strategies" },
      { id: "pm-aipm-3", text: "Trust signals in agent UI" },
      { id: "pm-aipm-4", text: "Model selection: open vs closed, size, cost" },
      { id: "pm-aipm-5", text: "Safety, bias, content policy" },
    ],
    resources: [
      { title: "Latent Space podcast", url: "https://www.latent.space/", type: "blog" },
      { title: "Hamel Husain — Your AI Product Needs Evals", url: "https://hamel.dev/blog/posts/evals/", type: "blog" },
    ],
  },
  {
    id: "pm-interview",
    title: "PM Interview Prep",
    why: "Mocks > reading. Aim for 8 mocks before campus season.",
    hours: 12,
    level: "intermediate",
    topics: [
      { id: "pm-int-1", text: "CIRCLES framework (design questions)" },
      { id: "pm-int-2", text: "Estimation / guesstimate practice" },
      { id: "pm-int-3", text: "Strategy case practice" },
      { id: "pm-int-4", text: "Root cause analysis questions" },
      { id: "pm-int-5", text: "Behavioral STAR stories (8 prepared)" },
      { id: "pm-int-6", text: "Mock 1 (peer)" },
      { id: "pm-int-7", text: "Mock 2 (senior)" },
      { id: "pm-int-8", text: "Mock 3 (recorded, self-reviewed)" },
    ],
    resources: [
      { title: "Exponent", url: "https://www.tryexponent.com/", type: "video" },
      { title: "Decode and Conquer", url: "https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417", type: "blog" },
    ],
  },
];

// ───────────────── ANALYTICS BACKUP ─────────────────
export const analyticsTracks: Module[] = [
  {
    id: "an-sql",
    title: "SQL for Product Analytics",
    why: "The biggest gap between you and product analyst roles. Daily practice for 30 days closes it.",
    hours: 20,
    level: "intermediate",
    topics: [
      { id: "an-sql-1", text: "SELECT, WHERE, GROUP BY, HAVING" },
      { id: "an-sql-2", text: "JOINs: INNER, LEFT, FULL, SELF" },
      { id: "an-sql-3", text: "Window functions: ROW_NUMBER, RANK, LAG, LEAD" },
      { id: "an-sql-4", text: "CTEs and recursive queries" },
      { id: "an-sql-5", text: "Cohort retention queries" },
      { id: "an-sql-6", text: "Funnel queries with timestamps" },
      { id: "an-sql-7", text: "30 StrataScratch easy problems" },
      { id: "an-sql-8", text: "20 StrataScratch medium problems" },
      { id: "an-sql-9", text: "10 StrataScratch hard problems" },
    ],
    resources: [
      { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial", type: "doc" },
      { title: "StrataScratch", url: "https://www.stratascratch.com/", type: "doc" },
      { title: "LeetCode SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/", type: "doc" },
    ],
  },
  {
    id: "an-python",
    title: "Python for Analytics",
    why: "Pandas + Jupyter is table stakes. Don't go deep, go fluent.",
    hours: 8,
    level: "beginner",
    topics: [
      { id: "an-py-1", text: "Pandas: read, filter, groupby, merge" },
      { id: "an-py-2", text: "Pivot tables and reshape" },
      { id: "an-py-3", text: "Matplotlib / seaborn basics" },
      { id: "an-py-4", text: "Datetime handling" },
      { id: "an-py-5", text: "Jupyter notebook hygiene" },
    ],
    resources: [
      { title: "Pandas official docs", url: "https://pandas.pydata.org/docs/", type: "doc" },
    ],
  },
  {
    id: "an-prod",
    title: "Product Analytics Concepts",
    why: "Adobe interviewers ask analytics questions even for PM roles.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "an-prod-1", text: "DAU/WAU/MAU and stickiness" },
      { id: "an-prod-2", text: "Retention curves and L-curves" },
      { id: "an-prod-3", text: "Cohort analysis" },
      { id: "an-prod-4", text: "Funnel analysis and drop-off diagnosis" },
      { id: "an-prod-5", text: "Segmentation and personalization" },
    ],
    resources: [
      { title: "Amplitude product analytics playbooks", url: "https://amplitude.com/blog", type: "blog" },
    ],
  },
  {
    id: "an-ab",
    title: "A/B Testing",
    why: "You did A/B testing at OverLeveraged — now formalize the statistics.",
    hours: 4,
    level: "intermediate",
    topics: [
      { id: "an-ab-1", text: "Hypothesis formulation" },
      { id: "an-ab-2", text: "Sample size and power calculations" },
      { id: "an-ab-3", text: "p-values, confidence intervals, MDE" },
      { id: "an-ab-4", text: "Novelty / primacy effects" },
      { id: "an-ab-5", text: "When NOT to A/B test" },
    ],
    resources: [
      { title: "Ron Kohavi — Trustworthy Online Experiments", url: "https://experimentguide.com/", type: "blog" },
    ],
  },
];

// ───────────────── PLACEMENTS ─────────────────
export interface CompanyPrep {
  id: string;
  name: string;
  role: string;
  notes: string;
  items: ChecklistItem[];
}

export const companies: CompanyPrep[] = [
  {
    id: "co-adobe",
    name: "Adobe",
    role: "PM / AI PM (PPO target)",
    notes: "Internship is your real interview. Win it via execution + relationships.",
    items: [
      { id: "co-adobe-1", text: "Map Adobe's product portfolio and AI bets" },
      { id: "co-adobe-2", text: "Read latest Firefly + Acrobat AI announcements" },
      { id: "co-adobe-3", text: "Prepare PPO conversation talking points" },
      { id: "co-adobe-4", text: "Get 2 referrals from current Adobe employees" },
    ],
  },
  {
    id: "co-atlassian",
    name: "Atlassian",
    role: "APM / PM",
    notes: "Strong PM culture, written communication heavy. Practice PRDs.",
    items: [
      { id: "co-atlassian-1", text: "Study Jira / Confluence / Loom positioning" },
      { id: "co-atlassian-2", text: "Practice 'team playbook' style answers" },
      { id: "co-atlassian-3", text: "Write a Jira improvement PRD" },
    ],
  },
  {
    id: "co-google",
    name: "Google",
    role: "APM",
    notes: "Hardest funnel. Estimation + product sense + data + leadership.",
    items: [
      { id: "co-google-1", text: "20 estimation problems" },
      { id: "co-google-2", text: "10 design questions using CIRCLES" },
      { id: "co-google-3", text: "Prepare APM-style leadership stories" },
    ],
  },
  {
    id: "co-microsoft",
    name: "Microsoft",
    role: "PM",
    notes: "Less brutal than Google, expects strong technical fluency.",
    items: [
      { id: "co-msft-1", text: "Study Copilot product family" },
      { id: "co-msft-2", text: "Behavioral STAR prep (5 stories)" },
    ],
  },
  {
    id: "co-flipkart",
    name: "Flipkart",
    role: "APM / Strategy",
    notes: "Indian e-comm depth, marketplace mechanics.",
    items: [
      { id: "co-fk-1", text: "Study Flipkart vs Amazon vs Meesho positioning" },
      { id: "co-fk-2", text: "Marketplace metrics: GMV, take rate, BB share" },
    ],
  },
  {
    id: "co-swiggy",
    name: "Swiggy",
    role: "APM / Product Analytics",
    notes: "Loves data-heavy candidates. SQL screen likely.",
    items: [
      { id: "co-swiggy-1", text: "20 SQL problems on order/funnel data" },
      { id: "co-swiggy-2", text: "Think about supply-demand matching" },
    ],
  },
  {
    id: "co-razorpay",
    name: "Razorpay",
    role: "PM / Product Analytics",
    notes: "Fintech depth. Strong on metrics and KYC/payments funnels.",
    items: [
      { id: "co-rz-1", text: "Study Razorpay product suite (Payments, RazorpayX, Capital)" },
      { id: "co-rz-2", text: "Map KYC → activation funnel" },
      { id: "co-rz-3", text: "Connect OverLeveraged narrative to Razorpay context" },
    ],
  },
];

export const placementBehavioral: ChecklistItem[] = [
  { id: "beh-1", text: "Story: Time you led a team through ambiguity (Inter-IIT)" },
  { id: "beh-2", text: "Story: Time you used data to change a decision (OverLeveraged)" },
  { id: "beh-3", text: "Story: Time you disagreed with a stakeholder" },
  { id: "beh-4", text: "Story: Biggest failure + what you learned" },
  { id: "beh-5", text: "Story: Time you shipped fast under pressure (PDC)" },
  { id: "beh-6", text: "Story: Time you influenced without authority" },
  { id: "beh-7", text: "Story: Time you simplified a complex problem (BCG)" },
  { id: "beh-8", text: "Story: Why product? Why now? (signature narrative)" },
];

export const resumeChecklist: ChecklistItem[] = [
  { id: "res-1", text: "Add Adobe role + quantified bullets" },
  { id: "res-2", text: "Refresh OverLeveraged metrics" },
  { id: "res-3", text: "Tighten Inter-IIT bullets to 1-line each" },
  { id: "res-4", text: "Add AI PM keywords (agents, RAG, evals)" },
  { id: "res-5", text: "Update LinkedIn headline to AI PM positioning" },
  { id: "res-6", text: "Two-version resume: PM-heavy vs Analytics-heavy" },
];

// ───────────────── DAILY HABITS ─────────────────
export const dailyHabits: ChecklistItem[] = [
  { id: "h-1", text: "6:30 AM wake, no phone 20 min" },
  { id: "h-2", text: "30 min read (PM / AI article)" },
  { id: "h-3", text: "Internship deep work block" },
  { id: "h-4", text: "30 min decompress walk after work" },
  { id: "h-5", text: "Evening learning block (AI or PM)" },
  { id: "h-6", text: "1-line journal: what did I ship today?" },
  { id: "h-7", text: "Lights out by 10:30 PM" },
];

export const weeklyHabits: ChecklistItem[] = [
  { id: "wh-1", text: "Friday: 5-line manager update sent" },
  { id: "wh-2", text: "Saturday AM: 2hr PM case practice" },
  { id: "wh-3", text: "Sunday AM: weekly review + next-week plan" },
  { id: "wh-4", text: "Sunday: LinkedIn post or comment activity" },
  { id: "wh-5", text: "1 SQL problem set (5+ questions)" },
  { id: "wh-6", text: "1 AI demo / mini-build shipped" },
];

// ───────────────── RESOURCE LIBRARY ─────────────────
export interface LibraryItem {
  id: string;
  title: string;
  url: string;
  category: "AI" | "PM" | "Analytics" | "Productivity" | "Interview";
  type: "Video" | "Course" | "Blog" | "GitHub" | "Doc" | "Paper";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  why: string;
}

export const library: LibraryItem[] = [
  { id: "lib-1", title: "Karpathy — Intro to LLMs", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", category: "AI", type: "Video", difficulty: "Beginner", time: "1h", why: "Single best conceptual overview of LLMs." },
  { id: "lib-2", title: "Lilian Weng — LLM Agents", url: "https://lilianweng.github.io/posts/2023-06-23-agent/", category: "AI", type: "Blog", difficulty: "Intermediate", time: "45m", why: "Foundational essay on agent architectures." },
  { id: "lib-3", title: "DeepLearning.AI — Multi-Agent CrewAI", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", category: "AI", type: "Course", difficulty: "Intermediate", time: "2h", why: "Hands-on MAS in <2 hrs." },
  { id: "lib-4", title: "LangChain Academy — LangGraph", url: "https://academy.langchain.com/courses/intro-to-langgraph", category: "AI", type: "Course", difficulty: "Intermediate", time: "3h", why: "Stateful agent graphs done right." },
  { id: "lib-5", title: "HuggingFace Agents Course", url: "https://huggingface.co/learn/agents-course", category: "AI", type: "Course", difficulty: "Beginner", time: "8h", why: "Free, end-to-end, with certificate." },
  { id: "lib-6", title: "MCP Spec", url: "https://modelcontextprotocol.io/introduction", category: "AI", type: "Doc", difficulty: "Intermediate", time: "30m", why: "USB-C for AI. Read it once." },
  { id: "lib-7", title: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com/", category: "PM", type: "Blog", difficulty: "Beginner", time: "Weekly", why: "Best PM newsletter in the world." },
  { id: "lib-8", title: "Latent Space", url: "https://www.latent.space/", category: "AI", type: "Blog", difficulty: "Intermediate", time: "Weekly", why: "Technical AI PM lens." },
  { id: "lib-9", title: "Stratechery", url: "https://stratechery.com/", category: "PM", type: "Blog", difficulty: "Advanced", time: "Weekly", why: "Strategy depth, frees once a week." },
  { id: "lib-10", title: "Exponent PM Mocks", url: "https://www.tryexponent.com/", category: "Interview", type: "Video", difficulty: "Intermediate", time: "Varies", why: "Best PM mock interview library." },
  { id: "lib-11", title: "Decode and Conquer", url: "https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417", category: "Interview", type: "Blog", difficulty: "Intermediate", time: "10h", why: "Classic PM interview prep book." },
  { id: "lib-12", title: "StrataScratch", url: "https://www.stratascratch.com/", category: "Analytics", type: "Doc", difficulty: "Intermediate", time: "Daily", why: "Real SQL interview problems." },
  { id: "lib-13", title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial", category: "Analytics", type: "Doc", difficulty: "Beginner", time: "8h", why: "Best free SQL learning path." },
  { id: "lib-14", title: "LeetCode SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/", category: "Analytics", type: "Doc", difficulty: "Beginner", time: "20h", why: "Curated SQL starter set." },
  { id: "lib-15", title: "Amplitude North Star Playbook", url: "https://amplitude.com/north-star", category: "PM", type: "Doc", difficulty: "Intermediate", time: "1h", why: "Definitive North Star Metric framework." },
  { id: "lib-16", title: "Hamel — Your AI Product Needs Evals", url: "https://hamel.dev/blog/posts/evals/", category: "AI", type: "Blog", difficulty: "Intermediate", time: "30m", why: "Required reading for AI PMs." },
  { id: "lib-17", title: "April Dunford — Positioning", url: "https://www.aprildunford.com/", category: "PM", type: "Blog", difficulty: "Intermediate", time: "2h", why: "How to position a product." },
  { id: "lib-18", title: "Reforge Blog", url: "https://www.reforge.com/blog", category: "PM", type: "Blog", difficulty: "Intermediate", time: "Weekly", why: "Metric trees + growth thinking." },
  { id: "lib-19", title: "OpenAI Cookbook", url: "https://github.com/openai/openai-cookbook", category: "AI", type: "GitHub", difficulty: "Beginner", time: "Varies", why: "Copy-paste recipes for everything." },
  { id: "lib-20", title: "CrewAI Examples", url: "https://github.com/crewAIInc/crewAI", category: "AI", type: "GitHub", difficulty: "Beginner", time: "Varies", why: "Read example folder before coding." },
];

// ───────────────── PHASES ─────────────────
export const phases = [
  { id: "p1", name: "Phase 1: AI Foundations", weeks: "Week 1–2", goal: "Speak fluent agentic AI before Day 1 at Adobe" },
  { id: "p2", name: "Phase 2: Internship Execution", weeks: "Week 3–6", goal: "Win the PPO via execution, communication, relationships" },
  { id: "p3", name: "Phase 3: Placement + Positioning", weeks: "Week 7–8", goal: "Lock PPO, refresh narrative, ready for campus season" },
] as const;

// helper: collect all checklist ids in a module list (for progress)
export function collectIds(modules: { topics: ChecklistItem[] }[]): string[] {
  return modules.flatMap((m) => m.topics.map((t) => t.id));
}
export function collectMilestoneIds(ms: Milestone[]): string[] {
  return ms.flatMap((m) => m.items.map((i) => i.id));
}
