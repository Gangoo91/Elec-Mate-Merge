-- Add unique constraint to live_education_cache table for onConflict to work
ALTER TABLE public.live_education_cache 
ADD CONSTRAINT live_education_cache_category_search_query_key 
UNIQUE (category, search_query);

-- Clear existing cached data so fresh data with imageUrl can be stored
DELETE FROM public.live_education_cache;