-- Leaderboard: "learners near you" and week-on-week movement.
--
-- Two things this adds, and one it fixes.
--
-- 1. `study_board(time_filter)` — the eligible-learner query, extracted.
--    `get_study_leaderboard` and `get_study_leaderboard_me` each carried their
--    own copy of a 40-line FROM/JOIN/WHERE, and a comment in the latter warned
--    that if the two drifted the rank would stop matching the list. Three
--    copies would have been worse, so there is now one.
--
-- 2. `get_study_leaderboard_around_me` — the handful of learners either side of
--    you. A top-10 board is no use to someone sitting 93rd: the people they can
--    realistically catch are invisible. This returns the neighbours.
--
-- 3. Movement, done with snapshots rather than arithmetic.
--    The obvious shortcut is to reconstruct last week's XP by subtracting
--    recent `learning_activity_log` rows from the running total. That does not
--    hold: only 87 of 204 learners have their log summing to their
--    `user_xp_summary.total_xp`, with an average gap of 195 XP across the other
--    117. Movement built on it would be fiction for well over half the users.
--    So ranks are snapshotted daily and movement is measured against a real
--    earlier observation. It reads as "no change" until a week of snapshots
--    exists, which is honest — inventing a number would not be.
--
-- Ranking switches to row_number() so every position is unique. Ties previously
-- shared a rank, which is fine for display but makes "the three above you"
-- ambiguous.

