-- Fix search_bs7671_hybrid type mismatch and clear poisoned cache

-- Step 1: Drop both overloaded versions of the function
DROP FUNCTION IF EXISTS public.search_bs7671_hybrid(vector, integer);
DROP FUNCTION IF EXISTS public.search_bs7671_hybrid(text, vector, integer);

-- Step 2: Recreate with fixed type casting and correct vector dimensions
CREATE OR REPLACE FUNCTION public.search_bs7671_hybrid(
  query_text text, 
  query_embedding vector(1536),
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
AS $function$
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
    WHERE to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')) 
      @@ plainto_tsquery('english', query_text)
    ORDER BY ts_rank(
      to_tsvector('english', b.content || ' ' || COALESCE(b.section, '')),
      plainto_tsquery('english', query_text)
    ) DESC
    LIMIT 100
  ),
  rrf_scores AS (
    SELECT 
      COALESCE(vr.id, kr.id) as id,
      (COALESCE(1.0 / (vr.rank + 60), 0.0) + COALESCE(1.0 / (kr.rank + 60), 0.0))::double precision AS score
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
      (rrf.score * 
        CASE 
          WHEN b.amendment ILIKE '%A3:2024%' OR b.amendment ILIKE '%Amendment 3%' THEN 1.4
          WHEN b.amendment ILIKE '%A2:2022%' OR b.amendment ILIKE '%Amendment 2%' THEN 1.2
          ELSE 1.0
        END)::double precision as hybrid_score
    FROM rrf_scores rrf
    JOIN bs7671_embeddings b ON b.id = rrf.id
  )
  SELECT * FROM final_scores
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$function$;

-- Step 3: Clear poisoned RAG cache for commissioning agent
DELETE FROM rag_cache 
WHERE agent_name = 'commissioning' 
AND created_at < NOW();