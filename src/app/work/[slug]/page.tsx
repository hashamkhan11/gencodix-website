import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { concepts, getConcept, getProduct, products, type Concept, type Product } from "@/content/work";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { ConceptMock } from "@/components/mocks";
import { ConceptBadge, CtaBand, ShippedBadge } from "@/components/blocks";

export function generateStaticParams() {
  return [...products, ...concepts].map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (p) {
    return {
      title: `${p.name} — ${p.category}`,
      description: p.tagline,
      alternates: { canonical: `/work/${p.slug}` },
      openGraph: { images: [{ url: p.cover, width: 1280, height: 640, alt: p.name }] },
    };
  }
  const c = getConcept(slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.category} (concept)`,
    description: c.tagline,
    alternates: { canonical: `/work/${c.slug}` },
  };
}

export default async function WorkItemPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (p) return <ProductPage p={p} />;
  const c = getConcept(slug);
  if (!c) notFound();
  return <ConceptPage c={c} />;
}

function BackLink() {
  return (
    <Link href="/work" className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
      <ArrowLeft size={15} aria-hidden="true" /> All work
    </Link>
  );
}

function ProductPage({ p }: { p: Product }) {
  const service = getService(p.service);
  const phones = p.shots.filter((s) => s.phone);
  const screens = p.shots.filter((s) => !s.phone);
  const live = p.links.find((l) => l.label !== "Source on GitHub");
  const note = p.links.find((l) => l.note)?.note;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    description: p.tagline,
    applicationCategory: "BusinessApplication",
    image: `${site.url}${p.cover}`,
    author: p.credit
      ? { "@type": "Organization", name: p.credit.org, url: p.credit.orgUrl }
      : { "@type": "Organization", name: site.name, url: site.url },
    ...(live && { url: live.href }),
  };

  return (
    <>
      <section className="relative -mt-[4.25rem] overflow-hidden pt-[4.25rem]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-30"
          style={{ background: `radial-gradient(50rem 30rem at 80% -10%, ${p.hue}, transparent 65%)` }}
        />
        <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
        <div className="container-x pt-10 lg:pt-14">
          <BackLink />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShippedBadge />
            <p className="font-mono text-xs text-ink-2">{p.category}</p>
          </div>
          <h1 className="h-display mt-5">{p.name}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-ink-2">{p.tagline}</p>
          {p.credit && (
            <p className="mt-4 max-w-3xl rounded-xl border border-line bg-surface/70 px-4 py-3 text-sm leading-relaxed text-ink-2">
              {p.credit.long}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={i === 0 ? "btn-primary" : "btn-ghost"}>
                {l.label} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
          {note && <p className="mt-3 text-xs text-ink-3">{note}</p>}

          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute -inset-x-16 -bottom-20 top-1/4 -z-10 opacity-25" style={{ background: `radial-gradient(closest-side, ${p.hue}, transparent)` }} />
            <Image
              src={p.cover}
              alt={`${p.name} — ${p.category}`}
              width={1280}
              height={640}
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {p.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse bg-surface p-6">
                <dt className="mt-1 text-sm text-ink-3">{f.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-x mt-24 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow">
            <span className="size-1.5 rounded-[2px] bg-brand" aria-hidden="true" /> The product
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          {service && (
            <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              Related service: {service.name} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
        <p className="text-xl leading-relaxed text-ink">{p.summary}</p>
      </section>

      <section className="container-x mt-20 grid gap-4 sm:grid-cols-2">
        {p.highlights.map((h, i) => (
          <div key={h.title} className="reveal card p-7">
            <p className="font-mono text-xs text-brand">0{i + 1}</p>
            <h2 className="mt-3 font-display text-xl font-semibold">{h.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-2">{h.body}</p>
          </div>
        ))}
      </section>

      <section className="container-x mt-24">
        <p className="eyebrow">
          <span className="size-1.5 rounded-[2px] bg-brand" aria-hidden="true" /> Screens from the real product
        </p>
        {screens.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {screens.map((s) => (
              <figure key={s.src} className="reveal overflow-hidden rounded-2xl border border-line bg-surface-2 p-2">
                <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(min-width: 768px) 550px, 100vw" className="h-auto w-full rounded-xl" />
              </figure>
            ))}
          </div>
        )}
        {phones.length > 0 && (
          <div className="mt-8 flex justify-center gap-5 rounded-3xl border border-line bg-surface-2 p-6 sm:gap-10 sm:p-12">
            {phones.map((s) => (
              <figure key={s.src} className="reveal w-[46%] max-w-[260px] overflow-hidden rounded-[1.75rem] border-[5px] border-[#1c1f25] shadow-2xl">
                <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="260px" className="h-auto w-full" />
              </figure>
            ))}
          </div>
        )}
      </section>

      <CtaBand
        title={`Want something like ${p.name}?`}
        body="Tell us about your business. We'll tell you honestly what to build first, what it costs and how long it takes."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

function ConceptPage({ c }: { c: Concept }) {
  const service = getService(c.service);

  return (
    <>
      <section className="container-x pt-10 lg:pt-14">
        <BackLink />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs text-brand">{c.category}</p>
              <ConceptBadge />
            </div>
            <h1 className="h-display mt-5">{c.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">{c.tagline}</p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              {c.targets.map((t) => (
                <div key={t.label} className="card flex flex-col-reverse p-4">
                  <dt className="text-xs text-ink-3">{t.label}</dt>
                  <dd className="mb-1 font-display text-lg font-semibold">{t.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-ink-3">Design targets for this concept, not measured client results.</p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-2 p-6 sm:p-10">
            <div aria-hidden="true" className="grid-bg absolute inset-0" />
            <div className="relative">
              <ConceptMock kind={c.mock} slug={c.slug} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-20 grid gap-6 md:grid-cols-2">
        <div className="card p-6 sm:p-8">
          <p className="eyebrow">The problem</p>
          <p className="mt-4 text-lg leading-relaxed">{c.problem}</p>
        </div>
        <div className="card border-brand/30 p-6 sm:p-8">
          <p className="eyebrow">The solution</p>
          <p className="mt-4 text-lg leading-relaxed">{c.solution}</p>
        </div>
      </section>

      <section className="container-x mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">Key features</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {c.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Stack</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.stack.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          {service && (
            <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              Related service: {service.name} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      <CtaBand
        title={`Want a ${c.name} for your business?`}
        body="This concept is a head start. We adapt it to your data, tools and workflow — usually faster and cheaper than building from zero."
      />
    </>
  );
}
