import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { ConceptMock } from "./mocks";
import type { Concept, Product } from "@/content/work";
import { site } from "@/content/site";

export function SectionHead({ eyebrow, title, body, center }: { eyebrow: string; title: React.ReactNode; body?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-section mt-3">{title}</h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-ink-2">{body}</p>}
    </div>
  );
}

export function ConceptBadge() {
  return (
    <span className="concept-badge" title="In-house build that demonstrates capability — not client work">
      Concept build
    </span>
  );
}

export function ShippedBadge({ label = "Shipped" }: { label?: string }) {
  return <span className="real-badge">{label}</span>;
}

/** Showcase row for a real product. `flip` swaps image and text on desktop. */
export function ProductCard({ p, flip }: { p: Product; flip?: boolean }) {
  const outbound = p.links.find((l) => l.label !== "Source on GitHub") ?? p.links[0];
  return (
    <article className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <Link
        href={`/work/${p.slug}`}
        className={`block overflow-hidden rounded-lg border border-line bg-surface-2 ${flip ? "lg:order-2" : ""}`}
        aria-label={`${p.name} case study`}
      >
        <Image src={p.cover} alt={`${p.name} — ${p.category}`} width={1280} height={640} sizes="(min-width: 1024px) 620px, 100vw" className="h-auto w-full" />
      </Link>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <ShippedBadge />
          {p.credit && <span className="chip">{p.credit.short}</span>}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
        <p className="mt-1 text-sm text-ink-3">{p.category}</p>
        <p className="mt-4 leading-relaxed text-ink-2">{p.tagline}</p>
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {p.facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-xs leading-snug text-ink-3">{f.label}</dt>
              <dd className="text-lg font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
          <Link href={`/work/${p.slug}`} className="inline-flex items-center gap-1.5 text-ink underline-offset-4 hover:underline">
            Read the case study <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a href={outbound.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
            {outbound.label} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ConceptCard({ c }: { c: Concept }) {
  return (
    <Link href={`/work/${c.slug}`} className="group card flex flex-col overflow-hidden transition-colors hover:border-ink-3">
      <div className="flex min-h-[270px] items-center justify-center border-b border-line bg-surface-2 p-6">
        <div className="w-full max-w-[340px]">
          <ConceptMock kind={c.mock} slug={c.slug} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-3">{c.category}</p>
          <ConceptBadge />
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">{c.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{c.tagline}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium group-hover:underline group-hover:underline-offset-4">
          See how it works <ArrowRight size={15} aria-hidden="true" />
        </p>
      </div>
    </Link>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus size={18} className="shrink-0 text-ink-3 group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = "Tell us what you want to automate.", body }: { title?: string; body?: string }) {
  return (
    <section className="container-x mt-32">
      <div className="grid gap-8 rounded-lg bg-ink px-6 py-12 text-bg sm:px-12 sm:py-14 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-bg/70">
            {body ??
              "Describe your idea to our project scoper and get a suggested approach, timeline and budget range in a few minutes. A senior engineer follows up within one business day."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link href="/start" className="btn bg-bg text-ink hover:bg-bg/90">
            Start a project <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn border border-bg/25 text-bg hover:border-bg/60">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
