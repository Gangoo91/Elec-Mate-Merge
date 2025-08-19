-- Add missing fields to major_projects table for enhanced functionality
ALTER TABLE public.major_projects 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Infrastructure',
ADD COLUMN IF NOT EXISTS tender_deadline DATE,
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS external_project_url TEXT;

-- Update existing records with default category based on content
UPDATE public.major_projects 
SET category = CASE 
  WHEN LOWER(content) LIKE '%hospital%' OR LOWER(content) LIKE '%health%' THEN 'Healthcare'
  WHEN LOWER(content) LIKE '%transport%' OR LOWER(content) LIKE '%railway%' OR LOWER(content) LIKE '%underground%' THEN 'Transport'
  WHEN LOWER(content) LIKE '%school%' OR LOWER(content) LIKE '%university%' THEN 'Education'
  WHEN LOWER(content) LIKE '%wind%' OR LOWER(content) LIKE '%renewable%' OR LOWER(content) LIKE '%solar%' THEN 'Energy'
  ELSE 'Infrastructure'
END
WHERE category IS NULL OR category = 'Infrastructure';