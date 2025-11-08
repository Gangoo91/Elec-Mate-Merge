-- Circuit Design Cache Table for PHASE 3: Semantic Caching
-- Enables <2s responses for common circuit designs

CREATE TABLE IF NOT EXISTS public.circuit_design_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_hash TEXT NOT NULL UNIQUE,
  circuits JSONB NOT NULL,
  supply JSONB NOT NULL,
  design JSONB NOT NULL,
  hit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_hit_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast cache lookups
CREATE INDEX IF NOT EXISTS idx_circuit_design_cache_hash 
  ON public.circuit_design_cache(cache_hash);

-- Index for cache cleanup (TTL-based)
CREATE INDEX IF NOT EXISTS idx_circuit_design_cache_created 
  ON public.circuit_design_cache(created_at);

-- Enable RLS
ALTER TABLE public.circuit_design_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read cache
CREATE POLICY "Anyone can read circuit design cache"
  ON public.circuit_design_cache
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can upsert cache
CREATE POLICY "Authenticated users can upsert cache"
  ON public.circuit_design_cache
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Cleanup function for expired cache entries (7-day TTL)
CREATE OR REPLACE FUNCTION cleanup_expired_circuit_design_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.circuit_design_cache
  WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$;