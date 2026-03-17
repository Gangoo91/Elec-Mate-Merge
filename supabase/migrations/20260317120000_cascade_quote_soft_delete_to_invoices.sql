-- ELE-344: When a quote is soft-deleted (deleted_at set), cascade to linked invoices
-- Root cause: daily-notification-digest queries `invoices` with `deleted_at IS NULL`
-- but quote soft-deletes never propagated to the invoices table, causing ghost notifications

CREATE OR REPLACE FUNCTION sync_quote_soft_delete_to_invoices()
RETURNS TRIGGER AS $$
BEGIN
  -- Only fire when deleted_at transitions from NULL → a timestamp
  IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
    UPDATE public.invoices
    SET deleted_at = NEW.deleted_at
    WHERE quote_id = NEW.id
      AND deleted_at IS NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS cascade_quote_soft_delete ON public.quotes;

CREATE TRIGGER cascade_quote_soft_delete
  AFTER UPDATE ON public.quotes
  FOR EACH ROW
  EXECUTE FUNCTION sync_quote_soft_delete_to_invoices();

-- Backfill: mark any existing invoices as deleted where their linked quote is already deleted
UPDATE public.invoices
SET deleted_at = q.deleted_at
FROM public.quotes q
WHERE invoices.quote_id = q.id
  AND q.deleted_at IS NOT NULL
  AND invoices.deleted_at IS NULL;
