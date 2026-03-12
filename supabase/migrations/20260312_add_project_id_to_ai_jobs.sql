-- Add project_id to all AI job tables
ALTER TABLE rams_generation_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_rams_jobs_project_id ON rams_generation_jobs(project_id);

ALTER TABLE circuit_design_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_circuit_design_jobs_project_id ON circuit_design_jobs(project_id);

ALTER TABLE cost_engineer_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_cost_engineer_jobs_project_id ON cost_engineer_jobs(project_id);

ALTER TABLE commissioning_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_commissioning_jobs_project_id ON commissioning_jobs(project_id);

ALTER TABLE installation_method_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_installation_method_jobs_project_id ON installation_method_jobs(project_id);

ALTER TABLE maintenance_method_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_maintenance_method_jobs_project_id ON maintenance_method_jobs(project_id);

ALTER TABLE health_safety_jobs
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_health_safety_jobs_project_id ON health_safety_jobs(project_id);

-- RLS: user-level UPDATE for tables that only have service_role ALL
CREATE POLICY "Users can update own rams_generation_jobs"
  ON rams_generation_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own circuit_design_jobs"
  ON circuit_design_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cost_engineer_jobs"
  ON cost_engineer_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own commissioning_jobs"
  ON commissioning_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own installation_method_jobs"
  ON installation_method_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own maintenance_method_jobs"
  ON maintenance_method_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own health_safety_jobs"
  ON health_safety_jobs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
