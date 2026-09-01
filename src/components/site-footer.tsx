export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[color:var(--cb-color-foreground)] pt-16 pb-9 text-white min-[621px]:mt-24">
      <div className="mx-auto max-w-[1180px] px-5 text-sm leading-[1.8] tracking-[0.2px] text-[#C9C3B9] sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/coco/logo-white.png" alt="Coco B Isla" className="mb-4 h-[54px] w-auto" />
            Isla Mujeres, Quintana Roo, Mexico.
            <br />
            Luxury villas on the Sac Bajo peninsula.
          </div>
          <div>
            <h5 className="mb-3.5 text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Villa groups</h5>
            3 &ndash; 27 suites
            <br />
            <a href="tel:+12065790798" className="text-[#9FD4EC] no-underline hover:underline">
              +1 206 579 0798
            </a>
            <br />
            <a href="mailto:jeffrey@cocobisla.com" className="text-[#9FD4EC] no-underline hover:underline">
              jeffrey@cocobisla.com
            </a>
          </div>
          <div>
            <h5 className="mb-3.5 text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Reservations</h5>
            US toll-free 833 439 2626
            <br />
            9 a.m. &ndash; 5 p.m. Central
            <br />
            <a href="mailto:reservations@cocobisla.com" className="text-[#9FD4EC] no-underline hover:underline">
              reservations@cocobisla.com
            </a>
          </div>
          <div>
            <h5 className="mb-3.5 text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Concierge</h5>
            7 a.m. &ndash; 11 p.m. Central
            <br />
            WhatsApp{" "}
            <a href="tel:+529983154343" className="text-[#9FD4EC] no-underline hover:underline">
              +52 998 315 4343
            </a>
          </div>
        </div>
        <p className="mt-11 border-t border-[#333] pt-[22px] text-[12.5px] leading-[1.8] text-[#8E887E]">
          All rates are per night in US dollars and subject to 21% Mexican tax. Minimum stay requirements apply to
          each season: 5 nights at Thanksgiving and Spring Break, 7 nights at Christmas and New Year. Rates shown
          are the published 2026&ndash;2028 peak-season starting rates.
        </p>
      </div>
    </footer>
  );
}
