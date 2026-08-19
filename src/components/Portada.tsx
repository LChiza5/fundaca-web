import Link from "next/link";
import Revelar from "@/components/Revelar";

type Crumb = { texto: string; href?: string };

export default function Portada({
  seccion,
  titulo,
  entrada,
  breadcrumb,
}: {
  seccion: string;
  titulo: string;
  entrada?: string;
  breadcrumb?: Crumb[];
}) {
  return (
    <section className="grano relative overflow-hidden border-b border-bosque/10 bg-crema-hondo">
      <div className="relative mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        {breadcrumb && (
          <nav aria-label="Ruta de navegación" className="mb-7">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="text-xs text-carbon/50 transition-colors hover:text-bosque">
                  Inicio
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.texto} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-xs text-carbon/30">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-xs text-carbon/50 transition-colors hover:text-bosque">
                      {crumb.texto}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-xs font-medium text-bosque">
                      {crumb.texto}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Revelar>
          <p className="text-xs uppercase tracking-[0.16em] text-musgo">{seccion}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-bosque-hondo sm:text-5xl">
            {titulo}
          </h1>
          {entrada && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-carbon/70">{entrada}</p>}
        </Revelar>
      </div>
    </section>
  );
}
