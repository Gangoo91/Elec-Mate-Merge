
-- Add a flexible attributes column to capture job-specific details
ALTER TABLE public.price_reports
ADD COLUMN IF NOT EXISTS attributes jsonb;

COMMENT ON COLUMN public.price_reports.attributes IS
  'Job-specific attributes from submissions (e.g., bedrooms, property_size_sqm, property_type, etc.)';

-- Create a GIN index to support querying/filtering by attributes later
CREATE INDEX IF NOT EXISTS idx_price_reports_attributes_gin
ON public.price_reports
USING gin (attributes);
