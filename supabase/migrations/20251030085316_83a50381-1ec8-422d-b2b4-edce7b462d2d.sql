-- Add flexible metadata columns for universal H&S intelligence extraction
ALTER TABLE health_safety_intelligence
ADD COLUMN IF NOT EXISTS document_type TEXT,
ADD COLUMN IF NOT EXISTS primary_topic TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT[],
ADD COLUMN IF NOT EXISTS content_summary TEXT,
ADD COLUMN IF NOT EXISTS hazards_mentioned TEXT[],
ADD COLUMN IF NOT EXISTS search_tags TEXT[],
ADD COLUMN IF NOT EXISTS relevance_score NUMERIC DEFAULT 0.8;

-- Make hazard_description nullable (not all docs have explicit hazards)
ALTER TABLE health_safety_intelligence
ALTER COLUMN hazard_description DROP NOT NULL;

-- Make control_measures nullable and default to empty array
ALTER TABLE health_safety_intelligence
ALTER COLUMN control_measures DROP NOT NULL,
ALTER COLUMN control_measures SET DEFAULT '{}';

-- Add indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_hs_intelligence_keywords ON health_safety_intelligence USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_hs_intelligence_document_type ON health_safety_intelligence(document_type);
CREATE INDEX IF NOT EXISTS idx_hs_intelligence_primary_topic ON health_safety_intelligence(primary_topic);

COMMENT ON COLUMN health_safety_intelligence.document_type IS 'Type of document: workbook, guide, procedure, checklist, regulation, training';
COMMENT ON COLUMN health_safety_intelligence.primary_topic IS 'Main topic/subject of the document';
COMMENT ON COLUMN health_safety_intelligence.keywords IS 'Searchable keywords extracted from content';
COMMENT ON COLUMN health_safety_intelligence.content_summary IS 'Brief summary of document content';
COMMENT ON COLUMN health_safety_intelligence.hazards_mentioned IS 'List of hazards mentioned (if any)';
COMMENT ON COLUMN health_safety_intelligence.search_tags IS 'Tags for improved search and categorization';