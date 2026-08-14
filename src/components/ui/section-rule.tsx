import Image from "next/image";

export function SectionRule({ className = "" }: { className?: string }) {
  return (
    <div className={["flex items-center justify-center gap-3 pt-1", className].join(" ")}>
      <span className="h-px w-14 bg-border" />
      <Image src="/media/coco/az-icon.svg" alt="" width={14} height={14} className="opacity-90" />
      <span className="h-px w-14 bg-border" />
    </div>
  );
}
