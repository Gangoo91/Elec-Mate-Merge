-- Add source column to materials_weekly_cache table
ALTER TABLE public.materials_weekly_cache 
ADD COLUMN source text NOT NULL DEFAULT 'Unknown Source';

-- Remove the default after adding the column
ALTER TABLE public.materials_weekly_cache 
ALTER COLUMN source DROP DEFAULT;