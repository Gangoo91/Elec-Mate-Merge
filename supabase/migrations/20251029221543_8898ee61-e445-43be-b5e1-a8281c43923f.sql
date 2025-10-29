-- 1. Drop old regulation_hazards_extracted table
DROP TABLE IF EXISTS regulation_hazards_extracted CASCADE;

-- 2. Create new health_safety_intelligence table
CREATE TABLE IF NOT EXISTS public.health_safety_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES health_safety_knowledge(id),
  hazard_description TEXT NOT NULL,
  control_measures TEXT[] NOT NULL,
  required_ppe JSONB,
  confidence_score NUMERIC DEFAULT 0.8,
  enrichment_version TEXT DEFAULT 'v1',
  source_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(source_id, hazard_description)
);

-- 3. Create indices
CREATE INDEX idx_health_safety_intel_source ON health_safety_intelligence(source_id);
CREATE INDEX idx_health_safety_intel_version ON health_safety_intelligence(enrichment_version);
CREATE INDEX idx_health_safety_intel_hash ON health_safety_intelligence(source_hash);

-- 4. RLS Policies
ALTER TABLE health_safety_intelligence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for health safety intelligence"
  ON health_safety_intelligence FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service can manage health safety intelligence"
  ON health_safety_intelligence FOR ALL
  TO service_role
  USING (true);