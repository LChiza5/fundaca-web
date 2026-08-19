import type { Metadata } from "next";
import Link from "next/link";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { programas } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Programas",
  description:
    "Gestión socioambiental y desarrollo cultural comunitario: dos líneas de programa independientes pero transversales.",
};

export default function Programas() {
  return (
    <>
      <Portada
        seccion="Programas"
        titulo="Dos grandes líneas, un mismo objetivo"
        entrada="Nos hemos propuesto desarrollar dos grandes líneas de programas que, a pesar de ser independientes, son transversales y comparten el objetivo de mejorar la calidad de vida de las comunidades."
        breadcrumb={[{ texto: "Programas" }]}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="space-y-6">
          {programas.map((programa, i) => (
            <Revelar key={programa.slug} retraso={i * 70}>
              <Link
                href={`/programas/${programa.slug}`}
                className="presionable group grid gap-6 rounded-2xl border border-bosque/12 bg-crema-hondo p-8 hover:border-celeste/40 lg:grid-cols-[auto_1fr] lg:gap-10 lg:p-10"
              >
                <span className="font-display text-5xl leading-none text-ambar">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-2xl leading-snug text-bosque-hondo sm:text-3xl">
                    {programa.titulo}
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-carbon/70">{programa.resumen}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-bosque">
                    Conocer más
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Revelar>
          ))}
        </div>

        <Revelar retraso={120}>
          <div className="mt-14 rounded-2xl border border-bosque/12 px-7 py-9 text-center">
            <p className="mx-auto max-w-xl leading-relaxed text-carbon/70">
              ¿Su organización quiere ejecutar un proyecto con nosotros en el Área de Conservación Arenal-Tempisque?
            </p>
            <Link
              href="/contacto"
              className="presionable mt-6 inline-flex rounded-full bg-bosque px-7 py-3.5 text-sm font-semibold text-crema hover:bg-musgo"
            >
              Conversemos
            </Link>
          </div>
        </Revelar>
      </section>
    </>
  );
}
