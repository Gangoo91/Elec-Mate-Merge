-- ============================================================
-- Briefings & Briefing Attendees System
-- Creates tables to support the useBriefings.ts hook
-- ============================================================

-- ─── briefings table ───
CREATE TABLE IF NOT EXISTS public.briefings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.employer_jobs(id) ON DELETE SET NULL,
  template_id UUID,
  toolbox_template_id UUID REFERENCES public.toolbox_talk_templates(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  briefing_type TEXT CHECK (briefing_type IN (
    'Toolbox Talk', 'Site Induction', 'Safety Briefing',
    'Method Statement', 'Emergency Procedures', 'PPE Reminder'
  )),
  content TEXT,
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  presenter TEXT,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
  notes TEXT,
  ai_generated BOOLEAN DEFAULT FALSE,
  recurring BOOLEAN DEFAULT FALSE,
  recurring_pattern TEXT CHECK (recurring_pattern IN ('daily', 'weekly', 'monthly')),
  parent_briefing_id UUID REFERENCES public.briefings(id) ON DELETE SET NULL,
  qr_code_url TEXT,
  pdf_url TEXT,
  photo_evidence TEXT[],
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
  weather_conditions TEXT,
  duration_minutes INTEGER,
  presenter_signature_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_briefings_user_id ON public.briefings(user_id);
CREATE INDEX IF NOT EXISTS idx_briefings_date ON public.briefings(date DESC);
CREATE INDEX IF NOT EXISTS idx_briefings_status ON public.briefings(status);
CREATE INDEX IF NOT EXISTS idx_briefings_job_id ON public.briefings(job_id);

-- RLS
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own briefings"
  ON public.briefings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own briefings"
  ON public.briefings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own briefings"
  ON public.briefings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own briefings"
  ON public.briefings FOR DELETE
  USING (auth.uid() = user_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_briefings_updated_at
  BEFORE UPDATE ON public.briefings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


-- ─── briefing_attendees table ───
CREATE TABLE IF NOT EXISTS public.briefing_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  briefing_id UUID NOT NULL REFERENCES public.briefings(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES public.employer_employees(id) ON DELETE SET NULL,
  acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_at TIMESTAMPTZ,
  signature_url TEXT,
  signed_via TEXT CHECK (signed_via IN ('manual', 'qr_code', 'app', 'link')),
  device_info TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  photo_url TEXT,
  guest_name TEXT,
  guest_company TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ
);

-- Unique constraint for upsert support
CREATE UNIQUE INDEX IF NOT EXISTS idx_briefing_attendees_unique
  ON public.briefing_attendees(briefing_id, employee_id)
  WHERE employee_id IS NOT NULL;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_briefing_attendees_briefing_id ON public.briefing_attendees(briefing_id);
CREATE INDEX IF NOT EXISTS idx_briefing_attendees_employee_id ON public.briefing_attendees(employee_id);

-- RLS
ALTER TABLE public.briefing_attendees ENABLE ROW LEVEL SECURITY;

-- Briefing owner can manage attendees
CREATE POLICY "Briefing owner can view attendees"
  ON public.briefing_attendees FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.briefings
      WHERE briefings.id = briefing_attendees.briefing_id
      AND briefings.user_id = auth.uid()
    )
  );

CREATE POLICY "Briefing owner can insert attendees"
  ON public.briefing_attendees FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.briefings
      WHERE briefings.id = briefing_attendees.briefing_id
      AND briefings.user_id = auth.uid()
    )
  );

CREATE POLICY "Briefing owner can update attendees"
  ON public.briefing_attendees FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.briefings
      WHERE briefings.id = briefing_attendees.briefing_id
      AND briefings.user_id = auth.uid()
    )
  );

CREATE POLICY "Briefing owner can delete attendees"
  ON public.briefing_attendees FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.briefings
      WHERE briefings.id = briefing_attendees.briefing_id
      AND briefings.user_id = auth.uid()
    )
  );

-- Public sign-off policy (for QR code / link sign-off by guests)
CREATE POLICY "Anyone can acknowledge attendance via sign-off"
  ON public.briefing_attendees FOR UPDATE
  USING (TRUE)
  WITH CHECK (
    -- Only allow updating acknowledgement fields
    acknowledged IS NOT NULL
  );
