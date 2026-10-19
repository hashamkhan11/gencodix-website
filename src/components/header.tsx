"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#future", label: "What's next" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/[0.08] bg-surface/80 pl-5 pr-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-2 transition hover:bg-white/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/start" className="btn-primary py-2">
            <Sparkles size={15} aria-hidden="true" />
            Scope my project
          </Link>
        </div>

        <button
          type="button"
          className="mr-1 rounded-full p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-surface md:hidden">
          <div className="flex flex-col px-5 py-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="py-3 text-base text-ink-2">
                {item.label}
              </Link>
            ))}
            <Link href="/start" onClick={close} className="btn-primary mt-3">
              <Sparkles size={15} aria-hidden="true" />
              Scope my project
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
