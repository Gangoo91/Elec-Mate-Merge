-- Daily news scraper cron job
-- Runs at 6am UK time (5am UTC in winter, but using 6am UTC to be safe year-round)

create or replace function public.setup_news_scraper_cron()
returns json
language plpgsql
security definer
as $$
begin
  -- Check if pg_cron extension is available
  if exists (
    select 1 from pg_extension where extname = 'pg_cron'
  ) then
    -- Remove existing job if it exists
    perform cron.unschedule('fetch-industry-news-daily');

    -- Create scheduled job to run daily at 6am UTC
    perform cron.schedule(
      'fetch-industry-news-daily',  -- unique job name
      '0 6 * * *',                  -- 6am UTC daily
      $$
      select
        net.http_post(
          url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firecrawl-news-scraper',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
          body:='{"action": "refresh"}'::jsonb
        );
      $$
    );

    return json_build_object(
      'success', true,
      'message', 'News scraper cron job created successfully',
      'schedule', 'Daily at 6am UTC'
    );
  else
    return json_build_object(
      'success', false,
      'message', 'pg_cron extension is not available',
      'note', 'Please enable the pg_cron extension in your Supabase project'
    );
  end if;
exception
  when others then
    return json_build_object(
      'success', false,
      'message', SQLERRM
    );
end;
$$;

-- Execute the setup function
select public.setup_news_scraper_cron();
