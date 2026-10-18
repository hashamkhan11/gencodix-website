// Product mockups for concept builds — rendered in HTML/CSS so they stay crisp and themeable.
import { Check, CheckCheck, FileText, Mic, PhoneIncoming, Search, Sparkles, TriangleAlert } from "lucide-react";
import type { MockKind } from "@/content/work";

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[10px] text-ink-3">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function WhatsAppMock() {
  const msgs: { me?: boolean; text: string; time: string }[] = [
    { text: "Hi, can I book a cleaning with Dr. Sara this week?", time: "09:41" },
    { me: true, text: "Of course! Dr. Sara has Thu 4:30 PM or Fri 11:00 AM free. Which works?", time: "09:41" },
    { text: "Thursday please", time: "09:42" },
    { me: true, text: "Booked ✅ Thu 4:30 PM with Dr. Sara. I'll remind you the day before. Reply R to reschedule.", time: "09:42" },
  ];
  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[28px] border-[6px] border-ink bg-[#efeae2] shadow-xl dark:bg-[#0b141a]">
      <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2.5 text-white">
        <div className="grid size-7 place-items-center rounded-full bg-white/20 text-[11px] font-semibold">CF</div>
        <div className="leading-tight">
          <p className="text-[12px] font-semibold">Bright Smile Clinic</p>
          <p className="text-[10px] opacity-80">AI assistant · online</p>
        </div>
      </div>
      <div className="space-y-2 p-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-lg px-2.5 py-1.5 text-[11.5px] leading-snug text-[#111b21] shadow-sm ${
                m.me ? "bg-[#d9fdd3] dark:bg-[#005c4b] dark:text-white" : "bg-white dark:bg-[#202c33] dark:text-white"
              }`}
            >
              {m.text}
              <span className="ml-1.5 inline-flex items-center gap-0.5 align-bottom text-[9px] opacity-60">
                {m.time}
                {m.me && <CheckCheck size={11} className="text-[#53bdeb]" />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardMock({ variant = "shipdesk" }: { variant?: string }) {
  const isLedger = variant === "ledgerly";
  const stats = isLedger
    ? [
        { k: "Cash in", v: "$48,210" },
        { k: "Cash out", v: "$31,940" },
        { k: "To review", v: "6" },
      ]
    : [
        { k: "Active jobs", v: "128" },
        { k: "On time", v: "94.2%" },
        { k: "At risk", v: "3" },
      ];
  const rows = isLedger
    ? [
        { a: "AWS invoice", b: "Software", c: "$1,240", ok: true },
        { a: "Uber receipt", b: "Travel", c: "$38", ok: true },
        { a: "Office Depot", b: "Supplies", c: "$212", ok: true },
        { a: "Unknown transfer", b: "Needs review", c: "$900", ok: false },
      ]
    : [
        { a: "JOB-4821 · Dallas → Austin", b: "In transit", c: "ETA 14:20", ok: true },
        { a: "JOB-4822 · Houston → Waco", b: "Loading", c: "ETA 16:05", ok: true },
        { a: "JOB-4817 · Plano → Tyler", b: "Predicted late", c: "+42 min", ok: false },
        { a: "JOB-4823 · Irving → Frisco", b: "Delivered", c: "13:02", ok: true },
      ];
  const bars = isLedger ? [40, 55, 48, 62, 58, 70, 66, 78] : [62, 70, 66, 80, 76, 88, 84, 92];
  return (
    <Frame title={isLedger ? "app.ledgerly.io/overview" : "app.shipdesk.io/dispatch"}>
      <div className="grid grid-cols-[90px_1fr] text-[11px]">
        <aside className="space-y-1.5 border-r border-line bg-surface-2 p-2.5 text-ink-3">
          <p className="mb-2 font-semibold text-ink">{isLedger ? "Ledgerly" : "ShipDesk"}</p>
          {(isLedger ? ["Overview", "Inbox", "Banking", "Reports"] : ["Dispatch", "Drivers", "Fleet", "Billing"]).map((n, i) => (
            <p key={n} className={i === 0 ? "rounded bg-brand-soft px-1.5 py-1 text-brand" : "px-1.5 py-1"}>
              {n}
            </p>
          ))}
        </aside>
        <div className="space-y-2.5 p-3">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.k} className="rounded-lg border border-line p-2">
                <p className="text-[9.5px] text-ink-3">{s.k}</p>
                <p className="text-sm font-semibold">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="flex h-14 items-end gap-1.5 rounded-lg border border-line p-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="divide-y divide-line rounded-lg border border-line">
            {rows.map((r) => (
              <div key={r.a} className="flex items-center justify-between gap-2 px-2 py-1.5">
                <span className="truncate">{r.a}</span>
                <span className={`shrink-0 ${r.ok ? "text-ink-3" : "font-medium text-[#d97706]"}`}>
                  {!r.ok && <TriangleAlert size={10} className="mr-1 inline" />}
                  {r.b} · {r.c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function DocsMock() {
  return (
    <Frame title="ask.documind.ai">
      <div className="space-y-3 p-4 text-[12px]">
        <div className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-ink-3">
          <Search size={13} />
          What is our refund window for annual plans?
        </div>
        <div className="rounded-lg bg-surface-2 p-3 leading-relaxed">
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-brand">
            <Sparkles size={11} /> Answer
          </p>
          Annual plans can be refunded in full within <b>30 days</b> of purchase. After 30 days, refunds are
          pro-rated for unused months<sup className="text-brand">[1]</sup>. Enterprise contracts follow their
          signed MSA instead<sup className="text-brand">[2]</sup>.
        </div>
        <div className="space-y-1.5">
          {["Billing-Policy-v4.pdf · p.3", "MSA-Template-2026.docx · §8.2"].map((s, i) => (
            <div key={s} className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1.5 text-[11px] text-ink-2">
              <span className="font-mono text-brand">[{i + 1}]</span>
              <FileText size={12} className="text-ink-3" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VoiceMock() {
  const wave = [30, 55, 80, 45, 90, 60, 35, 70, 95, 50, 40, 75, 85, 45, 30, 60, 80, 40, 55, 25];
  return (
    <Frame title="voxa · live call">
      <div className="space-y-3 p-4 text-[12px]">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 font-medium">
            <PhoneIncoming size={14} className="text-accent" /> +1 (415) ··· 0192
          </p>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">00:47</span>
        </div>
        <div className="flex h-12 items-center gap-[3px]">
          {wave.map((h, i) => (
            <div key={i} className="flex-1 rounded-full bg-brand" style={{ height: `${h}%`, opacity: 0.35 + h / 160 }} />
          ))}
        </div>
        <div className="space-y-2 leading-snug">
          <p><span className="text-ink-3">Caller:</span> Table for four tomorrow around eight?</p>
          <p>
            <span className="text-brand">Voxa:</span> I have 7:45 or 8:30 tomorrow. Shall I book 8:30 for four
            under your name?
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-accent">
            <Check size={12} /> Booking confirmed · SMS sent
          </p>
        </div>
        <div className="flex items-center gap-2 border-t border-line pt-2 text-[10px] text-ink-3">
          <Mic size={11} /> Transcribing · English
        </div>
      </div>
    </Frame>
  );
}

export function AgentMock() {
  const steps = [
    { t: "New lead · maria@northwind.co", d: "Form: \"Need help automating invoice processing\"", done: true },
    { t: "Enriched company", d: "Northwind · Logistics · 120 staff · US", done: true },
    { t: "Scored 86/100", d: "Matches ICP: size, industry, clear pain", done: true },
    { t: "Drafted reply", d: "Awaiting approval from Alex", done: false },
  ];
  return (
    <Frame title="leadpilot · run #2193">
      <ol className="space-y-0 p-4 text-[12px]">
        {steps.map((s, i) => (
          <li key={s.t} className="relative flex gap-3 pb-3 last:pb-0">
            {i < steps.length - 1 && <span className="absolute left-[9px] top-5 h-full w-px bg-line" />}
            <span
              className={`relative grid size-[19px] shrink-0 place-items-center rounded-full ${
                s.done ? "bg-accent text-brand-ink" : "border-2 border-brand bg-surface"
              }`}
            >
              {s.done && <Check size={11} strokeWidth={3} />}
            </span>
            <div>
              <p className="font-medium">{s.t}</p>
              <p className="text-[11px] text-ink-3">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex gap-2 border-t border-line p-3">
        <span className="rounded-full bg-ink px-3 py-1 text-[11px] text-bg">Approve & send</span>
        <span className="rounded-full border border-line px-3 py-1 text-[11px] text-ink-2">Edit draft</span>
      </div>
    </Frame>
  );
}

export function ConceptMock({ kind, slug }: { kind: MockKind; slug?: string }) {
  switch (kind) {
    case "whatsapp":
      return <WhatsAppMock />;
    case "dashboard":
      return <DashboardMock variant={slug} />;
    case "docs":
      return <DocsMock />;
    case "voice":
      return <VoiceMock />;
    case "agent":
      return <AgentMock />;
  }
}
