import { pricing } from "./site";

export type Service = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  icon: "agent" | "chat" | "docs" | "rocket" | "globe" | "phone" | "shield";
  from: number;
  unit?: string;
  weeks?: string;
  outcomes: string[];
  deliverables: string[];
  useCases: { title: string; body: string }[];
  stack: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-agents-automation",
    name: "AI Agents & Workflow Automation",
    kicker: "Most requested",
    summary:
      "Agents that do real work inside your tools — qualifying leads, processing documents, updating your CRM and handing off to humans when it matters.",
    icon: "agent",
    from: pricing.aiAgent.from,
    weeks: pricing.aiAgent.weeks,
    outcomes: [
      "Hours of repetitive ops work removed every week",
      "Faster response times without adding headcount",
      "Every action logged, reviewable and reversible",
    ],
    deliverables: [
      "Process mapping & automation opportunity audit",
      "Production agent with tool access to your systems",
      "Human-in-the-loop approvals for risky actions",
      "Evaluation suite so quality is measured, not guessed",
      "Monitoring dashboard, cost tracking & handover docs",
    ],
    useCases: [
      { title: "Lead qualification", body: "Enrich inbound leads, score them, draft replies and book calls for the good ones." },
      { title: "Back-office documents", body: "Read invoices, POs and contracts, extract fields and post them to your accounting tool." },
      { title: "Support triage", body: "Answer the common questions, route the rest with full context to the right person." },
    ],
    stack: ["Claude", "OpenAI", "MCP", "n8n", "Python", "TypeScript", "Postgres"],
    faq: [
      { q: "Will the agent make mistakes?", a: "Any AI can. We design for it: narrow permissions, approval steps for anything irreversible, and an evaluation suite that catches regressions before your customers do." },
      { q: "Which AI model do you use?", a: "Whichever fits the job on quality, cost and data-residency. We build model-agnostic so you are never locked in." },
    ],
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp & Messaging Automation",
    kicker: "High ROI",
    summary:
      "AI assistants on WhatsApp Business that take orders, book appointments, send reminders and answer customers 24/7 in their own language.",
    icon: "chat",
    from: pricing.whatsapp.from,
    weeks: pricing.whatsapp.weeks,
    outcomes: [
      "Replies in seconds, around the clock",
      "Fewer no-shows with automatic reminders",
      "Orders and bookings captured straight into your system",
    ],
    deliverables: [
      "WhatsApp Business Platform setup & verification",
      "Conversational flows + AI for free-text questions",
      "Integration with your booking, POS or CRM",
      "Multilingual replies (English, Arabic, Urdu & more)",
      "Admin inbox for human takeover",
    ],
    useCases: [
      { title: "Clinics & salons", body: "Booking, rescheduling and reminders without a receptionist on the phone." },
      { title: "Restaurants & retail", body: "Menu browsing, ordering and payment links inside the chat." },
      { title: "Real estate", body: "Qualify buyers, share listings and schedule viewings automatically." },
    ],
    stack: ["WhatsApp Cloud API", "Claude", "Node.js", "Supabase", "Stripe"],
    faq: [
      { q: "Do I need a new phone number?", a: "Usually you can migrate your existing business number to the WhatsApp Business Platform. We handle the verification." },
      { q: "What does WhatsApp itself cost?", a: "Meta charges per conversation, typically cents each. We estimate this for your volume before you commit." },
    ],
  },
  {
    slug: "ai-knowledge-assistants",
    name: "Chat-With-Your-Data Assistants",
    kicker: "RAG",
    summary:
      "Private AI assistants that answer from your documents, policies and product data — with citations, permissions and no hallucinated answers.",
    icon: "docs",
    from: pricing.rag.from,
    weeks: pricing.rag.weeks,
    outcomes: [
      "New hires productive in days, not weeks",
      "Support answers that cite the exact source",
      "Knowledge that stays inside your infrastructure",
    ],
    deliverables: [
      "Ingestion of PDFs, Notion, Drive, Confluence, databases",
      "Retrieval pipeline with citations",
      "Role-based access so people only see what they should",
      "Web widget, Slack/Teams bot or internal portal",
      "Accuracy evaluation report",
    ],
    useCases: [
      { title: "Internal help desk", body: "HR, IT and policy questions answered instantly with links to the source document." },
      { title: "Customer self-service", body: "A product expert on your site that knows every manual and changelog." },
      { title: "Sales enablement", body: "Reps get accurate answers on pricing, specs and competitors mid-call." },
    ],
    stack: ["Claude", "pgvector", "LlamaIndex", "Next.js", "Python"],
    faq: [
      { q: "Is our data used to train AI models?", a: "No. We use enterprise API terms where your data is not used for training, and can deploy in your own cloud." },
    ],
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS & MVP Development",
    kicker: "For founders",
    summary:
      "From idea to paying users: a production-ready SaaS with auth, billing, dashboards and AI features built in — shipped in weeks.",
    icon: "rocket",
    from: pricing.mvp.from,
    weeks: pricing.mvp.weeks,
    outcomes: [
      "Launch in weeks with a codebase you can scale",
      "Billing, onboarding and analytics from day one",
      "You own 100% of the code and infrastructure",
    ],
    deliverables: [
      "Product scoping workshop & clickable prototype",
      "Multi-tenant web app with auth & roles",
      "Stripe subscriptions, invoices & usage billing",
      "Admin panel, analytics & error monitoring",
      "CI/CD, staging environment and launch support",
    ],
    useCases: [
      { title: "Vertical SaaS", body: "Software for one industry — clinics, logistics, construction, education." },
      { title: "AI-first products", body: "Products where AI is the core feature, not a bolt-on chatbot." },
      { title: "Internal tools to products", body: "Turn the tool you built for yourself into something you can sell." },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Prisma", "Stripe", "Vercel / AWS"],
    faq: [
      { q: "Fixed price or hourly?", a: "Fixed price per milestone after a short paid scoping phase. You always know the cost before work starts." },
      { q: "What happens after launch?", a: "You can take the code in-house, or keep us on a care plan for features and maintenance." },
    ],
  },
  {
    slug: "ai-ready-websites",
    name: "AI-Ready Websites",
    kicker: "GEO + SEO",
    summary:
      "Fast, conversion-focused websites engineered to be found and recommended by Google and AI answer engines like ChatGPT, Perplexity and Gemini.",
    icon: "globe",
    from: pricing.web.from,
    weeks: pricing.web.weeks,
    outcomes: [
      "Show up when buyers ask AI for a recommendation",
      "Sub-second load times and top Core Web Vitals",
      "Pages built around one goal: qualified enquiries",
    ],
    deliverables: [
      "Positioning & conversion copywriting",
      "Custom design — no templates",
      "Structured data, llms.txt and AI-crawler readiness",
      "CMS so your team can publish without a developer",
      "Analytics and lead tracking set up properly",
    ],
    useCases: [
      { title: "Service businesses", body: "Clear offers, proof and a booking flow that turns visitors into calls." },
      { title: "Product launches", body: "Landing pages that explain fast and convert on mobile." },
      { title: "Rebuilds", body: "Slow WordPress sites moved to a modern stack without losing SEO." },
    ],
    stack: ["Next.js", "Astro", "Sanity", "WordPress (headless)", "Vercel"],
    faq: [
      { q: "What is GEO?", a: "Generative Engine Optimization: structuring your content so AI assistants understand, trust and cite your business when people ask them for recommendations." },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    kicker: "iOS + Android",
    summary:
      "Cross-platform apps with native feel — bookings, commerce, field operations — with on-device AI where it adds real value.",
    icon: "phone",
    from: pricing.mobile.from,
    weeks: pricing.mobile.weeks,
    outcomes: [
      "One codebase, both app stores",
      "Offline-first for teams in the field",
      "Store submission and review handled for you",
    ],
    deliverables: [
      "UX flows & high-fidelity UI design",
      "Flutter or React Native app",
      "Backend API, push notifications & payments",
      "App Store & Play Store release",
      "Crash reporting and analytics",
    ],
    useCases: [
      { title: "Booking & commerce", body: "Salons, restaurants, retail — browse, book, pay." },
      { title: "Field operations", body: "Site reports, photo capture and sync for teams on the move." },
      { title: "Companion apps", body: "The mobile side of your SaaS product." },
    ],
    stack: ["Flutter", "React Native", "Firebase", "Supabase", "Node.js"],
    faq: [],
  },
  {
    slug: "care-plans",
    name: "Care Plans & Ongoing Development",
    kicker: "Retainer",
    summary:
      "Hosting, monitoring, security updates and a monthly block of development time — so your product keeps improving after launch.",
    icon: "shield",
    from: pricing.carePlan.from,
    unit: pricing.carePlan.unit,
    outcomes: [
      "Someone accountable when things break",
      "Steady improvements instead of big rewrites",
      "Predictable monthly cost",
    ],
    deliverables: [
      "Uptime & error monitoring",
      "Dependency and security updates",
      "Monthly development hours",
      "AI model upgrades and cost optimisation",
      "Monthly report",
    ],
    useCases: [],
    stack: [],
    faq: [],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

// What's next: shown on the home page "Future-ready" section.
export const horizon = [
  {
    when: "Now",
    items: [
      { name: "AI agents in daily operations", body: "Agents that read, decide and act inside your existing tools." },
      { name: "Conversational commerce", body: "Selling, booking and support inside WhatsApp and chat." },
      { name: "Private knowledge assistants", body: "Company knowledge answered instantly, with sources." },
    ],
  },
  {
    when: "Next 12 months",
    items: [
      { name: "Voice AI agents", body: "Phone agents that book, qualify and follow up — in multiple languages." },
      { name: "MCP connectors", body: "Making your software usable by Claude, ChatGPT and other AI assistants." },
      { name: "AI search visibility", body: "Being the business AI assistants recommend." },
    ],
  },
  {
    when: "2027 and beyond",
    items: [
      { name: "Agentic commerce", body: "Storefronts that AI shopping agents can browse, compare and buy from." },
      { name: "Multi-agent operations", body: "Teams of agents coordinating whole workflows with human oversight." },
      { name: "AI governance & evaluation", body: "Testing, auditing and monitoring AI systems as regulation arrives." },
    ],
  },
];
