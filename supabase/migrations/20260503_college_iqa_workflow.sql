-- College IQA Workflow — persistence layer
--
-- Adds the EQA checklist items table and brings the existing
-- college_iqa_findings + college_standardisation_meetings tables up to the
-- shape the new useIqaWorkflow hook expects (additive, non-destructive).
--
-- Tables touched:
--   college_iqa_findings              (existing — adds area, owner_staff_id, created_by)
--   college_standardisation_meetings  (existing — adds scheduled_at, duration_min,
--                                                 agenda, minutes, created_by, status)
--   college_iqa_eqa_checklist_items   (new)
--
-- All RLS is scoped to staff in the same college (via college_staff.user_id =
-- auth.uid() OR profiles.college_id match). Writes additionally require either
-- a college_role of 'admin'/'iqa'/'lead_iqa' on profiles, or any of the lead
-- flags on college_staff (is_quality_nominee), or the IQA qualification.

-- ============================================================
-- 1. Findings — additive columns
-- ============================================================
ALTER TABLE public.college_iqa_findings
  ADD COLUMN IF NOT EXISTS area text,
  ADD COLUMN IF NOT EXISTS owner_staff_id uuid REFERENCES public.college_staff(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS sample_id uuid REFERENCES public.college_iqa_samples(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_college_iqa_findings_college_status
  ON public.college_iqa_findings (college_id, status);
CREATE INDEX IF NOT EXISTS idx_college_iqa_findings_owner
  ON public.college_iqa_findings (owner_staff_id) WHERE owner_staff_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_college_iqa_findings_sample
  ON public.college_iqa_findings (sample_id) WHERE sample_id IS NOT NULL;

-- ============================================================
-- 2. Standardisation meetings — additive columns
-- ============================================================
ALTER TABLE public.college_standardisation_meetings
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS duration_min integer,
  ADD COLUMN IF NOT EXISTS agenda text,
  ADD COLUMN IF NOT EXISTS minutes text,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'scheduled',
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Backfill scheduled_at from legacy `date` column where missing
UPDATE public.college_standardisation_meetings
   SET scheduled_at = (date::timestamp AT TIME ZONE 'UTC')
 WHERE scheduled_at IS NULL AND date IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_college_std_meetings_college_when
  ON public.college_standardisation_meetings (college_id, scheduled_at DESC);

-- ============================================================
-- 3. EQA checklist items — new table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.college_iqa_eqa_checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id uuid NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  eqa_cycle text NOT NULL DEFAULT to_char(now(), 'YYYY'),
  item_label text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','in_progress','complete','not_applicable')),
  evidence_url text,
  notes text,
  sort_order integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  completed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_eqa_checklist_college_cycle
  ON public.college_iqa_eqa_checklist_items (college_id, eqa_cycle, sort_order);
CREATE INDEX IF NOT EXISTS idx_eqa_checklist_status
  ON public.college_iqa_eqa_checklist_items (college_id, status);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_set_updated_at_iqa_workflow()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_updated_at_eqa_checklist ON public.college_iqa_eqa_checklist_items;
CREATE TRIGGER trg_set_updated_at_eqa_checklist
  BEFORE UPDATE ON public.college_iqa_eqa_checklist_items
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at_iqa_workflow();

DROP TRIGGER IF EXISTS trg_set_updated_at_std_meetings ON public.college_standardisation_meetings;
CREATE TRIGGER trg_set_updated_at_std_meetings
  BEFORE UPDATE ON public.college_standardisation_meetings
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at_iqa_workflow();

-- ============================================================
-- 4. RLS — checklist items
-- ============================================================
ALTER TABLE public.college_iqa_eqa_checklist_items ENABLE ROW LEVEL SECURITY;

-- Helper: identifies whether the current user can write IQA workflow data
-- for a given college. Grants write access to:
--   * college_staff with is_quality_nominee=true
--   * college_staff whose iqa_qual is set (qualified IQA)
--   * profiles whose college_role is 'admin' or 'iqa' or 'lead_iqa'
CREATE OR REPLACE FUNCTION public.can_write_college_iqa(target_college uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.college_staff cs
    WHERE cs.user_id = auth.uid()
      AND cs.college_id = target_college
      AND cs.status = 'Active'
      AND (
        cs.is_quality_nominee = true
        OR cs.iqa_qual IS NOT NULL
        OR cs.role IN ('admin','head_of_department')
      )
  )
  OR EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.college_id = target_college
      AND COALESCE(p.college_role, '') IN ('admin','iqa','lead_iqa','quality_nominee')
  );
$$;

-- SELECT: any staff member at the same college can read
DROP POLICY IF EXISTS "College staff read EQA checklist" ON public.college_iqa_eqa_checklist_items;
CREATE POLICY "College staff read EQA checklist"
  ON public.college_iqa_eqa_checklist_items
  FOR SELECT
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff
      WHERE user_id = auth.uid() AND status = 'Active'
    )
  );

-- INSERT/UPDATE/DELETE: only IQAs / leads / admins
DROP POLICY IF EXISTS "IQA leads write EQA checklist" ON public.college_iqa_eqa_checklist_items;
CREATE POLICY "IQA leads write EQA checklist"
  ON public.college_iqa_eqa_checklist_items
  FOR ALL
  USING (public.can_write_college_iqa(college_id))
  WITH CHECK (public.can_write_college_iqa(college_id));

-- ============================================================
-- 5. Tighten RLS on existing IQA findings + meetings
-- ============================================================
-- Existing policies are ALL=read+write to any college staff. Split them so
-- writes require IQA/lead role; reads remain open to all college staff.

-- Findings
DROP POLICY IF EXISTS "College staff can manage IQA findings" ON public.college_iqa_findings;
DROP POLICY IF EXISTS "College staff read IQA findings" ON public.college_iqa_findings;
DROP POLICY IF EXISTS "IQA leads write IQA findings" ON public.college_iqa_findings;

CREATE POLICY "College staff read IQA findings"
  ON public.college_iqa_findings
  FOR SELECT
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff
      WHERE user_id = auth.uid() AND status = 'Active'
    )
  );

CREATE POLICY "IQA leads write IQA findings"
  ON public.college_iqa_findings
  FOR ALL
  USING (public.can_write_college_iqa(college_id))
  WITH CHECK (public.can_write_college_iqa(college_id));

-- Meetings
DROP POLICY IF EXISTS "College staff can manage standardisation meetings"
  ON public.college_standardisation_meetings;
DROP POLICY IF EXISTS "College staff read standardisation meetings"
  ON public.college_standardisation_meetings;
DROP POLICY IF EXISTS "IQA leads write standardisation meetings"
  ON public.college_standardisation_meetings;

CREATE POLICY "College staff read standardisation meetings"
  ON public.college_standardisation_meetings
  FOR SELECT
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff
      WHERE user_id = auth.uid() AND status = 'Active'
    )
  );

CREATE POLICY "IQA leads write standardisation meetings"
  ON public.college_standardisation_meetings
  FOR ALL
  USING (public.can_write_college_iqa(college_id))
  WITH CHECK (public.can_write_college_iqa(college_id));

-- ============================================================
-- 6. Realtime publication for the new table
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'college_iqa_eqa_checklist_items'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.college_iqa_eqa_checklist_items';
  END IF;
END $$;

-- ============================================================
-- 7. Grants
-- ============================================================
GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.college_iqa_eqa_checklist_items TO authenticated;
