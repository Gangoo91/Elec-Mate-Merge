-- Create invoice_access table for tracking invoice portal access
CREATE TABLE public.invoice_access (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id uuid NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  access_token text NOT NULL,
  client_email text,
  client_name text,
  status text NOT NULL DEFAULT 'pending',
  viewed_at timestamp with time zone,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.invoice_access ENABLE ROW LEVEL SECURITY;

-- Create policies for public access by token
CREATE POLICY "Allow public read by token"
ON public.invoice_access
FOR SELECT
USING (true);

CREATE POLICY "Allow insert for access records"
ON public.invoice_access
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update for status changes"
ON public.invoice_access
FOR UPDATE
USING (true);

-- Create index for token lookups
CREATE INDEX idx_invoice_access_token ON public.invoice_access(access_token);
CREATE INDEX idx_invoice_access_invoice_id ON public.invoice_access(invoice_id);