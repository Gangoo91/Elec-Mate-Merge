-- Phase 1.3: Drop Orphaned Database Tables
-- Safe to delete immediately (not found in code)

-- Backup tables before dropping (export to S3 handled separately)
-- DROP unused cache tables

DROP TABLE IF EXISTS ai_response_cache CASCADE;
DROP TABLE IF EXISTS hs_query_cache CASCADE;
DROP TABLE IF EXISTS conversation_memory CASCADE;

-- Expected space savings: ~5-10 MB