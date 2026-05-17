-- ============================================================
-- College National Benchmarking pool (anonymous opt-in)
-- ============================================================
-- ELE-934 (K2). Colleges that opt-in periodically submit an anonymised
-- snapshot of their core metrics. The aggregated medians are visible
-- back to participating colleges so they can compare themselves to the
-- national sector. No learner PII ever leaves the source college.
-- ============================================================

-- 1. Per-college opt-in record
CREATE TABLE IF NOT EXISTS public.college_benchmark_opt_in (
  college_id UUID PRIMARY KEY REFERENCES public.colleges(id) ON DELETE CASCADE,
  opted_in_at TIMESTAMPTZ,
  opted_out_at TIMESTAMPTZ,
  agreement_version TEXT,
  share_attendance BOOLEAN NOT NULL DEFAULT true,
  share_achievement BOOLEAN NOT NULL DEFAULT true,
  share_retention BOOLEAN NOT NULL DEFAULT true,
  share_epa BOOLEAN NOT NULL DEFAULT true,
  share_otj BOOLEAN NOT NULL DEFAULT true,
  share_fs_gateway BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_benchmark_opt_in ENABLE ROW LEVEL SECURITY;

CREATE POLICY "benchmark_optin_select" ON public.college_benchmark_opt_in
  FOR SELECT USING (_ch_same_college(college_id));

CREATE POLICY "benchmark_optin_upsert" ON public.college_benchmark_opt_in
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_benchmark_opt_in.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.college_id = college_benchmark_opt_in.college_id
      AND p.college_role IN ('admin', 'head_of_department')
    )
  );

-- 2. Anonymised snapshots — one row per (anonymous_college_token, month).
-- We do NOT store college_id here; the token is opaque + rotates yearly.
CREATE TABLE IF NOT EXISTS public.national_benchmark_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anonymous_token TEXT NOT NULL,         -- rotating opaque id per college, regenerated each academic year
  iso_month TEXT NOT NULL,               -- '2026-05'
  sector_band TEXT,                      -- 'small' (<150 learners) | 'medium' (150-500) | 'large' (>500)
  region_band TEXT,                      -- 'north' | 'midlands' | 'south' | 'london' | 'scotland' | 'wales' | 'ni'
  learner_count INTEGER,
  attendance_pct NUMERIC(5,2),
  retention_pct NUMERIC(5,2),
  achievement_pct NUMERIC(5,2),
  epa_pass_pct NUMERIC(5,2),
  epa_distinction_pct NUMERIC(5,2),
  otj_on_track_pct NUMERIC(5,2),
  fs_gateway_clear_pct NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (anonymous_token, iso_month)
);

ALTER TABLE public.national_benchmark_snapshots ENABLE ROW LEVEL SECURITY;

-- Anyone with an active opt-in can SELECT the aggregated view but NOT the raw rows.
-- Raw rows are reachable only via service-role inside the benchmarking edge fn.
CREATE POLICY "benchmark_snapshots_deny_user" ON public.national_benchmark_snapshots
  FOR ALL USING (false) WITH CHECK (false);

-- 3. Aggregated view — pivot to percentiles by sector_band/region_band.
CREATE OR REPLACE VIEW public.national_benchmark_medians AS
SELECT
  iso_month,
  sector_band,
  region_band,
  COUNT(*)::int AS participants,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY attendance_pct)        AS attendance_p50,
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY attendance_pct)       AS attendance_p25,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY attendance_pct)       AS attendance_p75,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY retention_pct)         AS retention_p50,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY achievement_pct)       AS achievement_p50,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY epa_pass_pct)          AS epa_pass_p50,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY epa_distinction_pct)   AS epa_distinction_p50,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY otj_on_track_pct)      AS otj_on_track_p50,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY fs_gateway_clear_pct)  AS fs_gateway_clear_p50
FROM public.national_benchmark_snapshots
GROUP BY iso_month, sector_band, region_band;

-- The view is what colleges can actually see — only when they have opted in.
GRANT SELECT ON public.national_benchmark_medians TO authenticated;

-- 4. Mapping: anonymous_token ↔ college_id (NOT exposed to clients)
CREATE TABLE IF NOT EXISTS public.college_benchmark_tokens (
  college_id UUID PRIMARY KEY REFERENCES public.colleges(id) ON DELETE CASCADE,
  current_token TEXT NOT NULL,
  rotates_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_benchmark_tokens ENABLE ROW LEVEL SECURITY;

-- Service-role only — clients should never read the token mapping
CREATE POLICY "benchmark_tokens_deny" ON public.college_benchmark_tokens
  FOR ALL USING (false) WITH CHECK (false);

-- 5. Cached comparison per college (so dashboards don't query the view live)
CREATE TABLE IF NOT EXISTS public.college_benchmark_comparison_cache (
  college_id UUID PRIMARY KEY REFERENCES public.colleges(id) ON DELETE CASCADE,
  iso_month TEXT NOT NULL,
  this_college JSONB NOT NULL,           -- {attendance, retention, achievement, ...}
  national_median JSONB NOT NULL,        -- {attendance_p50, ...}
  rank_within_sector_pct NUMERIC(5,2),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.college_benchmark_comparison_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "benchmark_cache_select" ON public.college_benchmark_comparison_cache
  FOR SELECT USING (_ch_same_college(college_id));
