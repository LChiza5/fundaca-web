/**
 * Fauna del Área de Conservación Arenal-Tempisque.
 *
 * Ilustración plana por capas: cada animal se construye con una silueta de base, una
 * capa de sombra y una de luz, más los rasgos que lo hacen reconocible. No se usan
 * fotografías, así que no hay licencias de por medio, el peso es de unos pocos
 * kilobytes y se ve nítido en cualquier resolución.
 */

type Props = { className?: string };

export function Tucan({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M78 26c8 0 14 5 16 12" stroke="#5a4a32" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M88 104c11-6 17-18 17-32 0-8-2-15-6-21" stroke="#12211b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="74" cy="68" rx="24" ry="30" fill="#181d1a" />
      <path d="M62 90c0-14 8-24 19-24 5 0 9 2 12 5-1 15-13 26-25 26-4 0-6-3-6-7Z" fill="#2b3129" />
      <circle cx="58" cy="42" r="20" fill="#181d1a" />
      <path d="M60 26c-9-1-17 2-22 8 6 3 14 4 22 2Z" fill="#2b3129" />
      <path d="M50 33c4 0 7 3 7 7v10c0 4-3 7-7 7-2 0-4-1-5-2 1-7 1-14 0-20 1-1 3-2 5-2Z" fill="#f2d98a" />
      <path d="M45 30c-11-3-24-1-33 6-2 1-2 4 0 5 10 7 23 9 34 5 3-1 5-4 5-8s-2-7-6-8Z" fill="#5f9b3f" />
      <path d="M28 30c-6 1-11 3-16 6-2 1-2 4 0 5 5 3 10 5 16 6-2-6-2-11 0-17Z" fill="#d98a2b" />
      <path d="M12 34c-1 1-2 2-2 3s1 2 2 3c3 2 7 4 11 5-3-4-6-7-11-11Z" fill="#c0392b" />
      <path d="M43 30c3 5 3 13 0 18 3-1 5-4 5-9s-2-8-5-9Z" fill="#3f7a2a" />
      <path d="M45 41c-11 1-23 1-33-1 10 2 22 3 33 1Z" stroke="#12211b" strokeWidth="1.6" fill="none" />
      <ellipse cx="53" cy="37" rx="9" ry="8" fill="#4fa3b8" />
      <circle cx="53" cy="37" r="5" fill="#fbf7ee" />
      <circle cx="52" cy="37" r="2.8" fill="#12211b" />
      <circle cx="51" cy="35.5" r="1" fill="#fbf7ee" />
      <path d="M84 96c2 4 2 8 0 12M74 98c-1 4-1 8 1 11" stroke="#4a90a4" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M62 92c8 3 16 2 22-3-2 8-8 13-16 13-4 0-6-4-6-10Z" fill="#c0392b" opacity="0.85" />
    </svg>
  );
}

