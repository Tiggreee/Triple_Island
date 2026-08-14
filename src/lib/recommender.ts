import type { Retreat, Villa } from "@/types/cms";

export type RecommendPurpose =
  | "family"
  | "friends"
  | "wedding"
  | "wellness"
  | "corporate"
  | "celebration";

export type RecommendInput = {
  groupSize?: number;
  purpose?: RecommendPurpose;
};

export type VillaMatch = { slug: string; name: string; reason: string; score: number };
export type RetreatMatch = { slug: string; name: string; reason: string };
export type RecommendResult = { villas: VillaMatch[]; retreats: RetreatMatch[]; cta: string };

// Modeling assumption until acf.max_guests exists in WP (see DISC-02): a suite hosts ~2 guests.
const GUESTS_PER_SUITE = 2;

const PURPOSE_RETREAT_TYPES: Record<RecommendPurpose, string[]> = {
  wedding: ["weddings"],
  celebration: ["weddings"],
  wellness: ["yoga", "wellness"],
  corporate: ["corporate"],
  family: [],
  friends: [],
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function capacityFit(villa: Villa, groupSize?: number) {
  if (!groupSize || groupSize <= 0) return 0.5;
  const suites = villa.meta?.suite_capacity;
  if (!suites || suites <= 0) return 0.5;
  const capacity = suites * GUESTS_PER_SUITE;
  return capacity >= groupSize ? 1 : Math.max(0, capacity / groupSize);
}

export function recommend(
  villas: Villa[],
  retreats: Retreat[],
  input: RecommendInput,
): RecommendResult {
  const villaMatches: VillaMatch[] = villas
    .map((villa) => {
      const score = capacityFit(villa, input.groupSize);
      const suites = villa.meta?.suite_capacity;
      const reason =
        input.groupSize && suites
          ? `Sleeps up to ~${suites * GUESTS_PER_SUITE} guests across ${suites} suites`
          : suites
            ? `${suites} suites`
            : "Private villa";
      return { slug: villa.slug, name: stripHtml(villa.title.rendered), reason, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const wantedTypes = input.purpose ? PURPOSE_RETREAT_TYPES[input.purpose] : [];
  const retreatPool = wantedTypes.length
    ? retreats.filter((r) => wantedTypes.includes((r.meta?.retreat_type ?? "").toLowerCase()))
    : retreats;

  const retreatMatches: RetreatMatch[] = retreatPool.slice(0, 2).map((retreat) => ({
    slug: retreat.slug,
    name: stripHtml(retreat.title.rendered),
    reason: retreat.meta?.retreat_type
      ? `${retreat.meta.retreat_type} retreat`
      : "Curated retreat",
  }));

  return { villas: villaMatches, retreats: retreatMatches, cta: "/solicitud" };
}
