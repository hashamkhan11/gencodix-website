"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink-2 transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/start" className="btn-primary">
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line md:hidden">
          <div className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className="border-b border-line py-3 text-base text-ink-2">
                {item.label}
              </Link>
            ))}
            <Link href="/start" onClick={close} className="btn-primary mt-4">
              Start a project
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
