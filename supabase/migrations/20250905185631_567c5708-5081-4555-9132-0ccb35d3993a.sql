-- Fix the price_range column default and ensure proper text storage
ALTER TABLE public.materials_weekly_cache 
ALTER COLUMN price_range SET DEFAULT '£0 - £0';

-- Fix the price_range column to remove JSONB default that conflicts with TEXT type
UPDATE public.materials_weekly_cache 
SET price_range = '£0 - £0' 
WHERE price_range = '{"max": 0, "min": 0}';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_materials_weekly_cache_category ON public.materials_weekly_cache(category);
CREATE INDEX IF NOT EXISTS idx_materials_weekly_cache_expires_at ON public.materials_weekly_cache(expires_at);

-- Add constraint to ensure non-empty cache_data
ALTER TABLE public.materials_weekly_cache 
ADD CONSTRAINT check_cache_data_not_empty 
CHECK (jsonb_array_length(cache_data) > 0 OR cache_data = '[]'::jsonb);