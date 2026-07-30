import { NextResponse } from "next/server";
import { aiServerEnvKeys, getMissingServerEnv } from "@/lib/server-env";

export async function POST() {
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

  return NextResponse.json(
    {
      ok: false,
      status: "stub",
      message: "Chat route scaffolded. AI provider integration pending task implementation.",
    },
    { status: 501 },
  );
}
