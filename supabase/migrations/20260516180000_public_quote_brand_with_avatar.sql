-- ============================================================================
-- Public quote — include sparky avatar in brand RPC
-- ============================================================================
-- Extend get_company_brand_by_quote_token to also expose the sparky's
-- avatar (profiles.avatar_url) so the public quote page can render
-- a small portrait next to the company name. It's a trust signal — the
-- client sees the human behind the quote, not just a logo / brand mark.
-- ============================================================================

DROP FUNCTION IF EXISTS public.get_company_brand_by_quote_token(text);

CREATE OR REPLACE FUNCTION public.get_company_brand_by_quote_token(token_param text)
RETURNS TABLE (
  company_name         text,
  logo_url             text,
  logo_data_url        text,
  primary_color        text,
  company_email        text,
  company_phone        text,
  company_website      text,
  company_address      text,
  vat_number           text,
  company_registration text,
  sparky_full_name     text,
  sparky_avatar_url    text
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT
    cp.company_name,
    cp.logo_url,
    cp.logo_data_url,
    cp.primary_color,
    cp.company_email,
    cp.company_phone,
    cp.company_website,
    cp.company_address,
    cp.vat_number,
    cp.company_registration,
    p.full_name        AS sparky_full_name,
    p.avatar_url       AS sparky_avatar_url
  FROM public.quotes q
  JOIN public.company_profiles cp ON cp.user_id = q.user_id
  LEFT JOIN public.profiles p ON p.id = q.user_id
  WHERE q.public_token = token_param
    AND q.public_token IS NOT NULL
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_company_brand_by_quote_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_company_brand_by_quote_token(text) TO authenticated;
