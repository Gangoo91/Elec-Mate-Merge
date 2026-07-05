
-- 1. Daily RevenueCat ↔ Supabase reconciliation (ELE-1269).
--    RC is the source of truth for native subscriptions; this catches missed
--    or out-of-order webhook events in both directions within 24h.
SELECT cron.schedule(
  'reconcile-revenuecat-daily',
  '30 5 * * *',
  $$
  SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/reconcile-revenuecat',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name='service_role_key' LIMIT 1)
    ),
    body := '{"scheduled": true}'::jsonb,
    timeout_milliseconds := 300000
  );
  $$
);

-- 2. Harden sync_expired_trials (hourly cron). Previously it flipped
--    subscribed=false the first hour after trial_end — racing the RevenueCat
--    RENEWAL event when Apple/Google convert a trial to paid, and it stamped
--    is_trial_cancelled=true on users who never cancelled. Give webhook
--    delivery a 2-hour grace window and stop writing the false flag; the
--    daily reconcile job catches anything that slips through.
CREATE OR REPLACE FUNCTION public.sync_expired_trials()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  UPDATE profiles
  SET subscribed = false, is_trial = false
  WHERE is_trial = true
  AND trial_end < NOW() - interval '2 hours'
  AND trial_end IS NOT NULL
  AND (subscription_source = 'app_store' OR subscription_source = 'play_store');
END;
$function$;
