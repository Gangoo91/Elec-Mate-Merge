
-- Create a database function to set up the cron job
create or replace function public.setup_job_listings_cron()
returns json
language plpgsql
security definer
as $$
begin
  -- First, check if the pg_cron extension is available
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    -- Create a scheduled job to run daily at midnight
    perform cron.schedule(
      'fetch-job-listings-daily',  -- unique job name
      '0 0 * * *',               -- cron schedule (midnight every day)
      $$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/fetch-job-listings',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
          body:='{}'::jsonb
        );
      $$
    );
    
    return json_build_object(
      'success', true,
      'message', 'Scheduled job created successfully',
      'schedule', 'Daily at midnight'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available',
      'note', 'Please enable the pg_cron extension in your Supabase project to use scheduling features'
    );
  end if;
end;
$$;
