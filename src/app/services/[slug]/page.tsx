import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { getService, services } from "@/content/services";
import { concepts } from "@/content/work";
import { site, usd } from "@/content/site";
import { ServiceIcon } from "@/components/service-icon";
import { ConceptCard, CtaBand, Faq } from "@/components/blocks";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = concepts.filter((c) => c.service === s.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "Worldwide",
    offers: { "@type": "Offer", priceCurrency: "USD", price: s.from, description: `Starting price${s.unit ?? ""}` },
  };

  return (
    <>
      <section className="container-x pt-12 lg:pt-16">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
          <ArrowLeft size={15} aria-hidden="true" /> All services
        </Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                <ServiceIcon name={s.icon} size={22} />
              </span>
              <span className="chip">{s.kicker}</span>
            </div>
            <h1 className="h-display mt-6 !text-5xl sm:!text-6xl">{s.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">{s.summary}</p>
          </div>
          <aside className="card h-fit p-6">
            <p className="text-sm text-ink-2">
              From <span className="text-3xl font-semibold text-ink">{usd(s.from)}</span>
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
            <Link href={`/start?service=${s.slug}`} className="btn-primary mt-6 w-full">
              Scope my project
            </Link>
            <Link href="/contact" className="btn-ghost mt-2 w-full">
              Talk to an engineer
            </Link>
          </aside>
        </div>
      </section>

      <section className="container-x mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">What you get</p>
          <ul className="mt-5 space-y-3">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-3 border-b border-line pb-3">
                <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        {s.useCases.length > 0 && (
          <div>
            <p className="eyebrow">Where it pays off</p>
            <div className="mt-5 space-y-3">
              {s.useCases.map((u) => (
                <div key={u.title} className="card p-5">
                  <h3 className="font-semibold">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {s.stack.length > 0 && (
        <section className="container-x mt-16">
          <p className="eyebrow">Typical stack</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container-x mt-20">
          <p className="eyebrow">Concept builds for this service</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <ConceptCard key={c.slug} c={c} />
            ))}
          </div>
        </section>
      )}

      {s.faq.length > 0 && (
        <section className="container-x mt-20 max-w-4xl">
          <p className="eyebrow mb-4">FAQ</p>
          <Faq items={s.faq} />
        </section>
      )}

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
