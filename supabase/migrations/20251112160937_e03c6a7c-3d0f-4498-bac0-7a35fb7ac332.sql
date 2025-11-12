-- Drop the broken RPC function
DROP FUNCTION IF EXISTS public.search_inspection_testing_hybrid(text, vector, integer);

-- Recreate with correct table references
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
AS $function$
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
  -- Keyword search for GN3
  gn3_keyword AS (
    SELECT 
      itk.id,
      itk.topic,
      itk.content,
      'Guidance Note 3 (IET)' AS source,
      itk.metadata,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', itk.content || ' ' || itk.topic),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM inspection_testing_knowledge itk
    WHERE to_tsvector('english', itk.content || ' ' || itk.topic) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
      to_tsvector('english', itk.content || ' ' || itk.topic),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 50
  ),
  -- Keyword search for BS 7671 Chapter 64
  bs7671_keyword AS (
    SELECT 
      b.id,
      b.regulation_number AS topic,
      b.content,
      'BS 7671:2018+A3:2024 Chapter 64' AS source,
      b.metadata,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(
        to_tsvector('english', b.content),
        plainto_tsquery('english', query_text)
      ) DESC) AS rank
    FROM bs7671_embeddings b
    WHERE (b.section LIKE 'Part 6%' OR b.section LIKE 'Chapter 64%')
      AND to_tsvector('english', b.content) @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank_cd(
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
      -- RRF formula with 1.5x weight for GN3
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
    rrf.score AS hybrid_score
  FROM rrf_scores rrf
  ORDER BY rrf.score DESC
  LIMIT match_count;
END;
$function$;