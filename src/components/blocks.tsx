import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Plus, Sparkles } from "lucide-react";
import { ConceptMock } from "./mocks";
import type { Concept, Product } from "@/content/work";
import { site } from "@/content/site";

export function SectionHead({ eyebrow, title, body, center }: { eyebrow: string; title: React.ReactNode; body?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">
        <span className="size-1.5 rounded-[2px] bg-brand" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="h-section mt-4">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-ink-2">{body}</p>}
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
  return (
    <span className="real-badge">
      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" /> {label}
    </span>
  );
}

/** Large showcase row for a real product. `flip` swaps image and text on desktop. */
export function ProductCard({ p, flip }: { p: Product; flip?: boolean }) {
  const outbound = p.links.find((l) => l.label !== "Source on GitHub") ?? p.links[0];
  return (
    <article className="spot reveal card grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
      <Link
        href={`/work/${p.slug}`}
        className={`group relative flex items-center overflow-hidden bg-surface-2 p-5 sm:p-8 ${flip ? "lg:order-2" : ""}`}
        aria-label={`${p.name} case study`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 transition duration-700 group-hover:opacity-70"
          style={{ background: `radial-gradient(28rem 18rem at 50% 110%, ${p.hue}, transparent 70%)` }}
        />
        <Image
          src={p.cover}
          alt={`${p.name} — ${p.category}`}
          width={1280}
          height={640}
          sizes="(min-width: 1024px) 600px, 100vw"
          className="relative rounded-xl shadow-2xl ring-1 ring-white/10 transition duration-700 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <ShippedBadge />
          {p.credit && <span className="chip">{p.credit.short}</span>}
          <span className="font-mono text-xs text-ink-3">{p.category}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{p.name}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{p.tagline}</p>
        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {p.facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end bg-surface p-3">
              <dt className="mt-0.5 text-[11px] leading-snug text-ink-3">{f.label}</dt>
              <dd className="font-display text-xl font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 5).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7 text-sm font-medium">
          <Link href={`/work/${p.slug}`} className="group/l inline-flex items-center gap-1.5 text-brand">
            Case study <ArrowRight size={15} className="transition group-hover/l:translate-x-0.5" aria-hidden="true" />
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
    <Link href={`/work/${c.slug}`} className="spot reveal group card flex flex-col overflow-hidden transition hover:-translate-y-1">
      <div className="relative flex min-h-[290px] items-center justify-center bg-surface-2 p-6">
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative w-full max-w-[360px] transition duration-500 group-hover:scale-[1.02]">
          <ConceptMock kind={c.mock} slug={c.slug} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-brand">{c.category}</p>
          <ConceptBadge />
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{c.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{c.tagline}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
          See how it works <ArrowRight size={15} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
        </p>
      </div>
    </Link>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group card px-5 open:border-ink-3/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:border-brand group-open:text-brand">
              <Plus size={15} aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-5 leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = "Tell us what you want to automate.", body }: { title?: string; body?: string }) {
  return (
    <section className="container-x mt-32">
      <div className="reveal relative overflow-hidden rounded-[2rem] border border-brand/30 bg-surface px-6 py-16 sm:px-14 sm:py-20">
        <div aria-hidden="true" className="grid-bg absolute inset-0" />
        <div aria-hidden="true" className="absolute -bottom-56 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(198,244,50,0.22),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="h-section text-sheen pb-1">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            {body ??
              "Describe your idea to our AI scoper and get a suggested approach, timeline and budget range in two minutes — then a senior engineer follows up within one business day."}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/start" className="btn-primary">
              <Sparkles size={15} aria-hidden="true" /> Scope my project
            </Link>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
