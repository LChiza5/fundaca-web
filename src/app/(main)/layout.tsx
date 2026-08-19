import Encabezado from "@/components/Encabezado";
import PiePagina from "@/components/PiePagina";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bosque focus:px-5 focus:py-2.5 focus:text-sm focus:text-crema"
      >
        Saltar al contenido
      </a>
      <Encabezado />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <PiePagina />
    </>
  );
}
