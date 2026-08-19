import type { Metadata } from "next";
import Link from "next/link";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import { contacto } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Donar",
  description:
    "Apoye la conservación del Área de Conservación Arenal-Tempisque mediante una donación o una alianza institucional.",
};

const destinos = [
  { titulo: "Reforestación", detalle: "Producción de árboles nativos en vivero y siembra en la región." },
  { titulo: "Educación ambiental", detalle: "Talleres y material educativo para escuelas del área de conservación." },
  { titulo: "Gestión de residuos", detalle: "Campañas comunitarias de recolección de residuos no tradicionales." },
];

export default function Donar() {
  return (
    <>
      <Portada
        seccion="Apoyo"
        titulo="Su aporte se convierte en bosque"
        entrada="FUNDACA es una fundación sin fines de lucro. Cada colón recibido se destina a proyectos de conservación y desarrollo comunitario en el Área de Conservación Arenal-Tempisque."
        breadcrumb={[{ texto: "Donar" }]}
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-3">
          {destinos.map((destino, i) => (
            <Revelar key={destino.titulo} retraso={i * 70}>
              <div className="h-full rounded-2xl border border-bosque/12 bg-crema-hondo p-7">
                <h2 className="font-display text-xl leading-snug text-bosque-hondo">{destino.titulo}</h2>
                <p className="mt-3 text-sm leading-relaxed text-carbon/68">{destino.detalle}</p>
              </div>
            </Revelar>
          ))}
        </div>

        <Revelar retraso={120}>
          <div className="mt-14 rounded-3xl bg-bosque px-7 py-12 text-crema sm:px-14">
            <h2 className="mx-auto max-w-xl text-center font-display text-3xl leading-tight tracking-tight">
              ¿Cómo puedo donar?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center leading-relaxed text-crema/72">
              Puede hacerlo por SINPE Móvil o por transferencia bancaria — lo que le resulte más cómodo.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-crema/10 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-crema/60">SINPE Móvil</p>
                <p className="mt-3 font-display text-2xl">{contacto.sinpe}</p>
                <p className="mt-2 text-sm leading-relaxed text-crema/70">
                  A nombre de {contacto.titular}.
                </p>
              </div>

              <div className="rounded-2xl bg-crema/10 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-crema/60">Cuenta bancaria</p>
                <p className="mt-3 font-display text-2xl">{contacto.cuentaBancaria}</p>
                <p className="mt-2 text-sm leading-relaxed text-crema/70">{contacto.banco}</p>
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-crema/72">
              Una vez realizado el depósito, escríbanos al correo{" "}
              <a href={`mailto:${contacto.correos[0]}`} className="enlace-sub text-crema underline">
                {contacto.correos[0]}
              </a>{" "}
              o al{" "}
              <a href={`mailto:${contacto.correos[1]}`} className="enlace-sub text-crema underline">
                {contacto.correos[1]}
              </a>{" "}
              con el comprobante y el monto.
            </p>
          </div>
        </Revelar>

        <Revelar retraso={160}>
          <div className="mt-12 text-center">
            <p className="leading-relaxed text-carbon/70">
              ¿Su organización quiere establecer una alianza o un convenio de cooperación?
            </p>
            <Link
              href="/contacto"
              className="presionable mt-5 inline-flex rounded-full border border-bosque/20 px-7 py-3.5 text-sm font-semibold text-bosque hover:border-bosque/45"
            >
              Escríbanos
            </Link>
          </div>
        </Revelar>
      </section>
    </>
  );
}
