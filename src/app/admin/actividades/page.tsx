"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { crearClienteNavegador } from "@/lib/supabase/client";

type Actividad = {
  id: string;
  titulo: string;
  fecha: string;
  lugar: string | null;
  descripcion: string | null;
  imagen_url: string | null;
};

export default function ActividadesAdmin() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenActual, setImagenActual] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const supabase = crearClienteNavegador();
    const { data } = await supabase.from("actividades").select("*").order("fecha", { ascending: true });
    setActividades((data as Actividad[]) ?? []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  function limpiarForm() {
    setTitulo("");
    setFecha("");
    setLugar("");
    setDescripcion("");
    setImagen(null);
    setImagenActual(null);
    setEditando(null);
  }

  function abrirEdicion(a: Actividad) {
    setEditando(a.id);
    setTitulo(a.titulo);
    setFecha(a.fecha.slice(0, 16));
    setLugar(a.lugar ?? "");
    setDescripcion(a.descripcion ?? "");
    setImagenActual(a.imagen_url);
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
      const ruta = `actividades/${Date.now()}-${imagen.name}`;
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
      fecha: new Date(fecha).toISOString(),
      lugar: lugar || null,
      descripcion: descripcion || null,
      imagen_url,
    };

    const { error: errorGuardar } = editando
      ? await supabase.from("actividades").update(registro).eq("id", editando)
      : await supabase.from("actividades").insert(registro);

    if (errorGuardar) {
      console.error(errorGuardar);
      setError(errorGuardar.message ?? "No se pudo guardar. Probá de nuevo.");
      setGuardando(false);
      return;
    }

    limpiarForm();
    setMostrarForm(false);
    setGuardando(false);
    cargar();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar esta actividad?")) return;
    const supabase = crearClienteNavegador();
    await supabase.from("actividades").delete().eq("id", id);
    cargar();
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/admin" className="text-sm text-carbon/50 hover:text-carbon">
        ← Volver al panel
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-display text-2xl text-bosque-hondo">Actividades</h1>
        <button
          onClick={() => {
            if (mostrarForm) limpiarForm();
            setMostrarForm((v) => !v);
          }}
          className="presionable rounded-full bg-bosque px-5 py-2.5 text-sm font-semibold text-crema hover:bg-musgo"
        >
          {mostrarForm ? "Cancelar" : "+ Nueva actividad"}
        </button>
      </div>
      <p className="mt-1 text-sm text-carbon/60">
        Giras y charlas abiertas a la comunidad. Esto se ve en el sitio público, en /actividades.
      </p>

      {mostrarForm && (
        <form onSubmit={guardar} className="mt-6 space-y-3 rounded-2xl border border-bosque/12 bg-crema-hondo p-6">
          <div>
            <label className="text-xs font-medium text-carbon/60">Título del evento</label>
            <input
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-carbon/60">Fecha y hora</label>
              <input
                type="datetime-local"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-carbon/60">Lugar</label>
              <input
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Imagen</label>
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
        ) : actividades.length === 0 ? (
          <p className="py-8 text-center text-sm text-carbon/50">No hay actividades todavía.</p>
        ) : (
          actividades.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-4 py-5">
              <div>
                <h2 className="font-display text-lg text-bosque-hondo">{a.titulo}</h2>
                <p className="text-xs text-carbon/40">
                  {new Date(a.fecha).toLocaleString("es-CR")} {a.lugar ? `· ${a.lugar}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-3 text-xs">
                <button onClick={() => abrirEdicion(a)} className="text-bosque hover:underline">
                  Editar
                </button>
                <button onClick={() => eliminar(a.id)} className="text-carbon/40 hover:text-red-600">
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
