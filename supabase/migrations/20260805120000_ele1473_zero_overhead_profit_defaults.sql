-- ELE-1473 — stop new company profiles being created with a built-in markup.
--
-- 20260130140000_add_pricing_settings.sql added these columns as
-- `DEFAULT 15` and `DEFAULT 20`. Postgres backfills existing rows when a
-- column is added with a default, so every profile has carried 15 / 20 since.
-- The invoice builder compounded them (profit charged on subtotal + overhead),
-- giving 1.15 x 1.20 = exactly 1.38 — a silent 38% on top of every invoice
-- raised from a certificate, with no line item to explain it.
--
-- ELE-326 (Mar 2026) tried to fix this in the client with `?? 0`, but `??`
-- only fires on NULL and these columns are never NULL, so the fallback was
-- dead code and the bug survived to be reported again as ELE-1010 and ELE-1473.
--
-- Existing values are left in place deliberately: nothing reads them any more
-- (the invoice wizard no longer pulls them, and the Pricing sheet no longer
-- exposes them), and issued invoices store their own overhead/profit amounts,
-- which must not be rewritten. Changing only the default keeps this migration
-- non-destructive.
ALTER TABLE public.company_profiles
  ALTER COLUMN overhead_percentage SET DEFAULT 0,
  ALTER COLUMN profit_margin SET DEFAULT 0;

COMMENT ON COLUMN public.company_profiles.overhead_percentage IS
  'DEPRECATED (ELE-1473) — no longer applied to quotes or invoices. Profit belongs in the hourly rate and material markup. Retained only so historic rows are not lost.';
COMMENT ON COLUMN public.company_profiles.profit_margin IS
  'DEPRECATED (ELE-1473) — no longer applied to quotes or invoices. Profit belongs in the hourly rate and material markup. Retained only so historic rows are not lost.';
