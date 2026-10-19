import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/content/site";
import { services } from "@/content/services";

const linkCls = "text-ink-2 transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{site.description}</p>
          <p className="mt-4 text-sm text-ink-3">{site.location}</p>
        </div>

        <div>
          <p className="text-sm font-medium">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkCls}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/work" className={linkCls}>Work</Link></li>
            <li><Link href="/work/khatabol" className={linkCls}>KhataBol</Link></li>
            <li><Link href="/work/propnest" className={linkCls}>PropNest</Link></li>
            <li><Link href="/work/fithub" className={linkCls}>FitHub</Link></li>
            <li><Link href="/about" className={linkCls}>About</Link></li>
            <li><Link href="/start" className={linkCls}>Project scoper</Link></li>
            <li><Link href="/contact" className={linkCls}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a></li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkCls}>
                WhatsApp {site.phone}
              </a>
            </li>
            <li><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn</a></li>
            <li><a href={site.socials.github} target="_blank" rel="noopener noreferrer" className={linkCls}>GitHub</a></li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-ink-3">{site.hours}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-ink-3 sm:flex-row sm:justify-between">
          <p>© {site.name}. All rights reserved.</p>
          <p>Projects marked &ldquo;Concept&rdquo; are in-house builds that demonstrate capability, not client work.</p>
        </div>
      </div>
    </footer>
  );
}
