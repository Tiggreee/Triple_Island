import Image from "next/image";
import Link from "next/link";
import { getVillas } from "@/lib/wp-fetchers";

// Photos: Coco and Encantada are full-res exports pulled directly from Figma
// (public/media/figma/*). Lola and Cielo have no equivalent in the Figma file —
// those two came from Gerson's public/villas/ shoot (PR #18, "imagenes
// ajustadas") since it's the only real source we have for them. They're lower
// resolution than the Figma exports; swap them for proper exports if/when
// those villas get photographed for Figma too.
const fallbackVillas = [
  { slug: "coco", name: "Coco", suites: 6, photo: "/media/figma/casa-coco-1.jpg" },
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
          suites: villa.acf?.suites ?? fallback?.suites ?? 0,
          photo: fallback?.photo ?? fallbackVillas[0].photo,
        };
      })
    : fallbackVillas;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Villas</h1>
          <p className="mt-2 text-muted">Ruta base del MVP para catálogo de villas.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((villa) => (
            <article key={villa.slug} className="overflow-hidden rounded-lg border border-border bg-surface">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={villa.photo}
                  alt={`${villa.name} villa exterior`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground">{villa.name}</h3>
                <p className="mt-2 text-sm text-muted">{villa.suites} suites</p>
                <Link
                  href={`/villas/${villa.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-2"
                >
                  Ver detalle
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
