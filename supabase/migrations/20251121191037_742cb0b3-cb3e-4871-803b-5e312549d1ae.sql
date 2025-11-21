-- Design Knowledge Intelligence Table
-- Mirrors practical_work_intelligence architecture for 8-facet enrichment
CREATE TABLE IF NOT EXISTS design_knowledge_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_knowledge_id UUID NOT NULL REFERENCES design_knowledge(id) ON DELETE CASCADE,
  
  -- Facet Identification (8 facets per source)
  facet_type TEXT NOT NULL CHECK (facet_type IN ('formula', 'regulation', 'example', 'table', 'concept', 'general')),
  primary_topic TEXT NOT NULL,
  
  -- Design Classification
  design_category TEXT NOT NULL,
  design_subcategory TEXT,
  
  -- Content (800-1200 chars, focused)
  content TEXT NOT NULL,
  
  -- Formulas & Calculations
  formulas TEXT[],
  calculation_steps TEXT[],
  worked_examples JSONB[],
  
  -- Standards & Regulations
  bs7671_regulations TEXT[],
  guidance_note_refs TEXT[],
  table_refs TEXT[],
  other_standards TEXT[],
  
  -- Application Context
  applies_to TEXT[] NOT NULL DEFAULT ARRAY['domestic', 'commercial', 'industrial'],
  load_types TEXT[],
  cable_sizes TEXT[],
  power_ratings TEXT[],
  voltage_levels TEXT[],
  location_types TEXT[],
  
  -- Design Requirements
  design_constraints JSONB,
  required_parameters TEXT[],
  typical_values JSONB,
  
  -- Testing & Verification
  test_procedures TEXT[],
  acceptance_criteria JSONB,
  common_mistakes TEXT[],
  
  -- RAG Enhancement
  keywords TEXT[] NOT NULL,
  related_topics TEXT[],
  confidence_score NUMERIC DEFAULT 0.8,
  
  -- Deduplication
  facet_hash TEXT,
  quality_score NUMERIC DEFAULT 0,
  
  -- Metadata
  source TEXT,
  enrichment_version TEXT DEFAULT 'v1',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dki_source ON design_knowledge_intelligence(design_knowledge_id);
CREATE INDEX IF NOT EXISTS idx_dki_facet_type ON design_knowledge_intelligence(facet_type);
CREATE INDEX IF NOT EXISTS idx_dki_category ON design_knowledge_intelligence(design_category);
CREATE INDEX IF NOT EXISTS idx_dki_keywords_gin ON design_knowledge_intelligence USING gin(keywords);
CREATE INDEX IF NOT EXISTS idx_dki_formulas_gin ON design_knowledge_intelligence USING gin(formulas);
CREATE INDEX IF NOT EXISTS idx_dki_regulations_gin ON design_knowledge_intelligence USING gin(bs7671_regulations);
CREATE INDEX IF NOT EXISTS idx_dki_applies_to_gin ON design_knowledge_intelligence USING gin(applies_to);
CREATE INDEX IF NOT EXISTS idx_dki_load_types_gin ON design_knowledge_intelligence USING gin(load_types);
CREATE INDEX IF NOT EXISTS idx_dki_cable_sizes_gin ON design_knowledge_intelligence USING gin(cable_sizes);
CREATE INDEX IF NOT EXISTS idx_dki_confidence ON design_knowledge_intelligence(confidence_score);
CREATE INDEX IF NOT EXISTS idx_dki_created_at ON design_knowledge_intelligence(created_at);

-- Unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS design_knowledge_intelligence_unique_hash 
ON design_knowledge_intelligence (design_knowledge_id, facet_hash);

-- Enable realtime
ALTER TABLE design_knowledge_intelligence REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE design_knowledge_intelligence;

-- RLS Policies
ALTER TABLE design_knowledge_intelligence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" 
ON design_knowledge_intelligence FOR SELECT 
TO authenticated 
USING (true);

