/**
 * Siluetas de aves cruzando el encabezado. Es decoración pura: se oculta por
 * completo cuando la persona pidió movimiento reducido (regla en globals.css).
 */
const bandada = [
  { arriba: "18%", escala: 1, duracion: "38s", retraso: "0s", opacidad: 0.5 },
  { arriba: "26%", escala: 0.68, duracion: "52s", retraso: "-14s", opacidad: 0.34 },
  { arriba: "13%", escala: 0.5, duracion: "64s", retraso: "-30s", opacidad: 0.26 },
];

export default function Aves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bandada.map((ave, i) => (
        <div
          key={i}
          className="ave absolute"
          style={
            {
              top: ave.arriba,
              "--dur": ave.duracion,
              "--retraso": ave.retraso,
              opacity: ave.opacidad,
            } as React.CSSProperties
          }
        >
          <svg width={38 * ave.escala} height={14 * ave.escala} viewBox="0 0 38 14" fill="none">
            <path
              d="M1 9C5.5 9 8 2 11.5 2S17 9 19 9s3.5-7 7-7S32.5 9 37 9"
              stroke="#0e3b2e"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
