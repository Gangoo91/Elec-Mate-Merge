-- Drop the old 3-parameter version of the function that references the non-existent 'trade' column
DROP FUNCTION IF EXISTS public.search_practical_work_intelligence_hybrid(text, integer, text);

-- The new 4-parameter version with query_embedding and facet_type filtering remains
-- This resolves the PGRST203 overloading error