import type { MetadataRoute } from "next";
import { programas } from "@/data/contenido";
import { getNoticias } from "@/lib/consultas";

const BASE = "https://fundaca-web.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noticias = await getNoticias();

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/fundacion`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/programas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...programas.map((p) => ({
      url: `${BASE}/programas/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${BASE}/actividades`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/voluntariado`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/noticias`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...noticias.map((n) => ({
      url: `${BASE}/noticias/${n.slug}`,
      lastModified: new Date(n.fecha),
      changeFrequency: "never" as const,
      priority: 0.5,
    })),
    { url: `${BASE}/biblioteca`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/aliados`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/impacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/donar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contacto`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
