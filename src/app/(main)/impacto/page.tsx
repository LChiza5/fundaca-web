import type { Metadata } from "next";
import Link from "next/link";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import SeccionNoticias from "@/components/SeccionNoticias";
import { aliadosApoyo, aliadosProyectos, fundacion, programas } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Impacto",
  description:
    "Tres décadas de conservación, educación ambiental y desarrollo comunitario en el Área de Conservación Arenal-Tempisque.",
};

const anios = new Date().getFullYear() - fundacion.anio;

const cifrasImpacto = [
  { valor: `${anios}`, unidad: "años", etiqueta: "de trabajo continuo en el ACAT" },
  { valor: "24", unidad: "aliados", etiqueta: "instituciones, empresas y organizaciones" },
  { valor: "3.645 kg", unidad: "", etiqueta: "de residuos recuperados en 2024" },
  { valor: "3", unidad: "programas", etiqueta: "activos de gestión socioambiental y cultural" },
  { valor: "8", unidad: "líneas", etiqueta: "de trabajo interdisciplinarias" },
  { valor: "1994", unidad: "", etiqueta: "año de constitución en Tilarán, Guanacaste" },
];

export default function Impacto() {
  return (
    <>
      <Portada
        seccion="Resultados"
        titulo="Nuestro impacto"
        entrada={`Desde 1994, FUNDACA trabaja en el Área de Conservación Arenal-Tempisque coordinando instituciones, comunidades y organizaciones para conservar los recursos naturales y mejorar la calidad de vida de la región.`}
        breadcrumb={[{ texto: "Impacto" }]}
      />

      {/* Cifras */}
      <section className="relative z-10 bg-bosque text-crema">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-px bg-crema/10 sm:grid-cols-2 lg:grid-cols-3">
            {cifrasImpacto.map((c, i) => (
              <Revelar key={c.etiqueta} retraso={i * 55}>
                <div className="bg-bosque p-8">
                  <p className="font-display leading-none text-celeste-claro">
                    <span className="text-5xl tracking-tight lg:text-6xl">{c.valor}</span>
                    {c.unidad && (
                      <span className="ml-2 text-xl opacity-70">{c.unidad}</span>
                    )}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-crema/60">{c.etiqueta}</p>
                </div>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* Programas */}
      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
        <Revelar>
          <p className="text-xs uppercase tracking-[0.16em] text-musgo">Programas activos</p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
            Dónde se materializa el trabajo
          </h2>
        </Revelar>

        <div className="mt-12 space-y-5">
          {programas.map((programa, i) => (
            <Revelar key={programa.slug} retraso={i * 80}>
              <Link
                href={`/programas/${programa.slug}`}
                className="presionable group flex gap-7 rounded-2xl border border-bosque/12 bg-crema-hondo p-7 hover:border-celeste/40"
              >
                <span className="shrink-0 font-display text-4xl leading-none text-ambar/50">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-snug text-bosque-hondo">
                    {programa.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-carbon/65">{programa.resumen}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bosque">
                    Ver programa
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </Revelar>
          ))}
        </div>
      </section>

      {/* Aliados — conteo por tipo */}
      <section className="border-y border-bosque/10 bg-crema-hondo">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-20">
          <Revelar>
            <p className="text-xs uppercase tracking-[0.16em] text-musgo">Red institucional</p>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
              No trabajamos solos
            </h2>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="font-display text-4xl tracking-tight text-bosque">
                  {aliadosProyectos.length}
                </p>
                <p className="mt-1 text-sm text-carbon/60">organizaciones co-ejecutoras</p>
              </div>
              <div className="w-px self-stretch bg-bosque/10" aria-hidden="true" />
              <div>
                <p className="font-display text-4xl tracking-tight text-bosque">
                  {aliadosApoyo.length}
                </p>
                <p className="mt-1 text-sm text-carbon/60">organizaciones de apoyo</p>
              </div>
            </div>
            <Link
              href="/aliados"
              className="enlace-sub mt-6 inline-block text-sm font-semibold text-bosque"
            >
              Ver todos los aliados →
            </Link>
          </Revelar>
        </div>
      </section>

      <SeccionNoticias limite={3} />

      {/* CTA */}
      <section className="relative z-10 bg-crema">
        <div className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
          <Revelar>
            <div className="rounded-3xl border border-bosque/12 bg-crema-hondo px-7 py-14 text-center sm:px-14">
              <h2 className="mx-auto max-w-xl font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
                Este impacto se construye con el apoyo de personas como usted
              </h2>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/donar"
                  className="presionable rounded-full bg-bosque px-7 py-3.5 text-sm font-semibold text-crema hover:bg-musgo"
                >
                  Apoyar la fundación
                </Link>
                <Link
                  href="/voluntariado"
                  className="presionable rounded-full border border-bosque/20 px-7 py-3.5 text-sm font-semibold text-bosque hover:border-bosque/45"
                >
                  Ser voluntario
                </Link>
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
