import { NextResponse } from "next/server";
import { crearClienteServidor } from "@/lib/supabase/server";

// A esta ruta redirige el enlace mágico que le llega al funcionario por correo.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const siguiente = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await crearClienteServidor();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${siguiente}`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=1`);
}