-- Hybrid Search RPC
CREATE OR REPLACE FUNCTION search_design_knowledge_intelligence_hybrid(
  query_text TEXT,
  match_count INT DEFAULT 15,
  filter_category TEXT DEFAULT NULL,
  filter_load_type TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  design_knowledge_id UUID,
  facet_type TEXT,
  primary_topic TEXT,
  content TEXT,
  formulas TEXT[],
  bs7671_regulations TEXT[],
  keywords TEXT[],
  hybrid_score NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dki.id,
    dki.design_knowledge_id,
    dki.facet_type,
    dki.primary_topic,
    dki.content,
    dki.formulas,
    dki.bs7671_regulations,
    dki.keywords,
    (ts_rank(
      to_tsvector('english', dki.content || ' ' || array_to_string(dki.keywords, ' ')), 
      plainto_tsquery('english', query_text)
    ) * 10) AS hybrid_score
  FROM design_knowledge_intelligence dki
  WHERE
    (filter_category IS NULL OR dki.design_category = filter_category)
    AND (filter_load_type IS NULL OR filter_load_type = ANY(dki.load_types))
    AND to_tsvector('english', dki.content || ' ' || array_to_string(dki.keywords, ' ')) @@ plainto_tsquery('english', query_text)
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;

-- Compliance view
CREATE OR REPLACE VIEW design_knowledge_facet_compliance AS
SELECT
  COUNT(DISTINCT CASE WHEN dki.created_at >= now() - interval '10 minutes' THEN dki.design_knowledge_id END) AS sources_enriched,
  AVG(CASE WHEN dki.created_at >= now() - interval '10 minutes' THEN facet_counts.facet_count END) AS avg_facets_per_source,
  (COUNT(DISTINCT CASE WHEN dki.created_at >= now() - interval '10 minutes' AND facet_counts.facet_count = 8 THEN dki.design_knowledge_id END)::NUMERIC / 
   NULLIF(COUNT(DISTINCT CASE WHEN dki.created_at >= now() - interval '10 minutes' THEN dki.design_knowledge_id END), 0) * 100) AS compliance_percentage,
  COUNT(DISTINCT dki.design_knowledge_id) AS total_sources_all_time,
  (SELECT AVG(facet_count) FROM (
    SELECT design_knowledge_id, COUNT(*) as facet_count 
    FROM design_knowledge_intelligence 
    GROUP BY design_knowledge_id
  ) sub) AS avg_facets_all_time
FROM design_knowledge_intelligence dki
LEFT JOIN (
  SELECT design_knowledge_id, COUNT(*) as facet_count
  FROM design_knowledge_intelligence
  WHERE created_at >= now() - interval '10 minutes'
  GROUP BY design_knowledge_id
) facet_counts ON dki.design_knowledge_id = facet_counts.design_knowledge_id;

-- Prune function
CREATE OR REPLACE FUNCTION prune_design_knowledge_facets_to_8()
RETURNS TABLE (
  sources_processed INT,
  facets_deleted INT,
  avg_before NUMERIC,
  avg_after NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_sources_processed INT := 0;
  v_facets_deleted INT := 0;
  v_avg_before NUMERIC;
  v_avg_after NUMERIC;
  v_source_id UUID;
  v_ids_to_delete UUID[];
BEGIN
  SELECT AVG(facet_count) INTO v_avg_before
  FROM (SELECT design_knowledge_id, COUNT(*) as facet_count FROM design_knowledge_intelligence GROUP BY design_knowledge_id) sub;
  
  FOR v_source_id IN 
    SELECT design_knowledge_id 
    FROM design_knowledge_intelligence 
    GROUP BY design_knowledge_id 
    HAVING COUNT(*) > 8
  LOOP
    v_sources_processed := v_sources_processed + 1;
    
    SELECT array_agg(id) INTO v_ids_to_delete
    FROM (
      SELECT id FROM design_knowledge_intelligence
      WHERE design_knowledge_id = v_source_id
      ORDER BY quality_score DESC, created_at ASC
      OFFSET 8
    ) sub;
    
    IF v_ids_to_delete IS NOT NULL THEN
      DELETE FROM design_knowledge_intelligence WHERE id = ANY(v_ids_to_delete);
      v_facets_deleted := v_facets_deleted + array_length(v_ids_to_delete, 1);
    END IF;
  END LOOP;
  
  SELECT AVG(facet_count) INTO v_avg_after
  FROM (SELECT design_knowledge_id, COUNT(*) as facet_count FROM design_knowledge_intelligence GROUP BY design_knowledge_id) sub;
  
  RETURN QUERY SELECT v_sources_processed, v_facets_deleted, v_avg_before, v_avg_after;
END;
$$;