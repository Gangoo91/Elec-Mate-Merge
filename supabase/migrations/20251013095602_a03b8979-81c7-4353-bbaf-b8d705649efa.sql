-- =====================================================
-- Phase 1: RAG Optimization - Hybrid Search Infrastructure
-- Upgrades all knowledge bases to HNSW + Full-Text Search
-- =====================================================

-- 1.1 BS7671 Embeddings (Designer's primary source)
-- Drop old IVFFlat, add HNSW (10x faster queries)
DROP INDEX IF EXISTS bs7671_embedding_idx;
CREATE INDEX bs7671_embedding_hnsw_idx ON bs7671_embeddings 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Add full-text search on regulation content + section
DROP INDEX IF EXISTS bs7671_fts_idx;
CREATE INDEX bs7671_fts_idx ON bs7671_embeddings 
USING gin (to_tsvector('english', content || ' ' || COALESCE(section, '')));

-- 1.2 Design Knowledge (Designer's secondary source)
-- Drop old IVFFlat, add HNSW
DROP INDEX IF EXISTS design_knowledge_embedding_idx;
CREATE INDEX design_knowledge_embedding_hnsw_idx ON design_knowledge 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Add full-text search
DROP INDEX IF EXISTS design_fts_idx;
CREATE INDEX design_fts_idx ON design_knowledge 
USING gin (to_tsvector('english', topic || ' ' || content));

-- 1.3 Health Safety Knowledge (add HNSW, keep existing FTS)
DROP INDEX IF EXISTS health_safety_embedding_hnsw_idx;
CREATE INDEX health_safety_embedding_hnsw_idx ON health_safety_knowledge 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- 1.4 Project Management Knowledge (needs both indexes)
DROP INDEX IF EXISTS project_mgmt_embedding_hnsw_idx;
CREATE INDEX project_mgmt_embedding_hnsw_idx ON project_mgmt_knowledge 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

DROP INDEX IF EXISTS project_mgmt_fts_idx;
CREATE INDEX project_mgmt_fts_idx ON project_mgmt_knowledge 
USING gin (to_tsvector('english', topic || ' ' || content));

-- =====================================================
-- Phase 2: Hybrid Search Functions (BM25 + Vector RRF)
-- =====================================================

-- 2.1 BS7671 Hybrid Search (for Designer)
CREATE OR REPLACE FUNCTION search_bs7671_hybrid(
  query_text TEXT,
  query_embedding vector(1536),
  match_count INT DEFAULT 15
)
RETURNS TABLE (
  id UUID,
  regulation_number TEXT,
  section TEXT,
  content TEXT,
  amendment TEXT,
  metadata JSONB,
  hybrid_score FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT b.id, ROW_NUMBER() OVER (ORDER BY b.embedding <=> query_embedding) AS rank
    FROM bs7671_embeddings b
    ORDER BY b.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT b.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    b.id,
    b.regulation_number,
    b.section,
    b.content,
    b.amendment,
    b.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN bs7671_embeddings b ON b.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

-- 2.2 Design Knowledge Hybrid Search
CREATE OR REPLACE FUNCTION search_design_hybrid(
  query_text TEXT,
  query_embedding vector(1536),
  match_count INT DEFAULT 12
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  metadata JSONB,
  hybrid_score FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT d.id, ROW_NUMBER() OVER (ORDER BY d.embedding <=> query_embedding) AS rank
    FROM design_knowledge d
    ORDER BY d.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT d.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', d.topic || ' ' || d.content), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM design_knowledge d
    WHERE to_tsvector('english', d.topic || ' ' || d.content) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', d.topic || ' ' || d.content), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    d.id,
    d.topic,
    d.content,
    d.source,
    d.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN design_knowledge d ON d.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

-- 2.3 Health Safety Hybrid Search
CREATE OR REPLACE FUNCTION search_health_safety_hybrid(
  query_text TEXT,
  query_embedding vector(1536),
  scale_filter TEXT DEFAULT NULL,
  match_count INT DEFAULT 12
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  scale TEXT,
  metadata JSONB,
  hybrid_score FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT h.id, ROW_NUMBER() OVER (ORDER BY h.embedding <=> query_embedding) AS rank
    FROM health_safety_knowledge h
    WHERE scale_filter IS NULL OR h.metadata->>'scale' = scale_filter
    ORDER BY h.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT h.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', h.content || ' ' || h.topic), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM health_safety_knowledge h
    WHERE (scale_filter IS NULL OR h.metadata->>'scale' = scale_filter)
      AND to_tsvector('english', h.content || ' ' || h.topic) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', h.content || ' ' || h.topic), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    h.id,
    h.topic,
    h.content,
    h.source,
    h.metadata->>'scale' as scale,
    h.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN health_safety_knowledge h ON h.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

-- 2.4 Project Management Hybrid Search
CREATE OR REPLACE FUNCTION search_project_mgmt_hybrid(
  query_text TEXT,
  query_embedding vector(1536),
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  metadata JSONB,
  hybrid_score FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH vector_results AS (
    SELECT p.id, ROW_NUMBER() OVER (ORDER BY p.embedding <=> query_embedding) AS rank
    FROM project_mgmt_knowledge p
    ORDER BY p.embedding <=> query_embedding
    LIMIT 100
  ),
  keyword_results AS (
    SELECT p.id, ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
      to_tsvector('english', p.topic || ' ' || p.content), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM project_mgmt_knowledge p
    WHERE to_tsvector('english', p.topic || ' ' || p.content) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', p.topic || ' ' || p.content), 
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  )
  SELECT 
    p.id,
    p.topic,
    p.content,
    p.source,
    p.metadata,
    rrf.score as hybrid_score
  FROM rrf_scores rrf
  JOIN project_mgmt_knowledge p ON p.id = rrf.id
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;