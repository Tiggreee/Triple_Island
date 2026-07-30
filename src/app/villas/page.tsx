import Link from "next/link";
import { getVillas } from "@/lib/wp-fetchers";

const fallbackVillas = [
  { slug: "villa-coral", name: "Villa Coral", suites: 12 },
  { slug: "villa-esmeralda", name: "Villa Esmeralda", suites: 18 },
  { slug: "villa-brisa", name: "Villa Brisa", suites: 8 },
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
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Villas</h1>
        <p className="mt-2 text-slate-700">
          Ruta base del MVP para catálogo de villas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((villa) => (
          <article
            key={villa.slug}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <h2 className="text-lg font-semibold">{villa.name}</h2>
            <p className="mt-1 text-sm text-slate-700">{villa.suites} suites</p>
            <Link
              href={`/villas/${villa.slug}`}
              className="mt-3 inline-block text-sm font-medium text-slate-900 underline"
            >
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
