-- Enable pg_cron and pg_net extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create cron job to refresh tool guides every Sunday at 2 AM UTC
SELECT cron.schedule(
  'weekly-tool-guide-refresh',
  '0 2 * * 0', -- Every Sunday at 2 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/weekly-cache-refresh',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjIxNzY5NSwiZXhwIjoyMDYxNzkzNjk1fQ.j7TLgAfqkrOXzCPwHiT6x9fDNzMMLTWfN-XlKkO5CWo"}'::jsonb,
        body:='{"automated": true, "timestamp": "' || now() || '"}'::jsonb
    ) as request_id;
  $$
);