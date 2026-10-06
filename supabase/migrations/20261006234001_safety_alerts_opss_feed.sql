-- Safety Alerts: a real source.
--
-- safety_alerts has held no rows since 20250824083635 and nothing wrote to it,
-- so the Site Safety "Safety Alerts" screen was always empty (the card was
-- taken off the hub on 6 Oct). It is now filled daily by sync-safety-alerts
-- from the government's Product Safety Alerts, Reports and Recalls (OPSS on
-- GOV.UK) for electrical kit, lighting, plugs/sockets, PPE, tools, machinery.
--
-- New columns keep where each row came from and the notice's own risk level
-- and type. risk_level NULL = the notice did not state one (never guessed).
-- Still no INSERT/UPDATE policy: rows arrive only through the service role.

alter table public.safety_alerts
  add column if not exists source text,
  add column if not exists source_id text,
  add column if not exists source_url text,
  add column if not exists risk_level text,
  add column if not exists alert_type text;

create unique index if not exists safety_alerts_source_id_key on public.safety_alerts (source_id);

comment on table public.safety_alerts is
  '[SHARED] Product safety alerts and recalls shown in Site Safety → Safety Alerts. Scope: everyone (read-only). Used by: Site Safety. Rule: written only by sync-safety-alerts (service role) from OPSS/GOV.UK; content is plain text; never reword or grade a notice.';

select cron.unschedule(jobid) from cron.job where jobname = 'sync-safety-alerts-daily';
select cron.schedule(
  'sync-safety-alerts-daily',
  '40 6 * * *',
  $$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/sync-safety-alerts',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)
    ),
    body := '{}'::jsonb,
    -- The first run of a day fetches each new notice's detail; pg_net's 5 s
    -- default would drop the response long before that finishes.
    timeout_milliseconds := 150000
  );
  $$
);
