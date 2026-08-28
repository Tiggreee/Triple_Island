import { NextResponse } from "next/server";
import { getMissingServerEnv, hubspotMultiFormServerEnvKeys } from "@/lib/server-env";

type LeadRequestPayload = {
  name?: string;
  email?: string;
  message?: string;
  leadType?: "solicitud" | "retiro" | "waitlist";
  website?: string;
  startedAt?: number;
};

const DEFAULT_MIN_SUBMIT_SECONDS = 4;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getFormIdByLeadType(leadType: LeadRequestPayload["leadType"]) {
  switch (leadType) {
    case "retiro":
      return process.env.HUBSPOT_FORM_ID_RETIRO;
    case "waitlist":
      return process.env.HUBSPOT_FORM_ID_WAITLIST;
    case "solicitud":
    default:
      return process.env.HUBSPOT_FORM_ID_SOLICITUD ?? process.env.HUBSPOT_FORM_ID;
  }
}

function getPageNameByLeadType(leadType: LeadRequestPayload["leadType"]) {
  switch (leadType) {
    case "retiro":
      return "Retreat Host Questionnaire";
    case "waitlist":
      return "Pop-up Hotel Waitlist";
    case "solicitud":
    default:
      return "Solicitud de Reserva";
  }
}

export async function POST(request: Request) {
  const missing = getMissingServerEnv(hubspotMultiFormServerEnvKeys);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing server environment configuration",
        missing,
      },
      { status: 500 },
    );
  }

  let payload: LeadRequestPayload;

  try {
    payload = (await request.json()) as LeadRequestPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const honeypot = (payload.website ?? "").trim();
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const minSubmitSeconds = Number(process.env.LEAD_MIN_SUBMIT_SECONDS ?? DEFAULT_MIN_SUBMIT_SECONDS);
  const startedAt = Number(payload.startedAt ?? 0);
  const elapsedMs = Date.now() - startedAt;

  if (!startedAt || elapsedMs < minSubmitSeconds * 1000) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim().toLowerCase();
  const message = (payload.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email format" }, { status: 400 });
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID as string;
  const formId = getFormIdByLeadType(payload.leadType);

  if (!formId) {
    return NextResponse.json({ ok: false, error: "Missing target form configuration" }, { status: 500 });
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  const referer = request.headers.get("referer") ?? "";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      submittedAt: Date.now(),
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: name },
        { objectTypeId: "0-1", name: "email", value: email },
        { objectTypeId: "0-1", name: "message", value: message },
      ],
      context: {
        pageUri: referer,
        pageName: getPageNameByLeadType(payload.leadType),
      },
    }),
  });

  const responseText = await response.text();
  console.log("[api/lead] hubspot diagnostic", JSON.stringify({ portalId, formId, referer, status: response.status, body: responseText }));

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "HubSpot submission failed",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Request sent — we'll reply within 24 hours.",
    },
    { status: 200 },
  );
}
