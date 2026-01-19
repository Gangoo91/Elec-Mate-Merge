-- Training Courses Daily Cron Schedule
-- Refreshes all training courses at 5am UK time (4am UTC)
-- Runs BEFORE the job scraper to ensure courses are fresh

-- Remove any existing training cron jobs
SELECT cron.unschedule(jobname)
FROM cron.job
WHERE jobname LIKE 'training-%';

-- ============================================
-- DAILY TRAINING COURSE REFRESH (4am-5am UTC = 5am-6am UK)
-- ============================================

-- Batches 1-4: Premier National, Accreditation Bodies, London/SE, Midlands
SELECT cron.schedule(
  'training-daily-batch-1-4',
  '0 4 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 1, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 2, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 3, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 4, "forceRefresh": true}'::jsonb
  )$$
);

-- Batches 5-8: Northwest, Yorkshire/NE, Scotland/Wales, Southwest/East
SELECT cron.schedule(
  'training-daily-batch-5-8',
  '10 4 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 5, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 6, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 7, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 8, "forceRefresh": true}'::jsonb
  )$$
);

-- Batches 9-12: 18th Edition, EV/Renewables, Fire/Safety, Industrial
SELECT cron.schedule(
  'training-daily-batch-9-12',
  '20 4 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 9, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 10, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 11, "forceRefresh": true}'::jsonb
  ), net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"batch": 12, "forceRefresh": true}'::jsonb
  )$$
);

-- Merge all courses at 5am UTC (after all batches complete)
SELECT cron.schedule(
  'training-daily-merge',
  '0 5 * * *',
  $$SELECT net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/comprehensive-training-scraper',
    body := '{"mergeAll": true}'::jsonb
  )$$
);
