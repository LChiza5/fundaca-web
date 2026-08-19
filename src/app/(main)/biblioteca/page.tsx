import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { biblioteca } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Biblioteca",
  description: biblioteca.intro,
};

export default function Biblioteca() {
  return (
    <>
      <Portada seccion="Recursos" titulo="Biblioteca" entrada={biblioteca.intro} breadcrumb={[{ texto: "Biblioteca" }]} />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="space-y-16">
          {biblioteca.grupos.map((grupo, g) => (
            <div key={grupo.titulo}>
              <Revelar>
                <h2 className="font-display text-2xl tracking-tight text-bosque-hondo sm:text-3xl">{grupo.titulo}</h2>
              </Revelar>
              <ul className="mt-8 divide-y divide-bosque/10 border-y border-bosque/10">
                {grupo.recursos.map((recurso, i) => (
                  <li key={recurso.nombre}>
                    <Revelar retraso={Math.min(i, 5) * 50}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                        <p className="font-display text-lg text-bosque">{recurso.nombre}</p>
                        <p className="text-sm text-carbon/55">{recurso.nota}</p>
                      </div>
                    </Revelar>
                  </li>
                ))}
              </ul>
              {g === biblioteca.grupos.length - 1 && (
                <Revelar>
                  <p className="mt-8 text-sm leading-relaxed text-carbon/55">
                    Los archivos originales de esta sección se encuentran en poder de FUNDACA. Escríbanos para
                    solicitar cualquiera de estos documentos.
                  </p>
                </Revelar>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
