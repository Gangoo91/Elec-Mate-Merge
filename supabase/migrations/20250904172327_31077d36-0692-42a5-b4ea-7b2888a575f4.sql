-- Enable the pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Weekly cache update (every Sunday at 2 AM UTC)
SELECT cron.schedule(
  'materials-weekly-cache-update',
  '0 2 * * 0',
  $$
  SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.functions.supabase.co/materials-cache-updater',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
    body := '{"scheduled": true}'::jsonb
  );
  $$
);

-- Daily cache cleanup (every day at 3 AM UTC)
SELECT cron.schedule(
  'materials-cache-cleanup',
  '0 3 * * *',
  $$
  DELETE FROM materials_weekly_cache WHERE expires_at < NOW();
  $$
);