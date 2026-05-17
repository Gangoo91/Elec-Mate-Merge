-- ============================================================
-- College Tripartite Reviews — apprentice + tutor + employer
-- ============================================================
-- ELE-930 (J1). Schedule and capture 3-way progress reviews.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.college_tripartite_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.college_students(id) ON DELETE CASCADE,

  tutor_staff_id UUID REFERENCES public.college_staff(id) ON DELETE SET NULL,
  employer_contact_name TEXT,
  employer_contact_email TEXT,
  employer_contact_phone TEXT,

  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT,                                 -- 'workplace' | 'college' | 'video' | free text
  meeting_url TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show')),

  agenda JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- agenda items: [{ topic, owner, time_minutes }]

  outcomes JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- outcomes shape:
  --   {
  --     summary: text,
  --     progress_notes: text,
  --     ilp_updates: text,
  --     otj_review: text,
  --     safeguarding_check: text,
  --     wellbeing_check: text,
  --     concerns: text,
  --     agreed_actions: [{ action, owner, target_date }]
  --   }

  signatures JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- signatures shape:
  --   { student_signed_at, tutor_signed_at, employer_signed_at,
  --     student_name, tutor_name, employer_name }

  completed_at TIMESTAMPTZ,
  cancelled_reason TEXT,

  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tripartite_college ON public.college_tripartite_reviews(college_id);
CREATE INDEX IF NOT EXISTS idx_tripartite_student ON public.college_tripartite_reviews(student_id);
CREATE INDEX IF NOT EXISTS idx_tripartite_status ON public.college_tripartite_reviews(status);
CREATE INDEX IF NOT EXISTS idx_tripartite_scheduled_at ON public.college_tripartite_reviews(scheduled_at);

ALTER TABLE public.college_tripartite_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tripartite_select" ON public.college_tripartite_reviews
  FOR SELECT USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "tripartite_insert" ON public.college_tripartite_reviews
  FOR INSERT WITH CHECK (_ch_same_college(college_id));

CREATE POLICY "tripartite_update" ON public.college_tripartite_reviews
  FOR UPDATE USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "tripartite_delete" ON public.college_tripartite_reviews
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_tripartite_reviews.college_id
      AND p.college_role IN ('admin', 'head_of_department', 'tutor')
    )
  );

DROP TRIGGER IF EXISTS trg_tripartite_updated_at ON public.college_tripartite_reviews;
CREATE TRIGGER trg_tripartite_updated_at
  BEFORE UPDATE ON public.college_tripartite_reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
