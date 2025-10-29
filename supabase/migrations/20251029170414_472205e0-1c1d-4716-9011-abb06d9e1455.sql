-- Drop existing policies if they exist to allow fresh creation
DROP POLICY IF EXISTS "Public read access for regulations intelligence" ON regulations_intelligence;
DROP POLICY IF EXISTS "Service can manage regulations intelligence" ON regulations_intelligence;

-- Create regulations_intelligence table for universal BS 7671 RAG enrichment
CREATE TABLE IF NOT EXISTS regulations_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  regulation_id UUID REFERENCES bs7671_embeddings(id) ON DELETE CASCADE,
  regulation_number TEXT NOT NULL,
  
  -- RAG Metadata (Universal - used by ALL agents)
  keywords TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  subcategory TEXT,
  technical_level INTEGER CHECK (technical_level BETWEEN 1 AND 5),
  primary_topic TEXT NOT NULL,
  related_regulations TEXT[] DEFAULT '{}',
  applies_to TEXT[] DEFAULT '{}', -- ['domestic', 'commercial', 'industrial']
  
  -- Metadata
  confidence_score DECIMAL(3,2) DEFAULT 0.90,
  enrichment_version TEXT DEFAULT 'v1',
  source_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(regulation_id, enrichment_version)
);

-- Enable RLS
ALTER TABLE regulations_intelligence ENABLE ROW LEVEL SECURITY;

-- Public read access (all agents use this)
CREATE POLICY "Public read access for regulations intelligence"
  ON regulations_intelligence FOR SELECT
  USING (true);

-- Service role can manage
CREATE POLICY "Service can manage regulations intelligence"
  ON regulations_intelligence FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_reg_number 
  ON regulations_intelligence(regulation_number);

CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_category 
  ON regulations_intelligence(category);

CREATE INDEX IF NOT EXISTS idx_regulations_intelligence_keywords 
  ON regulations_intelligence USING GIN(keywords);

COMMENT ON TABLE regulations_intelligence IS 'Universal RAG metadata for BS 7671 regulations - used by ALL agents for intelligent regulation lookup';