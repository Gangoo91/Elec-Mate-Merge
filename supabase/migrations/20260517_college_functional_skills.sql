-- ============================================================
-- College Functional Skills tracker (Maths + English gateway)
-- ============================================================
-- ELE-933 (K1). Tracks FS qualifications a learner needs (or is exempt
-- from) before EPA gateway. Required for the Level 2 / 3 Electrical
-- Apprenticeship Standards.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.college_functional_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.college_students(id) ON DELETE CASCADE,

  subject TEXT NOT NULL CHECK (subject IN ('maths', 'english')),
  -- We collapse english into one record; tutors usually track FS English as a single L1/L2 qual.
  level TEXT CHECK (level IN ('entry_1', 'entry_2', 'entry_3', 'level_1', 'level_2')),

  status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (status IN (
      'exempt',
      'not_started',
      'in_progress',
      'pending_results',
      'passed',
      'failed',
      'resit'
    )),
  exemption_reason TEXT,                 -- e.g. 'GCSE 4/C+', 'overseas equivalent'

  awarding_body TEXT,                    -- 'City & Guilds' | 'Pearson Edexcel' | 'Open Awards' | etc.
  exam_date DATE,
  result_date DATE,
  result_score INTEGER,
  certificate_url TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE (student_id, subject)
);

CREATE INDEX IF NOT EXISTS idx_fs_college ON public.college_functional_skills(college_id);
CREATE INDEX IF NOT EXISTS idx_fs_student ON public.college_functional_skills(student_id);
CREATE INDEX IF NOT EXISTS idx_fs_status ON public.college_functional_skills(status);

ALTER TABLE public.college_functional_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "fs_select" ON public.college_functional_skills
  FOR SELECT USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "fs_insert" ON public.college_functional_skills
  FOR INSERT WITH CHECK (_ch_same_college(college_id));

CREATE POLICY "fs_update" ON public.college_functional_skills
  FOR UPDATE USING (_ch_same_college(college_id));

CREATE POLICY "fs_delete" ON public.college_functional_skills
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_functional_skills.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

DROP TRIGGER IF EXISTS trg_fs_updated_at ON public.college_functional_skills;
CREATE TRIGGER trg_fs_updated_at
  BEFORE UPDATE ON public.college_functional_skills
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Gateway-ready helper view
CREATE OR REPLACE VIEW public.college_fs_gateway_status AS
SELECT
  s.id AS student_id,
  s.college_id,
  s.name,
  COALESCE(maths.status, 'not_started') AS maths_status,
  COALESCE(eng.status, 'not_started') AS english_status,
  COALESCE(maths.level, 'level_2') AS maths_level,
  COALESCE(eng.level, 'level_2') AS english_level,
  (
    maths.status IN ('passed', 'exempt')
    AND eng.status IN ('passed', 'exempt')
  ) AS fs_gateway_clear,
  GREATEST(maths.exam_date, eng.exam_date) AS latest_exam_date
FROM public.college_students s
LEFT JOIN public.college_functional_skills maths
  ON maths.student_id = s.id AND maths.subject = 'maths'
LEFT JOIN public.college_functional_skills eng
  ON eng.student_id = s.id AND eng.subject = 'english'
WHERE s.status = 'Active';

GRANT SELECT ON public.college_fs_gateway_status TO authenticated;
