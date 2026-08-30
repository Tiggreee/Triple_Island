import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { getRetreats } from "@/lib/wp-fetchers";

type RetreatCardData = {
  slug: string;
  name: string;
  date: string;
  endDate?: string;
  type?: string;
  capacity?: number;
  spotsLeft?: number;
  priceIndicative?: string;
  photo?: string | null;
};

function selectUpcoming(items: RetreatCardData[]) {
  const now = Date.now();
  return items.filter((item) => {
    const parsed = Date.parse(item.date);
    return Number.isNaN(parsed) || parsed >= now;
  });
}

function formatDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function RetirosPage() {
  const retreats = await getRetreats();
  const items: RetreatCardData[] = retreats.map((retreat) => ({
    slug: retreat.slug,
    name: retreat.title.rendered,
    date: retreat.meta?.start_date ?? "",
    endDate: retreat.meta?.end_date,
    type: retreat.meta?.retreat_type,
    capacity: retreat.meta?.capacity,
    spotsLeft: retreat.meta?.spots_left,
    priceIndicative: retreat.meta?.indicative_price,
    photo: retreat.featured_media_url,
  }));

  const list = selectUpcoming(items);

  return (
    <>
    <div className="mx-auto w-full max-w-[1180px] space-y-10 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="text-center">
        <h1 className="text-[23.5px] font-light uppercase leading-[22.74px] tracking-[2.584px] text-foreground lg:text-[30.8px] lg:leading-[29.84px] lg:tracking-[3.391px]">
          Upcoming Retreats
        </h1>
        <p className="mt-[31px] mx-auto max-w-2xl text-[13.5px] font-light leading-[27.2px] text-muted lg:text-[14.3px] lg:leading-[28.9px]">
          Yoga, culinary, wellness and corporate retreats hosted across the Coco B villas.
        </p>
      </div>

      <hr className="border-t border-primary" />

      {list.length === 0 ? (
        <div className="mx-auto max-w-md space-y-4 rounded-[14px] border border-border bg-surface p-8 text-center">
          <p className="text-[13.5px] leading-7 text-muted">
            No retreats are open for booking right now. Reach out and we&rsquo;ll let you know what&rsquo;s next.
          </p>
          <Link href="/solicitud?type=retiro">
            <Button variant="secondary">Ask about upcoming retreats</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((retreat) => {
            const isFull = typeof retreat.spotsLeft === "number" && retreat.spotsLeft <= 0;
            return (
              <article key={retreat.slug} className="flex flex-col overflow-hidden rounded-[14px] border border-border bg-surface">
                {retreat.photo ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image src={retreat.photo} alt={retreat.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {retreat.type ? (
                    <span className="w-fit border border-border px-2 py-1 text-[10px] uppercase tracking-[1.4px] text-muted">
                      {retreat.type}
                    </span>
                  ) : null}
                  <h2 className="text-[16.8px] font-light uppercase leading-[16.87px] tracking-[1.863px] text-foreground">
                    {retreat.name}
                  </h2>
                  <p className="text-[13px] text-muted">
                    {formatDate(retreat.date)}
                    {retreat.endDate ? ` – ${formatDate(retreat.endDate)}` : ""}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-[12px] text-muted">
                    {retreat.capacity ? <span>Up to {retreat.capacity} guests</span> : null}
                    {typeof retreat.spotsLeft === "number" ? (
                      <span>{isFull ? "Fully booked" : `${retreat.spotsLeft} spots left`}</span>
                    ) : null}
                  </div>

                  {retreat.priceIndicative ? (
                    <p className="text-[13px] text-foreground">From {retreat.priceIndicative}</p>
                  ) : null}

                  <div className="mt-auto flex flex-col gap-2 pt-2">
                    <Link href={`/retiros/${retreat.slug}`}>
                      <Button variant="secondary" className="w-full">
                        Details
                      </Button>
                    </Link>
                    <Link href={`/solicitud?type=${isFull ? "waitlist" : "retiro"}&ref=${encodeURIComponent(retreat.name)}`}>
                      <Button variant="primary" className="w-full">
                        {isFull ? "Join Waitlist" : "Inquire"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
    <SiteFooter />
    </>
  );
}
