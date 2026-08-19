// UX-018/019: capa de oscurecimiento compartida por los heroes de landing y villas.
// Radial centrado sobre el texto + lineal vertical, para mantener contraste AA sobre
// el fotograma mas claro del video o la foto.
export function HeroScrim() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 [background:radial-gradient(62%_55%_at_50%_42%,rgba(28,28,28,0.5),transparent_70%),linear-gradient(to_bottom,rgba(28,28,28,0.55),rgba(28,28,28,0.28)_45%,rgba(28,28,28,0.7))]"
    />
  );
}
