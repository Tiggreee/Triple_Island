import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { SectionContainer } from "@/components/ui/section-container";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const colorTokens = [
  { name: "primary", className: "bg-primary", value: "#0d9488" },
  { name: "surface", className: "bg-surface", value: "#ffffff" },
  { name: "muted", className: "bg-muted", value: "#6b7280" },
  { name: "accent", className: "bg-accent", value: "#e2725b" },
  { name: "border", className: "bg-border", value: "#d7dbdd" },
];

const spacingScale = ["p-2", "p-3", "p-4", "p-6", "p-8"];

export default function StyleguidePage() {
  return (
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
          {colorTokens.map((token) => (
            <article key={token.name} className="rounded-lg border border-border bg-surface p-3">
              <div className={`h-16 rounded-md border border-border ${token.className}`} />
              <p className="mt-2 text-sm font-medium text-foreground">{token.name}</p>
              <p className="text-xs text-muted">{token.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Spacing Scale</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {spacingScale.map((space) => (
            <article key={space} className="rounded-lg border border-border bg-surface p-3">
              <div className="rounded-md border border-dashed border-border bg-background">
                <div className={`${space} bg-primary/15`}>
                  <span className="text-sm text-foreground">{space}</span>
                </div>
              </div>
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
    </section>
  );
}
