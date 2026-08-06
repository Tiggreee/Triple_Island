import { getVilla } from "@/lib/wp-fetchers";

type VillaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug } = await params;
  const villa = await getVilla(slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Detalle de Villa</h1>
        <p className="text-muted">
          {villa ? "Contenido cargado desde WordPress REST." : "Ruta dinámica lista para consumir contenido real de WordPress."}
        </p>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-sm text-muted">Villa</p>
          <p className="text-base font-medium text-foreground">{villa ? villa.title.rendered : slug}</p>
        </div>
      </section>
    </div>
  );
}
