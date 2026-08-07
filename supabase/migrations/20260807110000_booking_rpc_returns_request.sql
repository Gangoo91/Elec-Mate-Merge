-- Tell the acceptance page what the client has already asked for.
--
-- `get_public_quote_for_booking` already returned `booked_slot_start` and the
-- page ignored it, so a client who had already booked came back to a blank
-- form with no sign of it. Adding the start-date request to the same row lets
-- the page say "you asked to start on the 19th" instead of inviting a second
-- submission.
--
-- The return type changes, so this is a drop-and-recreate: CREATE OR REPLACE
-- cannot alter a function's RETURNS TABLE signature.

drop function if exists public.get_public_quote_for_booking(uuid);

create function public.get_public_quote_for_booking(quote_id_param uuid)
returns table (
  user_id uuid,
  quote_number text,
  client_name text,
  client_phone text,
  client_email text,
  job_title text,
  job_location text,
  booked_slot_start timestamptz,
  booked_slot_end timestamptz,
  requested_start_date date,
  requested_time_preference text
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  SELECT
    q.user_id,
    q.quote_number,
    COALESCE(q.accepted_by_name, q.client_data->>'name')   AS client_name,
    q.client_data->>'phone'                                AS client_phone,
    COALESCE(q.accepted_by_email, q.client_data->>'email') AS client_email,
    q.job_details->>'title'                                AS job_title,
    q.job_details->>'location'                             AS job_location,
    q.booked_slot_start,
    q.booked_slot_end,
    q.requested_start_date,
    q.requested_time_preference
  FROM public.quotes q
  WHERE q.id = quote_id_param
    AND q.acceptance_status IN ('accepted', 'accepted_pending_deposit')
  LIMIT 1;
$function$;

-- Callable from the public booking page, which is unauthenticated. The
-- function is keyed on a quote UUID and returns only the accepted quote's own
-- contact details — the same exposure as before.
grant execute on function public.get_public_quote_for_booking(uuid) to anon, authenticated;
