-- Circuit Design Cache for Semantic Caching
CREATE TABLE IF NOT EXISTS circuit_design_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_hash TEXT NOT NULL UNIQUE,
  circuits JSONB NOT NULL,
  supply JSONB NOT NULL,
  design JSONB NOT NULL,
  hit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_hit_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_circuit_cache_hash ON circuit_design_cache(cache_hash);
CREATE INDEX IF NOT EXISTS idx_circuit_cache_created ON circuit_design_cache(created_at);

ALTER TABLE circuit_design_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "circuit_cache_select" ON circuit_design_cache FOR SELECT USING (true);
CREATE POLICY "circuit_cache_all" ON circuit_design_cache FOR ALL USING (true) WITH CHECK (true);