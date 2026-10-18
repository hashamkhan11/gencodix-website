import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, FileText, ShieldCheck } from "lucide-react";
import { Scoper } from "@/components/scoper";
import { SectionHead } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Scope your project with AI",
  description:
    "Describe your idea and get a suggested approach, timeline and budget range in about two minutes. Free, no sign-up.",
  alternates: { canonical: "/start" },
};

const points = [
  { icon: Clock, t: "About 2 minutes", d: "A few quick questions, then a written brief." },
  { icon: FileText, t: "A real brief", d: "Approach, phases, timeline and a budget range based on our actual pricing." },
  { icon: ShieldCheck, t: "No sign-up", d: "Only send your details if you want the team to follow up." },
];

export default function StartPage() {
  return (
    <section className="container-x grid gap-12 pt-16 lg:grid-cols-[1fr_1.5fr] lg:pt-20">
      <div>
        <SectionHead
          eyebrow="Project scoper"
          title="Turn your idea into a project brief."
          body="Our AI scoper asks what a senior engineer would ask on a first call, then writes up an approach and an honest budget range."
        />
        <ul className="mt-10 space-y-6">
          {points.map(({ icon: Icon, t, d }) => (
            <li key={t} className="flex gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium">{t}</p>
                <p className="mt-0.5 text-sm text-ink-2">{d}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs leading-relaxed text-ink-3">
          Estimates are indicative, not a binding quote. Conversations are processed by an AI model to generate the brief.
        </p>
      </div>
      <Suspense fallback={<div className="card min-h-[480px]" />}>
        <Scoper />
      </Suspense>
    </section>
  );
}
