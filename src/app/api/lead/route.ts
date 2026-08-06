import { NextResponse } from "next/server";
import { getMissingServerEnv, hubspotMultiFormServerEnvKeys, isTurnstileEnabled } from "@/lib/server-env";

type LeadRequestPayload = {
  name?: string;
  email?: string;
  message?: string;
  leadType?: "solicitud" | "retiro" | "waitlist";
  website?: string;
  startedAt?: number;
  turnstileToken?: string;
};

const DEFAULT_MIN_SUBMIT_SECONDS = 4;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY as string;
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await response.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
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

  if (isTurnstileEnabled()) {
    const token = (payload.turnstileToken ?? "").trim();
    const remoteIp = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
    if (!token || !(await verifyTurnstile(token, remoteIp))) {
      return NextResponse.json({ ok: false, error: "Failed anti-spam verification" }, { status: 400 });
    }
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
        pageUri: request.headers.get("referer") ?? "",
        pageName: getPageNameByLeadType(payload.leadType),
      },
    }),
  });

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
      message: "Solicitud enviada correctamente.",
    },
    { status: 200 },
  );
}
