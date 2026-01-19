-- Education Scraper Daily Automation
-- Runs comprehensive-education-scraper daily at 3am UK time (2am UTC)
-- 9 jobs: 8 batches + 1 merge

-- Batch 1-2 at 2:00 UTC
SELECT cron.schedule(
  'education-batch-1',
  '0 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 1, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-1');

SELECT cron.schedule(
  'education-batch-2',
  '2 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 2, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-2');

-- Batch 3-4 at 2:05 UTC
SELECT cron.schedule(
  'education-batch-3',
  '5 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 3, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-3');

SELECT cron.schedule(
  'education-batch-4',
  '7 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 4, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-4');

-- Batch 5-6 at 2:10 UTC
SELECT cron.schedule(
  'education-batch-5',
  '10 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 5, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-5');

SELECT cron.schedule(
  'education-batch-6',
  '12 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 6, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-6');

-- Batch 7-8 at 2:15 UTC
SELECT cron.schedule(
  'education-batch-7',
  '15 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 7, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-7');

SELECT cron.schedule(
  'education-batch-8',
  '17 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"batch": 8, "forceRefresh": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-batch-8');

-- Merge all at 2:30 UTC
SELECT cron.schedule(
  'education-merge-all',
  '30 2 * * *',
  E'SELECT net.http_post(url := \'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-education-scraper\', headers := \'{"Content-Type": "application/json"}\'::jsonb, body := \'{"mergeAll": true}\'::jsonb)'
) WHERE NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'education-merge-all');
