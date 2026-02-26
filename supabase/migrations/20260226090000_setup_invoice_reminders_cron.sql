-- Migration: Set up cron job for automated invoice overdue reminders
-- Schedules the automated-invoice-reminders edge function to run daily at 9am UTC

-- ============================================================================
-- STEP 1: Create function to set up the invoice reminders cron job
-- ============================================================================

create or replace function public.setup_invoice_reminders_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    -- Remove existing job if it exists (allows safe re-runs)
    perform cron.unschedule('daily-invoice-reminders')
    where exists (
      select 1 from cron.job where jobname = 'daily-invoice-reminders'
    );

    -- Schedule daily at 9am UTC
    -- Sends escalating overdue reminders: gentle (1d), firm (7d), final (14d)
    perform cron.schedule(
      'daily-invoice-reminders',
      '0 9 * * *',
      $$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/automated-invoice-reminders',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.wjunty1Gp2TtHKp1V1aHr6v8bSxZ5L1ZVwWTxYuvUKQ"}'::jsonb,
          body:='{}'::jsonb
        );
      $$
    );

    return json_build_object(
      'success', true,
      'message', 'Invoice reminders cron job scheduled successfully',
      'schedule', 'Daily at 9am UTC',
      'job_name', 'daily-invoice-reminders'
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

create or replace function public.disable_invoice_reminders_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    perform cron.unschedule('daily-invoice-reminders');

    return json_build_object(
      'success', true,
      'message', 'Invoice reminders cron job disabled successfully'
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

grant execute on function public.setup_invoice_reminders_cron to service_role;
grant execute on function public.disable_invoice_reminders_cron to service_role;

-- ============================================================================
-- STEP 4: Auto-run setup on migration apply
-- ============================================================================

select public.setup_invoice_reminders_cron();

comment on function public.setup_invoice_reminders_cron is
'Sets up a daily cron job (9am UTC) to run the automated-invoice-reminders edge function.
Sends escalating reminders: gentle (1d overdue), firm (7d), final (14d).
Includes rate limiting and handles invoices marked overdue regardless of send status.';
