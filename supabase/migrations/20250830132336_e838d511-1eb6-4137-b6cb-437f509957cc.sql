-- Create table for cables materials cache with weekly refresh
CREATE TABLE public.cables_materials_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  supplier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days')
);

-- Enable RLS
ALTER TABLE public.cables_materials_cache ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view cables cache" 
ON public.cables_materials_cache 
FOR SELECT 
USING (true);

-- Create policy for service role to manage cache
CREATE POLICY "Service role can manage cables cache" 
ON public.cables_materials_cache 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create function to cleanup expired cable cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_cables_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.cables_materials_cache 
  WHERE expires_at < now();
END;
$function$;