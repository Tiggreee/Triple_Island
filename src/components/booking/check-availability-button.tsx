"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/booking/booking-modal";

type CheckAvailabilityButtonProps = {
  villaSlug: string;
  className?: string;
  label?: string;
};

export function CheckAvailabilityButton({ villaSlug, className, label = "Check Availability" }: CheckAvailabilityButtonProps) {
  const { open, modal } = useBookingModal(villaSlug);
  return (
    <>
      <Button variant="primary" icon className={className} onClick={open}>
        {label}
      </Button>
      {modal}
    </>
  );
}
