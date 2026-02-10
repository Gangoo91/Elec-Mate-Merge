-- User XP summary: cached totals for fast reads
CREATE TABLE user_xp_summary (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  total_xp integer DEFAULT 0,
  level integer DEFAULT 1,
  xp_today integer DEFAULT 0,
  xp_today_date date DEFAULT CURRENT_DATE,
  daily_goal integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_xp_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own xp summary"
  ON user_xp_summary FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own xp summary"
  ON user_xp_summary FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own xp summary"
  ON user_xp_summary FOR UPDATE
  USING (auth.uid() = user_id);
