-- Add installation agent tracking columns to circuit_design_jobs table

ALTER TABLE circuit_design_jobs 
ADD COLUMN IF NOT EXISTS installation_agent_status TEXT,
ADD COLUMN IF NOT EXISTS installation_agent_progress INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS installation_guidance JSONB;

-- Add comment for documentation
COMMENT ON COLUMN circuit_design_jobs.installation_agent_status IS 'Status of the Design Installation Agent: pending, processing, complete, failed';
COMMENT ON COLUMN circuit_design_jobs.installation_agent_progress IS 'Progress percentage (0-100) of the installation guidance generation';
COMMENT ON COLUMN circuit_design_jobs.installation_guidance IS 'Generated installation guidance JSON from Design Installation Agent';