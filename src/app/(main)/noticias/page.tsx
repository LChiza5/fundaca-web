import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { getNoticias, formatearFecha } from "@/lib/consultas";

const coloresEtiqueta: Record<string, string> = {
  Participación: "bg-celeste/12 text-celeste",
  Campaña: "bg-ambar/12 text-ambar",
  Educación: "bg-hoja/15 text-musgo",
  Institucional: "bg-bosque/10 text-bosque",
  Comunidad: "bg-musgo/12 text-musgo",
};

export const metadata: Metadata = {
  title: "Noticias",
  description: "Campañas, talleres, ferias ambientales y actividades institucionales de FUNDACA.",
};

export default async function Noticias({
  searchParams,
}: {
  searchParams: Promise<{ etiqueta?: string }>;
}) {
  const { etiqueta: activa } = await searchParams;
  const todasNoticias = await getNoticias();
  const etiquetas = [...new Set(todasNoticias.map((n) => n.etiqueta).filter(Boolean))];
  const visibles = activa ? todasNoticias.filter((n) => n.etiqueta === activa) : todasNoticias;

  return (
    <>
      <Portada
        seccion="Actualidad"
        titulo="Noticias"
        entrada="Campañas de recolección, talleres, ferias ambientales y sesiones de trabajo institucional en el Área de Conservación Arenal-Tempisque."
        breadcrumb={[{ texto: "Noticias" }]}
      />

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-24">
        {etiquetas.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2" role="list" aria-label="Filtrar por categoría">
            <Link
              href="/noticias"
              role="listitem"
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                !activa
                  ? "border-bosque bg-bosque text-crema"
                  : "border-bosque/20 text-carbon/60 hover:border-bosque/40 hover:text-bosque"
              }`}
            >
              Todas
            </Link>
            {etiquetas.map((etiqueta) => (
              <Link
                key={etiqueta}
                href={`/noticias?etiqueta=${etiqueta}`}
                role="listitem"
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  activa === etiqueta
                    ? "border-bosque bg-bosque text-crema"
                    : "border-bosque/20 text-carbon/60 hover:border-bosque/40 hover:text-bosque"
                }`}
              >
                {etiqueta}
              </Link>
            ))}
          </div>
        )}

        <div className="space-y-12">
          {visibles.length === 0 && (
            <p className="text-center text-carbon/50">No hay noticias en esta categoría.</p>
          )}
          {visibles.map((noticia, i) => (
            <Revelar key={noticia.slug} retraso={Math.min(i, 4) * 60}>
              <article className="border-b border-bosque/10 pb-12 last:border-0">
                {noticia.imagen_url && (
                  <Link href={`/noticias/${noticia.slug}`} className="block">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-bosque/5">
                      <Image
                        src={noticia.imagen_url}
                        alt={noticia.titulo}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 768px, 100vw"
                      />
                    </div>
                  </Link>
                )}
                <div className={`flex flex-wrap items-center gap-3 ${noticia.imagen_url ? "mt-5" : ""}`}>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${coloresEtiqueta[noticia.etiqueta] ?? "bg-hoja/15 text-musgo"}`}
                  >
                    {noticia.etiqueta}
                  </span>
                  <time dateTime={noticia.fecha} className="text-xs text-carbon/50">
                    {formatearFecha(noticia.fecha)}
                  </time>
                </div>
                <Link href={`/noticias/${noticia.slug}`}>
                  <h2 className="mt-4 font-display text-2xl leading-snug text-bosque-hondo hover:text-bosque sm:text-3xl">
                    {noticia.titulo}
                  </h2>
                </Link>
                <p className="mt-4 leading-relaxed text-carbon/70">{noticia.resumen}</p>
                <Link
                  href={`/noticias/${noticia.slug}`}
                  className="enlace-sub mt-4 inline-block text-sm font-semibold text-bosque"
                >
                  Leer más →
                </Link>
              </article>
            </Revelar>
          ))}
        </div>
      </section>
    </>
  );
}
