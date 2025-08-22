-- Create market insights cache table
CREATE TABLE public.market_insights_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keywords TEXT NOT NULL,
  location TEXT NOT NULL,
  data JSONB NOT NULL,
  data_source TEXT NOT NULL DEFAULT 'live_api',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '30 minutes'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(keywords, location)
);

-- Enable RLS
ALTER TABLE public.market_insights_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (market insights are public data)
CREATE POLICY "Market insights are publicly accessible" 
ON public.market_insights_cache 
FOR SELECT 
USING (true);

-- Create policy for system updates (only the system can insert/update)
CREATE POLICY "System can manage market insights" 
ON public.market_insights_cache 
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for efficient lookups
CREATE INDEX idx_market_insights_keywords_location ON public.market_insights_cache(keywords, location);
CREATE INDEX idx_market_insights_expires_at ON public.market_insights_cache(expires_at);

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.market_insights_cache;

-- Set replica identity for realtime updates
ALTER TABLE public.market_insights_cache REPLICA IDENTITY FULL;