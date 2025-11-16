-- Create circuit_design_cache_v3 table for deterministic caching
CREATE TABLE circuit_design_cache_v3 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT UNIQUE NOT NULL,
  design JSONB NOT NULL,
  hit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_hit_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_cache_v3_key ON circuit_design_cache_v3(cache_key);
CREATE INDEX idx_cache_v3_created ON circuit_design_cache_v3(created_at);

-- RLS policies (public read for authenticated users, service role can manage)
ALTER TABLE circuit_design_cache_v3 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read circuit design cache v3"
  ON circuit_design_cache_v3
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage circuit design cache v3"
  ON circuit_design_cache_v3
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Function to increment cache hit counter
CREATE OR REPLACE FUNCTION increment_cache_hit(
  p_cache_key TEXT,
  p_last_hit_at TIMESTAMPTZ
) RETURNS VOID AS $$
BEGIN
  UPDATE circuit_design_cache_v3
  SET hit_count = hit_count + 1,
      last_hit_at = p_last_hit_at
  WHERE cache_key = p_cache_key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;