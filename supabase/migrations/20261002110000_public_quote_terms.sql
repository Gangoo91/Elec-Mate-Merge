-- ELE-1149 — the client accepting a quote online agrees to "the terms set out
-- above", but the page never showed them: they were only on the PDF. The
-- electrician's terms live on company_profiles.quote_terms (Settings → Quote
-- settings); this hands the public page those terms for a valid link only,
-- exactly as get_company_brand_by_quote_token hands it the branding.
--
-- A separate function rather than another column on the brand function: that
-- one returns a TABLE, and changing its shape means DROP + CREATE, which
-- breaks every open public quote link for the moment in between.

CREATE OR REPLACE FUNCTION public.get_quote_terms_by_token(token_param text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT cp.quote_terms
  FROM public.quotes q
  JOIN public.company_profiles cp ON cp.user_id = q.user_id
  WHERE q.public_token = token_param
    AND q.public_token IS NOT NULL
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_quote_terms_by_token(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_quote_terms_by_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_quote_terms_by_token(text) TO authenticated;
