"use client";

/** Lights up any `.spot` card inside it at the pointer position (see globals.css). */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        for (const el of e.currentTarget.querySelectorAll<HTMLElement>(".spot")) {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      }}
    >
      {children}
    </div>
  );
}
