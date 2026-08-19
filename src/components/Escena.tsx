import Image from "next/image";

/**
 * Escenas del Área de Conservación Arenal-Tempisque.
 *
 * Antes esta composición se dibujaba con SVG generativo. Ahora usa fotografías
 * reales del territorio que atiende FUNDACA. El volcán y el lago Arenal abren
 * la presentación porque son la imagen que mejor identifica a la fundación.
 */

export type Escena = {
  id: string;
  nombre: string;
  archivo: string;
  posicion?: string;
};

export const escenas: Escena[] = [
  {
    id: "lago-arenal",
    nombre: "Lago Arenal con el volcán Arenal al fondo",
    archivo: "/img/lagoArenal.jpg",
    posicion: "center 55%",
  },
  {
    id: "catarata",
    nombre: "Catarata del río Celeste",
    archivo: "/img/catarataRioCeleste.jpg",
    posicion: "center 40%",
  },
  {
    id: "rio-celeste",
    nombre: "Aguas turquesa del río Celeste",
    archivo: "/img/rioCeleste.jpeg",
    posicion: "center 60%",
  },
];

export default function Escena({
  escena,
  prioridad = false,
  className = "",
  style,
}: {
  escena: Escena;
  prioridad?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style} role="img" aria-label={escena.nombre}>
      <Image
        src={escena.archivo}
        alt={escena.nombre}
        fill
        priority={prioridad}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: escena.posicion ?? "center" }}
      />
      {/* Velo sutil para que el texto y los controles se lean sobre cualquier foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bosque-hondo/55 via-bosque-hondo/10 to-bosque-hondo/25"
      />
    </div>
  );
}