-- Add agent-specific progress tracking columns to rams_generation_jobs
ALTER TABLE rams_generation_jobs
ADD COLUMN hs_agent_progress INTEGER DEFAULT 0,
ADD COLUMN installer_agent_progress INTEGER DEFAULT 0,
ADD COLUMN hs_agent_status TEXT DEFAULT 'pending' CHECK (hs_agent_status IN ('pending', 'processing', 'complete', 'failed')),
ADD COLUMN installer_agent_status TEXT DEFAULT 'pending' CHECK (installer_agent_status IN ('pending', 'processing', 'complete', 'failed'));

-- Add comment for documentation
COMMENT ON COLUMN rams_generation_jobs.hs_agent_progress IS 'Health & Safety agent progress (0-100)';
COMMENT ON COLUMN rams_generation_jobs.installer_agent_progress IS 'Installer agent progress (0-100)';
COMMENT ON COLUMN rams_generation_jobs.hs_agent_status IS 'Health & Safety agent status';
COMMENT ON COLUMN rams_generation_jobs.installer_agent_status IS 'Installer agent status';