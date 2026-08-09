-- Study Centre leaderboard: let a learner see their own position.
--
-- `get_study_leaderboard` returns `LIMIT 50`. With ~204 eligible learners that
-- means roughly three quarters of them are absent from the payload entirely,
-- so the page could not report their rank and fell back to telling them to
-- "take a quiz to join the board" — while they were sitting on hundreds of XP
-- and a quiz history. The board reported a position it then refused to show.
--
-- This returns just the caller's row, so the top-50 fetch stays small and the
-- rank is exact regardless of how far down the board someone is.
--
-- Ranked by XP for the window, matching `get_study_leaderboard`'s ORDER BY, so
-- the number here agrees with the position in that list. Eligibility is a copy
-- of the same WHERE clause — if the two ever drift the rank stops matching the
-- board, so they are kept adjacent deliberately.
--
-- SECURITY DEFINER because ranking requires counting rows for users the caller
-- cannot see under RLS. It deliberately takes NO user_id: the subject is always
-- auth.uid(), so there is no parameter that could be pointed at somebody else.
-- Granted to `authenticated` only — `anon` has no auth.uid() and no business
-- here.

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
  avatar text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cutoff_date timestamptz;
  me uuid := auth.uid();
BEGIN
  IF me IS NULL THEN
    RETURN;
  END IF;

  IF time_filter = 'week' THEN
    cutoff_date := now() - interval '7 days';
  ELSIF time_filter = 'month' THEN
    cutoff_date := now() - interval '30 days';
  ELSE
    cutoff_date := '1970-01-01'::timestamptz;
  END IF;

  RETURN QUERY
  WITH board AS (
    SELECT
      p.id,
      p.full_name,
      p.avatar_url,
      CASE WHEN time_filter = 'all' THEN COALESCE(xps.total_xp, 0)
           ELSE COALESCE(al.period_xp, 0)
      END AS board_xp,
      COALESCE(s.current_streak, 0) AS streak,
      COALESCE(qr.cnt, 0::bigint) AS quiz_cnt,
      COALESCE(ROUND(qr.avg_pct, 1), 0::numeric) AS quiz_avg,
      COALESCE(a.cnt, 0::bigint) AS award_cnt
    FROM profiles p
    LEFT JOIN (
      SELECT cp2.user_id AS uid, COUNT(*) AS cnt
      FROM course_progress cp2
      WHERE cp2.completed = true AND cp2.last_accessed_at >= cutoff_date
      GROUP BY cp2.user_id
    ) cp ON cp.uid = p.id
    LEFT JOIN user_xp_summary xps ON xps.user_id = p.id
    LEFT JOIN (
      SELECT al2.user_id AS uid, SUM(al2.xp_earned)::integer AS period_xp
      FROM learning_activity_log al2
      WHERE al2.created_at >= cutoff_date
      GROUP BY al2.user_id
    ) al ON al.uid = p.id
    LEFT JOIN user_study_streaks s ON s.user_id = p.id
    LEFT JOIN (
      SELECT qr2.user_id AS uid, COUNT(*) AS cnt, AVG(qr2.percentage) AS avg_pct
      FROM quiz_results qr2
      WHERE qr2.completed_at >= cutoff_date
      GROUP BY qr2.user_id
    ) qr ON qr.uid = p.id
    LEFT JOIN (
      SELECT a2.user_id AS uid, COUNT(*) AS cnt
      FROM user_achievements a2
      WHERE a2.unlocked_at >= cutoff_date
      GROUP BY a2.user_id
    ) a ON a.uid = p.id
    WHERE p.leaderboard_visible = true
      AND p.full_name IS NOT NULL
      AND (
        CASE WHEN time_filter = 'all' THEN COALESCE(xps.total_xp, 0) > 0
             ELSE COALESCE(al.period_xp, 0) > 0
        END
        OR COALESCE(cp.cnt, 0) > 0
        OR COALESCE(qr.cnt, 0) > 0
        OR COALESCE(s.current_streak, 0) > 0
      )
  ),
  ranked AS (
    SELECT
      b.*,
      -- Same tie-breaking shape as a plain ORDER BY board_xp DESC: everyone on
      -- the same XP gets the same rank rather than an arbitrary one.
      (SELECT COUNT(*) + 1 FROM board b2 WHERE b2.board_xp > b.board_xp) AS pos,
      (SELECT COUNT(*) FROM board) AS total
    FROM board b
  )
  SELECT
    r.pos,
    r.total,
    r.board_xp,
    r.streak,
    r.quiz_cnt,
    r.quiz_avg,
    r.award_cnt,
    r.full_name,
    r.avatar_url
  FROM ranked r
  WHERE r.id = me;
END;
$$;

REVOKE ALL ON FUNCTION public.get_study_leaderboard_me(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_study_leaderboard_me(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_study_leaderboard_me(text) TO authenticated;

COMMENT ON FUNCTION public.get_study_leaderboard_me(text) IS
  'Caller''s own leaderboard position for a time window. Subject is always auth.uid() — no user_id parameter by design. Ranking mirrors get_study_leaderboard.';
