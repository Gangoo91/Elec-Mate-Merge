-- ============================================================================
-- Public quote — bank details + Stripe Connect status in brand RPC
-- ============================================================================
-- PublicQuoteView needs to render a bank-transfer deposit fallback when
-- the electrician hasn't set up Stripe Connect yet. Adding bank_details
-- (JSONB) and stripe_account_status lets the page decide which payment
-- path to surface without an extra round-trip. Also includes the
-- profile's deposit_percentage so the page knows the percent breakdown
-- when no inline deposit invoice exists.
-- ============================================================================

DROP FUNCTION IF EXISTS public.get_company_brand_by_quote_token(text);

CREATE OR REPLACE FUNCTION public.get_company_brand_by_quote_token(token_param text)
RETURNS TABLE (
  company_name          text,
  logo_url              text,
  logo_data_url         text,
  primary_color         text,
  company_email         text,
  company_phone         text,
  company_website       text,
  company_address       text,
  vat_number            text,
  company_registration  text,
  sparky_full_name      text,
  sparky_avatar_url     text,
  bank_details          jsonb,
  stripe_account_status text,
  deposit_percentage    numeric
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
    p.avatar_url       AS sparky_avatar_url,
    cp.bank_details,
    cp.stripe_account_status,
    cp.deposit_percentage
  FROM public.quotes q
  JOIN public.company_profiles cp ON cp.user_id = q.user_id
  LEFT JOIN public.profiles p ON p.id = q.user_id
  WHERE q.public_token = token_param
    AND q.public_token IS NOT NULL
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_company_brand_by_quote_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_company_brand_by_quote_token(text) TO authenticated;
