-- Create materials weekly cache table
CREATE TABLE public.materials_weekly_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  category TEXT NOT NULL,
  total_products INTEGER DEFAULT 0,
  price_range JSONB DEFAULT '{"min": 0, "max": 0}'::jsonb,
  top_brands TEXT[] DEFAULT '{}',
  popular_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  update_status TEXT DEFAULT 'completed',
  error_message TEXT,
  UNIQUE(category)
);

-- Enable RLS
ALTER TABLE public.materials_weekly_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Materials cache is publicly readable" 
ON public.materials_weekly_cache 
FOR SELECT 
USING (true);

-- Create policy for service role management
CREATE POLICY "Service role can manage materials cache" 
ON public.materials_weekly_cache 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create function to cleanup expired cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_materials_weekly_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.materials_weekly_cache 
  WHERE expires_at < now();
END;
$$;

-- Create trigger to update last_updated timestamp
CREATE OR REPLACE FUNCTION public.update_materials_cache_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_materials_weekly_cache_timestamp
  BEFORE UPDATE ON public.materials_weekly_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.update_materials_cache_timestamp();

-- Create index for better performance
CREATE INDEX idx_materials_weekly_cache_category ON public.materials_weekly_cache(category);
CREATE INDEX idx_materials_weekly_cache_expires_at ON public.materials_weekly_cache(expires_at);