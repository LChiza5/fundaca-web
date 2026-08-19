import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Revelar from "@/components/Revelar";
import { getNoticias, getNoticia, formatearFecha } from "@/lib/consultas";

const coloresEtiqueta: Record<string, string> = {
  Participación: "bg-celeste/12 text-celeste",
  Campaña: "bg-ambar/12 text-ambar",
  Educación: "bg-hoja/15 text-musgo",
  Institucional: "bg-bosque/10 text-bosque",
  Comunidad: "bg-musgo/12 text-musgo",
};

export async function generateStaticParams() {
  const noticias = await getNoticias();
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) return {};
  return { title: noticia.titulo, description: noticia.resumen };
}

export default async function NoticiaDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);
  if (!noticia) notFound();

  return (
    <section className="mx-auto max-w-2xl px-5 py-20 lg:px-8 lg:py-28">
      <nav aria-label="Ruta de navegación" className="mb-10">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="text-xs text-carbon/50 transition-colors hover:text-bosque">
              Inicio
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xs text-carbon/30">/</span>
            <Link
              href="/noticias"
              className="text-xs text-carbon/50 transition-colors hover:text-bosque"
            >
              Noticias
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xs text-carbon/30">/</span>
            <span aria-current="page" className="text-xs font-medium text-bosque">
              {noticia.titulo}
            </span>
          </li>
        </ol>
      </nav>

      <Revelar>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${coloresEtiqueta[noticia.etiqueta] ?? "bg-hoja/15 text-musgo"}`}
          >
            {noticia.etiqueta}
          </span>
          <time dateTime={noticia.fecha} className="text-xs text-carbon/50">
            {formatearFecha(noticia.fecha)}
          </time>
        </div>
        <h1 className="mt-5 font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
          {noticia.titulo}
        </h1>

        {noticia.imagen_url && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-bosque/5">
            <Image src={noticia.imagen_url} alt={noticia.titulo} fill className="object-cover" sizes="672px" priority />
          </div>
        )}

        <p className="mt-8 text-lg leading-relaxed text-carbon/75">{noticia.resumen}</p>
        {noticia.contenido && (
          <p className="mt-6 whitespace-pre-line leading-relaxed text-carbon/80">{noticia.contenido}</p>
        )}
      </Revelar>

      <div className="mt-16 border-t border-bosque/10 pt-10">
        <Link href="/noticias" className="enlace-sub text-sm font-semibold text-bosque">
          ← Ver todas las noticias
        </Link>
      </div>
    </section>
  );
}
