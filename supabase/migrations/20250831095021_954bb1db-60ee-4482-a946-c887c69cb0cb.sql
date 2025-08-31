-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule weekly guide cache refresh every Sunday at 2 AM
SELECT cron.schedule(
  'weekly-guide-cache-refresh',
  '0 2 * * 0', -- Every Sunday at 2 AM
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/refresh-guide-cache',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.WwGCcEHQdYxMm4-wn_F-VgfIixEGYbBR0m2J5Mj-Luo"}'::jsonb,
        body:='{"source": "cron"}'::jsonb
    ) as request_id;
  $$
);