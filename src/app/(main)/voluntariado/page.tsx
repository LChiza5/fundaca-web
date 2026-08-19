import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Revelar from "@/components/Revelar";
import Formulario from "@/components/Formulario";
import { contacto, voluntariado } from "@/data/contenido";

export const metadata: Metadata = {
  title: "Voluntariado",
  description: voluntariado.intro,
};

export default function Voluntariado() {
  return (
    <>
      <Portada seccion="Servicios" titulo="Programa de voluntariado" entrada={voluntariado.intro} breadcrumb={[{ texto: "Voluntariado" }]} />

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <Revelar>
          <h2 className="font-display text-3xl tracking-tight text-bosque-hondo sm:text-4xl">Ámbitos de trabajo</h2>
        </Revelar>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {voluntariado.ambitos.map((ambito, i) => (
            <Revelar key={ambito.titulo} retraso={i * 70}>
              <div className="h-full rounded-2xl border border-bosque/12 bg-crema-hondo p-7">
                <span className="font-display text-sm text-ambar">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl leading-snug text-bosque-hondo">{ambito.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-carbon/68">{ambito.descripcion}</p>
              </div>
            </Revelar>
          ))}
        </div>

        <Revelar retraso={100}>
          <p className="mt-12 max-w-3xl rounded-2xl border-l-4 border-celeste bg-crema-hondo px-7 py-6 leading-relaxed text-carbon/72">
            {voluntariado.asignacion}
          </p>
        </Revelar>
      </section>

      <section className="border-t border-bosque/10 bg-crema-hondo">
        <div className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-24">
          <Revelar>
            <h2 className="font-display text-3xl tracking-tight text-bosque-hondo sm:text-4xl">
              Formulario de inscripción
            </h2>
            <p className="mt-4 leading-relaxed text-carbon/70">
              Complete los datos y nos pondremos en contacto para enviarle el documento con las regulaciones,
              requerimientos, políticas y tarifas del programa.
            </p>
          </Revelar>

          <Revelar retraso={80}>
            <div className="mt-10">
              <Formulario
                formspreeId={contacto.formspree.voluntariado}
                asunto="Inscripción al programa de voluntariado de FUNDACA"
                textoBoton="Enviar inscripción"
                campos={[
                  { nombre: "nombre", etiqueta: "Nombre completo", requerido: true, placeholder: "Su nombre y apellidos" },
                  { nombre: "correo", etiqueta: "Correo electrónico", tipo: "email", requerido: true, placeholder: "nombre@correo.com" },
                  { nombre: "pais", etiqueta: "País de procedencia", requerido: true, placeholder: "Costa Rica" },
                  { nombre: "personas", etiqueta: "Número de personas", tipo: "number", placeholder: "1" },
                  { nombre: "estudios", etiqueta: "Estudios o profesión", placeholder: "Biología, docencia, ingeniería…" },
                  { nombre: "comentarios", etiqueta: "Comentarios", tipo: "textarea", placeholder: "Fechas tentativas, intereses, duración de la estadía…" },
                ]}
              />
            </div>
          </Revelar>
        </div>
      </section>
    </>
  );
}
