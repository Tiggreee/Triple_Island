import Image from "next/image";
import Link from "next/link";
import { Azulejo } from "@/components/ui/azulejo";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { FilmCarousel } from "@/components/film-carousel";
import { FloatingBar } from "@/components/floating-bar";
import { HeroScrim } from "@/components/hero-scrim";
import { HeroVideo } from "@/components/hero-video";
import { SiteFooter } from "@/components/site-footer";
import { LatticeBackground } from "@/components/ui/lattice-background";
import { VillaCollectionGrid } from "@/components/villa/villa-collection-grid";

const gatherings = [
  {
    title: "Friends & family",
    body: "Whole houses for people who want the island to themselves.",
    photo: "/media/coco/friends-family-palapa.webp",
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

const experiences = [
  { title: "Yoga & wellness", body: "Sunrise sessions and hosted retreats, led by seasoned instructors.", photo: "/media/coco/yoga-mats.jpg" },
  { title: "Private boat transfers", body: "Arrivals by private boat and charters across the Caribbean.", photo: "/media/coco/catamaran.jpg" },
  { title: "Private chef dinners", body: "In-house chefs cooking family-style, wherever you want to eat.", photo: "/media/coco/dining.jpg" },
  { title: "Weddings & events", body: "Ceremonies on the sand and dinners under the palapa.", photo: "/media/coco/wedding-ceremony.jpg" },
  { title: "Excursions & activities", body: "Snorkelling, paddleboards and island adventures at your door.", photo: "/media/coco/island-snorkelling-golden-hour.png" },
  { title: "Spa & massage", body: "In-villa treatments and massage, arranged on request.", photo: "/media/coco/sunset-pool.jpg" },
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
  { caption: "Coco by Coco B Isla · 16:9", vimeoId: "418219424", poster: "/media/coco/guest-pool-sunset.webp" },
  { caption: "Lola by Coco B Isla · 16:9", vimeoId: "507749458", poster: "/media/coco/film/lola-poster.jpg" },
  { caption: "Casa Coco · 16:9", vimeoId: "509998460", poster: "/media/coco/film/coco-poster.jpg" },
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
  { name: "Tripadvisor", logo: "/media/coco/press-tripadvisor-stars.png", width: 185, height: 120 },
  { name: "Condé Nast Traveler", logo: "/media/coco/press-conde-nast-traveler.png", width: 260, height: 96 },
  { name: "Travelmyth", logo: "/media/coco/press-travelmyth-honeymoon.png", width: 133, height: 120 },
  { name: "Boutique Hotel Awards", logo: "/media/coco/press-boutique-hotel-awards.png", width: 118, height: 120 },
];

export default function Home() {
  return (
    <div className="w-full">
      <div id="site-hero" className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
        <Image
          src="/media/coco/video/hero-poster.jpg"
          alt="Coco B Isla poolside, palm trees and the Caribbean Sea"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <HeroVideo />
        <HeroScrim />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-[3px] text-white/85">Isla Mujeres · Quintana Roo · Mexico</p>
          <h1 className="mt-4 max-[360px]:text-[31px] font-sans text-[36px] font-extralight uppercase leading-[1.1] tracking-[2.5px] min-[621px]:text-[52px] min-[621px]:leading-[1.04] min-[621px]:tracking-[3px] min-[901px]:text-[74px] min-[901px]:tracking-[5px]">Coco B Isla</h1>
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
              <svg viewBox="0 0 24 24" className="absolute h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </a>
      </div>

      <div id="collection" className="mx-auto w-full max-w-[1180px] space-y-24 px-5 pb-24 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <SectionHeader
            eyebrow="Luxury villas · Boutique hotels · Destination retreats"
            title="A collection, not a hotel"
            lead="Four private villas, a retreat centre and a pop-up boutique hotel on the Sac Bajo peninsula. Direct access to calm water, breathtaking sunsets over the Mexican Caribbean, and exceptional service for exceptional experiences."
          />
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <SectionHeader eyebrow="We live for" title="Three kinds of gathering" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {gatherings.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-[14px] border border-border bg-surface">
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

        <div className="space-y-8">
          <div className="text-center">
            <SectionHeader eyebrow="Beyond the villa" title="Experiences" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((x) => (
              <article key={x.title} className="group overflow-hidden rounded-[14px] border border-border bg-surface">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={x.photo} alt={x.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[1px] text-foreground">{x.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{x.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              eyebrow="The collection"
              title="Coco · Lola · Encantada · Cielo"
              lead="Each villa blends indoor and outdoor living, perfect for families, friends, corporate retreats or wellness getaways."
            />
          </div>
          <VillaCollectionGrid villas={villas} />
          <div className="flex flex-col items-center gap-2">
            <Link href="/villas">
              <Button variant="primary" icon>Explore the villas</Button>
            </Link>
            <p className="text-xs text-muted">Rates, real availability and combined stays for larger groups.</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <SectionHeader eyebrow="The island" title="Sac Bajo, from the water" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_1fr] min-[901px]:auto-rows-[210px]">
            {sacBajo.map((shot, i) => (
              <div
                key={shot.src}
                className={`group relative aspect-[4/3] overflow-hidden rounded-[14px] min-[901px]:aspect-auto ${
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

        <section className="relative isolate overflow-hidden py-6">
          <LatticeBackground id="retreats" />
          <div className="relative z-[1] space-y-8">
            <div className="text-center">
              <SectionHeader eyebrow="Destination retreats" title="Full-service planning for your retreat" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {retreatTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[1px] text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <figure className="space-y-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-[14px]">
                  <Image
                    src="/media/coco/dining.jpg"
                    alt="Outdoor dining set up for a Coco B retreat"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-center text-[11px] uppercase tracking-[1px] text-muted">Retreat in progress · 16:9</figcaption>
              </figure>

              <figure className="space-y-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-[14px]">
                  <Image
                    src="/media/coco/retreat-ceremony-palapa.png"
                    alt="Ceremony setup under the palapa for a destination retreat"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-center text-[11px] uppercase tracking-[1px] text-muted">Ceremony · 16:9</figcaption>
              </figure>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.author} className="h-full space-y-3 rounded-[14px] border border-border bg-white/70 p-5">
                  <blockquote className="text-sm italic leading-7 text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="text-[10.5px] font-semibold uppercase tracking-[1.8px] text-brand">{t.author}</figcaption>
                </figure>
              ))}
            </div>

            <div className="flex justify-center">
              <Link href="/retiros">
                <Button variant="secondary" icon>Inquire about a retreat</Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <div className="text-center">
            <SectionHeader eyebrow="Film" title="See the island move" />
          </div>
          <FilmCarousel films={films} />
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <SectionHeader eyebrow="What people say" title="370 verified reviews" />
          </div>
          <div className="grid grid-cols-1 gap-4 min-[621px]:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.count} className="flex items-center gap-4 rounded-[14px] border border-border bg-surface px-4 py-5 text-left">
                <Image
                  src={r.logo}
                  alt={r.platform}
                  width={96}
                  height={34}
                  unoptimized={r.logo.endsWith(".svg")}
                  className="h-8.5 w-24 shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <p className="text-2xl font-semibold leading-none text-primary">{r.score}</p>
                  <p className="mt-1 text-xs uppercase tracking-[1px] text-muted">{r.count}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-[11px] font-medium uppercase tracking-[2.5px] text-muted">Press &amp; Awards</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {press.map((p) => (
                <Image
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
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

        <div className="relative h-[340px] overflow-hidden rounded-[14px] min-[621px]:h-[380px] min-[901px]:h-[430px]">
          <Image
            src="/media/coco/sunset-pool.jpg"
            alt="Oceanfront pool at sunset"
            fill
            sizes="(min-width: 1180px) 1180px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.55] to-foreground/[0.78] min-[621px]:bg-gradient-to-r min-[621px]:from-foreground/[0.74] min-[621px]:to-foreground/[0.2]" />
          <Azulejo tone="white" size={340} className="pointer-events-none absolute -bottom-32 -right-24 opacity-10" />
          <Azulejo tone="white" size={170} className="pointer-events-none absolute -left-13 -top-12 opacity-[0.09]" />
          <div className="relative flex h-full items-center px-8 py-14 min-[621px]:px-12">
            <div className="max-w-[540px] space-y-4 text-white">
              <p className="text-[10px] font-medium uppercase tracking-[1.8px] text-white/90 min-[621px]:text-[11px] min-[621px]:tracking-[2.24px]">
                Oceanfront boutique · pop-up hotel
              </p>
              <h2 className="text-[25px] font-extralight uppercase tracking-[2px] min-[621px]:text-[30px] min-[621px]:tracking-[3px] min-[901px]:text-[38px]">
                Coco &amp; Lola, by the room
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#efeae2] min-[621px]:max-w-[470px] min-[621px]:text-base">
                When the villas aren&rsquo;t booked whole, single suites open for stays inside 30 days of arrival.
              </p>
              <Link href="/solicitud">
                <Button variant="light" icon>Ask about last-minute stays</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-center lg:text-left">
            <SectionHeader eyebrow="A privileged location" title="Isla Mujeres" />
            <p className="text-sm leading-7 text-muted">
              Just a 25 minute boat ride off the coast of Cancún, you&rsquo;ll find Isla Mujeres — a small and
              alluring island with some of the most beautiful beaches and coastlines in all the Caribbean.
            </p>
            <p className="text-sm leading-7 text-muted">
              Our location on the Sac Bajo peninsula lets you enjoy a sargasso-free experience all year long. All
              four villas are within walking distance of one another.
            </p>
            <Link href="/villas">
              <Button variant="primary" icon>Explore the villas</Button>
            </Link>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] border border-border">
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

      <SiteFooter />
      <FloatingBar href="/villas" />
    </div>
  );
}
