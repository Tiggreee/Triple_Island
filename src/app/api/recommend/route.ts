import { NextResponse } from "next/server";
import { REAL_VILLAS } from "@/lib/villas-data";
import { getRetreats, getVillas } from "@/lib/wp-fetchers";
import { recommend, type RecommendInput, type RecommendPurpose } from "@/lib/recommender";
import type { Villa } from "@/types/cms";

function withRealVillaOverlay(wpVillas: Villa[]): Villa[] {
  return REAL_VILLAS.map((real, i) => {
    const wp = wpVillas.find((v) => v.slug === real.slug);
    return {
      id: wp?.id ?? -(i + 1),
      slug: real.slug,
      title: wp?.title ?? { rendered: real.name },
      meta: {
        suite_capacity: wp?.meta?.suite_capacity ?? real.suites,
        guest_capacity: wp?.meta?.guest_capacity ?? real.guests,
        bedrooms: wp?.meta?.bedrooms ?? real.bedrooms,
        bathrooms: wp?.meta?.bathrooms ?? real.bathrooms,
        price_from: wp?.meta?.price_from ?? real.priceFrom,
      },
    };
  });
}

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
  const villas = withRealVillaOverlay(wpVillas);
  const result = recommend(villas, retreats, input);

  return NextResponse.json({ ok: true, ...result });
}
