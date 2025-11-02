-- Fix practical_work_intelligence schema to allow multiple facets of the same type
-- Drop existing composite primary key
ALTER TABLE public.practical_work_intelligence 
DROP CONSTRAINT practical_work_intelligence_pkey;

-- Make the id column the new primary key
ALTER TABLE public.practical_work_intelligence 
ADD CONSTRAINT practical_work_intelligence_pkey PRIMARY KEY (id);

-- Add unique index to prevent exact duplicates while allowing multiple facets of same type
CREATE UNIQUE INDEX IF NOT EXISTS practical_work_intelligence_unique_facet 
ON public.practical_work_intelligence (practical_work_id, facet_type, primary_topic);

-- Add index on practical_work_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_practical_work_intelligence_source 
ON public.practical_work_intelligence (practical_work_id);

-- Add index on facet_type for filtering
CREATE INDEX IF NOT EXISTS idx_practical_work_intelligence_facet_type 
ON public.practical_work_intelligence (facet_type);