-- Add the missing columns to materials_weekly_cache table for proper data storage
ALTER TABLE public.materials_weekly_cache 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS materials_data JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS total_products INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS update_status TEXT DEFAULT 'pending';