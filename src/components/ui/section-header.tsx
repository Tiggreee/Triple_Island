import type { ReactNode } from "react";
import { AzulejoRule } from "@/components/ui/azulejo";

type SectionHeaderProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
};

export function SectionHeader({ eyebrow, title, lead }: SectionHeaderProps) {
  return (
    <>
      <p className="text-[10px] font-medium uppercase tracking-[1.8px] text-brand min-[621px]:text-[11px] min-[621px]:tracking-[2.24px]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-[24px] font-extralight uppercase leading-[1.35] tracking-[2px] text-foreground min-[621px]:text-[28px] min-[621px]:leading-[1.25] min-[621px]:tracking-[2.4px] min-[901px]:text-[34px] min-[901px]:tracking-[3px]">
        {title}
      </h2>
      <AzulejoRule className="mt-4" />
      {lead ? (
        <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.75] text-muted min-[621px]:text-[15.5px] min-[621px]:leading-[1.8] min-[901px]:text-base">
          {lead}
        </p>
      ) : null}
    </>
  );
}
