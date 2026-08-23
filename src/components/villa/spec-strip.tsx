import type { ReactNode } from "react";

type SpecStripProps = {
  guests: number;
  bedrooms: number;
  bathrooms: number;
  className?: string;
};

const items: { label: string; path: ReactNode }[] = [
  {
    label: "Guests",
    path: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2.5 20c0-3.2 2.9-5.2 6.5-5.2s6.5 2 6.5 5.2" />
        <path d="M16.5 6.2a3 3 0 0 1 0 5.6M21.5 20c0-2.6-1.8-4.3-4.4-4.8" />
      </>
    ),
  },
  {
    label: "Bedrooms",
    path: (
      <>
        <path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
        <path d="M3 19h18" />
        <path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
        <path d="M6.5 10h11" />
      </>
    ),
  },
  {
    label: "Bathrooms",
    path: (
      <>
        <path d="M3 12h18v3.5A4.5 4.5 0 0 1 16.5 20h-9A4.5 4.5 0 0 1 3 15.5z" />
        <path d="M6 12V6.2A2.2 2.2 0 0 1 10.4 6" />
        <path d="M6 20l-1 2M18 20l1 2" />
      </>
    ),
  },
];

export function SpecStrip({ guests, bedrooms, bathrooms, className = "" }: SpecStripProps) {
  const values = [guests, bedrooms, bathrooms];
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-2 text-[13px] text-muted">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-[22px] w-[22px] shrink-0 text-primary lg:h-[26px] lg:w-[26px]"
          >
            {it.path}
          </svg>
          <span>
            <b className="font-medium text-foreground">{values[i]}</b> {it.label}
          </span>
        </span>
      ))}
    </div>
  );
}
