import { wpFetch } from "@/lib/wp-client";
import type { Retreat, Villa } from "@/types/cms";

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
  const result = await wpFetch<unknown[]>("paquete");
  return result ?? [];
}

export async function getTestimonials() {
  const result = await wpFetch<unknown[]>("testimonio");
  return result ?? [];
}
