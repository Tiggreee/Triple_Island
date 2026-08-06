import { getRetreats } from "@/lib/wp-fetchers";

const fallbackRetreats = [
  { name: "Retiro Yoga Caribe", date: "2026-09-12" },
  { name: "Retiro Culinario", date: "2026-10-03" },
  { name: "Retiro Wellness Mujeres", date: "2026-11-21" },
];

export default async function RetirosPage() {
  const retreats = await getRetreats();
  const items = retreats.length
    ? retreats.map((retreat) => ({
        name: retreat.title.rendered,
        date: retreat.acf?.start_date ?? "Fecha pendiente",
      }))
    : fallbackRetreats;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Retiros</h1>
          <p className="mt-2 text-slate-700">
            Ruta base del MVP para próximos retiros y disponibilidad.
          </p>
        </div>

      <ul className="space-y-3">
        {items.map((retreat) => (
          <li
            key={`${retreat.name}-${retreat.date}`}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <p className="font-medium text-slate-900">{retreat.name}</p>
            <p className="text-sm text-slate-700">{retreat.date}</p>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
}
