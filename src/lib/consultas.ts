import { createClient } from "@supabase/supabase-js";

// Cliente de solo lectura para contenido público (noticias, actividades, carrusel, programas).
// No depende de cookies/sesión: cualquier visitante puede leer este contenido.
// Se crea al llamarlo, no al importar el archivo, para que un build sin las
// variables de entorno (ej. una etapa de análisis estático) no truene el build entero.
function obtenerCliente() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export function formatearFecha(fecha: string): string {
  const d = new Date(fecha.includes("T") ? fecha : fecha + "T12:00:00");
  return d.toLocaleDateString("es-CR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Costa_Rica",
  });
}

export type Noticia = {
  slug: string;
  titulo: string;
  resumen: string;
  fecha: string;
  etiqueta: string;
  imagen_url: string | null;
  contenido: string | null;
};

export type ImagenCarrusel = { imagen_url: string; alt: string };

function mapearNoticia(fila: {
  slug: string;
  titulo: string;
  resumen: string | null;
  fecha: string;
  categoria: string | null;
  imagen_url: string | null;
  contenido: string | null;
}): Noticia {
  return {
    slug: fila.slug,
    titulo: fila.titulo,
    resumen: fila.resumen ?? "",
    fecha: fila.fecha,
    etiqueta: fila.categoria ?? "",
    imagen_url: fila.imagen_url,
    contenido: fila.contenido,
  };
}

export async function getNoticias(): Promise<Noticia[]> {
  const { data } = await obtenerCliente()
    .from("noticias")
    .select("titulo, slug, fecha, categoria, resumen, imagen_url, contenido")
    .order("fecha", { ascending: false });
  return (data ?? []).map(mapearNoticia);
}

export async function getNoticia(slug: string): Promise<Noticia | null> {
  const { data } = await obtenerCliente()
    .from("noticias")
    .select("titulo, slug, fecha, categoria, resumen, imagen_url, contenido")
    .eq("slug", slug)
    .maybeSingle();
  return data ? mapearNoticia(data) : null;
}

export async function getImagenesCarrusel(): Promise<ImagenCarrusel[]> {
  const { data } = await obtenerCliente()
    .from("carrusel")
    .select("imagen_url, alt")
    .order("orden", { ascending: true });
  return data ?? [];
}

export type Actividad = {
  id: string;
  titulo: string;
  fecha: string;
  descripcion: string | null;
  lugar: string | null;
  imagen_url: string | null;
};

export async function getActividades(): Promise<Actividad[]> {
  const { data } = await obtenerCliente()
    .from("actividades")
    .select("id, titulo, fecha, descripcion, lugar, imagen_url")
    .order("fecha", { ascending: true });
  return data ?? [];
}

export type FotoPrograma = { clave: string; imagen_url: string; alt: string; pie: string };

export async function getFotosProgramas(): Promise<FotoPrograma[]> {
  const { data } = await obtenerCliente().from("fotos_programas").select("clave, imagen_url, alt, pie");
  return data ?? [];
}
