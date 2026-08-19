import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { getActividades, formatearFecha } from "@/lib/consultas";

export const metadata: Metadata = {
  title: "Actividades",
  description:
    "Próximas actividades, talleres y eventos de FUNDACA en el Área de Conservación Arenal-Tempisque.",
};

export default async function Actividades() {
  const actividades = await getActividades();

  return (
    <>
      <Portada
        seccion="Agenda"
        titulo="Actividades"
        entrada="Próximos eventos, talleres y campañas de FUNDACA en el Área de Conservación Arenal-Tempisque."
        breadcrumb={[{ texto: "Actividades" }]}
      />

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-24">
        {actividades.length === 0 ? (
          <Revelar>
            <p className="text-center text-carbon/50">
              No hay actividades próximas por el momento. Síguenos en{" "}
              <a
                href="https://www.facebook.com/fundacacr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-bosque hover:underline"
              >
                Facebook
              </a>{" "}
              para estar al tanto.
            </p>
          </Revelar>
        ) : (
          <div className="space-y-6">
            {actividades.map((actividad, i) => {
              const d = new Date(actividad.fecha);
              const dia = d.toLocaleDateString("es-CR", {
                day: "numeric",
                timeZone: "America/Costa_Rica",
              });
              const mes = d.toLocaleDateString("es-CR", {
                month: "short",
                timeZone: "America/Costa_Rica",
              });

              return (
                <Revelar key={actividad.id} retraso={Math.min(i, 4) * 60}>
                  <article className="grid grid-cols-[4.5rem_1fr] gap-5 rounded-2xl border border-bosque/10 bg-crema-hondo p-6">
                    {/* Fecha */}
                    <div className="flex flex-col items-center justify-center rounded-xl bg-bosque py-3 text-crema">
                      <span className="text-[10px] uppercase tracking-wider text-crema/60">
                        {mes}
                      </span>
                      <span className="font-display text-3xl font-semibold leading-tight">
                        {dia}
                      </span>
                    </div>

                    {/* Detalle */}
                    <div>
                      <h2 className="font-display text-xl leading-snug text-bosque-hondo">
                        {actividad.titulo}
                      </h2>
                      {actividad.lugar && (
                        <p className="mt-1 text-sm font-medium text-musgo">
                          {actividad.lugar}
                        </p>
                      )}
                      {actividad.descripcion && (
                        <p className="mt-2 text-sm leading-relaxed text-carbon/70">
                          {actividad.descripcion}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-carbon/40">
                        {formatearFecha(actividad.fecha)}
                      </p>
                    </div>
                  </article>
                </Revelar>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
