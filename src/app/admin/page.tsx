import Link from "next/link";
import { crearClienteServidor } from "@/lib/supabase/server";

const secciones = [
  { href: "/admin/noticias", titulo: "Noticias", descripcion: "Publicar y editar noticias del sitio público." },
  { href: "/admin/actividades", titulo: "Actividades", descripcion: "Giras y charlas abiertas a la comunidad." },
  { href: "/admin/carrusel", titulo: "Carrusel", descripcion: "Fotos de portada del inicio." },
  { href: "/admin/programas", titulo: "Fotos de programas", descripcion: "Las tres fotos de campo en la sección de programas." },
  { href: "/admin/documentos", titulo: "Documentos internos", descripcion: "Solo funcionarios: archivos, evidencia, bitácora." },
];

export default async function PanelAdmin() {
  const supabase = await crearClienteServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm text-carbon/50 hover:text-carbon">
        ← Volver al sitio
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-bosque-hondo">Panel de funcionarios</h1>
          <p className="mt-1 text-sm text-carbon/60">{user?.email}</p>
        </div>
        <form action="/admin/salir" method="post">
          <button className="text-sm text-carbon/50 hover:text-carbon" type="submit">
            Salir
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {secciones.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="presionable rounded-2xl border border-bosque/12 bg-crema-hondo p-6 hover:border-celeste/40"
          >
            <h2 className="font-display text-lg text-bosque-hondo">{s.titulo}</h2>
            <p className="mt-1 text-sm text-carbon/60">{s.descripcion}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
