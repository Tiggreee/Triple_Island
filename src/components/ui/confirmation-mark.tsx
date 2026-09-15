import { Azulejo } from "@/components/ui/azulejo";

const TILES = [
  { left: 0, top: 64, delay: 0 },
  { left: 32, top: 96, delay: 0.14 },
  { left: 64, top: 64, delay: 0.28 },
  { left: 96, top: 32, delay: 0.42 },
  { left: 128, top: 0, delay: 0.56 },
];

export function ConfirmationMark() {
  return (
    <div className="relative mx-auto mb-5 h-32 w-40" aria-hidden="true">
      {TILES.map((t, i) => (
        <span
          key={i}
          className="cb-mark-tile absolute h-8 w-8"
          style={{ left: t.left, top: t.top, animationDelay: `${t.delay}s` }}
        >
          <Azulejo tone="action" size={32} />
        </span>
      ))}
    </div>
  );
}
