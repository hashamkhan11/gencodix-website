import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { scoperSystemPrompt } from "@/lib/scoper-prompt";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { ERROR_SENTINEL, REFUSAL_SENTINEL } from "@/lib/scope-protocol";

const schema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(4000) }))
    .min(1)
    .max(16)
    .refine((m) => m[0].role === "user" && m[m.length - 1].role === "user", "Conversation must start and end with the user"),
});

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "The scoper is offline right now. Please use the contact form." }, { status: 503 });
  }
  if (!rateLimit(`scope:${clientIp(req)}`, 30, 60 * 60_000)) {
    return Response.json({ error: "You've reached the scoper limit for now. Please use the contact form." }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid conversation." }, { status: 400 });
  }

  const stream = client.beta.messages.stream(
    {
      model: "claude-opus-5-5",
      max_tokens: 2000,
      output_config: { effort: "low" },
      system: scoperSystemPrompt,
      messages: parsed.data.messages,
      // If the model declines, the API retries on Anthropic's recommended fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    },
    { signal: req.signal },
  );

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") controller.enqueue(encoder.encode(REFUSAL_SENTINEL));
      } catch (err) {
        if (!req.signal.aborted) {
          if (err instanceof Anthropic.RateLimitError) console.error("[scope] rate limited by API");
          else if (err instanceof Anthropic.AuthenticationError) console.error("[scope] invalid ANTHROPIC_API_KEY");
          else if (err instanceof Anthropic.APIError) console.error("[scope] API error", err.status, err.message);
          else console.error("[scope]", err);
          controller.enqueue(encoder.encode(ERROR_SENTINEL));
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
