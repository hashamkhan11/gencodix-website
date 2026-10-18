import { site, usd } from "@/content/site";
import { services } from "@/content/services";
import { concepts, products } from "@/content/work";

// Plain-text summary for AI assistants and answer engines (llms.txt convention).
// Prerendered at build time: no request data is read.
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} is a small senior software studio based in Faisalabad, Pakistan, working with companies in the US, UK, EU and Gulf. Engagements are fixed-price per milestone; clients own all code and data.

## Services

${services
  .map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.summary} From ${usd(s.from)}${s.unit ?? ""}${s.weeks ? `, typically ${s.weeks} weeks` : ""}.`)
  .join("\n")}

## Shipped products

${products
  .map((p) => `- [${p.name}](${site.url}/work/${p.slug}): ${p.category}. ${p.tagline}${p.credit ? ` ${p.credit.long}` : ""} Stack: ${p.stack.join(", ")}. ${p.links.map((l) => `${l.label}: ${l.href}`).join("; ")}.`)
  .join("\n")}

## Concept builds (in-house demonstrations, not client work)

${concepts.map((c) => `- [${c.name}](${site.url}/work/${c.slug}): ${c.category}. ${c.tagline}`).join("\n")}

## Contact

- Project scoper: ${site.url}/start
- Contact: ${site.url}/contact
- Email: ${site.email}
- WhatsApp: ${site.phone}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
