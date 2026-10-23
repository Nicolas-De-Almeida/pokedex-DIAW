-- Pokédex · tabela de Pokémon favoritos
-- Execute este script no Supabase: Dashboard > SQL Editor > New query > Run

create table if not exists public.favorites (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  pokemon_id  integer not null check (pokemon_id between 1 and 151),
  created_at  timestamptz not null default now(),
  unique (user_id, pokemon_id)
);

create index if not exists favorites_user_id_idx on public.favorites (user_id);

-- Row Level Security: cada usuário (anônimo) só enxerga e altera os próprios favoritos
alter table public.favorites enable row level security;

drop policy if exists "Ler os próprios favoritos" on public.favorites;
create policy "Ler os próprios favoritos"
  on public.favorites for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Adicionar os próprios favoritos" on public.favorites;
create policy "Adicionar os próprios favoritos"
  on public.favorites for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Remover os próprios favoritos" on public.favorites;
create policy "Remover os próprios favoritos"
  on public.favorites for delete
  to authenticated
  using (user_id = auth.uid());
