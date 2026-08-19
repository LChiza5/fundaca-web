import Image from "next/image";
import Link from "next/link";
import Revelar from "@/components/Revelar";
import { programas } from "@/data/contenido";
import { getFotosProgramas } from "@/lib/consultas";

const FOTOS_FALLBACK = [
  { clave: "huertas", imagen_url: "/img/hortalizas.jpeg", alt: "Huerta de hortalizas bajo invernadero en una finca del ACAT", pie: "Huertas orgánicas" },
  { clave: "biodigestores", imagen_url: "/img/manejoResiduos.jpeg", alt: "Instalación de un biodigestor para manejo de residuos en finca", pie: "Biodigestores en fincas" },
  { clave: "educacion", imagen_url: "/img/tour.jpeg", alt: "Estudiantes de escuela participando en un taller de educación ambiental", pie: "Educación ambiental" },
];

export default async function SeccionProgramas() {
  const fotosSupabase = await getFotosProgramas();
  const fotosDeCampo = FOTOS_FALLBACK.map((f) => fotosSupabase.find((s) => s.clave === f.clave) ?? f);
  return (
    <section className="relative z-10 bg-crema">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Revelar>
          <p className="text-xs uppercase tracking-[0.16em] text-musgo">Programas</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
            Dos grandes líneas, independientes pero transversales
          </h2>
        </Revelar>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {programas.map((programa, i) => (
            <Revelar key={programa.slug} retraso={i * 80}>
              <Link
                href={`/programas/${programa.slug}`}
                className="presionable group flex h-full flex-col rounded-2xl border border-bosque/12 bg-crema-hondo p-7 hover:border-celeste/50"
              >
                <span className="font-display text-sm text-ambar">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl leading-snug text-bosque-hondo">{programa.titulo}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-carbon/65">{programa.resumen}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-bosque">
                  Conocer más
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Revelar>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {fotosDeCampo.map((foto, i) => (
            <Revelar key={foto.clave} retraso={i * 80}>
              <figure className="group overflow-hidden rounded-2xl border border-bosque/12 bg-crema-hondo">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={foto.imagen_url}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-semibold text-bosque">{foto.pie}</figcaption>
              </figure>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}