import { z } from "zod";
import { sendLead } from "@/lib/send-lead";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  company: z.string().trim().max(160).optional(),
  service: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10).max(12000),
  source: z.enum(["contact", "scoper"]).default("contact"),
  website: z.string().max(500).optional(), // honeypot — real users leave it empty
});

export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`, 5, 10 * 60_000)) {
    return Response.json({ error: "Too many submissions. Please email us directly." }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  const { website, ...lead } = parsed.data;
  if (website) return Response.json({ ok: true }); // bot: pretend success

  const delivered = await sendLead(lead);
  if (!delivered) {
    return Response.json(
      { error: "We couldn't send your message right now. Please email or WhatsApp us instead." },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
