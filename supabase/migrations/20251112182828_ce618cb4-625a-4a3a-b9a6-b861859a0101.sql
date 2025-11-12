-- Increase statement timeout for RAG RPC functions to prevent timeouts
-- Practical work searches (query_text, query_embedding, match_count, filter_trade)
ALTER FUNCTION search_practical_work_intelligence_hybrid(TEXT, vector, INT, TEXT)
  SET statement_timeout = '90s';

-- Regulations intelligence searches (query_text, match_count, filter_categories)
ALTER FUNCTION search_regulations_intelligence_hybrid(TEXT, INT, TEXT[])
  SET statement_timeout = '90s';

-- Health & safety hybrid searches (query_text, query_embedding, scale_filter, match_count)
ALTER FUNCTION search_health_safety_hybrid(TEXT, vector, TEXT, INT)
  SET statement_timeout = '90s';

COMMENT ON FUNCTION search_practical_work_intelligence_hybrid IS 
'Extended timeout (90s) for complex queries with large result sets';

COMMENT ON FUNCTION search_regulations_intelligence_hybrid IS 
'Extended timeout (90s) for complex keyword matching across 200k+ regulations';

COMMENT ON FUNCTION search_health_safety_hybrid IS 
'Extended timeout (90s) for hybrid vector + keyword searches';