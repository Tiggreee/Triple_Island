import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getVilla } from "@/lib/wp-fetchers";

// Same fallback set as the listing page — see src/app/villas/page.tsx for the
// sourcing note on photos and specs.
const fallbackVillas = [
  {
    slug: "coco",
    name: "Coco",
    suites: 6,
    photo: "/media/figma/casa-coco-1.jpg",
    description: "Casa Coco embodies refined bohemian elegance with its casual yet sophisticated decor.",
    guests: 20,
    bedrooms: 10,
    bathrooms: 10,
    priceFrom: 4840,
  },
  { slug: "lola", name: "Lola", suites: 5, photo: "/media/figma/villa-lola-1.jpg" },
  { slug: "encantada", name: "Encantada", suites: 7, photo: "/media/figma/villa-encantada-1.jpg" },
  { slug: "cielo", name: "Cielo", suites: 4, photo: "/media/figma/villa-cielo-1.jpg" },
];

type VillaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug } = await params;
  const villa = await getVilla(slug);
  const fallback = fallbackVillas.find((item) => item.slug === slug);

  if (!villa && !fallback) {
    notFound();
  }

  const name = villa?.title.rendered ?? fallback?.name ?? slug;
  const photo = villa?.featured_media_url ?? fallback?.photo ?? fallbackVillas[0].photo;
  const suites = villa?.meta?.suite_capacity ?? fallback?.suites ?? 0;
  const description = villa?.meta?.long_description ?? villa?.excerpt?.rendered ?? fallback?.description;
  const guests = villa?.meta?.guest_capacity ?? fallback?.guests;
  const bedrooms = villa?.meta?.bedrooms ?? fallback?.bedrooms;
  const bathrooms = villa?.meta?.bathrooms ?? fallback?.bathrooms;
  const priceFrom = villa?.meta?.price_from ?? fallback?.priceFrom;

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link href="/villas" className="text-[12px] uppercase tracking-[1.8px] text-muted hover:text-foreground">
        &larr; Back to villas
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[16/7]">
        <Image src={photo} alt={`${name} villa exterior`} fill sizes="100vw" priority className="object-cover" />
      </div>

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
