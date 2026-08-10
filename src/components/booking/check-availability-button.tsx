"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/booking/booking-modal";

type CheckAvailabilityButtonProps = {
  villaSlug: string;
  className?: string;
};

export function CheckAvailabilityButton({ villaSlug, className }: CheckAvailabilityButtonProps) {
  const { open, modal } = useBookingModal(villaSlug);
  return (
    <>
      <Button variant="primary" className={className} onClick={open}>
        Check Availability
      </Button>
      {modal}
    </>
  );
}
