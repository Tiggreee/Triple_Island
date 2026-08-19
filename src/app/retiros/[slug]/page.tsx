import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getRetreat } from "@/lib/wp-fetchers";

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

type RetiroDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RetiroDetailPage({ params }: RetiroDetailPageProps) {
  const { slug } = await params;
  const retreat = await getRetreat(slug);

  if (!retreat) {
    notFound();
  }

  const isFull = typeof retreat.meta?.spots_left === "number" && retreat.meta.spots_left <= 0;

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link href="/retiros" className="text-[12px] uppercase tracking-[1.8px] text-muted hover:text-foreground">
        &larr; Back to retreats
      </Link>

      {retreat.featured_media_url ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[16/7]">
          <Image src={retreat.featured_media_url} alt={retreat.title.rendered} fill sizes="100vw" priority className="object-cover" />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {retreat.meta?.retreat_type ? (
            <span className="w-fit border border-border px-2 py-1 text-[10px] uppercase tracking-[1.4px] text-muted">
              {retreat.meta.retreat_type}
            </span>
          ) : null}
          <h1 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
            {retreat.title.rendered}
          </h1>
          <p className="text-[13px] text-muted">
            {formatDate(retreat.meta?.start_date)}
            {retreat.meta?.end_date ? ` – ${formatDate(retreat.meta.end_date)}` : ""}
          </p>
          {retreat.excerpt?.rendered ? (
            <p className="max-w-2xl text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
              {retreat.excerpt.rendered}
            </p>
          ) : null}
          {retreat.meta?.host_name ? (
            <p className="text-[13px] text-muted">Hosted by {retreat.meta.host_name}</p>
          ) : null}

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-[13px] text-muted">
            {retreat.meta?.capacity ? <span>Up to {retreat.meta.capacity} guests</span> : null}
            {typeof retreat.meta?.spots_left === "number" ? (
              <span>{isFull ? "Fully booked" : `${retreat.meta.spots_left} spots left`}</span>
            ) : null}
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
          {retreat.meta?.indicative_price ? (
            <p className="text-[13px] text-foreground">
              From <span className="text-[22px] font-medium">{retreat.meta.indicative_price}</span>
            </p>
          ) : (
            <p className="text-[13px] text-muted">Contact us for pricing and availability.</p>
          )}
          <Link href={`/solicitud?type=${isFull ? "waitlist" : "retiro"}&ref=${encodeURIComponent(retreat.title.rendered)}`}>
            <Button variant="primary" className="w-full">
              {isFull ? "Join Waitlist" : "Inquire"}
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
