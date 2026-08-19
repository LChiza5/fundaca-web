import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import Formulario from "@/components/Formulario";
import { contacto } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Oficinas en ${contacto.ciudad}. ${contacto.horario}.`,
};

export default function Contacto() {
  return (
    <>
      <Portada
        seccion="Contacto"
        titulo="Hablemos"
        entrada="Nuestras oficinas están en Tilarán, contiguo al MINAE. Escríbanos, llámenos o pase a visitarnos."
        breadcrumb={[{ texto: "Contacto" }]}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-9">
            <Revelar>
              <h2 className="text-xs uppercase tracking-[0.16em] text-musgo">Oficinas</h2>
              <address className="mt-4 not-italic leading-relaxed text-carbon/72">
                {contacto.direccion}
                <br />
                {contacto.ciudad}
                <br />
                {contacto.apartado}
              </address>
            </Revelar>

            <Revelar retraso={60}>
              <h2 className="text-xs uppercase tracking-[0.16em] text-musgo">Horario</h2>
              <p className="mt-4 leading-relaxed text-carbon/72">{contacto.horario}</p>
            </Revelar>

            <Revelar retraso={120}>
              <h2 className="text-xs uppercase tracking-[0.16em] text-musgo">Teléfonos</h2>
              <ul className="mt-4 space-y-1.5">
                {contacto.telefonos.map((telefono) => (
                  <li key={telefono}>
                    <a
                      href={`tel:${telefono.replace(/\s/g, "")}`}
                      className="enlace-sub text-carbon/72 transition-colors hover:text-bosque"
                    >
                      {telefono}
                    </a>
                  </li>
                ))}
              </ul>
            </Revelar>

            <Revelar retraso={180}>
              <h2 className="text-xs uppercase tracking-[0.16em] text-musgo">Correo</h2>
              <ul className="mt-4 space-y-1.5">
                {contacto.correos.map((correo) => (
                  <li key={correo}>
                    <a
                      href={`mailto:${correo}`}
                      className="enlace-sub text-carbon/72 transition-colors hover:text-bosque"
                    >
                      {correo}
                    </a>
                  </li>
                ))}
              </ul>
            </Revelar>

            <Revelar retraso={240}>
              <a
                href={contacto.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="presionable inline-flex items-center gap-2 rounded-full border border-bosque/20 px-6 py-3 text-sm font-semibold text-bosque hover:border-bosque/45"
              >
                Síganos en Facebook
              </a>
            </Revelar>
          </div>

          <Revelar retraso={100}>
            <div className="rounded-2xl border border-bosque/12 bg-crema-hondo p-7 sm:p-9">
              <h2 className="font-display text-2xl text-bosque-hondo">Envíenos un mensaje</h2>
              <div className="mt-7">
                <Formulario
                  formspreeId={contacto.formspree.contacto}
                  asunto="Consulta desde el sitio web de FUNDACA"
                  textoBoton="Enviar mensaje"
                  campos={[
                    { nombre: "nombre", etiqueta: "Nombre", requerido: true, placeholder: "Su nombre" },
                    { nombre: "correo", etiqueta: "Correo electrónico", tipo: "email", requerido: true, placeholder: "nombre@correo.com" },
                    { nombre: "asunto", etiqueta: "Asunto", placeholder: "Motivo de su consulta" },
                    { nombre: "telefono", etiqueta: "Teléfono", tipo: "tel", placeholder: "+506 0000 0000" },
                    { nombre: "mensaje", etiqueta: "Mensaje", tipo: "textarea", requerido: true, placeholder: "Cuéntenos en qué podemos ayudarle" },
                  ]}
                />
              </div>
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
