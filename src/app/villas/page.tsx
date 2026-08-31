import Image from "next/image";
import { Azulejo } from "@/components/ui/azulejo";
import { HeroScrim } from "@/components/hero-scrim";
import { LatticeBackground } from "@/components/ui/lattice-background";
import { SectionHeader } from "@/components/ui/section-header";
import { SiteFooter } from "@/components/site-footer";
import { LocationSection } from "@/components/villa/location-section";
import { VillaCard } from "@/components/villa/villa-card";
import { VillasPageActions } from "@/components/villa/villas-page-actions";
import { WaysToStay } from "@/components/villa/ways-to-stay";
import { PAIR_VILLAS, REAL_VILLAS } from "@/lib/villas-data";
import { getVillas } from "@/lib/wp-fetchers";

const faqs = [
  { q: "Is the rate per night for the whole villa, or per person?", a: "Per night, for the entire house — every suite included, however many of you travel, up to the villa's capacity. Rates are in US dollars and shown before the 21% Mexican tax." },
  { q: "What does the 21% tax add to the price I see?", a: "The 21% is 16% VAT (IVA) plus 5% lodging tax (ISH), as Mexican law requires. Casa Cielo at $1,665 comes to $2,015 per night; Casa Coco at $4,840 comes to $5,856. Each villa card shows the total, so there is no surprise at the end." },
  { q: "Is there a minimum stay?", a: "Three nights in low season, five at Thanksgiving and Spring Break, and seven at Christmas and New Year — the calendar shows the minimum for the nights you pick, before you fill anything in." },
  { q: "My group is larger than one villa. What then?", a: "Each pair of houses sits side by side and is sold as one compound under a single contract: Casa Lola & Villa Encantada (13 suites, up to 26 guests) and Casa Coco & Casa Cielo (14 suites, up to 28). For larger groups still, all four villas can be taken together." },
  { q: "What is already included, and what costs extra?", a: "Included: daily housekeeping, concierge service, the breakfast chef's service and use of the paddle boards and kayaks. Billed separately: food and groceries, private chef service, transport and any other arrangements the concierge makes for you." },
  { q: "Can we eat at the villa instead of going out?", a: "Yes. Our in-house chefs cook at the villa subject to availability, and we can bring in trusted outside chefs when they are booked. There is also a pre-stock service so the kitchen is ready with your groceries and drinks when you arrive." },
  { q: "How do the chef services work?", a: "Breakfast is coffee, tea, fresh juice, fruit, homemade granola and an egg dish of your choice. Lunch is a starter, a main and sides; dinner is a starter, a main with two sides and dessert. Everything is served family-style — breakfast 7–11 AM, lunch 12–4 PM, dinner 5–9 PM." },
  { q: "How do I know if my dates are free?", a: "Availability is on this page. Pick your dates and group size and the calendar shows which houses are open — no email needed to find out." },
  { q: "What happens after I send an inquiry?", a: "No payment and no card at this stage. A person replies within 24 hours with a formal quote for your dates. To hold them, a 60% deposit is due at booking and the remaining 40% ninety days before check-in — a hundred and twenty days for holiday periods." },
  { q: "How do we get there from Cancun airport?", a: "We arrange private transport from the airport to the ferry terminal, or straight to a private boat, and the drivers track your flight. The public ferry runs about MX$620 round trip per person; private boat transfers are available too. Send us your flight numbers and the concierge takes it from there." },
  { q: "Will there be sargassum on the beach?", a: "The houses face west, towards Cancun, on the sheltered side of the island. That shore has historically stayed essentially free of sargassum — trace amounts on a handful of days a year, no more. It is why the collection is on this side." },
];

