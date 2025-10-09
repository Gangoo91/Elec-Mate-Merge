-- Add job_scale tracking to RAMS and method statements
ALTER TABLE rams_documents 
ADD COLUMN IF NOT EXISTS job_scale text CHECK (job_scale IN ('domestic', 'commercial', 'industrial'));

ALTER TABLE method_statements
ADD COLUMN IF NOT EXISTS job_scale text CHECK (job_scale IN ('domestic', 'commercial', 'industrial'));

-- Create indexes for analytics and filtering
CREATE INDEX IF NOT EXISTS idx_rams_job_scale ON rams_documents(job_scale);
CREATE INDEX IF NOT EXISTS idx_method_job_scale ON method_statements(job_scale);

-- Add comment for documentation
COMMENT ON COLUMN rams_documents.job_scale IS 'Job scale classification for adaptive risk assessment: domestic (5-7 hazards), commercial (7-10 hazards), industrial (10-15 hazards)';
COMMENT ON COLUMN method_statements.job_scale IS 'Job scale classification for adaptive method statement: domestic (4-6 phases), commercial (6-10 phases), industrial (8-15 phases)';