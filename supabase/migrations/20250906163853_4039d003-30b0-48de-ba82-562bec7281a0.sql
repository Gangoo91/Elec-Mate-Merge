-- Update market_insights_cache table for weekly caching
ALTER TABLE public.market_insights_cache 
ALTER COLUMN expires_at SET DEFAULT (now() + interval '7 days');

-- Create function to get next Sunday refresh time
CREATE OR REPLACE FUNCTION public.get_next_sunday_market_refresh()
RETURNS timestamp with time zone
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Calculate next Sunday at 2 AM UTC
  RETURN date_trunc('week', CURRENT_DATE + interval '1 week') + interval '2 hours';
END;
$function$

-- Create function to cleanup expired market insights cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_market_insights_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.market_insights_cache 
  WHERE expires_at < now();
END;
$function$

-- Add cache statistics tracking
CREATE TABLE IF NOT EXISTS public.market_insights_cache_stats (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_hits integer DEFAULT 0,
  cache_misses integer DEFAULT 0,
  last_refresh timestamp with time zone DEFAULT now(),
  total_entries integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on cache stats
ALTER TABLE public.market_insights_cache_stats ENABLE ROW LEVEL SECURITY;

-- Create policy for cache stats (public read)
CREATE POLICY "Cache stats are publicly readable" 
ON public.market_insights_cache_stats 
FOR SELECT 
USING (true);

-- Create policy for service role to manage cache stats
CREATE POLICY "Service role can manage cache stats" 
ON public.market_insights_cache_stats 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create trigger to update cache stats timestamp
CREATE TRIGGER update_market_cache_stats_updated_at
  BEFORE UPDATE ON public.market_insights_cache_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

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