-- Nightly metric snapshot for the admin overview.
--
-- admin_metric_daily was only written when an admin opened the dashboard, so
-- a quiet weekend left a gap the history line silently forward-filled. Two
-- jobs at 22:50 UTC (23:50 in British Summer Time, 22:50 in winter — always
-- the same UK calendar day) call the stats functions with the service-role
-- key, which they recognise as the scheduler and skip the user check for.

select cron.unschedule(jobid) from cron.job where jobname in ('admin-metric-snapshot-stripe', 'admin-metric-snapshot-stores');

select cron.schedule(
  'admin-metric-snapshot-stripe',
  '50 22 * * *',
  $$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/admin-stripe-stats',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)
    ),
    body := '{"scheduled": true}'::jsonb,
    timeout_milliseconds := 120000
  );
  $$
);

select cron.schedule(
  'admin-metric-snapshot-stores',
  '52 22 * * *',
  $$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/admin-revenuecat-stats',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)
    ),
    body := '{"scheduled": true}'::jsonb,
    timeout_milliseconds := 120000
  );
  $$
);
