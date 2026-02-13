-- ============================================================
-- Safety Compliance Tables
-- COSHH Assessments, Accident Records, Inspection Records,
-- Permits to Work
-- ============================================================

-- ─── coshh_assessments ───
-- COSHH Regulations 2002 compliance
CREATE TABLE IF NOT EXISTS public.coshh_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  substance_name TEXT NOT NULL,
  manufacturer TEXT,
  product_code TEXT,
  location_of_use TEXT,
  task_description TEXT,
  quantity_used TEXT,
  frequency_of_use TEXT,
  ghs_hazards TEXT[] DEFAULT '{}',
  exposure_routes TEXT[] DEFAULT '{}',
  health_effects TEXT,
  oel_value TEXT,
  control_measures TEXT[] DEFAULT '{}',
  ppe_required TEXT[] DEFAULT '{}',
  storage_requirements TEXT,
  spill_procedure TEXT,
  first_aid TEXT,
  disposal_method TEXT,
  monitoring_required BOOLEAN DEFAULT FALSE,
  monitoring_details TEXT,
  risk_rating TEXT NOT NULL DEFAULT 'medium' CHECK (risk_rating IN ('low', 'medium', 'high', 'very-high')),
  assessed_by TEXT NOT NULL,
  assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  review_date DATE NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_coshh_user_id ON public.coshh_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_coshh_review_date ON public.coshh_assessments(review_date);
CREATE INDEX IF NOT EXISTS idx_coshh_risk_rating ON public.coshh_assessments(risk_rating);

ALTER TABLE public.coshh_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own COSHH assessments"
  ON public.coshh_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own COSHH assessments"
  ON public.coshh_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own COSHH assessments"
  ON public.coshh_assessments FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own COSHH assessments"
  ON public.coshh_assessments FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_coshh_updated_at
  BEFORE UPDATE ON public.coshh_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ─── accident_records ───
-- RIDDOR 2013 compliance
CREATE TABLE IF NOT EXISTS public.accident_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Injured person
  injured_name TEXT NOT NULL,
  injured_role TEXT,
  injured_employer TEXT,
  injured_address TEXT,
  -- Incident
  incident_date DATE NOT NULL,
  incident_time TEXT,
  location TEXT NOT NULL,
  location_detail TEXT,
  -- Injury
  injury_type TEXT NOT NULL,
  body_part TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('minor', 'moderate', 'major', 'fatal')),
  injury_description TEXT,
  -- How it happened
  incident_description TEXT NOT NULL,
  activity_at_time TEXT,
  cause TEXT,
  -- Witnesses
  witnesses TEXT,
  -- Treatment
  first_aid_given BOOLEAN DEFAULT FALSE,
  first_aid_details TEXT,
  first_aider_name TEXT,
  hospital_visit BOOLEAN DEFAULT FALSE,
  hospital_name TEXT,
  -- Aftermath
  time_off_work BOOLEAN DEFAULT FALSE,
  days_off INTEGER DEFAULT 0,
  return_date DATE,
  -- Reporting
  reported_to TEXT,
  reported_date DATE,
  -- RIDDOR
  is_riddor_reportable BOOLEAN DEFAULT FALSE,
  riddor_category TEXT,
  riddor_reference TEXT,
  riddor_reported BOOLEAN DEFAULT FALSE,
  -- Meta
  recorded_by TEXT NOT NULL,
  additional_notes TEXT,
  corrective_actions TEXT,
  pdf_url TEXT,
  photo_urls TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_accident_user_id ON public.accident_records(user_id);
CREATE INDEX IF NOT EXISTS idx_accident_date ON public.accident_records(incident_date DESC);
CREATE INDEX IF NOT EXISTS idx_accident_severity ON public.accident_records(severity);
CREATE INDEX IF NOT EXISTS idx_accident_riddor ON public.accident_records(is_riddor_reportable) WHERE is_riddor_reportable = TRUE;

ALTER TABLE public.accident_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own accident records"
  ON public.accident_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own accident records"
  ON public.accident_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own accident records"
  ON public.accident_records FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own accident records"
  ON public.accident_records FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_accident_records_updated_at
  BEFORE UPDATE ON public.accident_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ─── inspection_records ───
-- Standardised safety inspections
CREATE TABLE IF NOT EXISTS public.inspection_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  template_title TEXT NOT NULL,
  location TEXT,
  inspector_name TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  sections JSONB NOT NULL DEFAULT '[]',
  overall_result TEXT NOT NULL CHECK (overall_result IN ('pass', 'fail', 'advisory')),
  pass_count INTEGER NOT NULL DEFAULT 0,
  fail_count INTEGER NOT NULL DEFAULT 0,
  na_count INTEGER NOT NULL DEFAULT 0,
  total_items INTEGER NOT NULL DEFAULT 0,
  additional_notes TEXT,
  pdf_url TEXT,
  photo_urls TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inspection_user_id ON public.inspection_records(user_id);
CREATE INDEX IF NOT EXISTS idx_inspection_date ON public.inspection_records(date DESC);
CREATE INDEX IF NOT EXISTS idx_inspection_result ON public.inspection_records(overall_result);

ALTER TABLE public.inspection_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own inspection records"
  ON public.inspection_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own inspection records"
  ON public.inspection_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own inspection records"
  ON public.inspection_records FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own inspection records"
  ON public.inspection_records FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_inspection_records_updated_at
  BEFORE UPDATE ON public.inspection_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ─── permits_to_work ───
-- High-risk activity permits
CREATE TABLE IF NOT EXISTS public.permits_to_work (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'hot-work', 'confined-space', 'electrical-isolation',
    'working-at-height', 'excavation'
  )),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  issuer_name TEXT NOT NULL,
  issuer_signature TEXT,
  receiver_name TEXT NOT NULL,
  receiver_signature TEXT,
  hazards JSONB DEFAULT '[]',
  precautions TEXT[] DEFAULT '{}',
  ppe_required TEXT[] DEFAULT '{}',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'closed')),
  emergency_procedures TEXT,
  additional_notes TEXT,
  closed_at TIMESTAMPTZ,
  closed_by TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_permits_user_id ON public.permits_to_work(user_id);
CREATE INDEX IF NOT EXISTS idx_permits_status ON public.permits_to_work(status);
CREATE INDEX IF NOT EXISTS idx_permits_end_time ON public.permits_to_work(end_time) WHERE status = 'active';

ALTER TABLE public.permits_to_work ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own permits"
  ON public.permits_to_work FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own permits"
  ON public.permits_to_work FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own permits"
  ON public.permits_to_work FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own permits"
  ON public.permits_to_work FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_permits_updated_at
  BEFORE UPDATE ON public.permits_to_work
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
