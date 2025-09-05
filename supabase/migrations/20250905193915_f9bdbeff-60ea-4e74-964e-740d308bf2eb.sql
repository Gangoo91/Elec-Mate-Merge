-- Drop the existing materials_weekly_cache table and recreate with simplified structure
DROP TABLE IF EXISTS public.materials_weekly_cache;

-- Create new simplified materials_weekly_cache table
CREATE TABLE public.materials_weekly_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scraper_response JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_materials INTEGER NOT NULL DEFAULT 0,
  categories TEXT[] NOT NULL DEFAULT '{}',
  suppliers TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  cache_key TEXT NOT NULL DEFAULT 'comprehensive',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.materials_weekly_cache ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Materials cache is publicly readable" ON public.materials_weekly_cache
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage materials cache" ON public.materials_weekly_cache
  FOR ALL USING (auth.role() = 'service_role');

-- Create index for performance
CREATE INDEX idx_materials_cache_expires_at ON public.materials_weekly_cache(expires_at);
CREATE INDEX idx_materials_cache_key ON public.materials_weekly_cache(cache_key);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_materials_cache_timestamp
  BEFORE UPDATE ON public.materials_weekly_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.update_materials_cache_timestamp();