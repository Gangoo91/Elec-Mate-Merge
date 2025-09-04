-- Add new columns to live_education_cache for Sunday-based caching
ALTER TABLE public.live_education_cache 
ADD COLUMN IF NOT EXISTS next_refresh_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_refreshed TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS cache_version INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS refresh_status TEXT DEFAULT 'completed';

-- Add check constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'live_education_cache_refresh_status_check'
    ) THEN
        ALTER TABLE public.live_education_cache 
        ADD CONSTRAINT live_education_cache_refresh_status_check 
        CHECK (refresh_status IN ('completed', 'in_progress', 'failed', 'scheduled'));
    END IF;
END $$;

-- Create or replace function to calculate next Sunday refresh date
CREATE OR REPLACE FUNCTION public.get_next_sunday_education_refresh()
RETURNS TIMESTAMP WITH TIME ZONE
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Calculate next Sunday at 2 AM UTC
  RETURN date_trunc('week', CURRENT_DATE + interval '1 week') + interval '2 hours';
END;
$$;

-- Update existing records to use Sunday-based expiration
UPDATE public.live_education_cache 
SET next_refresh_date = COALESCE(next_refresh_date, public.get_next_sunday_education_refresh()),
    expires_at = COALESCE(next_refresh_date, public.get_next_sunday_education_refresh()),
    last_refreshed = COALESCE(last_refreshed, created_at),
    cache_version = COALESCE(cache_version, 1),
    refresh_status = COALESCE(refresh_status, 'completed');

-- Create indexes for better performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_education_cache_next_refresh ON public.live_education_cache(next_refresh_date);
CREATE INDEX IF NOT EXISTS idx_education_cache_category_status ON public.live_education_cache(category, refresh_status);

-- Set up cron job for weekly cache refresh every Sunday at 2 AM UTC
SELECT cron.schedule(
  'weekly-education-cache-refresh',
  '0 2 * * 0', -- Every Sunday at 2 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/weekly-education-cache-refresh',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);