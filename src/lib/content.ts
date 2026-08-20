// Placement Prep OS — content model
// Video-first: Videos → Concept → Practice → Project → Interview Question
// All IDs are stable and used as keys for checklist/note/progress persistence.
// Do not rename existing ids without also migrating localStorage keys.

export interface Resource {
  title: string;
  url: string;
  type: "video" | "playlist" | "channel" | "course" | "blog" | "repo" | "doc" | "paper";
}

export interface ChecklistItem {
  id: string;
  text: string;
  hint?: string;
}

export type Priority = "must" | "important" | "optional";
export type Category = "product" | "analytics" | "tech" | "business" | "domain";

export interface Module {
  id: string;
  title: string;
  category: Category;
  why: string;
  hours: number;
  level: "beginner" | "intermediate" | "advanced";
  priority: Priority;
  prerequisites?: string[]; // module ids
  topics: ChecklistItem[]; // concept checklist
  resources: Resource[]; // video-first, ordered
  practice?: ChecklistItem[]; // hands-on exercises
  projects?: string[];
  interviewQuestions?: string[];
}

export const categoryMeta: Record<Category, { label: string; short: string }> = {
  product: { label: "Product Management", short: "Product" },
  analytics: { label: "Data & Product Analytics", short: "Analytics" },
  tech: { label: "Tech, Systems & GenAI", short: "Tech" },
  business: { label: "Business, Growth & Marketing", short: "Business" },
  domain: { label: "Domain Knowledge", short: "Domain" },
};

export const priorityMeta: Record<Priority, { label: string; cls: string }> = {
  must: {
    label: "Must Know",
    cls: "bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]",
  },
  important: { label: "Important", cls: "bg-[color:var(--info)]/15 text-[color:var(--info)]" },
  optional: { label: "Optional", cls: "bg-muted text-muted-foreground" },
};

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
    description: "Arrive prepared with context, tools, and a clear introduction.",
    items: [
      { id: "adobe-w0-1", text: "Complete the required AI agent fundamentals" },
      { id: "adobe-w0-2", text: "Review Adobe's recent AI product announcements" },
      { id: "adobe-w0-3", text: "Set up the development environment" },
      { id: "adobe-w0-4", text: "Prepare a 30-second self-introduction" },
    ],
  },
  {
    id: "adobe-w1",
    week: "Week 1",
    title: "Understand project scope",
    description: "Listen, map the problem, and clarify what success means.",
    items: [
      { id: "adobe-w1-1", text: "Ask the manager what success looks like in 8 weeks" },
      { id: "adobe-w1-2", text: "Document the project in a one-page summary" },
      { id: "adobe-w1-3", text: "Identify the end user and their current pain" },
      { id: "adobe-w1-4", text: "Send the first Friday update" },
    ],
  },
  {
    id: "adobe-w2",
    week: "Week 2",
    title: "Learn Adobe's context",
    description: "Translate general agent knowledge to the team's stack and constraints.",
    items: [
      { id: "adobe-w2-1", text: "Read project documentation and past PRDs" },
      { id: "adobe-w2-2", text: "Reproduce one existing internal demo" },
      { id: "adobe-w2-3", text: "Identify the team's agent framework" },
      { id: "adobe-w2-4", text: "Propose an initial direction" },
    ],
  },
  {
    id: "adobe-w3",
    week: "Week 3",
    title: "Build the first prototype",
    description: "Ship something rough but real and easy to demo.",
    items: [
      { id: "adobe-w3-1", text: "Define MVP scope with the manager" },
      { id: "adobe-w3-2", text: "Build the first prototype" },
      { id: "adobe-w3-3", text: "Set up a small evaluation harness" },
      { id: "adobe-w3-4", text: "Demo the prototype and capture feedback" },
    ],
  },
  {
    id: "adobe-w4",
    week: "Week 4",
    title: "Midpoint feedback",
    description: "Use the midpoint to turn feedback into a sharper delivery plan.",
    items: [
      { id: "adobe-w4-1", text: "Schedule a midpoint review" },
      { id: "adobe-w4-2", text: "Ask what would make the work excellent" },
      { id: "adobe-w4-3", text: "Iterate the prototype based on feedback" },
      { id: "adobe-w4-4", text: "Present to a stakeholder outside the team" },
    ],
  },
  {
    id: "adobe-w5",
    week: "Week 5",
    title: "Deepen execution",
    description: "Move from prototype toward production-quality thinking.",
    items: [
      { id: "adobe-w5-1", text: "Add evaluation for quality, latency, and cost" },
      { id: "adobe-w5-2", text: "Surface two adjacent problems" },
      { id: "adobe-w5-3", text: "Pair with an engineer for code review" },
      { id: "adobe-w5-4", text: "Meet a cross-functional partner" },
    ],
  },
  {
    id: "adobe-w6",
    week: "Week 6",
    title: "Assess progress",
    description: "Read the signals honestly and lock the final delivery scope.",
    items: [
      { id: "adobe-w6-1", text: "Self-assess progress and placement signals" },
      { id: "adobe-w6-2", text: "Have a candid progress conversation" },
      { id: "adobe-w6-3", text: "Lock the final deliverable scope" },
      { id: "adobe-w6-4", text: "Draft the final presentation outline" },
    ],
  },
  {
    id: "adobe-w7",
    week: "Week 7",
    title: "Final push and documentation",
    description: "Leave behind a polished result and a clear handover.",
    items: [
      { id: "adobe-w7-1", text: "Polish the final prototype" },
      { id: "adobe-w7-2", text: "Write the handover document" },
      { id: "adobe-w7-3", text: "Record an async demo video" },
      { id: "adobe-w7-4", text: "Collect written feedback from collaborators" },
    ],
  },
];

