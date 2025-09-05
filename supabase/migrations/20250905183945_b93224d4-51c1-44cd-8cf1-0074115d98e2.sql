-- Fix price_range column type to allow proper cache storage
ALTER TABLE public.materials_weekly_cache 
ALTER COLUMN price_range TYPE text;