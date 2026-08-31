"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useBookingModal } from "@/components/booking/booking-modal";
import { VillaDetailModal } from "@/components/villa/villa-detail-modal";
import { REAL_VILLAS, SLUG_TO_UNIT } from "@/lib/villas-data";

type Tile = { slug: string; name: string; tag: string; note: string; photo: string };

export function VillaCollectionGrid({ villas }: { villas: Tile[] }) {
  const [selectedSlug, setSelectedSlug] = useState(villas[0]?.slug ?? REAL_VILLAS[0].slug);
  const [open, setOpen] = useState(false);
  const selectedVilla = REAL_VILLAS.find((v) => v.slug === selectedSlug) ?? REAL_VILLAS[0];
  const gallery = Array.from({ length: 5 }, (_, i) => `/media/coco/villas/${selectedVilla.slug}-0${i + 1}.webp`);
  const { open: openBooking, modal: bookingModal } = useBookingModal(selectedVilla.slug);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 min-[901px]:auto-rows-[300px]">
        {villas.map((villa, i) => (
          <a
            key={villa.slug}
            href={`/villas?from=home#${villa.slug}`}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
              e.preventDefault();
              setSelectedSlug(villa.slug);
              setOpen(true);
            }}
            className={`group relative block aspect-[4/3] overflow-hidden rounded-[14px] text-left min-[901px]:aspect-auto ${
              i === 0 ? "min-[901px]:row-span-2" : ""
            } ${i === 3 ? "min-[901px]:col-span-2" : ""}`}
          >
            <Image
              src={villa.photo}
              alt={villa.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-[11px] font-medium uppercase tracking-[2px] text-white/80">{villa.tag}</p>
              <h3 className="mt-1 text-lg font-light uppercase tracking-[1.5px]">{villa.name}</h3>
              {villa.note ? <p className="mt-1 text-xs leading-5 text-white/75">{villa.note}</p> : null}
            </div>
          </a>
        ))}
      </div>
      <VillaDetailModal
        villa={selectedVilla}
        unit={SLUG_TO_UNIT[selectedVilla.slug] ?? 0}
        gallery={gallery}
        open={open}
        onClose={() => setOpen(false)}
        onCheckAvailability={() => {
          setOpen(false);
          openBooking();
        }}
      />
      {bookingModal}
    </>
  );
}