export function collectMilestoneIds(ms: Milestone[]): string[] {
  return ms.flatMap((milestone) => milestone.items.map((item) => item.id));
}
// ───────────────────────────── PRODUCT ─────────────────────────────
export const productModules: Module[] = [
  {
    id: "pr-fundamentals",
    title: "PM Fundamentals: PMLC & Design Thinking",
    category: "product",
    why: "Every framework you'll ever use sits on top of the Product Management Life Cycle and a first-principles, design-thinking mindset. Start here.",
    hours: 4,
    level: "beginner",
    priority: "must",
    topics: [
      { id: "pr-fund-1", text: "Product Management Lifecycle (PMLC) end to end" },
      { id: "pr-fund-2", text: "Product Development Lifecycle vs PMLC" },
      { id: "pr-fund-3", text: "Design thinking: empathize, define, ideate, prototype, test" },
      { id: "pr-fund-4", text: "First-principles thinking vs analogy thinking" },
      { id: "pr-fund-5", text: "Structured thinking under ambiguity (MECE)" },
      { id: "pr-fund-6", text: "What a PM actually does day-to-day (vs PO, PgM, BA)" },
    ],
    resources: [
      {
        title: "Product School — What Does a Product Manager Do?",
        url: "https://www.youtube.com/@ProductSchool",
        type: "channel",
      },
      {
        title: "CareerFoundry — Product Management for Beginners",
        url: "https://www.youtube.com/@CareerFoundry",
        type: "channel",
      },
      {
        title: "IDEO U — Design Thinking basics",
        url: "https://www.ideou.com/pages/design-thinking",
        type: "doc",
      },
      {
        title: "Lenny's Newsletter — PM 101 archive",
        url: "https://www.lennysnewsletter.com/",
        type: "blog",
      },
    ],
    practice: [
      { id: "pr-fund-p1", text: "Map the PMLC for an app you use daily (1-pager)" },
      { id: "pr-fund-p2", text: "Run a 15-min first-principles teardown of any pricing decision" },
    ],
    interviewQuestions: [
      "Walk me through what a PM does in a typical week.",
      "How is a PM different from a Product Owner or Project Manager?",
      "Tell me about a time you used first-principles thinking to solve a problem.",
    ],
  },
  {
    id: "pr-sense",
    title: "Product Sense, User Empathy & JTBD",
    category: "product",
    why: "The single most-tested PM interview skill. Frameworks reduce ambiguity under time pressure and signal you can think like a user.",
    hours: 5,
    level: "beginner",
    priority: "must",
    prerequisites: ["pr-fundamentals"],
    topics: [
      { id: "pr-sense-1", text: "Jobs To Be Done (JTBD)" },
      { id: "pr-sense-2", text: "User empathy & pain/gain mapping" },
      { id: "pr-sense-3", text: "Persona construction from research" },
      { id: "pr-sense-4", text: "User journey mapping" },
      { id: "pr-sense-5", text: "Customer needs: stated vs latent" },
      { id: "pr-sense-6", text: "Solution brainstorm → prioritize → MVP scope" },
    ],
    resources: [
      {
        title: "Exponent — Product Sense Framework (CIRCLES)",
        url: "https://www.youtube.com/@tryexponent",
        type: "channel",
      },
      {
        title: "Product School — Product Sense Masterclass",
        url: "https://www.youtube.com/@ProductSchool",
        type: "channel",
      },
      {
        title: "Intercom on Jobs To Be Done",
        url: "https://www.intercom.com/resources/books/intercom-on-jobs-to-be-done",
        type: "blog",
      },
      {
        title: "NN/g — User Journey Mapping 101",
        url: "https://www.nngroup.com/articles/journey-mapping-101/",
        type: "blog",
      },
    ],
    practice: [
      { id: "pr-sense-p1", text: "Build a persona + journey map for a product of your choice" },
      { id: "pr-sense-p2", text: "Answer 5 'design a product for X' prompts using CIRCLES" },
    ],
    projects: ["Redesign one flow of an app you use, backed by a JTBD statement and journey map"],
    interviewQuestions: [
      "Design a product for visually impaired commuters.",
      "How would you improve [common app]?",
      "What's a product with great/terrible user empathy? Why?",
    ],
  },
  {
    id: "pr-research",
    title: "Market & User Research, Competitive Analysis",
    category: "product",
    why: "PMs are expected to ground opinions in evidence — market sizing, competitor teardowns, and structured user research.",
    hours: 5,
    level: "intermediate",
    priority: "must",
    prerequisites: ["pr-sense"],
    topics: [
      { id: "pr-res-1", text: "Generative vs evaluative research" },
      { id: "pr-res-2", text: "User interview structure (5-whys, laddering)" },
      { id: "pr-res-3", text: "Usability testing basics & survey design pitfalls" },
      { id: "pr-res-4", text: "Competitive analysis & feature teardown" },
      { id: "pr-res-5", text: "Market trends scanning" },
      { id: "pr-res-6", text: "Market sizing: TAM / SAM / SOM (top-down + bottom-up)" },
    ],
    resources: [
      {
        title: "NN/g — User Research Methods",
        url: "https://www.nngroup.com/articles/which-ux-research-methods/",
        type: "blog",
      },
      {
        title: "Exponent — Market Sizing / Guesstimate Framework",
        url: "https://www.youtube.com/@tryexponent",
        type: "channel",
      },
      {
        title: "Y Combinator — How to Talk to Users",
        url: "https://www.youtube.com/@ycombinator",
        type: "channel",
      },
      {
        title: "Stratechery — competitive strategy essays",
        url: "https://stratechery.com/",
        type: "blog",
      },
    ],
    practice: [
      { id: "pr-res-p1", text: "TAM/SAM/SOM for 3 different product ideas" },
      { id: "pr-res-p2", text: "Full competitive teardown of 2 rival products in one category" },
      { id: "pr-res-p3", text: "10 timed guesstimate drills (7 min each)" },
    ],
    interviewQuestions: [
      "Estimate the market size for electric scooters in your city.",
      "How many piano tuners are there in Mumbai?",
      "Pick two competitors and tell me who's winning and why.",
    ],
  },
  {
    id: "pr-strategy",
    title: "Product Strategy, Roadmaps & Prioritization",
    category: "product",
    why: "Interviewers test frameworks, not opinions. RICE, MoSCoW, Kano, and roadmap sequencing show you can turn insight into a plan.",
    hours: 5,
    level: "intermediate",
    priority: "must",
    prerequisites: ["pr-research"],
    topics: [
      { id: "pr-strat-1", text: "Product strategy vs vision vs roadmap" },
      { id: "pr-strat-2", text: "RICE scoring" },
      { id: "pr-strat-3", text: "MoSCoW & Kano model" },
      { id: "pr-strat-4", text: "Cost of Delay / WSJF" },
      { id: "pr-strat-5", text: "MVP scoping & sequencing a roadmap" },
      { id: "pr-strat-6", text: "Porter's Five Forces & build vs buy vs partner" },
    ],
    resources: [
      {
        title: "Product School — Prioritization Frameworks Explained",
        url: "https://www.youtube.com/@ProductSchool",
        type: "channel",
      },
      {
        title: "Intercom on Product Management",
        url: "https://www.intercom.com/resources/books/intercom-on-product-management",
        type: "blog",
      },
      {
        title: "Reforge Blog — roadmapping & strategy",
        url: "https://www.reforge.com/blog",
        type: "blog",
      },
    ],
    practice: [
      { id: "pr-strat-p1", text: "RICE-score a backlog of 10 fictional features" },
      { id: "pr-strat-p2", text: "Build a 2-quarter roadmap for a product of your choice" },
    ],
    projects: [
      "Write a one-page product strategy doc: vision → bets → roadmap for the next 2 quarters",
    ],
    interviewQuestions: [
      "How do you prioritize when every stakeholder says their feature is P0?",
      "Walk me through RICE vs Kano — when would you use each?",
      "Your roadmap slipped by a month. What do you do?",
    ],
  },
  {
    id: "pr-docs",
    title: "PRD, BRD, FRD Writing",
    category: "product",
    why: "You will be judged on whether you can turn ambiguity into a document an engineer or exec can execute against. Write real ones, not templates in your head.",
    hours: 4,
    level: "intermediate",
    priority: "must",
    prerequisites: ["pr-strategy"],
    topics: [
      { id: "pr-doc-1", text: "PRD: problem, user, goals, non-goals, success metrics" },
      { id: "pr-doc-2", text: "BRD: business case, ROI, stakeholders" },
      { id: "pr-doc-3", text: "FRD: functional specs, edge cases, acceptance criteria" },
      { id: "pr-doc-4", text: "User stories & acceptance criteria (Given/When/Then)" },
      { id: "pr-doc-5", text: "Rollout plan, rollback, and open questions" },
    ],
    resources: [
      {
        title: "Lenny — The Ultimate List of Product Templates",
        url: "https://www.lennysnewsletter.com/p/the-ultimate-list-of-product-templates",
        type: "blog",
      },
      {
        title: "Product School — How to Write a PRD",
        url: "https://www.youtube.com/@ProductSchool",
        type: "channel",
      },
      {
        title: "Atlassian — Product Requirements template",
        url: "https://www.atlassian.com/software/confluence/templates/product-requirements",
        type: "doc",
      },
    ],
    practice: [
      { id: "pr-doc-p1", text: "Write one full PRD for a feature you'd add to a real app" },
      { id: "pr-doc-p2", text: "Write a one-page BRD for the same feature, business-case framed" },
    ],
    projects: [
      "Write and publicly share (LinkedIn/GitHub) 2 complete PRDs for products in your target domains",
    ],
    interviewQuestions: [
      "Walk me through a PRD you've written.",
      "What's the difference between a PRD, BRD, and FRD, and when do you need each?",
      "How do you handle a PRD when engineering pushes back on scope?",
    ],
  },
  {
    id: "pr-ux",
    title: "UX/UI, Wireframing & Figma",
    category: "product",
    why: "You don't need to be a designer, but you need to speak design fluently — wireframe your own ideas and critique flows intelligently.",
    hours: 5,
    level: "beginner",
    priority: "important",
    prerequisites: ["pr-sense"],
    topics: [
      { id: "pr-ux-1", text: "UX vs UI vs IA (information architecture)" },
      { id: "pr-ux-2", text: "User flows & low-fidelity wireframing" },
      { id: "pr-ux-3", text: "Figma basics: frames, components, prototyping" },
      { id: "pr-ux-4", text: "Usability heuristics (Nielsen's 10)" },
      { id: "pr-ux-5", text: "Accessibility basics (WCAG essentials)" },
    ],
    resources: [
      {
        title: "Figma — Figma for Beginners (official)",
        url: "https://www.youtube.com/@figma",
        type: "channel",
      },
      {
        title: "AJ&Smart — UX design playlists",
        url: "https://www.youtube.com/@ajsmart",
        type: "channel",
      },
      {
        title: "NN/g — 10 Usability Heuristics",
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
        type: "blog",
      },
    ],
    practice: [
      { id: "pr-ux-p1", text: "Wireframe 3 screens of a new feature in Figma" },
      { id: "pr-ux-p2", text: "Run a 10-heuristic audit on an app you use" },
    ],
    projects: ["Clickable Figma prototype for the feature you wrote a PRD for"],
    interviewQuestions: [
      "Critique the onboarding flow of any app of your choice.",
      "How do you work with designers when you disagree on UX?",
    ],
  },
  {
    id: "pr-agile",
    title: "Agile, Scrum & Jira",
    category: "product",
    why: "You'll run or sit inside sprints from day one. Know the ceremonies and the tooling cold.",
    hours: 3,
    level: "beginner",
    priority: "important",
    topics: [
      { id: "pr-agile-1", text: "Agile principles vs Waterfall" },
      { id: "pr-agile-2", text: "Scrum ceremonies: planning, standup, review, retro" },
      { id: "pr-agile-3", text: "Backlog grooming & story pointing" },
      { id: "pr-agile-4", text: "Jira: epics, stories, sprints, boards" },
      { id: "pr-agile-5", text: "Kanban vs Scrum" },
    ],
    resources: [
      {
        title: "Atlassian — Agile Coach (official video series)",
        url: "https://www.youtube.com/@Atlassian",
        type: "channel",
      },
      { title: "Atlassian Agile Coach docs", url: "https://www.atlassian.com/agile", type: "doc" },
      {
        title: "freeCodeCamp — Jira Tutorial",
        url: "https://www.youtube.com/@freecodecamp",
        type: "channel",
      },
    ],
    practice: [
      { id: "pr-agile-p1", text: "Set up a free Jira board and run one mock sprint end-to-end" },
      { id: "pr-agile-p2", text: "Write 10 user stories with story points" },
    ],
    interviewQuestions: [
      "How do you handle a sprint that's clearly going to miss its goal?",
      "Scrum vs Kanban — when would you pick one over the other?",
    ],
  },
  {
    id: "pr-gtm",
    title: "GTM, Pricing, Launch & Feedback Loops",
    category: "product",
    why: "Shipping isn't done at code-complete. Positioning, launch tiers, pricing, and structured feedback analysis close the loop.",
    hours: 4,
    level: "intermediate",
    priority: "important",
    prerequisites: ["pr-strategy"],
    topics: [
      { id: "pr-gtm-1", text: "Positioning (April Dunford framework)" },
      { id: "pr-gtm-2", text: "Launch tiers and channels" },
      { id: "pr-gtm-3", text: "Pricing & packaging fundamentals" },
      { id: "pr-gtm-4", text: "Activation & feedback-loop metrics" },
      { id: "pr-gtm-5", text: "Post-launch feedback analysis (support tickets, NPS, reviews)" },
    ],
    resources: [
      {
        title: "April Dunford — Obviously Awesome (positioning)",
        url: "https://www.aprildunford.com/",
        type: "blog",
      },
      {
        title: "Y Combinator — How to Launch",
        url: "https://www.youtube.com/@ycombinator",
        type: "channel",
      },
      {
        title: "Lenny — pricing & GTM archive",
        url: "https://www.lennysnewsletter.com/",
        type: "blog",
      },
    ],
    practice: [
      {
        id: "pr-gtm-p1",
        text: "Write a positioning statement + 3 pricing tiers for a product idea",
      },
      { id: "pr-gtm-p2", text: "Draft a launch plan (tiered channels, timeline, success metrics)" },
    ],
    interviewQuestions: [
      "How would you price a new B2B SaaS feature?",
      "Walk me through how you'd launch a product to 3 different user segments.",
    ],
  },
];

