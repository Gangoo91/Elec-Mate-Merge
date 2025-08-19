-- Enhance industry_news table with better indexing and constraints for the comprehensive news system

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_industry_news_category ON public.industry_news(category);
CREATE INDEX IF NOT EXISTS idx_industry_news_regulatory_body ON public.industry_news(regulatory_body);
CREATE INDEX IF NOT EXISTS idx_industry_news_date_published ON public.industry_news(date_published DESC);
CREATE INDEX IF NOT EXISTS idx_industry_news_active ON public.industry_news(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_industry_news_external_id ON public.industry_news(external_id) WHERE external_id IS NOT NULL;

-- Add unique constraint to prevent duplicate articles based on external_id
-- But only if external_id is not null
CREATE UNIQUE INDEX IF NOT EXISTS idx_industry_news_unique_external_id 
ON public.industry_news(external_id) 
WHERE external_id IS NOT NULL;