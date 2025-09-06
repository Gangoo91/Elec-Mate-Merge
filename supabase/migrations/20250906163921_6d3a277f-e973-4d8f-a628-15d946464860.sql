-- Update market_insights_cache table for weekly caching
ALTER TABLE public.market_insights_cache 
ALTER COLUMN expires_at SET DEFAULT (now() + interval '7 days');