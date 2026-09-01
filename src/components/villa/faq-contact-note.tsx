"use client";

import { useBookingModal } from "@/components/booking/booking-modal";

export function FaqContactNote({ defaultSlug }: { defaultSlug: string }) {
  const { open, modal } = useBookingModal(defaultSlug);

  return (
    <>
      <p className="text-center text-sm text-muted">
        Still unsure?{" "}
        <button type="button" onClick={open} className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark">
          Ask us directly
        </button>{" "}
        — we answer within 24 hours.
      </p>
      {modal}
    </>
  );
}
