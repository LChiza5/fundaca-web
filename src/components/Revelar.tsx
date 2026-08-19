"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Retraso en milisegundos para escalonar elementos hermanos. Máximo recomendado: 240. */
  retraso?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Revela su contenido cuando entra en pantalla. Se dispara una sola vez:
 * volver a animar al hacer scroll hacia arriba distrae en lugar de ayudar.
 */
export default function Revelar({ children, retraso = 0, className = "", as: Etiqueta = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    // Sin IntersectionObserver el contenido debe verse igual, nunca quedar invisible.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={ref}
      className={`revelar ${className}`}
      data-visible={visible}
      style={{ "--retraso": `${retraso}ms` } as React.CSSProperties}
    >
      {children}
    </Etiqueta>
  );
}
