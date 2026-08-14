import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionRule } from "@/components/ui/section-rule";

const gatherings = [
  {
    title: "Friends & family",
    body: "Whole houses for people who want the island to themselves.",
    photo: "/media/coco/catamaran.jpg",
  },
  {
    title: "Wellness & team retreats",
    body: "Yoga, culinary, fitness and corporate programmes, fully hosted.",
    photo: "/media/coco/yoga-mats.jpg",
  },
  {
    title: "Weddings & celebrations",
    body: "Ceremonies on the sand, dinners under the palapa.",
    photo: "/media/coco/wedding-beach.jpg",
  },
];

const villas = [
  { slug: "lola", name: "Casa Lola", tag: "The newest gem", note: "Rooftop terrace, 360° views of the Caribbean", photo: "/media/coco/teaser-casa-lola.png" },
  { slug: "encantada", name: "Villa Encantada", tag: "The inaugural villa", note: "", photo: "/media/coco/teaser-villa-encantada.png" },
  { slug: "coco", name: "Casa Coco", tag: "Bohemian elegance", note: "", photo: "/media/coco/teaser-casa-coco.png" },
  { slug: "cielo", name: "Casa Cielo", tag: "The sunset bungalow", note: "Private oceanfront saltwater infinity pool", photo: "/media/coco/teaser-casa-cielo.png" },
];

const retreatTags = ["Weddings", "Yoga", "Wellness", "Culinary", "Fitness", "Corporate"];

const testimonials = [
  {
    quote:
      "I've been leading yoga retreats for almost 15 years and this was by far one of the very best ever. Casa Coco is stunning and the staff became our friends.",
    author: "Jill Knouse · Tripadvisor",
  },
  {
    quote:
      "A beautiful oasis with warm staff, stunning rooms and a yoga studio with magnificent views from every angle.",
    author: "Paul Gould & Jennifer Fox · NamaStay Yoga",
  },
  {
    quote:
      "The energy here is so incredible that it will heal you completely and energize you — maybe even change your life.",
    author: "Alice R. · Mexico City",
  },
];

const reviews = [
  { score: "4.8", count: "142 reviews", source: "Google Reviews", logo: "/media/coco/logo-google-reviews.png", logoWidth: 85 },
  { score: "9.5", count: "69 reviews", source: "Booking.com", logo: "/media/coco/logo-booking-com.png", logoWidth: 96 },
  { score: "4.9", count: "159 reviews", source: "Tripadvisor", logo: "/media/coco/logo-tripadvisor-icon.svg", logoWidth: 96 },
];

const press = [
  { alt: "Tripadvisor five stars", src: "/media/coco/press-tripadvisor-stars.png", width: 80 },
  { alt: "Condé Nast Traveler", src: "/media/coco/press-conde-nast-traveler.png", width: 141 },
  { alt: "Travelmyth Honeymoon Hotels Collection", src: "/media/coco/press-travelmyth-honeymoon.png", width: 58 },
  { alt: "Boutique Hotel Awards winner", src: "/media/coco/press-boutique-hotel-awards.png", width: 51 },
];

