import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { contacto, fundacion } from "@/data/contenido";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--fuente-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--fuente-sans",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: fundacion.nombre,
  alternateName: fundacion.siglas,
  url: "https://fundaca-web.vercel.app",
  foundingDate: String(fundacion.anio),
  description: fundacion.definicion,
  address: {
    "@type": "PostalAddress",
    streetAddress: contacto.direccion,
    addressLocality: "Tilarán",
    addressRegion: "Guanacaste",
    addressCountry: "CR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contacto.telefonos[0],
    email: contacto.correos[0],
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [contacto.facebook],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fundaca-web.vercel.app"),
  title: {
    default: `${fundacion.siglas} · ${fundacion.nombre}`,
    template: `%s · ${fundacion.siglas}`,
  },
  description: fundacion.definicion,
  keywords: [
    "FUNDACA",
    "Área de Conservación Arenal-Tempisque",
    "Tilarán",
    "Guanacaste",
    "Costa Rica",
    "conservación",
    "reforestación",
    "voluntariado ambiental",
    "educación ambiental",
  ],
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: fundacion.siglas,
    title: `${fundacion.siglas} · ${fundacion.nombre}`,
    description: fundacion.definicion,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CR" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
