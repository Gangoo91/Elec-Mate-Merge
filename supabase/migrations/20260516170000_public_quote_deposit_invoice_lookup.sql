-- ============================================================================
-- Public quote — deposit invoice lookup for the public acceptance page
-- ============================================================================
-- When a client refreshes the public quote page after accepting (but
-- before they've paid the deposit), the React page needs to re-render the
-- "Pay deposit" step. company_profiles is exposed via
-- get_company_brand_by_quote_token; this RPC does the same for the
-- linked deposit invoice (number, total, Stripe pay link).
--
-- Returns only the fields the public page renders. Granted to anon.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_deposit_invoice_by_quote_token(token_param text)
RETURNS TABLE (
  invoice_id              uuid,
  invoice_number          text,
  total                   numeric,
  status                  text,
  due_date                timestamptz,
  paid_at                 timestamptz,
  stripe_payment_link_url text
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT
    i.id                       AS invoice_id,
    i.invoice_number,
    i.total,
    i.status,
    i.due_date,
    i.paid_at,
    i.stripe_payment_link_url
  FROM public.quotes q
  JOIN public.invoices i
    ON i.id = q.deposit_invoice_id
   AND i.deposit_for_quote = TRUE
  WHERE q.public_token = token_param
    AND q.public_token IS NOT NULL
    AND q.deposit_invoice_id IS NOT NULL
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_deposit_invoice_by_quote_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_deposit_invoice_by_quote_token(text) TO authenticated;
