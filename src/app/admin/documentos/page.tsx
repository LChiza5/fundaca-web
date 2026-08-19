"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { crearClienteNavegador } from "@/lib/supabase/client";

const CATEGORIAS = [
  "gira",
  "charla",
  "lombricultura",
  "biodigestor",
  "invernadero",
  "convenio",
  "informe",
  "acta",
  "evidencia",
  "otro",
] as const;

const ETIQUETAS: Record<string, string> = {
  gira: "Gira",
  charla: "Charla",
  lombricultura: "Lombricultura",
  biodigestor: "Biodigestor",
  invernadero: "Invernadero",
  convenio: "Convenio",
  informe: "Informe",
  acta: "Acta",
  evidencia: "Evidencia",
  otro: "Otro",
};

type Archivo = { id: string; archivo_url: string; nombre_original: string | null };
type Entrada = {
  id: string;
  categoria: string;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  entradas_internas_archivos: Archivo[];
};

export default function DocumentosInternos() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState<string>("todas");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<string>("gira");
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [descripcion, setDescripcion] = useState("");
  const [archivos, setArchivos] = useState<FileList | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const supabase = crearClienteNavegador();
    const { data } = await supabase
      .from("entradas_internas")
      .select("*, entradas_internas_archivos(*)")
      .order("fecha", { ascending: false });
    setEntradas((data as Entrada[]) ?? []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setError("");
    const supabase = crearClienteNavegador();

    const { data: entrada, error: errorEntrada } = await supabase
      .from("entradas_internas")
      .insert({ titulo, categoria, fecha, descripcion: descripcion || null })
      .select()
      .single();

    if (errorEntrada || !entrada) {
      console.error(errorEntrada);
      setError(errorEntrada?.message ?? "No se pudo guardar la entrada. Probá de nuevo.");
      setGuardando(false);
      return;
    }

    if (archivos) {
      for (const archivo of Array.from(archivos)) {
        const ruta = `${entrada.id}/${Date.now()}-${archivo.name}`;
        const { error: errorSubida } = await supabase.storage.from("interno").upload(ruta, archivo);
        if (!errorSubida) {
          await supabase.from("entradas_internas_archivos").insert({
            entrada_id: entrada.id,
            archivo_url: ruta,
            nombre_original: archivo.name,
          });
        }
      }
    }

    setTitulo("");
    setDescripcion("");
    setArchivos(null);
    setMostrarForm(false);
    setGuardando(false);
    cargar();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar esta entrada y sus archivos adjuntos?")) return;
    const supabase = crearClienteNavegador();
    await supabase.from("entradas_internas").delete().eq("id", id);
    cargar();
  }

  async function descargar(ruta: string) {
    const supabase = crearClienteNavegador();
    const { data } = await supabase.storage.from("interno").createSignedUrl(ruta, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  const visibles = filtro === "todas" ? entradas : entradas.filter((e) => e.categoria === filtro);

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/admin" className="text-sm text-carbon/50 hover:text-carbon">
        ← Volver al panel
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-display text-2xl text-bosque-hondo">Documentos internos</h1>
        <button
          onClick={() => setMostrarForm((v) => !v)}
          className="presionable rounded-full bg-bosque px-5 py-2.5 text-sm font-semibold text-crema hover:bg-musgo"
        >
          {mostrarForm ? "Cancelar" : "+ Nuevo"}
        </button>
      </div>
      <p className="mt-1 text-sm text-carbon/60">
        Solo lo ven los funcionarios. Giras, charlas, actas, convenios, informes, evidencia — lo que sea.
      </p>

      {mostrarForm && (
        <form onSubmit={guardar} className="mt-6 space-y-3 rounded-2xl border border-bosque/12 bg-crema-hondo p-6">
          <div>
            <label className="text-xs font-medium text-carbon/60">Título</label>
            <input
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
              placeholder='Ej. "Gira Parque Nacional Volcán Tenorio"'
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-carbon/60">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {ETIQUETAS[c]}
                  </option>
                ))}
              </select>
            </div>
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
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Notas (opcional)</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-bosque/15 px-4 py-2.5 text-sm outline-none focus:border-bosque/40"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-carbon/60">Archivos (fotos, PDF, Word, Excel)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setArchivos(e.target.files)}
              className="mt-1 w-full rounded-xl border border-dashed border-bosque/25 px-4 py-3 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={guardando}
            className="presionable w-full rounded-full bg-bosque px-5 py-3 text-sm font-semibold text-crema hover:bg-musgo disabled:opacity-60"
          >
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </form>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFiltro("todas")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
            filtro === "todas" ? "bg-bosque text-crema" : "bg-bosque/8 text-carbon/60"
          }`}
        >
          Todas
        </button>
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            onClick={() => setFiltro(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              filtro === c ? "bg-bosque text-crema" : "bg-bosque/8 text-carbon/60"
            }`}
          >
            {ETIQUETAS[c]}
          </button>
        ))}
      </div>

      <div className="mt-6 divide-y divide-bosque/10 border-y border-bosque/10">
        {cargando ? (
          <p className="py-8 text-center text-sm text-carbon/50">Cargando…</p>
        ) : visibles.length === 0 ? (
          <p className="py-8 text-center text-sm text-carbon/50">No hay entradas todavía.</p>
        ) : (
          visibles.map((entrada) => (
            <div key={entrada.id} className="py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-bosque/8 px-2.5 py-0.5 text-[11px] font-medium text-bosque">
                    {ETIQUETAS[entrada.categoria] ?? entrada.categoria}
                  </span>
                  <h2 className="mt-2 font-display text-lg text-bosque-hondo">{entrada.titulo}</h2>
                  <p className="text-xs text-carbon/40">{entrada.fecha}</p>
                  {entrada.descripcion && (
                    <p className="mt-2 text-sm text-carbon/70">{entrada.descripcion}</p>
                  )}
                  {entrada.entradas_internas_archivos?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entrada.entradas_internas_archivos.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => descargar(a.archivo_url)}
                          className="rounded-lg border border-bosque/15 px-3 py-1.5 text-xs text-bosque hover:border-bosque/40"
                        >
                          📎 {a.nombre_original ?? "archivo"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => eliminar(entrada.id)}
                  className="shrink-0 text-xs text-carbon/40 hover:text-red-600"
                >
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
