import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getVillas } from "@/lib/wp-fetchers";

const fallbackVillas = [
  { slug: "coco", name: "Coco", suites: 6 },
  { slug: "lola", name: "Lola", suites: 5 },
  { slug: "encantada", name: "Encantada", suites: 7 },
  { slug: "cielo", name: "Cielo", suites: 4 },
];

export default async function VillasPage() {
  const villas = await getVillas();
  const items = villas.length
    ? villas.map((villa) => ({
        slug: villa.slug,
        name: villa.title.rendered,
        suites: villa.acf?.suites ?? 0,
      }))
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
            <Card key={villa.slug} title={villa.name}>
              <p>{villa.suites} suites</p>
              <Link
                href={`/villas/${villa.slug}`}
                className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-2"
              >
                Ver detalle
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
