-- Create helper functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_owner_of_quote(q_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = q_id AND q.user_id = auth.uid()
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.can_access_quote_via_token(q_id uuid, token text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.quote_views v
    WHERE v.quote_id = q_id
      AND v.public_token = token
      AND v.is_active = true
      AND v.expires_at > now()
  );
END;
$$;

-- Fix recursive policies by using the helper functions instead of cross-table EXISTS
DROP POLICY IF EXISTS "Users can view their own quote views" ON public.quote_views;
CREATE POLICY "Users can view their own quote views"
ON public.quote_views
FOR SELECT
USING (public.is_owner_of_quote(quote_id));

DROP POLICY IF EXISTS "Public can view quotes via valid token" ON public.quotes;
CREATE POLICY "Public can view quotes via valid token"
ON public.quotes
FOR SELECT
USING (
  public_token IS NOT NULL
  AND public.can_access_quote_via_token(id, public_token)
);
