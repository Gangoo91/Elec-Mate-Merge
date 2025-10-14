-- Add soft delete column to quotes table for invoice deletion
ALTER TABLE quotes 
ADD COLUMN deleted_at TIMESTAMPTZ NULL;

-- Add index for performance when filtering out deleted invoices
CREATE INDEX idx_quotes_not_deleted ON quotes(deleted_at)
WHERE deleted_at IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN quotes.deleted_at IS 'Timestamp when invoice was soft-deleted. NULL means active invoice.';