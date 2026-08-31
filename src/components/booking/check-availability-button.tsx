"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/booking/booking-modal";

type CheckAvailabilityButtonProps = {
  villaSlug: string;
  initialUnit?: number;
  className?: string;
  label?: string;
  icon?: boolean | "nav";
};

export function CheckAvailabilityButton({
  villaSlug,
  initialUnit,
  className,
  label = "Check Availability",
  icon = true,
}: CheckAvailabilityButtonProps) {
  const { open, modal } = useBookingModal(villaSlug, false, undefined, initialUnit);
  return (
    <>
      <Button variant="primary" icon={icon} className={className} onClick={open}>
        {label}
      </Button>
      {modal}
    </>
  );
}
