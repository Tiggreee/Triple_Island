"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { CheckAvailabilityButton } from "@/components/booking/check-availability-button";
import { SpecStrip } from "@/components/villa/spec-strip";
import { peakRatesFor } from "@/lib/availability";
import type { VillaData } from "@/lib/villas-data";

type VillaDetailModalProps = {
  villa: VillaData;
  unit: number;
  gallery: string[];
  open: boolean;
  onClose: () => void;
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

export function VillaDetailModal({ villa, unit, gallery, open, onClose }: VillaDetailModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={villa.name}
    >
      <div
        className="max-h-[92vh] w-full max-w-[980px] overflow-y-auto rounded-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur">
          <div>
            <h2 className="text-[18px] font-light uppercase tracking-[2px] text-foreground">{villa.name}</h2>
            <p className="text-[12px] text-muted">
              {villa.suites} suites · up to {villa.guests} guests · Sac Bajo, Isla Mujeres
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-2xl leading-none text-muted hover:bg-background hover:text-foreground"
          >
            &times;
          </button>
        </div>

        <div className="space-y-6 p-5">
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 5).map((src, i) => (
                <div
                  key={src}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl ${i === 0 ? "col-span-2" : ""}`}
                >
                  <Image src={src} alt={`${villa.name} photo ${i + 1}`} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}

          <SpecStrip guests={villa.guests} bedrooms={villa.bedrooms} bathrooms={villa.bathrooms} className="border-y border-border py-4" />

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background/40 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[13.5px] font-light leading-relaxed text-muted">{villa.description}</p>
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
          <CheckAvailabilityButton villaSlug={villa.slug} />
        </div>
      </div>
    </div>
  );
}
