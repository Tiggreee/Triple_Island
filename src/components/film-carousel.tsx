"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Film = { caption: string; vimeoId?: string; poster?: string };

// UX-010: 3-up en desktop; por debajo de lg pasa a scroll horizontal con snap
// (62% tablet, 87% movil) y paging dots que siguen el scroll. El iframe de Vimeo
// solo se inserta al pulsar, sin cargar terceros antes del consentimiento.
export function FilmCarousel({ films }: { films: Film[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<Set<string>>(new Set());

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
        {films.map((film) => {
          const isPlaying = Boolean(film.vimeoId && playing.has(film.vimeoId));
          return (
            <div
              key={film.caption}
              className="relative flex aspect-[16/9] shrink-0 basis-[87%] snap-center overflow-hidden rounded-2xl bg-[color:var(--cb-color-foreground,#0e2530)] text-white sm:basis-[62%] lg:basis-auto"
            >
              {isPlaying ? (
                <iframe
                  src={`https://player.vimeo.com/video/${film.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
                  title={film.caption}
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <>
                  {film.poster ? (
                    <Image src={film.poster} alt="" fill sizes="(min-width: 1024px) 33vw, 87vw" className="object-cover opacity-55" />
                  ) : null}
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                    <button
                      type="button"
                      onClick={() => film.vimeoId && setPlaying((prev) => new Set(prev).add(film.vimeoId as string))}
                      disabled={!film.vimeoId}
                      aria-label={film.vimeoId ? `Play video: ${film.caption}` : `${film.caption} — coming soon`}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="ml-1 block h-0 w-0 border-y-8 border-l-[13px] border-y-transparent border-l-white" />
                    </button>
                    <p className="mt-4 text-[11px] font-medium uppercase tracking-[2px] text-white/80">{film.vimeoId ? "Play" : "Coming soon"}</p>
                    <p className="mt-1 px-4 text-center text-xs leading-5 text-white/70">{film.caption}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
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
