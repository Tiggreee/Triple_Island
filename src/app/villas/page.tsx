import Link from "next/link";
import { getVillas } from "@/lib/wp-fetchers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type GatheringItem = {
  id: string;
  title: string;
  subtitle: string;
  imagePath: string;
};

type CollectionItem = {
  slug: string;
  name: string;
  imagePath: string;
  microcopy: string;
};

type ExperienceItem = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
};

const heroImagePath = "/villas/hero.jpg";

const gatheringItems: GatheringItem[] = [
  {
    id: "friends-family",
    title: "Friends and Family",
    subtitle: "Long-table dinners and warm nights shared with the people you love.",
    imagePath: "/villas/friends_and_family.jpg",
  },
  {
    id: "wellness-team-retreats",
    title: "Wellness & Team Retreats",
    subtitle: "Immersive experiences designed for alignment, reset, and growth.",
    imagePath: "/villas/wellness_and_teamretreats.jpg",
  },
  {
    id: "weddings-celebrations",
    title: "Weddings and Celebrations",
    subtitle: "Meaningful moments framed by ocean light and tropical calm.",
    imagePath: "/villas/weddings_and_celebrations.jpg",
  },
];

const collectionItems: CollectionItem[] = [
  {
    slug: "casa-lola",
    name: "Casa Lola",
    imagePath: "/villas/Casa%20Lola.jpg",
    microcopy: "Elegant social spaces with a central pool and garden privacy.",
  },
  {
    slug: "villa-encantada",
    name: "Villa Encantada",
    imagePath: "/villas/Villa%20Encantada.jpg",
    microcopy: "Bright architecture, open-air terraces, and ocean-facing living.",
  },
  {
    slug: "casa-coco",
    name: "Casa Coco",
    imagePath: "/villas/Casa%20Coco.jpg",
    microcopy: "Wellness-forward settings crafted for focused retreats.",
  },
  {
    slug: "casa-cielo",
    name: "Casa Cielo",
    imagePath: "/villas/Casa%20Cielo.jpg",
    microcopy: "Tropical serenity with sea views and fluid indoor-outdoor flow.",
  },
];

