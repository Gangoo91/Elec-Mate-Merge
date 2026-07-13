-- PO Slice 5: supplier invoices captured + 3-way matched against PO & receipts.
create table if not exists public.employer_supplier_invoices (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.employer_material_orders(id) on delete cascade,
  employer_id uuid not null default auth.uid(),
  supplier_name text,
  invoice_number text,
  invoice_total numeric not null default 0,
  lines jsonb not null default '[]'::jsonb,        -- [{description, qty, unit_price, line_total}]
  matched boolean not null default false,
  variances jsonb not null default '[]'::jsonb,    -- [{type, detail, amount}]
  created_at timestamptz not null default now()
);
create index if not exists employer_supplier_invoices_order_idx on public.employer_supplier_invoices(order_id);
alter table public.employer_supplier_invoices enable row level security;
drop policy if exists supplier_invoices_owner on public.employer_supplier_invoices;
create policy supplier_invoices_owner on public.employer_supplier_invoices
  for all using (employer_id = auth.uid()) with check (employer_id = auth.uid());
