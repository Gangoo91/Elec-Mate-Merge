-- Add missing common_mistakes column to practical_work_intelligence
ALTER TABLE practical_work_intelligence 
ADD COLUMN IF NOT EXISTS common_mistakes text[] DEFAULT '{}';

COMMENT ON COLUMN practical_work_intelligence.common_mistakes 
IS 'Common mistakes electricians make with this procedure (enriched micro-facet)';