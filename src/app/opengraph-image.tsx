import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          fontFamily: "Georgia, serif",
          background: "#0e3b2e",
        }}
      >
        {/* Contenido principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7fcdd8",
              marginBottom: 28,
            }}
          >
            Tilarán · Guanacaste · Costa Rica · Desde 1994
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              color: "#fbf7ee",
              lineHeight: 0.88,
              letterSpacing: "-3px",
              marginBottom: 28,
            }}
          >
            FUNDACA
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#fbf7ee",
              opacity: 0.7,
              lineHeight: 1.45,
              maxWidth: 460,
            }}
          >
            Fundación para el Desarrollo del Área de Conservación Arenal
          </div>
        </div>

        {/* Panel derecho decorativo — paisaje SVG */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 360,
            background: "#072019",
            padding: 48,
          }}
        >
          <svg
            viewBox="0 0 280 320"
            width="280"
            height="320"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cielo */}
            <rect width="280" height="320" fill="#072019" />
            {/* Sol */}
            <circle cx="220" cy="72" r="30" fill="#d98a2b" opacity="0.7" />
            {/* Montañas lejanas */}
            <path
              d="M0 180L60 130L120 175L180 120L240 165L280 145L280 320L0 320Z"
              fill="#2d6a4f"
              opacity="0.5"
            />
            {/* Volcán */}
            <path d="M90 230L148 110L206 230Z" fill="#2d6a4f" opacity="0.85" />
            {/* Lago */}
            <rect y="240" width="280" height="50" fill="#1b9aaa" opacity="0.5" />
            <path
              d="M30 258L90 258M120 268L200 268M220 252L260 252"
              stroke="#fbf7ee"
              strokeOpacity="0.25"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Primer plano */}
            <path
              d="M0 272L40 255L90 274L150 254L210 275L260 256L280 268L280 320L0 320Z"
              fill="#0e3b2e"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size },
  );
}
