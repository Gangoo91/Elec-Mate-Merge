-- Photo Projects: Formal project-based photo documentation
-- Creates photo_projects table and adds project_id, photo_type, notes, annotations to safety_photos

-- ============================================================================
-- 1. Create photo_projects table
-- ============================================================================
CREATE TABLE IF NOT EXISTS photo_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  job_reference TEXT,
  address TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 2. Add new columns to safety_photos
-- ============================================================================
ALTER TABLE safety_photos ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES photo_projects(id) ON DELETE SET NULL;
ALTER TABLE safety_photos ADD COLUMN IF NOT EXISTS photo_type TEXT DEFAULT 'general'
  CHECK (photo_type IN ('safety', 'job_progress', 'completion', 'snagging', 'before', 'after', 'general'));
ALTER TABLE safety_photos ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE safety_photos ADD COLUMN IF NOT EXISTS annotations JSONB;
ALTER TABLE safety_photos ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- ============================================================================
-- 3. Row Level Security
-- ============================================================================
ALTER TABLE photo_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own projects"
  ON photo_projects
  FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================================
-- 4. Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_safety_photos_project_id ON safety_photos(project_id);
CREATE INDEX IF NOT EXISTS idx_safety_photos_photo_type ON safety_photos(photo_type);
CREATE INDEX IF NOT EXISTS idx_safety_photos_storage_path ON safety_photos(storage_path);
CREATE INDEX IF NOT EXISTS idx_photo_projects_user_id ON photo_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_photo_projects_status ON photo_projects(status, created_at DESC);
