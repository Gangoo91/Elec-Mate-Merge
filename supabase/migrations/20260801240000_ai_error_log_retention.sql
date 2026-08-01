-- ELE-1155: 90-day retention for ai_error_log (pure SQL — no http, no auth
-- headers to silently 401 like the lifecycle email crons did).

do $$
begin
  perform cron.unschedule('ai-error-log-purge');
exception when others then
  null; -- job did not exist yet
end $$;

select cron.schedule(
  'ai-error-log-purge',
  '45 3 * * *',
  $$delete from public.ai_error_log where created_at < now() - interval '90 days'$$
);
