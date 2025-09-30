-- Add invoice-related fields to quotes table
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS invoice_raised boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS invoice_number text UNIQUE,
ADD COLUMN IF NOT EXISTS invoice_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS invoice_due_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS invoice_status text CHECK (invoice_status IN ('draft', 'sent', 'paid', 'overdue')),
ADD COLUMN IF NOT EXISTS additional_invoice_items jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS invoice_notes text,
ADD COLUMN IF NOT EXISTS work_completion_date timestamp with time zone;

-- Create index for invoice lookups
CREATE INDEX IF NOT EXISTS idx_quotes_invoice_number ON public.quotes(invoice_number) WHERE invoice_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quotes_invoice_status ON public.quotes(invoice_status) WHERE invoice_status IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.quotes.invoice_raised IS 'Indicates if an invoice has been raised from this quote';
COMMENT ON COLUMN public.quotes.invoice_status IS 'Status of the invoice: draft, sent, paid, or overdue';
COMMENT ON COLUMN public.quotes.additional_invoice_items IS 'Extra items added to invoice beyond original quote items';