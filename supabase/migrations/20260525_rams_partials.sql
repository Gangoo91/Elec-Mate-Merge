-- Streaming sink for the AI RAMS Generator.
-- The new rams-generator edge function writes one row per pipeline
-- stage (rag, hazards, controls, ppe, emergency, steps, tools, materials,
-- tips, mistakes, finalise) as the parallel H&S + Method pipeline
-- progresses. Frontend subscribes via realtime so AgentProcessingView
-- fills in live with each hazard / step instead of waiting for the
-- whole document to complete.
--
-- Mirrors cost_engineer_partials in shape.

CREATE TABLE IF NOT EXISTS public.rams_partials (
  job_id uuid NOT NULL REFERENCES public.rams_generation_jobs(id) ON DELETE CASCADE,
  stage text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (job_id, stage)
);

CREATE INDEX IF NOT EXISTS idx_rams_partials_job_id
  ON public.rams_partials (job_id);

-- Realtime publication so frontend INSERT/UPDATE subscriptions fire.
ALTER PUBLICATION supabase_realtime ADD TABLE public.rams_partials;

ALTER TABLE public.rams_partials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own rams partials" ON public.rams_partials;
CREATE POLICY "Users view own rams partials"
  ON public.rams_partials
  FOR SELECT
  USING (
    job_id IN (
      SELECT id FROM public.rams_generation_jobs WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Service role writes rams partials" ON public.rams_partials;
CREATE POLICY "Service role writes rams partials"
  ON public.rams_partials
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

COMMENT ON TABLE public.rams_partials IS
  'Streaming sink for the AI RAMS Generator. One row per pipeline stage as the parallel H&S + Method pipeline progresses. Frontend subscribes via realtime.';

-- Known stage keys (documented; not enforced via CHECK so workers can
-- evolve without a migration):
--   'rag'         — RAG queries complete (counts of facets retrieved)
--   'hazards'     — H&S agent returned hazards array
--   'ppe'         — PPE details extracted
--   'emergency'   — Emergency procedures drafted
--   'steps'       — Installer agent returned method steps
--   'tools'       — Tools required compiled
--   'materials'   — Materials required compiled
--   'tips'        — Practical tips authored
--   'mistakes'    — Common mistakes flagged
--   'finalise'    — Assembled RAMS + Method documents
