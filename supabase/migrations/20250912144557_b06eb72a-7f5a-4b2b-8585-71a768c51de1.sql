-- Fix infinite recursion in quotes RLS policies
-- First, drop all existing policies for quotes table
DROP POLICY IF EXISTS "Users can view their own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Users can create their own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Users can update their own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Users can delete their own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Public can view quotes via valid token" ON public.quotes;

-- Create new, corrected policies for quotes table
CREATE POLICY "Users can view their own quotes" 
ON public.quotes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quotes" 
ON public.quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quotes" 
ON public.quotes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quotes" 
ON public.quotes 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Public can view quotes via valid token" 
ON public.quotes 
FOR SELECT 
USING (
  public_token IS NOT NULL AND 
  EXISTS (
    SELECT 1 
    FROM quote_views 
    WHERE quote_views.quote_id = quotes.id 
    AND quote_views.public_token = quotes.public_token
    AND quote_views.is_active = true 
    AND quote_views.expires_at > now()
  )
);