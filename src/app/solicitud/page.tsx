"use client";

import { FormEvent, useMemo, useState } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function SolicitudPage() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const startedAt = useMemo(() => Date.now(), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "loading" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      leadType: String(formData.get("leadType") ?? "solicitud"),
      website: String(formData.get("website") ?? ""),
      startedAt: Number(formData.get("startedAt") ?? 0),
    };

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { ok?: boolean; error?: string; message?: string };

    if (!response.ok || !data.ok) {
      setSubmitState({
        status: "error",
        message: data.error ?? "No se pudo enviar la solicitud.",
      });
      return;
    }

    form.reset();
    setSubmitState({
      status: "success",
      message: data.message ?? "Solicitud enviada correctamente.",
    });
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Solicitud de Reserva</h1>
        <p className="mt-2 text-slate-700">
          Formulario base del flujo prioritario rentar villa.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <input type="hidden" name="startedAt" value={startedAt} />
        <div className="absolute left-[-9999px] h-0 overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="website">Sitio web</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="grid gap-1 text-sm">
          Nombre
          <input
            type="text"
            name="name"
            className="rounded-md border border-slate-300 px-3 py-2"
            placeholder="Nombre completo"
            required
          />
        </label>

        <label className="grid gap-1 text-sm">
          Email
          <input
            type="email"
            name="email"
            className="rounded-md border border-slate-300 px-3 py-2"
            placeholder="correo@dominio.com"
            required
          />
        </label>

        <label className="grid gap-1 text-sm sm:col-span-2">
          Tipo de solicitud
          <select
            name="leadType"
            defaultValue="solicitud"
            className="rounded-md border border-slate-300 px-3 py-2"
            required
          >
            <option value="solicitud">Solicitud de Villa y Boda</option>
            <option value="retiro">Retreat Host Questionnaire</option>
            <option value="waitlist">Pop-up Hotel Waitlist</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm sm:col-span-2">
          Mensaje
          <textarea
            name="message"
            className="min-h-28 rounded-md border border-slate-300 px-3 py-2"
            placeholder="Cuéntanos fechas, tamaño del grupo y tipo de evento"
            required
          />
        </label>

        <button
          type="submit"
          disabled={submitState.status === "loading"}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 sm:col-span-2"
        >
          {submitState.status === "loading" ? "Enviando..." : "Enviar solicitud"}
        </button>

        {submitState.status === "success" && (
          <p className="text-sm text-emerald-700 sm:col-span-2">{submitState.message}</p>
        )}

        {submitState.status === "error" && (
          <p className="text-sm text-red-700 sm:col-span-2">{submitState.message}</p>
        )}
      </form>
    </section>
  );
}
