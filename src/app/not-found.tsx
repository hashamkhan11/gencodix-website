import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-start py-32">
      <p className="eyebrow">404</p>
      <h1 className="h-section mt-3">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-lg text-ink-2">It may have moved when we rebuilt the site.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/services" className="btn-ghost">See services</Link>
      </div>
    </section>
  );
}
