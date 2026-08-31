type HeroScrimProps = {
  variant?: "home" | "villas";
};

export function HeroScrim({ variant = "home" }: HeroScrimProps) {
  if (variant === "villas") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(70%_56%_at_50%_52%,rgba(11,32,40,0.90)_0%,rgba(11,32,40,0.72)_46%,rgba(11,32,40,0.34)_78%,rgba(11,32,40,0.04)_100%),linear-gradient(180deg,rgba(11,32,40,0.64)_0%,rgba(11,32,40,0.30)_26%,rgba(11,32,40,0.22)_56%,rgba(11,32,40,0.58)_100%)]"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="absolute inset-0 [background:radial-gradient(62%_46%_at_50%_48%,rgba(11,32,40,0.62)_0%,rgba(11,32,40,0.34)_58%,rgba(11,32,40,0.06)_88%,transparent_100%),linear-gradient(180deg,rgba(11,32,40,0.64)_0%,rgba(11,32,40,0.30)_26%,rgba(11,32,40,0.22)_56%,rgba(11,32,40,0.58)_100%)]"
    />
  );
}
