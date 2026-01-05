-- Create quote_acceptances table for tracking client responses
CREATE TABLE public.quote_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL UNIQUE,
  client_email TEXT,
  client_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  signature_data TEXT,
  client_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_acceptances ENABLE ROW LEVEL SECURITY;

-- Allow public read by valid token (for client portal)
CREATE POLICY "Allow public read by token" 
ON public.quote_acceptances 
FOR SELECT 
USING (true);

-- Allow public insert (for creating acceptance records)
CREATE POLICY "Allow insert for acceptance records" 
ON public.quote_acceptances 
FOR INSERT 
WITH CHECK (true);

-- Allow public update (for client responses)
CREATE POLICY "Allow update for client responses" 
ON public.quote_acceptances 
FOR UPDATE 
USING (true);

-- Create index for faster token lookups
CREATE INDEX idx_quote_acceptances_token ON public.quote_acceptances(access_token);
CREATE INDEX idx_quote_acceptances_quote_id ON public.quote_acceptances(quote_id);