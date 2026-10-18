const stack = [
  "Claude",
  "Gemini",
  "WhatsApp Cloud API",
  "Next.js",
  "Laravel",
  "Livewire",
  "Flutter",
  "Supabase",
  "PostgreSQL",
  "pgvector",
  "Stripe",
  "MCP",
  "n8n",
  "ESP32",
  "Docker",
  "TypeScript",
];

export function StackMarquee() {
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <ul className="marquee flex w-max gap-10">
        {[...stack, ...stack].map((s, i) => (
          <li key={i} aria-hidden={i >= stack.length} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-ink-3">
            {s}
            <span className="size-1 rounded-full bg-line" />
          </li>
        ))}
      </ul>
    </div>
  );
}
