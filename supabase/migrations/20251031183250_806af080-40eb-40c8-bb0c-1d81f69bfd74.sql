-- Phase 1: Create unified practical_work table (merged source data)
CREATE TABLE practical_work (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_table TEXT NOT NULL,
  source_id UUID NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  topic TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(source_table, source_id)
);

CREATE INDEX idx_practical_work_source ON practical_work(source_table, source_id);
CREATE INDEX idx_practical_work_embedding ON practical_work USING ivfflat(embedding vector_cosine_ops);
CREATE INDEX idx_practical_work_content_search ON practical_work USING gin(to_tsvector('english', content));

-- Migrate data from installation_knowledge (2,646 records - all unique)
INSERT INTO practical_work (source_table, source_id, content, source, topic, metadata, embedding)
SELECT 
  'installation_knowledge' as source_table,
  id as source_id,
  content,
  source,
  topic,
  metadata,
  embedding
FROM installation_knowledge;

-- Migrate data from maintenance_knowledge (8,026 records)
INSERT INTO practical_work (source_table, source_id, content, source, topic, metadata, embedding)
SELECT 
  'maintenance_knowledge' as source_table,
  id as source_id,
  content,
  source,
  topic,
  metadata,
  embedding
FROM maintenance_knowledge;

-- Migrate unique data from inspection_testing_knowledge (1,575 unique records)
INSERT INTO practical_work (source_table, source_id, content, source, topic, metadata, embedding)
SELECT 
  'inspection_testing_knowledge' as source_table,
  i.id as source_id,
  i.content,
  i.source,
  i.topic,
  i.metadata,
  i.embedding
FROM inspection_testing_knowledge i
WHERE NOT EXISTS (
  SELECT 1 FROM maintenance_knowledge m 
  WHERE m.content = i.content
);

-- Phase 2: Create practical_work_intelligence table (enriched data)
CREATE TABLE practical_work_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practical_work_id UUID NOT NULL REFERENCES practical_work(id) ON DELETE CASCADE,
  
  -- Multi-dimensional Activity Classification
  activity_types TEXT[] NOT NULL DEFAULT '{}',
  
  -- Equipment Context
  equipment_category TEXT,
  equipment_subcategory TEXT,
  bs7671_zones TEXT[],
  
  -- Installation Intelligence
  installation_method TEXT,
  fixing_intervals JSONB,
  cable_routes TEXT[],
  termination_methods TEXT[],
  
  -- Testing Intelligence
  test_procedures JSONB[],
  test_equipment_required TEXT[],
  test_frequency TEXT,
  acceptance_criteria JSONB,
  
  -- Inspection Intelligence
  inspection_checklist JSONB[],
  visual_inspection_points TEXT[],
  eicr_observation_codes TEXT[],
  common_defects TEXT[],
  
  -- Maintenance Intelligence
  maintenance_intervals JSONB,
  maintenance_tasks JSONB[],
  wear_indicators TEXT[],
  replacement_criteria TEXT[],
  
  -- Fault Diagnosis
  common_failures JSONB[],
  troubleshooting_steps TEXT[],
  diagnostic_tests TEXT[],
  
  -- Practical Estimates
  typical_duration_minutes INTEGER,
  skill_level TEXT,
  team_size INTEGER DEFAULT 1,
  tools_required TEXT[],
  materials_needed JSONB[],
  
  -- Safety & Compliance
  safety_requirements JSONB,
  bs7671_regulations TEXT[],
  other_standards TEXT[],
  
  -- RAG Enhancement
  keywords TEXT[],
  related_topics TEXT[],
  confidence_score NUMERIC DEFAULT 0.8,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(practical_work_id)
);

CREATE INDEX idx_pwi_activity_types ON practical_work_intelligence USING gin(activity_types);
CREATE INDEX idx_pwi_equipment ON practical_work_intelligence(equipment_category);
CREATE INDEX idx_pwi_keywords ON practical_work_intelligence USING gin(keywords);
CREATE INDEX idx_pwi_regulations ON practical_work_intelligence USING gin(bs7671_regulations);
CREATE INDEX idx_pwi_skill_level ON practical_work_intelligence(skill_level);

-- Phase 3: Create hybrid search function
CREATE OR REPLACE FUNCTION search_practical_work_intelligence(
  query_text TEXT,
  query_embedding vector(1536),
  filter_activity_types TEXT[] DEFAULT NULL,
  filter_equipment TEXT[] DEFAULT NULL,
  filter_skill_level TEXT[] DEFAULT NULL,
  match_count INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  activity_types TEXT[],
  equipment_category TEXT,
  typical_duration_minutes INTEGER,
  skill_level TEXT,
  bs7671_regulations TEXT[],
  tools_required TEXT[],
  safety_requirements JSONB,
  test_procedures JSONB[],
  inspection_checklist JSONB[],
  maintenance_intervals JSONB,
  common_failures JSONB[],
  similarity_score NUMERIC,
  keyword_score NUMERIC,
  final_score NUMERIC
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH semantic_matches AS (
    SELECT 
      pw.id,
      pw.content,
      pwi.activity_types,
      pwi.equipment_category,
      pwi.typical_duration_minutes,
      pwi.skill_level,
      pwi.bs7671_regulations,
      pwi.tools_required,
      pwi.safety_requirements,
      pwi.test_procedures,
      pwi.inspection_checklist,
      pwi.maintenance_intervals,
      pwi.common_failures,
      1 - (pw.embedding <=> query_embedding) as similarity
    FROM practical_work pw
    INNER JOIN practical_work_intelligence pwi ON pw.id = pwi.practical_work_id
    WHERE (filter_activity_types IS NULL OR pwi.activity_types && filter_activity_types)
      AND (filter_equipment IS NULL OR pwi.equipment_category = ANY(filter_equipment))
      AND (filter_skill_level IS NULL OR pwi.skill_level = ANY(filter_skill_level))
    ORDER BY pw.embedding <=> query_embedding
    LIMIT match_count * 2
  ),
  keyword_matches AS (
    SELECT 
      sm.id,
      ts_rank(to_tsvector('english', sm.content), plainto_tsquery('english', query_text)) as kw_score
    FROM semantic_matches sm
  )
  SELECT 
    sm.id,
    sm.content,
    sm.activity_types,
    sm.equipment_category,
    sm.typical_duration_minutes,
    sm.skill_level,
    sm.bs7671_regulations,
    sm.tools_required,
    sm.safety_requirements,
    sm.test_procedures,
    sm.inspection_checklist,
    sm.maintenance_intervals,
    sm.common_failures,
    sm.similarity::NUMERIC as similarity_score,
    COALESCE(km.kw_score, 0)::NUMERIC as keyword_score,
    (sm.similarity * 0.6 + COALESCE(km.kw_score, 0) * 0.4)::NUMERIC as final_score
  FROM semantic_matches sm
  LEFT JOIN keyword_matches km ON sm.id = km.id
  ORDER BY final_score DESC
  LIMIT match_count;
END;
$$;