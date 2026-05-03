-- College Settings — per-college operational thresholds previously
-- hardcoded in useIqaWorkflow / useOfstedSignals / StudentsSection /
-- CohortEpaPage. Editable via /college/settings/operational.
--
-- Defaults match the prior hardcoded values so existing colleges see
-- no behaviour change until they actively edit.

CREATE TABLE IF NOT EXISTS public.college_settings (
  college_id uuid PRIMARY KEY REFERENCES public.colleges(id) ON DELETE CASCADE,
  iqa_sampling_target_percent integer NOT NULL DEFAULT 10
    CHECK (iqa_sampling_target_percent BETWEEN 0 AND 100),
  audit_window_days integer NOT NULL DEFAULT 90
    CHECK (audit_window_days BETWEEN 1 AND 730),
  low_attendance_threshold_percent integer NOT NULL DEFAULT 80
    CHECK (low_attendance_threshold_percent BETWEEN 0 AND 100),
  high_attendance_threshold_percent integer NOT NULL DEFAULT 90
    CHECK (high_attendance_threshold_percent BETWEEN 0 AND 100),
  epa_verdict_bands jsonb NOT NULL DEFAULT
    '{"refer":[0,25],"not_yet":[25,50],"almost":[50,75],"ready":[75,100]}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.college_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY college_settings_read_same_college
  ON public.college_settings
  FOR SELECT
  TO authenticated
  USING (public._ch_same_college(college_id));

CREATE POLICY college_settings_write_same_college
  ON public.college_settings
  FOR ALL
  TO authenticated
  USING (public._ch_same_college(college_id))
  WITH CHECK (public._ch_same_college(college_id));

CREATE OR REPLACE FUNCTION public.college_settings_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS college_settings_touch_updated_at ON public.college_settings;
CREATE TRIGGER college_settings_touch_updated_at
  BEFORE UPDATE ON public.college_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.college_settings_touch_updated_at();
