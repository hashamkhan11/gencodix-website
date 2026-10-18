// Single source of truth for company details, pricing and copy that changes often.
// Edit here; every page and the AI Project Scoper read from this file.

export const site = {
  name: "Gencodix",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gencodix.com",
  tagline: "AI-native software studio",
  description:
    "Gencodix designs and ships AI agents, automations, SaaS products and mobile apps for growing companies — fixed scope, senior engineers, weeks not quarters.",
  email: "contact@gencodix.com",
  phone: "+92 336 1542081",
  whatsapp: "923361542081",
  location: "Faisalabad, Pakistan · Working with teams in the US, UK, EU & Gulf",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  founder: {
    name: "Hasham Mubarak",
    role: "Founder & Lead Engineer",
    photo: "/images/profile/profile.webp",
  },
  socials: {
    github: "https://github.com/gencodix",
    linkedin: "https://linkedin.com/company/gencodix",
  },
  // Overlap hours shown on the site so international buyers see availability.
  hours: "Mon–Sat · 9:00–21:00 PKT (overlaps UK mornings & US East mornings)",
};

// Starting prices (USD). Shown on the site AND given to the AI Scoper so its
// estimates stay consistent with what you actually charge. Adjust freely.
export const pricing = {
  aiAgent: { from: 3500, weeks: "3–6" },
  whatsapp: { from: 1800, weeks: "2–4" },
  rag: { from: 4000, weeks: "3–5" },
  mvp: { from: 9000, weeks: "5–10" },
  web: { from: 2500, weeks: "2–5" },
  mobile: { from: 10000, weeks: "6–12" },
  carePlan: { from: 350, unit: "/month" },
} as const;

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
