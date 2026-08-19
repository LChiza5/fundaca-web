"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { crearClienteNavegador } from "@/lib/supabase/client";

type Slot = { clave: string; pie: string; imagen_url: string; alt: string };

const SLOTS_FIJOS: Slot[] = [
  { clave: "huertas", pie: "Huertas orgánicas", imagen_url: "", alt: "" },
  { clave: "biodigestores", pie: "Biodigestores en fincas", imagen_url: "", alt: "" },
  { clave: "educacion", pie: "Educación ambiental", imagen_url: "", alt: "" },
];

export default function ProgramasAdmin() {
  const [slots, setSlots] = useState<Slot[]>(SLOTS_FIJOS);
  const [editando, setEditando] = useState<string | null>(null);
  const [imagen, setImagen] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    const supabase = crearClienteNavegador();
    const { data } = await supabase.from("fotos_programas").select("clave, imagen_url, alt, pie");
    if (!data) return;
    setSlots(SLOTS_FIJOS.map((s) => data.find((d) => d.clave === s.clave) ?? s));
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  function abrirEditor(clave: string) {
    const slot = slots.find((s) => s.clave === clave)!;
    setAlt(slot.alt);
    setImagen(null);
    setError("");
    setEditando(clave);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!imagen) { setError("Elegí una foto."); return; }
    setGuardando(true);
    setError("");
    const supabase = crearClienteNavegador();
    const slot = slots.find((s) => s.clave === editando)!;

    const ruta = `programas/${editando}-${Date.now()}-${imagen.name}`;
    const { error: errorSubida } = await supabase.storage.from("publico").upload(ruta, imagen);
    if (errorSubida) { setError("No se pudo subir la imagen."); setGuardando(false); return; }

    const imagen_url = supabase.storage.from("publico").getPublicUrl(ruta).data.publicUrl;
    const { error: errorUpsert } = await supabase.from("fotos_programas").upsert(
      { clave: editando, imagen_url, alt, pie: slot.pie },
      { onConflict: "clave" }
    );
    if (errorUpsert) { setError(errorUpsert.message); setGuardando(false); return; }

    setEditando(null);
    setGuardando(false);
    cargar();
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/admin" className="text-sm text-carbon/50 hover:text-carbon">
        ← Volver al panel
      </Link>
      <h1 className="mt-3 font-display text-2xl text-bosque-hondo">Fotos de programas</h1>
      <p className="mt-1 text-sm text-carbon/60">Las tres fotos de campo que aparecen en la sección de programas del inicio.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {slots.map((slot) => (
          <div key={slot.clave} className="overflow-hidden rounded-2xl border border-bosque/12 bg-crema-hondo">
            <div className="relative aspect-[4/3] w-full bg-bosque/5">
              {slot.imagen_url ? (
                <Image src={slot.imagen_url} alt={slot.alt || slot.pie} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-carbon/30">Sin foto</div>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-bosque">{slot.pie}</p>
              <button
                onClick={() => abrirEditor(slot.clave)}
                className="mt-2 text-xs text-celeste hover:underline"
              >
                Cambiar foto
              </button>
            </div>
          </div>
        ))}
      </div>

      {editando && (
        <form onSubmit={guardar} className="mt-8 space-y-3 rounded-2xl border border-bosque/12 bg-crema-hondo p-6">
          <h2 className="font-display text-lg text-bosque-hondo">
            {slots.find((s) => s.clave === editando)?.pie}
          </h2>
          <div>
            <label className="text-xs font-medium text-carbon/60">Foto nueva</label>
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
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder='Ej. "Niños en taller de educación ambiental"'
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={guardando}
              className="presionable rounded-full bg-bosque px-5 py-2.5 text-sm font-semibold text-crema hover:bg-musgo disabled:opacity-60"
            >
              {guardando ? "Guardando…" : "Guardar foto"}
            </button>
            <button
              type="button"
              onClick={() => setEditando(null)}
              className="text-sm text-carbon/50 hover:text-carbon"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
