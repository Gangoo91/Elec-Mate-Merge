-- College Hub new feature tables: IQA Workflow, Assessment Calendar, Workplace Visits
-- Migration: 20260403_college_new_features

-- ─── IQA Findings ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.college_iqa_findings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id uuid REFERENCES public.colleges(id) ON DELETE CASCADE,
  assessor_id uuid REFERENCES public.college_staff(id) ON DELETE SET NULL,
  assessor_name text NOT NULL,
  finding_type text NOT NULL CHECK (finding_type IN ('Good Practice', 'Area for Improvement', 'Action Required')),
  description text NOT NULL,
  status text NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Closed')),
  action_plan text,
  closed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.college_iqa_findings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "College staff can manage IQA findings"
  ON public.college_iqa_findings
  FOR ALL
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff WHERE user_id = auth.uid()
    )
  );

-- ─── IQA Sampling Plans ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.college_iqa_sampling (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id uuid REFERENCES public.colleges(id) ON DELETE CASCADE,
  assessor_id uuid REFERENCES public.college_staff(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  target_sample_percent numeric(5,2) DEFAULT 10,
  sampled_count integer DEFAULT 0,
  total_assessments integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.college_iqa_sampling ENABLE ROW LEVEL SECURITY;

CREATE POLICY "College staff can manage sampling plans"
  ON public.college_iqa_sampling
  FOR ALL
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff WHERE user_id = auth.uid()
    )
  );

-- ─── Standardisation Meetings ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.college_standardisation_meetings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id uuid REFERENCES public.colleges(id) ON DELETE CASCADE,
  date date NOT NULL,
  topic text NOT NULL,
  attendees_count integer DEFAULT 0,
  outcome text,
  minutes_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.college_standardisation_meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "College staff can manage standardisation meetings"
  ON public.college_standardisation_meetings
  FOR ALL
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff WHERE user_id = auth.uid()
    )
  );

-- ─── Scheduled Assessments (Assessment Calendar) ────────────────────────────
CREATE TABLE IF NOT EXISTS public.college_scheduled_assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id uuid REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id uuid REFERENCES public.college_students(id) ON DELETE CASCADE,
  assessor_id uuid REFERENCES public.college_staff(id) ON DELETE SET NULL,
  assessment_type text NOT NULL CHECK (assessment_type IN ('Observation', 'Professional Discussion', 'Portfolio Review', 'Gateway Meeting')),
  scheduled_date date NOT NULL,
  scheduled_time time,
  location text,
  notes text,
  status text NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'Rescheduled')),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.college_scheduled_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "College staff can manage scheduled assessments"
  ON public.college_scheduled_assessments
  FOR ALL
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff WHERE user_id = auth.uid()
    )
  );

-- Index for calendar queries
CREATE INDEX IF NOT EXISTS idx_scheduled_assessments_date
  ON public.college_scheduled_assessments(scheduled_date);

-- ─── Workplace Visits ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.college_workplace_visits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id uuid REFERENCES public.colleges(id) ON DELETE CASCADE,
  student_id uuid REFERENCES public.college_students(id) ON DELETE CASCADE,
  visitor_id uuid REFERENCES public.college_staff(id) ON DELETE SET NULL,
  employer_id text,
  visit_date date NOT NULL,
  purpose text,
  notes text,
  outcomes text,
  follow_up_required boolean DEFAULT false,
  follow_up_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.college_workplace_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "College staff can manage workplace visits"
  ON public.college_workplace_visits
  FOR ALL
  USING (
    college_id IN (
      SELECT college_id FROM public.college_staff WHERE user_id = auth.uid()
    )
  );

-- ─── EQA Settings (for IQA section) ────────────────────────────────────────
-- Store per-college settings like next EQA visit date
ALTER TABLE public.colleges
  ADD COLUMN IF NOT EXISTS next_eqa_visit date,
  ADD COLUMN IF NOT EXISTS eqa_checklist jsonb DEFAULT '{}';
