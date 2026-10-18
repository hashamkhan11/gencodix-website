import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock, Code2, Globe2, Lock, Sparkles, Users } from "lucide-react";
import { services, horizon } from "@/content/services";
import { concepts, products } from "@/content/work";
import { usd } from "@/content/site";
import { ServiceIcon } from "@/components/service-icon";
import { HeroConsole } from "@/components/hero-console";
import { StackMarquee } from "@/components/marquee";
import { Spotlight } from "@/components/spotlight";
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
  { icon: Sparkles, t: "AI-native, not AI-curious", d: "Agents, RAG and automation are core work — not a chatbot bolted onto a web agency." },
  { icon: Code2, t: "Senior engineers only", d: "The people on the call are the people writing the code." },
  { icon: Clock, t: "Weeks, not quarters", d: "Small scoped milestones and a working prototype early." },
  { icon: Lock, t: "Fixed price per milestone", d: "You know the cost before work starts. Changes are quoted." },
  { icon: Globe2, t: "Built for global teams", d: "English-first, with hours that overlap the UK, US East and Gulf." },
  { icon: Users, t: "You own everything", d: "Code, prompts, data and accounts are yours. No lock-in." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[4.25rem] overflow-hidden pt-[4.25rem]">
        <div aria-hidden="true" className="aurora absolute inset-0 -z-10" />
        <div aria-hidden="true" className="grid-bg absolute inset-0 -z-10" />
        <div className="container-x grid items-center gap-14 pb-16 pt-14 lg:grid-cols-[1.12fr_1fr] lg:pb-24 lg:pt-24">
          <div className="rise">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pl-1 pr-3 text-xs text-ink-2 backdrop-blur transition hover:border-ink-3"
            >
              <span className="rounded-full bg-brand px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-ink">Shipped</span>
              KhataBol · PropNest · FitHub
              <ArrowRight size={13} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <h1 className="h-display mt-7">
              Software that does the work <em>while you sleep.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Gencodix is an AI-native software studio. We build AI agents, WhatsApp automation, chat-with-your-data
              assistants and SaaS products — fixed scope, senior engineers, shipped in weeks.
            </p>

            <form
              action="/start"
              className="mt-9 flex max-w-xl flex-col gap-2 rounded-2xl border border-line bg-surface/80 p-2 shadow-[0_20px_60px_-30px_rgba(198,244,50,0.35)] backdrop-blur focus-within:border-brand/60 sm:flex-row sm:rounded-full"
            >
              <label htmlFor="idea" className="sr-only">Describe what you want to build</label>
              <input
                id="idea"
                name="idea"
                maxLength={500}
                placeholder="e.g. Answer our WhatsApp enquiries and book appointments"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm placeholder:text-ink-3 focus:outline-none"
              />
              <button type="submit" className="btn-primary">
                <Sparkles size={15} aria-hidden="true" /> Scope it free
              </button>
            </form>
            <p className="mt-3 pl-1 text-xs text-ink-3">
              Our AI scoper suggests an approach, timeline and budget in about 2 minutes. No sign-up.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
              {["Fixed price per milestone", "You own the code", "Reply within 1 business day"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check size={15} className="text-brand" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rise mx-auto w-full max-w-lg [animation-delay:150ms]">
            <HeroConsole />
          </div>
        </div>

        <div className="container-x border-t border-line pb-2 pt-6">
          <StackMarquee />
        </div>
      </section>

      {/* Real products */}
      <section className="container-x mt-24" id="products">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Shipped products"
            title={<>Real software. <em>Shipped, tested, open source.</em></>}
            body="Three products our team built end to end — AI on WhatsApp, a payments marketplace, and SaaS with hardware in the loop (FitHub was built by our founder at Ranksol). Click through for the details, or check the code yourself."
          />
          <Link href="/work" className="btn-ghost shrink-0">
            All work <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <Spotlight className="mt-12 space-y-6">
          {products.map((p, i) => (
            <ProductCard key={p.slug} p={p} flip={i % 2 === 1} />
          ))}
        </Spotlight>
      </section>

      {/* Services bento */}
      <section className="container-x mt-32" id="services">
        <SectionHead
          eyebrow="What we build"
          title={<>Seven services. One goal: <em>less manual work, more revenue.</em></>}
          body="We focus on the work where AI and good software pay for themselves fastest — and we tell you honestly when they won't."
        />
        <Spotlight className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const wide = i === 0 || i === services.length - 1;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`spot reveal group card flex flex-col p-6 transition hover:-translate-y-0.5 ${wide ? "lg:col-span-2" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                    <ServiceIcon name={s.icon} size={20} />
                  </span>
                  <span className="chip">{s.kicker}</span>
                </div>
                <h3 className={`mt-6 font-display font-semibold tracking-tight ${wide ? "text-2xl sm:text-3xl" : "text-xl"}`}>{s.name}</h3>
                <p className={`mt-2 flex-1 text-sm leading-relaxed text-ink-2 ${wide ? "max-w-xl" : ""}`}>{s.summary}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="text-ink-2">
                    From <b className="font-display text-base text-ink">{usd(s.from)}</b>
                    {s.unit ?? ""}
                    {s.weeks && <span className="text-ink-3"> · {s.weeks} weeks</span>}
                  </span>
                  <span className="grid size-8 place-items-center rounded-full border border-line text-ink-3 transition group-hover:border-brand group-hover:bg-brand group-hover:text-brand-ink">
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </Spotlight>
      </section>

      {/* Concept lab */}
      <section className="container-x mt-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Concept lab"
            title="What we could build for you next."
            body="Products we designed and prototyped in-house to show what today's AI can do. Clearly labelled — we never pass off concepts as client work."
          />
          <Link href="/work#concepts" className="btn-ghost shrink-0">
            All concepts <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <Spotlight className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {concepts.slice(0, 3).map((c) => (
            <ConceptCard key={c.slug} c={c} />
          ))}
        </Spotlight>
      </section>

      {/* Process */}
      <section className="container-x mt-32 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="How we work"
            title={<>From idea to production <em>without the guesswork.</em></>}
            body="Four steps, the same on every project. You see working software early and pay per milestone, so the risk stays small."
          />
          <Link href="/start" className="btn-primary mt-8">
            <Sparkles size={15} aria-hidden="true" /> Start with step one
          </Link>
        </div>
        <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-gradient-to-b before:from-brand before:via-line before:to-transparent">
          {process.map((p) => (
            <li key={p.n} className="reveal relative flex gap-5">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface font-mono text-sm text-brand">
                {p.n}
              </span>
              <div className="card flex-1 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">{p.t}</h3>
                  <span className="chip">{p.tag}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Why us */}
      <section className="container-x mt-32">
        <SectionHead eyebrow="Why Gencodix" title="A small senior team that ships." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-bg p-7 transition hover:bg-surface">
              <Icon size={22} className="text-brand" aria-hidden="true" />
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future */}
      <section id="future" className="relative mt-32 scroll-mt-24 overflow-hidden border-y border-line py-28">
        <div aria-hidden="true" className="aurora absolute inset-0 -z-10 opacity-70" />
        <div className="container-x">
          <SectionHead
            eyebrow="What's next"
            title={<>Where software is going — and <em>how to get there first.</em></>}
            body="The services we're investing in, based on where buyers are moving. If one of these fits your business, being early is the advantage."
          />
          <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <div aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-brand via-violet to-transparent lg:block" />
            {horizon.map((h, i) => (
              <div key={h.when} className="reveal relative">
                <span
                  className={`relative z-10 block size-3.5 rounded-full border-2 border-bg ${i === 0 ? "live-dot bg-brand" : i === 1 ? "bg-violet" : "bg-ink-3"}`}
                />
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-ink-2">{h.when}</p>
                <ul className="mt-5 space-y-3">
                  {h.items.map((it) => (
                    <li key={it.name} className="card bg-surface/70 p-5 backdrop-blur">
                      <p className="font-display font-semibold">{it.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{it.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x mt-32 grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="FAQ" title="Questions buyers ask us first." />
        <Faq items={homeFaq} />
      </section>

      <CtaBand />
    </>
  );
}
