"use client";

import { useRef, useState } from "react";

type Film = { caption: string };

// UX-010: 3-up en desktop; por debajo de lg pasa a scroll horizontal con snap
// (62% tablet, 87% movil) y paging dots que siguen el scroll.
export function FilmCarousel({ films }: { films: Film[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / (el.scrollWidth / films.length));
    setActive(Math.min(films.length - 1, Math.max(0, i)));
  }

  return (
    <div className="space-y-4">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {films.map((film) => (
          <div
            key={film.caption}
            className="relative flex aspect-[16/9] shrink-0 basis-[87%] snap-center flex-col items-center justify-center rounded-2xl bg-[color:var(--cb-color-foreground,#0e2530)] text-white sm:basis-[62%] lg:basis-auto"
          >
            <button
              type="button"
              aria-label={`Play video: ${film.caption}`}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 transition hover:bg-white/20"
            >
              <span className="ml-1 block h-0 w-0 border-y-8 border-l-[13px] border-y-transparent border-l-white" />
            </button>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[2px] text-white/80">Video</p>
            <p className="mt-1 px-4 text-center text-xs leading-5 text-white/70">{film.caption}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 lg:hidden">
        {films.map((film, i) => (
          <span
            key={film.caption}
            aria-hidden="true"
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
