import Image from "next/image";
import Link from "next/link";
import { CheckAvailabilityButton } from "@/components/booking/check-availability-button";
import { Button } from "@/components/ui/button";
import { REAL_VILLAS } from "@/lib/villas-data";
import { getVillas } from "@/lib/wp-fetchers";

export default async function VillasPage() {
  const villas = await getVillas();
  const items = REAL_VILLAS.map((real) => {
    const wp = villas.find((v) => v.slug === real.slug);
    return {
      ...real,
      name: wp?.title.rendered ?? real.name,
      suites: wp?.meta?.suite_capacity ?? real.suites,
      guests: wp?.meta?.guest_capacity ?? real.guests,
      bedrooms: wp?.meta?.bedrooms ?? real.bedrooms,
      bathrooms: wp?.meta?.bathrooms ?? real.bathrooms,
      priceFrom: wp?.meta?.price_from ?? real.priceFrom,
      photo: wp?.featured_media_url ?? real.photo,
      description: wp?.meta?.short_description ?? wp?.excerpt?.rendered ?? real.description,
    };
  });

  return (
    <div className="w-full">
      <div className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden lg:min-h-[780px]">
        <Image
          src="/media/coco/villas-hero-night.jpg"
          alt="Coco B Isla villa terrace and pool at night"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/30 to-foreground/65" />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[3px] text-white/85">Isla Mujeres · Mexico</p>
          <h1 className="mt-4 font-sans text-5xl font-extralight uppercase tracking-[4px] lg:text-7xl">Villas</h1>
          <p className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[2.5px] text-white/90">
            {["Lola", "Encantada", "Coco", "Cielo"].map((name, i) => (
              <span key={name} className="flex items-center gap-3">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-brand" /> : null}
                {name}
              </span>
            ))}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/90">
            A sanctuary of luxury and tranquility nestled on the pristine Sac Bajo peninsula. Four private villas,
            three to twenty-seven suites, steps from calm water.
          </p>
        </div>
        <a
          href="#collection"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[2px] text-white/85 transition hover:text-white"
        >
          The Collection
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-xs">
            &darr;
          </span>
        </a>
      </div>

      <div id="collection" className="mx-auto w-full max-w-[1180px] space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <hr className="border-t border-primary" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {items.map((villa) => (
          <article key={villa.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={villa.photo}
                alt={`${villa.name} exterior`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h2 className="text-[16.8px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground">
                {villa.name}
              </h2>
              <p className="text-[13px] font-light leading-[24px] text-muted">{villa.description}</p>

              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-[12px] text-muted">
                <span>{villa.suites} suites</span>
                <span>{villa.guests} guests</span>
                <span>{villa.bedrooms} bed</span>
                <span>{villa.bathrooms} bath</span>
              </div>

              <p className="text-[13px] text-foreground">
                From <span className="font-medium">${villa.priceFrom.toLocaleString("en-US")}</span> / night
              </p>

              <div className="mt-auto flex flex-col gap-2 pt-2">
                <Link href={`/villas/${villa.slug}`}>
                  <Button variant="secondary" className="w-full">
                    Details
                  </Button>
                </Link>
                <CheckAvailabilityButton villaSlug={villa.slug} className="w-full" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="text-center text-[12px] text-muted">
        Lola &amp; Encantada or Coco &amp; Cielo can be combined for larger groups — one calendar, one contract, one
        quote. <Link href="/solicitud" className="text-primary underline underline-offset-2">Ask about combined stays</Link>.
      </p>

      <div className="space-y-8 rounded-2xl border border-border bg-surface p-6 lg:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">Included</p>
          <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">
            Concierge Services
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Breathe, nourish, flow — the island does most of the work. Everything here is already in the rate: daily
            housekeeping, breakfast prepared by our in-house chef, paddle boards and kayaks, private transfers,
            pre-stock service and a 24-hour concierge. None of it is charged as an extra.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: "Daily housekeeping", body: "Rooms reset while you are at the beach — fresh linens, fresh flowers, and purified water in glass carafes on every nightstand." },
            { title: "Gourmet breakfast", body: "Cooked each morning by our in-house chef and served wherever you want it — roof deck, terrace, or the shade beside the pool." },
            { title: "Paddle boards & kayaks", body: "Flat, clear water straight off the deck. Bicycles too, for when the island starts calling." },
            { title: "Pre-stock service", body: "Send us your list. Fridge, pantry and bar are filled with local, seasonal produce before you land." },
            { title: "24-hour concierge", body: "Transfers, boat charters and dinner reservations, handled before you have to ask twice — included in every villa rental, at no extra cost." },
          ].map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-[1px] text-foreground">{item.title}</h3>
              <p className="text-xs leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">On request</p>
          <h3 className="mt-2 text-lg font-light uppercase tracking-[1.5px] text-foreground">Complement Your Stay</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
            Your concierge — already included in the rental — arranges every one of these before you arrive.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["Yoga & Wellness", "Private Boat Transfers", "Private Chef Dinners", "Weddings & Events", "Excursions & Activities"].map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1.5 text-xs uppercase tracking-[1px] text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
