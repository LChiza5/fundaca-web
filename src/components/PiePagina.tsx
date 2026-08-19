import Link from "next/link";
import { contacto, fundacion, navegacion } from "@/data/contenido";

export default function PiePagina() {
  return (
    <footer className="grano relative overflow-hidden bg-bosque-hondo text-crema/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
        <div>
          <p className="font-display text-2xl text-crema">{fundacion.siglas}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">{fundacion.nombre}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-celeste-claro">
            Desde {fundacion.anio} · Tilarán, Guanacaste
          </p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-crema/50">Secciones</p>
          <ul className="space-y-2.5 text-sm">
            {navegacion.map((elemento) => (
              <li key={elemento.href}>
                <Link href={elemento.href} className="enlace-sub transition-colors duration-200 hover:text-crema">
                  {elemento.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-crema/50">Contacto</p>
          <address className="space-y-2.5 text-sm not-italic leading-relaxed">
            <p>
              {contacto.direccion}
              <br />
              {contacto.ciudad}
            </p>
            <p>{contacto.horario}</p>
            {[contacto.telefonos[0], contacto.telefonos[contacto.telefonos.length - 1]].map((telefono) => (
              <p key={telefono}>
                <a href={`tel:${telefono.replace(/\s/g, "")}`} className="enlace-sub hover:text-crema">
                  {telefono}
                </a>
              </p>
            ))}
            {[contacto.correos[0], contacto.correos[contacto.correos.length - 1]].map((correo) => (
              <p key={correo}>
                <a href={`mailto:${correo}`} className="enlace-sub hover:text-crema">
                  {correo}
                </a>
              </p>
            ))}
          </address>

          <div className="mt-6 flex gap-3">
            <a
              href={contacto.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de FUNDACA"
              className="presionable grid h-10 w-10 place-items-center rounded-full border border-crema/20 hover:border-celeste-claro hover:text-celeste-claro"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
              </svg>
            </a>
            <a
              href={contacto.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de FUNDACA"
              className="presionable grid h-10 w-10 place-items-center rounded-full border border-crema/20 hover:border-celeste-claro hover:text-celeste-claro"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <Link
              href="/donar"
              className="presionable rounded-full border border-crema/20 px-4 py-2 text-sm hover:border-ambar hover:text-ambar-claro"
            >
              Hacer un donativo
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-crema/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-crema/50 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {fundacion.siglas}. Todos los derechos reservados.
          </p>
          <p>
            Sitio creado por Sebastián Villegas Barquero (sebastianbarquerocr@gmail.com), Isaac López González
            (ilopezg170902@gmail.com) y Luis Daniel Álvarez Vargas (luisdanielav05@gmail.com).
          </p>
        </div>
      </div>
    </footer>
  );
}
