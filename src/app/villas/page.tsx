import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getVillas } from "@/lib/wp-fetchers";

// Photos: Coco and Encantada are full-res exports pulled directly from Figma
// (public/media/figma/*). Lola and Cielo have no equivalent in the Figma file —
// those two came from Gerson's public/villas/ shoot (PR #18, "imagenes
// ajustadas"). Specs (guests/bedrooms/bathrooms/price) are only confirmed for
// Casa Coco so far, pulled from the live site — the other three stay unlisted
// until WP has real ACF values for them rather than guessing numbers.
const fallbackVillas = [
  {
    slug: "coco",
    name: "Coco",
    suites: 6,
    photo: "/media/figma/casa-coco-1.jpg",
    description: "Refined bohemian elegance with casual yet sophisticated decor.",
    guests: 20,
    bedrooms: 10,
    bathrooms: 10,
    priceFrom: 4840,
  },
  { slug: "lola", name: "Lola", suites: 5, photo: "/media/figma/villa-lola-1.jpg" },
  { slug: "encantada", name: "Encantada", suites: 7, photo: "/media/figma/villa-encantada-1.jpg" },
  { slug: "cielo", name: "Cielo", suites: 4, photo: "/media/figma/villa-cielo-1.jpg" },
];

export default async function VillasPage() {
  const villas = await getVillas();
  const items = villas.length
    ? villas.map((villa) => {
        const fallback = fallbackVillas.find((item) => item.slug === villa.slug);
        return {
          slug: villa.slug,
          name: villa.title.rendered,
          suites: villa.meta?.suite_capacity ?? fallback?.suites ?? 0,
          photo: villa.featured_media_url ?? fallback?.photo ?? fallbackVillas[0].photo,
          description: villa.meta?.short_description ?? villa.excerpt?.rendered ?? fallback?.description,
          guests: villa.meta?.guest_capacity ?? fallback?.guests,
          bedrooms: villa.meta?.bedrooms ?? fallback?.bedrooms,
          bathrooms: villa.meta?.bathrooms ?? fallback?.bathrooms,
          priceFrom: villa.meta?.price_from ?? fallback?.priceFrom,
        };
      })
    : fallbackVillas;

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="text-center">
        <h1 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
          Our Villa Collection
        </h1>
        <p className="mt-[31px] max-w-2xl mx-auto text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
          Four private villas on the Sac Bajo peninsula — three to twenty-seven suites, steps from calm water.
        </p>
      </div>

      <hr className="border-t border-primary" />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((villa) => (
          <article key={villa.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={villa.photo}
                alt={`${villa.name} villa exterior`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h2 className="text-[16.8px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground">
                {villa.name}
              </h2>
              {villa.description ? (
                <p className="text-[13px] font-light leading-[24px] text-muted">{villa.description}</p>
              ) : null}

              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-[12px] text-muted">
                <span>{villa.suites} suites</span>
                {villa.guests ? <span>{villa.guests} guests</span> : null}
                {villa.bedrooms ? <span>{villa.bedrooms} bedrooms</span> : null}
                {villa.bathrooms ? <span>{villa.bathrooms} bathrooms</span> : null}
              </div>

              {villa.priceFrom ? (
                <p className="text-[13px] text-foreground">
                  From <span className="font-medium">${villa.priceFrom.toLocaleString("en-US")}</span> / night
                </p>
              ) : null}

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
    </div>
  );
}
