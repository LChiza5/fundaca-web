import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[8rem] font-semibold leading-none text-bosque/10">404</p>
      <h1 className="mt-4 font-display text-3xl tracking-tight text-bosque-hondo">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-sm leading-relaxed text-carbon/60">
        Esta dirección no existe o fue movida. Puede continuar desde el inicio.
      </p>
      <Link
        href="/"
        className="presionable mt-8 rounded-full bg-bosque px-7 py-3.5 text-sm font-semibold text-crema hover:bg-musgo"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
