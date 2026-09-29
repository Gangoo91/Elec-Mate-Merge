-- Hourly send for lead-personal-followup, 07:17–19:17 UTC only (08:17–20:17
-- in BST, 07:17–19:17 in GMT) so an email "from Andrew" never lands at 3am.
-- Authorization header is required: without it the gateway 401s and pg_cron
-- still records the run as succeeded.
select cron.schedule(
  'lead-personal-followup-hourly',
  '17 7-19 * * *',
  $$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/lead-personal-followup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)
    ),
    body := '{}'::jsonb
  );
  $$
);