const experienceItems: ExperienceItem[] = [
  {
    id: "blue-lagoon-days",
    title: "Blue Lagoon Days",
    description: "Private boat outings and open-water moments curated for your group.",
    imagePath: "/villas/Casa_Cielo.jpg",
  },
  {
    id: "sunset-rituals",
    title: "Sunset Rituals",
    description: "Golden-hour dinners, music, and oceanfront social settings.",
    imagePath: "/villas/weddings_and_celebrations.jpg",
  },
  {
    id: "wellness-mornings",
    title: "Wellness Mornings",
    description: "Breathwork, movement, and mindful starts in tropical spaces.",
    imagePath: "/villas/Casa%20Coco.jpg",
  },
];

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function VillasPage() {
  const villas = await getVillas();

  const villaMetaBySlug = new Map(
    villas.map((villa) => [
      villa.slug,
      {
        title: stripHtml(villa.title.rendered),
        suites: villa.acf?.suites,
        location: villa.acf?.location,
      },
    ]),
  );

  return (
    <section className="space-y-12 pb-14 sm:space-y-14">
      <section className="relative overflow-hidden rounded-4xl bg-slate-900 text-white shadow-[0_22px_56px_rgba(8,47,73,0.25)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-sky-700 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImagePath})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,29,0.18)_0%,rgba(7,24,37,0.68)_54%,rgba(7,24,37,0.92)_100%)]"
        />

        <div className="relative z-10 flex min-h-136 flex-col justify-between p-5 sm:p-7">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-white/50 bg-white/10 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/95 backdrop-blur-sm">
              Coco B Island
            </p>

            <div className="max-w-sm space-y-3.5">
              <h1 className="text-[2.05rem] font-semibold leading-[1.06] tracking-tight sm:text-4xl">
                Villas Designed for Gathering and Escape
              </h1>
              <p className="max-w-[18rem] text-sm leading-relaxed text-white/85 sm:max-w-88 sm:text-base">
                Discover private stays built for celebration, wellness, and coastal
                living.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:bg-slate-100"
            >
              Explore Villas
            </Link>
            <div className="inline-flex items-center gap-2 text-[0.63rem] font-medium uppercase tracking-[0.2em] text-white/70">
              <span className="h-5 w-px bg-white/45" />
              <span>Scroll to discover</span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-white/75">
              Visual v1 implementation with mapped assets and structure prepared for
              future interactive modules.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 sm:space-y-7">
        <header className="space-y-2.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Story Segment
          </p>
          <h2 className="max-w-md text-[1.72rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-3xl">
            We live for three kinds of gathering
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-slate-600">
            Each stay format is shaped for a different type of togetherness, from
            family reunions to destination celebrations.
          </p>
        </header>

        <div className="space-y-4.5">
          {gatheringItems.map((item, index) => (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-[1.4rem] bg-slate-900 shadow-[0_14px_34px_rgba(15,23,42,0.18)]"
            >
              <div
                aria-hidden
                className="h-70 bg-teal-700 bg-cover bg-center sm:h-76"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_25%,rgba(7,24,37,0.82)_100%)]"
              />

              <div className="pointer-events-none absolute top-4 left-4 inline-flex rounded-full border border-white/35 bg-black/25 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                {`0${index + 1}`}
              </div>

              <div className="pointer-events-none absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-black/28 p-3.5 backdrop-blur-[2px]">
                <h3 className="text-base font-semibold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/85">
                  {item.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="collection" className="space-y-6 sm:space-y-7">
        <header className="space-y-2.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            The Collection
          </p>
          <h2 className="text-[1.72rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-3xl">
            Signature villas across the island
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-slate-600">
            A curated portfolio of tropical residences for private stays, retreats,
            and celebrations.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {collectionItems.map((item) => {
            const liveMeta = villaMetaBySlug.get(item.slug);

            return (
              <article
                key={item.slug}
                className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.08)]"
              >
                <div
                  aria-hidden
                  className="h-50 bg-slate-300 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.imagePath})` }}
                />

                <div className="space-y-3.5 p-4">
                  <div className="space-y-1">
                    <h3 className="text-[1.05rem] font-semibold text-slate-900">
                      {liveMeta?.title || item.name}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-700">
                      {liveMeta?.location || "Coco B Island"}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600">{item.microcopy}</p>

                  <div className="flex items-center justify-between gap-3 pt-1.5">
                    <p className="text-sm font-medium text-slate-700">
                      {liveMeta?.suites ? `${liveMeta.suites} suites` : "Private villa"}
                    </p>
                    <Link
                      href={`/villas/${item.slug}`}
                      className="inline-flex items-center rounded-full border border-slate-300 px-3.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-slate-800 transition hover:border-slate-900 hover:text-slate-900"
                    >
                      View Villa
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-6 sm:space-y-7">
        <header className="space-y-2.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Island Moments
          </p>
          <h2 className="text-[1.72rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-3xl">
            A destination that adapts to your rhythm
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-slate-600">
            These blocks are ready for your next image set and will map directly to
            final editorial assets.
          </p>
        </header>

        <div className="space-y-4">
          {experienceItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_10px_34px_rgba(15,23,42,0.08)]"
            >
              <div
                aria-hidden
                className="h-52 bg-cyan-700 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.imagePath})` }}
              />
              <div className="space-y-2.5 p-4">
                <h3 className="text-[1.03rem] font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-4xl bg-slate-900 text-white shadow-[0_20px_44px_rgba(15,23,42,0.22)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-slate-800 bg-cover bg-center"
          style={{ backgroundImage: "url(/villas/friends_and_family.jpg)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,24,37,0.68)_0%,rgba(7,24,37,0.95)_100%)]"
        />

        <div className="relative z-10 space-y-5 p-6 sm:p-7">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/75">
            Guest Voice
          </p>
          <blockquote className="max-w-xl text-[1.38rem] leading-[1.28] tracking-tight text-white sm:text-[1.56rem]">
            &ldquo;Our villa felt like a world of its own. Everything flowed from sunrise
            practices to evening celebrations.&rdquo;
          </blockquote>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/75">
            Retreat Host, Coco B Island
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.07)] sm:p-6">
          <header className="space-y-2.5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Inquire
            </p>
            <h2 className="text-[1.6rem] font-semibold leading-[1.15] tracking-tight text-slate-900">
              Plan your stay at Coco B Villas
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              This is a visual-first form block. Actions and logic will be connected in
              the next functional phase.
            </p>
          </header>

          <div className="mt-5 space-y-3.5">
            <Input placeholder="Full name" aria-label="Full name" />
            <Input placeholder="Email address" type="email" aria-label="Email" />
            <Select defaultValue="" aria-label="Stay type">
              <option value="" disabled>
                Select stay type
              </option>
              <option value="family">Friends and Family</option>
              <option value="wellness">Wellness and Team Retreats</option>
              <option value="wedding">Weddings and Celebrations</option>
            </Select>
            <Textarea
              placeholder="Tell us about your preferred dates and group size"
              aria-label="Trip details"
              rows={4}
            />
            <Button className="w-full rounded-full py-2.5 text-[0.68rem] uppercase tracking-[0.18em]">
              Send Inquiry
            </Button>
          </div>
        </article>

        <article className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)]">
          <div
            aria-hidden
            className="h-56 bg-sky-800 bg-cover bg-center"
            style={{ backgroundImage: "url(/villas/Casa%20Lola.jpg)" }}
          />
          <div className="space-y-3.5 p-5 sm:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Location
            </p>
            <h3 className="text-[1.08rem] font-semibold text-slate-900">Coco B Island, Belize</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Private villas on the Caribbean coast with access to marine adventures,
              curated wellness experiences, and destination events.
            </p>
            <div className="space-y-1.5 text-sm text-slate-700">
              <p>+501 000 0000</p>
              <p>hello@cocobisland.com</p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-slate-800 transition hover:border-slate-900"
            >
              Open Location
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-3xl bg-[#1f2328] p-6 text-white sm:p-7">
        <div className="space-y-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            Next Block Placeholder
          </p>
          <h2 className="text-[1.45rem] font-semibold tracking-tight sm:text-[1.62rem]">
            Additional sections will connect here
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/80">
            This anchor preserves continuity with your long-page composition while we
            continue mapping and implementing remaining Figma modules.
          </p>
        </div>
      </section>
    </section>
  );
}
