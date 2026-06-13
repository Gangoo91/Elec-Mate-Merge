-- E5c: finder's fee billing lifecycle on elec_id_hire_records.
--
-- ⚠️ NOT YET APPLIED — unlike the *_hire_hinge / *_overview_radar stubs (which
-- mirror already-live DB migrations), THIS migration's body is not in prod yet.
-- Apply it at employer-tier launch, together with: deploying charge-finder-fee
-- + refund-finder-fee, adding the webhook finder_fee branches, creating the UK
-- VAT 20% tax rate (set ELECMATE_VAT_RATE_ID), and flipping FINDER_FEE_ENABLED.
--
-- The table is empty in prod (0 hire records), so the CHECK + new columns are
-- safe to add with no backfill. Rollback = drop the 5 columns, the constraint
-- and the index.

alter table public.elec_id_hire_records
  add column if not exists stripe_invoice_id text,
  add column if not exists invoiced_at timestamptz,
  add column if not exists paid_at timestamptz,
  add column if not exists failed_at timestamptz,
  add column if not exists refunded_at timestamptz;

-- fee_status lifecycle: pending → invoiced → paid → refunded (or failed)
alter table public.elec_id_hire_records
  drop constraint if exists elec_id_hire_records_fee_status_check;
alter table public.elec_id_hire_records
  add constraint elec_id_hire_records_fee_status_check
  check (fee_status in ('pending', 'invoiced', 'paid', 'failed', 'refunded'));

-- The webhook settles by metadata.hire_record_id, but storing the invoice id
-- gives a clean audit link and makes the guarantee-window refund deterministic
-- (no Stripe metadata search needed to find the payment to refund).
create index if not exists idx_elec_id_hire_records_stripe_invoice
  on public.elec_id_hire_records (stripe_invoice_id);

comment on column public.elec_id_hire_records.stripe_invoice_id is
  'One-off Stripe invoice for the £250 net finder''s fee (charge-finder-fee). The stripe-subscription-webhook flips fee_status on settlement.';
