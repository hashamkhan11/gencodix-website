import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, horizon } from "@/content/services";
import { concepts, products } from "@/content/work";
import { usd } from "@/content/site";
import { ConceptCard, CtaBand, Faq, ProductCard, SectionHead } from "@/components/blocks";

const homeFaq = [
  {
    q: "How much does a project cost?",
    a: "Most AI automation projects start between $1,800 and $4,000; SaaS MVPs from $9,000. After a short scoping call you get a fixed price per milestone — no hourly surprises.",
  },
  {
    q: "We're in the US / UK / Gulf. How does the time difference work?",
    a: "Our working day overlaps UK mornings and US East Coast mornings, and the Gulf almost fully. You get a weekly demo, a shared Slack or WhatsApp channel and written progress updates, so nothing waits on a meeting.",
  },
  {
    q: "Who owns the code and the AI setup?",
    a: "You do — code, prompts, data and cloud accounts are yours from day one. We build model-agnostic so you're never locked into one AI vendor, or into us.",
  },
  {
    q: "Is our data safe with AI?",
    a: "We use enterprise API terms where your data is not used for training, keep data in your own cloud where needed, and design permissions so the AI only sees what it should.",
  },
  {
    q: "Can I see real work, not just mockups?",
    a: "Yes. KhataBol and PropNest are real products we built end to end, and FitHub is a live gym platform our founder built as an engineer at Ranksol. All three have public source code on GitHub, and our concept builds are clearly labelled as concepts.",
  },
  {
    q: "What happens after launch?",
    a: "Optional care plans cover monitoring, fixes, model upgrades and a monthly block of improvements. Or we hand over everything with documentation and your team takes it from there.",
  },
];

const process = [
  { n: "01", t: "Scope", d: "A 30-minute call and a written proposal: what we'll build, what it costs, how we'll measure success.", tag: "Day 1–3" },
  { n: "02", t: "Prototype", d: "A working prototype with your real data in the first 1–2 weeks, so you can test the idea before committing further.", tag: "Week 1–2" },
  { n: "03", t: "Build", d: "Weekly demos, fixed-price milestones, automated tests and an evaluation suite that proves the AI works on your cases.", tag: "Week 2–8" },
  { n: "04", t: "Run & improve", d: "Launch, monitoring and cost tracking. We stay on to improve it — or hand it over cleanly with docs.", tag: "Ongoing" },
];

const reasons = [
  { t: "AI is core work", d: "Agents, retrieval and automation are what we do every day, not a chatbot bolted onto a web agency." },
  { t: "Senior engineers only", d: "The people on the call are the people writing the code." },
  { t: "Weeks, not quarters", d: "Small, scoped milestones and a working prototype early." },
  { t: "Fixed price per milestone", d: "You know the cost before work starts. Changes are quoted in writing." },
  { t: "Built for global teams", d: "English-first, with working hours that overlap the UK, US East Coast and Gulf." },
  { t: "You own everything", d: "Code, prompts, data and accounts are yours from day one. No lock-in." },
];

const textLink = "inline-flex shrink-0 items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pb-20 pt-16 sm:pt-24 lg:pb-24">
        <p className="eyebrow">Software studio for AI, automation and SaaS</p>
        <h1 className="h-display mt-5 max-w-4xl">
          We build software that takes repetitive work <em>off your team&apos;s plate.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          Gencodix designs and builds AI agents, WhatsApp automation, internal tools and SaaS products for companies in the
          US, UK, EU and Gulf. Senior engineers, fixed price per milestone, shipped in weeks.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/start" className="btn-primary">
            Start a project <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link href="/work" className="btn-ghost">
            See our work
          </Link>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {[
            { k: "Shipped products", v: "KhataBol, PropNest, FitHub" },
            { k: "Typical first release", v: "3 to 8 weeks" },
            { k: "Reply time", v: "Within 1 business day" },
          ].map((f) => (
            <div key={f.k}>
              <dt className="text-sm text-ink-3">{f.k}</dt>
              <dd className="mt-1 font-medium">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Real products */}
      <section className="border-t border-line py-24" id="products">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              eyebrow="Selected work"
              title="Real products, with public source code."
              body="Three products our team built end to end: AI bookkeeping on WhatsApp, a property marketplace with payments, and a gym platform with hardware in the loop (FitHub was built by our founder at Ranksol)."
            />
            <Link href="/work" className={textLink}>
              All work <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-14 space-y-20">
            {products.map((p, i) => (
              <ProductCard key={p.slug} p={p} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-line py-24" id="services">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHead
            eyebrow="Services"
            title="What we build."
            body="We focus on work where software pays for itself quickly, and we tell you honestly when it won't."
          />
          <ul className="border-t border-line">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-line">
                <Link href={`/services/${s.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <h3 className="text-lg font-semibold underline-offset-4 group-hover:underline">{s.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.summary}</p>
                  </div>
                  <p className="text-sm text-ink-2 sm:text-right">
                    From <span className="font-medium text-ink">{usd(s.from)}</span>
                    {s.unit ?? ""}
                    {s.weeks && <span className="block text-ink-3">{s.weeks} weeks</span>}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Concept builds */}
      <section className="border-t border-line py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead
              eyebrow="Concept builds"
              title="Ideas we have prototyped in-house."
              body="Working demos that show what is practical with today's AI. They are clearly labelled as concepts, never presented as client work."
            />
            <Link href="/work#concepts" className={textLink}>
              All concepts <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concepts.slice(0, 3).map((c) => (
              <ConceptCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-line py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="How we work"
            title="Four steps, the same on every project."
            body="You see working software early and pay per milestone, so the risk stays small."
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((p) => (
              <li key={p.n} className="border-t border-ink pt-5">
                <p className="text-sm text-ink-3">
                  {p.n} · {p.tag}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-line py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHead eyebrow="Why Gencodix" title="A small senior team that ships." />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {reasons.map(({ t, d }) => (
              <div key={t}>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Looking ahead */}
      <section id="future" className="scroll-mt-20 border-t border-line bg-surface-2 py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Looking ahead"
            title="Where we are investing next."
            body="Services we are building toward, based on where buyers are moving. If one fits your business, starting early is the advantage."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {horizon.map((h) => (
              <div key={h.when}>
                <p className="border-b border-line pb-3 text-sm font-medium">{h.when}</p>
                <ul className="mt-5 space-y-5">
                  {h.items.map((it) => (
                    <li key={it.name}>
                      <p className="font-medium">{it.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">{it.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x grid gap-12 pt-24 lg:grid-cols-[1fr_2fr]">
        <SectionHead eyebrow="FAQ" title="Common questions." />
        <Faq items={homeFaq} />
      </section>

      <CtaBand />
    </>
  );
}