export function Bocaraca({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M2 82h116" stroke="#5a4a32" strokeWidth="9" strokeLinecap="round" />
      <path d="M20 78c14-4 30-4 44 0" stroke="#6f5c40" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path
        d="M92 78c0-16-14-28-32-28S28 62 28 76c0 8 6 14 14 14 7 0 12-5 12-11 0-5-4-9-9-9-4 0-7 3-7 6"
        stroke="#e0aa2e"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M92 78c0-16-14-28-32-28S28 62 28 76c0 8 6 14 14 14 7 0 12-5 12-11 0-5-4-9-9-9-4 0-7 3-7 6"
        stroke="#f2c94c"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M46 52c3 2 5 5 6 8M62 48c1 3 1 7 0 10M78 56c2 3 3 6 3 10M88 70c1 3 1 6 0 9M36 66c3 1 5 3 6 6M40 82c2 1 4 1 6 0" stroke="#c98b1e" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M38 62c-8-3-14-1-18 4-1 2 0 4 2 5 7 3 14 2 19-2 2-2 2-5 0-6l-3-1Z" fill="#f2c94c" />
      <path d="M22 62c-3 0-5 1-6 3 2 0 4 0 6-1 1-1 1-2 0-2Z" fill="#e0aa2e" />
      <path d="M27 60c-3-2-6-3-9-3 2 2 5 3 9 3ZM26 72c-3 1-6 3-8 5 3 0 6-1 8-3Z" fill="#c98b1e" />
      <ellipse cx="30" cy="66" rx="4.5" ry="4" fill="#f7e2a0" />
      <ellipse cx="30" cy="66" rx="1.5" ry="4" fill="#12211b" />
      <path d="M19 71c2 1 4 2 7 2" stroke="#c98b1e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Danta({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <ellipse cx="62" cy="98" rx="42" ry="6" fill="#12211b" opacity="0.16" />
      <path d="M34 94V74M48 96V74M76 96V74M90 94V74" stroke="#4a4741" strokeWidth="9" strokeLinecap="round" />
      <path d="M34 96h1M48 98h1M76 98h1M90 96h1" stroke="#2c2a26" strokeWidth="10" strokeLinecap="round" />
      <path d="M32 58c0-13 12-22 30-22s30 9 30 22c0 14-8 24-22 24H54c-14 0-22-10-22-24Z" fill="#6b665d" />
      <path d="M42 44c-6 5-10 12-10 20 0 8 3 15 8 19-3-13-2-27 2-39Z" fill="#565149" />
      <path d="M56 38c10 20 10 34 2 44h6c8-12 8-27-2-44h-6Z" fill="#7b756a" opacity="0.6" />
      <path d="M30 56c-8-1-14 2-18 8-3 4-2 9 2 11 5 3 11 1 15-4" fill="#6b665d" />
      <path d="M12 64c-2 3-2 7 0 9 3 2 7 1 9-2-4-1-7-3-9-7Z" fill="#565149" />
      <path d="M14 66c-4 1-7 4-8 8 3 1 7 0 9-3" fill="#4a4741" />
      <ellipse cx="8" cy="72" rx="4" ry="3.5" fill="#2c2a26" />
      <circle cx="22" cy="60" r="3" fill="#12211b" />
      <circle cx="21" cy="59" r="1" fill="#fbf7ee" />
      <path d="M34 44c-3-6-2-11 2-14 3 4 4 9 2 14Z" fill="#565149" />
      <path d="M35 33c-1 2-1 4 0 6 1-2 1-4 0-6Z" fill="#fbf7ee" />
      <path d="M44 42c-3-6-2-11 2-14 3 4 4 9 2 14Z" fill="#6b665d" />
      <path d="M18 76c6 2 12 2 18 0" stroke="#a09a8d" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M92 60c6-2 10 0 12 4-4 3-9 3-12 0Z" fill="#565149" />
    </svg>
  );
}

