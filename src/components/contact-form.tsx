"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { services } from "@/content/services";

const budgets = ["Under $3k", "$3k – $10k", "$10k – $25k", "$25k+", "Not sure yet"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    for (const k of Object.keys(data)) if (data[k] === "") delete data[k];
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-start p-8" role="status">
        <CheckCircle2 size={28} className="text-accent" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">Thanks — we&apos;ve got it.</h2>
        <p className="mt-2 leading-relaxed text-ink-2">
          A senior engineer will reply within one business day, usually with a few questions and times for a short call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Name *</span>
          <input name="name" required maxLength={120} autoComplete="name" className="field" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Work email *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Company</span>
          <input name="company" maxLength={160} autoComplete="organization" className="field" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium">Budget</span>
          <select name="budget" defaultValue="" className="field">
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">What do you need?</span>
        <select name="service" defaultValue="" className="field">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
          <option>Something else</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium">Tell us about the project *</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What you want to build or automate, the tools you use today, and your timeline."
          className="field resize-y"
        />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
        {status === "sending" ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
