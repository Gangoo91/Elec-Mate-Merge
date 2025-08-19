-- Set up automated daily news scraping with pg_cron
-- First enable the pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the daily news update function to run every day at 6 AM UTC
SELECT cron.schedule(
  'daily-industry-news-update',
  '0 6 * * *', -- Every day at 6 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/daily-news-update',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);