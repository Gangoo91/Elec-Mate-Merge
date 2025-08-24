-- Create table for caching live education data
CREATE TABLE public.live_education_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  search_query TEXT NOT NULL,
  education_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  analytics_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '24 hours')
);

-- Create table for education market statistics
CREATE TABLE public.education_market_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_type TEXT NOT NULL,
  value TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  source_url TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '1 hour')
);

-- Enable RLS
ALTER TABLE public.live_education_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_market_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Education cache is publicly readable"
ON public.live_education_cache FOR SELECT
USING (true);

CREATE POLICY "Education market stats are publicly readable"
ON public.education_market_stats FOR SELECT
USING (true);

-- Service role can manage the cache
CREATE POLICY "Service role can manage education cache"
ON public.live_education_cache FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage education market stats"
ON public.education_market_stats FOR ALL
USING (auth.role() = 'service_role');

-- Create function to cleanup expired education cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_education_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.live_education_cache 
  WHERE expires_at < now();
  
  DELETE FROM public.education_market_stats 
  WHERE expires_at < now();
END;
$$;

-- Create indexes for better performance
CREATE INDEX idx_live_education_cache_category ON public.live_education_cache(category);
CREATE INDEX idx_live_education_cache_expires_at ON public.live_education_cache(expires_at);
CREATE INDEX idx_education_market_stats_type ON public.education_market_stats(stat_type);
CREATE INDEX idx_education_market_stats_expires_at ON public.education_market_stats(expires_at);