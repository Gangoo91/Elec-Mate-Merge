-- Enable RLS on tables that don't have it
ALTER TABLE public.regional_job_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uk_regions ENABLE ROW LEVEL SECURITY;

-- Add read-only policies for regional job pricing (public data)
CREATE POLICY "Anyone can view regional job pricing" 
ON public.regional_job_pricing 
FOR SELECT 
USING (true);

-- Add read-only policies for UK regions (public data)
CREATE POLICY "Anyone can view UK regions" 
ON public.uk_regions 
FOR SELECT 
USING (true);