// ───────────────────────────── ANALYTICS ─────────────────────────────
export const analyticsModules: Module[] = [
  {
    id: "an-sql-foundations",
    title: "SQL Foundations",
    category: "analytics",
    why: "The single biggest technical gap between a generalist PM and a hire-ready PM/Analytics candidate. Daily practice compounds fast.",
    hours: 10,
    level: "beginner",
    priority: "must",
    topics: [
      { id: "an-sql-1", text: "SELECT, WHERE, ORDER BY, LIMIT" },
      { id: "an-sql-2", text: "GROUP BY, HAVING, aggregate functions" },
      { id: "an-sql-3", text: "JOINs: INNER, LEFT, FULL, SELF" },
      { id: "an-sql-4", text: "Subqueries vs CTEs" },
      { id: "an-sql-5", text: "CASE WHEN logic for segmentation" },
    ],
    resources: [
      {
        title: "Alex The Analyst — SQL for Beginners (full playlist)",
        url: "https://www.youtube.com/@AlexTheAnalyst",
        type: "channel",
      },
      {
        title: "freeCodeCamp — SQL full course",
        url: "https://www.youtube.com/@freecodecamp",
        type: "channel",
      },
      { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial", type: "doc" },
    ],
    practice: [
      { id: "an-sql-p1", text: "LeetCode SQL 50 — first 20 problems" },
      { id: "an-sql-p2", text: "10 StrataScratch easy problems" },
    ],
    interviewQuestions: [
      "Write a query to find the second-highest salary per department.",
      "Explain the difference between WHERE and HAVING.",
    ],
  },
  {
    id: "an-sql-advanced",
    title: "Advanced SQL for Product Analytics",
    category: "analytics",
    why: "Window functions and cohort/funnel queries are exactly what product-analytics interviews and take-homes test.",
    hours: 10,
    level: "intermediate",
    priority: "must",
    prerequisites: ["an-sql-foundations"],
    topics: [
      { id: "an-sqla-1", text: "Window functions: ROW_NUMBER, RANK, LAG, LEAD" },
      { id: "an-sqla-2", text: "Recursive CTEs" },
      { id: "an-sqla-3", text: "Cohort retention queries" },
      { id: "an-sqla-4", text: "Funnel queries with timestamps" },
      { id: "an-sqla-5", text: "Query performance basics (indexes, EXPLAIN)" },
    ],
    resources: [
      {
        title: "Alex The Analyst — Advanced SQL playlist",
        url: "https://www.youtube.com/@AlexTheAnalyst",
        type: "channel",
      },
      {
        title: "StrataScratch — real interview SQL problems",
        url: "https://www.stratascratch.com/",
        type: "doc",
      },
      { title: "LeetCode SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/", type: "doc" },
    ],
    practice: [
      { id: "an-sqla-p1", text: "20 StrataScratch medium problems" },
      { id: "an-sqla-p2", text: "Write a cohort retention query from scratch, unaided" },
      { id: "an-sqla-p3", text: "Write a signup → activation → purchase funnel query" },
    ],
    projects: [
      "Build a mock e-commerce schema and write 10 analytics queries against it (retention, funnel, LTV)",
    ],
    interviewQuestions: [
      "Write a query for Day-1/Day-7/Day-30 retention.",
      "How would you find users who churned after exactly one purchase?",
    ],
  },
  {
    id: "an-excel-bi",
    title: "Excel, Tableau & Power BI",
    category: "analytics",
    why: "SQL gets you the data; Excel/Tableau/Power BI get it in front of a decision-maker. Every analytics interview assumes fluency here.",
    hours: 10,
    level: "beginner",
    priority: "must",
    topics: [
      { id: "an-bi-1", text: "Excel: pivot tables, VLOOKUP/XLOOKUP, conditional formatting" },
      { id: "an-bi-2", text: "Tableau: connecting data, calculated fields, dashboards" },
      { id: "an-bi-3", text: "Power BI: Power Query, DAX basics, report design" },
      { id: "an-bi-4", text: "Choosing the right chart for the question" },
      { id: "an-bi-5", text: "Building an executive-ready one-page dashboard" },
    ],
    resources: [
      {
        title: "Kevin Stratvert — Excel Pivot Tables & XLOOKUP",
        url: "https://www.youtube.com/@KevinStratvert",
        type: "channel",
      },
      {
        title: "Tableau — official training videos",
        url: "https://www.youtube.com/@tableau",
        type: "channel",
      },
      {
        title: "Microsoft Power BI — official YouTube",
        url: "https://www.youtube.com/@mspowerbi",
        type: "channel",
      },
    ],
    practice: [
      { id: "an-bi-p1", text: "Build a pivot-table sales dashboard in Excel" },
      { id: "an-bi-p2", text: "Recreate the same dashboard in Tableau and Power BI" },
    ],
    projects: [
      "Publish one interactive Tableau Public dashboard on a dataset relevant to your target domain",
    ],
    interviewQuestions: [
      "How do you decide between a line chart, bar chart, and funnel chart?",
      "Walk me through a dashboard you built — what decision did it drive?",
    ],
  },
  {
    id: "an-stats-viz",
    title: "Statistics, Data Viz & EDA",
    category: "analytics",
    why: "Behind every metric is a distribution. Understand variance, significance, and exploratory analysis before you touch A/B testing.",
    hours: 7,
    level: "intermediate",
    priority: "important",
    prerequisites: ["an-sql-foundations"],
    topics: [
      { id: "an-stats-1", text: "Mean, median, variance, standard deviation" },
      { id: "an-stats-2", text: "Distributions: normal, binomial, Poisson" },
      { id: "an-stats-3", text: "Correlation vs causation" },
      { id: "an-stats-4", text: "Exploratory Data Analysis (EDA) workflow" },
      { id: "an-stats-5", text: "Data visualization principles (avoiding misleading charts)" },
    ],
    resources: [
      {
        title: "StatQuest with Josh Starmer — Statistics Fundamentals",
        url: "https://www.youtube.com/@statquest",
        type: "channel",
      },
      {
        title: "Khan Academy — Statistics & Probability",
        url: "https://www.khanacademy.org/math/statistics-probability",
        type: "course",
      },
    ],
    practice: [
      { id: "an-stats-p1", text: "Run a full EDA on a public Kaggle dataset" },
      {
        id: "an-stats-p2",
        text: "Explain 3 correlation-vs-causation traps you'd watch for in product data",
      },
    ],
    interviewQuestions: [
      "Explain standard deviation to a non-technical stakeholder.",
      "Give an example where correlation was mistaken for causation.",
    ],
  },
  {
    id: "an-metrics",
    title: "Product Metrics, KPIs & Funnels",
    category: "analytics",
    why: "You name metrics well but need to decompose them fluently — AARRR, North Star, cohorts, and diagnosing a metric drop are core PM-analytics muscle.",
    hours: 6,
    level: "intermediate",
    priority: "must",
    prerequisites: ["an-sql-foundations"],
    topics: [
      {
        id: "an-metrics-1",
        text: "AARRR funnel (Acquisition, Activation, Retention, Referral, Revenue)",
      },
      { id: "an-metrics-2", text: "North Star Metric + counter-metrics" },
      { id: "an-metrics-3", text: "Metric tree decomposition" },
      { id: "an-metrics-4", text: "DAU/WAU/MAU, stickiness, cohort retention curves" },
      { id: "an-metrics-5", text: "CAC, LTV, churn, payback period" },
      { id: "an-metrics-6", text: "Diagnosing a metric drop (segmentation tree)" },
    ],
    resources: [
      {
        title: "Amplitude — North Star Playbook",
        url: "https://amplitude.com/north-star",
        type: "doc",
      },
      {
        title: "Reforge Blog — metric trees & growth thinking",
        url: "https://www.reforge.com/blog",
        type: "blog",
      },
      {
        title: "Product School — Product Metrics that Matter",
        url: "https://www.youtube.com/@ProductSchool",
        type: "channel",
      },
    ],
    practice: [
      { id: "an-metrics-p1", text: "Build a metric tree for any consumer app's revenue" },
      {
        id: "an-metrics-p2",
        text: "Given a fictional 20% DAU drop, write your root-cause investigation plan",
      },
    ],
    interviewQuestions: [
      "Instagram's engagement dropped 15% last week. Walk me through your investigation.",
      "What North Star Metric would you pick for a food-delivery app, and why?",
      "Explain LTV:CAC and why it matters.",
    ],
  },
  {
    id: "an-ab-testing",
    title: "A/B Testing",
    category: "analytics",
    why: "Formalize the statistics behind experimentation — sample size, significance, and knowing when NOT to A/B test.",
    hours: 5,
    level: "intermediate",
    priority: "must",
    prerequisites: ["an-stats-viz"],
    topics: [
      { id: "an-ab-1", text: "Hypothesis formulation" },
      { id: "an-ab-2", text: "Sample size and power calculations" },
      { id: "an-ab-3", text: "p-values, confidence intervals, MDE" },
      { id: "an-ab-4", text: "Novelty & primacy effects" },
      { id: "an-ab-5", text: "When NOT to A/B test" },
    ],
    resources: [
      {
        title: "Ron Kohavi — Trustworthy Online Experiments",
        url: "https://experimentguide.com/",
        type: "blog",
      },
      {
        title: "StatQuest — Hypothesis Testing & p-values",
        url: "https://www.youtube.com/@statquest",
        type: "channel",
      },
    ],
    practice: [
      {
        id: "an-ab-p1",
        text: "Design a full A/B test plan (hypothesis → metric → sample size → duration)",
      },
      { id: "an-ab-p2", text: "Critique a flawed A/B test setup (peeking, no power calc, etc.)" },
    ],
    interviewQuestions: [
      "How would you A/B test a new checkout flow?",
      "Your test shows a 2% lift but p=0.08. What do you do?",
    ],
  },
];

// ───────────────────────────── TECH ─────────────────────────────
export const techModules: Module[] = [
  {
    id: "tc-web",
    title: "Web Architecture, APIs & Databases",
    category: "tech",
    why: "You don't need to code production systems, but you must speak fluently with engineers about how the product actually works.",
    hours: 6,
    level: "beginner",
    priority: "must",
    topics: [
      { id: "tc-web-1", text: "Client-server model, frontend vs backend" },
      { id: "tc-web-2", text: "REST APIs: endpoints, methods, status codes" },
      { id: "tc-web-3", text: "Request/response lifecycle & JSON" },
      { id: "tc-web-4", text: "Relational vs NoSQL databases (DBMS basics)" },
      {
        id: "tc-web-5",
        text: "Data structures at a PM level (arrays, hash maps, why they matter for perf)",
      },
    ],
    resources: [
      {
        title: "Fireship — How the Web Works in 100 seconds (+ series)",
        url: "https://www.youtube.com/@Fireship",
        type: "channel",
      },
      {
        title: "freeCodeCamp — APIs for Beginners",
        url: "https://www.youtube.com/@freecodecamp",
        type: "channel",
      },
      {
        title: "MDN — HTTP overview",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
        type: "doc",
      },
    ],
    practice: [
      { id: "tc-web-p1", text: "Call a public REST API with Postman and read the JSON response" },
      { id: "tc-web-p2", text: "Sketch the request/response flow for a login feature" },
    ],
    interviewQuestions: [
      "Explain what happens when you type a URL and hit enter.",
      "When would you choose a NoSQL database over a relational one?",
    ],
  },
  {
    id: "tc-sysarch",
    title: "System Architecture & Observability",
    category: "tech",
    why: "TPM and technical-PM interviews test whether you can reason about services, scale, and how teams know a system is healthy.",
    hours: 6,
    level: "intermediate",
    priority: "important",
    prerequisites: ["tc-web"],
    topics: [
      { id: "tc-sys-1", text: "Monolith vs microservices" },
      { id: "tc-sys-2", text: "Load balancers, caching, queues (conceptual)" },
      { id: "tc-sys-3", text: "Reading & drawing simple architecture diagrams" },
      { id: "tc-sys-4", text: "Observability: metrics, logs, traces" },
      {
        id: "tc-sys-5",
        text: "Scalability & reliability trade-offs (conceptual, not deep systems)",
      },
    ],
    resources: [
      {
        title: "ByteByteGo — System Design explained visually",
        url: "https://www.youtube.com/@ByteByteGo",
        type: "channel",
      },
      {
        title: "Gaurav Sen — System Design fundamentals",
        url: "https://www.youtube.com/@gkcs",
        type: "channel",
      },
      {
        title: "Google Cloud — Observability overview",
        url: "https://cloud.google.com/architecture/devops/devops-measurement-monitoring-and-observability",
        type: "doc",
      },
    ],
    practice: [
      { id: "tc-sys-p1", text: "Draw a high-level architecture diagram for a food-delivery app" },
      { id: "tc-sys-p2", text: "List the 3 metrics you'd alert on for a checkout service" },
    ],
    interviewQuestions: [
      "Design the high-level architecture for a URL shortener.",
      "How would you know if a service is unhealthy before users complain?",
    ],
  },
  {
    id: "tc-sdlc",
    title: "SDLC, Git/GitHub & CI/CD",
    category: "tech",
    why: "You'll live inside pull requests and release pipelines. Know the vocabulary and workflow cold.",
    hours: 4,
    level: "beginner",
    priority: "must",
    topics: [
      { id: "tc-sdlc-1", text: "SDLC phases: plan, build, test, release, monitor" },
      { id: "tc-sdlc-2", text: "Git basics: commit, branch, merge, PR" },
      { id: "tc-sdlc-3", text: "GitHub workflow: issues, PRs, code review" },
      { id: "tc-sdlc-4", text: "CI/CD concept & GitHub Actions basics" },
      { id: "tc-sdlc-5", text: "Feature flags & staged rollouts" },
    ],
    resources: [
      {
        title: "freeCodeCamp — Git and GitHub full course",
        url: "https://www.youtube.com/@freecodecamp",
        type: "channel",
      },
      {
        title: "GitHub — GitHub Actions official docs",
        url: "https://docs.github.com/en/actions",
        type: "doc",
      },
    ],
    practice: [
      { id: "tc-sdlc-p1", text: "Create a repo, branch, open a PR, and merge it" },
      { id: "tc-sdlc-p2", text: "Set up one simple GitHub Actions workflow (e.g. lint on push)" },
    ],
    interviewQuestions: [
      "Explain the difference between continuous integration and continuous deployment.",
      "Why do teams use feature flags instead of shipping straight to 100%?",
    ],
  },
  {
    id: "tc-ml",
    title: "ML Fundamentals: Regression, Clustering & Trees",
    category: "tech",
    why: "AI-PM and product-analytics roles expect you to reason about model choice, not build models from scratch.",
    hours: 6,
    level: "intermediate",
    priority: "important",
    prerequisites: ["an-stats-viz"],
    topics: [
      { id: "tc-ml-1", text: "Supervised vs unsupervised learning" },
      { id: "tc-ml-2", text: "Linear & logistic regression" },
      { id: "tc-ml-3", text: "K-Means clustering" },
      { id: "tc-ml-4", text: "Decision trees & feature selection" },
      { id: "tc-ml-5", text: "Overfitting, train/test split, evaluation metrics" },
    ],
    resources: [
      {
        title: "StatQuest — Machine Learning fundamentals playlist",
        url: "https://www.youtube.com/@statquest",
        type: "channel",
      },
      {
        title: "Google — Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        type: "course",
      },
    ],
    practice: [
      {
        id: "tc-ml-p1",
        text: "Run K-Means on a sample customer dataset and interpret the clusters",
      },
      { id: "tc-ml-p2", text: "Explain a decision tree's output to a non-technical stakeholder" },
    ],
    interviewQuestions: [
      "When would you use clustering vs classification for a user-segmentation problem?",
      "Explain overfitting like I'm a business stakeholder.",
    ],
  },
  {
    id: "tc-mlops",
    title: "MLOps Essentials",
    category: "tech",
    why: "Knowing how models get deployed, monitored, and retrained separates AI-PMs who can scope real roadmaps from those who can't.",
    hours: 3,
    level: "advanced",
    priority: "optional",
    prerequisites: ["tc-ml"],
    topics: [
      { id: "tc-mlops-1", text: "Model deployment basics (batch vs real-time)" },
      { id: "tc-mlops-2", text: "Model monitoring & drift detection" },
      { id: "tc-mlops-3", text: "Retraining pipelines & versioning (conceptual)" },
    ],
    resources: [
      {
        title: "Google Cloud — MLOps: Continuous delivery for ML",
        url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
        type: "doc",
      },
      {
        title: "DeepLearning.AI — MLOps Specialization overview",
        url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-mlops/",
        type: "course",
      },
    ],
    interviewQuestions: ["How would you detect that a deployed model's quality has degraded?"],
  },
  {
    id: "tc-genai",
    title: "GenAI, LLMs & Prompt Engineering",
    category: "tech",
    why: "Every agent is an LLM in a loop. You can't reason about AI products without fluency in tokens, context windows, and prompting.",
    hours: 5,
    level: "beginner",
    priority: "must",
    topics: [
      { id: "tc-genai-1", text: "Tokens, embeddings, context windows" },
      { id: "tc-genai-2", text: "Temperature, top-p, top-k sampling" },
      { id: "tc-genai-3", text: "System vs user vs assistant roles, API basics" },
      { id: "tc-genai-4", text: "Zero-shot, few-shot, chain-of-thought prompting" },
      { id: "tc-genai-5", text: "Structured output (JSON mode, tool schemas)" },
      { id: "tc-genai-6", text: "Cost / latency / quality trade-offs across model tiers" },
    ],
    resources: [
      {
        title: "Andrej Karpathy — Intro to Large Language Models",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        type: "video",
      },
      {
        title: "Anthropic — Prompt Engineering Guide",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        type: "doc",
      },
      {
        title: "Prompt Engineering Guide (promptingguide.ai)",
        url: "https://www.promptingguide.ai/",
        type: "doc",
      },
    ],
    practice: [
      {
        id: "tc-genai-p1",
        text: "Write and test 5 prompts using zero-shot, few-shot, and CoT for the same task",
      },
      { id: "tc-genai-p2", text: "Get a model to return strict JSON output for a structured task" },
    ],
    projects: ["Build a 30-line CLI chatbot using a raw LLM API"],
    interviewQuestions: [
      "How would you decide which model tier to use for a given feature?",
      "What's the difference between fine-tuning and prompting, and when would you reach for each?",
    ],
  },
  {
    id: "tc-agents",
    title: "AI Agents & RAG",
    category: "tech",
    why: "Modern AI products are agentic and grounded. ReAct + tool use + retrieval is the literal bedrock of AI-PM interviews now.",
    hours: 8,
    level: "intermediate",
    priority: "must",
    prerequisites: ["tc-genai"],
    topics: [
      { id: "tc-agents-1", text: "ReAct loop: Perceive → Reason → Act → Observe" },
      { id: "tc-agents-2", text: "Tools, function calling, JSON schemas" },
      { id: "tc-agents-3", text: "Memory types: short-term, long-term, episodic" },
      { id: "tc-agents-4", text: "Embeddings & chunking strategies for RAG" },
      { id: "tc-agents-5", text: "Vector DB basics (pgvector, Chroma, Pinecone)" },
      { id: "tc-agents-6", text: "RAG evaluation (faithfulness, relevance) & guardrails" },
    ],
    resources: [
      {
        title: "Lilian Weng — LLM Powered Autonomous Agents",
        url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
        type: "blog",
      },
      {
        title: "HuggingFace — Agents Course (free, certificate)",
        url: "https://huggingface.co/learn/agents-course",
        type: "course",
      },
      {
        title: "DeepLearning.AI — Building Agentic RAG with LlamaIndex",
        url: "https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/",
        type: "course",
      },
    ],
    practice: [
      {
        id: "tc-agents-p1",
        text: "Build a single-agent research assistant with one web-search tool",
      },
      {
        id: "tc-agents-p2",
        text: "Build a tiny RAG pipeline over 5 PDFs and evaluate its answers",
      },
    ],
    projects: ["RAG chatbot over a public help-center's documentation"],
    interviewQuestions: [
      "How would you evaluate whether a RAG system is hallucinating?",
      "Design an agent that books a restaurant reservation end-to-end.",
    ],
  },
  {
    id: "tc-frameworks",
    title: "LangChain, LangGraph, MCP & Automation Pipelines",
    category: "tech",
    why: "Industry-standard abstractions for stitching LLMs to tools, data, and stateful workflows — even if a specific team uses something else, these transfer.",
    hours: 6,
    level: "intermediate",
    priority: "important",
    prerequisites: ["tc-agents"],
    topics: [
      { id: "tc-fw-1", text: "LangChain: chains, tools, tool-calling agents" },
      { id: "tc-fw-2", text: "LangGraph: state graphs, conditional edges, human-in-the-loop" },
      {
        id: "tc-fw-3",
        text: "MCP (Model Context Protocol): servers, clients, tool/resource primitives",
      },
      { id: "tc-fw-4", text: "Multi-agent patterns: orchestrator + workers, debate/critique" },
      { id: "tc-fw-5", text: "No-code automation pipelines (n8n) for prototyping agent workflows" },
    ],
    resources: [
      {
        title: "LangChain Academy — Intro to LangGraph",
        url: "https://academy.langchain.com/courses/intro-to-langgraph",
        type: "course",
      },
      {
        title: "MCP Spec — official introduction",
        url: "https://modelcontextprotocol.io/introduction",
        type: "doc",
      },
      {
        title: "n8n — official tutorials",
        url: "https://www.youtube.com/@n8n-io",
        type: "channel",
      },
      {
        title: "AI Jason — agent framework tutorials",
        url: "https://www.youtube.com/@AIJasonZ",
        type: "channel",
      },
    ],
    practice: [
      {
        id: "tc-fw-p1",
        text: "Build one LangGraph workflow with a conditional edge and a human-approval step",
      },
      { id: "tc-fw-p2", text: "Build one n8n automation that calls an LLM step and a tool step" },
    ],
    interviewQuestions: [
      "When would you reach for LangGraph instead of a simple ReAct loop?",
      "What problem does MCP solve that raw function calling doesn't?",
    ],
  },
];

// ───────────────────────────── BUSINESS & GROWTH ─────────────────────────────
export const businessModules: Module[] = [
  {
    id: "bz-strategy",
    title: "Business Strategy & Development",
    category: "business",
    why: "Strategy and Business Product Manager rounds test whether you can zoom out to market dynamics and business models, not just features.",
    hours: 4,
    level: "intermediate",
    priority: "important",
    topics: [
      {
        id: "bz-strat-1",
        text: "Business models: subscription, marketplace, transactional, freemium",
      },
      { id: "bz-strat-2", text: "Unit economics basics (contribution margin, payback)" },
      { id: "bz-strat-3", text: "Porter's Five Forces & competitive moats" },
      { id: "bz-strat-4", text: "Partnerships & business development basics" },
    ],
    resources: [
      {
        title: "Harvard Business Review — Strategy playlist",
        url: "https://www.youtube.com/@HarvardBusinessReview",
        type: "channel",
      },
      {
        title: "Stratechery — business strategy essays",
        url: "https://stratechery.com/",
        type: "blog",
      },
    ],
    practice: [
      {
        id: "bz-strat-p1",
        text: "Map the business model + unit economics of 2 companies in your target sector",
      },
    ],
    interviewQuestions: [
      "Explain the unit economics of a food-delivery order.",
      "What's a durable moat, and does [company X] have one?",
    ],
  },
  {
    id: "bz-growth",
    title: "Growth Loops & Lifecycle Marketing",
    category: "business",
    why: "Growth PM interviews expect fluency in loops, not just funnels — and lifecycle/CLM thinking beyond one-time acquisition.",
    hours: 3,
    level: "intermediate",
    priority: "optional",
    prerequisites: ["an-metrics"],
    topics: [
      { id: "bz-growth-1", text: "Growth loops vs funnels" },
      { id: "bz-growth-2", text: "Referral & viral loop mechanics" },
      { id: "bz-growth-3", text: "Customer lifecycle marketing (CLM) journey" },
      { id: "bz-growth-4", text: "Retention-driven growth vs paid acquisition" },
    ],
    resources: [
      {
        title: "Reforge Blog — growth loops archive",
        url: "https://www.reforge.com/blog",
        type: "blog",
      },
      {
        title: "Lenny's Newsletter — growth archive",
        url: "https://www.lennysnewsletter.com/",
        type: "blog",
      },
    ],
    practice: [{ id: "bz-growth-p1", text: "Diagram a growth loop for a product you use" }],
    interviewQuestions: ["Design a referral loop for a fintech app."],
  },
  {
    id: "bz-marketing",
    title: "Digital Marketing, SEO, ASO & Google Analytics",
    category: "business",
    why: "Marketing PMs and growth roles expect you to speak SEO, app-store optimization, and web analytics fluently.",
    hours: 5,
    level: "beginner",
    priority: "important",
    topics: [
      { id: "bz-mkt-1", text: "Digital marketing channel mix (SEO, SEM, social, email)" },
      { id: "bz-mkt-2", text: "SEO fundamentals: on-page, technical, backlinks" },
      { id: "bz-mkt-3", text: "ASO (App Store Optimization) basics" },
      { id: "bz-mkt-4", text: "Google Analytics 4: events, conversions, funnels" },
      { id: "bz-mkt-5", text: "Attribution basics (first-touch vs last-touch)" },
    ],
    resources: [
      {
        title: "Google Analytics Academy (official, free)",
        url: "https://analytics.google.com/analytics/academy/",
        type: "course",
      },
      {
        title: "Neil Patel — SEO fundamentals playlist",
        url: "https://www.youtube.com/@neilpatel",
        type: "channel",
      },
      {
        title: "HubSpot Academy — Digital Marketing Course",
        url: "https://academy.hubspot.com/courses/digital-marketing",
        type: "course",
      },
    ],
    practice: [
      {
        id: "bz-mkt-p1",
        text: "Set up a free GA4 property on a demo site and read the acquisition report",
      },
      { id: "bz-mkt-p2", text: "Audit one app's store listing and propose 3 ASO changes" },
    ],
    interviewQuestions: [
      "How would you measure the ROI of a marketing campaign?",
      "What's the difference between SEO and ASO, and how do they interact for an app?",
    ],
  },
];

// ───────────────────────────── DOMAIN KNOWLEDGE ─────────────────────────────
export const domainModules: Module[] = [
  {
    id: "dm-fintech",
    title: "FinTech: Payments, Credit & Risk",
    category: "domain",
    why: "FinTech PM/analytics interviews expect fluency in payments rails, credit fundamentals, and KYC/underwriting funnels.",
    hours: 4,
    level: "intermediate",
    priority: "important",
    topics: [
      { id: "dm-fin-1", text: "Payments basics: cards, UPI/real-time rails, settlement" },
      { id: "dm-fin-2", text: "Credit fundamentals: credit score, underwriting, interest" },
      { id: "dm-fin-3", text: "Credit cards: interchange, rewards economics, delinquency" },
      { id: "dm-fin-4", text: "KYC → activation funnel in fintech onboarding" },
      { id: "dm-fin-5", text: "Fraud & risk basics" },
    ],
    resources: [
      {
        title: "Investopedia — how credit cards work",
        url: "https://www.investopedia.com/terms/c/creditcard.asp",
        type: "doc",
      },
      {
        title: "a16z — FinTech explainer talks",
        url: "https://www.youtube.com/@a16z",
        type: "channel",
      },
    ],
    practice: [
      { id: "dm-fin-p1", text: "Map the KYC-to-activation funnel for a digital lending app" },
    ],
    interviewQuestions: [
      "Design a credit product for gig-economy workers.",
      "Walk me through how a credit card issuer makes money.",
    ],
  },
  {
    id: "dm-healthcare",
    title: "Healthcare Product Workflows",
    category: "domain",
    why: "Healthcare products carry unique constraints — patient journeys, provider workflows, and compliance shape every decision.",
    hours: 3,
    level: "intermediate",
    priority: "optional",
    topics: [
      { id: "dm-health-1", text: "Patient journey: awareness → booking → visit → follow-up" },
      { id: "dm-health-2", text: "Provider-side workflows (scheduling, EHR basics)" },
      { id: "dm-health-3", text: "Compliance basics (HIPAA-style data sensitivity, consent)" },
    ],
    resources: [
      {
        title: "HIMSS — health IT fundamentals",
        url: "https://www.himss.org/resources",
        type: "doc",
      },
    ],
    interviewQuestions: ["Design a telehealth booking flow for elderly patients."],
  },
  {
    id: "dm-enterprise",
    title: "Enterprise Software & B2B SaaS",
    category: "domain",
    why: "Enterprise PM roles need fluency in admin/permissions models, procurement cycles, and B2B metrics like NRR.",
    hours: 3,
    level: "intermediate",
    priority: "optional",
    topics: [
      { id: "dm-ent-1", text: "B2B SaaS metrics: NRR, ARR, churn, expansion" },
      { id: "dm-ent-2", text: "Admin/permissions & multi-tenant concepts" },
      { id: "dm-ent-3", text: "Enterprise sales cycle & procurement basics" },
    ],
    resources: [
      {
        title: "SaaStr — B2B SaaS metrics explainer videos",
        url: "https://www.youtube.com/@SaaStr",
        type: "channel",
      },
    ],
    interviewQuestions: ["How is prioritization different for enterprise vs consumer products?"],
  },
];

export const allModules: Module[] = [
  ...productModules,
  ...analyticsModules,
  ...techModules,
  ...businessModules,
  ...domainModules,
];

export const pmSections = productModules;
export const aiModules = techModules;

export function modulesByCategory(cat: Category): Module[] {
  return allModules.filter((m) => m.category === cat);
}

// ───────────────────────────── 10-WEEK ROADMAP ─────────────────────────────
export interface RoadmapWeek {
  id: string;
  week: number;
  title: string;
  theme: string;
  goal: string;
  moduleIds: string[];
  deliverable: string;
  interviewFocus: string;
}

export const roadmapWeeks: RoadmapWeek[] = [
  {
    id: "w1",
    week: 1,
    title: "Foundations",
    theme: "Product thinking + SQL basics + how software actually works",
    goal: "Build the mental scaffolding everything else hangs on.",
    moduleIds: ["pr-fundamentals", "pr-sense", "an-sql-foundations", "tc-web"],
    deliverable: "1-page product teardown of an app you use daily, using JTBD + persona.",
    interviewFocus: "Warm up with 3 'tell me about yourself' and 'why product' answers.",
  },
  {
    id: "w2",
    week: 2,
    title: "Research & Data Depth",
    theme: "Market research, competitive analysis, advanced SQL",
    goal: "Ground opinions in evidence and get fluent in real analytics queries.",
    moduleIds: ["pr-research", "an-sql-advanced", "tc-sdlc"],
    deliverable: "Competitive teardown doc (2 competitors) + 15 SQL problems solved.",
    interviewFocus: "5 timed guesstimate drills.",
  },
  {
    id: "w3",
    week: 3,
    title: "Strategy & BI Tooling",
    theme: "Prioritization frameworks, roadmapping, Excel/Tableau/Power BI",
    goal: "Turn insight into a defensible plan and present it visually.",
    moduleIds: ["pr-strategy", "an-excel-bi", "tc-sysarch"],
    deliverable: "2-quarter roadmap doc + one BI dashboard published.",
    interviewFocus: "Practice RICE/Kano scoring live on a mock backlog.",
  },
  {
    id: "w4",
    week: 4,
    title: "Docs & Delivery",
    theme: "PRD/BRD/FRD writing, Agile/Scrum/Jira",
    goal: "Write documents an engineer could execute against, and run a sprint.",
    moduleIds: ["pr-docs", "pr-agile", "tc-genai"],
    deliverable: "One complete PRD + one mock sprint run in Jira.",
    interviewFocus: "Mock: write a PRD live in 20 minutes.",
  },
  {
    id: "w5",
    week: 5,
    title: "Design & Statistics",
    theme: "UX/UI/Figma, statistics & EDA, ML fundamentals begin",
    goal: "Prototype your PRD's feature and understand the stats under every metric.",
    moduleIds: ["pr-ux", "an-stats-viz", "tc-ml"],
    deliverable: "Clickable Figma prototype + one full EDA notebook.",
    interviewFocus: "Design critique drills on 3 real apps.",
  },
  {
    id: "w6",
    week: 6,
    title: "Metrics, Experimentation & MLOps",
    theme: "Product metrics/funnels, A/B testing, MLOps essentials",
    goal: "Be dangerous at diagnosing metric drops and designing experiments.",
    moduleIds: ["an-metrics", "an-ab-testing", "tc-mlops"],
    deliverable: "Root-cause investigation memo for a simulated metric drop + one A/B test plan.",
    interviewFocus: "Mock: 'metric X dropped 15%, walk me through your investigation.'",
  },
  {
    id: "w7",
    week: 7,
    title: "GTM & Growth Marketing",
    theme: "Launch/pricing/GTM, digital marketing/SEO/ASO/GA4, business strategy",
    goal: "Understand how a product reaches, converts, and monetizes users.",
    moduleIds: ["pr-gtm", "bz-marketing", "bz-strategy"],
    deliverable: "Launch plan + positioning statement for your feature idea.",
    interviewFocus: "Mock: GTM case study, 30 minutes.",
  },
  {
    id: "w8",
    week: 8,
    title: "GenAI Deep Dive",
    theme: "Agents, RAG, LangChain/LangGraph/MCP, growth loops",
    goal: "Go deep on the AI-PM stack that increasingly defines the role.",
    moduleIds: ["tc-agents", "tc-frameworks", "bz-growth"],
    deliverable: "Ship one small RAG or agent prototype end-to-end.",
    interviewFocus: "Mock: 'design an AI feature for [product]' — cover evals & guardrails.",
  },
  {
    id: "w9",
    week: 9,
    title: "Domain Depth & Case Practice",
    theme: "FinTech/Healthcare/Enterprise domain knowledge, PM case studies",
    goal: "Build credible domain fluency for your target industries and drill cases.",
    moduleIds: ["dm-fintech", "dm-healthcare", "dm-enterprise"],
    deliverable: "One domain-specific case write-up (e.g. credit product for gig workers).",
    interviewFocus: "3 full mock case interviews (product design, strategy, RCA).",
  },
  {
    id: "w10",
    week: 10,
    title: "Mock Marathon & Applications",
    theme: "Full-spectrum mocks across Product / Analytics / Technical / Behavioral",
    goal: "Convert 10 weeks of prep into interview performance and a polished narrative.",
    moduleIds: [],
    deliverable:
      "Resume + LinkedIn refreshed; 4 mock interviews completed (1 per track); revision pass on weak modules.",
    interviewFocus:
      "1 Product sense mock, 1 Analytics/SQL mock, 1 Technical/TPM mock, 1 Behavioral mock.",
  },
];

// ───────────────────────────── CASE PRACTICE & INTERVIEW PREP ─────────────────────────────
export interface CaseItem {
  id: string;
  text: string;
  kind: "design" | "strategy" | "rca" | "guesstimate" | "gtm";
}

export const caseBank: CaseItem[] = [
  { id: "case-1", text: "Design a product for visually impaired commuters.", kind: "design" },
  { id: "case-2", text: "Design a savings feature for gig-economy workers.", kind: "design" },
  { id: "case-3", text: "Improve the checkout flow for an e-commerce app.", kind: "design" },
  {
    id: "case-4",
    text: "Should [ride-hailing app] launch a grocery-delivery vertical?",
    kind: "strategy",
  },
  {
    id: "case-5",
    text: "Should a food-delivery app build or buy its logistics stack?",
    kind: "strategy",
  },
  {
    id: "case-6",
    text: "A B2B SaaS's NRR dropped 8% this quarter — investigate.",
    kind: "strategy",
  },
  {
    id: "case-7",
    text: "DAU for a fitness app dropped 20% after a redesign — root-cause it.",
    kind: "rca",
  },
  {
    id: "case-8",
    text: "Signups are flat but activation dropped 30% week over week — why?",
    kind: "rca",
  },
  {
    id: "case-9",
    text: "Support tickets doubled after a release with no code changes flagged — investigate.",
    kind: "rca",
  },
  {
    id: "case-10",
    text: "Estimate the number of food-delivery orders placed in your city daily.",
    kind: "guesstimate",
  },
  {
    id: "case-11",
    text: "Estimate the market size for a premium credit card in urban India.",
    kind: "guesstimate",
  },
  {
    id: "case-12",
    text: "Estimate how many Zoom calls happen globally on a given weekday.",
    kind: "guesstimate",
  },
  { id: "case-13", text: "Plan the launch of a new UPI-based credit product.", kind: "gtm" },
  {
    id: "case-14",
    text: "Plan the GTM for an AI copilot feature inside an existing enterprise product.",
    kind: "gtm",
  },
];

export const behavioralQuestions: ChecklistItem[] = [
  { id: "beh-1", text: "A time you led through ambiguity" },
  { id: "beh-2", text: "A time you used data to change a decision" },
  { id: "beh-3", text: "A time you disagreed with a stakeholder and how you resolved it" },
  { id: "beh-4", text: "Your biggest failure and what you learned" },
  { id: "beh-5", text: "A time you shipped fast under pressure" },
  { id: "beh-6", text: "A time you influenced without authority" },
  { id: "beh-7", text: "A time you simplified a complex problem for a non-technical audience" },
  { id: "beh-8", text: "Your signature narrative: why product, why now" },
];

export const placementBehavioral = behavioralQuestions;

export const resumeChecklist: ChecklistItem[] = [
  { id: "res-1", text: "Quantify every bullet with a metric or outcome" },
  { id: "res-2", text: "Add PM/Analytics keywords: RICE, SQL, A/B testing, RAG/agents, PRD" },
  { id: "res-3", text: "Tighten every bullet to one line, action-first" },
  { id: "res-4", text: "Update LinkedIn headline to match your target positioning" },
  { id: "res-5", text: "Two-version resume: PM-heavy vs Analytics-heavy" },
  { id: "res-6", text: "Get 2 people to review for clarity and typos" },
];

export interface CompanyPrep {
  id: string;
  name: string;
  role: string;
  notes: string;
  items: ChecklistItem[];
}

export const companies: CompanyPrep[] = [
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
    notes: "Strong technical fluency expected alongside product sense.",
    items: [
      {
        id: "co-msft-1",
        text: "Study one Microsoft product family in depth (e.g. Copilot, Teams)",
      },
      { id: "co-msft-2", text: "Behavioral STAR prep (5 stories)" },
    ],
  },
  {
    id: "co-atlassian",
    name: "Atlassian",
    role: "PM",
    notes: "Values-driven interviews; loves structured collaboration stories.",
    items: [
      { id: "co-atlassian-1", text: "Study Atlassian's team playbook" },
      { id: "co-atlassian-2", text: "Write a Jira/Confluence improvement PRD" },
    ],
  },
  {
    id: "co-flipkart",
    name: "Flipkart",
    role: "APM / Strategy",
    notes: "Indian e-commerce depth, marketplace mechanics.",
    items: [
      { id: "co-fk-1", text: "Study Flipkart vs Amazon vs Meesho positioning" },
      { id: "co-fk-2", text: "Marketplace metrics: GMV, take rate, private-label share" },
    ],
  },
  {
    id: "co-swiggy",
    name: "Swiggy / Zomato",
    role: "APM / Product Analytics",
    notes: "Data-heavy interviews. SQL screen is likely.",
    items: [
      { id: "co-swiggy-1", text: "20 SQL problems on order/funnel-style data" },
      { id: "co-swiggy-2", text: "Think through supply-demand matching in food delivery" },
    ],
  },
  {
    id: "co-razorpay",
    name: "Razorpay",
    role: "PM / Product Analytics",
    notes: "Fintech depth. Strong on metrics and KYC/payments funnels.",
    items: [
      { id: "co-rz-1", text: "Study Razorpay's product suite (Payments, RazorpayX, Capital)" },
      { id: "co-rz-2", text: "Map the KYC → activation funnel" },
      { id: "co-rz-3", text: "Prepare a fraud/risk product-sense answer" },
    ],
  },
];

