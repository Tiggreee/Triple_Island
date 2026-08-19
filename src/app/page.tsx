import Image from "next/image";
import Link from "next/link";
import { Azulejo, AzulejoRule } from "@/components/ui/azulejo";
import { Button } from "@/components/ui/button";
import { FilmCarousel } from "@/components/film-carousel";
import { FloatingBar } from "@/components/floating-bar";
import { HeroScrim } from "@/components/hero-scrim";

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
  { slug: "lola", name: "Casa Lola", tag: "The newest gem", note: "Rooftop terrace, 360° views of the Caribbean", photo: "/media/coco/villas/lola-01.webp" },
  { slug: "encantada", name: "Villa Encantada", tag: "The inaugural villa", note: "", photo: "/media/coco/villas/encantada-01.webp" },
  { slug: "coco", name: "Casa Coco", tag: "Bohemian elegance", note: "", photo: "/media/coco/villas/coco-01.webp" },
  { slug: "cielo", name: "Casa Cielo", tag: "The sunset bungalow", note: "Private oceanfront saltwater infinity pool", photo: "/media/coco/villas/cielo-01.webp" },
];

const sacBajo = [
  { src: "/media/coco/island-villa-from-water.png", alt: "Villa seen from the water at Sac Bajo" },
  { src: "/media/coco/island-aerial-isla-mujeres.png", alt: "Aerial view of Isla Mujeres" },
  { src: "/media/coco/island-snorkelling-golden-hour.png", alt: "Snorkelling off the coastline at golden hour" },
  { src: "/media/coco/island-paddleboards-under-palms.png", alt: "Paddleboards by the shore under the palms" },
];

const retreatTags = ["Weddings", "Yoga", "Wellness", "Culinary", "Fitness", "Corporate"];

const films = [
  { caption: "Coco by Coco B Isla · 16:9", vimeoId: "418219424", poster: "/media/coco/portfolio-pool.jpg" },
  { caption: "Coco B Wellness & Casa Coco · 16:9" },
  { caption: "Isla Mujeres, from the water · 16:9" },
];

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
  { platform: "Google", score: "4.8", count: "142 reviews", logo: "/media/coco/logo-google-reviews.png" },
  { platform: "Booking", score: "9.5", count: "69 reviews", logo: "/media/coco/logo-booking-com.png" },
  { platform: "Tripadvisor", score: "4.9", count: "159 reviews", logo: "/media/coco/logo-tripadvisor-icon.svg" },
];

