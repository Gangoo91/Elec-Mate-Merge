-- Create course dates cache table for storing scraped course dates
CREATE TABLE IF NOT EXISTS public.course_dates_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_url TEXT NOT NULL,
  course_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  dates_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '12 hours')
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_course_dates_cache_url ON public.course_dates_cache(course_url);
CREATE INDEX IF NOT EXISTS idx_course_dates_cache_expires ON public.course_dates_cache(expires_at);

-- Enable RLS
ALTER TABLE public.course_dates_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for course dates cache
CREATE POLICY "Course dates cache is publicly readable" 
ON public.course_dates_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage course dates cache" 
ON public.course_dates_cache 
FOR ALL 
USING (auth.role() = 'service_role');