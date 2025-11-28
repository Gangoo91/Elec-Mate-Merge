-- Add detail_level column to installation_method_jobs table
ALTER TABLE public.installation_method_jobs 
ADD COLUMN detail_level TEXT DEFAULT 'normal' CHECK (detail_level IN ('normal', 'detailed'));