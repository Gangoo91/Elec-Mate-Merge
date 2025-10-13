-- Create hybrid search function for inspection & testing knowledge
-- Searches commissioning_knowledge + bs7671_embeddings (Chapter 64)
CREATE OR REPLACE FUNCTION search_inspection_testing_hybrid(
  query_text TEXT,
  query_embedding vector,
  match_count INTEGER DEFAULT 10
)
RETURNS TABLE(
  id UUID,
  topic TEXT,
  content TEXT,
  source TEXT,
  metadata JSONB,
  hybrid_score DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  WITH 
  -- Vector search across commissioning knowledge (testing procedures)
  commissioning_vector AS (
    SELECT 
      c.id,
      c.topic,
      c.content,
      c.source,
      c.metadata,
      ROW_NUMBER() OVER (ORDER BY c.embedding <=> query_embedding) AS rank
    FROM commissioning_knowledge c
    ORDER BY c.embedding <=> query_embedding
    LIMIT 50
  ),
  -- Vector search across BS 7671 Chapter 64 (Inspection & Testing)
  bs7671_vector AS (
    SELECT 
      b.id,
      b.regulation_number AS topic,
      b.content,
      'BS 7671:2018+A3:2024' AS source,
      b.metadata,
      ROW_NUMBER() OVER (ORDER BY b.embedding <=> query_embedding) AS rank
    FROM bs7671_embeddings b
    WHERE b.section LIKE 'Part 6%' OR b.section LIKE 'Chapter 64%'
    ORDER BY b.embedding <=> query_embedding
    LIMIT 50
  ),
  -- Keyword search
  keyword_results AS (
    SELECT 
      c.id,
      c.topic,
      c.content,
      c.source,
      c.metadata,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', c.content || ' ' || c.topic),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM commissioning_knowledge c
    WHERE to_tsvector('english', c.content || ' ' || c.topic) @@ plainto_tsquery('english', query_text)
    
    UNION ALL
    
    SELECT 
      b.id,
      b.regulation_number AS topic,
      b.content,
      'BS 7671:2018+A3:2024' AS source,
      b.metadata,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', b.content),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE (b.section LIKE 'Part 6%' OR b.section LIKE 'Chapter 64%')
      AND to_tsvector('english', b.content) @@ plainto_tsquery('english', query_text)
    
    ORDER BY rank
    LIMIT 50
  ),
  -- Reciprocal Rank Fusion (RRF)
  rrf_scores AS (
    SELECT 
      COALESCE(cv.id, bv.id, kr.id) AS id,
      COALESCE(cv.topic, bv.topic, kr.topic) AS topic,
      COALESCE(cv.content, bv.content, kr.content) AS content,
      COALESCE(cv.source, bv.source, kr.source) AS source,
      COALESCE(cv.metadata, bv.metadata, kr.metadata) AS metadata,
      COALESCE(1.0 / (cv.rank + 60), 0.0) + 
      COALESCE(1.0 / (bv.rank + 60), 0.0) + 
      COALESCE(1.0 / (kr.rank + 60), 0.0) AS score
    FROM commissioning_vector cv
    FULL OUTER JOIN bs7671_vector bv ON cv.id = bv.id
    FULL OUTER JOIN keyword_results kr ON COALESCE(cv.id, bv.id) = kr.id
  )
  SELECT 
    rrf.id,
    rrf.topic,
    rrf.content,
    rrf.source,
    rrf.metadata,
    rrf.score AS hybrid_score
  FROM rrf_scores rrf
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;