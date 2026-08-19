-- Esquema de la base de datos para el panel de funcionarios de FUNDACA.
-- Pegar y correr completo en Supabase → SQL Editor (una sola vez, en un proyecto nuevo).

-- ── Contenido público (lo edita el staff, lo ve cualquier visitante) ──────────

create table noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  fecha date not null default current_date,
  categoria text,
  resumen text,
  imagen_url text,
  contenido text,
  creado_en timestamptz not null default now()
);

create table actividades (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  fecha timestamptz not null,
  lugar text,
  descripcion text,
  imagen_url text,
  creado_en timestamptz not null default now()
);

create table carrusel (
  id uuid primary key default gen_random_uuid(),
  imagen_url text not null,
  alt text not null,
  orden int not null default 1,
  creado_en timestamptz not null default now()
);

-- ── Zona privada de funcionarios (documentos, giras, bitácora) ────────────────

create table entradas_internas (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  titulo text not null,
  descripcion text,
  fecha date not null default current_date,
  creado_por uuid references auth.users(id),
  creado_en timestamptz not null default now()
);

create table entradas_internas_archivos (
  id uuid primary key default gen_random_uuid(),
  entrada_id uuid not null references entradas_internas(id) on delete cascade,
  archivo_url text not null,
  nombre_original text,
  creado_en timestamptz not null default now()
);

-- ── Seguridad a nivel de fila ──────────────────────────────────────────────────
-- Nadie tiene acceso de escritura sin sesión iniciada. Los funcionarios se agregan
-- a mano desde el dashboard de Supabase (Authentication → Users) — no hay registro
-- público, así que "usuario autenticado" siempre significa "funcionario".

alter table noticias enable row level security;
alter table actividades enable row level security;
alter table carrusel enable row level security;
alter table entradas_internas enable row level security;
alter table entradas_internas_archivos enable row level security;

create policy "lectura publica noticias" on noticias for select using (true);
create policy "lectura publica actividades" on actividades for select using (true);
create policy "lectura publica carrusel" on carrusel for select using (true);

create policy "funcionarios escriben noticias" on noticias for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "funcionarios escriben actividades" on actividades for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "funcionarios escriben carrusel" on carrusel for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "funcionarios ven entradas internas" on entradas_internas for select
  using (auth.role() = 'authenticated');
create policy "funcionarios gestionan entradas internas" on entradas_internas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "funcionarios ven archivos internos" on entradas_internas_archivos for select
  using (auth.role() = 'authenticated');
create policy "funcionarios gestionan archivos internos" on entradas_internas_archivos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── Storage: dos buckets, uno público (fotos del sitio) y uno privado (docs internos) ──

insert into storage.buckets (id, name, public) values ('publico', 'publico', true);
insert into storage.buckets (id, name, public) values ('interno', 'interno', false);

create policy "lectura publica bucket publico" on storage.objects for select
  using (bucket_id = 'publico');
create policy "funcionarios escriben bucket publico" on storage.objects for all
  using (bucket_id = 'publico' and auth.role() = 'authenticated')
  with check (bucket_id = 'publico' and auth.role() = 'authenticated');

create policy "funcionarios leen bucket interno" on storage.objects for select
  using (bucket_id = 'interno' and auth.role() = 'authenticated');
create policy "funcionarios escriben bucket interno" on storage.objects for all
  using (bucket_id = 'interno' and auth.role() = 'authenticated')
  with check (bucket_id = 'interno' and auth.role() = 'authenticated');

-- ── Permisos base de los roles ──────────────────────────────────────────────────
-- RLS decide qué filas se pueden tocar, pero antes que eso el rol necesita permiso
-- para tocar la tabla en absoluto. Supabase suele configurar esto solo; si no,
-- hay que otorgarlo a mano (esto es lo que faltaba y causaba "permission denied").

grant usage on schema public to anon, authenticated;

grant select on noticias, actividades, carrusel to anon, authenticated;
grant insert, update, delete on noticias, actividades, carrusel to authenticated;

grant select, insert, update, delete on entradas_internas, entradas_internas_archivos to authenticated;

-- ── Fotos de la sección Programas (huertas, biodigestores, educación) ──────────
-- Agregada por el compañero directo en Supabase; documentada acá para que el
-- esquema del repo quede al día con lo que existe de verdad en la base.

create table fotos_programas (
  clave text primary key,
  pie text not null,
  imagen_url text not null,
  alt text not null default '',
  actualizado_en timestamptz not null default now()
);

alter table fotos_programas enable row level security;

create policy "lectura publica fotos_programas" on fotos_programas for select
  using (true);
create policy "funcionarios gestionan fotos_programas" on fotos_programas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select on fotos_programas to anon, authenticated;
grant insert, update, delete on fotos_programas to authenticated;
