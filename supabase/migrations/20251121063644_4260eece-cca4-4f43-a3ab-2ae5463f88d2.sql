-- Fix #1: search_inspection_testing_hybrid - Type Mismatch (add explicit cast)
CREATE OR REPLACE FUNCTION public.search_inspection_testing_hybrid(
  query_text text, 
  query_embedding vector, 
  match_count integer DEFAULT 10
)
RETURNS TABLE(
  id uuid, 
  topic text, 
  content text, 
  source text, 
  metadata jsonb, 
  hybrid_score double precision
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH 
  -- Vector search across GN3 inspection & testing knowledge
  gn3_vector AS (
    SELECT 
      itk.id,
      itk.topic,
      itk.content,
      'Guidance Note 3 (IET)' AS source,
      itk.metadata,
      ROW_NUMBER() OVER (ORDER BY itk.embedding <=> query_embedding) AS rank
    FROM inspection_testing_knowledge itk
    ORDER BY itk.embedding <=> query_embedding
    LIMIT 50
  ),
  -- Vector search across BS 7671 Chapter 64 (Inspection & Testing)
  bs7671_vector AS (
    SELECT 
      b.id,
      b.regulation_number AS topic,
      b.content,
      'BS 7671:2018+A3:2024 Chapter 64' AS source,
      b.metadata,
      ROW_NUMBER() OVER (ORDER BY b.embedding <=> query_embedding) AS rank
    FROM bs7671_embeddings b
    WHERE b.section LIKE 'Part 6%' OR b.section LIKE 'Chapter 64%'
    ORDER BY b.embedding <=> query_embedding
    LIMIT 50
  ),
  -- Keyword search for GN3 (FIXED: ts_rank instead of ts_rank_cd)
  gn3_keyword AS (
    SELECT 
      itk.id,
      itk.topic,
      itk.content,
      'Guidance Note 3 (IET)' AS source,
      itk.metadata,
      ROW_NUMBER() OVER (ORDER BY ts_rank(
        to_tsvector('english', itk.content || ' ' || itk.topic),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM inspection_testing_knowledge itk
    WHERE to_tsvector('english', itk.content || ' ' || itk.topic) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank(
      to_tsvector('english', itk.content || ' ' || itk.topic),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 50
  ),
  -- Keyword search for BS 7671 Chapter 64 (FIXED: ts_rank instead of ts_rank_cd)
  bs7671_keyword AS (
    SELECT 
      b.id,
      b.regulation_number AS topic,
      b.content,
      'BS 7671:2018+A3:2024 Chapter 64' AS source,
      b.metadata,
      ROW_NUMBER() OVER (ORDER BY ts_rank(
        to_tsvector('english', b.content),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE (b.section LIKE 'Part 6%' OR b.section LIKE 'Chapter 64%')
      AND to_tsvector('english', b.content) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank(
      to_tsvector('english', b.content),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 50
  ),
  -- Reciprocal Rank Fusion (RRF) with 1.5x weight for GN3 data
  rrf_scores AS (
    SELECT 
      COALESCE(gv.id, bv.id, gk.id, bk.id) AS id,
      COALESCE(gv.topic, bv.topic, gk.topic, bk.topic) AS topic,
      COALESCE(gv.content, bv.content, gk.content, bk.content) AS content,
      COALESCE(gv.source, bv.source, gk.source, bk.source) AS source,
      COALESCE(gv.metadata, bv.metadata, gk.metadata, bk.metadata) AS metadata,
      (COALESCE(1.5 / (gv.rank + 60), 0.0) + 
       COALESCE(1.5 / (gk.rank + 60), 0.0) + 
       COALESCE(1.0 / (bv.rank + 60), 0.0) + 
       COALESCE(1.0 / (bk.rank + 60), 0.0)) AS score
    FROM gn3_vector gv
    FULL OUTER JOIN bs7671_vector bv ON gv.id = bv.id
    FULL OUTER JOIN gn3_keyword gk ON COALESCE(gv.id, bv.id) = gk.id
    FULL OUTER JOIN bs7671_keyword bk ON COALESCE(gv.id, bv.id, gk.id) = bk.id
  )
  SELECT 
    rrf.id,
    rrf.topic,
    rrf.content,
    rrf.source,
    rrf.metadata,
    rrf.score::double precision AS hybrid_score  -- FIXED: Explicit cast
  FROM rrf_scores rrf
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$$;

-- Fix #2: search_bs7671_hybrid - Replace ts_rank_cd with ts_rank
CREATE OR REPLACE FUNCTION public.search_bs7671_hybrid(
  query_text text,
  query_embedding vector,
  match_count integer DEFAULT 15
)
RETURNS TABLE(
  id uuid,
  regulation_number text,
  section text,
  content text,
  amendment text,
  metadata jsonb,
  hybrid_score double precision
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
    SELECT b.id, ROW_NUMBER() OVER (ORDER BY ts_rank(
      to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')), 
      plainto_tsquery('english', query_text)
    ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank(
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