-- AM2 Readiness Scores
-- Persists component scores for the AM2 Readiness Simulator.
-- One row per user per component (e.g. testingSequence, safeIsolation).

CREATE TABLE IF NOT EXISTS am2_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  component_key TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, component_key)
);

-- Row Level Security — users can only access their own scores
ALTER TABLE am2_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own scores"
  ON am2_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scores"
  ON am2_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scores"
  ON am2_scores FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for fast lookups by user
CREATE INDEX idx_am2_scores_user ON am2_scores(user_id);
