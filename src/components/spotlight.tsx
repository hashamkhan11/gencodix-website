"use client";

import { useRef } from "react";

/** Lights up any `.spot` card inside it at the pointer position (see globals.css). */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const frame = useRef(0);

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return; // no hover glow on touch screens
        const root = e.currentTarget;
        const { clientX, clientY } = e;
        // At most one update per animation frame, however fast the pointer events arrive.
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          for (const el of root.querySelectorAll<HTMLElement>(".spot")) {
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${clientX - r.left}px`);
            el.style.setProperty("--my", `${clientY - r.top}px`);
          }
        });
      }}
    >
      {children}
    </div>
  );
}
