type VillaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Detalle de Villa</h1>
      <p className="text-slate-700">
        Ruta dinámica lista para consumir contenido real de WordPress.
      </p>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">Slug</p>
        <p className="text-base font-medium text-slate-900">{slug}</p>
      </div>
    </section>
  );
}
