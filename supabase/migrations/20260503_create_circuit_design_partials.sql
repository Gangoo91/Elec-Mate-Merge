-- Per-circuit streaming sink for the Circuit Designer.
-- Worker (designer-agent-v3) inserts one row per completed circuit; the
-- frontend subscribes via realtime so cards land live as the design runs.
-- Rows cascade-delete with the parent job to keep the table tidy.

CREATE TABLE IF NOT EXISTS public.circuit_design_partials (
  job_id uuid NOT NULL REFERENCES public.circuit_design_jobs(id) ON DELETE CASCADE,
  circuit_index integer NOT NULL,
  circuit_data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (job_id, circuit_index)
);

CREATE INDEX IF NOT EXISTS idx_circuit_design_partials_job_id
  ON public.circuit_design_partials (job_id);

-- Realtime publication so frontend INSERT subscriptions fire
ALTER PUBLICATION supabase_realtime ADD TABLE public.circuit_design_partials;

-- RLS: owner of the parent job can read partials; only service-role inserts.
ALTER TABLE public.circuit_design_partials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own circuit partials"
  ON public.circuit_design_partials
  FOR SELECT
  USING (
    job_id IN (
      SELECT id FROM public.circuit_design_jobs WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert circuit partials"
  ON public.circuit_design_partials
  FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE public.circuit_design_partials IS
  'Streaming sink for the Circuit Designer. Worker inserts one row per completed circuit; frontend subscribes via realtime to render circuits as they land.';
