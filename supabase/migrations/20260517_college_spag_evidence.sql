-- ============================================================
-- SpaG (Spelling, Punctuation & Grammar) evidence tracking
-- ============================================================
-- ELE-895 (A3). Records SpaG scores against any apprentice text
-- submission. Generic event table so quiz / OTJ / portfolio / reflection
-- can all log SpaG against the same model.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.college_spag_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.college_students(id) ON DELETE CASCADE,
  user_id UUID,                         -- the apprentice's auth.users id (in case student_id is null)

  source_kind TEXT NOT NULL CHECK (source_kind IN ('portfolio', 'otj', 'quiz', 'reflection', 'manual')),
  source_id UUID,
  source_text TEXT NOT NULL,

  spag_score INTEGER NOT NULL CHECK (spag_score BETWEEN 0 AND 100),
  issue_count INTEGER NOT NULL DEFAULT 0,
  issues JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- issues shape: [{ offset, length, kind: 'spelling'|'grammar'|'punctuation', original, suggestion, explanation }]

  level_descriptor TEXT,                -- 'distinction'|'merit'|'pass'|'developing'
  overall_feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_spag_college ON public.college_spag_checks(college_id);
CREATE INDEX IF NOT EXISTS idx_spag_student ON public.college_spag_checks(student_id);
CREATE INDEX IF NOT EXISTS idx_spag_source ON public.college_spag_checks(source_kind, source_id);
CREATE INDEX IF NOT EXISTS idx_spag_created_at ON public.college_spag_checks(created_at DESC);

ALTER TABLE public.college_spag_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "spag_checks_select" ON public.college_spag_checks
  FOR SELECT USING (
    _ch_same_college(college_id)
    OR user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "spag_checks_insert" ON public.college_spag_checks
  FOR INSERT WITH CHECK (
    _ch_same_college(college_id)
    OR user_id = auth.uid()
  );

CREATE POLICY "spag_checks_delete" ON public.college_spag_checks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_spag_checks.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- Per-learner rolling SpaG view for the dashboard
CREATE OR REPLACE VIEW public.college_student_spag_rollup AS
SELECT
  student_id,
  college_id,
  COUNT(*)::int AS check_count,
  ROUND(AVG(spag_score))::int AS avg_score_30d,
  MAX(created_at) AS last_check_at,
  COUNT(*) FILTER (WHERE spag_score >= 90)::int AS distinction_count,
  COUNT(*) FILTER (WHERE spag_score >= 75 AND spag_score < 90)::int AS merit_count,
  COUNT(*) FILTER (WHERE spag_score >= 60 AND spag_score < 75)::int AS pass_count,
  COUNT(*) FILTER (WHERE spag_score < 60)::int AS developing_count
FROM public.college_spag_checks
WHERE created_at >= now() - INTERVAL '90 days'
GROUP BY student_id, college_id;

GRANT SELECT ON public.college_student_spag_rollup TO authenticated;