export default function Home() {
  return (
    <div className="w-full">
      <div className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden lg:min-h-[780px]">
        <Image
          src="/media/coco/portfolio-pool.jpg"
          alt="Coco B Isla poolside, palm trees and the Caribbean Sea"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/25 to-foreground/60" />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[3px] text-white/85">Isla Mujeres · Quintana Roo · Mexico</p>
          <h1 className="mt-4 font-sans text-5xl font-extralight uppercase tracking-[4px] lg:text-7xl">Coco B Isla</h1>
          <p className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[2.5px] text-white/90">
            {["Lola", "Encantada", "Coco", "Cielo"].map((name, i) => (
              <span key={name} className="flex items-center gap-3">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-brand" /> : null}
                {name}
              </span>
            ))}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/90">
            Luxury villas, boutique hotels and destination retreats, set on the shores of Isla Mujeres — one of
            Mexico and the Caribbean&rsquo;s most idyllic settings.
          </p>
        </div>
        <a
          href="#collection"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[2px] text-white/85 transition hover:text-white"
        >
          Explore
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40">
            <Image src="/media/coco/az-icon.svg" alt="" width={14} height={14} className="brightness-0 invert" />
          </span>
        </a>
      </div>

      <div id="collection" className="mx-auto w-full max-w-[1180px] space-y-24 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">
            Luxury villas · Boutique hotels · Destination retreats
          </p>
          <h2 className="text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">A collection, not a hotel</h2>
          <SectionRule />
          <p className="text-sm leading-7 text-muted">
            Four private villas, a retreat centre and a pop-up boutique hotel on the Sac Bajo peninsula. Direct
            access to calm water, breathtaking sunsets over the Mexican Caribbean, and exceptional service for
            exceptional experiences.
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">We live for</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Three kinds of gathering</h2>
            <SectionRule />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {gatherings.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/3] w-full">
                  <Image src={item.photo} alt={item.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[1px] text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">The collection</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">
              Coco · Lola · Encantada · Cielo
            </h2>
            <SectionRule />
            <p className="mt-3 text-sm leading-7 text-muted">
              Each villa blends indoor and outdoor living, perfect for families, friends, corporate retreats or
              wellness getaways.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[300px]">
            {villas.map((villa, i) => (
              <Link
                key={villa.slug}
                href={`/villas/${villa.slug}`}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-border bg-surface",
                  "aspect-[4/3] sm:aspect-auto",
                  i === 0 ? "sm:row-span-2" : i === 3 ? "sm:col-span-2" : "",
                ].join(" ")}
              >
                <Image
                  src={villa.photo}
                  alt={`${villa.name} exterior`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 from-40% to-foreground/70" />
                <div className="absolute inset-x-6 bottom-6 space-y-2">
                  <p className="text-[10.5px] uppercase tracking-[2.4px] text-white/85">{villa.tag}</p>
                  <h3 className="text-2xl font-light uppercase tracking-[2.4px] text-white">{villa.name}</h3>
                  {villa.note ? <p className="text-[13.5px] leading-5 text-white/85">{villa.note}</p> : null}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link href="/villas">
              <Button variant="primary">Explore the villas</Button>
            </Link>
            <p className="text-xs text-muted">Rates, real availability and combined stays for larger groups.</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">The island</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Sac Bajo, from the water</h2>
            <SectionRule />
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[2fr_1fr_1fr] sm:auto-rows-[210px]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-auto sm:row-span-2">
              <Image src="/media/coco/island-villa-from-water.png" alt="Villa seen from the water at Sac Bajo, steps down to the beach with a kayak" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-auto">
              <Image src="/media/coco/island-aerial-isla-mujeres.png" alt="Aerial view of Isla Mujeres" fill sizes="(min-width: 640px) 25vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-auto">
              <Image src="/media/coco/island-paddleboards-under-palms.png" alt="Paddleboards resting among the palms at Sac Bajo" fill sizes="(min-width: 640px) 25vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface sm:col-span-2 sm:aspect-auto">
              <Image src="/media/coco/island-snorkelling-golden-hour.png" alt="Snorkelling off the Sac Bajo coastline at golden hour" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">Destination retreats</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">
              Full-service planning
              <br />
              for your retreat
            </h2>
            <SectionRule />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {retreatTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-accent">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image src="/media/coco/retreat-pool-sunset.png" alt="Guest by the infinity pool at sunset" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image src="/media/coco/retreat-ceremony-palapa.png" alt="Ceremony under the palapa" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.author} className="space-y-3 rounded-2xl border border-border bg-surface p-6">
                <blockquote className="text-sm leading-7 text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="text-[10.5px] font-semibold uppercase tracking-[1.8px] text-brand">{t.author}</figcaption>
              </figure>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/retiros">
              <Button variant="secondary">Inquire about a retreat</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">What people say</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">370 verified reviews</h2>
            <SectionRule />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.count} className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-5">
                <Image src={r.logo} alt={r.source} width={r.logoWidth} height={34} className="h-[34px] w-auto shrink-0 object-contain" />
                <div>
                  <span className="text-3xl font-light tracking-[0.5px] text-brand">{r.score}</span>
                  <span className="ml-2 text-xs text-muted">{r.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5 border-t border-border pt-8">
            <p className="text-center text-[10.5px] font-semibold uppercase tracking-[2.4px] text-muted">Press &amp; awards</p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {press.map((p) => (
                <Image
                  key={p.alt}
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={52}
                  className="h-[52px] w-auto object-contain opacity-40 grayscale transition hover:opacity-80 hover:grayscale-[35%]"
                />
              ))}
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-center text-xs leading-6 text-muted">
            &ldquo;Best Luxury Villa Collection&rdquo; Q. Roo 2023 · &ldquo;Best Island Retreat Center in the Caribbean&rdquo; 2022,
            LUXlife Magazine · &ldquo;Best Newcomer Boutique Hotel in the Americas&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-border bg-surface p-8 text-center lg:grid-cols-[2fr_1fr] lg:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">Oceanfront boutique · pop-up hotel</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground">Coco &amp; Lola, by the room</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              When the villas aren&rsquo;t booked whole, single suites open for stays inside 30 days of arrival.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Link href="/solicitud">
              <Button variant="primary">Ask about last-minute stays</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">A privileged location</p>
            <h2 className="text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Isla Mujeres</h2>
            <p className="text-sm leading-7 text-muted">
              Just a 25 minute boat ride off the coast of Cancún, you&rsquo;ll find Isla Mujeres — a small and
              alluring island with some of the most beautiful beaches and coastlines in all the Caribbean.
            </p>
            <p className="text-sm leading-7 text-muted">
              Our location on the Sac Bajo peninsula lets you enjoy a sargasso-free experience all year long. All
              four villas are within walking distance of one another.
            </p>
            <Link href="/villas">
              <Button variant="secondary">Explore the villas</Button>
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps?q=Isla%20Mujeres%2C%20Quintana%20Roo%2C%20Mexico&z=12&output=embed"
              title="Map showing Isla Mujeres, Quintana Roo, Mexico"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <footer className="rounded-2xl border border-border bg-[color:var(--cb-color-foreground,#1c1c1c)] px-8 py-12 text-[#C9C3B9]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-2">
            <p className="font-extralight uppercase tracking-[5px] text-white">Coco B Isla</p>
            <p>Isla Mujeres, Quintana Roo, Mexico.</p>
            <p>Luxury villas on the Sac Bajo peninsula.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Villa groups</p>
            <p>3 – 27 suites</p>
            <a href="tel:+12065790798" className="block text-[#9FD4EC] no-underline hover:underline">
              +1 206 579 0798
            </a>
            <a href="mailto:jeffrey@cocobisla.com" className="block text-[#9FD4EC] no-underline hover:underline">
              jeffrey@cocobisla.com
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Reservations</p>
            <p>US toll-free 833 439 2626</p>
            <p>9 a.m. – 5 p.m. Central</p>
            <a href="mailto:reservations@cocobisla.com" className="block text-[#9FD4EC] no-underline hover:underline">
              reservations@cocobisla.com
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Concierge</p>
            <p>7 a.m. – 11 p.m. Central</p>
            <p>
              WhatsApp{" "}
              <a href="https://wa.me/529983154343" className="text-[#9FD4EC] no-underline hover:underline">
                +52 998 315 4343
              </a>
            </p>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1180px] border-t border-[#333] pt-6 text-xs leading-6 text-[#8E887E]">
          All rates are per night in US dollars and subject to 21% Mexican tax. Minimum stay requirements apply to
          each season: 5 nights at Thanksgiving and Spring Break, 7 nights at Christmas and New Year. Rates shown
          are the published 2026–2028 peak-season starting rates.
        </p>
      </footer>
    </div>
  );
}
