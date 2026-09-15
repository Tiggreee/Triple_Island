"use client";

import { useBookingModal } from "@/components/booking/booking-modal";
import { Button } from "@/components/ui/button";
import { ExperienceTags } from "@/components/villa/experience-tags";
import { FloatingBar } from "@/components/floating-bar";

export function VillasPageActions({ defaultSlug }: { defaultSlug: string }) {
  const { open, modal } = useBookingModal(defaultSlug);

  return (
    <>
      <ExperienceTags onInquire={open} />
      <div className="flex justify-center">
        <Button variant="primary" icon onClick={open}>
          Inquire now
        </Button>
      </div>
      <FloatingBar ctaLabel="Check Availability" onCta={open} />
      {modal}
    </>
  );
}
