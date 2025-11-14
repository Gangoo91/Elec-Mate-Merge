-- ============================================
-- PHASE 2: 3-Layer Caching Infrastructure
-- ============================================

-- LAYER 2: RAG Result Cache
-- Caches expensive RAG searches (45s → <1s)
CREATE TABLE IF NOT EXISTS public.rams_rag_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL,
  knowledge_base_type TEXT NOT NULL CHECK (knowledge_base_type IN ('health_safety', 'practical_work', 'regulations', 'bs7671')),
  query_text TEXT NOT NULL,
  rag_results JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Index for fast cache lookups
CREATE INDEX IF NOT EXISTS idx_rag_cache_lookup ON public.rams_rag_cache(cache_key, knowledge_base_type, expires_at);
CREATE INDEX IF NOT EXISTS idx_rag_cache_expiry ON public.rams_rag_cache(expires_at);

-- Enable RLS
ALTER TABLE public.rams_rag_cache ENABLE ROW LEVEL SECURITY;

-- Public read policy (cache is shared across all users)
CREATE POLICY "RAG cache readable by all" ON public.rams_rag_cache
  FOR SELECT USING (true);

-- Service role can write
CREATE POLICY "RAG cache writable by service role" ON public.rams_rag_cache
  FOR ALL USING (auth.role() = 'service_role');

-- LAYER 3: Partial Agent Cache
-- Caches individual agent outputs (H&S or Installer)
CREATE TABLE IF NOT EXISTS public.rams_partial_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_description_embedding vector(1536),
  work_type TEXT NOT NULL,
  job_scale TEXT NOT NULL,
  agent_type TEXT NOT NULL CHECK (agent_type IN ('health_safety', 'installer')),
  agent_output JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Index for semantic search
CREATE INDEX IF NOT EXISTS idx_partial_cache_embedding ON public.rams_partial_cache 
  USING ivfflat (job_description_embedding vector_cosine_ops)
  WITH (lists = 100);

-- Index for filtering
CREATE INDEX IF NOT EXISTS idx_partial_cache_filters ON public.rams_partial_cache(work_type, job_scale, agent_type, expires_at);
CREATE INDEX IF NOT EXISTS idx_partial_cache_expiry ON public.rams_partial_cache(expires_at);

-- Enable RLS
ALTER TABLE public.rams_partial_cache ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Partial cache readable by all" ON public.rams_partial_cache
  FOR SELECT USING (true);

-- Service role can write
CREATE POLICY "Partial cache writable by service role" ON public.rams_partial_cache
  FOR ALL USING (auth.role() = 'service_role');

-- RPC function for semantic partial cache matching
CREATE OR REPLACE FUNCTION match_rams_partial_cache(
  query_embedding vector(1536),
  work_type TEXT,
  job_scale TEXT,
  agent_type TEXT,
  similarity_threshold FLOAT DEFAULT 0.88,
  match_count INT DEFAULT 1
)
RETURNS TABLE (
  id UUID,
  agent_output JSONB,
  similarity FLOAT,
  hit_count INTEGER,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pc.id,
    pc.agent_output,
    1 - (pc.job_description_embedding <=> query_embedding) AS similarity,
    pc.hit_count,
    pc.created_at
  FROM public.rams_partial_cache pc
  WHERE 
    pc.work_type = match_rams_partial_cache.work_type
    AND pc.job_scale = match_rams_partial_cache.job_scale
    AND pc.agent_type = match_rams_partial_cache.agent_type
    AND pc.expires_at > now()
    AND (1 - (pc.job_description_embedding <=> query_embedding)) >= similarity_threshold
  ORDER BY pc.job_description_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Auto-cleanup expired cache entries (runs daily)
CREATE OR REPLACE FUNCTION cleanup_expired_caches()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.rams_rag_cache WHERE expires_at < now();
  DELETE FROM public.rams_partial_cache WHERE expires_at < now();
  DELETE FROM public.rams_semantic_cache WHERE expires_at < now();
END;
$$;

-- Add cache_hit field to rams_generation_jobs (track if result came from cache)
ALTER TABLE public.rams_generation_jobs 
  ADD COLUMN IF NOT EXISTS cache_hit BOOLEAN DEFAULT false;