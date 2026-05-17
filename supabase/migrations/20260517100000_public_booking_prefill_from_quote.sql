-- ============================================================================
-- Public booking pre-fill from quote
-- ============================================================================
-- When a client lands on /book/:electricianId?quote=:quoteId after
-- accepting a quote, PublicBooking.tsx needs to pre-fill the form so the
-- client doesn't have to re-type name / phone / email / job description
-- they already provided on the quote-accept page.
--
-- This RPC exposes only the safe pre-fill fields (no pricing, items,
-- VAT, etc.) and only for quotes that are actually in an accepted state.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_public_quote_for_booking(quote_id_param uuid)
RETURNS TABLE (
  user_id           uuid,
  quote_number      text,
  client_name       text,
  client_phone      text,
  client_email      text,
  job_title         text,
  job_location      text,
  booked_slot_start timestamptz
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT
    q.user_id,
    q.quote_number,
    COALESCE(q.accepted_by_name, q.client_data->>'name')   AS client_name,
    q.client_data->>'phone'                                AS client_phone,
    COALESCE(q.accepted_by_email, q.client_data->>'email') AS client_email,
    q.job_details->>'title'                                AS job_title,
    q.job_details->>'location'                             AS job_location,
    q.booked_slot_start
  FROM public.quotes q
  WHERE q.id = quote_id_param
    AND q.acceptance_status IN ('accepted', 'accepted_pending_deposit')
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_quote_for_booking(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_quote_for_booking(uuid) TO authenticated;
