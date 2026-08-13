import { NextResponse } from "next/server";
import { aiServerEnvKeys, getMissingServerEnv } from "@/lib/server-env";
import { REAL_VILLAS } from "@/lib/villas-data";
import { getVillas } from "@/lib/wp-fetchers";

type ChatRole = "user" | "assistant" | "system";
type ChatMessage = { role: ChatRole; content: string };
type ChatRequestPayload = { messages?: ChatMessage[]; message?: string };

const DEFAULT_GEMINI_MODEL = "gemini-1.5-flash";
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant";
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 4000;

function normalizeMessages(payload: ChatRequestPayload): ChatMessage[] {
  const raw = payload.messages?.length
    ? payload.messages
    : payload.message
      ? [{ role: "user" as const, content: payload.message }]
      : [];

  return raw
    .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role === "assistant" || m.role === "system" ? m.role : "user",
      content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }));
}

// Grounds the model on real villa data — from WordPress once #5/INFRA-07 connects it, and the
// real static rate-card data (src/lib/villas-data.ts) as the fallback in the meantime, not just
// bare names. The model was previously grounded on names alone and hallucinated everything else
// (bedroom counts, amenities) despite the "never invent" instruction only covering names/prices/
// availability — this closes that gap without waiting on the WordPress connection.
async function withVillaGrounding(messages: ChatMessage[]): Promise<ChatMessage[]> {
  const wpVillas = await getVillas();
  const facts = wpVillas.length
    ? wpVillas
        .map((v) => {
          const name = v.title.rendered.replace(/<[^>]*>/g, "").trim();
          const suites = v.meta?.suite_capacity ? `, ${v.meta.suite_capacity} suites` : "";
          return `${name}${suites}`;
        })
        .join("; ")
    : REAL_VILLAS.map(
        (v) =>
          `${v.name} (slug: ${v.slug}): ${v.bedrooms} bedrooms, ${v.bathrooms} bathrooms, sleeps up to ` +
          `${v.guests} guests across ${v.suites} suites, from $${v.priceFrom}/night` +
          (v.extra ? `. ${v.extra}` : "."),
      ).join(" ");

  const base =
    "You are the Coco B Isla concierge for luxury villas, wellness retreats and a pop-up " +
    "boutique hotel in Isla Mujeres, Mexico. Be warm and concise. Never invent villa names, " +
    "specs, prices or availability — only use the facts given below. To book or check " +
    "availability, send guests to /solicitud. " +
    `Authoritative villa collection: ${facts}`;

  return [{ role: "system", content: base }, ...messages];
}

async function callGemini(messages: ChatMessage[], apiKey: string, model: string) {
  const system = messages.find((m) => m.role === "system")?.content;
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      contents,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, status: response.status };
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
  return { ok: true as const, reply: reply ?? "" };
}

async function callGroq(messages: ChatMessage[], apiKey: string, model: string) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  if (!response.ok) {
    return { ok: false as const, status: response.status };
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();
  return { ok: true as const, reply: reply ?? "" };
}

export async function POST(request: Request) {
  const missing = getMissingServerEnv(aiServerEnvKeys);

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

  let payload: ChatRequestPayload;
  try {
    payload = (await request.json()) as ChatRequestPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const messages = normalizeMessages(payload);
  if (messages.length === 0) {
    return NextResponse.json({ ok: false, error: "No message provided" }, { status: 400 });
  }

  const grounded = await withVillaGrounding(messages);

  const provider = (process.env.AI_PROVIDER ?? "").toLowerCase();
  const apiKey = process.env.AI_API_KEY as string;
  const model =
    process.env.AI_MODEL ?? (provider === "groq" ? DEFAULT_GROQ_MODEL : DEFAULT_GEMINI_MODEL);

  const result =
    provider === "groq"
      ? await callGroq(grounded, apiKey, model)
      : provider === "gemini"
        ? await callGemini(grounded, apiKey, model)
        : null;

  if (result === null) {
    return NextResponse.json(
      { ok: false, error: `Unsupported AI_PROVIDER "${provider}"` },
      { status: 500 },
    );
  }

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "AI provider request failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, reply: result.reply }, { status: 200 });
}
