-- ELE-954: Deposit on accept
--
-- When a client accepts a quote with a deposit % set on the sparky's company
-- profile (or quote-level override), the platform auto-creates a "Deposit"
-- invoice linked to the parent quote and generates a Stripe payment link.
-- Once paid, the parent quote flips from 'accepted_pending_deposit' →
-- 'accepted' and the booking is confirmed.

-- ── Quote ↔ deposit invoice link ─────────────────────────────────────
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS deposit_invoice_id UUID
    REFERENCES invoices(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS deposit_paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deposit_required BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS deposit_amount_pennies BIGINT;

COMMENT ON COLUMN quotes.deposit_required IS
  'Snapshot at acceptance time: was deposit required to confirm this quote';
COMMENT ON COLUMN quotes.deposit_amount_pennies IS
  'Snapshot of deposit amount in pennies (excl VAT proration handled at invoice level)';

-- ── Invoice ↔ parent quote link ──────────────────────────────────────
ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS parent_quote_id UUID
    REFERENCES quotes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS deposit_for_quote BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN invoices.parent_quote_id IS
  'Set when the invoice is a deposit (or final) invoice for a specific quote';
COMMENT ON COLUMN invoices.deposit_for_quote IS
  'TRUE only for deposit-type invoices auto-generated at quote acceptance time';

CREATE INDEX IF NOT EXISTS idx_invoices_parent_quote
  ON invoices(parent_quote_id) WHERE parent_quote_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quotes_deposit_invoice
  ON quotes(deposit_invoice_id) WHERE deposit_invoice_id IS NOT NULL;

-- The acceptance_status column stays as text (no enum), so we don't need a
-- schema change to allow 'accepted_pending_deposit'. Logic is enforced in
-- application code (quote-action edge fn).
