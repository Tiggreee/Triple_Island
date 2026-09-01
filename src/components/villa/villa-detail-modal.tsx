"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Azulejo } from "@/components/ui/azulejo";
import { Button } from "@/components/ui/button";
import { SpecStrip } from "@/components/villa/spec-strip";
import { peakRatesFor, UNITS } from "@/lib/availability";
import type { VillaData } from "@/lib/villas-data";

type VillaDetailModalProps = {
  villa: VillaData;
  unit: number;
  gallery: string[];
  open: boolean;
  onClose: () => void;
  onCheckAvailability: () => void;
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const AMENITIES: { label: string; path: ReactNode }[] = [
  { label: "Beachfront access", path: <path d="M3 18c3-2 6-2 9 0s6 2 9 0 3-1.4 3-1.4M3 13c3-2 6-2 9 0s6 2 9 0" /> },
  { label: "Private pool", path: <path d="M4 20c2.5-1.8 5-1.8 7.5 0s5 1.8 7.5 0M7 17V5a2 2 0 0 1 4 0v12M14 17V5a2 2 0 0 1 4 0v12M7 9h7M7 13h7" /> },
  { label: "In-house chef", path: <path d="M8 20h8M6 12h12c0 4-3 5-6 5s-6-1-6-5zM7 12c-1-6 3-9 5-9s6 3 5 9" /> },
  { label: "Daily housekeeping", path: <path d="M5 21V10l7-6 7 6v11M9 21v-6h6v6" /> },
  { label: "Rooftop terrace", path: <path d="M4 20h16M6 20V9l6-4 6 4v11M10 20v-5h4v5" /> },
  { label: "Wi-Fi throughout", path: <path d="M5 12a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M12 19h.01" /> },
];

export function VillaDetailModal({ villa, unit, gallery, open, onClose, onCheckAvailability }: VillaDetailModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") {
          setLightboxIndex(null);
        } else if (e.key === "ArrowRight") {
          setLightboxIndex((i) => (i === null ? i : (i + 1) % gallery.length));
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
        }
        return;
      }
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, lightboxIndex, gallery.length]);

  if (!open) return null;

  function close() {
    setLightboxIndex(null);
    onClose();
  }

  const rates = peakRatesFor(unit);
  const total = Math.round(villa.priceFrom * 1.21);
  const essentials: [string, string][] = [
    ["Check-in", "3:00 p.m."],
    ["Check-out", "11:00 a.m."],
    ["Minimum stay", "5–7 nights in peak season"],
    ["Tax", "21% Mexican tax"],
    ["Deposit", "60% at booking"],
    ["Balance", "40% · 90 days before check-in"],
    ["Currency", "US dollars"],
    ["Capacity", `Up to ${villa.guests} guests`],
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 min-[621px]:items-center min-[621px]:p-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={villa.name}
    >
      <div
        className="max-h-[92vh] w-full max-w-[980px] overflow-y-auto rounded-t-[20px] bg-surface shadow-2xl min-[621px]:rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex flex-col bg-surface/95 backdrop-blur">
          <div className="flex justify-center pt-2.5 pb-1 min-[621px]:hidden" aria-hidden="true">
            <span className="h-[5px] w-11 rounded-[3px] bg-[#d8d0c4]" />
          </div>
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-[18px] font-light uppercase tracking-[2px] text-foreground">{villa.name}</h2>
            <p className="text-[12px] text-muted">
              {villa.suites} suites · up to {villa.guests} guests · Sac Bajo, Isla Mujeres
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-full p-2 text-[26px] leading-none text-muted hover:bg-background hover:text-foreground"
          >
            &times;
          </button>
          </div>
        </div>

        <div className="space-y-6 p-5">
          {gallery.length > 0 ? (
            <div className="relative">
              <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 min-[621px]:grid min-[621px]:grid-cols-4 min-[621px]:overflow-visible min-[621px]:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {gallery.slice(0, 5).map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Expand ${villa.name} photo ${i + 1}`}
                    className={`group relative aspect-[4/3] shrink-0 basis-[82%] snap-center overflow-hidden rounded-xl min-[621px]:basis-auto ${i === 0 ? "min-[621px]:col-span-2" : ""}`}
                  >
                    <Image
                      src={src}
                      alt={`${villa.name} photo ${i + 1}`}
                      fill
                      sizes="(min-width: 621px) 25vw, 82vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="absolute bottom-3.5 right-3.5 z-[3] inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/92 px-[15px] py-2.5 text-[11.5px] font-semibold uppercase tracking-[1.4px] text-foreground shadow-[0_4px_16px_rgba(11,32,40,0.14)] backdrop-blur-[10px] transition hover:-translate-y-px hover:bg-white"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-primary" fill="currentColor" aria-hidden="true">
                  <path d="M3 5h8v6H3V5Zm10 0h8v6h-8V5ZM3 13h8v6H3v-6Zm10 0h8v6h-8v-6Z" />
                </svg>
                See all {gallery.length} photos
              </button>
            </div>
          ) : null}

          <SpecStrip guests={villa.guests} bedrooms={villa.bedrooms} bathrooms={villa.bathrooms} className="border-y border-border py-4" />

          <div className="flex flex-col gap-4 rounded-[14px] border border-border bg-background/40 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md space-y-3">
              <p className="text-[13.5px] font-light leading-relaxed text-muted">{villa.description}</p>
              {villa.pairUnit !== undefined && UNITS[villa.pairUnit].pair ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-primary/[0.16] bg-primary/[0.07] px-3.5 py-3 text-[13px] leading-[1.6] text-[#123B52]">
                  <span className="relative mt-0.5 h-[15px] w-[22px] shrink-0" aria-hidden="true">
                    <Azulejo tone="action" size={15} className="absolute left-0 top-0" />
                    <Azulejo tone="action" size={12.5} className="absolute left-[9px] top-0.5 opacity-55" />
                  </span>
                  <span>
                    Availability for a pair is the <b className="font-semibold">intersection</b> of both calendars: a
                    night is open only when{" "}
                    <b className="font-semibold">{UNITS[UNITS[villa.pairUnit].pair![0]].name}</b> and{" "}
                    <b className="font-semibold">{UNITS[UNITS[villa.pairUnit].pair![1]].name}</b> are both free.
                  </span>
                </div>
              ) : null}
            </div>
            <div className="shrink-0 rounded-xl border border-border bg-surface p-4 text-center sm:min-w-[220px] sm:text-right">
              <span className="text-[11px] uppercase tracking-[1.6px] text-muted">From</span>
              <div className="text-[26px] font-medium leading-tight text-foreground">{money(villa.priceFrom)}</div>
              <span className="block text-[12px] text-muted">USD per night · {villa.suites} suites</span>
              <span className="mt-1 block text-[12px] font-medium text-primary">+ 21% Mexican tax = {money(total)} total</span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[1.8px] text-brand">What&rsquo;s included</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 min-[380px]:grid-cols-2">
              {AMENITIES.map((a) => (
                <span key={a.label} className="flex items-center gap-2.5 text-[13px] text-muted">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-[19px] w-[19px] shrink-0 text-primary"
                  >
                    {a.path}
                  </svg>
                  {a.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[1.8px] text-brand">The essentials</p>
            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {essentials.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 border-b border-border/60 py-2 text-[13px]">
                  <span className="text-muted">{k}</span>
                  <b className="text-right font-medium text-foreground">{v}</b>
                </div>
              ))}
            </div>
          </div>

          {rates.length > 0 ? (
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[1.8px] text-brand">Published peak-season rates 2026–2028</p>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-background/60 text-[11px] uppercase tracking-[1px] text-muted">
                      <th className="px-4 py-2.5 font-medium">Season</th>
                      <th className="px-4 py-2.5 font-medium">Nightly</th>
                      <th className="px-4 py-2.5 font-medium">21% tax</th>
                      <th className="px-4 py-2.5 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((r) => (
                      <tr key={r.season} className="border-t border-border">
                        <td className="px-4 py-2.5">
                          <b className="font-medium text-foreground">{r.season}</b>
                          <span className="block text-[12px] text-muted">{r.min}-night minimum</span>
                        </td>
                        <td className="px-4 py-2.5 tabular-nums text-muted">{money(r.nightly)}</td>
                        <td className="px-4 py-2.5 tabular-nums text-muted">{money(r.tax)}</td>
                        <td className="px-4 py-2.5 tabular-nums font-medium text-foreground">{money(r.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-border bg-surface/95 px-5 py-4 backdrop-blur">
          <p className="text-[12px] text-muted">
            From <b className="text-foreground">{money(villa.priceFrom)}</b> / night · + 21% tax
          </p>
          <Button variant="primary" icon onClick={onCheckAvailability}>
            Check Availability
          </Button>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(11,32,40,0.94)] p-4"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${villa.name} photo ${lightboxIndex + 1}`}
        >
          <div className="absolute inset-x-0 top-0 z-[3] flex items-center px-[22px] py-[18px]">
            <span className="text-[13px] tracking-[1.6px] text-white/85">
              {lightboxIndex + 1} / {gallery.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close photo"
              className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xl leading-none text-white"
            >
              &times;
            </button>
          </div>
          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
                }}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 z-[3] flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-2xl leading-none text-white backdrop-blur-[6px] transition hover:bg-white/25 min-[621px]:left-5 min-[621px]:h-[52px] min-[621px]:w-[52px]"
              >
                &lsaquo;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? i : (i + 1) % gallery.length));
                }}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 z-[3] flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-2xl leading-none text-white backdrop-blur-[6px] transition hover:bg-white/25 min-[621px]:right-5 min-[621px]:h-[52px] min-[621px]:w-[52px]"
              >
                &rsaquo;
              </button>
            </>
          ) : null}
          <div className="relative h-full max-h-[66vh] w-full max-w-4xl min-[621px]:max-h-[74vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[lightboxIndex]}
              alt={`${villa.name} photo ${lightboxIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
          {gallery.length > 1 ? (
            <div className="absolute inset-x-0 bottom-[26px] z-[3] flex justify-center gap-2">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-[7px] rounded-full transition-all ${i === lightboxIndex ? "w-[22px] bg-white" : "w-[7px] bg-white/36"}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
