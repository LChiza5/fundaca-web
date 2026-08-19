"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { fundacion, navegacion } from "@/data/contenido";

export default function Encabezado() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setDesplazado(window.scrollY > 16);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  // El menú móvil ocupa la pantalla completa: bloquear el scroll de fondo evita
  // que la página se mueva detrás del panel.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  useEffect(() => setAbierto(false), [ruta]);

  // Trampa de foco: mientras el menú está abierto, Tab y Shift+Tab
  // no deben escapar del panel, y Escape debe cerrarlo.
  useEffect(() => {
    if (!abierto) return;
    const menu = document.getElementById("menu-movil");
    if (!menu) return;
    const focusables = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])',
    );
    const primero = focusables[0];
    const ultimo = focusables[focusables.length - 1];
    primero?.focus();

    function alTecla(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAbierto(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === primero) {
          e.preventDefault();
          ultimo?.focus();
        }
      } else {
        if (document.activeElement === ultimo) {
          e.preventDefault();
          primero?.focus();
        }
      }
    }

    document.addEventListener("keydown", alTecla);
    return () => document.removeEventListener("keydown", alTecla);
  }, [abierto]);

  const enPortada = ruta === "/";
  const claro = enPortada && !desplazado && !abierto;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        desplazado
          ? "border-b border-bosque/10 bg-crema/85 shadow-[0_1px_20px_-12px_rgba(14,59,46,0.5)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${fundacion.siglas}, inicio`}>
          <Logo tamano={44} className="transition-transform duration-300 group-hover:scale-105" />
          <span className="leading-tight">
            <span className={`block font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${claro ? "text-crema" : "text-bosque"}`}>
              {fundacion.siglas}
            </span>
            <span className={`hidden text-[11px] uppercase tracking-[0.16em] sm:block transition-colors duration-300 ${claro ? "text-crema/70" : "text-musgo"}`}>
              Arenal-Tempisque
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {navegacion.map((elemento) => (
            <Link
              key={elemento.href}
              href={elemento.href}
              data-activo={ruta === elemento.href}
              aria-current={ruta === elemento.href ? "page" : undefined}
              className={`enlace-sub whitespace-nowrap text-sm font-medium transition-colors duration-200 ${
                claro
                  ? "text-crema/85 hover:text-crema data-[activo=true]:text-crema"
                  : "text-carbon/75 hover:text-bosque data-[activo=true]:text-bosque"
              }`}
            >
              {elemento.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donar"
            className="presionable hidden rounded-full bg-ambar px-5 py-2.5 text-sm font-semibold text-bosque-hondo hover:bg-ambar-claro sm:inline-flex"
          >
            Donar
          </Link>

          <Link
            href="/admin"
            aria-label="Acceso funcionarios"
            title="Acceso funcionarios"
            className={`presionable grid h-11 w-11 place-items-center rounded-full border opacity-60 transition-[opacity,colors] duration-300 hover:opacity-100 ${
              claro ? "border-crema/30 text-crema" : "border-bosque/15 text-bosque"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className={`presionable grid h-11 w-11 place-items-center rounded-full border lg:hidden transition-colors duration-300 ${
              claro ? "border-crema/30 text-crema" : "border-bosque/15 text-bosque"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {abierto ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {abierto && (
        <div id="menu-movil" className="border-t border-bosque/10 bg-crema lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Navegación móvil">
            {navegacion.map((elemento, i) => (
              <Link
                key={elemento.href}
                href={elemento.href}
                style={{ animationDelay: `${i * 40}ms` }}
                aria-current={ruta === elemento.href ? "page" : undefined}
                className="entrada-menu border-b border-bosque/8 py-3.5 font-display text-lg text-bosque last:border-0"
              >
                {elemento.texto}
              </Link>
            ))}
            <Link
              href="/donar"
              className="presionable mt-4 mb-2 rounded-full bg-ambar px-5 py-3 text-center text-sm font-semibold text-bosque-hondo"
            >
              Donar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
