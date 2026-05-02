-- ELE-942 / Assessor pack — proper persistence for AC sign-off + IQA verdict
-- and a bridge table mapping (qualification, unit, ac) to evidence rules.

CREATE TABLE IF NOT EXISTS public.ac_signoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.college_students(id) ON DELETE CASCADE,
  qualification_code text NOT NULL,
  unit_code text NOT NULL,
  ac_code text NOT NULL,
  assessor_narrative text,
  assessor_verdict text CHECK (assessor_verdict IN ('not_yet','passed','referred')),
  assessor_signed_at timestamptz,
  assessor_signed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assessor_name_snapshot text,
  iqa_sampled_at timestamptz,
  iqa_sampled_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  iqa_name_snapshot text,
  iqa_verdict text CHECK (iqa_verdict IN ('confirmed','returned','not_sampled')),
  iqa_feedback text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, qualification_code, unit_code, ac_code)
);

CREATE INDEX IF NOT EXISTS idx_ac_signoffs_student ON public.ac_signoffs (student_id);
CREATE INDEX IF NOT EXISTS idx_ac_signoffs_assessor_signed_at
  ON public.ac_signoffs (assessor_signed_at) WHERE assessor_signed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_ac_signoffs_iqa_sampled_at
  ON public.ac_signoffs (iqa_sampled_at) WHERE iqa_sampled_at IS NOT NULL;

ALTER TABLE public.ac_signoffs ENABLE ROW LEVEL SECURITY;

CREATE POLICY ac_signoffs_select_college_staff ON public.ac_signoffs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.college_students cs
    JOIN public.college_staff st ON st.college_id = cs.college_id
    WHERE cs.id = ac_signoffs.student_id AND st.user_id = auth.uid() AND st.archived_at IS NULL
  ));
CREATE POLICY ac_signoffs_select_self ON public.ac_signoffs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.college_students cs
    WHERE cs.id = ac_signoffs.student_id AND cs.user_id = auth.uid()
  ));
CREATE POLICY ac_signoffs_write_college_staff ON public.ac_signoffs FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.college_students cs
    JOIN public.college_staff st ON st.college_id = cs.college_id
    WHERE cs.id = ac_signoffs.student_id AND st.user_id = auth.uid() AND st.archived_at IS NULL
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.college_students cs
    JOIN public.college_staff st ON st.college_id = cs.college_id
    WHERE cs.id = ac_signoffs.student_id AND st.user_id = auth.uid() AND st.archived_at IS NULL
  ));

CREATE OR REPLACE FUNCTION public.tg_ac_signoffs_touch_updated()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS ac_signoffs_touch ON public.ac_signoffs;
CREATE TRIGGER ac_signoffs_touch BEFORE UPDATE ON public.ac_signoffs
  FOR EACH ROW EXECUTE FUNCTION public.tg_ac_signoffs_touch_updated();

CREATE TABLE IF NOT EXISTS public.ac_evidence_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification_code text NOT NULL,
  unit_code text NOT NULL,
  ac_code text NOT NULL,
  required_codes text[] NOT NULL DEFAULT ARRAY[]::text[],
  quantity_required integer NOT NULL DEFAULT 1 CHECK (quantity_required > 0),
  is_mandatory boolean NOT NULL DEFAULT true,
  guidance text,
  example_description text,
  authored_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  authored_by_name text,
  source text NOT NULL DEFAULT 'awarding_body'
    CHECK (source IN ('awarding_body','college','ai_seed','tutor_override')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (qualification_code, unit_code, ac_code)
);

CREATE INDEX IF NOT EXISTS idx_ac_evidence_rules_qual
  ON public.ac_evidence_rules (qualification_code);

ALTER TABLE public.ac_evidence_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY ac_evidence_rules_select_all_authed ON public.ac_evidence_rules FOR SELECT
  TO authenticated USING (true);
CREATE POLICY ac_evidence_rules_write_college_staff ON public.ac_evidence_rules FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.college_staff WHERE user_id = auth.uid() AND archived_at IS NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.college_staff WHERE user_id = auth.uid() AND archived_at IS NULL));

DROP TRIGGER IF EXISTS ac_evidence_rules_touch ON public.ac_evidence_rules;
CREATE TRIGGER ac_evidence_rules_touch BEFORE UPDATE ON public.ac_evidence_rules
  FOR EACH ROW EXECUTE FUNCTION public.tg_ac_signoffs_touch_updated();

COMMENT ON TABLE public.ac_signoffs IS
  'Per-(student × qualification × unit × ac) assessor narrative + IQA verdict.';
COMMENT ON TABLE public.ac_evidence_rules IS
  'Per-(qualification × unit × ac) evidence-type requirements + tutor guidance.';
