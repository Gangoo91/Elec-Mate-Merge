-- ============================================================================
-- QUICK WIN #3: Semantic RAMS Cache
-- Cache common jobs for instant (<1s) response
-- ============================================================================

-- RAMS semantic cache table
CREATE TABLE IF NOT EXISTS public.rams_semantic_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Query fingerprint
  job_description_embedding vector(1536) NOT NULL,
  work_type TEXT NOT NULL,
  job_scale TEXT NOT NULL,
  
  -- Cached results
  rams_data JSONB NOT NULL,
  method_data JSONB NOT NULL,
  
  -- Usage tracking
  hit_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Cache validity (30 days)
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '30 days')
);

-- HNSW index for fast vector similarity search
CREATE INDEX IF NOT EXISTS idx_rams_cache_embedding 
  ON public.rams_semantic_cache 
  USING hnsw (job_description_embedding vector_cosine_ops);

-- Regular indexes
CREATE INDEX IF NOT EXISTS idx_rams_cache_work_type 
  ON public.rams_semantic_cache(work_type, job_scale);

CREATE INDEX IF NOT EXISTS idx_rams_cache_expires 
  ON public.rams_semantic_cache(expires_at);

-- Enable RLS
ALTER TABLE public.rams_semantic_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read cache (speeds up lookups)
CREATE POLICY "Allow read access to RAMS cache" 
  ON public.rams_semantic_cache
  FOR SELECT 
  USING (true);

-- Policy: Service role can insert/update cache
CREATE POLICY "Service role can manage RAMS cache" 
  ON public.rams_semantic_cache
  FOR ALL 
  TO service_role
  USING (true);

-- ============================================================================
-- Vector search function for cache matching
-- ============================================================================

CREATE OR REPLACE FUNCTION public.match_rams_cache(
  query_embedding vector(1536),
  work_type TEXT,
  job_scale TEXT,
  similarity_threshold FLOAT DEFAULT 0.95,
  match_count INT DEFAULT 1
)
RETURNS TABLE (
  id UUID,
  rams_data JSONB,
  method_data JSONB,
  similarity FLOAT,
  hit_count INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.rams_data,
    c.method_data,
    1 - (c.job_description_embedding <=> query_embedding) AS similarity,
    c.hit_count
  FROM public.rams_semantic_cache c
  WHERE 
    c.work_type = match_rams_cache.work_type
    AND c.job_scale = match_rams_cache.job_scale
    AND c.expires_at > now()
    AND 1 - (c.job_description_embedding <=> query_embedding) > similarity_threshold
  ORDER BY c.job_description_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================================================
-- Cleanup function for expired cache
-- ============================================================================

CREATE OR REPLACE FUNCTION public.cleanup_expired_rams_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.rams_semantic_cache 
  WHERE expires_at < now();
END;
$$;