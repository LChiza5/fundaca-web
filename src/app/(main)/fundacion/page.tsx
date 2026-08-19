import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { fundacion, junta, lineasTrabajo } from "@/data/contenido";

export const metadata: Metadata = {
  title: "La fundación",
  description: fundacion.definicion,
};

export default function LaFundacion() {
  return (
    <>
      <Portada
        seccion="Quiénes somos"
        titulo={fundacion.nombre}
        entrada={fundacion.definicion}
        breadcrumb={[{ texto: "La fundación" }]}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Revelar>
            <h2 className="font-display text-2xl text-bosque-hondo">Misión</h2>
            <p className="mt-4 leading-relaxed text-carbon/72">{fundacion.mision}</p>
          </Revelar>
          <Revelar retraso={80}>
            <h2 className="font-display text-2xl text-bosque-hondo">Visión</h2>
            <p className="mt-4 leading-relaxed text-carbon/72">{fundacion.vision}</p>
          </Revelar>
        </div>

        <Revelar retraso={120}>
          <div className="mt-14 rounded-2xl border-l-4 border-celeste bg-crema-hondo px-7 py-8">
            <h2 className="font-display text-xl text-bosque-hondo">Objetivo general</h2>
            <p className="mt-3 leading-relaxed text-carbon/72">{fundacion.objetivo}</p>
          </div>
        </Revelar>
      </section>

      <section className="border-y border-bosque/10 bg-crema-hondo">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <Revelar>
            <p className="text-xs uppercase tracking-[0.16em] text-musgo">Historia</p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-bosque-hondo sm:text-4xl">
              Constituidos el {fundacion.fundacion}
            </h2>
          </Revelar>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {fundacion.antecedentes.map((parrafo, i) => (
              <Revelar key={i} retraso={i * 70}>
                <span className="font-display text-3xl text-ambar">0{i + 1}</span>
                <p className="mt-3 leading-relaxed text-carbon/72">{parrafo}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <Revelar>
          <p className="text-xs uppercase tracking-[0.16em] text-musgo">Cómo trabajamos</p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-bosque-hondo sm:text-4xl">
            Ocho líneas de trabajo
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-carbon/70">{fundacion.coordinacion}</p>
        </Revelar>

        <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {lineasTrabajo.map((linea, i) => (
            <Revelar key={linea.titulo} retraso={(i % 4) * 60}>
              <span className="block h-px w-full bg-bosque/15" />
              <p className="mt-4 font-display text-lg text-bosque">{linea.titulo}</p>
              <p className="mt-2 text-sm leading-relaxed text-carbon/65">{linea.descripcion}</p>
            </Revelar>
          ))}
        </div>
      </section>

      <section className="border-t border-bosque/10 bg-bosque text-crema">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <Revelar>
            <p className="text-xs uppercase tracking-[0.16em] text-celeste-claro">Gobernanza</p>
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">Junta Administrativa</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-crema/70">
              La conforman representantes de las instituciones públicas y locales con presencia en el área de
              conservación.
            </p>
          </Revelar>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {junta.map((miembro, i) => (
              <Revelar key={miembro.nombre} retraso={i * 60}>
                <div className="h-full rounded-2xl border border-crema/15 p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-ambar-claro">{miembro.cargo}</p>
                  <p className="mt-3 font-display text-lg leading-snug">{miembro.nombre}</p>
                  <p className="mt-2 text-sm text-crema/60">{miembro.representa}</p>
                </div>
              </Revelar>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
