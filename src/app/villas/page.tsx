import Image from "next/image";
import Link from "next/link";

export default function VillasPage() {
  return (
    <section className="space-y-10 pb-12">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <Image
          src="/villas/hero.jpg"
          alt="Hero"
          width={1200}
          height={900}
          className="h-120 w-full object-cover"
          priority
        />
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Hero</h1>
          <p className="text-sm text-slate-600">File: hero.jpg</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Three kinds of gathering</h2>
        <div className="space-y-4">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/friends_and_family.jpg"
              alt="Friends and Family"
              width={1000}
              height={700}
              className="h-72 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Friends and Family</h3>
              <p className="text-sm text-slate-600">File: friends_and_family.jpg</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/wellness_and_teamretreats.jpg"
              alt="Wellness and Team Retreats"
              width={1000}
              height={700}
              className="h-72 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Wellness and Team Retreats</h3>
              <p className="text-sm text-slate-600">File: wellness_and_teamretreats.jpg</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/weddings_and_celebrations.jpg"
              alt="Weddings and Celebrations"
              width={1000}
              height={700}
              className="h-72 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Weddings and Celebrations</h3>
              <p className="text-sm text-slate-600">File: weddings_and_celebrations.jpg</p>
            </div>
          </article>
        </div>
      </section>

      <section id="collection" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">The Collection</h2>
          <Link href="#" className="text-sm underline">
            Placeholder Link
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/Casa_Lola.jpg"
              alt="Casa Lola"
              width={900}
              height={650}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Casa Lola</h3>
              <p className="text-sm text-slate-600">File: Casa_Lola.jpg</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/Villa%20Encantada.jpg"
              alt="Villa Encantada"
              width={900}
              height={650}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Villa Encantada</h3>
              <p className="text-sm text-slate-600">File: Villa Encantada.jpg</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/Casa_Coco.jpg"
              alt="Casa Coco"
              width={900}
              height={650}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Casa Coco</h3>
              <p className="text-sm text-slate-600">File: Casa_Coco.jpg</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Image
              src="/villas/Casa_Cielo.jpg"
              alt="Casa Cielo"
              width={900}
              height={650}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Casa Cielo</h3>
              <p className="text-sm text-slate-600">File: Casa_Cielo.jpg</p>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
