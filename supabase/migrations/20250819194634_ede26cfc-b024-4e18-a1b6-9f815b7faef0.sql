-- Step 1: Clean up existing duplicates and add deduplication infrastructure

-- Create a content hash function for duplicate detection using digest
CREATE OR REPLACE FUNCTION generate_content_hash(title text, source_url text, content text)
RETURNS text AS $$
BEGIN
  RETURN encode(digest(title || COALESCE(source_url, '') || COALESCE(content, ''), 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Add content_hash column for duplicate detection
ALTER TABLE industry_news ADD COLUMN IF NOT EXISTS content_hash text;

-- Add improved external_id logic
ALTER TABLE industry_news ADD COLUMN IF NOT EXISTS canonical_url text;

-- Delete obvious error pages first
DELETE FROM industry_news WHERE 
  title ILIKE '%page not found%' OR 
  title ILIKE '%404%' OR 
  title ILIKE '%error%' OR
  content ILIKE '%page not found%' OR
  content ILIKE '%404 error%' OR
  LENGTH(TRIM(content)) < 50;

-- Remove duplicates by keeping only the oldest entry for each title from the same source
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (
           PARTITION BY LOWER(TRIM(title)), COALESCE(source_url, category) 
           ORDER BY created_at ASC
         ) as rn
  FROM industry_news
  WHERE title IS NOT NULL AND TRIM(title) != ''
)
DELETE FROM industry_news 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- Update content_hash for existing records
UPDATE industry_news 
SET content_hash = generate_content_hash(title, source_url, content)
WHERE content_hash IS NULL;

-- Create unique constraint on content hash to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_industry_news_content_hash 
ON industry_news(content_hash) 
WHERE content_hash IS NOT NULL;

-- Create index on external_id for better performance
CREATE INDEX IF NOT EXISTS idx_industry_news_external_id ON industry_news(external_id);

-- Create compound index for source-based duplicate detection
CREATE INDEX IF NOT EXISTS idx_industry_news_title_source 
ON industry_news(LOWER(TRIM(title)), COALESCE(source_url, category));

-- Add constraint to prevent empty titles
ALTER TABLE industry_news ADD CONSTRAINT check_title_not_empty 
CHECK (title IS NOT NULL AND TRIM(title) != '');

-- Add constraint for minimum content length
ALTER TABLE industry_news ADD CONSTRAINT check_content_min_length 
CHECK (content IS NULL OR LENGTH(TRIM(content)) >= 10);