-- ─────────────────────────────────────────────────────────────────────────
-- Shared board
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.study_board(time_filter text)
RETURNS TABLE (
  uid uuid,
  display_name text,
  avatar text,
  board_xp integer,
  streak integer,
  quizzes bigint,
  quiz_avg numeric,
  award_count bigint,
  pos bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH cutoff AS (
    SELECT CASE
             WHEN time_filter = 'week'  THEN now() - interval '7 days'
             WHEN time_filter = 'month' THEN now() - interval '30 days'
             ELSE '1970-01-01'::timestamptz
           END AS d
  ),
  base AS (
    SELECT
      p.id,
      p.full_name,
      p.avatar_url,
      CASE WHEN time_filter = 'all' THEN COALESCE(xps.total_xp, 0)
           ELSE COALESCE(al.period_xp, 0)
      END AS board_xp,
      COALESCE(s.current_streak, 0) AS streak,
      COALESCE(qr.cnt, 0::bigint) AS quizzes,
      COALESCE(ROUND(qr.avg_pct, 1), 0::numeric) AS quiz_avg,
      COALESCE(a.cnt, 0::bigint) AS award_count,
      COALESCE(cp.cnt, 0::bigint) AS sections
    FROM profiles p
    CROSS JOIN cutoff c
    LEFT JOIN (
      SELECT cp2.user_id AS uid, COUNT(*) AS cnt
      FROM course_progress cp2, cutoff c2
      WHERE cp2.completed = true AND cp2.last_accessed_at >= c2.d
      GROUP BY cp2.user_id
    ) cp ON cp.uid = p.id
    LEFT JOIN user_xp_summary xps ON xps.user_id = p.id
    LEFT JOIN (
      SELECT al2.user_id AS uid, SUM(al2.xp_earned)::integer AS period_xp
      FROM learning_activity_log al2, cutoff c2
      WHERE al2.created_at >= c2.d
      GROUP BY al2.user_id
    ) al ON al.uid = p.id
    LEFT JOIN user_study_streaks s ON s.user_id = p.id
    LEFT JOIN (
      SELECT qr2.user_id AS uid, COUNT(*) AS cnt, AVG(qr2.percentage) AS avg_pct
      FROM quiz_results qr2, cutoff c2
      WHERE qr2.completed_at >= c2.d
      GROUP BY qr2.user_id
    ) qr ON qr.uid = p.id
    LEFT JOIN (
      SELECT a2.user_id AS uid, COUNT(*) AS cnt
      FROM user_achievements a2, cutoff c2
      WHERE a2.unlocked_at >= c2.d
      GROUP BY a2.user_id
    ) a ON a.uid = p.id
    WHERE p.leaderboard_visible = true
      AND p.full_name IS NOT NULL
  )
  SELECT
    b.id,
    b.full_name,
    b.avatar_url,
    b.board_xp,
    b.streak,
    b.quizzes,
    b.quiz_avg,
    b.award_count,
    ROW_NUMBER() OVER (ORDER BY b.board_xp DESC, b.id) AS pos
  FROM base b
  WHERE b.board_xp > 0 OR b.sections > 0 OR b.quizzes > 0 OR b.streak > 0;
$$;

REVOKE ALL ON FUNCTION public.study_board(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.study_board(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.study_board(text) TO authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- Rank snapshots — the only honest basis for movement
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.study_rank_snapshots (
  user_id uuid NOT NULL,
  captured_on date NOT NULL DEFAULT current_date,
  rank integer NOT NULL,
  xp integer NOT NULL,
  PRIMARY KEY (user_id, captured_on)
);

CREATE INDEX IF NOT EXISTS idx_study_rank_snapshots_date
  ON public.study_rank_snapshots (captured_on DESC);

ALTER TABLE public.study_rank_snapshots ENABLE ROW LEVEL SECURITY;

-- Readable only through the SECURITY DEFINER functions below; no direct client
-- access, so nobody can enumerate the whole board's history.
DROP POLICY IF EXISTS "own snapshots readable" ON public.study_rank_snapshots;
CREATE POLICY "own snapshots readable" ON public.study_rank_snapshots
  FOR SELECT USING (auth.uid() = user_id);

COMMENT ON TABLE public.study_rank_snapshots IS
  'Daily all-time leaderboard rank per learner. Written by snapshot_study_ranks(); the basis for week-on-week movement.';

CREATE OR REPLACE FUNCTION public.snapshot_study_ranks()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  written integer;
BEGIN
  INSERT INTO public.study_rank_snapshots (user_id, captured_on, rank, xp)
  SELECT b.uid, current_date, b.pos::integer, b.board_xp
  FROM public.study_board('all') b
  ON CONFLICT (user_id, captured_on) DO UPDATE
    SET rank = EXCLUDED.rank, xp = EXCLUDED.xp;
  GET DIAGNOSTICS written = ROW_COUNT;

  -- A year of daily rows per learner is plenty for any trend we would show.
  DELETE FROM public.study_rank_snapshots WHERE captured_on < current_date - 365;

  RETURN written;
END;
$$;

REVOKE ALL ON FUNCTION public.snapshot_study_ranks() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.snapshot_study_ranks() FROM anon;
REVOKE ALL ON FUNCTION public.snapshot_study_ranks() FROM authenticated;

-- Seed today so the mechanism is live from now rather than from the first cron
-- firing. Movement stays null until a snapshot ~7 days old exists.
SELECT public.snapshot_study_ranks();

-- Idempotent: re-running the migration must not error on an existing job.
DO $sched$
BEGIN
  PERFORM cron.unschedule('study-rank-snapshot-daily');
EXCEPTION WHEN OTHERS THEN
  NULL;
END;
$sched$;

SELECT cron.schedule(
  'study-rank-snapshot-daily',
  '15 2 * * *',
  $cron$SELECT public.snapshot_study_ranks();$cron$
);

-- ─────────────────────────────────────────────────────────────────────────
-- My rank, now with movement
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_study_leaderboard_me(time_filter text)
RETURNS TABLE (
  my_rank bigint,
  total_learners bigint,
  xp integer,
  current_streak integer,
  quizzes_taken bigint,
  avg_quiz_score numeric,
  awards bigint,
  display_name text,
  avatar text,
  rank_7d_ago integer,
  movement integer
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me uuid := auth.uid();
BEGIN
  IF me IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH board AS (SELECT * FROM public.study_board(time_filter)),
  prior AS (
    -- Nearest snapshot at least 7 days old. Not "exactly 7 days" — a missed
    -- cron run would otherwise silently blank the movement for everyone.
    SELECT s.rank
    FROM public.study_rank_snapshots s
    WHERE s.user_id = me AND s.captured_on <= current_date - 7
    ORDER BY s.captured_on DESC
    LIMIT 1
  )
  SELECT
    b.pos,
    (SELECT COUNT(*) FROM board),
    b.board_xp,
    b.streak,
    b.quizzes,
    b.quiz_avg,
    b.award_count,
    b.display_name,
    b.avatar,
    (SELECT p.rank FROM prior p),
    -- Positive means climbed: rank 40 → 12 is +28 places.
    CASE WHEN (SELECT p.rank FROM prior p) IS NULL THEN NULL
         ELSE (SELECT p.rank FROM prior p) - b.pos::integer
    END
  FROM board b
  WHERE b.uid = me;
END;
$$;

REVOKE ALL ON FUNCTION public.get_study_leaderboard_me(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_study_leaderboard_me(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_study_leaderboard_me(text) TO authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- Learners near you
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_study_leaderboard_around_me(
  time_filter text,
  span integer DEFAULT 3
)
RETURNS TABLE (
  uid uuid,
  display_name text,
  avatar text,
  xp integer,
  current_streak integer,
  quizzes_taken bigint,
  avg_quiz_score numeric,
  awards bigint,
  pos bigint,
  is_me boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  me uuid := auth.uid();
  my_pos bigint;
  window_size integer := LEAST(GREATEST(span, 1), 10);
BEGIN
  IF me IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  WITH board AS (SELECT * FROM public.study_board(time_filter)),
  anchor AS (SELECT b.pos FROM board b WHERE b.uid = me)
  SELECT
    b.uid, b.display_name, b.avatar, b.board_xp, b.streak,
    b.quizzes, b.quiz_avg, b.award_count, b.pos, (b.uid = me)
  FROM board b, anchor a
  WHERE b.pos BETWEEN a.pos - window_size AND a.pos + window_size
  ORDER BY b.pos;
END;
$$;

REVOKE ALL ON FUNCTION public.get_study_leaderboard_around_me(text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_study_leaderboard_around_me(text, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_study_leaderboard_around_me(text, integer) TO authenticated;
