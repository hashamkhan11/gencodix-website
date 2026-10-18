import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { concepts, mobileConcepts, products, shipped } from "@/content/work";
import { ConceptBadge, ConceptCard, CtaBand, ProductCard, SectionHead } from "@/components/blocks";
import { Spotlight } from "@/components/spotlight";

export const metadata: Metadata = {
  title: "Work — shipped products, concept builds and client sites",
  description:
    "KhataBol, PropNest and FitHub — real products our team built and shipped — plus AI and SaaS concept builds and earlier client websites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="container-x pt-16 lg:pt-24">
        <p className="eyebrow">
          <span className="size-1.5 rounded-[2px] bg-brand" aria-hidden="true" /> Work
        </p>
        <h1 className="h-display mt-5 max-w-4xl">
          Shipped products, <em>not just slides.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          Three real products first — shipped, tested and open source. Then our concept lab: products we prototype in-house
          to show what today&apos;s AI can do, each clearly labelled.
        </p>
      </section>

      <Spotlight className="container-x mt-14 space-y-6">
        {products.map((p, i) => (
          <ProductCard key={p.slug} p={p} flip={i % 2 === 1} />
        ))}
      </Spotlight>

      <section id="concepts" className="container-x mt-32 scroll-mt-24">
        <SectionHead
          eyebrow="Concept lab"
          title="Built to show what's possible."
          body="Products we design and prototype in-house to demonstrate today's AI capabilities. Each one is a head start we can adapt for your business. Numbers on these pages are design targets, not client results."
        />
        <Spotlight className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((c) => (
            <ConceptCard key={c.slug} c={c} />
          ))}
        </Spotlight>
      </section>

      <section className="container-x mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Mobile" title="App design concepts." />
          <ConceptBadge />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {mobileConcepts.map((m) => (
            <figure key={m.name} className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-surface-2">
                <Image src={m.image} alt={`${m.name} — UI concept`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="p-5">
                <p className="font-semibold">{m.name}</p>
                <p className="mt-1 text-sm text-ink-3">{m.stack}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-x mt-28">
        <SectionHead
          eyebrow="Shipped for clients"
          title="Client websites."
          body="Earlier web projects delivered for small businesses."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {shipped.map((p) => (
            <article key={p.slug} className="card overflow-hidden">
              <div className="relative aspect-[16/10] bg-surface-2">
                <Image src={p.images[0]} alt={`${p.name} website`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" />
              </div>
              <div className="p-5">
                <p className="font-mono text-xs text-brand">{p.category}</p>
                <h3 className="mt-1.5 font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:text-brand">
                    Visit site <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Want one of these, built for your business?" />
    </>
  );
}
