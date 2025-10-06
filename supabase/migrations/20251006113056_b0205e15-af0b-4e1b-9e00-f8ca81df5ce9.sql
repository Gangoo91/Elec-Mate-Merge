-- Phase 8: AI Response Cache Table
-- Stores cached responses for common queries to improve performance by 10x

CREATE TABLE IF NOT EXISTS public.ai_response_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL UNIQUE,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  citations JSONB DEFAULT '[]'::jsonb,
  confidence DECIMAL(3,2) DEFAULT 0.8,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  hits INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_ai_cache_key ON public.ai_response_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_ai_cache_timestamp ON public.ai_response_cache(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ai_cache_hits ON public.ai_response_cache(hits DESC);

-- RLS: Cache is system-managed, no user access needed
ALTER TABLE public.ai_response_cache ENABLE ROW LEVEL SECURITY;

-- Cleanup function for old cache entries
CREATE OR REPLACE FUNCTION public.cleanup_ai_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.ai_response_cache 
  WHERE timestamp < now() - INTERVAL '7 days';
END;
$$;

COMMENT ON TABLE public.ai_response_cache IS 'Caches AI responses for common queries to improve performance';
COMMENT ON COLUMN public.ai_response_cache.cache_key IS 'Hashed key from query + context';
COMMENT ON COLUMN public.ai_response_cache.hits IS 'Number of times this cached response was used';
