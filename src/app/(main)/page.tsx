import Link from "next/link";
import Revelar from "@/components/Revelar";
import Carrusel from "@/components/Carrusel";
import Logo from "@/components/Logo";
import { Morfo } from "@/components/Fauna";
import SeccionFauna from "@/components/SeccionFauna";
import SeccionLineasTrabajo from "@/components/SeccionLineasTrabajo";
import SeccionProgramas from "@/components/SeccionProgramas";
import SeccionNoticias from "@/components/SeccionNoticias";
import { aliadosApoyo, aliadosProyectos, cifras, fundacion } from "@/data/contenido";
import { getImagenesCarrusel } from "@/lib/consultas";

const todosLosAliados = [...aliadosProyectos, ...aliadosApoyo];
const letras = [...fundacion.siglas];

export default async function Inicio() {
  const fotosCarrusel = await getImagenesCarrusel();

  return (
    <>
      {/* Portada */}
      <section className="relative isolate -mt-24 flex min-h-[94vh] flex-col justify-center overflow-hidden bg-bosque-hondo">
        <Carrusel className="absolute inset-0 -z-10" fotos={fotosCarrusel} />

        {/* Velo oscuro para que el texto sea legible sobre las fotos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-bosque-hondo/70 via-bosque-hondo/40 to-bosque-hondo/60"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-[34vh] pt-32 pointer-events-none lg:px-8 lg:pb-[36vh]">
          <Revelar>
            <Logo tamano={96} className="shadow-[0_10px_40px_-18px_rgba(7,32,25,0.55)]" />
          </Revelar>

          <h1 className="mt-7 font-display text-[4.2rem] font-semibold leading-[0.92] tracking-tight text-crema sm:text-8xl lg:text-[8.5rem]">
            <span className="sr-only">{fundacion.siglas}</span>
            <span aria-hidden="true" className="flex overflow-hidden">
              {letras.map((letra, i) => (
                <span
                  key={i}
                  className="letra"
                  style={{ "--retraso": `${140 + i * 55}ms` } as React.CSSProperties}
                >
                  {letra}
                </span>
              ))}
            </span>
          </h1>

          <Revelar retraso={620}>
            <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-snug text-crema/90 sm:text-2xl">
              {fundacion.nombre}
            </p>
          </Revelar>

          <Revelar retraso={720}>
            <p className="mt-6 max-w-xl leading-relaxed text-crema/70">
              Desde Tilarán, Guanacaste, gestionamos recursos para el desarrollo socioambiental del{" "}
              {fundacion.area} y su zona de influencia.
            </p>
          </Revelar>

          <Revelar retraso={820}>
            <div className="mt-10 flex flex-wrap gap-3 pointer-events-auto">
              <Link
                href="/voluntariado"
                className="presionable inline-flex items-center gap-2 rounded-full bg-ambar px-7 py-3.5 text-sm font-semibold text-bosque-hondo shadow-[0_14px_36px_-18px_rgba(7,32,25,0.9)] hover:bg-ambar-claro"
              >
                Quiero ser voluntario
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/programas"
                className="presionable inline-flex items-center rounded-full border border-crema/30 bg-crema/10 px-7 py-3.5 text-sm font-semibold text-crema backdrop-blur-sm hover:border-crema/60 hover:bg-crema/20"
              >
                Ver nuestros programas
              </Link>
            </div>
          </Revelar>
        </div>
      </section>

      {/* Cifras */}
      <section className="relative z-10 border-y border-bosque/10 bg-bosque text-crema">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {cifras.map((cifra, i) => (
              <Revelar key={cifra.etiqueta} retraso={i * 70}>
                <p className="font-display text-4xl tracking-tight text-celeste-claro lg:text-5xl">{cifra.valor}</p>
                <p className="mt-2 text-sm text-crema/70">{cifra.etiqueta}</p>
              </Revelar>
            ))}
          </div>
          <Revelar retraso={220}>
            <Link href="/impacto" className="enlace-sub mt-8 inline-block text-sm font-semibold text-celeste-claro/80 hover:text-celeste-claro">
              Ver nuestro impacto completo →
            </Link>
          </Revelar>
        </div>
      </section>

      <SeccionProgramas />
      <SeccionNoticias />
      <SeccionLineasTrabajo />
      <SeccionFauna />

      {/* Voluntariado */}
      <section className="grano relative z-10 overflow-hidden bg-bosque text-crema">
        <div className="relative mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <Revelar>
              <p className="text-xs uppercase tracking-[0.16em] text-celeste-claro">Voluntariado</p>
              <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Su tiempo puede convertirse en bosque
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-crema/75">
                Reforestación, senderos, biodigestores, talleres en escuelas e investigación. Las labores se asignan
                según los estudios, intereses y experiencia de cada persona.
              </p>
              <Link
                href="/voluntariado"
                className="presionable mt-8 inline-flex items-center gap-2 rounded-full bg-ambar px-7 py-3.5 text-sm font-semibold text-bosque-hondo hover:bg-ambar-claro"
              >
                Inscribirme como voluntario
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Revelar>

            <Revelar retraso={120} className="mt-8 flex justify-center lg:mt-0 lg:block lg:justify-self-center">
              <Morfo className="aletea w-32 lg:w-52" />
            </Revelar>
          </div>
        </div>
      </section>

      {/* Aliados */}
      <section className="desfile relative z-10 overflow-hidden border-y border-bosque/10 bg-crema py-14">
        <Revelar>
          <p className="px-5 text-center text-xs uppercase tracking-[0.16em] text-musgo lg:px-8">
            Trabajamos junto a
          </p>
        </Revelar>
        {/* Lista accesible — el ticker de abajo está oculto a lectores de pantalla */}
        <ul className="sr-only">
          {todosLosAliados.map((aliado) => (
            <li key={aliado.nombre}>{aliado.nombre}</li>
          ))}
        </ul>
        <div className="relative mt-8 flex select-none" aria-hidden="true">
          <div className="desfila flex shrink-0 items-center gap-10 pr-10">
            {[...todosLosAliados, ...todosLosAliados].map((aliado, i) => (
              <span key={`${aliado.nombre}-${i}`} className="whitespace-nowrap font-display text-lg text-bosque/45">
                {aliado.nombre}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="relative z-10 bg-crema">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
          <Revelar>
            <div className="rounded-3xl border border-bosque/12 bg-crema-hondo px-7 py-14 text-center sm:px-14">
              <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
                Cada aporte se convierte en árboles, agua limpia y comunidades más fuertes
              </h2>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/donar"
                  className="presionable rounded-full bg-bosque px-7 py-3.5 text-sm font-semibold text-crema hover:bg-musgo"
                >
                  Apoyar la fundación
                </Link>
                <Link
                  href="/contacto"
                  className="presionable rounded-full border border-bosque/20 px-7 py-3.5 text-sm font-semibold text-bosque hover:border-bosque/45"
                >
                  Escribirnos
                </Link>
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
