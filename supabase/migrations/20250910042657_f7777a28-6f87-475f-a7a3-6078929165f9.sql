-- Add quote acceptance and signature fields
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS acceptance_status text DEFAULT 'pending';
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS acceptance_method text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS accepted_at timestamp with time zone;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS accepted_by_name text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS accepted_by_email text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS accepted_ip text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS accepted_user_agent text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS signature_url text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS docusign_envelope_id text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS docusign_status text;
ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS public_token text DEFAULT gen_random_uuid();

-- Create public quote views table for security
CREATE TABLE IF NOT EXISTS public.quote_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  public_token text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '30 days'),
  is_active boolean NOT NULL DEFAULT true,
  view_count integer DEFAULT 0,
  last_viewed_at timestamp with time zone
);

-- Enable RLS on quote_views
ALTER TABLE public.quote_views ENABLE ROW LEVEL SECURITY;

-- Policy for users to create views for their own quotes
CREATE POLICY "Users can create views for their own quotes" 
ON public.quote_views 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.quotes 
    WHERE quotes.id = quote_views.quote_id 
    AND quotes.user_id = auth.uid()
  )
);

-- Policy for users to view their own quote views
CREATE POLICY "Users can view their own quote views" 
ON public.quote_views 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.quotes 
    WHERE quotes.id = quote_views.quote_id 
    AND quotes.user_id = auth.uid()
  )
);

-- Policy for public access to active quote views via token
CREATE POLICY "Public can access active quote views via token" 
ON public.quote_views 
FOR SELECT 
USING (is_active = true AND expires_at > now());

-- Policy for public to view quotes via valid token
CREATE POLICY "Public can view quotes via valid token" 
ON public.quotes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.quote_views 
    WHERE quote_views.quote_id = quotes.id 
    AND quote_views.is_active = true 
    AND quote_views.expires_at > now()
  )
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_quote_views_token ON public.quote_views(public_token);
CREATE INDEX IF NOT EXISTS idx_quotes_public_token ON public.quotes(public_token);