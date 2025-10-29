-- Create pricing_intelligence table for enriched pricing data
CREATE TABLE IF NOT EXISTS pricing_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pricing_id UUID REFERENCES pricing_embeddings(id) ON DELETE CASCADE,
  
  -- Structured extraction
  product_category TEXT NOT NULL,
  product_subcategory TEXT,
  typical_use_cases TEXT[],
  compatibility_notes TEXT,
  installation_complexity TEXT CHECK (installation_complexity IN ('simple', 'medium', 'complex')),
  installation_time_estimate_mins INTEGER,
  
  -- Regional & availability
  regional_availability TEXT[],
  typical_lead_time_days INTEGER,
  bulk_discount_available BOOLEAN DEFAULT false,
  bulk_discount_threshold INTEGER,
  
  -- Compliance & standards
  bs_standards_compliance TEXT[],
  required_for_compliance TEXT[],
  
  -- Quality metrics
  quality_rating TEXT CHECK (quality_rating IN ('budget', 'standard', 'premium')),
  common_failure_modes TEXT[],
  maintenance_requirements TEXT,
  
  -- Versioning for incremental enrichment
  enrichment_version TEXT DEFAULT 'v1',
  source_hash TEXT,
  
  -- Metadata
  confidence_score FLOAT DEFAULT 0.85,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(pricing_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pricing_intelligence_pricing_id ON pricing_intelligence(pricing_id);
CREATE INDEX IF NOT EXISTS idx_pricing_intelligence_category ON pricing_intelligence(product_category);
CREATE INDEX IF NOT EXISTS idx_pricing_intelligence_version ON pricing_intelligence(pricing_id, enrichment_version);

-- Add trigger for updated_at
CREATE TRIGGER update_pricing_intelligence_timestamp
  BEFORE UPDATE ON pricing_intelligence
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();