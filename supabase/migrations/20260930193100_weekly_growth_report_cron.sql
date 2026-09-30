-- Mondays 07:15 UTC — 15 minutes after ai-visibility-digest. Authorization
-- header required, or the gateway 401s and pg_cron still records success.
select cron.schedule(
  'weekly-growth-report-monday',
  '15 7 * * 1',
  $$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/weekly-growth-report',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)
    ),
    body := '{}'::jsonb
  );
  $$
);
