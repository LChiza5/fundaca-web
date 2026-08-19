"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { crearClienteNavegador } from "@/lib/supabase/client";

const CATEGORIAS = ["Participación", "Campaña", "Educación", "Comunidad", "Institucional"];

function generarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type Noticia = {
  id: string;
  titulo: string;
  slug: string;
  fecha: string;
  categoria: string | null;
  resumen: string | null;
  imagen_url: string | null;
  contenido: string | null;
};

export default function NoticiasAdmin() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [resumen, setResumen] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenActual, setImagenActual] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const supabase = crearClienteNavegador();
    const { data } = await supabase.from("noticias").select("*").order("fecha", { ascending: false });
    setNoticias((data as Noticia[]) ?? []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  function limpiarForm() {
    setTitulo("");
    setFecha(new Date().toISOString().slice(0, 10));
    setCategoria(CATEGORIAS[0]);
    setResumen("");
    setContenido("");
    setImagen(null);
    setImagenActual(null);
    setEditando(null);
  }

  function abrirEdicion(n: Noticia) {
    setEditando(n.id);
    setTitulo(n.titulo);
    setFecha(n.fecha);
    setCategoria(n.categoria ?? CATEGORIAS[0]);
    setResumen(n.resumen ?? "");
    setContenido(n.contenido ?? "");
    setImagenActual(n.imagen_url);
    setImagen(null);
    setMostrarForm(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const supabase = crearClienteNavegador();

    let imagen_url = imagenActual;
    if (imagen) {
      const ruta = `noticias/${Date.now()}-${imagen.name}`;
      const { error: errorSubida } = await supabase.storage.from("publico").upload(ruta, imagen);
      if (errorSubida) {
        setError("No se pudo subir la imagen.");
        setGuardando(false);
        return;
      }
      imagen_url = supabase.storage.from("publico").getPublicUrl(ruta).data.publicUrl;
    }

    const registro = {
      titulo,
      slug: generarSlug(titulo),
      fecha,
      categoria,
      resumen: resumen || null,
      contenido: contenido || null,
      imagen_url,
    };

    const { error: errorGuardar } = editando
      ? await supabase.from("noticias").update(registro).eq("id", editando)
      : await supabase.from("noticias").insert(registro);

    if (errorGuardar) {
      console.error(errorGuardar);
      setError(errorGuardar.message ?? "No se pudo guardar la noticia. Probá de nuevo.");
      setGuardando(false);
      return;
    }

    limpiarForm();
    setMostrarForm(false);
    setGuardando(false);
    cargar();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar esta noticia?")) return;
    const supabase = crearClienteNavegador();
    await supabase.from("noticias").delete().eq("id", id);
    cargar();
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/admin" className="text-sm text-carbon/50 hover:text-carbon">
        ← Volver al panel
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-display text-2xl text-bosque-hondo">Noticias</h1>
        <button
          onClick={() => {
            if (mostrarForm) limpiarForm();
            setMostrarForm((v) => !v);
          }}
          className="presionable rounded-full bg-bosque px-5 py-2.5 text-sm font-semibold text-crema hover:bg-musgo"
        >
          {mostrarForm ? "Cancelar" : "+ Nueva noticia"}
        </button>
      </div>
      <p className="mt-1 text-sm text-carbon/60">Esto se ve en el sitio público, en /noticias.</p>

      {mostrarForm && (
        <form onSubmit={guardar} className="mt-6 space-y-3 rounded-2xl border border-bosque/12 bg-crema-hondo p-6">
          <div>
            <label className="text-xs font-medium text-carbon/60">Título</label>
            <input
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-carbon/60">Fecha</label>
              <input
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-carbon/60">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Resumen (aparece en la lista)</label>
            <textarea
              value={resumen}
              onChange={(e) => setResumen(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Contenido completo</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Imagen principal</label>
            {imagenActual && !imagen && (
              <p className="mt-1 text-xs text-carbon/50">Ya tiene una imagen. Subí otra solo si querés cambiarla.</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files?.[0] ?? null)}
              className="mt-1 w-full rounded-xl border border-dashed border-bosque/25 px-4 py-3 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={guardando}
            className="presionable w-full rounded-full bg-bosque px-5 py-3 text-sm font-semibold text-crema hover:bg-musgo disabled:opacity-60"
          >
            {guardando ? "Guardando…" : editando ? "Guardar cambios" : "Publicar"}
          </button>
        </form>
      )}

      <div className="mt-8 divide-y divide-bosque/10 border-y border-bosque/10">
        {cargando ? (
          <p className="py-8 text-center text-sm text-carbon/50">Cargando…</p>
        ) : noticias.length === 0 ? (
          <p className="py-8 text-center text-sm text-carbon/50">No hay noticias todavía.</p>
        ) : (
          noticias.map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-4 py-5">
              <div>
                {n.categoria && (
                  <span className="rounded-full bg-bosque/8 px-2.5 py-0.5 text-[11px] font-medium text-bosque">
                    {n.categoria}
                  </span>
                )}
                <h2 className="mt-2 font-display text-lg text-bosque-hondo">{n.titulo}</h2>
                <p className="text-xs text-carbon/40">{n.fecha}</p>
              </div>
              <div className="flex shrink-0 gap-3 text-xs">
                <button onClick={() => abrirEdicion(n)} className="text-bosque hover:underline">
                  Editar
                </button>
                <button onClick={() => eliminar(n.id)} className="text-carbon/40 hover:text-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
