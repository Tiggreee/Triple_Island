export type Unit = {
  name: string;
  suites: number;
  guests: number;
  from: number;
  photo: string;
  pair?: [number, number];
  quote?: boolean;
};

export const UNITS: Unit[] = [
  { name: "Casa Coco", suites: 10, guests: 20, from: 4840, photo: "/media/coco/villas/coco-01.webp" },
  { name: "Villa Encantada", suites: 6, guests: 12, from: 2860, photo: "/media/coco/villas/encantada-01.webp" },
  { name: "Casa Lola", suites: 7, guests: 14, from: 3740, photo: "/media/coco/villas/lola-01.webp" },
  { name: "Casa Cielo", suites: 4, guests: 8, from: 1665, photo: "/media/coco/villas/cielo-01.webp" },
  { name: "Lola & Encantada", suites: 13, guests: 26, from: 6670, photo: "/media/coco/villas/lola-01.webp", pair: [2, 1] },
  { name: "Coco & Cielo", suites: 14, guests: 28, from: 6505, photo: "/media/coco/villas/coco-01.webp", pair: [0, 3], quote: true },
];

export const CALENDAR_MONTHS: [number, number][] = [
  [2026, 7], [2026, 8], [2026, 9], [2026, 10], [2026, 11], [2027, 0],
];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const BOOKED: Record<number, [string, string][]> = {
  0: [["2026-08-02", "2026-08-04"], ["2026-08-05", "2026-08-10"], ["2026-08-27", "2026-08-30"]],
  1: [["2026-08-02", "2026-08-06"], ["2026-08-13", "2026-08-16"], ["2026-08-27", "2026-08-31"]],
  2: [["2026-08-02", "2026-08-07"], ["2026-08-13", "2026-08-16"]],
  3: [["2026-08-02", "2026-08-04"], ["2026-08-05", "2026-08-10"], ["2026-08-20", "2026-08-23"], ["2026-08-27", "2026-08-30"]],
};

type Season = { key: string; from: string; to: string; min: number; rates: Record<number, number> };

const SEASONS: Season[] = [
  { key: "Spring Break 2027", from: "2027-03-06", to: "2027-03-21", min: 5, rates: { 0: 6200, 1: 3900, 2: 4900, 3: 2100, 4: 8600, 5: 8100 } },
  { key: "Thanksgiving 2026", from: "2026-11-22", to: "2026-11-29", min: 5, rates: { 0: 4840, 1: 2860, 2: 3740, 3: 1665, 4: 6600, 5: 6505 } },
  { key: "Christmas 2026", from: "2026-12-17", to: "2026-12-26", min: 7, rates: { 0: 9000, 1: 6200, 2: 7200, 3: 2600, 4: 13400, 5: 11600 } },
  { key: "New Year 2026–27", from: "2026-12-26", to: "2027-01-05", min: 7, rates: { 0: 9800, 1: 7200, 2: 8000, 3: 3200, 4: 15200, 5: 13000 } },
];

export function iso(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function fmtDate(s: string): string {
  const [, m, d] = s.split("-").map(Number);
  return `${d} ${MONTH_NAMES[m - 1].slice(0, 3)}`;
}

export function seasonOf(s: string): Season | undefined {
  return SEASONS.find((x) => s >= x.from && s < x.to);
}

function isBookedRange(villaIndex: number, s: string): boolean {
  return (BOOKED[villaIndex] ?? []).some(([a, b]) => s >= a && s < b);
}

export function bookedFor(unit: number, s: string): boolean {
  const v = UNITS[unit];
  if (!v.pair) return isBookedRange(unit, s);
  return v.pair.some((i) => isBookedRange(i, s));
}

export function partialFor(unit: number, s: string): string | null {
  const v = UNITS[unit];
  if (!v.pair) return null;
  const hit = v.pair.filter((i) => isBookedRange(i, s));
  return hit.length === 1 ? UNITS[hit[0]].name : null;
}

export function rateFor(unit: number, s: string): number | null {
  const se = seasonOf(s);
  return se ? se.rates[unit] ?? null : null;
}

export function nights(ci: string | null, co: string | null): number {
  if (!ci || !co) return 0;
  return Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86400000);
}

export function minNights(ci: string | null): number {
  const se = ci ? seasonOf(ci) : undefined;
  return se ? se.min : 3;
}

export function nextBusyAfter(unit: number, after: string, year: number, month: number): string | null {
  const days = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const s = iso(year, month, d);
    if (s > after && bookedFor(unit, s)) return s;
  }
  return null;
}

export function rangeHasBusy(unit: number, a: string, b: string, year: number, month: number): string | null {
  const days = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const s = iso(year, month, d);
    if (s >= a && s < b && bookedFor(unit, s)) return s;
  }
  return null;
}

export type AugStatus = { tone: "open" | "filling" | "almost"; label: string };

export function augStatus(unit: number): AugStatus {
  const year = 2026;
  const month = 7;
  let free = 0;
  let streak = 0;
  let bestLen = 0;
  let bestStart = "";
  let runStart = "";
  for (let d = 1; d <= 31; d++) {
    const s = iso(year, month, d);
    if (bookedFor(unit, s)) {
      streak = 0;
      continue;
    }
    free++;
    if (streak === 0) runStart = s;
    streak++;
    if (streak > bestLen) {
      bestLen = streak;
      bestStart = runStart;
    }
  }
  if (free >= 22) return { tone: "open", label: "Open most of August" };
  if (free >= 12) return { tone: "filling", label: `Filling up · ${bestLen} nights free from ${fmtDate(bestStart)}` };
  return { tone: "almost", label: `Almost booked · only ${free} nights left in August` };
}

export type PeakRate = { season: string; min: number; nightly: number; tax: number; total: number };

export function peakRatesFor(unit: number): PeakRate[] {
  return SEASONS.filter((s) => s.rates[unit] != null)
    .slice()
    .sort((a, b) => a.from.localeCompare(b.from))
    .map((s) => {
      const nightly = s.rates[unit];
      const tax = Math.round(nightly * 0.21);
      return { season: s.key, min: s.min, nightly, tax, total: nightly + tax };
    });
}
