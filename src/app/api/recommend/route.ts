import { NextResponse } from "next/server";
import { REAL_VILLAS } from "@/lib/villas-data";
import { getRetreats, getVillas } from "@/lib/wp-fetchers";
import { recommend, type RecommendInput, type RecommendPurpose } from "@/lib/recommender";
import type { Villa } from "@/types/cms";

const FALLBACK_VILLAS: Villa[] = REAL_VILLAS.map((v, i) => ({
  id: -(i + 1),
  slug: v.slug,
  title: { rendered: v.name },
  meta: {
    suite_capacity: v.suites,
    guest_capacity: v.guests,
    bedrooms: v.bedrooms,
    bathrooms: v.bathrooms,
    price_from: v.priceFrom,
  },
}));

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

  const [wpVillas, retreats] = await Promise.all([getVillas(), getRetreats()]);
  const villas = wpVillas.length ? wpVillas : FALLBACK_VILLAS;
  const result = recommend(villas, retreats, input);

  return NextResponse.json({ ok: true, ...result });
}
