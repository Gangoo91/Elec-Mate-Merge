-- Expected delivery date so "arriving today" / late-delivery tracking works
-- (delivery_date stays the ACTUAL received date).
alter table public.employer_material_orders
  add column if not exists expected_date date;
