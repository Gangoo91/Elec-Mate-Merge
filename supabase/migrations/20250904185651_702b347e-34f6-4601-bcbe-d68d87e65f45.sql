-- Enhance live_education_cache table for weekly Sunday-based caching
ALTER TABLE public.live_education_cache 
ADD COLUMN next_refresh_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN last_refreshed TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN cache_version INTEGER DEFAULT 1,
ADD COLUMN refresh_status TEXT DEFAULT 'completed' CHECK (refresh_status IN ('completed', 'in_progress', 'failed', 'scheduled'));

-- Create function to calculate next Sunday refresh date
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

-- Create enhanced education market stats cache table
CREATE TABLE public.education_market_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  stats_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on education_market_stats
ALTER TABLE public.education_market_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for education_market_stats
CREATE POLICY "Education market stats are publicly readable"
ON public.education_market_stats
FOR SELECT
USING (true);

CREATE POLICY "Service role can manage education market stats"
ON public.education_market_stats
FOR ALL
USING (auth.role() = 'service_role');

-- Update existing records to use Sunday-based expiration
UPDATE public.live_education_cache 
SET next_refresh_date = public.get_next_sunday_education_refresh(),
    expires_at = public.get_next_sunday_education_refresh(),
    last_refreshed = created_at;

-- Create indexes for better performance
CREATE INDEX idx_education_cache_next_refresh ON public.live_education_cache(next_refresh_date);
CREATE INDEX idx_education_cache_category_status ON public.live_education_cache(category, refresh_status);
CREATE INDEX idx_education_market_stats_category ON public.education_market_stats(category);

-- Create function to clean up expired education cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_education_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  DELETE FROM public.live_education_cache 
  WHERE expires_at < now() - interval '1 day';
  
  DELETE FROM public.education_market_stats 
  WHERE expires_at < now();
END;
$$;