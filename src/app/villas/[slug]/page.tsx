import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckAvailabilityButton } from "@/components/booking/check-availability-button";
import { SiteFooter } from "@/components/site-footer";
import { REAL_VILLAS } from "@/lib/villas-data";
import { getVilla } from "@/lib/wp-fetchers";

const galleryCounts: Record<string, number> = { coco: 5, encantada: 5, lola: 5, cielo: 5 };

type VillaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug } = await params;
  const real = REAL_VILLAS.find((v) => v.slug === slug);
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
    <>
    <div className="mx-auto w-full max-w-[1180px] space-y-8 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <Link href="/villas" className="text-[12px] uppercase tracking-[1.8px] text-muted hover:text-foreground">
        &larr; Back to villas
      </Link>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] lg:aspect-[16/7]">
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

        <aside className="flex flex-col gap-4 rounded-[14px] border border-border bg-surface p-5">
          {priceFrom ? (
            <p className="text-[13px] text-foreground">
              From <span className="text-[22px] font-medium">${priceFrom.toLocaleString("en-US")}</span> / night
              <span className="block text-[11px] text-muted">+ 21% tax</span>
            </p>
          ) : (
            <p className="text-[13px] text-muted">Contact us for rates and availability.</p>
          )}
          <p className="border-t border-border pt-3 text-[11px] leading-5 text-muted">
            60% deposit at booking · 40% due 90 days before check-in
          </p>
          <CheckAvailabilityButton villaSlug={slug} className="w-full" />
        </aside>
      </div>

    </div>
    <SiteFooter />
    </>
  );
}
