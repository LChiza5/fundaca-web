import Link from "next/link";
import Image from "next/image";
import Revelar from "@/components/Revelar";
import { getNoticias, formatearFecha } from "@/lib/consultas";

const coloresEtiqueta: Record<string, string> = {
  Participación: "bg-celeste/12 text-celeste",
  Campaña: "bg-ambar/12 text-ambar",
  Educación: "bg-hoja/15 text-musgo",
  Institucional: "bg-bosque/10 text-bosque",
  Comunidad: "bg-musgo/12 text-musgo",
};

export default async function SeccionNoticias({ limite = 3 }: { limite?: number }) {
  const noticias = await getNoticias();
  const visibles = noticias.slice(0, limite);

  return (
    <section className="relative z-10 border-t border-bosque/10 bg-crema-hondo">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Revelar>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-musgo">Actualidad</p>
              <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
                Lo que estamos haciendo
              </h2>
            </div>
            <Link href="/noticias" className="enlace-sub text-sm font-semibold text-bosque">
              Ver todas las noticias
            </Link>
          </div>
        </Revelar>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {visibles.length === 0 && (
            <p className="col-span-3 text-center text-sm text-carbon/40">
              Próximamente las novedades de FUNDACA.
            </p>
          )}
          {visibles.map((noticia, i) => (
            <Revelar key={noticia.slug} retraso={i * 80}>
              <article className="flex h-full flex-col">
                {noticia.imagen_url && (
                  <Link href={`/noticias/${noticia.slug}`} className="block">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-bosque/5">
                      <Image
                        src={noticia.imagen_url}
                        alt={noticia.titulo}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                    </div>
                  </Link>
                )}
                <div className={`flex items-center gap-3 ${noticia.imagen_url ? "mt-4" : ""}`}>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      coloresEtiqueta[noticia.etiqueta] ?? "bg-hoja/15 text-musgo"
                    }`}
                  >
                    {noticia.etiqueta}
                  </span>
                  <time dateTime={noticia.fecha} className="text-xs text-carbon/50">
                    {formatearFecha(noticia.fecha)}
                  </time>
                </div>
                <Link href={`/noticias/${noticia.slug}`}>
                  <h3 className="mt-4 font-display text-xl leading-snug text-bosque-hondo hover:text-bosque">
                    {noticia.titulo}
                  </h3>
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-carbon/65">{noticia.resumen}</p>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
