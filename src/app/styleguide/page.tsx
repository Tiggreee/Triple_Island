import Image from "next/image";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { SectionContainer } from "@/components/ui/section-container";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DESIGN_COLOR_TOKENS,
  DESIGN_RADIUS_TOKENS,
  DESIGN_SPACING_TOKENS,
} from "@/lib/design-contract";

const colorTokens = Object.entries(DESIGN_COLOR_TOKENS);
const spacingScale = Object.entries(DESIGN_SPACING_TOKENS);
const radiusScale = Object.entries(DESIGN_RADIUS_TOKENS);

export default function StyleguidePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Styleguide</h1>
          <p className="text-sm text-muted">
            Referencia base de tokens para implementación de componentes.
          </p>
        </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Color Tokens</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {colorTokens.map(([name, value]) => (
            <article key={name} className="rounded-lg border border-border bg-surface p-3">
              <div
                className="h-16 rounded-md border border-border"
                style={{ backgroundColor: value }}
              />
              <p className="mt-2 text-sm font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Spacing Scale</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {spacingScale.map(([name, value]) => (
            <article key={name} className="rounded-lg border border-border bg-surface p-3">
              <div className="rounded-md border border-dashed border-border bg-background">
                <div className="bg-primary/15" style={{ padding: value }}>
                  <span className="text-sm text-foreground">{name}</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Radius Tokens</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {radiusScale.map(([name, value]) => (
            <article key={name} className="rounded-lg border border-border bg-surface p-3">
              <div
                className="h-14 border border-border bg-primary/15"
                style={{ borderRadius: value }}
              />
              <p className="mt-2 text-sm font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <SectionContainer title="Buttons">
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </SectionContainer>

      <SectionContainer title="Inputs and States">
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Default input" />
          <Input placeholder="Error input" hasError />
          <Textarea placeholder="Default textarea" />
          <Textarea placeholder="Error textarea" hasError />
          <Select defaultValue="">
            <option value="" disabled>
              Select retreat type
            </option>
            <option value="yoga">Yoga</option>
            <option value="culinary">Culinary</option>
          </Select>
          <Select hasError defaultValue="">
            <option value="" disabled>
              Invalid state
            </option>
            <option value="1">Option</option>
          </Select>
        </div>
      </SectionContainer>

      <SectionContainer title="Checkbox, Badges, Card and Drawer">
        <div className="space-y-4">
          <label className="inline-flex items-center gap-2 text-sm">
            <Checkbox defaultChecked />
            Receive updates
          </label>
          <div className="flex gap-2">
            <Badge>Available</Badge>
            <Badge>Upcoming</Badge>
          </div>
          <Card title="Card primitive">Reusable card container for content blocks.</Card>
          <Drawer open title="Drawer primitive">
            Base drawer panel for mobile actions or contextual details.
          </Drawer>
        </div>
      </SectionContainer>

      <SectionContainer title="Announcement Banner">
        <div className="overflow-hidden rounded-lg border border-border">
          <AnnouncementBanner />
        </div>
      </SectionContainer>

      <SectionContainer title="Villa Card Pattern">
        <p className="text-xs text-muted">
          No hay un componente VillaCard compartido todavía — este mismo bloque de clases está duplicado en
          src/app/page.tsx y src/app/villas/page.tsx. Referencia visual, no un import.
        </p>
        <div className="max-w-xs overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/media/coco/villas/cielo-01.webp"
              alt="Casa Cielo exterior"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-[11px] uppercase tracking-[1.5px] text-accent">The sunset bungalow</p>
            <h3 className="mt-1 text-base font-light uppercase tracking-[1px] text-foreground">Casa Cielo</h3>
            <p className="mt-1 text-xs leading-5 text-muted">Private oceanfront saltwater infinity pool</p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer title="Site-wide Overlays">
        <p className="text-xs text-muted">
          No se embeben aquí — son position:fixed y dependen de estado propio (localStorage, timers, fetch).
          Un preview embebido se vería roto (flotando fuera de su caja) o vacío (ya descartado en este navegador).
          Se documentan, se ven en vivo en las rutas indicadas.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg border border-border bg-surface p-3 text-xs">
            <p className="font-medium text-foreground">Cookie Consent</p>
            <p className="mt-1 text-muted">src/components/cookie-consent.tsx</p>
            <p className="mt-1 text-muted">Se ve en cualquier ruta, primera visita (borra `cocob_consent` de localStorage para verlo de nuevo)</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-3 text-xs">
            <p className="font-medium text-foreground">Chat Widget</p>
            <p className="mt-1 text-muted">src/components/chat/chat-widget.tsx</p>
            <p className="mt-1 text-muted">FAB abajo a la derecha, cualquier ruta</p>
          </article>
          <article className="rounded-lg border border-border bg-surface p-3 text-xs">
            <p className="font-medium text-foreground">Booking Modal</p>
            <p className="mt-1 text-muted">src/components/booking/booking-modal.tsx</p>
            <p className="mt-1 text-muted">Botón &quot;Check Availability&quot; en /villas o /villas/[slug]</p>
          </article>
        </div>
      </SectionContainer>
      </section>
    </div>
  );
}
