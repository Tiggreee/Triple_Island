"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/booking/booking-modal";

type CheckAvailabilityButtonProps = {
  villaSlug: string;
  className?: string;
  label?: string;
  icon?: boolean | "nav";
};

export function CheckAvailabilityButton({
  villaSlug,
  className,
  label = "Check Availability",
  icon = true,
}: CheckAvailabilityButtonProps) {
  const { open, modal } = useBookingModal(villaSlug);
  return (
    <>
      <Button variant="primary" icon={icon} className={className} onClick={open}>
        {label}
      </Button>
      {modal}
    </>
  );
}
