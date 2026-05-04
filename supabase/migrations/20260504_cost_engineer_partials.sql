-- Streaming sink for the Cost Engineer.
-- Worker writes one row per pipeline stage as Stage A computes (materials
-- priced, labour estimated, overheads applied) and Stage B annotates
-- (compliance, risk, upsells). The frontend subscribes via realtime so
-- the editorial results page fills in live instead of waiting for the
-- whole estimate to complete. Mirrors circuit_design_partials in shape.

CREATE TABLE IF NOT EXISTS public.cost_engineer_partials (
  job_id uuid NOT NULL REFERENCES public.cost_engineer_jobs(id) ON DELETE CASCADE,
  stage text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (job_id, stage)
);

CREATE INDEX IF NOT EXISTS idx_cost_engineer_partials_job_id
  ON public.cost_engineer_partials (job_id);

-- Realtime publication so frontend INSERT/UPDATE subscriptions fire.
ALTER PUBLICATION supabase_realtime ADD TABLE public.cost_engineer_partials;

ALTER TABLE public.cost_engineer_partials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own cost partials" ON public.cost_engineer_partials;
CREATE POLICY "Users view own cost partials"
  ON public.cost_engineer_partials
  FOR SELECT
  USING (
    job_id IN (
      SELECT id FROM public.cost_engineer_jobs WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Service role writes cost partials" ON public.cost_engineer_partials;
CREATE POLICY "Service role writes cost partials"
  ON public.cost_engineer_partials
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

COMMENT ON TABLE public.cost_engineer_partials IS
  'Streaming sink for the Cost Engineer. One row per pipeline stage (extraction, materials, labour, overheads, compliance, risk, finalise). Frontend subscribes via realtime.';

-- Known stage keys (documented; not enforced via CHECK so workers can
-- evolve without a migration):
--   'extraction'   — Stage A: AI parsed brief into item candidates
--   'materials'    — Stage A: marketplace_products matched + priced
--   'labour'       — Stage A: practical_work_intelligence + business settings
--   'overheads'    — Stage A: regional + business overheads applied
--   'compliance'   — Stage B: BS 7671 facets injected
--   'risk_upsells' — Stage B: AI annotations
--   'finalise'     — Stage B: assembled output
