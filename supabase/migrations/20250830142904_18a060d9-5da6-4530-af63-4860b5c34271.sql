-- Add category column to cables_materials_cache table
ALTER TABLE public.cables_materials_cache 
ADD COLUMN category text NOT NULL DEFAULT 'cables';

-- Update existing records to have 'cables' category
UPDATE public.cables_materials_cache SET category = 'cables';

-- Drop the components_materials_cache table since we won't need it
DROP TABLE IF EXISTS public.components_materials_cache;

-- Create index for better performance when querying by category and supplier
CREATE INDEX IF NOT EXISTS idx_cables_materials_cache_category_supplier 
ON public.cables_materials_cache(category, supplier);