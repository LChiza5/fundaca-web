"use client";

import { useState } from "react";
import Link from "next/link";
import { crearClienteNavegador } from "@/lib/supabase/client";

export default function LoginFuncionarios() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function alEnviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError("");

    const supabase = crearClienteNavegador();
    const { error } = await supabase.auth.signInWithPassword({ email: correo, password: contrasena });

    if (error) {
      console.error(error);
      setError(`${error.message} (código: ${error.code ?? error.status})`);
      setEnviando(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5">
      <Link href="/" className="mb-6 text-sm text-carbon/50 hover:text-carbon">
        ← Volver al sitio
      </Link>

      <h1 className="font-display text-2xl text-bosque-hondo">Acceso funcionarios</h1>
      <p className="mt-2 text-sm text-carbon/60">Solo para personal autorizado de FUNDACA.</p>

      <form onSubmit={alEnviar} className="mt-6 space-y-3">
        <input
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@fundaca.org"
          className="w-full rounded-xl border border-bosque/15 px-4 py-3 text-sm outline-none focus:border-bosque/40"
        />
        <input
          type="password"
          required
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
          className="w-full rounded-xl border border-bosque/15 px-4 py-3 text-sm outline-none focus:border-bosque/40"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="presionable w-full rounded-full bg-bosque px-5 py-3 text-sm font-semibold text-crema hover:bg-musgo disabled:opacity-60"
        >
          {enviando ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
