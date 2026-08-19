"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Escena, { escenas } from "@/components/Escena";
import type { ImagenCarrusel } from "@/lib/consultas";

// La primera escena se muestra sin retraso para que la foto principal
// (lago Arenal) cargue con prioridad y no salte al entrar a la página.

const INTERVALO = 7000;

/**
 * Cruza suavemente entre las escenas del área de conservación.
 * - Si se pasan `fotos` desde Supabase, las usa en lugar de los SVG.
 * - prefers-reduced-motion: se queda quieto en la primera escena.
 * - Botón pause: cumple WCAG 2.2.2.
 */
export default function Carrusel({
  className = "",
  fotos = [],
}: {
  className?: string;
  fotos?: ImagenCarrusel[];
}) {
  const usaFotos = fotos.length > 0;
  const total = usaFotos ? fotos.length : escenas.length;

  const [indice, setIndice] = useState(0);
  const [automatico, setAutomatico] = useState(true);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setAutomatico(!consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    if (!automatico || pausado) return;
    const t = setInterval(() => setIndice((i) => (i + 1) % total), INTERVALO);
    return () => clearInterval(t);
  }, [automatico, pausado, total]);

  return (
    <div className={className}>
      {usaFotos
        ? fotos.map((foto, i) => (
            <div
              key={i}
              className="absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ opacity: i === indice ? 1 : 0 }}
            >
              <Image
                src={foto.imagen_url}
                alt={foto.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))
        : escenas.map((escena, i) => (
            <Escena
              key={escena.id}
              escena={escena}
              prioridad={i === 0}
              className="absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              {...{ style: { opacity: i === indice ? 1 : 0 } }}
            />
          ))}

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <div className="flex gap-2.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndice(i)}
              aria-label={usaFotos ? fotos[i].alt : escenas[i].nombre}
              aria-current={i === indice}
              className="presionable group grid h-8 w-8 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  i === indice ? "w-7 bg-crema" : "w-1.5 bg-crema/55 group-hover:bg-crema/85"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPausado((v) => !v)}
          aria-label={pausado ? "Reanudar presentación de escenas" : "Pausar presentación de escenas"}
          className="presionable grid h-8 w-8 place-items-center rounded-full border border-crema/25 text-crema/70 hover:border-crema/55 hover:text-crema"
        >
          {pausado ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
              <path d="M0 0l10 6-10 6z" />
            </svg>
          ) : (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
              <rect width="3" height="12" />
              <rect x="7" width="3" height="12" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}