const press = [
  { name: "Tripadvisor", logo: "/media/coco/press-tripadvisor-stars.png" },
  { name: "Condé Nast Traveler", logo: "/media/coco/press-conde-nast-traveler.png" },
  { name: "Travelmyth", logo: "/media/coco/press-travelmyth-honeymoon.png" },
  { name: "Boutique Hotel Awards", logo: "/media/coco/press-boutique-hotel-awards.png" },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero — sits flush at the very top so SiteHeader's transparent state (on "/" only,
          before scroll) overlaps it, matching the reference. No CTA button in here: the real
          design's only hero-area action is the nav's "Explore the Villas" pill; the element at
          the bottom is a scroll cue, not a link. Villa list uses white/accent-dot styling, not
          text-accent — that color reads as illegible on a dark photo. */}
      <div className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden lg:min-h-[780px]">
        {/* Poster queda debajo como fallback: se ve mientras el video carga, si el
            navegador bloquea autoplay, o con prefers-reduced-motion (video oculto). */}
        <Image
          src="/media/coco/video/hero-poster.jpg"
          alt="Coco B Isla poolside, palm trees and the Caribbean Sea"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/coco/video/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/coco/video/hero-1920.mp4" media="(min-width: 1024px)" type="video/mp4" />
          <source src="/media/coco/video/hero-1280.mp4" type="video/mp4" />
        </video>
        <HeroScrim />
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
          aria-label="Explore the collection"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[2px] text-white/85 transition hover:text-white"
        >
          <span className="scroll-cue-bob flex flex-col items-center gap-2">
            Explore
            <span className="relative flex h-11 w-11 items-center justify-center">
              <Azulejo tone="white" variant="ring" size={44} className="scroll-cue-ring" />
              <svg viewBox="0 0 24 24" className="absolute h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </a>
      </div>

      <div id="collection" className="mx-auto w-full max-w-[1180px] space-y-24 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        {/* A collection, not a hotel */}
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">
            Luxury villas · Boutique hotels · Destination retreats
          </p>
          <h2 className="text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">A collection, not a hotel</h2>
          <AzulejoRule className="mt-4" />
          <p className="text-sm leading-7 text-muted">
            Four private villas, a retreat centre and a pop-up boutique hotel on the Sac Bajo peninsula. Direct
            access to calm water, breathtaking sunsets over the Mexican Caribbean, and exceptional service for
            exceptional experiences.
          </p>
        </div>

        {/* Three kinds of gathering */}
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">We live for</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Three kinds of gathering</h2>
            <AzulejoRule className="mt-4" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {gatherings.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={item.photo} alt={item.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[1px] text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* The collection */}
        <div className="space-y-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">The collection</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">
              Coco · Lola · Encantada · Cielo
            </h2>
            <AzulejoRule className="mt-4" />
            <p className="mt-3 text-sm leading-7 text-muted">
              Each villa blends indoor and outdoor living, perfect for families, friends, corporate retreats or
              wellness getaways.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 min-[901px]:auto-rows-[300px]">
            {villas.map((villa, i) => (
              <Link
                key={villa.slug}
                href={`/villas/${villa.slug}`}
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl min-[901px]:aspect-auto ${
                  i === 0 ? "min-[901px]:row-span-2" : ""
                } ${i === 3 ? "min-[901px]:col-span-2" : ""}`}
              >
                <Image
                  src={villa.photo}
                  alt={villa.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[11px] font-medium uppercase tracking-[2px] text-white/80">{villa.tag}</p>
                  <h3 className="mt-1 text-lg font-light uppercase tracking-[1.5px]">{villa.name}</h3>
                  {villa.note ? <p className="mt-1 text-xs leading-5 text-white/75">{villa.note}</p> : null}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link href="/villas">
              <Button variant="primary" icon>Explore the villas</Button>
            </Link>
            <p className="text-xs text-muted">Rates, real availability and combined stays for larger groups.</p>
          </div>
        </div>

        {/* Sac Bajo, from the water */}
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">The island</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Sac Bajo, from the water</h2>
            <AzulejoRule className="mt-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_1fr] min-[901px]:auto-rows-[210px]">
            {sacBajo.map((shot, i) => (
              <div
                key={shot.src}
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl min-[901px]:aspect-auto ${
                  i === 0 ? "min-[901px]:row-span-2" : ""
                } ${i === 3 ? "min-[901px]:col-span-2" : ""}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Full-service planning + testimonials */}
        <div className="grid grid-cols-1 gap-10 rounded-2xl border border-border bg-surface p-6 lg:grid-cols-2 lg:p-10">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">Destination retreats</p>
              <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground">Full-service planning for your retreat</h2>
              <AzulejoRule className="mt-4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {retreatTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[1px] text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image src="/media/coco/dining.jpg" alt="Outdoor dining set up for a Coco B retreat" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <Link href="/retiros">
              <Button variant="secondary" icon>Inquire about a retreat</Button>
            </Link>
          </div>
          <div className="space-y-6">
            {testimonials.map((t) => (
              <figure key={t.author} className="space-y-2 border-b border-border pb-6 last:border-0 last:pb-0">
                <blockquote className="text-sm italic leading-7 text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="text-xs uppercase tracking-[1px] text-foreground">{t.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Film — "See the island move" */}
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">Film</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">See the island move</h2>
            <AzulejoRule className="mt-4" />
          </div>
          <FilmCarousel films={films} />
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">What people say</p>
            <h2 className="mt-2 text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">370 verified reviews</h2>
            <AzulejoRule className="mt-4" />
          </div>
          <div className="grid grid-cols-1 gap-4 min-[621px]:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.count} className="rounded-2xl border border-border bg-surface px-4 py-6 text-center">
                <img src={r.logo} alt={r.platform} width={96} height={34} loading="lazy" className="mx-auto mb-3 h-[34px] w-[96px] object-contain" />
                <p className="text-2xl font-semibold text-primary">{r.score}</p>
                <p className="mt-1 text-xs uppercase tracking-[1px] text-muted">{r.count}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-[11px] font-medium uppercase tracking-[2.5px] text-muted">Press &amp; Awards</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {press.map((p) => (
                <img
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="h-9 w-auto object-contain opacity-40 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-muted">
              &ldquo;Best Luxury Villa Collection&rdquo; Q. Roo 2023 · &ldquo;Best Island Retreat Center in the Caribbean&rdquo; 2022,
              LUXlife Magazine · &ldquo;Best Newcomer Boutique Hotel in the Americas&rdquo;
            </p>
          </div>
        </div>

        {/* Pop-up hotel — editorial band over photo */}
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl">
          <Image
            src="/media/coco/sunset-pool.jpg"
            alt="Oceanfront pool at sunset"
            fill
            sizes="(min-width: 1180px) 1180px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/45 to-foreground/10 sm:bg-gradient-to-r sm:from-foreground/85 sm:via-foreground/40 sm:to-transparent" />
          <Azulejo tone="white" size={180} className="pointer-events-none absolute -right-8 -top-8 opacity-[0.08]" />
          <Azulejo tone="white" size={120} className="pointer-events-none absolute -bottom-6 right-28 opacity-[0.06]" />
          <div className="relative max-w-md space-y-4 p-8 text-white sm:p-12">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-white/80">Oceanfront boutique · pop-up hotel</p>
            <h2 className="text-2xl font-light uppercase tracking-[2px] lg:text-3xl">Coco &amp; Lola, by the room</h2>
            <p className="text-sm leading-7 text-white/85">
              When the villas aren&rsquo;t booked whole, single suites open for stays inside 30 days of arrival.
            </p>
            <Link href="/solicitud">
              <Button variant="light" icon>Ask about last-minute stays</Button>
            </Link>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-center lg:text-left">
            <p className="text-xs font-medium uppercase tracking-[2.5px] text-brand">A privileged location</p>
            <h2 className="text-2xl font-light uppercase tracking-[2px] text-foreground lg:text-3xl">Isla Mujeres</h2>
            <AzulejoRule className="mt-4" />
            <p className="text-sm leading-7 text-muted">
              Just a 25 minute boat ride off the coast of Cancún, you&rsquo;ll find Isla Mujeres — a small and
              alluring island with some of the most beautiful beaches and coastlines in all the Caribbean.
            </p>
            <p className="text-sm leading-7 text-muted">
              Our location on the Sac Bajo peninsula lets you enjoy a sargasso-free experience all year long. All
              four villas are within walking distance of one another.
            </p>
            <Link href="/villas">
              <Button variant="secondary" icon>Explore the villas</Button>
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Map of Sac Bajo, Isla Mujeres"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-86.78%2C21.20%2C-86.70%2C21.27&layer=mapnik&marker=21.238%2C-86.744"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 [filter:saturate(.86)]"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[1.5px] text-foreground shadow-lg [backdrop-filter:blur(6px)]">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Sac Bajo, Isla Mujeres
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="rounded-2xl border border-border bg-[color:var(--cb-color-foreground,#0e2530)] px-8 py-12 text-white">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/coco/logo-white.png" alt="Coco B Isla" className="h-9 w-auto" />
            <p className="text-white/70">Isla Mujeres, Quintana Roo, Mexico.</p>
            <p className="text-white/70">Luxury villas on the Sac Bajo peninsula · 3–27 suites.</p>
          </div>
          <nav className="space-y-2" aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-white/50">Explore</p>
            <Link href="/villas" className="block text-white/80 hover:text-white">Villas</Link>
            <Link href="/retiros" className="block text-white/80 hover:text-white">Retreats</Link>
            <Link href="/solicitud" className="block text-white/80 hover:text-white">Plan a stay</Link>
            <Link href="/villas/lola" className="block text-white/80 hover:text-white">Casa Lola</Link>
            <Link href="/villas/coco" className="block text-white/80 hover:text-white">Casa Coco</Link>
          </nav>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-white/50">Reservations</p>
            <a href="tel:+18334392626" className="block text-white/80 hover:text-white">US toll-free 833 439 2626</a>
            <p className="text-white/60">9 a.m. – 5 p.m. Central</p>
            <a href="mailto:reservations@cocobisla.com" className="block text-white/80 hover:text-white">reservations@cocobisla.com</a>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-white/50">Concierge</p>
            <p className="text-white/60">7 a.m. – 11 p.m. Central</p>
            <p className="text-white/80">WhatsApp <a href="https://wa.me/529983154343" className="underline decoration-white/40 underline-offset-2 hover:decoration-white">+52 998 315 4343</a></p>
            <a href="mailto:jeffrey@cocobisla.com" className="block text-white/80 hover:text-white">jeffrey@cocobisla.com</a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1180px] border-t border-white/10 pt-6 text-xs leading-6 text-white/40">
          All rates are per night in US dollars and subject to 21% Mexican tax. Minimum stay requirements apply to
          each season: 5 nights at Thanksgiving and Spring Break, 7 nights at Christmas and New Year. Rates shown
          are the published 2026–2028 peak-season starting rates.
        </p>
      </footer>
      <FloatingBar />
    </div>
  );
}
