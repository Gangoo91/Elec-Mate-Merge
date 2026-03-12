-- Schedule proactive morning briefings to fire at 7:30am UK time, Monday-Friday.
-- The edge function proactive-morning-brief is already deployed.
-- This just adds the pg_cron trigger that was missing.

SELECT cron.schedule(
  'proactive-morning-brief',
  '30 7 * * 1-5',
  $$
  SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/proactive-morning-brief',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
