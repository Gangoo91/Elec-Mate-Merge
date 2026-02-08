-- Add scheme logo data URL column for PDF embedding
ALTER TABLE public.company_profiles
ADD COLUMN IF NOT EXISTS scheme_logo_data_url TEXT;

ALTER TABLE public.inspector_profiles
ADD COLUMN IF NOT EXISTS scheme_logo_data_url TEXT;
