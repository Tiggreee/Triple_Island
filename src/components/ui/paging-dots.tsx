const DOT_SIZE = 14;
const WINDOW_SIZE = 70;

function distanceClass(distance: number): string {
  if (distance === 0) return "scale-100 bg-primary";
  if (distance === 1) return "scale-100 bg-[#cfc7b9]";
  if (distance === 2) return "scale-[.62] bg-[#cfc7b9]";
  return "scale-[.34] bg-[#cfc7b9]";
}

function darkDistanceClass(distance: number): string {
  if (distance === 0) return "scale-100 bg-white";
  if (distance === 1) return "scale-100 bg-white/38";
  if (distance === 2) return "scale-[.62] bg-white/38";
  return "scale-[.34] bg-white/38";
}

type PagingDotsProps = {
  total: number;
  active: number;
  dark?: boolean;
  onSelect?: (index: number) => void;
  className?: string;
};

export function PagingDots({ total, active, dark = false, onSelect, className = "" }: PagingDotsProps) {
  if (total <= 1) return null;
  const strip = total * DOT_SIZE;
  const centered = WINDOW_SIZE / 2 - DOT_SIZE / 2 - active * DOT_SIZE;
  const translateX = Math.min(0, Math.max(WINDOW_SIZE - strip, centered));

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_24%,#000_76%,transparent_100%)] ${className}`}
      style={{ width: WINDOW_SIZE }}
      role="tablist"
      aria-label="Photo pagination"
    >
      <div
        className="flex w-max transition-transform duration-[380ms] ease-[cubic-bezier(.22,.9,.24,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => onSelect?.(i)}
            className="grid shrink-0 place-items-center"
            style={{ width: DOT_SIZE, height: DOT_SIZE }}
          >
            <span
              className={`h-2 w-2 rounded-full transition-[transform,background-color] duration-[380ms] ease-[cubic-bezier(.22,.9,.24,1)] motion-reduce:transition-none ${
                dark ? darkDistanceClass(Math.abs(i - active)) : distanceClass(Math.abs(i - active))
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
