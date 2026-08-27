export function SiteFooter() {
  return (
    <footer className="rounded-2xl border border-border bg-[color:var(--cb-color-foreground)] px-8 py-12 text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/coco/logo-white.png" alt="Coco B Isla" className="h-9 w-auto" />
          <p className="text-white/70">Isla Mujeres, Quintana Roo, Mexico.</p>
          <p className="text-white/70">Luxury villas on the Sac Bajo peninsula.</p>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Villa groups</p>
          <p className="text-white/60">3–27 suites</p>
          <a href="tel:+12065790798" className="block text-white/80 hover:text-white">+1 206 579 0798</a>
          <a href="mailto:jeffrey@cocobisla.com" className="block text-white/80 hover:text-white">jeffrey@cocobisla.com</a>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Reservations</p>
          <p className="text-white/80">US toll-free 833 439 2626</p>
          <p className="text-white/60">9 a.m. – 5 p.m. Central</p>
          <a href="mailto:reservations@cocobisla.com" className="block text-white/80 hover:text-white">reservations@cocobisla.com</a>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Concierge</p>
          <p className="text-white/60">7 a.m. – 11 p.m. Central</p>
          <p className="text-white/80">
            WhatsApp <a href="tel:+529983154343" className="underline decoration-white/40 underline-offset-2 hover:decoration-white">+52 998 315 4343</a>
          </p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[1180px] border-t border-white/10 pt-6 text-xs leading-6 text-white/40">
        All rates are per night in US dollars and subject to 21% Mexican tax. Minimum stay requirements apply to
        each season: 5 nights at Thanksgiving and Spring Break, 7 nights at Christmas and New Year. Rates shown
        are the published 2026–2028 peak-season starting rates.
      </p>
    </footer>
  );
}
