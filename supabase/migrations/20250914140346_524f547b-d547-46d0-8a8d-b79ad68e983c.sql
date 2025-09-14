-- Add content_hash column for deduplication if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'industry_news' AND column_name = 'content_hash') THEN
        ALTER TABLE public.industry_news ADD COLUMN content_hash TEXT;
        CREATE INDEX IF NOT EXISTS idx_industry_news_content_hash ON public.industry_news(content_hash);
    END IF;
END $$;

-- Add updated_at trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_industry_news_updated_at') THEN
        CREATE TRIGGER update_industry_news_updated_at
        BEFORE UPDATE ON public.industry_news
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;