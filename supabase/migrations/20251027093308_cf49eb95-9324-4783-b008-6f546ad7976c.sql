-- Clear all caches to ensure fresh AI-generated data
DELETE FROM ai_response_cache;
DELETE FROM rag_cache;
DELETE FROM hs_query_cache;

-- Add query parameter to prevent cache hits on stale data
COMMENT ON TABLE ai_response_cache IS 'Cache cleared 2025-10-27 - forcing fresh GPT-5 generations';
COMMENT ON TABLE rag_cache IS 'Cache cleared 2025-10-27 - forcing fresh GPT-5 generations';
COMMENT ON TABLE hs_query_cache IS 'Cache cleared 2025-10-27 - forcing fresh GPT-5 generations';