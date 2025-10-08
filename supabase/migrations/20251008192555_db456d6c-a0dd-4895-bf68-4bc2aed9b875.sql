-- Drop existing function and recreate with correct signature
DROP FUNCTION IF EXISTS search_bs7671(vector, double precision, integer);

-- Create RPC function for searching BS 7671 regulations using vector similarity
CREATE OR REPLACE FUNCTION search_bs7671(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.6,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  regulation_number text,
  section text,
  content text,
  amendment text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    bs7671_embeddings.id,
    bs7671_embeddings.regulation_number,
    bs7671_embeddings.section,
    bs7671_embeddings.content,
    bs7671_embeddings.amendment,
    bs7671_embeddings.metadata,
    1 - (bs7671_embeddings.embedding <=> query_embedding) as similarity
  FROM bs7671_embeddings
  WHERE 1 - (bs7671_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY bs7671_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;