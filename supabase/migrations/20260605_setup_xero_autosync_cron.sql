-- Migration: schedule the Xero invoice auto-sync (ELE-1041)
-- Runs accounting-pull-all-invoices every 3 hours so deposits / partial
-- payments recorded in Xero are reflected in Elec-Mate without the user
-- having to manually tap "Sync from Xero".

create or replace function public.setup_xero_autosync_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule('xero-invoice-autosync')
    where exists (select 1 from cron.job where jobname = 'xero-invoice-autosync');

    -- Every 3 hours.
    perform cron.schedule(
      'xero-invoice-autosync',
      '0 */3 * * *',
      $$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/accounting-pull-all-invoices',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.wjunty1Gp2TtHKp1V1aHr6v8bSxZ5L1ZVwWTxYuvUKQ"}'::jsonb,
          body:='{}'::jsonb
        );
      $$
    );

    return json_build_object(
      'success', true,
      'message', 'Xero auto-sync cron scheduled',
      'schedule', 'Every 3 hours',
      'job_name', 'xero-invoice-autosync'
    );
  else
    return json_build_object('success', false, 'message', 'pg_cron extension is not available');
  end if;
end;
$$;

create or replace function public.disable_xero_autosync_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule('xero-invoice-autosync');
    return json_build_object('success', true, 'message', 'Xero auto-sync cron disabled');
  else
    return json_build_object('success', false, 'message', 'pg_cron extension is not available');
  end if;
end;
$$;

grant execute on function public.setup_xero_autosync_cron to service_role;
grant execute on function public.disable_xero_autosync_cron to service_role;

select public.setup_xero_autosync_cron();

comment on function public.setup_xero_autosync_cron is
'Schedules accounting-pull-all-invoices every 3 hours to pull Xero deposit/partial/full payment status into Elec-Mate (ELE-1041).';
