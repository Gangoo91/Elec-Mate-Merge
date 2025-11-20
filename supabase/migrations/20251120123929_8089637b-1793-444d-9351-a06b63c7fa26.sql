-- Add parallel agent tracking to circuit_design_jobs table
ALTER TABLE circuit_design_jobs 
ADD COLUMN IF NOT EXISTS installation_job_id uuid REFERENCES installation_method_jobs(id),
ADD COLUMN IF NOT EXISTS designer_progress integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS designer_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS installer_progress integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS installer_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS installation_data jsonb;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_circuit_design_installation_job 
ON circuit_design_jobs(installation_job_id);