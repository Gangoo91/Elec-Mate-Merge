-- A user's saved wholesaler contacts, for firing RFQs at (BCC) from a site visit.
create table if not exists public.wholesaler_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.wholesaler_contacts enable row level security;

create policy "own_wholesaler_contacts_select" on public.wholesaler_contacts
  for select using (auth.uid() = user_id);
create policy "own_wholesaler_contacts_insert" on public.wholesaler_contacts
  for insert with check (auth.uid() = user_id);
create policy "own_wholesaler_contacts_update" on public.wholesaler_contacts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_wholesaler_contacts_delete" on public.wholesaler_contacts
  for delete using (auth.uid() = user_id);

create index if not exists wholesaler_contacts_user_id_idx
  on public.wholesaler_contacts (user_id);
