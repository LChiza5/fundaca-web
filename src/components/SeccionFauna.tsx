import Image from "next/image";
import Revelar from "@/components/Revelar";
import { fauna } from "@/components/Fauna";

const fotosDeFauna = [
  { archivo: "/img/tucanPicoIris.jpg", alt: "Tucán pico iris (Ramphastos sulfuratus) posado en una rama" },
  { archivo: "/img/rana.jpg", alt: "Rana calzonuda (Agalychnis callidryas) sobre una rama" },
  { archivo: "/img/bocaraca.jpg", alt: "Bocaracá (Bothriechis schlegelii) enroscada sobre musgo" },
  { archivo: "/img/danta.jpg", alt: "Danta o tapir centroamericano (Tapirus bairdii) en el bosque" },
  { archivo: "/img/pizote.jpg", alt: "Pizote (Nasua narica) fotografiado en el área de conservación" },
  { archivo: "/img/morfoAzul.jpg", alt: "Mariposa morfo azul (Morpho helenor) posada sobre una hoja" },
  { archivo: "/img/perezoso.jpg", alt: "Perezoso de dos dedos (Choloepus hoffmanni) colgado de un árbol" },
  { archivo: "/img/colibri.jpg", alt: "Colibrí posado en una rama" },
];

export default function SeccionFauna() {
  return (
    <section className="relative z-10 bg-crema">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Revelar>
          <p className="text-xs uppercase tracking-[0.16em] text-musgo">Lo que protegemos</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight tracking-tight text-bosque-hondo sm:text-4xl">
            Detrás de cada proyecto hay una especie que depende de él
          </h2>
        </Revelar>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {fauna.map(({ Animal, nombre, cientifico, nota }, i) => (
            <li key={nombre}>
              <Revelar retraso={i * 70}>
                <div className="group flex h-full flex-col items-center text-center">
                  <div className="grid h-32 w-32 place-items-center rounded-full bg-crema-hondo transition-colors duration-300 group-hover:bg-hoja/20">
                    <Animal className="w-24 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="mt-5 font-display text-lg leading-snug text-bosque">{nombre}</p>
                  <p className="mt-1 text-xs italic text-carbon/45">{cientifico}</p>
                  <p className="mt-3 text-sm leading-relaxed text-carbon/65">{nota}</p>
                </div>
              </Revelar>
            </li>
          ))}
        </ul>

        <Revelar retraso={100}>
          <p className="mt-16 text-xs uppercase tracking-[0.16em] text-musgo">Fotografías de cada especie en el campo</p>
        </Revelar>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fotosDeFauna.map((foto, i) => (
            <Revelar key={foto.archivo} retraso={i * 60}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={foto.archivo}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}