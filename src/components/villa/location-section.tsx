"use client";

import { useBookingModal } from "@/components/booking/booking-modal";
import { Azulejo } from "@/components/ui/azulejo";
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
      <div className="relative h-[340px] w-full overflow-hidden rounded-[14px] border border-border max-[900px]:h-[260px] max-[620px]:h-[200px]">
        <iframe
          title="Coco B Isla · Sac Bajo, Isla Mujeres"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2211.332444924522!2d-86.7386669405576!3d21.231727578200324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4c25674998fd5d%3A0x8ffdc0029e6948c5!2sCoco%20B%20Isla!5e0!3m2!1ses!2smx!4v1785718289974!5m2!1ses!2smx"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
        <span className="pointer-events-none absolute bottom-3.5 left-3.5 flex items-center gap-2.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-medium uppercase tracking-[1.5px] text-foreground shadow-lg [backdrop-filter:blur(6px)]">
          <Azulejo tone="action" size={13} />
          Sac Bajo, Isla Mujeres
        </span>
      </div>
      {modal}
    </div>
  );
}
