import Image from "next/image";

/**
 * El logo institucional es un JPG de 225x220 con fondo blanco. Se muestra dentro de
 * un círculo blanco para que el fondo del archivo se lea como parte del diseño y no
 * como un recuadro pegado encima del color de la página.
 */
export default function Logo({ tamano = 44, className = "" }: { tamano?: number; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-bosque/10 ${className}`}
      style={{ width: tamano, height: tamano }}
    >
      <Image
        src="/marca/logo-fundaca.jpeg"
        alt="Logo de FUNDACA"
        width={224}
        height={224}
        priority={tamano > 80}
        style={{ width: "88%", height: "auto" }}
      />
    </span>
  );
}
