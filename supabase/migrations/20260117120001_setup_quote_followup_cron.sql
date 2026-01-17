-- Migration: Set up cron job for automated quote follow-ups
-- This schedules the quote-automated-followup edge function to run periodically

-- ============================================================================
-- STEP 1: Create function to set up the quote follow-up cron job
-- ============================================================================

create or replace function public.setup_quote_followup_cron()
returns json
language plpgsql
security definer
as $$
begin
  -- Check if pg_cron extension is available
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    -- Remove existing job if it exists (to allow for updates)
    perform cron.unschedule('quote-automated-followup')
    where exists (
      select 1 from cron.job where jobname = 'quote-automated-followup'
    );

    -- Create scheduled job to run every 4 hours
    -- This checks for:
    -- 1. Quotes needing follow-up reminders (sent > 3 days ago, no response)
    -- 2. Quotes expiring soon (within 3 days)
    perform cron.schedule(
      'quote-automated-followup',  -- unique job name
      '0 8,12,16,20 * * *',        -- cron schedule: 8am, 12pm, 4pm, 8pm daily
      $$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/quote-automated-followup',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.placeholder_service_role_token"}'::jsonb,
          body:='{}'::jsonb
        );
      $$
    );

    return json_build_object(
      'success', true,
      'message', 'Quote follow-up cron job scheduled successfully',
      'schedule', 'Four times daily at 8am, 12pm, 4pm, 8pm UTC',
      'job_name', 'quote-automated-followup'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available',
      'note', 'Please enable the pg_cron extension in your Supabase project dashboard to use scheduling features'
    );
  end if;
end;
$$;

-- ============================================================================
-- STEP 2: Create function to disable the quote follow-up cron job
-- ============================================================================

create or replace function public.disable_quote_followup_cron()
returns json
language plpgsql
security definer
as $$
begin
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    perform cron.unschedule('quote-automated-followup');

    return json_build_object(
      'success', true,
      'message', 'Quote follow-up cron job disabled successfully'
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

grant execute on function public.setup_quote_followup_cron to service_role;
grant execute on function public.disable_quote_followup_cron to service_role;

-- ============================================================================
-- STEP 4: Document the cron job setup
-- ============================================================================

comment on function public.setup_quote_followup_cron is
'Sets up a cron job to run the quote-automated-followup edge function.
The job runs four times daily (8am, 12pm, 4pm, 8pm UTC) and handles:
- Sending follow-up reminders for quotes that have been sent but not responded to
- Notifying electricians about quotes that are about to expire
Call this function manually after deployment to enable automated follow-ups.';

comment on function public.disable_quote_followup_cron is
'Disables the automated quote follow-up cron job.
Use this if you want to temporarily stop automated reminders.';
