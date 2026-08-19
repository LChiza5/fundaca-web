import Revelar from "@/components/Revelar";
import { lineasTrabajo } from "@/data/contenido";

export default function SeccionLineasTrabajo() {
  return (
    <section className="relative z-10 border-t border-bosque/10 bg-crema-hondo">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Revelar>
          <p className="text-xs uppercase tracking-[0.16em] text-musgo">Qué hacemos</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
            Ocho líneas de trabajo sostienen nuestra labor en la región
          </h2>
        </Revelar>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {lineasTrabajo.map((linea, i) => (
            <Revelar key={linea.titulo} retraso={(i % 4) * 60}>
              <div className="group">
                <span className="block h-px w-full bg-bosque/15 transition-colors duration-300 group-hover:bg-celeste" />
                <p className="mt-4 font-display text-lg text-bosque">{linea.titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-carbon/65">{linea.descripcion}</p>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
