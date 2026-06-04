-- ELE-1027: Schedule the abandoned-checkout / trial re-engagement email
-- Runs every 30 minutes via pg_cron.
-- The function emails each eligible user ONCE (signed up 30min–48h ago, no subscription,
-- no free access, reengage_email_sent_at IS NULL).

SELECT cron.schedule(
  'auto-reengage-trial',               -- job name (unique)
  '*/30 * * * *',                      -- every 30 minutes
  $$
    SELECT net.http_post(
      url     := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/auto-reengage-trial',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
      ),
      body    := '{}'::jsonb
    );
  $$
);
