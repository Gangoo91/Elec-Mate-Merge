-- Daily sweep of safety-documents: PDFs no record points to (record deleted,
-- re-exported, or a download-only type) are removed after 24 h. The function
-- (cleanup-orphaned-storage, rewritten 7 Oct 2026) is service-role only and
-- never touches safety-photos or rams-pdfs.
select cron.unschedule(jobid) from cron.job where jobname = 'cleanup-safety-documents-daily';
select cron.schedule('cleanup-safety-documents-daily', '20 3 * * *', $$
  select net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/cleanup-orphaned-storage',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1)),
    body := '{}'::jsonb,
    timeout_milliseconds := 120000
  );
$$);
