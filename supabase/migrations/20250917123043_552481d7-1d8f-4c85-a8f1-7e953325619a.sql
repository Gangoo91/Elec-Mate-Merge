-- Add evidence_files column to cpd_entries table
ALTER TABLE public.cpd_entries 
ADD COLUMN IF NOT EXISTS evidence_files jsonb DEFAULT '[]'::jsonb;