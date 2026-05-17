-- ============================================================
-- College Mastery Loop — auto-AC-sign-off proposals
-- ============================================================
-- ELE-906 (B11). When a learner passes evidence (quiz, OTJ, portfolio)
-- at or above the college's mastery threshold, queue an AC sign-off
-- proposal for the tutor to approve in one tap. Threshold is per-college.
-- ============================================================

-- 1. Mastery threshold setting (defaults to 80%)
ALTER TABLE public.college_settings
  ADD COLUMN IF NOT EXISTS mastery_threshold_pct INTEGER NOT NULL DEFAULT 80
    CHECK (mastery_threshold_pct BETWEEN 50 AND 100);

ALTER TABLE public.college_settings
  ADD COLUMN IF NOT EXISTS mastery_auto_approve BOOLEAN NOT NULL DEFAULT false;

-- 2. AC sign-off proposals queue
CREATE TABLE IF NOT EXISTS public.college_ac_signoff_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id UUID NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.college_students(id) ON DELETE CASCADE,
  ac_id UUID NOT NULL,
  ac_code TEXT,
  ac_title TEXT,

  evidence_kind TEXT NOT NULL
    CHECK (evidence_kind IN ('quiz_attempt', 'otj_entry', 'portfolio_item', 'observation', 'manual')),
  evidence_id UUID,
  score_pct NUMERIC(5,2),
  threshold_pct INTEGER,

  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'auto_approved', 'expired')),
  decided_by UUID,
  decided_at TIMESTAMPTZ,
  decision_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ac_signoff_college ON public.college_ac_signoff_proposals(college_id);
CREATE INDEX IF NOT EXISTS idx_ac_signoff_student ON public.college_ac_signoff_proposals(student_id);
CREATE INDEX IF NOT EXISTS idx_ac_signoff_status ON public.college_ac_signoff_proposals(status);
CREATE UNIQUE INDEX IF NOT EXISTS uq_ac_signoff_proposal
  ON public.college_ac_signoff_proposals (student_id, ac_id, evidence_kind, evidence_id)
  WHERE evidence_id IS NOT NULL;

ALTER TABLE public.college_ac_signoff_proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ac_signoff_select" ON public.college_ac_signoff_proposals
  FOR SELECT USING (
    _ch_same_college(college_id)
    OR EXISTS (
      SELECT 1 FROM college_students s
      WHERE s.id = student_id AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "ac_signoff_insert" ON public.college_ac_signoff_proposals
  FOR INSERT WITH CHECK (_ch_same_college(college_id));

CREATE POLICY "ac_signoff_update" ON public.college_ac_signoff_proposals
  FOR UPDATE USING (_ch_same_college(college_id));

CREATE POLICY "ac_signoff_delete" ON public.college_ac_signoff_proposals
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_ac_signoff_proposals.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

DROP TRIGGER IF EXISTS trg_ac_signoff_updated_at ON public.college_ac_signoff_proposals;
CREATE TRIGGER trg_ac_signoff_updated_at
  BEFORE UPDATE ON public.college_ac_signoff_proposals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. RPC: propose AC sign-off from an evidence row
-- Idempotent — if a proposal for the same evidence row exists, returns its id.
CREATE OR REPLACE FUNCTION public.propose_ac_signoff(
  p_student_id UUID,
  p_ac_id UUID,
  p_ac_code TEXT,
  p_ac_title TEXT,
  p_evidence_kind TEXT,
  p_evidence_id UUID,
  p_score_pct NUMERIC
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_college_id UUID;
  v_threshold INTEGER;
  v_auto BOOLEAN;
  v_proposal_id UUID;
  v_status TEXT;
BEGIN
  SELECT college_id INTO v_college_id FROM college_students WHERE id = p_student_id;
  IF v_college_id IS NULL THEN
    RAISE EXCEPTION 'student not found';
  END IF;

  SELECT mastery_threshold_pct, mastery_auto_approve
    INTO v_threshold, v_auto
    FROM college_settings
    WHERE college_id = v_college_id
    LIMIT 1;
  v_threshold := COALESCE(v_threshold, 80);
  v_auto := COALESCE(v_auto, false);

  IF p_score_pct < v_threshold THEN
    RETURN NULL;   -- below threshold, no proposal
  END IF;

  v_status := CASE WHEN v_auto THEN 'auto_approved' ELSE 'pending' END;

  -- Idempotent insert keyed on (student_id, ac_id, evidence_kind, evidence_id)
  INSERT INTO college_ac_signoff_proposals (
    college_id,
    student_id,
    ac_id,
    ac_code,
    ac_title,
    evidence_kind,
    evidence_id,
    score_pct,
    threshold_pct,
    status,
    decided_by,
    decided_at
  )
  VALUES (
    v_college_id,
    p_student_id,
    p_ac_id,
    p_ac_code,
    p_ac_title,
    p_evidence_kind,
    p_evidence_id,
    p_score_pct,
    v_threshold,
    v_status,
    CASE WHEN v_auto THEN auth.uid() ELSE NULL END,
    CASE WHEN v_auto THEN now() ELSE NULL END
  )
  ON CONFLICT (student_id, ac_id, evidence_kind, evidence_id) WHERE evidence_id IS NOT NULL
  DO UPDATE SET
    score_pct = EXCLUDED.score_pct,
    threshold_pct = EXCLUDED.threshold_pct,
    updated_at = now()
  RETURNING id INTO v_proposal_id;

  RETURN v_proposal_id;
END;
$$;

-- 4. RPC: decide a proposal (approve / reject)
CREATE OR REPLACE FUNCTION public.decide_ac_signoff(
  p_proposal_id UUID,
  p_status TEXT,
  p_notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_college_id UUID;
  v_user_role TEXT;
BEGIN
  IF p_status NOT IN ('approved', 'rejected') THEN
    RAISE EXCEPTION 'p_status must be approved or rejected';
  END IF;

  SELECT college_id INTO v_college_id FROM college_ac_signoff_proposals WHERE id = p_proposal_id;
  IF v_college_id IS NULL THEN
    RAISE EXCEPTION 'proposal not found';
  END IF;

  SELECT college_role INTO v_user_role FROM profiles WHERE id = auth.uid();
  IF v_user_role NOT IN ('tutor', 'admin', 'head_of_department', 'iqa') THEN
    RAISE EXCEPTION 'only college staff can decide proposals';
  END IF;

  UPDATE college_ac_signoff_proposals
    SET status = p_status,
        decided_by = auth.uid(),
        decided_at = now(),
        decision_notes = p_notes
    WHERE id = p_proposal_id;
END;
$$;
