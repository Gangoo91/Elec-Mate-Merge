-- =============================================
-- PHASE 1: Database Schema for Maintenance & Tutor Knowledge
-- =============================================

-- Create maintenance_knowledge table for RAG retrieval
CREATE TABLE IF NOT EXISTS public.maintenance_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  equipment_type TEXT,
  maintenance_type TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536),
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', topic || ' ' || content)
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create tutor_knowledge table for RAG retrieval
CREATE TABLE IF NOT EXISTS public.tutor_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  qualification_level TEXT,
  subject_area TEXT,
  exam_relevance TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536),
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', topic || ' ' || content)
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for maintenance_knowledge
CREATE INDEX IF NOT EXISTS idx_maintenance_knowledge_embedding 
  ON public.maintenance_knowledge 
  USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_maintenance_knowledge_search 
  ON public.maintenance_knowledge 
  USING gin(search_vector);

CREATE INDEX IF NOT EXISTS idx_maintenance_knowledge_equipment 
  ON public.maintenance_knowledge(equipment_type);

-- Create indexes for tutor_knowledge
CREATE INDEX IF NOT EXISTS idx_tutor_knowledge_embedding 
  ON public.tutor_knowledge 
  USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_tutor_knowledge_search 
  ON public.tutor_knowledge 
  USING gin(search_vector);

CREATE INDEX IF NOT EXISTS idx_tutor_knowledge_level 
  ON public.tutor_knowledge(qualification_level);

-- Enable RLS
ALTER TABLE public.maintenance_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_knowledge ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read for agents)
CREATE POLICY "Public read access for maintenance knowledge"
  ON public.maintenance_knowledge
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage maintenance knowledge"
  ON public.maintenance_knowledge
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Public read access for tutor knowledge"
  ON public.tutor_knowledge
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage tutor knowledge"
  ON public.tutor_knowledge
  FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================
-- Hybrid Search Functions (RRF - Reciprocal Rank Fusion)
-- =============================================

-- Maintenance hybrid search function
CREATE OR REPLACE FUNCTION public.search_maintenance_hybrid(
  query_text TEXT,
  query_embedding vector,
  equipment_filter TEXT DEFAULT NULL,
  match_count INTEGER DEFAULT 12
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  equipment_type TEXT,
  metadata JSONB,
  hybrid_score DOUBLE PRECISION
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH 
  -- Vector search results
  vector_results AS (
    SELECT 
      m.id, 
      ROW_NUMBER() OVER (ORDER BY m.embedding <=> query_embedding) AS rank
    FROM maintenance_knowledge m
    WHERE equipment_filter IS NULL OR m.equipment_type = equipment_filter
    ORDER BY m.embedding <=> query_embedding
    LIMIT 100
  ),
  
  -- Keyword search results
  keyword_results AS (
    SELECT 
      m.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(m.search_vector, plainto_tsquery('english', query_text)) DESC) AS rank
    FROM maintenance_knowledge m
    WHERE 
      (equipment_filter IS NULL OR m.equipment_type = equipment_filter)
      AND m.search_vector @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(m.search_vector, plainto_tsquery('english', query_text)) DESC
    LIMIT 100
  ),
  
  -- Reciprocal Rank Fusion
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  
  SELECT 
    m.id,
    m.topic,
    m.content,
    m.source,
    m.equipment_type,
    m.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN maintenance_knowledge m ON m.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

-- Tutor hybrid search function
CREATE OR REPLACE FUNCTION public.search_tutor_hybrid(
  query_text TEXT,
  query_embedding vector,
  level_filter TEXT DEFAULT NULL,
  match_count INTEGER DEFAULT 12
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  qualification_level TEXT,
  metadata JSONB,
  hybrid_score DOUBLE PRECISION
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH 
  -- Vector search results
  vector_results AS (
    SELECT 
      t.id, 
      ROW_NUMBER() OVER (ORDER BY t.embedding <=> query_embedding) AS rank
    FROM tutor_knowledge t
    WHERE level_filter IS NULL OR t.qualification_level = level_filter
    ORDER BY t.embedding <=> query_embedding
    LIMIT 100
  ),
  
  -- Keyword search results
  keyword_results AS (
    SELECT 
      t.id, 
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(t.search_vector, plainto_tsquery('english', query_text)) DESC) AS rank
    FROM tutor_knowledge t
    WHERE 
      (level_filter IS NULL OR t.qualification_level = level_filter)
      AND t.search_vector @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(t.search_vector, plainto_tsquery('english', query_text)) DESC
    LIMIT 100
  ),
  
  -- Reciprocal Rank Fusion
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  
  SELECT 
    t.id,
    t.topic,
    t.content,
    t.source,
    t.qualification_level,
    t.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN tutor_knowledge t ON t.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;