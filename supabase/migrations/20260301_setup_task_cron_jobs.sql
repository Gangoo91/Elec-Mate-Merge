-- Migration: Set up cron jobs for task notification edge functions
-- 1. daily-brief: Morning task summary at 8am UTC
-- 2. task-reminders: Hourly check for approaching due dates

-- ============================================================================
-- STEP 1: Setup function
-- ============================================================================

create or replace function public.setup_task_cron_jobs()
returns json
language plpgsql
security definer
as $func$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    -- Remove existing jobs if they exist (safe re-runs)
    perform cron.unschedule('daily-task-brief')
    where exists (
      select 1 from cron.job where jobname = 'daily-task-brief'
    );

    perform cron.unschedule('hourly-task-reminders')
    where exists (
      select 1 from cron.job where jobname = 'hourly-task-reminders'
    );

    -- Schedule daily brief at 8am UTC
    perform cron.schedule(
      'daily-task-brief',
      '0 8 * * *',
      $cron1$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/daily-brief',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.wjunty1Gp2TtHKp1V1aHr6v8bSxZ5L1ZVwWTxYuvUKQ"}'::jsonb,
          body:='{}'::jsonb
        );
      $cron1$
    );

    -- Schedule hourly task reminders
    perform cron.schedule(
      'hourly-task-reminders',
      '0 * * * *',
      $cron2$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/task-reminders',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.wjunty1Gp2TtHKp1V1aHr6v8bSxZ5L1ZVwWTxYuvUKQ"}'::jsonb,
          body:='{}'::jsonb
        );
      $cron2$
    );

    return json_build_object(
      'success', true,
      'message', 'Task cron jobs scheduled successfully',
      'jobs', json_build_array(
        json_build_object('name', 'daily-task-brief', 'schedule', '0 8 * * *'),
        json_build_object('name', 'hourly-task-reminders', 'schedule', '0 * * * *')
      )
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available'
    );
  end if;
end;
$func$;

-- ============================================================================
-- STEP 2: Disable function
-- ============================================================================

create or replace function public.disable_task_cron_jobs()
returns json
language plpgsql
security definer
as $func$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    perform cron.unschedule('daily-task-brief');
    perform cron.unschedule('hourly-task-reminders');

    return json_build_object(
      'success', true,
      'message', 'Task cron jobs disabled successfully'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available'
    );
  end if;
end;
$func$;

-- ============================================================================
-- STEP 3: Grant permissions
-- ============================================================================

grant execute on function public.setup_task_cron_jobs to service_role;
grant execute on function public.disable_task_cron_jobs to service_role;

-- ============================================================================
-- STEP 4: Auto-run on migration apply
-- ============================================================================

select public.setup_task_cron_jobs();
