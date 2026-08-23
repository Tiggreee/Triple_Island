import { augStatus } from "@/lib/availability";

const toneClasses: Record<string, string> = {
  open: "bg-brand/10 text-brand",
  filling: "bg-accent/10 text-accent",
  almost: "bg-danger/10 text-danger",
};

export function AvailabilityChip({ unit, className = "" }: { unit: number; className?: string }) {
  const { tone, label } = augStatus(unit);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${toneClasses[tone]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
