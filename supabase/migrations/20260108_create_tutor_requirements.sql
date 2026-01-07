-- Tutor Portfolio Requirements Table
-- Allows tutors to assign custom evidence requirements to individual students

CREATE TABLE IF NOT EXISTS public.tutor_portfolio_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- The tutor who created the requirement
  tutor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- The student who must fulfill the requirement
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Optional link to a specific qualification unit
  category_id UUID REFERENCES public.qualification_categories(id) ON DELETE SET NULL,

  -- Requirement details
  title TEXT NOT NULL,
  description TEXT,

  -- Evidence types the student can upload (codes from evidence_types)
  evidence_type_codes TEXT[] NOT NULL,

  -- How many pieces of evidence needed
  quantity_required INTEGER DEFAULT 1,

  -- Guidance for the student
  guidance TEXT,

  -- Is this mandatory for portfolio completion?
  is_mandatory BOOLEAN DEFAULT true,

  -- Optional due date
  due_date TIMESTAMPTZ,

  -- Status tracking
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tutor_req_tutor ON public.tutor_portfolio_requirements(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_req_student ON public.tutor_portfolio_requirements(student_id);
CREATE INDEX IF NOT EXISTS idx_tutor_req_status ON public.tutor_portfolio_requirements(status);
CREATE INDEX IF NOT EXISTS idx_tutor_req_due_date ON public.tutor_portfolio_requirements(due_date) WHERE due_date IS NOT NULL;

-- Enable RLS
ALTER TABLE public.tutor_portfolio_requirements ENABLE ROW LEVEL SECURITY;

-- Policy: Students can view their own requirements
DROP POLICY IF EXISTS "Students can view own requirements" ON public.tutor_portfolio_requirements;
CREATE POLICY "Students can view own requirements"
  ON public.tutor_portfolio_requirements
  FOR SELECT
  USING (auth.uid() = student_id);

-- Policy: Tutors can view requirements for their assigned students
DROP POLICY IF EXISTS "Tutors can view assigned student requirements" ON public.tutor_portfolio_requirements;
CREATE POLICY "Tutors can view assigned student requirements"
  ON public.tutor_portfolio_requirements
  FOR SELECT
  USING (
    auth.uid() = tutor_id
    OR EXISTS (
      SELECT 1 FROM public.tutor_student_assignments tsa
      WHERE tsa.tutor_id = auth.uid()
      AND tsa.student_id = tutor_portfolio_requirements.student_id
    )
  );

-- Policy: Tutors can insert requirements for their assigned students
DROP POLICY IF EXISTS "Tutors can create requirements for assigned students" ON public.tutor_portfolio_requirements;
CREATE POLICY "Tutors can create requirements for assigned students"
  ON public.tutor_portfolio_requirements
  FOR INSERT
  WITH CHECK (
    auth.uid() = tutor_id
    AND EXISTS (
      SELECT 1 FROM public.tutor_student_assignments tsa
      WHERE tsa.tutor_id = auth.uid()
      AND tsa.student_id = tutor_portfolio_requirements.student_id
    )
  );

-- Policy: Tutors can update their own requirements
DROP POLICY IF EXISTS "Tutors can update own requirements" ON public.tutor_portfolio_requirements;
CREATE POLICY "Tutors can update own requirements"
  ON public.tutor_portfolio_requirements
  FOR UPDATE
  USING (auth.uid() = tutor_id)
  WITH CHECK (auth.uid() = tutor_id);

-- Policy: Tutors can delete their own requirements
DROP POLICY IF EXISTS "Tutors can delete own requirements" ON public.tutor_portfolio_requirements;
CREATE POLICY "Tutors can delete own requirements"
  ON public.tutor_portfolio_requirements
  FOR DELETE
  USING (auth.uid() = tutor_id);

-- Trigger to update updated_at on changes
CREATE OR REPLACE FUNCTION update_tutor_requirement_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_tutor_portfolio_requirements_updated_at ON public.tutor_portfolio_requirements;
CREATE TRIGGER update_tutor_portfolio_requirements_updated_at
  BEFORE UPDATE ON public.tutor_portfolio_requirements
  FOR EACH ROW
  EXECUTE FUNCTION update_tutor_requirement_updated_at();
