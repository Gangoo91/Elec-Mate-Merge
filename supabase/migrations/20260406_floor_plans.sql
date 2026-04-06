-- Floor Plans table for Room Planner
CREATE TABLE IF NOT EXISTS floor_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES spark_projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  property_address TEXT,
  client_name TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'exported')),
  rooms JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  total_items INTEGER DEFAULT 0,
  pdf_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE floor_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own floor plans"
  ON floor_plans FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_floor_plans_user ON floor_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_floor_plans_project ON floor_plans(project_id);
CREATE INDEX IF NOT EXISTS idx_floor_plans_status ON floor_plans(user_id, status);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('floor-plans', 'floor-plans', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Users can manage own floor plan files"
  ON storage.objects FOR ALL
  USING (bucket_id = 'floor-plans' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'floor-plans' AND (storage.foldername(name))[1] = auth.uid()::text);
