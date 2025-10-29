-- Add checkpoint support to batch_progress
ALTER TABLE batch_progress 
ADD COLUMN IF NOT EXISTS last_checkpoint JSONB DEFAULT NULL;

-- Add enrichment versioning to regulation_hazards_extracted (if exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'regulation_hazards_extracted') THEN
    ALTER TABLE regulation_hazards_extracted 
    ADD COLUMN IF NOT EXISTS enrichment_version TEXT DEFAULT 'v1',
    ADD COLUMN IF NOT EXISTS source_hash TEXT DEFAULT NULL;
  END IF;
END $$;

-- Add enrichment versioning to installation_procedures
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'installation_procedures') THEN
    ALTER TABLE installation_procedures 
    ADD COLUMN IF NOT EXISTS enrichment_version TEXT DEFAULT 'v1',
    ADD COLUMN IF NOT EXISTS source_hash TEXT DEFAULT NULL;
  END IF;
END $$;

-- Add enrichment versioning to design_patterns_structured
ALTER TABLE design_patterns_structured 
ADD COLUMN IF NOT EXISTS enrichment_version TEXT DEFAULT 'v1',
ADD COLUMN IF NOT EXISTS source_hash TEXT DEFAULT NULL;

-- Add enrichment versioning to inspection_procedures
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'inspection_procedures') THEN
    ALTER TABLE inspection_procedures 
    ADD COLUMN IF NOT EXISTS enrichment_version TEXT DEFAULT 'v1',
    ADD COLUMN IF NOT EXISTS source_hash TEXT DEFAULT NULL;
  END IF;
END $$;

-- Add enrichment versioning to maintenance_schedules
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'maintenance_schedules') THEN
    ALTER TABLE maintenance_schedules 
    ADD COLUMN IF NOT EXISTS enrichment_version TEXT DEFAULT 'v1',
    ADD COLUMN IF NOT EXISTS source_hash TEXT DEFAULT NULL;
  END IF;
END $$;

-- Add enrichment versioning to project_templates
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'project_templates') THEN
    ALTER TABLE project_templates 
    ADD COLUMN IF NOT EXISTS enrichment_version TEXT DEFAULT 'v1',
    ADD COLUMN IF NOT EXISTS source_hash TEXT DEFAULT NULL;
  END IF;
END $$;

-- Create index for design_patterns_structured (only table confirmed to have source_id)
CREATE INDEX IF NOT EXISTS idx_design_patterns_source_version 
ON design_patterns_structured(source_id, enrichment_version);