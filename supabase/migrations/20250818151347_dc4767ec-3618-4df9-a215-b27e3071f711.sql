-- Add missing columns to industry_news table for proper RSS/Firecrawl integration
ALTER TABLE public.industry_news 
ADD COLUMN IF NOT EXISTS external_id TEXT,
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS external_url TEXT;

-- Add index on external_id and source for better performance and deduplication
CREATE INDEX IF NOT EXISTS idx_industry_news_external_id ON public.industry_news(external_id);
CREATE INDEX IF NOT EXISTS idx_industry_news_source ON public.industry_news(source);

-- Add unique constraint on external_id and source combination to prevent duplicates
ALTER TABLE public.industry_news 
ADD CONSTRAINT unique_external_id_source UNIQUE (external_id, source);