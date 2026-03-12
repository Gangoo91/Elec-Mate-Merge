-- Add project_id to invoices and site_visits tables (missed in the 20260303 migration)
ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON invoices(project_id);

ALTER TABLE site_visits
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_site_visits_project_id ON site_visits(project_id);
