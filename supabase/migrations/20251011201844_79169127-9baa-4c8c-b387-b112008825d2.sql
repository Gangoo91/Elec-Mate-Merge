-- Drop old 4-parameter versions of RAG search functions to fix database overload conflicts
-- This keeps only the 5-parameter versions with optional filters

DROP FUNCTION IF EXISTS public.search_design_knowledge(vector, text, double precision, integer);
DROP FUNCTION IF EXISTS public.search_installation_knowledge(vector, text, double precision, integer);
DROP FUNCTION IF EXISTS public.search_project_mgmt(vector, text, double precision, integer);
DROP FUNCTION IF EXISTS public.search_health_safety(vector, text, double precision, integer);
DROP FUNCTION IF EXISTS public.search_inspection_testing(vector, text, double precision, integer);

-- The 5-parameter versions with optional filters already exist and will remain:
-- search_design_knowledge(embedding, circuit_filter, source_filter, threshold, count)
-- search_installation_knowledge(embedding, method_filter, source_filter, threshold, count)
-- search_health_safety(embedding, scale_filter, source_filter, threshold, count)
-- search_project_mgmt(embedding, source_filter, threshold, count) - already 4 params, no conflict
-- search_inspection_testing(embedding, source_filter, threshold, count) - already 4 params, no conflict