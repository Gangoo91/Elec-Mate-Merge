-- ELE-462: Sync quotes.invoice_status changes to invoices.status
-- When a user marks an invoice as paid in the app (updates quotes table),
-- this trigger cascades the status change to the invoices table.
-- Without this, paid invoices keep firing overdue notifications from edge functions
-- that query the invoices table.

-- 1. Create trigger function
CREATE OR REPLACE FUNCTION sync_quote_invoice_status_to_invoices()
RETURNS TRIGGER AS $$
BEGIN
  -- Only act when invoice_status actually changes
  IF OLD.invoice_status IS DISTINCT FROM NEW.invoice_status THEN
    UPDATE invoices
    SET
      status = NEW.invoice_status,
      paid_at = CASE
        WHEN NEW.invoice_status = 'paid' THEN COALESCE(NEW.invoice_paid_at, now())
        ELSE paid_at
      END,
      updated_at = now()
    WHERE quote_id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create trigger on quotes table
DROP TRIGGER IF EXISTS trg_sync_quote_payment_to_invoices ON quotes;
CREATE TRIGGER trg_sync_quote_payment_to_invoices
  AFTER UPDATE OF invoice_status ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION sync_quote_invoice_status_to_invoices();

-- 3. One-time data fix: sync all existing paid quotes → invoices
UPDATE invoices i
SET
  status = q.invoice_status,
  paid_at = COALESCE(q.invoice_paid_at, q.updated_at),
  updated_at = now()
FROM quotes q
WHERE i.quote_id = q.id
  AND q.invoice_status = 'paid'
  AND i.status IS DISTINCT FROM 'paid';
