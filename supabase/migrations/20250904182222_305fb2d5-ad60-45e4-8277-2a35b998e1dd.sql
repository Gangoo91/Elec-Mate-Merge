-- Add enhanced caching columns to tool_guide_cache table
ALTER TABLE public.tool_guide_cache 
ADD COLUMN IF NOT EXISTS refresh_scheduled_for timestamp with time zone,
ADD COLUMN IF NOT EXISTS last_refreshed timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS cache_version integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS refresh_status text DEFAULT 'completed';

-- Create index for efficient cache lookups
CREATE INDEX IF NOT EXISTS idx_tool_guide_cache_expires_at ON public.tool_guide_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_tool_guide_cache_refresh_scheduled ON public.tool_guide_cache(refresh_scheduled_for);

-- Create function to calculate next Sunday at 2 AM
CREATE OR REPLACE FUNCTION public.get_next_sunday_refresh()
RETURNS timestamp with time zone
LANGUAGE plpgsql
AS $$
BEGIN
  -- Calculate next Sunday at 2 AM UTC
  RETURN date_trunc('week', CURRENT_DATE + interval '1 week') + interval '2 hours';
END;
$$;

-- Update existing cache entries to have proper Sunday refresh schedule
UPDATE public.tool_guide_cache 
SET refresh_scheduled_for = public.get_next_sunday_refresh(),
    last_refreshed = created_at
WHERE refresh_scheduled_for IS NULL;

-- Create guide metadata table for coming soon guides
CREATE TABLE IF NOT EXISTS public.tool_guide_metadata (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guide_type text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active',
  estimated_availability date,
  development_status text DEFAULT 'planning',
  priority integer DEFAULT 5,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on guide metadata table
ALTER TABLE public.tool_guide_metadata ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to guide metadata
CREATE POLICY "Anyone can view guide metadata" 
ON public.tool_guide_metadata 
FOR SELECT 
USING (true);

-- Create policy for service role to manage metadata
CREATE POLICY "Service role can manage guide metadata" 
ON public.tool_guide_metadata 
FOR ALL 
USING (auth.role() = 'service_role');

-- Insert metadata for existing guide types
INSERT INTO public.tool_guide_metadata (guide_type, status, estimated_availability, development_status, description) VALUES
('testing-equipment', 'active', NULL, 'completed', 'Complete guide available'),
('power-tools', 'active', NULL, 'completed', 'Complete guide available'),
('hand-tools', 'active', NULL, 'completed', 'Complete guide available'),
('ppe', 'active', NULL, 'completed', 'Complete guide available'),
('cable-tools', 'active', NULL, 'completed', 'Complete guide available'),
('storage', 'coming-soon', '2025-02-15', 'in-development', 'Guide currently being developed with expert input'),
('inspection', 'coming-soon', '2025-03-01', 'planning', 'Comprehensive inspection tools guide in planning phase'),
('smart-tools', 'coming-soon', '2025-03-15', 'research', 'IoT and smart electrical tools research phase')
ON CONFLICT (guide_type) DO UPDATE SET
  status = EXCLUDED.status,
  estimated_availability = EXCLUDED.estimated_availability,
  development_status = EXCLUDED.development_status,
  description = EXCLUDED.description,
  updated_at = now();

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_tool_guide_metadata_updated_at
  BEFORE UPDATE ON public.tool_guide_metadata
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to cleanup expired cache entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_tool_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  DELETE FROM public.tool_guide_cache 
  WHERE expires_at < now() - interval '1 day';
END;
$$;