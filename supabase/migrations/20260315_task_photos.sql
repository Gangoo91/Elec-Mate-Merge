-- ELE-278: Add task_id to project_documents so photos can be attached to tasks
-- Tasks can exist outside of projects, so this is a standalone optional FK

ALTER TABLE project_documents
  ADD COLUMN IF NOT EXISTS task_id UUID REFERENCES tasks(id) ON DELETE CASCADE;

-- Index for fast lookup by task
CREATE INDEX IF NOT EXISTS idx_project_documents_task_id
  ON project_documents(task_id)
  WHERE task_id IS NOT NULL;

-- RLS: existing policies on project_documents already cover user_id checks,
-- so no new policies needed — task photos inherit the same protection.
