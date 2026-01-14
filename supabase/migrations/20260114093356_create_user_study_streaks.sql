-- Create user_study_streaks table for tracking apprentice study streaks
CREATE TABLE IF NOT EXISTS user_study_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_study_date DATE,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  total_cards_reviewed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_study_streaks ENABLE ROW LEVEL SECURITY;

-- Users can read their own streaks
CREATE POLICY "Users can view own study streaks"
  ON user_study_streaks FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own streaks
CREATE POLICY "Users can insert own study streaks"
  ON user_study_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own streaks
CREATE POLICY "Users can update own study streaks"
  ON user_study_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_study_streaks_user_id ON user_study_streaks(user_id);
