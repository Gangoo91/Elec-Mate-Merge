-- Migration: Set up cron job for failed payment dunning email checks
-- Schedules the check-failed-payments edge function to run daily at 10am UTC

-- ============================================================================
-- STEP 1: Create function to set up the failed payments cron job
-- ============================================================================

create or replace function public.setup_failed_payments_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    -- Remove existing job if it exists (allows safe re-runs)
    perform cron.unschedule('daily-check-failed-payments')
    where exists (
      select 1 from cron.job where jobname = 'daily-check-failed-payments'
    );

    -- Schedule daily at 10am UTC (after invoice reminders at 9am)
    -- Sends dunning emails: 3-day reminder (Email 2), 7-day final notice (Email 3)
    perform cron.schedule(
      'daily-check-failed-payments',
      '0 10 * * *',
      $$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/check-failed-payments',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.wjunty1Gp2TtHKp1V1aHr6v8bSxZ5L1ZVwWTxYuvUKQ"}'::jsonb,
          body:='{}'::jsonb
        );
      $$
    );

    return json_build_object(
      'success', true,
      'message', 'Failed payments cron job scheduled successfully',
      'schedule', 'Daily at 10am UTC',
      'job_name', 'daily-check-failed-payments'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available'
    );
  end if;
end;
$$;

-- ============================================================================
-- STEP 2: Create function to disable the cron job
-- ============================================================================

create or replace function public.disable_failed_payments_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    perform cron.unschedule('daily-check-failed-payments');

    return json_build_object(
      'success', true,
      'message', 'Failed payments cron job disabled successfully'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available'
    );
  end if;
end;
$$;

-- ============================================================================
-- STEP 3: Grant execute permissions
-- ============================================================================

grant execute on function public.setup_failed_payments_cron to service_role;
grant execute on function public.disable_failed_payments_cron to service_role;

-- ============================================================================
-- STEP 4: Auto-run setup on migration apply
-- ============================================================================

select public.setup_failed_payments_cron();

comment on function public.setup_failed_payments_cron is
'Sets up a daily cron job (10am UTC) to run the check-failed-payments edge function.
Sends dunning emails for failed subscription payments: Email 2 at 3 days, Email 3 at 7 days.
Runs after invoice reminders (9am) to avoid overlapping email sends.';
