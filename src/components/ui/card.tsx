import type { ReactNode } from "react";
import { DESIGN_COMPONENT_NAMES } from "@/lib/design-contract";

type CardProps = {
  title: string;
  children: ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <article
      className={[
        DESIGN_COMPONENT_NAMES.card.base,
        "rounded-lg border border-border bg-surface p-4",
      ].join(" ")}
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="mt-2 text-sm text-muted">{children}</div>
    </article>
  );
}
