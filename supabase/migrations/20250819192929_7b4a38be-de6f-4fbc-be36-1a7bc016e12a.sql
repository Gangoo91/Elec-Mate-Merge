-- First, let's update the industry_news table to better support article-level data  
ALTER TABLE public.industry_news 
ADD COLUMN IF NOT EXISTS source_name TEXT DEFAULT 'Unknown Source',
ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS relevance_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS content_quality INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS published_date DATE;

-- Update the existing date_published to be more specific about article publication vs scraping
COMMENT ON COLUMN public.industry_news.date_published IS 'When the article was originally published by the source';
COMMENT ON COLUMN public.industry_news.created_at IS 'When the article was scraped and added to our database';

-- Add index for better performance on category filtering
CREATE INDEX IF NOT EXISTS idx_industry_news_category_published ON public.industry_news(category, date_published DESC);
CREATE INDEX IF NOT EXISTS idx_industry_news_relevance ON public.industry_news(relevance_score DESC) WHERE is_active = true;

-- Clean up data where external_url and source_url are the same by setting external_url to NULL
-- This will help us distinguish between article-level links and source pages
UPDATE public.industry_news 
SET external_url = NULL 
WHERE external_url = source_url;

-- Now we can add the constraint since duplicate URLs are cleaned up
ALTER TABLE public.industry_news 
ADD CONSTRAINT check_different_urls 
CHECK (external_url IS NULL OR external_url != source_url);