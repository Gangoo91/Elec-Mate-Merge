-- Create industry_news table for real news aggregation
CREATE TABLE public.industry_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  category TEXT NOT NULL,
  date_published DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  view_count INTEGER DEFAULT 0,
  average_rating NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  tags TEXT[] DEFAULT '{}',
  external_id TEXT UNIQUE -- for deduplication
);

-- Enable RLS
ALTER TABLE public.industry_news ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing active news
CREATE POLICY "Anyone can view active industry news" 
ON public.industry_news 
FOR SELECT 
USING (is_active = true);

-- Create index for performance
CREATE INDEX idx_industry_news_date_published ON public.industry_news(date_published DESC);
CREATE INDEX idx_industry_news_category ON public.industry_news(category);
CREATE INDEX idx_industry_news_source ON public.industry_news(source);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_industry_news_updated_at
BEFORE UPDATE ON public.industry_news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();