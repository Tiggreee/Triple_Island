"use client";

import { useBookingModal } from "@/components/booking/booking-modal";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export function LocationSection({ defaultSlug }: { defaultSlug: string }) {
  const { open, modal } = useBookingModal(defaultSlug);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
      <div className="space-y-4 text-center lg:text-left">
        <SectionHeader eyebrow="A privileged location" title="Isla Mujeres" />
        <p className="text-sm leading-7 text-muted">
          Just a 25 minute boat ride off the coast of Cancún, you&rsquo;ll find Isla Mujeres — a small and alluring
          island with some of the most beautiful beaches and coastlines in all the Caribbean.
        </p>
        <p className="text-sm leading-7 text-muted">
          Our location on the Sac Bajo peninsula lets you enjoy a sargasso-free experience all year long. All four
          villas are within walking distance of one another.
        </p>
        <Button variant="secondary" icon onClick={open}>
          Check availability
        </Button>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
        <iframe
          title="Map of Sac Bajo, Isla Mujeres"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-86.78%2C21.20%2C-86.70%2C21.27&layer=mapnik&marker=21.238%2C-86.744"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 [filter:saturate(.86)]"
        />
        <span className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[1.5px] text-foreground shadow-lg [backdrop-filter:blur(6px)]">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Sac Bajo, Isla Mujeres
        </span>
      </div>
      {modal}
    </div>
  );
}
