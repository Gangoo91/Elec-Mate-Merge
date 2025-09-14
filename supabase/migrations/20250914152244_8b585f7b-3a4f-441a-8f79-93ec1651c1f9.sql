-- Enhance industry_news table with additional fields for better content management
ALTER TABLE public.industry_news 
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS quality_score INTEGER DEFAULT 50;

-- Create index on quality score for better performance
CREATE INDEX IF NOT EXISTS idx_industry_news_quality_score ON public.industry_news(quality_score);

-- Create index on source_name for filtering
CREATE INDEX IF NOT EXISTS idx_industry_news_source_name ON public.industry_news(source_name);

-- Create index on regulatory_body for filtering
CREATE INDEX IF NOT EXISTS idx_industry_news_regulatory_body ON public.industry_news(regulatory_body);

-- Update RLS policies to allow authenticated users to insert articles (for manual content creation)
CREATE POLICY "Authenticated users can create news articles" 
ON public.industry_news 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update articles they created (based on a future user_id column if needed)
-- For now, we'll allow service role and authenticated users to manage content
CREATE POLICY "Authenticated users can update news articles" 
ON public.industry_news 
FOR UPDATE 
TO authenticated
USING (true);

-- Update the function to handle the new fields
CREATE OR REPLACE FUNCTION public.update_industry_news_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_industry_news_updated_at ON public.industry_news;
CREATE TRIGGER update_industry_news_updated_at
BEFORE UPDATE ON public.industry_news
FOR EACH ROW
EXECUTE FUNCTION public.update_industry_news_timestamp();