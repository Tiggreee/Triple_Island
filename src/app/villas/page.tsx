import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getVillas } from "@/lib/wp-fetchers";

// Every field below is real, pulled directly from the live reference
// build's own data (cocobislanewsite.netlify.app/villas, its `const V=[...]`
// array) — not estimated. Photos are the site's actual /img/villas/ files.
const realVillas = [
  {
    slug: "coco",
    name: "Casa Coco",
    suites: 10,
    guests: 20,
    bedrooms: 10,
    bathrooms: 10,
    priceFrom: 4840,
    photo: "/media/coco/villas/coco-01.webp",
    description:
      "Casa Coco embodies refined bohemian elegance with its casual yet sophisticated decor. Ten meticulously designed suites blend comfort and luxury with custom tiles, doors and furnishings that reflect the vibrant culture of the island and region.",
  },
  {
    slug: "encantada",
    name: "Villa Encantada",
    suites: 6,
    guests: 12,
    bedrooms: 6,
    bathrooms: 6,
    priceFrom: 2860,
    photo: "/media/coco/villas/encantada-01.webp",
    description:
      "The inaugural gem of the Coco B collection. Villa Encantada perfectly blends sophistication and elegance, with open living spaces that spill straight onto the water.",
  },
  {
    slug: "lola",
    name: "Casa Lola",
    suites: 7,
    guests: 14,
    bedrooms: 7,
    bathrooms: 8,
    priceFrom: 3740,
    photo: "/media/coco/villas/lola-01.webp",
    description:
      "The island's newest and most coveted beach villa. Seven exquisite suites, expansive open-air spaces and a rooftop terrace with stunning 360-degree views of the Caribbean.",
  },
  {
    slug: "cielo",
    name: "Casa Cielo",
    suites: 4,
    guests: 8,
    bedrooms: 4,
    bathrooms: 5,
    priceFrom: 1665,
    photo: "/media/coco/villas/cielo-01.webp",
    description:
      "An intimate, newly renovated four-bedroom bungalow with a private oceanfront saltwater infinity pool and the best sunset vistas on the island. A fifth suite can be added on request.",
  },
];

export default async function VillasPage() {
  const villas = await getVillas();
  const items = realVillas.map((real) => {
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
    <div className="mx-auto w-full max-w-[1180px] space-y-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="text-center">
        <h1 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
          Our Villa Collection
        </h1>
        <p className="mt-[31px] max-w-2xl mx-auto text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
          Four private villas on the Sac Bajo peninsula — four to twenty-seven suites, steps from calm water.
        </p>
      </div>

      <hr className="border-t border-primary" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((villa) => (
          <article key={villa.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={villa.photo}
                alt={`${villa.name} exterior`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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
                <Link href="/solicitud">
                  <Button variant="primary" className="w-full">
                    Check Availability
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="text-center text-[12px] text-muted">
        Lola &amp; Encantada or Coco &amp; Cielo can be combined for larger groups — one calendar, one contract, one
        quote. <Link href="/solicitud" className="text-primary underline underline-offset-2">Ask about combined stays</Link>.
      </p>

      {/* Concierge services — real copy from the reference build. Doubles as the Change-2 proof
          point from Caro's feedback (2026-08-10): concierge is included in the rental, never
          billed as an extra. Don't reword this — it's already client-approved language. */}
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
  );
}