// ───────────────────────────── VIDEO-FIRST RESOURCE LIBRARY ─────────────────────────────
export interface LibraryItem {
  id: string;
  title: string;
  url: string;
  category: Category | "Interview";
  type: "Video" | "Playlist" | "Channel" | "Course" | "Blog" | "GitHub" | "Doc" | "Paper";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  why: string;
}

export const library: LibraryItem[] = [
  // Product
  {
    id: "lib-p1",
    title: "Product School (YouTube)",
    url: "https://www.youtube.com/@ProductSchool",
    category: "product",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Best broad library of PM fundamentals and framework explainer videos.",
  },
  {
    id: "lib-p2",
    title: "Exponent — PM interview & framework videos",
    url: "https://www.youtube.com/@tryexponent",
    category: "product",
    type: "Channel",
    difficulty: "Intermediate",
    time: "Varies",
    why: "The best PM mock-interview and framework video library on the internet.",
  },
  {
    id: "lib-p3",
    title: "Lenny's Newsletter",
    url: "https://www.lennysnewsletter.com/",
    category: "product",
    type: "Blog",
    difficulty: "Beginner",
    time: "Weekly",
    why: "The single best PM newsletter — templates, playbooks, interviews with top PMs.",
  },
  {
    id: "lib-p4",
    title: "Y Combinator — Startup School videos",
    url: "https://www.youtube.com/@ycombinator",
    category: "product",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Free, high-signal videos on product-market fit, GTM, and talking to users.",
  },
  {
    id: "lib-p5",
    title: "April Dunford — Positioning",
    url: "https://www.aprildunford.com/",
    category: "product",
    type: "Blog",
    difficulty: "Intermediate",
    time: "2h",
    why: "The definitive framework for how to position a product.",
  },
  {
    id: "lib-p6",
    title: "NN/g — Nielsen Norman Group articles",
    url: "https://www.nngroup.com/articles/",
    category: "product",
    type: "Blog",
    difficulty: "Beginner",
    time: "Varies",
    why: "Gold-standard UX research and usability writing.",
  },
  {
    id: "lib-p7",
    title: "Figma — official YouTube channel",
    url: "https://www.youtube.com/@figma",
    category: "product",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Straight from the source — wireframing and prototyping basics.",
  },
  {
    id: "lib-p8",
    title: "Atlassian Agile Coach",
    url: "https://www.atlassian.com/agile",
    category: "product",
    type: "Doc",
    difficulty: "Beginner",
    time: "1h",
    why: "Best free primer on Agile/Scrum/Jira, from the tool vendor itself.",
  },
  // Analytics
  {
    id: "lib-a1",
    title: "Alex The Analyst (YouTube)",
    url: "https://www.youtube.com/@AlexTheAnalyst",
    category: "analytics",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "The most-recommended free channel for SQL, Excel, Tableau and analyst portfolio projects.",
  },
  {
    id: "lib-a2",
    title: "StatQuest with Josh Starmer",
    url: "https://www.youtube.com/@statquest",
    category: "analytics",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Explains statistics and ML concepts more clearly than almost anyone.",
  },
  {
    id: "lib-a3",
    title: "StrataScratch",
    url: "https://www.stratascratch.com/",
    category: "analytics",
    type: "Doc",
    difficulty: "Intermediate",
    time: "Daily",
    why: "Real SQL interview questions pulled from actual companies.",
  },
  {
    id: "lib-a4",
    title: "Mode SQL Tutorial",
    url: "https://mode.com/sql-tutorial",
    category: "analytics",
    type: "Doc",
    difficulty: "Beginner",
    time: "8h",
    why: "Best free structured SQL learning path.",
  },
  {
    id: "lib-a5",
    title: "LeetCode SQL 50",
    url: "https://leetcode.com/studyplan/top-sql-50/",
    category: "analytics",
    type: "Doc",
    difficulty: "Beginner",
    time: "20h",
    why: "Curated, high-signal SQL practice set.",
  },
  {
    id: "lib-a6",
    title: "Tableau — official training videos",
    url: "https://www.youtube.com/@tableau",
    category: "analytics",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Straight from Tableau; best for dashboard-building fluency.",
  },
  {
    id: "lib-a7",
    title: "Microsoft Power BI (official)",
    url: "https://www.youtube.com/@mspowerbi",
    category: "analytics",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Official Power BI tutorials, DAX, and report design.",
  },
  {
    id: "lib-a8",
    title: "Amplitude — North Star & product-analytics playbooks",
    url: "https://amplitude.com/blog",
    category: "analytics",
    type: "Blog",
    difficulty: "Intermediate",
    time: "Varies",
    why: "Practitioner-grade product analytics playbooks.",
  },
  {
    id: "lib-a9",
    title: "Khan Academy — Statistics & Probability",
    url: "https://www.khanacademy.org/math/statistics-probability",
    category: "analytics",
    type: "Course",
    difficulty: "Beginner",
    time: "10h",
    why: "Free, rigorous statistics foundation.",
  },
  // Tech
  {
    id: "lib-t1",
    title: "ByteByteGo — System Design explained visually",
    url: "https://www.youtube.com/@ByteByteGo",
    category: "tech",
    type: "Channel",
    difficulty: "Intermediate",
    time: "Varies",
    why: "The clearest visual explanations of system design concepts.",
  },
  {
    id: "lib-t2",
    title: "Fireship — fast, dense web/dev explainers",
    url: "https://www.youtube.com/@Fireship",
    category: "tech",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "100-second explainers that build genuine technical fluency fast.",
  },
  {
    id: "lib-t3",
    title: "freeCodeCamp (YouTube)",
    url: "https://www.youtube.com/@freecodecamp",
    category: "tech",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "Full-length free courses on Git, APIs, SQL, and more.",
  },
  {
    id: "lib-t4",
    title: "Andrej Karpathy — Intro to LLMs",
    url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
    category: "tech",
    type: "Video",
    difficulty: "Beginner",
    time: "1h",
    why: "Single best conceptual overview of how LLMs work.",
  },
  {
    id: "lib-t5",
    title: "Lilian Weng — LLM Powered Autonomous Agents",
    url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
    category: "tech",
    type: "Blog",
    difficulty: "Intermediate",
    time: "45m",
    why: "Foundational essay on agent architectures.",
  },
  {
    id: "lib-t6",
    title: "HuggingFace Agents Course",
    url: "https://huggingface.co/learn/agents-course",
    category: "tech",
    type: "Course",
    difficulty: "Beginner",
    time: "8h",
    why: "Free, end-to-end agents course with a certificate.",
  },
  {
    id: "lib-t7",
    title: "LangChain Academy — Intro to LangGraph",
    url: "https://academy.langchain.com/courses/intro-to-langgraph",
    category: "tech",
    type: "Course",
    difficulty: "Intermediate",
    time: "3h",
    why: "Stateful agent graphs, done right, from the source.",
  },
  {
    id: "lib-t8",
    title: "MCP Spec",
    url: "https://modelcontextprotocol.io/introduction",
    category: "tech",
    type: "Doc",
    difficulty: "Intermediate",
    time: "30m",
    why: "The universal AI tool connector standard. Read it once.",
  },
  {
    id: "lib-t9",
    title: "n8n — official tutorials",
    url: "https://www.youtube.com/@n8n-io",
    category: "tech",
    type: "Channel",
    difficulty: "Beginner",
    time: "Varies",
    why: "No-code automation pipelines — fast way to prototype agent workflows.",
  },
  {
    id: "lib-t10",
    title: "Hamel Husain — Your AI Product Needs Evals",
    url: "https://hamel.dev/blog/posts/evals/",
    category: "tech",
    type: "Blog",
    difficulty: "Intermediate",
    time: "30m",
    why: "Required reading for anyone building or managing AI products.",
  },
  {
    id: "lib-t11",
    title: "OpenAI Cookbook",
    url: "https://github.com/openai/openai-cookbook",
    category: "tech",
    type: "GitHub",
    difficulty: "Beginner",
    time: "Varies",
    why: "Copy-paste recipes for common LLM application patterns.",
  },
  {
    id: "lib-t12",
    title: "Google — Machine Learning Crash Course",
    url: "https://developers.google.com/machine-learning/crash-course",
    category: "tech",
    type: "Course",
    difficulty: "Beginner",
    time: "15h",
    why: "Concise, official ML fundamentals course with exercises.",
  },
  // Business
  {
    id: "lib-b1",
    title: "Stratechery",
    url: "https://stratechery.com/",
    category: "business",
    type: "Blog",
    difficulty: "Advanced",
    time: "Weekly",
    why: "The deepest strategy writing in tech, read once a week.",
  },
  {
    id: "lib-b2",
    title: "Google Analytics Academy (official, free)",
    url: "https://analytics.google.com/analytics/academy/",
    category: "business",
    type: "Course",
    difficulty: "Beginner",
    time: "Varies",
    why: "Official, free, certificate-backed GA4 training.",
  },
  {
    id: "lib-b3",
    title: "HubSpot Academy — Digital Marketing",
    url: "https://academy.hubspot.com/courses/digital-marketing",
    category: "business",
    type: "Course",
    difficulty: "Beginner",
    time: "5h",
    why: "Free, structured, and covers SEO/SEM/email/social in one place.",
  },
  {
    id: "lib-b4",
    title: "Harvard Business Review (YouTube)",
    url: "https://www.youtube.com/@HarvardBusinessReview",
    category: "business",
    type: "Channel",
    difficulty: "Intermediate",
    time: "Varies",
    why: "Case-based strategy thinking from the source.",
  },
  {
    id: "lib-b5",
    title: "Reforge Blog",
    url: "https://www.reforge.com/blog",
    category: "business",
    type: "Blog",
    difficulty: "Intermediate",
    time: "Weekly",
    why: "Growth loops, metric trees, and lifecycle marketing, practitioner-grade.",
  },
  // Domain
  {
    id: "lib-d1",
    title: "a16z (YouTube) — FinTech & vertical SaaS talks",
    url: "https://www.youtube.com/@a16z",
    category: "domain",
    type: "Channel",
    difficulty: "Intermediate",
    time: "Varies",
    why: "Sharp explainer talks on fintech, healthcare, and enterprise business models.",
  },
  {
    id: "lib-d2",
    title: "Investopedia — credit & payments explainers",
    url: "https://www.investopedia.com/terms/c/creditcard.asp",
    category: "domain",
    type: "Doc",
    difficulty: "Beginner",
    time: "Varies",
    why: "Clear, reliable explainers for financial fundamentals.",
  },
  // Interview
  {
    id: "lib-i1",
    title: "Exponent — full mock interview library",
    url: "https://www.tryexponent.com/",
    category: "Interview",
    type: "Video",
    difficulty: "Intermediate",
    time: "Varies",
    why: "The best PM/Analytics mock-interview video library, bar none.",
  },
  {
    id: "lib-i2",
    title: "Decode and Conquer — Lewis Lin",
    url: "https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417",
    category: "Interview",
    type: "Blog",
    difficulty: "Intermediate",
    time: "10h",
    why: "The classic PM-interview prep book — CIRCLES framework originates here.",
  },
  {
    id: "lib-i3",
    title: "Case Interview prep — case bank & frameworks",
    url: "https://www.caseinterview.com/",
    category: "Interview",
    type: "Doc",
    difficulty: "Intermediate",
    time: "Varies",
    why: "Strategy-case frameworks that transfer directly to PM strategy rounds.",
  },
  {
    id: "lib-i4",
    title: "GeeksforGeeks — Aptitude & Guesstimates",
    url: "https://www.geeksforgeeks.org/aptitude/",
    category: "Interview",
    type: "Doc",
    difficulty: "Beginner",
    time: "Varies",
    why: "Fast drills for guesstimate and quant-reasoning warm-ups.",
  },
];

