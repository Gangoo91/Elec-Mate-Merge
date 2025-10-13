-- Fix security warning: Set search_path for cached function
ALTER FUNCTION public.search_bs7671_hybrid_cached(text, vector, int) 
SET search_path = public;