export default async function VillasPage() {
  const villas = await getVillas();
  const items = REAL_VILLAS.map((real) => {
    const wp = villas.find((v) => v.slug.replace(/^villa-/, "") === real.slug);
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
  const allCards = [...items, ...PAIR_VILLAS];

  return (
    <div className="w-full">
      <div id="site-hero" className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
        <Image
          src="/media/coco/villas-hero-night.jpg"
          alt="Coco B Isla villa terrace and pool at night"
          fill
          priority
          sizes="100vw"
          className="cb-hero-ken object-cover"
        />
        <HeroScrim />
        <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[2.24px] text-white">Isla Mujeres · Mexico</p>
          <h1 className="mt-4 max-[360px]:text-[31px] font-sans text-[36px] font-extralight uppercase leading-[1.1] tracking-[2.5px] min-[621px]:text-[52px] min-[621px]:leading-[1.04] min-[621px]:tracking-[3px] min-[901px]:text-[74px] min-[901px]:tracking-[5px]">Villas</h1>
          <p className="mt-4 flex items-center gap-2.5 text-[10px] uppercase tracking-[1.6px] text-white/90 min-[621px]:gap-4 min-[621px]:text-xs min-[621px]:tracking-[2.6px]">
            {["Lola", "Encantada", "Coco", "Cielo"].map((name, i) => (
              <span key={name} className="flex items-center gap-2.5 min-[621px]:gap-4">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-brand" /> : null}
                {name}
              </span>
            ))}
          </p>
          <p className="mx-auto mt-6 max-w-[560px] text-[15px] leading-[1.7] text-[#F7F4EF] min-[621px]:text-[17px]">
            Four private villas on the Sac Bajo peninsula. Three to twenty-seven suites, a shared stretch of shoreline,
            and water calm enough to swim at dawn.
          </p>
        </div>
        <a
          href="#collection"
          aria-label="Explore the collection"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[2px] text-white/85 transition hover:text-white"
        >
          <span className="scroll-cue-bob flex flex-col items-center gap-2">
            The Collection
            <span className="relative flex h-11 w-11 items-center justify-center">
              <Azulejo tone="white" variant="ring" size={44} className="scroll-cue-ring" />
              <svg viewBox="0 0 24 24" className="absolute h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </a>
      </div>

      <div id="collection" className="mx-auto w-full max-w-[1180px] space-y-10 px-5 py-16 sm:px-8 lg:px-12">
      <SectionHeader
        eyebrow="Welcome"
        title="Our Villa Collection"
        lead="Lola, Encantada, Coco and Cielo. Each one opens straight onto the shoreline, with the indoor and outdoor living that makes sense on an island — and they combine into one contract when the group is bigger than a single house."
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {allCards.map((villa) => (
          <VillaCard key={villa.slug} villa={villa} />
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-primary/[0.16] bg-primary/[0.07] p-4.5 text-[14px] leading-[1.7] text-[#123B52] sm:p-[18px]">
        <span className="relative mt-0.5 h-[18px] w-[26px] shrink-0" aria-hidden="true">
          <Azulejo tone="action" size={18} className="absolute left-0 top-px" />
          <Azulejo tone="action" size={15} className="absolute left-[11px] top-1 opacity-55" />
        </span>
        <span>
          <b className="font-semibold text-foreground">Mix &amp; match.</b> Side-by-side villas can be booked together
          as one contract: <b className="font-semibold text-foreground">Lola &amp; Encantada</b> (13 suites) and{" "}
          <b className="font-semibold text-foreground">Coco &amp; Cielo</b> (14 suites). Only neighbouring pairs
          work — a combined stay is available only when both houses are free on the same nights.
        </span>
      </div>

      <div className="text-center">
        <SectionHeader
          eyebrow="Before you choose a house"
          title="Four Ways to Stay With Us"
          lead="The same four houses work in four different ways. Find yours first — the rest of the page is easier from there."
        />
        <WaysToStay defaultSlug={items[0].slug} />
      </div>

      <section className="relative isolate overflow-hidden py-6">
        <LatticeBackground id="included" />
        <div className="relative z-[1] space-y-10">
          <SectionHeader
            eyebrow="Included"
            title="Concierge Services"
            lead="Breathe, nourish, flow — the island does most of the work. Already in the rate: daily housekeeping, a 24-hour concierge, our in-house chef's breakfast service and the paddle boards and kayaks. Food, groceries and transport are quoted separately, so you only pay for what you actually use."
          />
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
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-6">
        <LatticeBackground id="complement" />
        <div className="relative z-[1] space-y-8">
          <SectionHeader
            eyebrow="On request"
            title="Complement Your Stay"
            lead="Your concierge — already included in the rental — arranges every one of these before you arrive. Whale shark season fills early, so say the word when you send your dates."
          />
          <VillasPageActions defaultSlug={items[0].slug} />
        </div>
      </section>

      <div className="space-y-6">
        <div className="text-center">
          <SectionHeader eyebrow="Before you write to us" title="Frequent questions" />
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-foreground">
                {item.q}
                <span className="shrink-0 text-brand transition-transform group-open:rotate-45">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <LocationSection defaultSlug={items[0].slug} />
      </div>

      <SiteFooter />
    </div>
  );
}
