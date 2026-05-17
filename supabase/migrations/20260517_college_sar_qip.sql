-- ============================================================
-- College SAR + QIP — Self-Assessment Report + Quality Improvement Plan
-- ============================================================
-- ELE-922 (G2) — SAR auto-generation
-- ELE-923 (G3) — QIP tracker
--
-- The SAR is the annual Ofsted-aligned self-assessment narrative
-- (Quality of Education / Behaviour & Attitudes / Personal Development /
-- Leadership & Management + Apprenticeships lens). The QIP records the
-- improvement actions that flow out of each SAR finding.
-- ============================================================

-- ============================================================
-- 1. college_sar_drafts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_sar_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL,                  -- e.g. '2025-26'
  title TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'in_review', 'approved', 'archived')),
  generated_by UUID,
  approved_by UUID,
  approved_at TIMESTAMPTZ,

  -- Headline narrative
  overall_summary TEXT,
  strengths TEXT[] DEFAULT '{}',
  areas_for_improvement TEXT[] DEFAULT '{}',

  -- Per-judgement bodies. Each is a JSONB object:
  --   { rag, summary, narrative, evidence: [...], gaps: [...] }
  judgement_quality_of_education JSONB,
  judgement_behaviour_attitudes JSONB,
  judgement_personal_development JSONB,
  judgement_leadership_management JSONB,
  judgement_apprenticeships JSONB,

  -- Snapshot of the input data at generation time, so the SAR is
  -- reproducible even if the underlying signals change later.
  source_signals JSONB,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sar_drafts_college_id ON public.college_sar_drafts(college_id);
CREATE INDEX IF NOT EXISTS idx_sar_drafts_year ON public.college_sar_drafts(academic_year);
CREATE INDEX IF NOT EXISTS idx_sar_drafts_status ON public.college_sar_drafts(status);

ALTER TABLE public.college_sar_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sar_drafts_select" ON public.college_sar_drafts
  FOR SELECT USING (_ch_same_college(college_id));

CREATE POLICY "sar_drafts_insert" ON public.college_sar_drafts
  FOR INSERT WITH CHECK (_ch_same_college(college_id));

CREATE POLICY "sar_drafts_update" ON public.college_sar_drafts
  FOR UPDATE USING (_ch_same_college(college_id));

CREATE POLICY "sar_drafts_delete" ON public.college_sar_drafts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_sar_drafts.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- ============================================================
-- 2. college_qip_actions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_qip_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  sar_draft_id UUID REFERENCES public.college_sar_drafts(id) ON DELETE SET NULL,

  judgement_key TEXT NOT NULL
    CHECK (judgement_key IN (
      'quality_of_education',
      'behaviour_and_attitudes',
      'personal_development',
      'leadership_and_management',
      'apprenticeships',
      'cross_cutting'
    )),

  title TEXT NOT NULL,
  description TEXT,
  rationale TEXT,                             -- the SAR finding this came from

  owner_staff_id UUID REFERENCES public.college_staff(id) ON DELETE SET NULL,
  target_date DATE,
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'in_progress', 'blocked', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('urgent', 'high', 'medium', 'low')),
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),

  evidence_links TEXT[] DEFAULT '{}',
  outcome_notes TEXT,

  created_by UUID,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_qip_actions_college_id ON public.college_qip_actions(college_id);
CREATE INDEX IF NOT EXISTS idx_qip_actions_sar_id ON public.college_qip_actions(sar_draft_id);
CREATE INDEX IF NOT EXISTS idx_qip_actions_status ON public.college_qip_actions(status);
CREATE INDEX IF NOT EXISTS idx_qip_actions_owner ON public.college_qip_actions(owner_staff_id);
CREATE INDEX IF NOT EXISTS idx_qip_actions_target_date ON public.college_qip_actions(target_date);

ALTER TABLE public.college_qip_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "qip_actions_select" ON public.college_qip_actions
  FOR SELECT USING (_ch_same_college(college_id));

CREATE POLICY "qip_actions_insert" ON public.college_qip_actions
  FOR INSERT WITH CHECK (_ch_same_college(college_id));

CREATE POLICY "qip_actions_update" ON public.college_qip_actions
  FOR UPDATE USING (_ch_same_college(college_id));

CREATE POLICY "qip_actions_delete" ON public.college_qip_actions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_qip_actions.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- ============================================================
-- 3. updated_at triggers (reuse moddatetime if available, else
--    define a small inline function)
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sar_drafts_updated_at ON public.college_sar_drafts;
CREATE TRIGGER trg_sar_drafts_updated_at
  BEFORE UPDATE ON public.college_sar_drafts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_qip_actions_updated_at ON public.college_qip_actions;
CREATE TRIGGER trg_qip_actions_updated_at
  BEFORE UPDATE ON public.college_qip_actions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
