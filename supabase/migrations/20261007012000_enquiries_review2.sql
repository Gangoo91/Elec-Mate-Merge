-- ELE-2022 review 2.
-- Test enquiries (from "Send a test" on the set-up page) are flagged so they never
-- nag, count in stats or use up the form limit.
alter table public.enquiries add column if not exists is_test boolean not null default false;
comment on column public.enquiries.is_test is 'Sent from the set-up page "Send a test enquiry". Excluded from stats, reminders and rate limits.';

-- Morning summary was 06:30 UTC = inside send-push-notification quiet hours (21–07 UTC),
-- so it was always queued. 07:00 UTC = 08:00 BST / 07:00 GMT.
select cron.unschedule(jobid) from cron.job where jobname = 'enquiry-morning-summary';
select cron.schedule(
  'enquiry-morning-summary',
  '0 7 * * *',
  $$select net.http_post(
     url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/enquiry-reminders',
     headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)),
     body := '{"action":"morning"}'::jsonb,
     timeout_milliseconds := 60000)$$
);
