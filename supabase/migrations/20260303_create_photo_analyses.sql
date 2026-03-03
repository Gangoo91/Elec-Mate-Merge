-- Photo analyses table — stores AI vision analysis results for electrical photos
-- Used by the analyse_photo MCP tool

CREATE TABLE IF NOT EXISTS photo_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_type text NOT NULL CHECK (analysis_type IN ('consumer_unit', 'installation', 'receipt', 'general')),
  image_url text NOT NULL,
  analysis_result jsonb NOT NULL DEFAULT '{}'::jsonb,
  observations jsonb NOT NULL DEFAULT '[]'::jsonb,
  linked_report_id uuid REFERENCES reports(id) ON DELETE SET NULL,
  linked_job_id uuid,
  property_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_photo_analyses_user_id ON photo_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_photo_analyses_type ON photo_analyses(user_id, analysis_type);

-- RLS
ALTER TABLE photo_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own photo analyses"
  ON photo_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own photo analyses"
  ON photo_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own photo analyses"
  ON photo_analyses FOR DELETE
  USING (auth.uid() = user_id);