// ───────────────────────────── DAILY / WEEKLY EXECUTION ─────────────────────────────
export const dailyHabits: ChecklistItem[] = [
  { id: "h-1", text: "Watch 1 video-first lesson before reading anything else on the topic" },
  { id: "h-2", text: "Convert what you watched into a written concept summary (5 lines)" },
  { id: "h-3", text: "Do 1 practice exercise or SQL problem" },
  { id: "h-4", text: "Answer 1 interview question out loud (record or say to a mirror)" },
  { id: "h-5", text: "1-line journal: what did I learn today?" },
];

export const weeklyHabits: ChecklistItem[] = [
  { id: "wh-1", text: "Finish all modules assigned to this week on the Roadmap page" },
  { id: "wh-2", text: "1 full mock interview (peer, senior, or self-recorded)" },
  { id: "wh-3", text: "Sunday: weekly review — what's behind schedule, what to cut" },
  { id: "wh-4", text: "Revisit 5 items in the Revision queue" },
  { id: "wh-5", text: "Ship 1 tangible artifact: PRD, dashboard, prototype, or write-up" },
  { id: "wh-6", text: "Post 1 LinkedIn note on something you learned this week" },
];

// ───────────────────────────── HELPERS ─────────────────────────────
export function collectIds(modules: { topics: ChecklistItem[] }[]): string[] {
  return modules.flatMap((m) => m.topics.map((t) => t.id));
}

