-- AM2 adaptive drill — per-user per-regulation attempt log + SR scheduler.
--
-- Why this exists:
-- Static MCQ banks treat every answer the same. Apprentices end up re-
-- drilling regs they already know cold while the ones they got wrong
-- while feeling certain quietly stay broken until AM2 day.
--
-- This table is the memory layer for the adaptive drill. Every time a
-- BS 7671 quiz reveals an answer we upsert a row keyed (user_id,
-- regulation_id). The interval scheduler pushes well-answered regs out
-- in time and pulls poorly-answered ones forward, so the drill mode
-- always surfaces the most-bang-for-buck reg to practise next.
--
-- Schedule is an SM-2 variant. Confidence drives the ease factor:
--   right + certain  → interval × 2.5 (locked in, push far out)
--   right + likely   → interval × 2.0
--   right + guess    → interval × 1.5 (lucky — don't trust it)
--   wrong (any conf) → interval = 1 day, incorrect_streak +=1
--
-- The priority signal for drill selection is derived at read time from
-- {last_correct, last_confidence, next_review_at, incorrect_streak}.

CREATE TABLE IF NOT EXISTS am2_reg_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  regulation_id UUID NOT NULL REFERENCES bs7671_regulations(id) ON DELETE CASCADE,
  /* Denormalised for fast display + queries without a join when listing
     attempts. Stays in sync via the upsert path. */
  reg_number TEXT NOT NULL,

  /* Latest attempt outcome — overwritten on each upsert. */
  last_correct BOOLEAN NOT NULL,
  last_confidence TEXT CHECK (last_confidence IN ('guess', 'likely', 'certain')),
  last_asked_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  /* Aggregates across all attempts. */
  attempt_count INTEGER NOT NULL DEFAULT 1,
  correct_streak INTEGER NOT NULL DEFAULT 0,
  incorrect_streak INTEGER NOT NULL DEFAULT 0,

  /* SR scheduler state. */
  ease_factor NUMERIC(3,2) NOT NULL DEFAULT 2.50,
  interval_days INTEGER NOT NULL DEFAULT 1,
  next_review_at TIMESTAMPTZ NOT NULL DEFAULT now() + interval '1 day',

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, regulation_id)
);

-- Fast drill-priority lookups: user × overdue, user × recently wrong.
CREATE INDEX IF NOT EXISTS idx_am2_reg_attempts_user_review
  ON am2_reg_attempts (user_id, next_review_at);

-- Fast "regs user has answered" listing on the dashboard.
CREATE INDEX IF NOT EXISTS idx_am2_reg_attempts_user_asked
  ON am2_reg_attempts (user_id, last_asked_at DESC);

ALTER TABLE am2_reg_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own reg attempts"
  ON am2_reg_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own reg attempts"
  ON am2_reg_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reg attempts"
  ON am2_reg_attempts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION am2_reg_attempts_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_am2_reg_attempts_updated_at
  BEFORE UPDATE ON am2_reg_attempts
  FOR EACH ROW
  EXECUTE FUNCTION am2_reg_attempts_set_updated_at();

COMMENT ON TABLE am2_reg_attempts IS
  'Per-user per-BS7671-regulation attempt log + spaced-repetition scheduler for AM2 adaptive drill mode.';
