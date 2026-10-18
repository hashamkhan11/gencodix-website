// Portfolio content.
// "products" = real software our team has built and shipped (see `credit` for work done at an employer). Facts only: every claim
//   here can be checked in the public repo or the live product.
// "concept" = products Gencodix designed and prototyped to demonstrate capability.
//   They are labelled as concepts everywhere on the site — never present them as client work.
// "shipped" = earlier websites delivered for clients.

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  hue: string; // the product's own brand colour, used for glows
  cover: string; // 1280×640 banner
  shots: { src: string; alt: string; w: number; h: number; phone?: boolean }[];
  facts: { value: string; label: string }[];
  highlights: { title: string; body: string }[];
  stack: string[];
  links: { label: string; href: string; note?: string }[];
  service: string; // related service slug
  credit?: { short: string; long: string; org: string; orgUrl: string }; // set when built for an employer, not by Gencodix
};

export const products: Product[] = [
  {
    slug: "khatabol",
    name: "KhataBol",
    category: "WhatsApp AI bookkeeping",
    tagline: "Speak your khata. Traders send a text, a voice note or a photo on WhatsApp — the AI turns it into a ledger entry.",
    summary:
      "Small wholesale traders in Pakistan keep their books in a paper khata or in their heads. KhataBol lets them keep using the app they already live in: WhatsApp. They type in Roman Urdu, Urdu or English, send an Urdu voice note, or snap a photo of a parchi or a payment screenshot. The bot reads the entry back in plain words, the trader replies \"Haan\", and only then is it saved to the ledger. A Flutter app shows who owes what, stock in hand and profit, updating in real time.",
    hue: "#5eead4",
    cover: "/images/products/khatabol/banner.png",
    shots: [
      { src: "/images/products/khatabol/deals.png", alt: "KhataBol app: deals list with purchases, sales and commission filters", w: 1080, h: 2400, phone: true },
      { src: "/images/products/khatabol/profit.png", alt: "KhataBol app: monthly profit and loss breakdown in Roman Urdu", w: 1080, h: 2400, phone: true },
    ],
    facts: [
      { value: "3", label: "Ways to enter: text, voice, photo" },
      { value: "80+", label: "Automated tests, CI green" },
      { value: "2", label: "Languages: Roman Urdu & English" },
    ],
    highlights: [
      { title: "Confirm before save", body: "The AI never writes to the books on its own. Every entry is read back and saved only after the trader says \"Haan\"." },
      { title: "Voice and photo input", body: "Urdu voice notes are transcribed, and photos of handwritten parchis or payment screenshots are read into structured entries." },
      { title: "A ledger you can trust", body: "Balances, stock and profit are calculated in PostgreSQL with tests around every rule, not left to the language model." },
      { title: "Realtime dashboard app", body: "A Flutter app for parties, deals, stock and expenses that updates the moment a WhatsApp entry is confirmed." },
    ],
    stack: ["WhatsApp Cloud API", "Google Gemini", "Supabase", "PostgreSQL", "Flutter", "GitHub Actions"],
    links: [{ label: "Source on GitHub", href: "https://github.com/hashamkhan11/khatabol" }],
    service: "whatsapp-automation",
  },
  {
    slug: "propnest",
    name: "PropNest",
    category: "Real estate marketplace",
    tagline: "A full property marketplace: verified listings, map search, agent subscriptions and Stripe payments.",
    summary:
      "PropNest is a complete marketplace with four roles — buyers, agents, admins and a super admin. Buyers search on a map by radius or by drawing an area, compare homes side by side and get emailed when a saved search has new matches. Agents pay for featured listings and subscriptions through Stripe. Admins review listings, handle refunds and watch revenue in an analytics console.",
    hue: "#e8743b",
    cover: "/images/products/propnest/banner.png",
    shots: [
      { src: "/images/products/propnest/home.png", alt: "PropNest home page with search and featured property", w: 1440, h: 900 },
      { src: "/images/products/propnest/map-search.png", alt: "PropNest map search with clustered listings and filters", w: 1440, h: 900 },
      { src: "/images/products/propnest/admin-analytics.png", alt: "PropNest admin analytics: revenue, users and listings charts", w: 1440, h: 900 },
      { src: "/images/products/propnest/agent-dashboard.png", alt: "PropNest agent dashboard", w: 1440, h: 900 },
    ],
    facts: [
      { value: "4", label: "User roles" },
      { value: "Stripe", label: "Checkout, refunds, webhooks" },
      { value: "Level 5", label: "PHPStan static analysis" },
    ],
    highlights: [
      { title: "Map search that feels native", body: "Clustered markers, radius search around a point, and polygon search where buyers draw the area they want." },
      { title: "Payments end to end", body: "Stripe Checkout for featured listings and agent plans, with webhooks, refunds and an admin refund queue." },
      { title: "Saved searches and alerts", body: "Buyers save a search and get an email when new listings match, sent by queued background jobs." },
      { title: "Built to be maintained", body: "Static analysis at PHPStan level 5, an automated test suite in CI, Docker deploys and an MIT licence." },
    ],
    stack: ["Laravel 13", "Livewire 3", "Tailwind CSS", "Stripe", "Leaflet", "Chart.js", "Docker"],
    links: [
      { label: "Source on GitHub", href: "https://github.com/hashamkhan11/propnest" },
    ],
    service: "saas-mvp-development",
  },
  {
    slug: "fithub",
    name: "FitHub",
    category: "Multi-tenant gym platform + IoT",
    tagline: "From the front desk to the front door: a staff dashboard, a member app and a door controller, for many gyms on one platform.",
    summary:
      "FitHub runs a gym end to end. Staff manage members, plans, classes, payments and trainers from a web dashboard. Members use a Flutter app to check in with a QR code, book classes (with waitlists), track body measurements and get push notifications. An ESP32 controller on the gym door unlocks from the member's phone or a fingerprint. Many gyms share one platform, each with its own data, billed through Stripe.",
    hue: "#f45d2c",
    cover: "/images/products/fithub/banner.png",
    shots: [
      { src: "/images/products/fithub/dashboard.webp", alt: "FitHub staff dashboard with check-ins chart, plan and status breakdown", w: 1328, h: 1184 },
      { src: "/images/products/fithub/feature.png", alt: "FitHub — run your gym from one app", w: 1024, h: 500 },
    ],
    facts: [
      { value: "3", label: "Apps: web, mobile, firmware" },
      { value: "Live", label: "On Google Play" },
      { value: "Multi", label: "Tenant: many gyms, one platform" },
    ],
    highlights: [
      { title: "Hardware in the loop", body: "ESP32 firmware on the door polls the platform every second and unlocks for a phone tap or a registered fingerprint." },
      { title: "Member app on Google Play", body: "QR check-in, class booking with waitlists, body measurement tracking and push notifications, built in Flutter." },
      { title: "Multi-tenant SaaS", body: "Each gym gets its own isolated workspace, and a platform admin bills gyms through Stripe." },
      { title: "Front-desk ready", body: "Attendance, bookings, trainers, plans, payments and PDF receipts in one Livewire dashboard." },
    ],
    stack: ["Laravel", "Livewire", "Flutter", "ESP32 / C++", "Stripe", "Firebase Messaging"],
    links: [
      { label: "Live platform", href: "https://fithub.ranksol.net/" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ranksol.fithub_app" },
      { label: "Source on GitHub", href: "https://github.com/hashamkhan11/fit-hub" },
    ],
    service: "saas-mvp-development",
    credit: {
      short: "Built at Ranksol",
      long: "Built by our founder as a software engineer at Ranksol. FitHub is a Ranksol product, shown here as an example of our team's hands-on experience.",
      org: "Ranksol",
      orgUrl: "https://ranksol.net",
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type MockKind = "whatsapp" | "dashboard" | "docs" | "voice" | "agent";

export type Concept = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  mock: MockKind;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  targets: { value: string; label: string }[];
  service: string; // related service slug
};

export const concepts: Concept[] = [
  {
    slug: "clinicflow",
    name: "ClinicFlow",
    category: "WhatsApp AI receptionist",
    tagline: "Bookings, reminders and patient questions handled on WhatsApp — 24/7, in three languages.",
    mock: "whatsapp",
    problem:
      "Clinics lose bookings when the phone isn't answered, and front-desk staff spend hours on the same five questions.",
    solution:
      "An AI receptionist on the clinic's WhatsApp number. It reads the live calendar, books and reschedules, sends reminders, answers questions from the clinic's own policies and hands over to staff with full context.",
    features: [
      "Live calendar availability & instant booking",
      "Automatic reminders with one-tap confirm / reschedule",
      "Answers from clinic-approved FAQs only",
      "English, Arabic and Urdu replies",
      "Staff inbox with one-click takeover",
    ],
    stack: ["WhatsApp Cloud API", "Claude", "Next.js", "Supabase", "Google Calendar"],
    targets: [
      { value: "< 5s", label: "Reply time" },
      { value: "24/7", label: "Availability" },
      { value: "−30%", label: "No-show target" },
    ],
    service: "whatsapp-automation",
  },
  {
    slug: "shipdesk",
    name: "ShipDesk",
    category: "Logistics SaaS",
    tagline: "Multi-tenant dispatch platform with AI-predicted delivery times and exception alerts.",
    mock: "dashboard",
    problem:
      "Small freight operators run dispatch on spreadsheets and phone calls, so late deliveries are discovered when the customer complains.",
    solution:
      "A SaaS dispatch board: jobs, drivers and vehicles in one place, live status from the driver app, and an AI layer that predicts late deliveries and drafts the customer update before anyone asks.",
    features: [
      "Multi-tenant workspaces with roles",
      "Drag-and-drop dispatch board",
      "AI ETA prediction & late-delivery alerts",
      "Customer tracking links",
      "Stripe subscription billing",
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Prisma", "Stripe", "Claude"],
    targets: [
      { value: "1 screen", label: "All active jobs" },
      { value: "Real-time", label: "Driver status" },
      { value: "SaaS", label: "Subscription-ready" },
    ],
    service: "saas-mvp-development",
  },
  {
    slug: "documind",
    name: "DocuMind",
    category: "Private knowledge assistant",
    tagline: "Ask anything about your company's documents — every answer cites its source.",
    mock: "docs",
    problem:
      "Answers live in hundreds of PDFs, wikis and drives. People ask colleagues instead, and get different answers.",
    solution:
      "A private assistant connected to the company's documents with role-based access. It answers in plain language, cites the exact paragraph, and says \"I don't know\" instead of guessing.",
    features: [
      "Connectors for Drive, Notion, Confluence & PDFs",
      "Answers with clickable citations",
      "Permission-aware retrieval",
      "Slack / Teams bot and web portal",
      "Accuracy dashboard with evaluation set",
    ],
    stack: ["Claude", "pgvector", "Python", "Next.js", "Slack API"],
    targets: [
      { value: "100%", label: "Answers cited" },
      { value: "RBAC", label: "Access control" },
      { value: "Self-host", label: "Deploy option" },
    ],
    service: "ai-knowledge-assistants",
  },
  {
    slug: "leadpilot",
    name: "LeadPilot",
    category: "AI sales agent",
    tagline: "Researches every inbound lead, scores it, drafts the reply and books the call.",
    mock: "agent",
    problem:
      "Inbound leads wait hours for a reply while sales reps research them manually — and the best ones book with a faster competitor.",
    solution:
      "An agent that triggers on each new lead: enriches the company, scores fit against the ideal customer profile, drafts a personalised reply for approval, and books a meeting on the rep's calendar.",
    features: [
      "Company & contact enrichment",
      "ICP scoring with explanation",
      "Draft replies with human approval",
      "Calendar booking",
      "HubSpot / Pipedrive sync",
    ],
    stack: ["Claude", "MCP", "n8n", "HubSpot API", "TypeScript"],
    targets: [
      { value: "Minutes", label: "Lead → reply" },
      { value: "Human", label: "Approves sends" },
      { value: "Full", label: "Audit log" },
    ],
    service: "ai-agents-automation",
  },
  {
    slug: "voxa",
    name: "Voxa",
    category: "Voice AI agent",
    tagline: "A phone agent that answers calls, takes reservations and follows up by SMS.",
    mock: "voice",
    problem:
      "Restaurants and service businesses miss calls at peak hours — every missed call is a lost booking.",
    solution:
      "A voice agent on the business number that understands natural speech, checks availability, confirms the booking and sends an SMS summary. Complex calls transfer to a human.",
    features: [
      "Natural voice conversation",
      "Real-time availability lookup",
      "SMS / WhatsApp confirmation",
      "Warm transfer to staff",
      "Call transcripts & analytics",
    ],
    stack: ["Realtime voice API", "Claude", "Twilio", "Node.js"],
    targets: [
      { value: "0", label: "Missed calls" },
      { value: "Multi", label: "Language" },
      { value: "Live", label: "Transfer" },
    ],
    service: "ai-agents-automation",
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    category: "AI bookkeeping SaaS",
    tagline: "Snap a receipt or forward an invoice — Ledgerly categorises it and keeps the books current.",
    mock: "dashboard",
    problem:
      "Small business owners fall months behind on bookkeeping and only find cash-flow problems when it's too late.",
    solution:
      "A bookkeeping app where documents are extracted by AI, categorised, matched to bank transactions and summarised into a weekly cash-flow view.",
    features: [
      "Receipt & invoice extraction",
      "Bank feed matching",
      "Weekly cash-flow summary",
      "Accountant access",
      "Mobile capture app",
    ],
    stack: ["Next.js", "Flutter", "Claude", "Postgres", "Plaid"],
    targets: [
      { value: "Seconds", label: "Per receipt" },
      { value: "Weekly", label: "Cash summary" },
      { value: "Web + App", label: "Platforms" },
    ],
    service: "saas-mvp-development",
  },
];

export type Shipped = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  stack: string[];
  url?: string;
  images: string[];
};

export const shipped: Shipped[] = [
  {
    slug: "aqualux",
    name: "Aqualux Dewatering",
    category: "Company website",
    summary: "Service-company website presenting dewatering services, completed projects and enquiry paths.",
    stack: ["WordPress", "Custom theme"],
    url: "https://aqualuxdw.com/",
    images: [
      "/images/projects/aqualux/aqualux-home-page.webp",
      "/images/projects/aqualux/aqualux-service-page.webp",
      "/images/projects/aqualux/aqualux-projects-page.webp",
    ],
  },
  {
    slug: "mis-events",
    name: "MIS Events & Tours",
    category: "Events & travel website",
    summary: "Multi-page site for an events and tours agency with packages, gallery and enquiry form.",
    stack: ["React", "Vite", "Tailwind CSS"],
    url: "https://missevents.netlify.app/",
    images: [
      "/images/projects/miseventandtour/misevent-home.webp",
      "/images/projects/miseventandtour/misevent-packages.webp",
      "/images/projects/miseventandtour/misevent-services.webp",
    ],
  },
  {
    slug: "fine-dine",
    name: "Fine Dine",
    category: "Restaurant website",
    summary: "Fine-dining restaurant site with menu, story, reviews and reservation enquiry.",
    stack: ["React", "Vite", "Tailwind CSS"],
    images: [
      "/images/projects/finedine/fine-dine-home.webp",
      "/images/projects/finedine/fine-dine-special.webp",
      "/images/projects/finedine/fine-dine-reviews.webp",
    ],
  },
];

export const mobileConcepts = [
  { name: "Salon booking app", image: "/images/projects/mobile-projects/beauty-salon-booking-app.webp", stack: "Flutter · Firebase" },
  { name: "Food ordering app", image: "/images/projects/mobile-projects/fast-food-restaurant-app.webp", stack: "Flutter · REST API" },
  { name: "Furniture store app", image: "/images/projects/mobile-projects/furniture-shopping-app.webp", stack: "Flutter · Stripe" },
];

export const getConcept = (slug: string) => concepts.find((c) => c.slug === slug);
