-- Create dedicated tools cache table
CREATE TABLE public.tools_weekly_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  tools_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_products integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + '7 days'::interval),
  update_status text DEFAULT 'completed',
  last_updated timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tools_weekly_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for tools cache
CREATE POLICY "Tools cache is publicly readable" 
ON public.tools_weekly_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage tools cache" 
ON public.tools_weekly_cache 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create index for better performance
CREATE INDEX idx_tools_weekly_cache_category ON public.tools_weekly_cache(category);
CREATE INDEX idx_tools_weekly_cache_expires_at ON public.tools_weekly_cache(expires_at);

-- Migrate existing tool data from materials_weekly_cache to tools_weekly_cache
INSERT INTO public.tools_weekly_cache (category, tools_data, total_products, created_at, expires_at)
SELECT 
  'tools' as category,
  materials_data as tools_data,
  total_products,
  created_at,
  expires_at
FROM public.materials_weekly_cache
WHERE category IN ('Hand Tools', 'Power Tools', 'Tools') 
   OR materials_data::text ILIKE '%Hand Tools%' 
   OR materials_data::text ILIKE '%Power Tools%';

-- Remove tool data from materials cache (keep only actual electrical materials)
DELETE FROM public.materials_weekly_cache 
WHERE category IN ('Hand Tools', 'Power Tools', 'Tools')
   OR materials_data::text ILIKE '%Hand Tools%' 
   OR materials_data::text ILIKE '%Power Tools%';

-- Add cleanup function for tools cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_tools_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  DELETE FROM public.tools_weekly_cache 
  WHERE expires_at < now();
END;
$function$;