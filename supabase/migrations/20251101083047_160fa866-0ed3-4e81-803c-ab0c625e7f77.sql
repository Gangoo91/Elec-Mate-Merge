-- Remove ALL legacy junk rows from practical_work_intelligence
DELETE FROM practical_work_intelligence 
WHERE primary_topic IS NULL 
   OR array_length(keywords, 1) IS NULL 
   OR confidence_score < 0.7
   OR equipment_category IN ('combined', 'introduction', 'ombined', 'general');

-- Verify table is clean
COMMENT ON TABLE practical_work_intelligence IS 'Cleaned - ready for high-quality micro-facet enrichment';