-- ELE-2035 follow-up: the client chaser and the expiry notice must never act on
-- a deleted quote, or one already turned into an invoice. Neither happens in
-- live data today (0 rows on 10 Oct); this makes it impossible. Applied live 10 Oct.
CREATE OR REPLACE FUNCTION public.get_quotes_needing_followup(first_reminder_days integer DEFAULT 3, second_reminder_days integer DEFAULT 7, max_reminders integer DEFAULT 2)
 RETURNS TABLE(quote_id uuid, quote_number text, client_email text, client_name text, total numeric, first_sent_at timestamp with time zone, reminder_count integer, user_id uuid)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT q.id, q.quote_number, (q.client_data->>'email')::text, (q.client_data->>'name')::text,
         q.total, q.first_sent_at, q.reminder_count, q.user_id
  FROM public.quotes q
  WHERE q.status = 'sent' AND q.acceptance_status = 'pending'
    AND q.deleted_at IS NULL AND coalesce(q.invoice_raised, false) = false
    AND q.auto_followup_enabled = true AND q.first_sent_at IS NOT NULL
    AND q.reminder_count < max_reminders AND q.expiry_date > now()
    AND (q.client_data->>'email') IS NOT NULL AND (q.client_data->>'email') != ''
    AND ((q.reminder_count = 0 AND q.first_sent_at < now() - (first_reminder_days || ' days')::interval)
      OR (q.reminder_count = 1 AND q.first_sent_at < now() - (second_reminder_days || ' days')::interval))
    AND (q.last_reminder_sent_at IS NULL OR q.last_reminder_sent_at < now() - interval '1 day')
  ORDER BY q.first_sent_at ASC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_quotes_expiring_soon(days_until_expiry integer DEFAULT 3)
 RETURNS TABLE(quote_id uuid, quote_number text, client_name text, total numeric, expiry_date timestamp with time zone, user_id uuid)
 LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT q.id, q.quote_number, (q.client_data->>'name')::text, q.total, q.expiry_date, q.user_id
  FROM public.quotes q
  WHERE q.status = 'sent' AND q.acceptance_status = 'pending'
    AND q.deleted_at IS NULL AND coalesce(q.invoice_raised, false) = false
    AND q.expiry_notification_sent = false
    AND q.expiry_date > now() AND q.expiry_date < now() + (days_until_expiry || ' days')::interval
  ORDER BY q.expiry_date ASC;
END;
$function$;

-- Service role only (verified live 10 Oct: anon and authenticated cannot
-- execute). Written down so a re-create can never widen it.
REVOKE ALL ON FUNCTION public.get_quotes_needing_followup(integer, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_quotes_expiring_soon(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_quotes_needing_followup(integer, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_quotes_expiring_soon(integer) TO service_role;
