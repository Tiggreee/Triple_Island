import { NextResponse } from "next/server";
import { getRetreats, getVillas } from "@/lib/wp-fetchers";
import { recommend, type RecommendInput, type RecommendPurpose } from "@/lib/recommender";

const PURPOSES: RecommendPurpose[] = [
  "family",
  "friends",
  "wedding",
  "wellness",
  "corporate",
  "celebration",
];

function parsePurpose(value: string | null): RecommendPurpose | undefined {
  const normalized = (value ?? "").toLowerCase();
  return PURPOSES.find((p) => p === normalized);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupSizeRaw = Number(searchParams.get("group_size"));

  const input: RecommendInput = {
    groupSize: Number.isFinite(groupSizeRaw) && groupSizeRaw > 0 ? groupSizeRaw : undefined,
    purpose: parsePurpose(searchParams.get("purpose")),
  };

  const [villas, retreats] = await Promise.all([getVillas(), getRetreats()]);
  const result = recommend(villas, retreats, input);

  return NextResponse.json({ ok: true, ...result });
}
