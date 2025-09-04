-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule weekly cache update (every Sunday at 2 AM UTC)
SELECT cron.schedule(
  'materials-weekly-cache-update',
  '0 2 * * 0',
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/materials-cache-updater',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
        body:=concat('{"triggered_by": "cron", "timestamp": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);

-- Add a schedule for cleanup of expired cache (daily at 1 AM UTC)
SELECT cron.schedule(
  'materials-cache-cleanup',
  '0 1 * * *',
  $$
  SELECT cleanup_expired_materials_weekly_cache();
  $$
);