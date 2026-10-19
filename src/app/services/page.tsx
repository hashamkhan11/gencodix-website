import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { usd } from "@/content/site";
import { ServiceIcon } from "@/components/service-icon";
import { CtaBand, SectionHead } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Services — AI agents, WhatsApp automation, RAG, SaaS & apps",
  description:
    "AI agents and workflow automation, WhatsApp AI assistants, chat-with-your-data, SaaS MVPs, AI-ready websites and mobile apps. Fixed-price milestones, transparent starting prices.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pt-16 lg:pt-24">
        <SectionHead
          eyebrow="Services"
          title="What we build, what it costs, how long it takes."
          body="Every engagement starts with a short scoping phase and a fixed price per milestone. Starting prices below are typical — your quote depends on integrations and scale."
        />
      </section>

      <section className="container-x mt-14 space-y-4">
        {services.map((s) => (
          <article key={s.slug} className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-md bg-brand-soft text-brand">
                  <ServiceIcon name={s.icon} size={20} />
                </span>
                <span className="chip">{s.kicker}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">{s.name}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{s.summary}</p>
              <Link href={`/services/${s.slug}`} className="btn-ghost mt-6">
                Details & use cases <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-md bg-surface-2 p-5">
              <p className="text-sm text-ink-2">
                From <span className="text-2xl font-semibold text-ink">{usd(s.from)}</span>
                {s.unit ?? ""}
              </p>
              {s.weeks && <p className="mt-1 text-sm text-ink-3">Typical timeline: {s.weeks} weeks</p>}
              <ul className="mt-5 space-y-2.5 text-sm">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <CtaBand title="Not sure which service fits?" />
    </>
  );
}
