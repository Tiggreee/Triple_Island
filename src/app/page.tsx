import Link from "next/link";
import { getRetreats, getVillas } from "@/lib/wp-fetchers";

export default async function Home() {
  const [villas, retreats] = await Promise.all([getVillas(), getRetreats()]);

  const villaCount = villas.length;
  const retreatCount = retreats.length;

  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-600">
          Plataforma Unificada
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Descubre villas, explora retiros y envía tu solicitud de reserva.
        </h1>
        <p className="max-w-2xl text-base text-slate-700 sm:text-lg">
          Primer corte funcional orientado al flujo de renta de villa, con
          contenido administrable y rutas listas para integración.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/villas"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Ver Villas
          </Link>
          <Link
            href="/solicitud"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            Enviar Solicitud
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Villas</h2>
          <p className="mt-2 text-sm text-slate-700">
            {villaCount > 0
              ? `${villaCount} villas cargadas desde WordPress REST.`
              : "Listado y detalle preparados para consumo desde WordPress REST."}
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Retiros</h2>
          <p className="mt-2 text-sm text-slate-700">
            {retreatCount > 0
              ? `${retreatCount} retiros cargados para disponibilidad dinámica.`
              : "Sección lista para disponibilidad dinámica editable desde panel."}
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Solicitudes</h2>
          <p className="mt-2 text-sm text-slate-700">
            Captura de leads en HubSpot con validación y anti-spam server-side.
          </p>
        </article>
      </div>
    </section>
  );
}
