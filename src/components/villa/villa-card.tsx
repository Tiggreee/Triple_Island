"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckAvailabilityButton } from "@/components/booking/check-availability-button";
import { useBookingModal } from "@/components/booking/booking-modal";
import { Button } from "@/components/ui/button";
import { AvailabilityChip } from "@/components/villa/availability-chip";
import { SpecStrip } from "@/components/villa/spec-strip";
import { VillaDetailModal } from "@/components/villa/villa-detail-modal";
import { SLUG_TO_UNIT, type VillaData } from "@/lib/villas-data";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function VillaCard({ villa }: { villa: VillaData }) {
  const [open, setOpen] = useState(false);
  const { open: openBooking, modal: bookingModal } = useBookingModal(villa.slug);
  const unit = SLUG_TO_UNIT[villa.slug] ?? 0;
  const gallery = Array.from({ length: 5 }, (_, i) => `/media/coco/villas/${villa.slug}-0${i + 1}.webp`);
  const shortDescription = villa.description.split(". ")[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative aspect-[4/3] w-full">
        <Image src={villa.photo} alt={`${villa.name} exterior`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
        <AvailabilityChip unit={unit} className="absolute left-3 top-3 bg-surface/90 shadow-sm backdrop-blur-sm" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-[16.8px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground">{villa.name}</h2>
        <p className="line-clamp-2 text-[13px] font-light leading-[24px] text-muted">{shortDescription}</p>

        <SpecStrip guests={villa.guests} bedrooms={villa.bedrooms} bathrooms={villa.bathrooms} className="border-t border-border pt-3" />

        <p className="text-[13px] text-foreground">
          From <span className="font-medium">{money(villa.priceFrom)}</span> / night
          <span className="block text-[11px] text-muted">+ 21% tax</span>
        </p>
        <p className="text-[11px] text-muted">{villa.suites} suites · 5–7 night minimum in peak season</p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Button variant="secondary" className="h-11 w-full" onClick={() => setOpen(true)}>
            Details
          </Button>
          <CheckAvailabilityButton villaSlug={villa.slug} label="Check Dates" icon={false} className="h-11 w-full" />
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
