-- Create tool guide cache table
CREATE TABLE public.tool_guide_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guide_type TEXT NOT NULL,
  guide_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days')
);

-- Enable RLS
ALTER TABLE public.tool_guide_cache ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Tool guide cache is publicly readable" 
ON public.tool_guide_cache 
FOR SELECT 
USING (true);

CREATE POLICY "Service role can manage tool guide cache" 
ON public.tool_guide_cache 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create unique index on guide_type for efficient lookups
CREATE UNIQUE INDEX idx_tool_guide_cache_guide_type ON public.tool_guide_cache(guide_type);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tool_guide_cache_updated_at
BEFORE UPDATE ON public.tool_guide_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to cleanup expired guide cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_guide_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.tool_guide_cache 
  WHERE expires_at < now();
END;
$function$;