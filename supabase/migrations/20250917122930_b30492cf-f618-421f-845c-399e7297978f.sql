-- Add evidence_files column to enhanced_cpd_entries table (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enhanced_cpd_entries' AND column_name = 'evidence_files') THEN
        ALTER TABLE public.enhanced_cpd_entries 
        ADD COLUMN evidence_files jsonb DEFAULT '[]'::jsonb;
    END IF;
END $$;