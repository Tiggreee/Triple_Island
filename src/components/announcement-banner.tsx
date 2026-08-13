"use client";

import { useState } from "react";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-[#F7FCFE] via-[#EAF7FB] to-[#E4F5FB] px-4 py-3 text-center sm:px-6">
      <p className="mx-auto text-xs leading-5 text-primary sm:text-sm">
        <b className="font-semibold text-brand">Sargasso-free, all year long!</b> Our privileged location on the
        north shore of Isla Mujeres keeps the water clear.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="shrink-0 rounded-full px-1.5 text-base leading-none text-primary/70 transition hover:bg-primary/10 hover:text-primary"
      >
        &times;
      </button>
    </div>
  );
}
