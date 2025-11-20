
-- ============================================
-- CIRCUIT DESIGN 3-LAYER CACHE TABLES
-- Mirrors RAMS cache architecture
-- ============================================

-- LAYER 1: Full Circuit Design Cache (instant responses)
CREATE TABLE IF NOT EXISTS circuit_design_cache_v4 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL UNIQUE,
  job_inputs JSONB NOT NULL,
  design JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_circuit_cache_v4_key ON circuit_design_cache_v4(cache_key);
CREATE INDEX IF NOT EXISTS idx_circuit_cache_v4_expires ON circuit_design_cache_v4(expires_at);
CREATE INDEX IF NOT EXISTS idx_circuit_cache_v4_created ON circuit_design_cache_v4(created_at DESC);

-- LAYER 2: RAG Result Cache (skip 30-45s RAG searches)
CREATE TABLE IF NOT EXISTS circuit_rag_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL,
  knowledge_base_type TEXT NOT NULL,
  query_text TEXT NOT NULL,
  rag_results JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(cache_key, knowledge_base_type)
);

CREATE INDEX IF NOT EXISTS idx_circuit_rag_cache_key ON circuit_rag_cache(cache_key, knowledge_base_type);
CREATE INDEX IF NOT EXISTS idx_circuit_rag_cache_expires ON circuit_rag_cache(expires_at);

-- LAYER 3: Partial Agent Cache (reuse individual agent outputs)
CREATE TABLE IF NOT EXISTS circuit_partial_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT NOT NULL,
  agent_type TEXT NOT NULL,
  job_inputs JSONB NOT NULL,
  agent_output JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  UNIQUE(cache_key, agent_type)
);

CREATE INDEX IF NOT EXISTS idx_circuit_partial_cache_key ON circuit_partial_cache(cache_key, agent_type);
CREATE INDEX IF NOT EXISTS idx_circuit_partial_cache_expires ON circuit_partial_cache(expires_at);

-- Add agent progress columns to circuit_design_jobs
ALTER TABLE circuit_design_jobs 
  ADD COLUMN IF NOT EXISTS designer_progress INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS designer_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS installer_progress INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS installer_status TEXT DEFAULT 'pending';

-- Add comments for clarity
COMMENT ON TABLE circuit_design_cache_v4 IS 'LAYER 1: Full circuit design cache for instant responses';
COMMENT ON TABLE circuit_rag_cache IS 'LAYER 2: RAG result cache to skip expensive searches';
COMMENT ON TABLE circuit_partial_cache IS 'LAYER 3: Individual agent output cache for reuse';

-- Enable RLS
ALTER TABLE circuit_design_cache_v4 ENABLE ROW LEVEL SECURITY;
ALTER TABLE circuit_rag_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE circuit_partial_cache ENABLE ROW LEVEL SECURITY;

-- Public read access for cache tables (caches are shared across users)
CREATE POLICY "Anyone can read circuit cache v4" ON circuit_design_cache_v4 FOR SELECT USING (true);
CREATE POLICY "Anyone can read circuit RAG cache" ON circuit_rag_cache FOR SELECT USING (true);
CREATE POLICY "Anyone can read circuit partial cache" ON circuit_partial_cache FOR SELECT USING (true);

-- Service role can manage cache tables
CREATE POLICY "Service role can manage cache v4" ON circuit_design_cache_v4 FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage RAG cache" ON circuit_rag_cache FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage partial cache" ON circuit_partial_cache FOR ALL USING (auth.role() = 'service_role');
