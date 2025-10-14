-- Add payment reminder tracking columns to quotes table
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS last_reminder_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reminder_count INTEGER DEFAULT 0;

-- Add index for efficiently querying overdue invoices
CREATE INDEX IF NOT EXISTS idx_quotes_overdue 
ON quotes(invoice_due_date, invoice_status)
WHERE invoice_raised = true AND invoice_status != 'paid';

-- Add comment for documentation
COMMENT ON COLUMN quotes.last_reminder_sent_at IS 'Timestamp of the last payment reminder sent';
COMMENT ON COLUMN quotes.reminder_count IS 'Number of payment reminders sent for this invoice';