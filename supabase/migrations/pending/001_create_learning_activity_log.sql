-- Learning activity log: single source of truth for all learning activity
CREATE TABLE learning_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  activity_type text NOT NULL,
  source_id text,
  source_title text,
  xp_earned integer NOT NULL DEFAULT 0,
  duration_minutes integer DEFAULT 0,
  metadata jsonb DEFAULT '{}',
  counted_as_ojt boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_activity_log_user_date ON learning_activity_log (user_id, created_at DESC);
CREATE INDEX idx_activity_log_type ON learning_activity_log (user_id, activity_type);

ALTER TABLE learning_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity log"
  ON learning_activity_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity log"
  ON learning_activity_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);
