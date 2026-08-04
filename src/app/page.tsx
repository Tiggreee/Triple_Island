import Link from "next/link";
import {
  getPackages,
  getRetreats,
  getTestimonials,
  getVillas,
} from "@/lib/wp-fetchers";

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, "").trim();
}

export default async function Home() {
  const [villas, retreats, packages, testimonials] = await Promise.all([
    getVillas(),
    getRetreats(),
    getPackages(),
    getTestimonials(),
  ]);

  const featuredVillas = villas.slice(0, 3).map((villa) => ({
    id: villa.id,
    slug: villa.slug,
    title: stripHtml(villa.title.rendered),
    suites: villa.acf?.suites ?? 0,
    location: villa.acf?.location ?? "Riviera Maya",
  }));

  const nextRetreats = retreats.slice(0, 3).map((retreat) => ({
    id: retreat.id,
    title: stripHtml(retreat.title.rendered),
    date: retreat.acf?.start_date ?? "Fecha por confirmar",
    type: retreat.acf?.retreat_type ?? "Wellness",
  }));

  const featuredPackages = packages.slice(0, 3).map((pkg) => ({
    id: pkg.id,
    title: stripHtml(pkg.title.rendered),
    excerpt: stripHtml(pkg.excerpt?.rendered ?? "").slice(0, 90),
    duration: pkg.acf?.duration ?? "3 noches",
  }));

  const featuredTestimonials = testimonials.slice(0, 2).map((item) => ({
    id: item.id,
    quote: item.acf?.quote ?? stripHtml(item.excerpt?.rendered ?? "Experiencia transformadora."),
    author: item.acf?.author_name ?? stripHtml(item.title.rendered),
    role: item.acf?.author_role ?? "Huesped Coco B",
  }));

  const villaFallback = [
    {
      id: 1,
      slug: "villas",
      title: "Casa Madera",
      suites: 6,
      location: "Tulum Beach",
    },
    {
      id: 2,
      slug: "villas",
      title: "Villa Cielo",
      suites: 8,
      location: "Aldea Zama",
    },
    {
      id: 3,
      slug: "villas",
      title: "Casa Coral",
      suites: 5,
      location: "Tankah Bay",
    },
  ];

  const retreatFallback = [
    { id: 1, title: "Reset Caribe", date: "Oct 12, 2026", type: "Yoga + Breathwork" },
    { id: 2, title: "Nourish Retreat", date: "Nov 06, 2026", type: "Cocina Consciente" },
    { id: 3, title: "Radiant Women", date: "Dec 01, 2026", type: "Wellness Femenino" },
  ];

  const packageFallback = [
    { id: 1, title: "Stay + Spa", excerpt: "Hospedaje boutique con ritual de spa incluido.", duration: "2 noches" },
    { id: 2, title: "Villa Escape", excerpt: "Villa privada con servicio de chef y concierge.", duration: "4 noches" },
    { id: 3, title: "Retreat Week", excerpt: "Programa inmersivo con actividades diarias.", duration: "6 noches" },
  ];

  const testimonialFallback = [
    {
      id: 1,
      quote: "Cada detalle estuvo pensado para desconectar y volver con claridad.",
      author: "Sofia R.",
      role: "Guest, Mexico City",
    },
    {
      id: 2,
      quote: "La mezcla de naturaleza, arquitectura y servicio fue impecable.",
      author: "Daniel M.",
      role: "Guest, Monterrey",
    },
  ];

  const villasToShow = featuredVillas.length > 0 ? featuredVillas : villaFallback;
  const retreatsToShow = nextRetreats.length > 0 ? nextRetreats : retreatFallback;
  const packagesToShow = featuredPackages.length > 0 ? featuredPackages : packageFallback;
  const testimonialsToShow =
    featuredTestimonials.length > 0 ? featuredTestimonials : testimonialFallback;

  return (
    <div className="space-y-10 pb-4 sm:space-y-14">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-slate-50">
        <div className="bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.35),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(14,116,144,0.35),transparent_40%)] px-5 py-12 sm:px-8 sm:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-200">
            Coco B Island
          </p>
          <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Tu escape frente al mar para estancias boutique y retiros de bienestar.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
            Disenamos experiencias de lujo relajado en Tulum: villas curadas,
            programas wellness y atencion personalizada desde la primera solicitud.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/solicitud"
              className="rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Iniciar solicitud
            </Link>
            <Link
              href="/villas"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explorar villas
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Estancias destacadas
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Villas para grupos y familias
            </h2>
          </div>
          <Link
            href="/villas"
            className="text-sm font-semibold text-sky-800 underline decoration-slate-300 underline-offset-4"
          >
            Ver todas
          </Link>
        </div>
        <div className="space-y-3">
          {villasToShow.map((villa) => (
            <article
              key={villa.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="h-32 rounded-xl bg-linear-to-br from-cyan-500/80 via-teal-500/70 to-sky-800/70" />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{villa.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{villa.location}</p>
                </div>
                <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {villa.suites} suites
                </p>
              </div>
              <Link
                href={`/villas/${villa.slug}`}
                className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-slate-700"
              >
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Wellness calendar
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Proximos retiros
          </h2>
        </div>
        <ul className="space-y-3">
          {retreatsToShow.map((retreat) => (
            <li
              key={retreat.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-lg font-semibold text-slate-900">{retreat.title}</p>
              <p className="mt-1 text-sm text-slate-600">{retreat.type}</p>
              <p className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-emerald-700">
                {retreat.date}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/retiros"
          className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          Ver calendario completo
        </Link>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Experiencias curadas
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Paquetes para quedarte mas
          </h2>
        </div>
        <div className="space-y-3">
          {packagesToShow.map((pkg) => (
            <article key={pkg.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">{pkg.title}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {pkg.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{pkg.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Social proof
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Historias de nuestros huespedes
          </h2>
        </div>
        <div className="space-y-3">
          {testimonialsToShow.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-sm leading-relaxed text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-900">{testimonial.author}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                {testimonial.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Disenemos tu viaje
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Nuestro equipo responde con propuesta personalizada segun fechas,
          objetivo de viaje y configuracion de grupo.
        </p>
        <div className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <p className="rounded-lg bg-slate-100 px-3 py-2">Respuesta inicial en 24h</p>
          <p className="rounded-lg bg-slate-100 px-3 py-2">Opciones de villa o retiro</p>
          <p className="rounded-lg bg-slate-100 px-3 py-2">Concierge y extras</p>
          <p className="rounded-lg bg-slate-100 px-3 py-2">Soporte antes y durante estancia</p>
        </div>
        <Link
          href="/solicitud"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-sky-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 sm:w-auto"
        >
          Completar formulario
        </Link>
      </section>
    </div>
  );
}
