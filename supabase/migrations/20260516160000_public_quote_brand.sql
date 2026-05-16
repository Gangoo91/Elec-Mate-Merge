-- ============================================================================
-- Public quote — expose electrician brand to anonymous viewers
-- ============================================================================
-- The PublicQuoteView page (rendered when a client opens the
-- /public-quote/<token> link from a quote email) needs to look like it
-- comes from the electrician, not from Elec-Mate. To do that it has to
-- read company branding (name, logo, primary colour, contact, VAT, co
-- reg) for the user who owns the quote.
--
-- company_profiles has RLS that requires being the owner, so we expose
-- a narrow SECURITY DEFINER RPC that:
--   1. takes the quote's public_token (authorises the request)
--   2. joins to company_profiles via quotes.user_id
--   3. returns ONLY the safe public-facing brand fields
--
-- Granted to anon (the public quote page is anonymous).
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_company_brand_by_quote_token(token_param text)
RETURNS TABLE (
  company_name        text,
  logo_url            text,
  logo_data_url       text,
  primary_color       text,
  company_email       text,
  company_phone       text,
  company_website     text,
  company_address     text,
  vat_number          text,
  company_registration text
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
    cp.company_registration
  FROM public.quotes q
  JOIN public.company_profiles cp ON cp.user_id = q.user_id
  WHERE q.public_token = token_param
    AND q.public_token IS NOT NULL
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_company_brand_by_quote_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_company_brand_by_quote_token(text) TO authenticated;
