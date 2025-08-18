-- Add missing columns to industry_news table for Firecrawl integration
ALTER TABLE public.industry_news 
ADD COLUMN IF NOT EXISTS external_id text UNIQUE,
ADD COLUMN IF NOT EXISTS source_url text,
ADD COLUMN IF NOT EXISTS external_url text;

-- Create index for better performance on external_id lookups
CREATE INDEX IF NOT EXISTS idx_industry_news_external_id ON public.industry_news(external_id);