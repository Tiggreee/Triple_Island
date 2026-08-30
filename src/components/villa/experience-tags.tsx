import type { ReactNode } from "react";

type Experience = {
  key: string;
  label: string;
  icon: ReactNode;
};

const STROKE = { fill: "none", stroke: "var(--cb-color-primary, #246a94)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const FILL = { fill: "#5bcaeb", opacity: 0.24 };

const EXPERIENCES: Experience[] = [
  {
    key: "yoga",
    label: "Yoga & Wellness",
    icon: (
      <svg viewBox="0 0 56 56" className="h-[46px] w-[46px] overflow-visible min-[621px]:h-14 min-[621px]:w-14" aria-hidden="true">
        <circle cx={28} cy={14} r={6} {...FILL} className="cb-fl" />
        <circle cx={28} cy={15} r={4.2} {...STROKE} />
        <path d="M28 20v10" {...STROKE} />
        <path d="M18 26c4 2.6 6.5 4 10 4s6-1.4 10-4" {...STROKE} />
        <path d="M28 30c-5 1.6-8 5.5-9 10h18c-1-4.5-4-8.4-9-10z" {...STROKE} />
        <path d="M10 46c4-2.6 8-2.6 12 0s8 2.6 12 0 8-2.6 12 0" {...STROKE} />
      </svg>
    ),
  },
  {
    key: "boat",
    label: "Private Boat Transfers",
    icon: (
      <svg viewBox="0 0 56 56" className="h-[46px] w-[46px] overflow-visible min-[621px]:h-14 min-[621px]:w-14" aria-hidden="true">
        <path d="M8 36h40l-6 10H14z" {...FILL} className="cb-fl" />
        <path d="M8 36h40l-6 10H14z" {...STROKE} />
        <path d="M28 34V10" {...STROKE} />
        <path d="M28 13l14 17H28" {...STROKE} />
        <path d="M25 30H13l12-13" {...STROKE} />
        <path d="M6 50c4-2.4 8-2.4 12 0s8 2.4 12 0 8-2.4 12 0" {...STROKE} />
      </svg>
    ),
  },
  {
    key: "chef",
    label: "Private Chef Dinners",
    icon: (
      <svg viewBox="0 0 56 56" className="h-[46px] w-[46px] overflow-visible min-[621px]:h-14 min-[621px]:w-14" aria-hidden="true">
        <path d="M16 20a7 7 0 0 1 5-11 8 8 0 0 1 14 0 7 7 0 0 1 5 11v6H16z" {...FILL} className="cb-fl" />
        <path d="M16 21a7 7 0 0 1 4.6-12A8 8 0 0 1 35.4 9 7 7 0 0 1 40 21v5H16z" {...STROKE} />
        <path d="M16 26v10h24V26" {...STROKE} />
        <path d="M16 36h24" {...STROKE} />
        <path d="M22 30v3M28 30v3M34 30v3" {...STROKE} />
        <path d="M24 44c1.4-1.2.6-2.6 0-3.6" {...STROKE} />
        <path d="M32 44c1.4-1.2.6-2.6 0-3.6" {...STROKE} />
      </svg>
    ),
  },
  {
    key: "events",
    label: "Weddings & Events",
    icon: (
      <svg viewBox="0 0 56 56" className="h-[46px] w-[46px] overflow-visible min-[621px]:h-14 min-[621px]:w-14" aria-hidden="true">
        <path d="M12 14h14l-5 12h-4z" {...FILL} className="cb-fl" />
        <path d="M11 13h16l-6 13h-4z" {...STROKE} />
        <path d="M19 26v14" {...STROKE} />
        <path d="M13 40h12" {...STROKE} />
        <path d="M29 13h16l-6 13h-4z" {...STROKE} />
        <path d="M37 26v14" {...STROKE} />
        <path d="M31 40h12" {...STROKE} />
      </svg>
    ),
  },
  {
    key: "excursions",
    label: "Excursions & Activities",
    icon: (
      <svg viewBox="0 0 56 56" className="h-[46px] w-[46px] overflow-visible min-[621px]:h-14 min-[621px]:w-14" aria-hidden="true">
        <path d="M11 18h34v10a7 7 0 0 1-7 7h-4l-6-6-6 6h-4a7 7 0 0 1-7-7z" {...FILL} className="cb-fl" />
        <path d="M11 19h34v9a7 7 0 0 1-7 7h-3.5L28 29l-6.5 6H18a7 7 0 0 1-7-7z" {...STROKE} />
        <path d="M45 24h4a4 4 0 0 1 4 4v6" {...STROKE} />
        <path d="M8 46c4-2.4 8-2.4 12 0s8 2.4 12 0 8-2.4 12 0" {...STROKE} />
      </svg>
    ),
  },
  {
    key: "spa",
    label: "Spa & Massage",
    icon: (
      <svg viewBox="0 0 56 56" className="h-[46px] w-[46px] overflow-visible min-[621px]:h-14 min-[621px]:w-14" aria-hidden="true">
        <path d="M28 34C23 28 22 19 28 11C34 19 33 28 28 34Z" {...FILL} className="cb-fl" />
        <path d="M28 34C20 35.5 11.5 33 7 27C15 25 23 28.5 28 34Z" {...STROKE} />
        <path d="M28 34C21.5 31 16 25 15 17.5C21.5 19.5 26 26.5 28 34Z" {...STROKE} />
        <path d="M28 34C36 35.5 44.5 33 49 27C41 25 33 28.5 28 34Z" {...STROKE} />
        <path d="M28 34C34.5 31 40 25 41 17.5C34.5 19.5 30 26.5 28 34Z" {...STROKE} />
        <path d="M28 34C23 28 22 19 28 11C34 19 33 28 28 34Z" {...STROKE} />
        <path d="M8 44c4-2.4 8-2.4 12 0s8 2.4 12 0 8-2.4 12 0" {...STROKE} />
      </svg>
    ),
  },
];

export function ExperienceTags({ onInquire }: { onInquire: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-[10px] gap-y-[18px] min-[621px]:gap-x-[18px] min-[621px]:gap-y-[26px] min-[901px]:grid-cols-3 min-[901px]:gap-x-6 min-[901px]:gap-y-9">
      {EXPERIENCES.map((x) => (
        <button
          key={x.key}
          type="button"
          onClick={onInquire}
          className="group flex flex-col items-center gap-2.5 rounded-[14px] px-2 py-4 text-center text-foreground transition hover:bg-white min-[621px]:gap-3.5 min-[621px]:px-3.5 min-[621px]:py-[22px]"
        >
          <span className="[&_.cb-fl]:transition-opacity [&_.cb-fl]:duration-300 group-hover:[&_.cb-fl]:opacity-[.42]">{x.icon}</span>
          <b className="text-[11px] font-semibold uppercase leading-[1.5] tracking-[1.2px] min-[621px]:text-[12.5px] min-[621px]:tracking-[1.85px]">
            {x.label}
          </b>
        </button>
      ))}
    </div>
  );
}
