"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { crearClienteNavegador } from "@/lib/supabase/client";

type Foto = { id: string; imagen_url: string; alt: string; orden: number };

export default function CarruselAdmin() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [alt, setAlt] = useState("");
  const [orden, setOrden] = useState(1);
  const [imagen, setImagen] = useState<File | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const supabase = crearClienteNavegador();
    const { data } = await supabase.from("carrusel").select("*").order("orden", { ascending: true });
    setFotos((data as Foto[]) ?? []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!imagen) {
      setError("Elegí una foto.");
      return;
    }
    setGuardando(true);
    setError("");
    const supabase = crearClienteNavegador();

    const ruta = `carrusel/${Date.now()}-${imagen.name}`;
    const { error: errorSubida } = await supabase.storage.from("publico").upload(ruta, imagen);
    if (errorSubida) {
      setError("No se pudo subir la imagen.");
      setGuardando(false);
      return;
    }
    const imagen_url = supabase.storage.from("publico").getPublicUrl(ruta).data.publicUrl;

    const { error: errorGuardar } = await supabase.from("carrusel").insert({ imagen_url, alt, orden });
    if (errorGuardar) {
      console.error(errorGuardar);
      setError(errorGuardar.message ?? "No se pudo guardar. Probá de nuevo.");
      setGuardando(false);
      return;
    }

    setAlt("");
    setOrden(1);
    setImagen(null);
    setMostrarForm(false);
    setGuardando(false);
    cargar();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Quitar esta foto del carrusel?")) return;
    const supabase = crearClienteNavegador();
    await supabase.from("carrusel").delete().eq("id", id);
    cargar();
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/admin" className="text-sm text-carbon/50 hover:text-carbon">
        ← Volver al panel
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-display text-2xl text-bosque-hondo">Carrusel de portada</h1>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="presionable rounded-full bg-bosque px-5 py-2.5 text-sm font-semibold text-crema hover:bg-musgo"
        >
          {mostrarForm ? "Cancelar" : "+ Nueva foto"}
        </button>
      </div>
      <p className="mt-1 text-sm text-carbon/60">Las fotos que rotan en el inicio del sitio.</p>

      {mostrarForm && (
        <form onSubmit={guardar} className="mt-6 space-y-3 rounded-2xl border border-bosque/12 bg-crema-hondo p-6">
          <div>
            <label className="text-xs font-medium text-carbon/60">Foto</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImagen(e.target.files?.[0] ?? null)}
              className="mt-1 w-full rounded-xl border border-dashed border-bosque/25 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-carbon/60">Descripción breve (para accesibilidad)</label>
            <input
              required
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder='Ej. "Lago Arenal con el volcán al fondo"'
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-carbon/60">Orden (1, 2, 3…)</label>
            <input
              type="number"
              min={1}
              value={orden}
              onChange={(e) => setOrden(Number(e.target.value))}
              className="mt-1 w-24 rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={guardando}
            className="presionable w-full rounded-full bg-bosque px-5 py-3 text-sm font-semibold text-crema hover:bg-musgo disabled:opacity-60"
          >
            {guardando ? "Guardando…" : "Agregar al carrusel"}
          </button>
        </form>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cargando ? (
          <p className="col-span-full py-8 text-center text-sm text-carbon/50">Cargando…</p>
        ) : fotos.length === 0 ? (
          <p className="col-span-full py-8 text-center text-sm text-carbon/50">No hay fotos todavía.</p>
        ) : (
          fotos.map((f) => (
            <div key={f.id} className="overflow-hidden rounded-xl border border-bosque/12">
              <div className="relative aspect-video">
                <Image src={f.imagen_url} alt={f.alt} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between p-2.5">
                <span className="text-[11px] text-carbon/50">#{f.orden}</span>
                <button onClick={() => eliminar(f.id)} className="text-[11px] text-carbon/40 hover:text-red-600">
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
