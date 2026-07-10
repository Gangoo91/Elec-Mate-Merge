-- Purchase Orders — Slice 0 foundation: evolve employer_material_orders into a
-- real PO record. All additive (0 existing rows, no data migration risk).
alter table public.employer_material_orders
  add column if not exists delivery_mode text not null default 'Deliver to site',
  add column if not exists delivery_address text,
  add column if not exists subtotal numeric not null default 0,
  add column if not exists vat_rate numeric not null default 20,
  add column if not exists vat_amount numeric not null default 0,
  add column if not exists sent_at timestamptz,
  add column if not exists sent_to_email text,
  add column if not exists confirmed_at timestamptz,
  add column if not exists pdf_url text;
