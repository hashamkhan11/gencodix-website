import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{site.description}</p>
          <p className="mt-4 text-xs text-ink-3">{site.location}</p>
        </div>

        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-ink-2 hover:text-ink">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/work" className="text-ink-2 hover:text-ink">Work</Link></li>
            <li><Link href="/work/khatabol" className="text-ink-2 hover:text-ink">KhataBol</Link></li>
            <li><Link href="/work/propnest" className="text-ink-2 hover:text-ink">PropNest</Link></li>
            <li><Link href="/work/fithub" className="text-ink-2 hover:text-ink">FitHub</Link></li>
            <li><Link href="/about" className="text-ink-2 hover:text-ink">About</Link></li>
            <li><Link href="/#future" className="text-ink-2 hover:text-ink">What&apos;s next in AI</Link></li>
            <li><Link href="/start" className="text-ink-2 hover:text-ink">AI project scoper</Link></li>
            <li><Link href="/contact" className="text-ink-2 hover:text-ink">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Talk to us</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="text-ink-2 hover:text-ink">{site.email}</a></li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">
                WhatsApp {site.phone}
              </a>
            </li>
            <li><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">LinkedIn</a></li>
            <li><a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-ink">GitHub</a></li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-3">{site.hours}</p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="text-sheen pointer-events-none select-none text-center font-display text-[22vw] font-bold leading-[0.8] tracking-[-0.06em] opacity-[0.14] lg:text-[15rem]"
      >
        gencodix
      </p>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-3 sm:flex-row sm:justify-between">
          <p>© {site.name}. All rights reserved.</p>
          <p>Projects marked &ldquo;Concept&rdquo; are in-house builds that demonstrate capability, not client work.</p>
        </div>
      </div>
    </footer>
  );
}
