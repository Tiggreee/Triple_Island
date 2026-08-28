"use client";

import { useState } from "react";

const SPARKS = [
  { top: "22%", left: "26%", size: 11 },
  { bottom: "24%", left: "44%", size: 8 },
  { top: "26%", right: "28%", size: 10 },
  { bottom: "20%", right: "14%", size: 7 },
] as const;

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div
      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,.9,.24,1)] motion-reduce:transition-none ${
        dismissed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
      }`}
    >
      <div className="relative isolate min-h-0 overflow-hidden bg-[linear-gradient(120deg,#f7fcfe,#eaf7fb_52%,#e4f5fb)]">
        <span className="cb-banner-blob-a pointer-events-none absolute left-[5%] -top-[18px] h-[74px] w-[230px] rounded-full bg-white [mix-blend-mode:screen] [filter:blur(17px)]" />
        <span className="cb-banner-blob-b pointer-events-none absolute bottom-[-22px] left-[36%] h-[60px] w-[170px] rounded-full bg-[rgba(120,214,242,.95)] [mix-blend-mode:screen] [filter:blur(17px)]" />
        <span className="cb-banner-blob-c pointer-events-none absolute right-[6%] -top-3 h-[66px] w-[210px] rounded-full bg-white [mix-blend-mode:screen] [filter:blur(17px)]" />
        <span className="cb-banner-glow pointer-events-none absolute inset-0 [background:linear-gradient(104deg,transparent_36%,rgba(255,255,255,.55)_50%,transparent_64%)]" />
        {SPARKS.map((s, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="#5bcaeb"
            aria-hidden="true"
            className="cb-banner-spark pointer-events-none absolute z-[5]"
            style={{ top: "top" in s ? s.top : undefined, bottom: "bottom" in s ? s.bottom : undefined, left: "left" in s ? s.left : undefined, right: "right" in s ? s.right : undefined, width: s.size, height: s.size, animationDelay: `${i * 1.1}s` }}
          >
            <path d="M12 0 C12.9 6.8 13.4 9.6 15.4 10.9 C17 11.9 19.6 11.4 24 12 C19.6 12.6 17 12.1 15.4 13.1 C13.4 14.4 12.9 17.2 12 24 C11.1 17.2 10.6 14.4 8.6 13.1 C7 12.1 4.4 12.6 0 12 C4.4 11.4 7 11.9 8.6 10.9 C10.6 9.6 11.1 6.8 12 0 Z" />
          </svg>
        ))}
        <div className="relative z-[8] mx-auto flex max-w-[1200px] items-center gap-3.5 px-6 py-3.5 sm:px-12">
          <span className="text-[13px] leading-relaxed tracking-[.6px] text-primary">
            <b className="font-semibold text-brand">Sargasso-free, all year long!</b> Our privileged location on the
            north shore of Isla Mujeres keeps the water clear.
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="ml-auto shrink-0 rounded-lg px-[7px] py-1 text-[17px] leading-none text-primary opacity-60 transition hover:bg-primary/[.09] hover:opacity-100"
          >
            &times;
          </button>
        </div>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] h-px opacity-75 [background:linear-gradient(90deg,transparent,#d6eff8_20%,var(--cb-color-brand)_50%,#d6eff8_80%,transparent)]" />
      </div>
    </div>
  );
}
