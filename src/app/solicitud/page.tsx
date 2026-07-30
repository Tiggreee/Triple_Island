export default function SolicitudPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Solicitud de Reserva</h1>
        <p className="mt-2 text-slate-700">
          Formulario base del flujo prioritario rentar villa.
        </p>
      </div>

      <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Nombre
          <input
            type="text"
            className="rounded-md border border-slate-300 px-3 py-2"
            placeholder="Nombre completo"
          />
        </label>

        <label className="grid gap-1 text-sm">
          Email
          <input
            type="email"
            className="rounded-md border border-slate-300 px-3 py-2"
            placeholder="correo@dominio.com"
          />
        </label>

        <label className="grid gap-1 text-sm sm:col-span-2">
          Mensaje
          <textarea
            className="min-h-28 rounded-md border border-slate-300 px-3 py-2"
            placeholder="Cuéntanos fechas, tamaño del grupo y tipo de evento"
          />
        </label>

        <button
          type="button"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 sm:col-span-2"
        >
          Enviar solicitud
        </button>
      </form>
    </section>
  );
}
