import Image from "next/image";
import type { CSSProperties } from "react";

type NavButtonIconProps = {
  size?: number;
  className?: string;
  frameSrc?: string;
  crossSrc?: string;
};

export function NavButtonIcon({
  size = 18,
  className = "",
  frameSrc = "/media/coco/icons/nav-icon-frame.png?v=2",
  crossSrc = "/media/coco/icons/nav-icon-cross.png?v=2",
}: NavButtonIconProps) {
  const style = { width: size, height: size } as CSSProperties;

  return (
    <span className={`relative inline-flex shrink-0 ${className}`} style={style} aria-hidden="true">
      <Image
        src={frameSrc}
        alt=""
        fill
        unoptimized
        sizes={`${size}px`}
        className="z-0 object-contain transition-transform duration-450 ease-[cubic-bezier(.7,0,.2,1)] group-hover:rotate-90"
      />
      <Image src={crossSrc} alt="" fill unoptimized sizes={`${size}px`} className="z-10 object-contain" />
    </span>
  );
}