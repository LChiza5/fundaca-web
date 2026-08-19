"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[8rem] font-semibold leading-none text-bosque/10">Error</p>
      <h1 className="mt-4 font-display text-3xl tracking-tight text-bosque-hondo">
        Algo salió mal
      </h1>
      <p className="mt-4 max-w-sm leading-relaxed text-carbon/60">
        Ocurrió un error inesperado. Puede intentar de nuevo o volver al inicio.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="presionable rounded-full bg-bosque px-7 py-3.5 text-sm font-semibold text-crema hover:bg-musgo"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="presionable rounded-full border border-bosque/20 px-7 py-3.5 text-sm font-semibold text-bosque hover:border-bosque/45"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
