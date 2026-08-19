"use client";

import { useState, type FormEvent, type ChangeEvent, type FocusEvent } from "react";

export type Campo = {
  nombre: string;
  etiqueta: string;
  tipo?: "text" | "email" | "tel" | "number" | "textarea";
  requerido?: boolean;
  placeholder?: string;
};

function validar(campo: Campo, valor: string): string {
  if (campo.requerido && !valor.trim()) return "Este campo es requerido.";
  if (campo.tipo === "email" && valor.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
    return "Ingrese un correo electrónico válido.";
  if (campo.tipo === "tel" && valor.trim() && !/^[\d\s+\-()+]{7,}$/.test(valor))
    return "Ingrese un número de teléfono válido.";
  return "";
}

/**
 * Envía el formulario a Formspree. Requiere crear el formulario en formspree.io
 * y pasar el ID (ej. "xzbkqvdz") como prop formspreeId.
 * El asunto se envía como campo oculto _subject que Formspree usa en el correo.
 */
export default function Formulario({
  campos,
  formspreeId,
  asunto,
  textoBoton = "Enviar",
}: {
  campos: Campo[];
  formspreeId: string;
  asunto: string;
  textoBoton?: string;
}) {
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const [errores, setErrores] = useState<Record<string, string>>({});

  function alCambiar(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    campo: Campo,
  ) {
    // Limpia el error mientras el usuario corrige el campo
    if (errores[campo.nombre]) {
      const error = validar(campo, e.target.value);
      setErrores((prev) => ({ ...prev, [campo.nombre]: error }));
    }
  }

  function alDesfocar(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    campo: Campo,
  ) {
    const error = validar(campo, e.target.value);
    setErrores((prev) => ({ ...prev, [campo.nombre]: error }));
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    // Valida todos los campos antes de enviar
    const form = evento.currentTarget;
    const nuevosErrores: Record<string, string> = {};
    for (const campo of campos) {
      const el = form.elements.namedItem(campo.nombre) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      const error = validar(campo, el?.value ?? "");
      if (error) nuevosErrores[campo.nombre] = error;
    }
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      const primerInvalido = campos.find((c) => nuevosErrores[c.nombre]);
      (form.elements.namedItem(primerInvalido!.nombre) as HTMLElement)?.focus();
      return;
    }

    setEstado("enviando");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        setErrores({});
        setEstado("ok");
      } else {
        setEstado("error");
      }
    } catch {
      setEstado("error");
    }
  }

  const claseInput = (nombre: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-carbon transition-colors duration-200 placeholder:text-carbon/35 focus:outline-none ${
      errores[nombre]
        ? "border-[#c0392b] bg-[#c0392b]/4 focus:border-[#c0392b]"
        : "border-bosque/18 bg-crema hover:border-bosque/35 focus:border-celeste"
    }`;

  return (
    <form onSubmit={enviar} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="_subject" value={asunto} />

      {campos.map((campo) => {
        const esArea = campo.tipo === "textarea";
        const errorId = `error-${campo.nombre}`;
        const tieneError = !!errores[campo.nombre];
        return (
          <div key={campo.nombre} className={esArea ? "sm:col-span-2" : ""}>
            <label htmlFor={campo.nombre} className="mb-2 block text-sm font-medium text-bosque">
              {campo.etiqueta}
              {campo.requerido && (
                <span className="text-ambar" aria-hidden="true">
                  {" "}
                  *
                </span>
              )}
            </label>
            {esArea ? (
              <textarea
                id={campo.nombre}
                name={campo.nombre}
                rows={5}
                required={campo.requerido}
                placeholder={campo.placeholder}
                aria-invalid={tieneError}
                aria-describedby={tieneError ? errorId : undefined}
                onChange={(e) => alCambiar(e, campo)}
                onBlur={(e) => alDesfocar(e, campo)}
                className={claseInput(campo.nombre)}
              />
            ) : (
              <input
                id={campo.nombre}
                name={campo.nombre}
                type={campo.tipo ?? "text"}
                required={campo.requerido}
                placeholder={campo.placeholder}
                aria-invalid={tieneError}
                aria-describedby={tieneError ? errorId : undefined}
                onChange={(e) => alCambiar(e, campo)}
                onBlur={(e) => alDesfocar(e, campo)}
                className={claseInput(campo.nombre)}
              />
            )}
            {tieneError && (
              <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#c0392b]">
                {errores[campo.nombre]}
              </p>
            )}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={estado === "enviando" || estado === "ok"}
          className="presionable inline-flex items-center gap-2 rounded-full bg-bosque px-7 py-3.5 text-sm font-semibold text-crema hover:bg-musgo disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : textoBoton}
          {estado !== "enviando" && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <p
          aria-live="polite"
          className={`mt-4 text-sm ${estado === "error" ? "text-[#c0392b]" : "text-musgo"}`}
        >
          {estado === "ok" && "Mensaje enviado. Nos pondremos en contacto pronto."}
          {estado === "error" && "No se pudo enviar. Intente de nuevo o escríbanos directamente."}
        </p>
      </div>
    </form>
  );
}
