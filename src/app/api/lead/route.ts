import { NextResponse } from "next/server";
import { getMissingServerEnv } from "@/lib/server-env";

export async function POST() {
  const missing = getMissingServerEnv();

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
      message: "Lead route scaffolded. HubSpot integration pending task implementation.",
    },
    { status: 501 },
  );
}
