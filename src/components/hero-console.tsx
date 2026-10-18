"use client";

import { useEffect, useState } from "react";
import { CheckCheck, CornerDownRight, MessageCircle } from "lucide-react";

// One scripted agent run, replayed on a loop. Every row is always rendered (only faded),
// so the card never changes height while it plays.
const tools = [
  { call: "understand(message)", result: "booking · cleaning · Thu afternoon" },
  { call: "calendar.find_slots(thu, pm)", result: "3 free · picked 14:00" },
  { call: "calendar.book(14:00)", result: "confirmed · #A-2291" },
];
const LAST = tools.length + 2;

export function HeroConsole() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t = setTimeout(() => setStep(LAST), 0);
      return () => clearTimeout(t);
    }
    let s = 0;
    const tick = () => {
      s = s >= LAST ? 0 : s + 1;
      setStep(s);
      t = setTimeout(tick, s === LAST ? 3800 : s === 0 ? 700 : 1150);
    };
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);

  const shown = (n: number) => (step >= n ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5");

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[3rem] bg-brand/10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="flex items-center gap-2 font-mono text-xs text-ink-2">
            <span className="live-dot size-2 rounded-full bg-brand" /> agent · run #4821
          </p>
          <p className="font-mono text-[11px] text-ink-3">whatsapp-receptionist</p>
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          <div className="flex gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#25d366]/15 text-[#25d366]">
              <MessageCircle size={15} />
            </span>
            <div className="rounded-2xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm">
              <p className="font-mono text-[10px] text-ink-3">incoming · WhatsApp</p>
              <p className="mt-0.5">Hi! Can I book a cleaning on Thursday afternoon?</p>
            </div>
          </div>

          <ol className="space-y-1.5 border-l border-dashed border-line pl-4 ml-4">
            {tools.map((t, i) => (
              <li key={t.call} className={`transition duration-500 ${shown(i + 1)}`}>
                <p className="flex items-center gap-2 font-mono text-[12px] text-ink-2">
                  <CornerDownRight size={12} className="text-brand" aria-hidden="true" /> {t.call}
                </p>
                <p className="ml-5 font-mono text-[11px] text-brand/90">✓ {t.result}</p>
              </li>
            ))}
          </ol>

          <div className={`flex justify-end gap-3 transition duration-500 ${shown(tools.length + 1)}`}>
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand px-3.5 py-2.5 text-sm text-brand-ink">
              Done! You&apos;re booked for <b>Thu, 2:00 PM</b>. I&apos;ll send a reminder the day before.
              <CheckCheck size={13} className="ml-1 inline align-[-2px]" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-3 border-t border-line font-mono text-[11px] transition duration-500 ${shown(LAST)}`}>
          {[
            { k: "reply time", v: "4.2s" },
            { k: "model cost", v: "$0.004" },
            { k: "staff needed", v: "0" },
          ].map((m) => (
            <div key={m.k} className="border-r border-line px-4 py-3 last:border-r-0">
              <p className="text-ink-3">{m.k}</p>
              <p className="mt-0.5 text-sm text-ink">{m.v}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-ink-3">Illustrative run of an AI receptionist we build</p>
    </div>
  );
}
