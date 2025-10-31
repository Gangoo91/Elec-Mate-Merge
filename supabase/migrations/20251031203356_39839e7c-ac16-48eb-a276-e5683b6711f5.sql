-- Fix Practical Work: Mark all records as canonical
-- This enables the enrichment process to find source records

UPDATE practical_work 
SET is_canonical = true 
WHERE is_canonical IS NOT true;

-- Add index for better performance on canonical lookups
CREATE INDEX IF NOT EXISTS idx_practical_work_canonical 
ON practical_work(is_canonical) 
WHERE is_canonical = true;