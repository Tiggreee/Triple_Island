import { Azulejo } from "@/components/ui/azulejo";

export function TideLoader({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute -inset-1.5 z-20 flex-col items-center justify-center gap-3.5 rounded-xl bg-[rgba(251,248,243,0.94)] ${
        active ? "flex" : "hidden"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Checking availability"
    >
      <div className="cb-tide-wrap">
        <Azulejo tone="muted" size={74} className="absolute inset-0 opacity-40" />
        <span className="cb-tide-clip">
          <Azulejo tone="action" size={74} className="absolute inset-0" />
        </span>
      </div>
      <p className="text-[11px] uppercase tracking-[1.2px] text-muted">Checking availability</p>
    </div>
  );
}
