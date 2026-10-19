import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="Gencodix home">
      <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" className="fill-ink" />
        <path
          d="M21.5 11.5a7 7 0 1 0 0 9V16h-5"
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-bg"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight">gencodix</span>
    </Link>
  );
}
