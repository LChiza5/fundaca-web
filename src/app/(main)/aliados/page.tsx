import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { aliadosApoyo, aliadosProyectos } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Aliados",
  description:
    "Instituciones públicas, municipalidades, universidades, empresas y organizaciones que ejecutan proyectos y apoyan la labor de FUNDACA.",
};

const grupos = [
  { titulo: "Ejecutamos proyectos junto a", lista: aliadosProyectos, acento: "bosque" as const },
  { titulo: "Hemos recibido el apoyo de", lista: aliadosApoyo, acento: "celeste" as const },
];

export default function Aliados() {
  return (
    <>
      <Portada
        seccion="Red institucional"
        titulo="No trabajamos solos"
        entrada="Nuestra labor depende de la coordinación con instituciones públicas, municipalidades, universidades, empresas y organizaciones de la sociedad civil."
        breadcrumb={[{ texto: "Aliados" }]}
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="space-y-16">
          {grupos.map((grupo) => (
            <div key={grupo.titulo}>
              <Revelar>
                <h2 className="font-display text-2xl tracking-tight text-bosque-hondo sm:text-3xl">{grupo.titulo}</h2>
              </Revelar>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.lista.map((aliado, i) => (
                  <Revelar key={aliado.nombre} retraso={Math.min(i, 8) * 40}>
                    <div
                      className={`flex gap-4 rounded-2xl border p-5 ${
                        grupo.acento === "bosque"
                          ? "border-bosque/12 bg-crema-hondo"
                          : "border-celeste/25 bg-celeste/5"
                      }`}
                    >
                      {/* Monograma — reemplazar con <Image> cuando se tengan logos reales */}
                      <div
                        aria-hidden="true"
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold ${
                          grupo.acento === "bosque"
                            ? "bg-bosque/8 text-bosque"
                            : "bg-celeste/12 text-celeste"
                        }`}
                      >
                        {aliado.nombre
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className={`font-display text-base font-semibold leading-snug ${grupo.acento === "bosque" ? "text-bosque-hondo" : "text-celeste"}`}>
                          {aliado.nombre}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-carbon/60">{aliado.descripcion}</p>
                      </div>
                    </div>
                  </Revelar>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
