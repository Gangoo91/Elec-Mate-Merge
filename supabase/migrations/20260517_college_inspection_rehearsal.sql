-- ============================================================
-- College AI Inspection Rehearsal
-- ============================================================
-- ELE-921 (G1). Logs Mate-as-inspector sessions. A session is a chat:
-- inspector asks probing Ofsted-style questions, the tutor answers, AI
-- grades each turn. Used as a rehearsal tool before a real visit.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.college_inspection_rehearsals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  scenario TEXT NOT NULL DEFAULT 'general'
    CHECK (scenario IN (
      'general',
      'quality_of_education',
      'behaviour_and_attitudes',
      'personal_development',
      'leadership_and_management',
      'apprenticeships',
      'safeguarding'
    )),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'complete', 'abandoned')),

  -- chat history: [{ role, content, grade?, feedback? }, ...]
  turns JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- After enough turns, AI gives an overall verdict
  overall_verdict TEXT,
  verdict_summary TEXT,
  strengths TEXT[],
  weaknesses TEXT[],

  -- Snapshot of college signals at session start
  source_signals JSONB,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rehearsals_college ON public.college_inspection_rehearsals(college_id);
CREATE INDEX IF NOT EXISTS idx_rehearsals_user ON public.college_inspection_rehearsals(user_id);
CREATE INDEX IF NOT EXISTS idx_rehearsals_status ON public.college_inspection_rehearsals(status);

ALTER TABLE public.college_inspection_rehearsals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rehearsals_select" ON public.college_inspection_rehearsals
  FOR SELECT USING (
    _ch_same_college(college_id)
    AND (user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_inspection_rehearsals.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    ))
  );

CREATE POLICY "rehearsals_insert" ON public.college_inspection_rehearsals
  FOR INSERT WITH CHECK (
    _ch_same_college(college_id)
    AND user_id = auth.uid()
  );

CREATE POLICY "rehearsals_update" ON public.college_inspection_rehearsals
  FOR UPDATE USING (
    _ch_same_college(college_id)
    AND user_id = auth.uid()
  );

CREATE POLICY "rehearsals_delete" ON public.college_inspection_rehearsals
  FOR DELETE USING (
    _ch_same_college(college_id)
    AND user_id = auth.uid()
  );

DROP TRIGGER IF EXISTS trg_rehearsals_updated_at ON public.college_inspection_rehearsals;
CREATE TRIGGER trg_rehearsals_updated_at
  BEFORE UPDATE ON public.college_inspection_rehearsals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
