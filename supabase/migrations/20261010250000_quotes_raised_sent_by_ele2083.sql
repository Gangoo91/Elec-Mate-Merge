-- ELE-2083: record who raised and who sent each quote and invoice, so a
-- co-admin's work can be told from the owner's.
--
-- Additive and HEAD-safe: three nullable uuid columns, no FK (an FK with
-- ON DELETE SET NULL would fire the quotes UPDATE triggers during an account
-- deletion), no trigger, no backfill. Existing rows stay NULL, so older rows
-- show nothing rather than a guess.
--
--   created_by_user_id       who raised it. Defaults to auth.uid(), so every
--                            signed-in insert (Employer Hub, Electrical Hub,
--                            HEAD and iOS 49 included) records the person;
--                            service-role inserts (Mate) set it explicitly.
--   sent_by_user_id          who last sent it to the client as a QUOTE.
--   invoice_sent_by_user_id  who last sent it as an INVOICE (the same row
--                            becomes the invoice, so the quote's sender is
--                            kept separately).
--
-- Applied live via Supabase MCP on 10 Oct 2026 (polish agent); recorded in
-- schema_migrations as 20261010103615 quotes_raised_sent_by_ele2083.

alter table public.quotes add column if not exists created_by_user_id uuid;
alter table public.quotes add column if not exists sent_by_user_id uuid;
alter table public.quotes add column if not exists invoice_sent_by_user_id uuid;

-- Set the default AFTER adding the column, so no existing row is filled in.
alter table public.quotes alter column created_by_user_id set default auth.uid();

comment on column public.quotes.created_by_user_id is
  'ELE-2083: auth user who raised the quote/invoice (default auth.uid(); Mate sets the person typing). NULL on rows before 10 Oct 2026.';
comment on column public.quotes.sent_by_user_id is
  'ELE-2083: auth user who last sent this as a quote. NULL when unknown.';
comment on column public.quotes.invoice_sent_by_user_id is
  'ELE-2083: auth user who last sent this as an invoice. NULL when unknown.';
