import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, Mail, MessageCircle, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { ContactForm } from "@/components/contact-form";
import { SectionHead } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project. A senior engineer replies within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-x grid gap-12 pt-16 lg:grid-cols-[1fr_1.3fr] lg:pt-24">
      <div>
        <SectionHead
          eyebrow="Contact"
          title="Let's talk about what you're building."
          body="Share a few details and a senior engineer replies within one business day. No sales scripts."
        />
        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex gap-3">
            <Mail size={18} className="mt-0.5 text-brand" aria-hidden="true" />
            <a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a>
          </li>
          <li className="flex gap-3">
            <MessageCircle size={18} className="mt-0.5 text-brand" aria-hidden="true" />
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              WhatsApp {site.phone}
            </a>
          </li>
          {site.bookingUrl && (
            <li className="flex gap-3">
              <CalendarDays size={18} className="mt-0.5 text-brand" aria-hidden="true" />
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Book a 30-minute call
              </a>
            </li>
          )}
          <li className="flex gap-3 text-ink-2">
            <Clock size={18} className="mt-0.5 text-brand" aria-hidden="true" />
            {site.hours}
          </li>
        </ul>
        <div className="card mt-10 p-5">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles size={16} className="text-brand" aria-hidden="true" /> Not sure how to describe it?
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
            Our AI scoper asks the right questions and turns your idea into a short brief with a budget range.
          </p>
          <Link href="/start" className="btn-ghost mt-4">Try the project scoper</Link>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
