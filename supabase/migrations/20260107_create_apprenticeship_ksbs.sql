-- Apprenticeship KSBs (Knowledge, Skills, Behaviours) Table
-- Tracks the specific KSB requirements from apprenticeship standards like ST0152

CREATE TABLE IF NOT EXISTS public.apprenticeship_ksbs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification_id UUID REFERENCES public.qualifications(id) ON DELETE CASCADE,

  -- KSB classification
  ksb_type TEXT NOT NULL CHECK (ksb_type IN ('knowledge', 'skill', 'behaviour')),
  code TEXT NOT NULL,  -- e.g., 'K1', 'S3', 'B2'

  -- Content
  title TEXT NOT NULL,
  description TEXT,

  -- Assessment
  assessment_method TEXT[] DEFAULT ARRAY['portfolio'],  -- 'portfolio', 'observation', 'discussion', 'test'

  -- Ordering
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_ksbs_qualification ON public.apprenticeship_ksbs(qualification_id);
CREATE INDEX IF NOT EXISTS idx_ksbs_type ON public.apprenticeship_ksbs(ksb_type);
CREATE UNIQUE INDEX IF NOT EXISTS idx_ksbs_unique_code ON public.apprenticeship_ksbs(qualification_id, code);

-- RLS Policies
ALTER TABLE public.apprenticeship_ksbs ENABLE ROW LEVEL SECURITY;

-- Everyone can read KSBs (they're reference data)
CREATE POLICY "KSBs are viewable by everyone"
  ON public.apprenticeship_ksbs
  FOR SELECT
  USING (true);

-- User KSB Progress Tracking
CREATE TABLE IF NOT EXISTS public.user_ksb_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ksb_id UUID REFERENCES public.apprenticeship_ksbs(id) ON DELETE CASCADE NOT NULL,

  -- Progress tracking
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'evidence_submitted', 'verified', 'completed')),

  -- Evidence links (portfolio items that demonstrate this KSB)
  evidence_portfolio_ids UUID[] DEFAULT ARRAY[]::UUID[],

  -- Notes
  notes TEXT,

  -- Verification
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, ksb_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_ksb_user ON public.user_ksb_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_ksb_status ON public.user_ksb_progress(status);

-- RLS for user KSB progress
ALTER TABLE public.user_ksb_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own KSB progress"
  ON public.user_ksb_progress
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own KSB progress"
  ON public.user_ksb_progress
  FOR ALL
  USING (user_id = auth.uid());

-- Tutors can view and verify student KSB progress
CREATE POLICY "Tutors can view assigned student KSB progress"
  ON public.user_ksb_progress
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.tutor_student_assignments tsa
      WHERE tsa.tutor_id = auth.uid()
      AND tsa.student_id = user_ksb_progress.user_id
      AND tsa.is_active = true
    )
  );

CREATE POLICY "Tutors can update assigned student KSB progress"
  ON public.user_ksb_progress
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.tutor_student_assignments tsa
      WHERE tsa.tutor_id = auth.uid()
      AND tsa.student_id = user_ksb_progress.user_id
      AND tsa.is_active = true
    )
  );

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_ksb_progress_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_ksb_progress_updated_at
  BEFORE UPDATE ON public.user_ksb_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_ksb_progress_timestamp();

-- View for apprentice KSB overview
CREATE OR REPLACE VIEW apprentice_ksb_summary AS
SELECT
  ukp.user_id,
  ak.qualification_id,
  q.title as qualification_title,
  ak.ksb_type,
  COUNT(*) as total_ksbs,
  COUNT(CASE WHEN ukp.status = 'completed' THEN 1 END) as completed_ksbs,
  COUNT(CASE WHEN ukp.status = 'verified' THEN 1 END) as verified_ksbs,
  COUNT(CASE WHEN ukp.status IN ('in_progress', 'evidence_submitted') THEN 1 END) as in_progress_ksbs,
  ROUND(
    (COUNT(CASE WHEN ukp.status = 'completed' THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0)) * 100,
    0
  ) as completion_percentage
FROM public.apprenticeship_ksbs ak
LEFT JOIN public.user_ksb_progress ukp ON ukp.ksb_id = ak.id
LEFT JOIN public.qualifications q ON q.id = ak.qualification_id
GROUP BY ukp.user_id, ak.qualification_id, q.title, ak.ksb_type;