export function collectPracticeIds(modules: { practice?: ChecklistItem[] }[]): string[] {
  return modules.flatMap((m) => (m.practice ?? []).map((t) => t.id));
}

export function moduleCompletion(m: Module, checks: Record<string, boolean>) {
  const ids = m.topics.map((t) => t.id);
  const done = ids.filter((id) => checks[id]).length;
  return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
}

// Recommend the next module: highest priority first (must > important > optional),
// prerequisites satisfied (>=80% of prerequisite topics checked), and not yet complete.
export function getNextModule(checks: Record<string, boolean>): Module | null {
  const order: Priority[] = ["must", "important", "optional"];
  const byId = new Map(allModules.map((m) => [m.id, m]));

  const prereqsSatisfied = (m: Module) => {
    if (!m.prerequisites || m.prerequisites.length === 0) return true;
    return m.prerequisites.every((pid) => {
      const pm = byId.get(pid);
      if (!pm) return true;
      const { pct } = moduleCompletion(pm, checks);
      return pct >= 80;
    });
  };

  for (const p of order) {
    const candidates = allModules.filter((m) => m.priority === p);
    for (const m of candidates) {
      const { pct } = moduleCompletion(m, checks);
      if (pct < 100 && prereqsSatisfied(m)) return m;
    }
  }
  return null;
}
