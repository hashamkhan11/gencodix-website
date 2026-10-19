"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUp, CheckCircle2, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { BRIEF_HEADING, ERROR_SENTINEL, REFUSAL_SENTINEL, type ChatMessage } from "@/lib/scope-protocol";
import { getService } from "@/content/services";

const starters = [
  "Answer our WhatsApp enquiries and book appointments automatically",
  "Let staff ask questions about our internal documents and policies",
  "Build an MVP for a SaaS idea I have",
  "Automate how we process invoices and update our accounting tool",
];

const REFUSAL_TEXT =
  "Sorry — I can't help with that one here. If it's a genuine project, please describe it on the contact form and an engineer will take a look.";
const ERROR_TEXT = "Something went wrong on our side. Please try again, or use the contact form.";

/** Minimal Markdown: headings, bullets and **bold** — enough for the brief. React escapes all text. */
function Markdown({ text }: { text: string }) {
  const inline = (s: string) =>
    s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
    );
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={`l${blocks.length}`} className="my-2 list-disc space-y-1 pl-5">
          {list.map((li, i) => <li key={i}>{inline(li)}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (/^[-*•]\s+/.test(t)) {
      list.push(t.replace(/^[-*•]\s+/, ""));
      continue;
    }
    flush();
    if (!t) continue;
    if (t.startsWith("#")) {
      blocks.push(
        <p key={blocks.length} className="mb-1 mt-4 text-base font-semibold first:mt-0">
          {t.replace(/^#+\s*/, "")}
        </p>,
      );
    } else {
      blocks.push(<p key={blocks.length} className="my-2 first:mt-0">{inline(t)}</p>);
    }
  }
  flush();
  return <>{blocks}</>;
}

export function Scoper() {
  const params = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Arriving from a service page (?service=…) pre-fills the first message.
  const [input, setInput] = useState(() => {
    const service = getService(params.get("service") ?? "");
    return service ? `I'm interested in ${service.name}. ` : "";
  });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const started = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);

  const hasBrief = messages.some((m) => m.role === "assistant" && m.content.includes(BRIEF_HEADING));

  async function send(text: string) {
    const content = text.trim().slice(0, 4000);
    if (!content || busy) return;
    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setNotice("");
    setBusy(true);

    const setReply = (reply: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: reply }]);

    try {
      const res = await fetch("/api/scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? ERROR_TEXT);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        if (reply.includes(REFUSAL_SENTINEL)) {
          // Discard any partial text from a declined response.
          reply = REFUSAL_TEXT;
          break;
        }
        if (reply.includes(ERROR_SENTINEL)) {
          reply = reply.replace(ERROR_SENTINEL, "").trim() || ERROR_TEXT;
          if (reply !== ERROR_TEXT) setNotice("The reply was cut short. You can ask it to continue.");
          break;
        }
        setReply(reply);
      }
      setReply(reply || ERROR_TEXT);
    } catch (err) {
      // Drop the failed turn so the conversation stays valid for the next attempt.
      setMessages((prev) => prev.slice(0, -2));
      setInput(content);
      setNotice(err instanceof Error ? err.message : ERROR_TEXT);
    } finally {
      setBusy(false);
    }
  }

  // Arriving from the home page form (?idea=…) starts the conversation once.
  // The ref guard matters: with Activity, effects re-run when the page becomes visible again.
  useEffect(() => {
    const idea = params.get("idea")?.trim();
    if (!idea || started.current) return;
    const t = setTimeout(() => {
      started.current = true;
      send(idea);
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  function reset() {
    setMessages([]);
    setInput("");
    setNotice("");
  }

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Sparkles size={15} className="text-brand" aria-hidden="true" /> Project scoper
        </p>
        {messages.length > 0 && (
          <button type="button" onClick={reset} disabled={busy} className="inline-flex items-center gap-1.5 text-xs text-ink-3 hover:text-ink disabled:opacity-50">
            <RotateCcw size={13} aria-hidden="true" /> Start over
          </button>
        )}
      </div>

      <div className="min-h-[360px] flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
        {messages.length === 0 ? (
          <div>
            <p className="text-ink-2">Describe what you want to build or automate. Or start with one of these:</p>
            <div className="mt-4 flex flex-col gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-md border border-line px-4 py-3 text-left text-sm text-ink-2 transition-colors hover:border-brand hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-wrap rounded-lg rounded-br-md bg-ink px-4 py-2.5 text-sm text-bg">{m.content}</p>
              </div>
            ) : (
              <div key={i} className="max-w-[92%] text-sm leading-relaxed">
                {m.content ? (
                  <div>
                    <Markdown text={m.content} />
                  </div>
                ) : (
                  <p className="flex items-center gap-2 text-ink-3">
                    <Loader2 size={14} className="animate-spin" aria-hidden="true" /> Thinking…
                  </p>
                )}
              </div>
            ),
          )
        )}
        <div ref={endRef} />
      </div>

      {notice && (
        <p className="border-t border-line bg-surface-2 px-5 py-2 text-xs text-ink-2" role="alert">
          {notice}
        </p>
      )}

      {hasBrief && !busy && <SendBrief messages={messages} />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-line p-3"
      >
        <label htmlFor="scoper-input" className="sr-only">Your message</label>
        <textarea
          id="scoper-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={2}
          maxLength={4000}
          placeholder={messages.length ? "Type your answer…" : "e.g. We get 200 WhatsApp enquiries a day and miss half of them"}
          className="field min-h-[48px] resize-none border-0 bg-transparent focus:border-0"
        />
        <button type="submit" disabled={busy || !input.trim() || messages.length >= 15} className="btn-brand size-11 shrink-0 p-0" aria-label="Send">
          {busy ? <Loader2 size={17} className="animate-spin" /> : <ArrowUp size={17} />}
        </button>
      </form>
    </div>
  );
}

function SendBrief({ messages }: { messages: ChatMessage[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const transcript = messages
      .map((m) => `${m.role === "user" ? "VISITOR" : "SCOPER"}:\n${m.content}`)
      .join("\n\n---\n\n")
      .slice(-11500);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || undefined,
          website: form.website || undefined,
          service: "AI project scoper brief",
          message: transcript,
          source: "scoper",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Couldn't send. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="flex items-center gap-2 border-t border-line bg-brand-soft px-5 py-4 text-sm" role="status">
        <CheckCircle2 size={17} className="text-accent" aria-hidden="true" />
        Brief sent. A senior engineer will reply within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-line bg-brand-soft p-4">
      <p className="text-sm font-medium">Send this brief to the Gencodix team</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <input name="name" required maxLength={120} placeholder="Name" autoComplete="name" aria-label="Name" className="field py-2.5" />
        <input name="email" type="email" required maxLength={200} placeholder="Work email" autoComplete="email" aria-label="Work email" className="field py-2.5" />
        <input name="company" maxLength={160} placeholder="Company (optional)" autoComplete="organization" aria-label="Company" className="field py-2.5" />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={status === "sending"} className="btn-primary py-2.5">
          {status === "sending" ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
          Send brief
        </button>
      </div>
      {status === "error" && <p className="mt-2 text-xs text-red-600" role="alert">{error}</p>}
    </form>
  );
}
