-- First, delete duplicate category entries keeping only the most recent one
DELETE FROM public.tools_weekly_cache a
USING public.tools_weekly_cache b
WHERE a.id < b.id 
  AND a.category = b.category;

-- Create tools scrape queue table for managing batch processing
CREATE TABLE IF NOT EXISTS public.tools_scrape_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  firecrawl_job_id TEXT,
  firecrawl_job_url TEXT,
  urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  tools_found INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tools_scrape_queue ENABLE ROW LEVEL SECURITY;

-- Allow public read access to queue status
CREATE POLICY "Queue is publicly readable"
  ON public.tools_scrape_queue
  FOR SELECT
  USING (true);

-- Allow service role to manage queue
CREATE POLICY "Service role can manage queue"
  ON public.tools_scrape_queue
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create index for faster batch status queries
CREATE INDEX idx_tools_scrape_queue_status ON public.tools_scrape_queue(status, batch_number);

-- Now add unique constraint on category
ALTER TABLE public.tools_weekly_cache 
  ADD CONSTRAINT tools_weekly_cache_category_key UNIQUE (category);