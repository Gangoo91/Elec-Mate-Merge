-- Add customer_id FK to AI agent job tables
-- Enables linking agent outputs to customer records

-- Cost Engineer
ALTER TABLE cost_engineer_jobs
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);
CREATE INDEX IF NOT EXISTS idx_cost_engineer_jobs_customer ON cost_engineer_jobs(customer_id);

-- Circuit Designer
ALTER TABLE circuit_design_jobs
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);
CREATE INDEX IF NOT EXISTS idx_circuit_design_jobs_customer ON circuit_design_jobs(customer_id);

-- Installation Specialist
ALTER TABLE installation_method_jobs
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);
CREATE INDEX IF NOT EXISTS idx_installation_method_jobs_customer ON installation_method_jobs(customer_id);

-- Commissioning
ALTER TABLE commissioning_jobs
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);
CREATE INDEX IF NOT EXISTS idx_commissioning_jobs_customer ON commissioning_jobs(customer_id);

-- Maintenance
ALTER TABLE maintenance_method_jobs
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);
CREATE INDEX IF NOT EXISTS idx_maintenance_method_jobs_customer ON maintenance_method_jobs(customer_id);
