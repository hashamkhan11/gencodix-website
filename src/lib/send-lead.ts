import { site } from "@/content/site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Lead = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  source: "contact" | "scoper";
};

/** Emails the lead to the team via Resend. Returns false if delivery isn't configured or fails. */
export async function sendLead(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL ?? site.email;
  const from = process.env.LEAD_FROM_EMAIL ?? "Gencodix Website <leads@gencodix.com>";

  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY is not set — lead not delivered:", lead.email);
    return false;
  }

  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Source", lead.source === "scoper" ? "AI project scoper" : "Contact form"],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${escape(v!)}</td></tr>`)
    .join("");

  const html = `<table>${rows}</table><hr/><pre style="white-space:pre-wrap;font-family:inherit">${escape(lead.message)}</pre>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New ${lead.source === "scoper" ? "scoped project" : "enquiry"}: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[lead] Resend error", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
