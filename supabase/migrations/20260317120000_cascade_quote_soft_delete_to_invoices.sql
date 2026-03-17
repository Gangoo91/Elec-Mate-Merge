-- Cascade soft-delete from quotes to linked invoices
-- When a quote row gets deleted_at set (soft-deleted), propagate to invoices

CREATE OR REPLACE FUNCTION cascade_quote_soft_delete()
RETURNS trigger AS $$
BEGIN
  -- Only fire when deleted_at transitions from NULL to a timestamp
  IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
    UPDATE invoices
       SET deleted_at = NEW.deleted_at
     WHERE quote_id = NEW.id
       AND deleted_at IS NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop if exists (idempotent)
DROP TRIGGER IF EXISTS cascade_quote_soft_delete ON quotes;

CREATE TRIGGER cascade_quote_soft_delete
  AFTER UPDATE OF deleted_at ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION cascade_quote_soft_delete();

-- Backfill: soft-delete any invoices whose parent quote is already soft-deleted
UPDATE invoices
   SET deleted_at = q.deleted_at
  FROM quotes q
 WHERE invoices.quote_id = q.id
   AND q.deleted_at IS NOT NULL
   AND invoices.deleted_at IS NULL;
