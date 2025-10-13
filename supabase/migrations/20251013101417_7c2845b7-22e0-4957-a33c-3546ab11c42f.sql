-- RAG Optimization: Temporal Boosting & Observability
-- BS 7671:2018+A3:2024 (Amendment 3)

-- Update hybrid search function with temporal boosting for Amendment 3
CREATE OR REPLACE FUNCTION search_bs7671_hybrid(
  query_text TEXT,
  query_embedding vector(3072),
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
    ORDER BY ts_rank_cd DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM vector_results vr
    FULL OUTER JOIN keyword_results kr ON vr.id = kr.id
  ),
  final_scores AS (
    SELECT 
      b.id,
      b.regulation_number,
      b.section,
      b.content,
      b.amendment,
      b.metadata,
      rrf.score * 
        CASE 
          WHEN b.amendment ILIKE '%A3:2024%' OR b.amendment ILIKE '%Amendment 3%' THEN 1.4
          WHEN b.amendment ILIKE '%A2:2022%' OR b.amendment ILIKE '%Amendment 2%' THEN 1.2
          ELSE 1.0
        END as hybrid_score
    FROM rrf_scores rrf
    JOIN bs7671_embeddings b ON b.id = rrf.id
  )
  SELECT * FROM final_scores
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;

CREATE TABLE IF NOT EXISTS agent_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  request_id TEXT NOT NULL,
  total_duration_ms INTEGER,
  rag_duration_ms INTEGER,
  ai_duration_ms INTEGER,
  rag_cache_hit BOOLEAN DEFAULT false,
  rag_result_count INTEGER,
  rag_avg_score FLOAT,
  citation_confidence FLOAT,
  query_type TEXT,
  query_complexity TEXT,
  entities_extracted INTEGER,
  success BOOLEAN NOT NULL,
  error_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_performance_created ON agent_performance_metrics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_performance_name ON agent_performance_metrics(agent_name);

CREATE OR REPLACE FUNCTION invalidate_cache_on_reg_update()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM rag_cache WHERE query_text ILIKE '%' || NEW.regulation_number || '%';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS bs7671_update_invalidate_cache ON bs7671_embeddings;

CREATE TRIGGER bs7671_update_invalidate_cache
AFTER UPDATE ON bs7671_embeddings
FOR EACH ROW
WHEN (OLD.content IS DISTINCT FROM NEW.content OR OLD.amendment IS DISTINCT FROM NEW.amendment)
EXECUTE FUNCTION invalidate_cache_on_reg_update();

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rag_cache' AND column_name = 'cache_hits') THEN
    ALTER TABLE rag_cache ADD COLUMN cache_hits INTEGER DEFAULT 0;
  END IF;
END $$;