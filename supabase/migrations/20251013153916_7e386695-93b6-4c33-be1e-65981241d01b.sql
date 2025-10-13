-- Create query cache table for fast repeat queries
CREATE TABLE IF NOT EXISTS query_cache (
  query_hash TEXT PRIMARY KEY,
  regulations JSONB NOT NULL,
  response TEXT NOT NULL,
  structured_data JSONB NOT NULL,
  enrichment JSONB NOT NULL,
  citations JSONB NOT NULL,
  rendering JSONB NOT NULL,
  timestamp BIGINT NOT NULL,
  hit_count INTEGER DEFAULT 1
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_query_cache_timestamp 
ON query_cache(timestamp);

CREATE INDEX IF NOT EXISTS idx_query_cache_hits 
ON query_cache(hit_count DESC);

-- Enable RLS
ALTER TABLE query_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can manage cache
CREATE POLICY "Service role can manage query cache"
ON query_cache
FOR ALL
USING (true)
WITH CHECK (true);
