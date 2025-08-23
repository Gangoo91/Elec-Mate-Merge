-- Create table to store live course data cache
CREATE TABLE public.live_course_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  search_query TEXT NOT NULL,
  course_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '24 hours')
);

-- Enable RLS
ALTER TABLE public.live_course_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (courses are public information)
CREATE POLICY "Live course cache is publicly readable" 
ON public.live_course_cache 
FOR SELECT 
USING (true);

-- Create policy for service role to insert/update/delete
CREATE POLICY "Service role can manage live course cache" 
ON public.live_course_cache 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create index for efficient querying
CREATE INDEX idx_live_course_cache_source_query ON public.live_course_cache(source, search_query);
CREATE INDEX idx_live_course_cache_expires ON public.live_course_cache(expires_at);

-- Create function to clean up expired cache entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_course_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.live_course_cache 
  WHERE expires_at < now();
END;
$$;