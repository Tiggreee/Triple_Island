// Real villa data, pulled directly from the live reference build's own
// `const V=[...]` array (cocobislanewsite.netlify.app/villas) — not
// estimated. Shared by the listing page, detail page, and booking modal
// so there's one source instead of three copies drifting apart.
export type VillaData = {
  slug: string;
  name: string;
  suites: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  priceFrom: number;
  photo: string;
  description: string;
  extra?: string;
};

export const REAL_VILLAS: VillaData[] = [
  {
    slug: "coco",
    name: "Casa Coco",
    suites: 10,
    guests: 20,
    bedrooms: 10,
    bathrooms: 10,
    priceFrom: 4840,
    photo: "/media/coco/villas/coco-01.webp",
    description:
      "Casa Coco embodies refined bohemian elegance with its casual yet sophisticated decor. Ten meticulously designed suites blend comfort and luxury with custom tiles, doors and furnishings that reflect the vibrant culture of the island and region.",
  },
  {
    slug: "encantada",
    name: "Villa Encantada",
    suites: 6,
    guests: 12,
    bedrooms: 6,
    bathrooms: 6,
    priceFrom: 2860,
    photo: "/media/coco/villas/encantada-01.webp",
    description:
      "The inaugural gem of the Coco B collection. Villa Encantada perfectly blends sophistication and elegance, with open living spaces that spill straight onto the water.",
  },
  {
    slug: "lola",
    name: "Casa Lola",
    suites: 7,
    guests: 14,
    bedrooms: 7,
    bathrooms: 8,
    priceFrom: 3740,
    photo: "/media/coco/villas/lola-01.webp",
    description:
      "The island's newest and most coveted beach villa. Seven exquisite suites, expansive open-air spaces and a rooftop terrace with stunning 360-degree views of the Caribbean.",
  },
  {
    slug: "cielo",
    name: "Casa Cielo",
    suites: 4,
    guests: 8,
    bedrooms: 4,
    bathrooms: 5,
    priceFrom: 1665,
    photo: "/media/coco/villas/cielo-01.webp",
    description:
      "An intimate, newly renovated four-bedroom bungalow with a private oceanfront saltwater infinity pool and the best sunset vistas on the island. A fifth suite can be added on request.",
    extra: "A 5th suite may be added for US$150–200 extra per night, depending on season.",
  },
];
