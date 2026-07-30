import { wpFetch } from "@/lib/wp-client";
import type { Package, Retreat, Testimonial, Villa } from "@/types/cms";

export async function getVillas() {
  const result = await wpFetch<Villa[]>("villa?_embed=1");
  return result ?? [];
}

export async function getVilla(slug: string) {
  const result = await wpFetch<Villa[]>(`villa?slug=${encodeURIComponent(slug)}&_embed=1`);
  return result?.[0] ?? null;
}

export async function getRetreats() {
  const result = await wpFetch<Retreat[]>("retiro");
  return result ?? [];
}

export async function getRetreat(slug: string) {
  const result = await wpFetch<Retreat[]>(`retiro?slug=${encodeURIComponent(slug)}`);
  return result?.[0] ?? null;
}

export async function getPackages() {
  const result = await wpFetch<Package[]>("paquete");
  return result ?? [];
}

export async function getTestimonials() {
  const result = await wpFetch<Testimonial[]>("testimonio");
  return result ?? [];
}
