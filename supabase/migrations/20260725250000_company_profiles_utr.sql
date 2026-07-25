-- ELE-1373 — store the user's UTR (Unique Taxpayer Reference) on their company
-- profile so it can be auto-populated onto invoices when CIS deductions apply.
--
-- NI number is deliberately NOT stored: the user asked for the UTR on invoices
-- but explicitly not their NI ("probably don't want to give NI on an invoice").
alter table public.company_profiles
  add column if not exists utr text;

comment on column public.company_profiles.utr is
  'Unique Taxpayer Reference (10 digits). Auto-shown on invoices when CIS applies. ELE-1373.';
