import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { CtaBand, SectionHead } from "@/components/blocks";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a small senior engineering studio building AI agents, automation and SaaS for companies in the US, UK, EU and Gulf.`,
  alternates: { canonical: "/about" },
};

const principles = [
  { t: "Honest scoping", d: "If AI isn't the right tool for your problem, we'll say so — even if it means a smaller project." },
  { t: "Measured, not guessed", d: "Every AI system ships with an evaluation set so you can see how well it works on your real cases." },
  { t: "Small milestones", d: "Fixed-price chunks of 1–3 weeks. You see working software early and can stop at any milestone." },
  { t: "No lock-in", d: "Your code, your cloud, your data. We build model-agnostic and document everything." },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-x grid gap-14 pt-16 lg:grid-cols-[1.3fr_1fr] lg:pt-24">
        <div>
          <SectionHead
            eyebrow="About"
            title="A small studio of engineers who like shipping."
            body="Gencodix started as a web and mobile studio. Today our focus is the work that changes how businesses run: AI agents, automation, private knowledge assistants and SaaS products."
          />
          <div className="mt-8 max-w-2xl space-y-4 leading-relaxed text-ink-2">
            <p>
              We&apos;re a deliberately small team. That means the engineer on your discovery call is the engineer
              who designs your system and writes the code — no account managers, no hand-offs.
            </p>
            <p>
              We work with founders and operations teams in the US, UK, Europe and the Gulf. Our day overlaps UK
              mornings and US East Coast mornings, and almost all of the Gulf working day, so communication stays
              fast without late-night calls.
            </p>
          </div>
        </div>
        <figure className="card h-fit overflow-hidden">
          <div className="relative aspect-[4/5] bg-surface-2">
            <Image src={site.founder.photo} alt={site.founder.name} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="p-5">
            <p className="font-semibold">{site.founder.name}</p>
            <p className="text-sm text-ink-3">{site.founder.role}</p>
          </figcaption>
        </figure>
      </section>

      <section className="container-x mt-24">
        <SectionHead eyebrow="How we work" title="Four principles we don't bend." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.t} className="card p-6">
              <p className="text-sm text-ink-3">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Let's see if we're a fit." />
    </>
  );
}
