-- Add customer_id FK to quotes table
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL;

-- Index for fast lookups: "all quotes for customer X"
CREATE INDEX IF NOT EXISTS idx_quotes_customer_id ON quotes(customer_id) WHERE customer_id IS NOT NULL;

-- Auto-log quote/invoice activity to customer_activity_log
CREATE OR REPLACE FUNCTION log_quote_customer_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.customer_id IS NOT NULL AND (OLD IS NULL OR OLD.customer_id IS DISTINCT FROM NEW.customer_id) THEN
    INSERT INTO customer_activity_log (customer_id, activity_type, title, description, metadata)
    VALUES (
      NEW.customer_id,
      CASE WHEN NEW.invoice_raised = true THEN 'invoice_created' ELSE 'quote_created' END,
      CASE WHEN NEW.invoice_raised = true
        THEN 'Invoice ' || COALESCE(NEW.invoice_number, NEW.quote_number)
        ELSE 'Quote ' || NEW.quote_number
      END,
      'Total: £' || NEW.total::text,
      jsonb_build_object('quote_id', NEW.id, 'total', NEW.total, 'status', COALESCE(NEW.invoice_status, NEW.status))
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists before creating
DROP TRIGGER IF EXISTS tr_quote_customer_activity ON quotes;

CREATE TRIGGER tr_quote_customer_activity
  AFTER INSERT OR UPDATE OF customer_id ON quotes
  FOR EACH ROW EXECUTE FUNCTION log_quote_customer_activity();
