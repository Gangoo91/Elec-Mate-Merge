-- ELE-1401 — per-visit job cost ledger (applied to prod 2026-07-25 via MCP).
-- Labour hours, materials and other costs logged against a job as dated
-- entries, convertible to invoice line items. RLS mirrors job_materials.

create table if not exists public.job_cost_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  project_id uuid not null,
  entry_date date not null default current_date,
  category text not null check (category in ('labour', 'material', 'other')),
  description text not null,
  hours numeric,
  quantity numeric,
  unit_cost numeric,
  total numeric not null default 0,
  source_type text,
  source_id uuid,
  invoice_id uuid,
  invoiced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_cost_entries_project_idx
  on public.job_cost_entries (project_id, entry_date desc);
create index if not exists job_cost_entries_user_idx
  on public.job_cost_entries (user_id);

alter table public.job_cost_entries enable row level security;

create policy "own job cost entries select" on public.job_cost_entries
  for select using (auth.uid() = user_id);
create policy "own job cost entries insert" on public.job_cost_entries
  for insert with check (auth.uid() = user_id);
create policy "own job cost entries update" on public.job_cost_entries
  for update using (auth.uid() = user_id);
create policy "own job cost entries delete" on public.job_cost_entries
  for delete using (auth.uid() = user_id);
