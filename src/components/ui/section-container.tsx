import type { ReactNode } from "react";

type SectionContainerProps = {
  title: string;
  children: ReactNode;
};

export function SectionContainer({ title, children }: SectionContainerProps) {
  return (
    <section className="space-y-3 rounded-lg border border-border bg-surface p-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
