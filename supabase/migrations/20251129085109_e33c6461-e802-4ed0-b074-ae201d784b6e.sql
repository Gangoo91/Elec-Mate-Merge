-- Create installation_method_cache table with semantic embeddings (30-day TTL)
CREATE TABLE installation_method_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_text TEXT NOT NULL,
  query_embedding vector(1536) NOT NULL,
  installation_method JSONB NOT NULL,
  hit_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Fast semantic search index using ivfflat
CREATE INDEX installation_method_cache_embedding_idx 
ON installation_method_cache 
USING ivfflat (query_embedding vector_cosine_ops) WITH (lists = 100);

-- Expiry cleanup index
CREATE INDEX installation_method_cache_expires_idx ON installation_method_cache(expires_at);

-- Semantic matching function (85% similarity threshold)
CREATE OR REPLACE FUNCTION match_installation_method_cache(
  query_embedding vector(1536),
  similarity_threshold FLOAT DEFAULT 0.85,
  match_count INT DEFAULT 1
)
RETURNS TABLE (
  id UUID,
  installation_method JSONB,
  similarity FLOAT,
  hit_count INT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.installation_method,
    (1 - (c.query_embedding <=> match_installation_method_cache.query_embedding))::float AS similarity,
    c.hit_count,
    c.created_at
  FROM installation_method_cache c
  WHERE 
    c.expires_at > now()
    AND (1 - (c.query_embedding <=> match_installation_method_cache.query_embedding)) >= similarity_threshold
  ORDER BY c.query_embedding <=> match_installation_method_cache.query_embedding
  LIMIT match_count;
END;
$$;

-- Cleanup expired cache entries
CREATE OR REPLACE FUNCTION cleanup_expired_installation_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM installation_method_cache 
  WHERE expires_at < now();
END;
$$;