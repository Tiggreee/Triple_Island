import type { CSSProperties } from "react";

// Componente raíz del sistema visual (guía de Estefanía): dos capas, ring y
// cross, coloreadas por las custom properties --c-ring / --c-cross. SVG tomado
// del logo oficial (viewBox 255x254).
type AzulejoTone = "brand" | "action" | "teal" | "white" | "muted";
type AzulejoVariant = "solid" | "ring" | "ghost";

const TONE: Record<AzulejoTone, string> = {
  brand: "#5bcaeb", // Caribbean Blue · decorativo
  action: "var(--cb-color-primary, #246a94)",
  teal: "var(--cb-color-brand, #107480)",
  white: "#ffffff",
  muted: "#b4aca0",
};

type AzulejoProps = {
  tone?: AzulejoTone;
  variant?: AzulejoVariant;
  size?: number;
  className?: string;
  title?: string;
};

export function Azulejo({ tone = "brand", variant = "solid", size = 22, className, title }: AzulejoProps) {
  const color = TONE[tone];
  const style = {
    "--c-ring": color,
    "--c-cross": variant === "ring" ? "transparent" : color,
    opacity: variant === "ghost" ? 0.5 : undefined,
  } as CSSProperties;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 255 254"
      style={style}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="var(--c-cross, currentColor)"
        d="M122.518 40.7148C130.85 40.0698 134.844 45.1707 140.435 50.6709C145.632 55.7783 152.196 61.3063 149.065 69.374C143.835 82.8625 128.143 103.778 147.474 113.649C155.732 117.638 173.536 107.146 181.176 103.927C190.709 99.7765 194.194 104.943 200.541 111.134C214.229 124.541 215.906 126.98 202.806 140.407C187.819 155.767 187.854 152.418 168.854 143.699C157.272 138.385 147.08 134.629 139.257 148.376C138.77 160.151 142.25 166.218 147.429 176.559C149.609 180.916 152.23 186.16 150.181 190.979C147.532 197.215 135.382 208.704 129.39 211.616C120.423 212.809 110.398 200.69 104.738 194.03C94.609 182.124 123.806 158.253 111.302 143.912C97.241 127.782 78.5049 149.8 63.7176 149.657C57.9035 149.601 46.1896 135.869 42.2693 131.385C34.3893 123.16 54.2003 106.963 60.2664 102.475C69.2452 95.8288 93.6301 120.143 105.871 111.704C125.745 97.9993 99.6445 77.9009 101.493 62.249C101.935 58.5253 118.787 42.7733 122.518 40.7148Z"
      />
      <path
        fill="var(--c-ring, currentColor)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M131.732 0C142.582 3.76947 152.3 15.7301 160.501 23.958L193.04 56.6152L228.056 91.5117C236.309 99.7304 247.542 109.174 252.806 119.343C256.423 126.328 252.91 136.773 247.702 142.084C229.121 161.044 210.224 179.809 191.454 198.576L159.722 230.289C153.496 236.509 142.898 248.658 135.115 252.162C126.874 255.871 117.202 252.611 110.959 246.415C104.882 240.382 98.4783 234.038 92.2694 227.812L55.3983 190.834L23.4715 159.022C17.7546 153.329 11.8204 147.66 6.4354 141.77C-0.0997882 134.626 -2.13769 125.538 2.56626 116.814C4.08844 113.982 6.14853 111.514 8.40318 109.245C28.3009 89.2252 48.3308 69.3383 68.2743 49.3604L96.3836 21.1982C104.544 13.0298 111.663 3.58688 122.742 0H131.732ZM126.205 18.9131C120.105 20.8048 106.833 35.571 101.688 40.7148L65.2811 77.1299C58.9056 83.5113 23.6266 117.18 20.5526 122.685C19.8259 123.991 19.0135 126.638 19.3338 128.125C19.8832 130.668 23.2825 134.31 25.0165 136.203C33.3314 145.275 119.197 231.616 123.028 233.341C124.545 234.025 126.388 234.292 128.042 234.436C134.262 232.699 150.084 215.35 155.189 210.253L219.695 145.729C222.408 143.013 225.378 139.97 228.079 137.308C235.965 129.533 237.407 125.742 229.367 117.607C212.045 100.083 194.602 82.7002 177.177 65.2861L148.986 37.1211C143.864 32.0029 138.777 26.842 133.547 21.833C131.515 19.8878 128.923 19.2072 126.205 18.9131Z"
      />
    </svg>
  );
}

// Divisor de seccion (guia): linea + azulejo 14px + linea, centrado. Abre cada seccion.
export function AzulejoRule({ className }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center gap-3 ${className ?? ""}`} aria-hidden="true">
      <span className="h-px w-[52px] bg-primary/35" />
      <Azulejo tone="action" size={14} />
      <span className="h-px w-[52px] bg-primary/35" />
    </span>
  );
}
