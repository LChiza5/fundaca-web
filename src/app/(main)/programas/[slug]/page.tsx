import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Revelar from "@/components/Revelar";
import { programas } from "@/data/contenido";

export function generateStaticParams() {
  return programas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programa = programas.find((p) => p.slug === slug);
  if (!programa) return {};
  return { title: programa.titulo, description: programa.resumen };
}

export default async function ProgramaDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programa = programas.find((p) => p.slug === slug);
  if (!programa) notFound();

  const indice = programas.indexOf(programa);

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
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
              href="/programas"
              className="text-xs text-carbon/50 transition-colors hover:text-bosque"
            >
              Programas
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xs text-carbon/30">/</span>
            <span aria-current="page" className="text-xs font-medium text-bosque">
              {programa.titulo}
            </span>
          </li>
        </ol>
      </nav>

      <Revelar>
        <span className="font-display text-sm text-ambar">0{indice + 1}</span>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
          {programa.titulo}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-carbon/70">{programa.resumen}</p>
        <p className="mt-5 leading-relaxed text-carbon/65">{programa.detalle}</p>
      </Revelar>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-bosque/10 pt-10">
        <Link href="/programas" className="enlace-sub text-sm font-semibold text-bosque">
          ← Ver todos los programas
        </Link>
        <Link
          href="/contacto"
          className="presionable rounded-full bg-bosque px-6 py-3 text-sm font-semibold text-crema hover:bg-musgo"
        >
          Conversemos
        </Link>
      </div>
    </section>
  );
}
