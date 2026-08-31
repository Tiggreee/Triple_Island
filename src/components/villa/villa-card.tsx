"use client";

import Image from "next/image";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";
import { CheckAvailabilityButton } from "@/components/booking/check-availability-button";
import { useBookingModal } from "@/components/booking/booking-modal";
import { Azulejo } from "@/components/ui/azulejo";
import { Button } from "@/components/ui/button";
import { AvailabilityChip } from "@/components/villa/availability-chip";
import { SpecStrip } from "@/components/villa/spec-strip";
import { VillaDetailModal } from "@/components/villa/villa-detail-modal";
import { SLUG_TO_UNIT, type VillaData } from "@/lib/villas-data";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function VillaCard({ villa }: { villa: VillaData }) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const isPair = villa.pairUnit !== undefined;
  const { open: openBooking, modal: bookingModal } = useBookingModal(villa.slug, false, undefined, villa.pairUnit);
  const unit = villa.pairUnit ?? SLUG_TO_UNIT[villa.slug] ?? 0;
  const gallery = villa.pairSlugs
    ? Array.from({ length: 5 }, (_, i) => {
        const slug = villa.pairSlugs![i % 2];
        const photoNum = Math.floor(i / 2) + 1;
        return `/media/coco/villas/${slug}-0${photoNum}.webp`;
      })
    : Array.from({ length: 5 }, (_, i) => `/media/coco/villas/${villa.slug}-0${i + 1}.webp`);
  const shortDescription = villa.description.split(". ")[0];

  function movePhoto(e: ReactMouseEvent, delta: number) {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex((i) => (i + delta + gallery.length) % gallery.length);
  }

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[14px] border bg-surface ${
        isPair ? "border-primary/30 shadow-[0_0_0_3px_rgba(36,106,148,0.06)]" : "border-border"
      }`}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={gallery[photoIndex]}
          alt={`${villa.name} exterior`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <AvailabilityChip unit={unit} className="absolute left-4 top-4 shadow-sm" />
        {isPair ? (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11.5px] font-semibold uppercase tracking-[1px] text-primary shadow-sm">
            <span className="relative h-[18px] w-[26px] shrink-0" aria-hidden="true">
              <Azulejo tone="action" size={18} className="absolute left-0 top-px" />
              <Azulejo tone="action" size={15} className="absolute left-[11px] top-1 opacity-55" />
            </span>
            Two villas
          </span>
        ) : null}
        <button
          type="button"
          onClick={(e) => movePhoto(e, -1)}
          aria-label={`Previous photo of ${villa.name}`}
          className="absolute inset-y-[8%] left-0 z-[2] w-[21%] cursor-pointer opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="absolute left-3.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-[225deg] border-b-2 border-l-2 border-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,.4))]" />
        </button>
        <button
          type="button"
          onClick={(e) => movePhoto(e, 1)}
          aria-label={`Next photo of ${villa.name}`}
          className="absolute inset-y-[8%] right-0 z-[2] w-[21%] cursor-pointer opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <span className="absolute right-3.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,.4))]" />
        </button>
        <div className="absolute inset-x-0 bottom-2.5 z-[3] flex justify-center gap-[5px] opacity-0 transition-opacity group-hover:opacity-100">
          {gallery.map((src, i) => (
            <i
              key={src}
              className={`h-[3px] w-4 rounded-[2px] transition-colors ${i === photoIndex ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="flex min-h-[29px] items-end text-[24px] font-light uppercase leading-[1.2] tracking-[1.85px] text-foreground">
          {villa.name}
        </h2>
        <p className="line-clamp-2 min-h-[50px] text-[13px] font-light leading-[24px] text-muted">{shortDescription}</p>

        <SpecStrip guests={villa.guests} bedrooms={villa.bedrooms} bathrooms={villa.bathrooms} className="border-t border-border pt-3" />

        <p className="text-[13px] text-foreground">
          From <span className="font-medium">{money(villa.priceFrom)}</span> / night
          <span className="block text-[11px] text-muted">+ 21% tax</span>
        </p>
        <p className="text-[11px] text-muted">
          {villa.suites} suites · 5–7 night minimum in peak season{villa.quote ? " · combined rate on request" : ""}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Button variant="secondary" className="h-11 w-full" onClick={() => setOpen(true)}>
            Details
          </Button>
          <CheckAvailabilityButton
            villaSlug={villa.slug}
            initialUnit={villa.pairUnit}
            label="Check Availability"
            icon={false}
            className="h-11 w-full"
          />
        </div>
      </div>
      <VillaDetailModal
        villa={villa}
        unit={unit}
        gallery={gallery}
        open={open}
        onClose={() => setOpen(false)}
        onCheckAvailability={() => {
          setOpen(false);
          openBooking();
        }}
      />
      {bookingModal}
    </article>
  );
}
