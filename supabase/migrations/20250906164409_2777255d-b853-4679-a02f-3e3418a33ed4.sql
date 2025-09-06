-- Set up weekly cron job for market insights refresh
SELECT cron.schedule(
  'weekly-market-insights-refresh',
  '0 2 * * 0', -- Every Sunday at 2 AM UTC
  $$
  SELECT
    net.http_post(
      url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/market-insights-scheduler',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
      body:='{"isScheduled": true, "keywords": "electrician", "location": "UK"}'::jsonb
    ) as request_id;
  $$
);