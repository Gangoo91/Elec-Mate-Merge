
-- 1) Create table to store community price submissions
CREATE TABLE public.price_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  job_type TEXT NOT NULL,
  region TEXT NOT NULL,
  county TEXT,
  postcode TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,

  price NUMERIC(12,2) NOT NULL CHECK (price > 0),
  currency TEXT NOT NULL DEFAULT 'GBP',
  unit TEXT NOT NULL DEFAULT 'per job',
  complexity_level TEXT NOT NULL DEFAULT 'standard',
  notes TEXT,

  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  ip_address TEXT,
  user_agent TEXT,
  data_source TEXT NOT NULL DEFAULT 'user_submission',
  attributes JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 2) Keep updated_at fresh
CREATE TRIGGER price_reports_set_updated_at
BEFORE UPDATE ON public.price_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 3) Helpful indexes
CREATE INDEX price_reports_job_region_status_idx
  ON public.price_reports (job_type, region, status);

CREATE INDEX price_reports_created_at_idx
  ON public.price_reports (created_at DESC);

CREATE INDEX price_reports_attributes_gin_idx
  ON public.price_reports USING GIN (attributes);

-- 4) Enable RLS and allow read access to approved rows only
ALTER TABLE public.price_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved price reports"
  ON public.price_reports
  FOR SELECT
  USING (status = 'approved');
