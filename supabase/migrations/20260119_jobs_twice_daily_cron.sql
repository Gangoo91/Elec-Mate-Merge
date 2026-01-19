-- Jobs Twice Daily Cron Schedule v3 - EXPANDED UK COVERAGE
-- Updates 2000+ jobs at 6am and 6pm UK time (5am/5pm UTC)
-- Now includes Cumbria, Northern Ireland, Islands, and more

-- Remove existing job scraping cron jobs
SELECT cron.unschedule(jobname)
FROM cron.job
WHERE jobname LIKE 'jobs-%' OR jobname LIKE 'job-%';

-- ============================================
-- MORNING SCRAPE (5am-6am UTC = 6am-7am UK)
-- ============================================

-- Batches 1-4: London, Southeast, Midlands, Northwest
SELECT cron.schedule(
  'jobs-morning-batch-1-4',
  '0 5 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 1, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 2, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 3, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 4, "forceRefresh": true}'::jsonb
  )$$
);

-- Batches 5-8: Yorkshire, Scotland, Wales/SW, East/NE
SELECT cron.schedule(
  'jobs-morning-batch-5-8',
  '10 5 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 5, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 6, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 7, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 8, "forceRefresh": true}'::jsonb
  )$$
);

-- Batches 9-12: Cumbria, NI/Islands, Specialist, Apprenticeships
SELECT cron.schedule(
  'jobs-morning-batch-9-12',
  '20 5 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 9, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 10, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 11, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 12, "forceRefresh": true}'::jsonb
  )$$
);

-- Morning merge at 6am UTC
SELECT cron.schedule(
  'jobs-morning-merge',
  '0 6 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"mergeAll": true}'::jsonb
  )$$
);

-- ============================================
-- EVENING SCRAPE (5pm-6pm UTC = 6pm-7pm UK)
-- ============================================

-- Batches 1-4
SELECT cron.schedule(
  'jobs-evening-batch-1-4',
  '0 17 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 1, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 2, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 3, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 4, "forceRefresh": true}'::jsonb
  )$$
);

-- Batches 5-8
SELECT cron.schedule(
  'jobs-evening-batch-5-8',
  '10 17 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 5, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 6, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 7, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 8, "forceRefresh": true}'::jsonb
  )$$
);

-- Batches 9-12
SELECT cron.schedule(
  'jobs-evening-batch-9-12',
  '20 17 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 9, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 10, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 11, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"batch": 12, "forceRefresh": true}'::jsonb
  )$$
);

-- Evening merge at 6pm UTC
SELECT cron.schedule(
  'jobs-evening-merge',
  '0 18 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-job-scraper',
    body := '{"mergeAll": true}'::jsonb
  )$$
);