export function Pizote({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <ellipse cx="58" cy="102" rx="34" ry="5" fill="#12211b" opacity="0.15" />
      <path d="M84 88c10-6 14-18 14-32 0-14-2-26-2-36" stroke="#8a5a2b" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M97 20v6M96 34v6M95 48v6M92 62v6M87 76v5" stroke="#3d2b18" strokeWidth="11" strokeLinecap="round" />
      <path d="M34 70c0-16 12-26 28-26s26 10 26 26c0 14-10 22-26 22s-28-8-28-22Z" fill="#9c6531" />
      <path d="M44 52c-7 5-10 12-10 20 0 9 5 16 13 19-6-12-7-26-3-39Z" fill="#7d4f24" />
      <path d="M40 96V80M54 98V80M70 98V80M84 94V80" stroke="#7d4f24" strokeWidth="8" strokeLinecap="round" />
      <path d="M40 98h1M54 100h1M70 100h1M84 96h1" stroke="#3d2b18" strokeWidth="9" strokeLinecap="round" />
      <path d="M36 46c-5-8-5-14-1-17 4 3 6 9 5 17Z" fill="#7d4f24" />
      <path d="M52 42c-4-8-3-14 1-16 3 3 4 9 2 16Z" fill="#9c6531" />
      <path d="M40 56c-9 1-18 3-26 8-2 1-2 4 0 5 8 5 18 6 27 4 4-1 6-4 6-9s-3-8-7-8Z" fill="#9c6531" />
      <path d="M30 60c-8 2-15 4-16 6 6 4 13 5 20 5-3-4-4-7-4-11Z" fill="#f0e6d2" />
      <ellipse cx="12" cy="66" rx="5" ry="4" fill="#2c2118" />
      <path d="M34 52c8-1 14 2 16 8-6 3-13 2-18-2" fill="#3d2b18" opacity="0.55" />
      <circle cx="36" cy="58" r="4.5" fill="#f0e6d2" />
      <circle cx="35" cy="58" r="2.6" fill="#12211b" />
      <circle cx="34" cy="57" r="0.9" fill="#fbf7ee" />
      <path d="M20 72c4 2 9 3 14 3" stroke="#7d4f24" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Perezoso({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M2 20h116" stroke="#5a4a32" strokeWidth="9" strokeLinecap="round" />
      <path d="M18 24c10-3 22-3 32 0M70 24c10-3 22-3 32 0" stroke="#6f5c40" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M34 24c-2 10 2 18 10 22M86 24c2 10-2 18-10 22" stroke="#9c8360" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M30 22c-4 2-6 5-6 8 3 0 6-2 8-5M90 22c4 2 6 5 6 8-3 0-6-2-8-5" fill="#3d2b18" />
      <ellipse cx="60" cy="70" rx="28" ry="30" fill="#9c8360" />
      <ellipse cx="60" cy="76" rx="19" ry="21" fill="#bfa987" />
      <path d="M40 52c-6 8-9 18-8 28 1 9 5 16 11 20-8-14-10-32-3-48Z" fill="#7d6949" />
      <circle cx="60" cy="44" r="21" fill="#c9b795" />
      <path d="M60 23c-9 0-16 5-19 12 5 3 12 4 19 3 7 1 14 0 19-3-3-7-10-12-19-12Z" fill="#dccdb0" />
      <path d="M44 40c3-6 9-9 14-7-3 4-4 9-3 14-4 1-9-2-11-7Z" fill="#6b5539" />
      <path d="M76 40c-3-6-9-9-14-7 3 4 4 9 3 14 4 1 9-2 11-7Z" fill="#6b5539" />
      <circle cx="52" cy="41" r="3.4" fill="#12211b" />
      <circle cx="68" cy="41" r="3.4" fill="#12211b" />
      <circle cx="51" cy="40" r="1.1" fill="#fbf7ee" />
      <circle cx="67" cy="40" r="1.1" fill="#fbf7ee" />
      <path d="M56 49c1.5 2 6.5 2 8 0 1 1 1 3-1 4h-6c-2-1-2-3-1-4Z" fill="#3d2b18" />
      <path d="M54 56c3 3 9 3 12 0" stroke="#6b5539" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Rana({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M6 96c22-14 82-14 108 0" stroke="#2d6a4f" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M16 84c-8 4-12 10-11 16 7 1 13-2 16-8M104 84c8 4 12 10 11 16-7 1-13-2-16-8" fill="#3f8f5c" />
      <path d="M12 92c-5 3-8 7-8 11 5 0 9-2 12-6M108 92c5 3 8 7 8 11-5 0-9-2-12-6" fill="#e07b2c" />
      <ellipse cx="60" cy="74" rx="33" ry="26" fill="#4fa35f" />
      <path d="M30 62c-6 6-9 14-8 22 6-2 11-8 13-15" fill="#3f8f5c" />
      <path d="M33 82c4-8 4-16 2-22 5 5 8 13 7 22-3 2-6 2-9 0ZM87 82c-4-8-4-16-2-22-5 5-8 13-7 22 3 2 6 2 9 0Z" fill="#5b8fc9" />
      <path d="M36 66l3 16M44 62l3 18M76 62l-3 18M84 66l-3 16" stroke="#f0e6d2" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="60" cy="80" rx="22" ry="18" fill="#69bd72" />
      <path d="M28 52c-9 0-16 7-16 15s7 13 16 13 15-5 15-13-6-15-15-15ZM92 52c9 0 16 7 16 15s-7 13-16 13-15-5-15-13 6-15 15-15Z" fill="#4fa35f" />
      <circle cx="30" cy="62" r="12" fill="#d8422f" />
      <circle cx="90" cy="62" r="12" fill="#d8422f" />
      <circle cx="30" cy="62" r="12" fill="#f2762c" opacity="0.45" />
      <circle cx="90" cy="62" r="12" fill="#f2762c" opacity="0.45" />
      <ellipse cx="30" cy="62" rx="3.6" ry="11" fill="#12211b" />
      <ellipse cx="90" cy="62" rx="3.6" ry="11" fill="#12211b" />
      <circle cx="26" cy="56" r="3" fill="#fbf7ee" opacity="0.9" />
      <circle cx="86" cy="56" r="3" fill="#fbf7ee" opacity="0.9" />
      <path d="M48 84c7 5 17 5 24 0" stroke="#2d6a4f" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="54" cy="72" r="1.8" fill="#2d6a4f" />
      <circle cx="66" cy="72" r="1.8" fill="#2d6a4f" />
    </svg>
  );
}

export function Morfo({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M58 60C48 32 24 20 11 29 -1 38 4 62 21 73c10 6 25 6 37-3Z" fill="#1f6fd0" />
      <path d="M58 60C50 38 32 27 20 31c-8 3-10 14-4 23 8 11 27 14 42 6Z" fill="#4a9ef0" />
      <path d="M58 63c-10 23-31 32-43 23-9-6-8-21 2-28 11-7 27-4 41 5Z" fill="#1755a8" />
      <path d="M58 64c-9 18-25 25-35 19-7-4-6-15 3-20 9-5 22-3 32 1Z" fill="#3a86dd" />
      <path d="M62 60C72 32 96 20 109 29c12 9 7 33-10 44-10 6-25 6-37-3Z" fill="#1f6fd0" />
      <path d="M62 60c8-22 26-33 38-29 8 3 10 14 4 23-8 11-27 14-42 6Z" fill="#4a9ef0" />
      <path d="M62 63c10 23 31 32 43 23 9-6 8-21-2-28-11-7-27-4-41 5Z" fill="#1755a8" />
      <path d="M62 64c9 18 25 25 35 19 7-4 6-15-3-20-9-5-22-3-32 1Z" fill="#3a86dd" />
      <path d="M14 34c-6 8-6 20 0 28M106 34c6 8 6 20 0 28" stroke="#12211b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="40" r="2.4" fill="#fbf7ee" />
      <circle cx="17" cy="50" r="2" fill="#fbf7ee" />
      <circle cx="21" cy="60" r="1.8" fill="#fbf7ee" />
      <circle cx="100" cy="40" r="2.4" fill="#fbf7ee" />
      <circle cx="103" cy="50" r="2" fill="#fbf7ee" />
      <circle cx="99" cy="60" r="1.8" fill="#fbf7ee" />
      <ellipse cx="60" cy="62" rx="4.5" ry="21" fill="#181d1a" />
      <ellipse cx="60" cy="45" rx="4" ry="6" fill="#2b3129" />
      <path d="M58 41c-5-7-11-11-18-12M62 41c5-7 11-11 18-12" stroke="#181d1a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="40" cy="29" r="2" fill="#181d1a" />
      <circle cx="80" cy="29" r="2" fill="#181d1a" />
    </svg>
  );
}

export function Colibri({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M64 56c16-18 38-22 50-12-12 14-34 22-50 12Z" fill="#4fa35f" opacity="0.55" />
      <path d="M64 60c14-14 34-16 44-8-11 11-30 17-44 8Z" fill="#3f8f5c" opacity="0.75" />
      <path d="M66 68c12 16 14 36 5 46-11-11-15-31-5-46Z" fill="#2d6a4f" />
      <path d="M66 68c9 13 11 28 6 38-8-10-11-25-6-38Z" fill="#3f8f5c" />
      <ellipse cx="54" cy="62" rx="22" ry="16" fill="#2f8f7a" transform="rotate(-20 54 62)" />
      <path d="M44 52c-8 4-12 12-11 20 8 0 15-6 18-14" fill="#4fbfa0" />
      <circle cx="36" cy="48" r="13" fill="#2d6a4f" />
      <path d="M32 54c5 2 10 1 13-2-2 6-8 9-13 8Z" fill="#c0392b" />
      <path d="M40 46c-4-2-9-4-14-5 4-1 10 0 15 2Z" fill="#4fbfa0" />
      <path d="M28 42C20 38 10 33 2 26c1 9 10 18 22 23" fill="#181d1a" />
      <circle cx="33" cy="45" r="3.4" fill="#fbf7ee" />
      <circle cx="32" cy="45" r="1.9" fill="#12211b" />
      <circle cx="31.2" cy="44.2" r="0.7" fill="#fbf7ee" />
      <path d="M46 56c5 4 12 5 18 3" stroke="#d98a2b" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

export const fauna = [
  {
    Animal: Tucan,
    nombre: "Tucán pico iris",
    cientifico: "Ramphastos sulfuratus",
    nota: "Dispersa las semillas que regeneran el bosque tras cada siembra.",
  },
  {
    Animal: Rana,
    nombre: "Rana calzonuda",
    cientifico: "Agalychnis callidryas",
    nota: "Su piel depende de aguas limpias: es el termómetro de nuestros ríos.",
  },
  {
    Animal: Bocaraca,
    nombre: "Bocaracá",
    cientifico: "Bothriechis schlegelii",
    nota: "Solo habita bosques maduros y sanos; su presencia indica que el ecosistema funciona.",
  },
  {
    Animal: Danta,
    nombre: "Danta",
    cientifico: "Tapirus bairdii",
    nota: "Jardinera del bosque y especie en peligro: necesita territorios amplios y conectados.",
  },
  {
    Animal: Pizote,
    nombre: "Pizote",
    cientifico: "Nasua narica",
    nota: "Convive con las comunidades y protagoniza nuestras campañas de educación ambiental.",
  },
  {
    Animal: Morfo,
    nombre: "Mariposa morfo azul",
    cientifico: "Morpho helenor",
    nota: "Poliniza el sotobosque húmedo de la cordillera de Tilarán.",
  },
  {
    Animal: Perezoso,
    nombre: "Perezoso de dos dedos",
    cientifico: "Choloepus hoffmanni",
    nota: "Necesita bosque continuo: por eso conectamos fragmentos con corredores.",
  },
  {
    Animal: Colibri,
    nombre: "Colibrí",
    cientifico: "Trochilidae",
    nota: "Poliniza cientos de plantas nativas del área de conservación.",
  },
] as const;
