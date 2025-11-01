-- Drop the blocking UNIQUE constraint that prevents multiple facets per source item
-- The composite PRIMARY KEY (practical_work_id, facet_type) will remain
-- This allows 8-10 facets per source item instead of just 1

ALTER TABLE practical_work_intelligence 
DROP CONSTRAINT IF EXISTS practical_work_intelligence_practical_work_id_key;