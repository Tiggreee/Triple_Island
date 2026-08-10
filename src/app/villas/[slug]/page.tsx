import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getVilla } from "@/lib/wp-fetchers";

// Same real data source as the listing page — see src/app/villas/page.tsx.
const realVillas = [
  {
    slug: "coco",
    name: "Casa Coco",
    suites: 10,
    guests: 20,
    bedrooms: 10,
    bathrooms: 10,
    priceFrom: 4840,
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
    description:
      "An intimate, newly renovated four-bedroom bungalow with a private oceanfront saltwater infinity pool and the best sunset vistas on the island. A fifth suite can be added on request.",
    extra: "A 5th suite may be added for US$150–200 extra per night, depending on season.",
  },
];

const galleryCounts: Record<string, number> = { coco: 5, encantada: 5, lola: 5, cielo: 5 };

type VillaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug } = await params;
  const real = realVillas.find((v) => v.slug === slug);
  const wp = await getVilla(slug);

  if (!real && !wp) {
    notFound();
  }

  const name = wp?.title.rendered ?? real?.name ?? slug;
  const suites = wp?.meta?.suite_capacity ?? real?.suites ?? 0;
  const guests = wp?.meta?.guest_capacity ?? real?.guests;
  const bedrooms = wp?.meta?.bedrooms ?? real?.bedrooms;
  const bathrooms = wp?.meta?.bathrooms ?? real?.bathrooms;
  const priceFrom = wp?.meta?.price_from ?? real?.priceFrom;
  const description = wp?.meta?.long_description ?? wp?.excerpt?.rendered ?? real?.description;
  const extra = real?.extra;
  const galleryCount = galleryCounts[slug] ?? 0;
  const gallery = Array.from({ length: galleryCount }, (_, i) => `/media/coco/villas/${slug}-0${i + 1}.webp`);

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link href="/villas" className="text-[12px] uppercase tracking-[1.8px] text-muted hover:text-foreground">
        &larr; Back to villas
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[16/7]">
        <Image src={gallery[0] ?? "/media/coco/villas/coco-01.webp"} alt={`${name} exterior`} fill sizes="100vw" priority className="object-cover" />
      </div>

      {gallery.length > 1 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.slice(1).map((photo) => (
            <div key={photo} className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={photo} alt={`${name} detail photo`} fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <h1 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            {name}
          </h1>
          {description ? (
            <p className="max-w-2xl text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
              {description}
            </p>
          ) : null}
          {extra ? <p className="text-[12px] text-accent">{extra}</p> : null}

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-[13px] text-muted">
            <span>{suites} suites</span>
            {guests ? <span>{guests} guests</span> : null}
            {bedrooms ? <span>{bedrooms} bedrooms</span> : null}
            {bathrooms ? <span>{bathrooms} bathrooms</span> : null}
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
          {priceFrom ? (
            <p className="text-[13px] text-foreground">
              From <span className="text-[22px] font-medium">${priceFrom.toLocaleString("en-US")}</span> / night
              <span className="block text-[11px] text-muted">+ 21% tax</span>
            </p>
          ) : (
            <p className="text-[13px] text-muted">Contact us for rates and availability.</p>
          )}
          {/* Confirmed by Caro (client), 2026-08-10: 60/40 deposit structure, placed with the
              other hard facts (min-stay/tax). Applies only once a booking is confirmed — the
              inquiry itself stays free, no payment/card, matching the stepper's messaging. */}
          <p className="border-t border-border pt-3 text-[11px] leading-5 text-muted">
            60% deposit at booking · 40% due 90 days before check-in
          </p>
          <Link href="/solicitud">
            <Button variant="primary" className="w-full">
              Check Availability
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
