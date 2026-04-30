-- mate_cost_daily — per-user-per-day-per-model token + cost aggregation.
--
-- Populated by an hourly cron on the VPS that walks
-- /home/openclaw/.openclaw/agents/<user_id>/sessions/*.trajectory.jsonl,
-- parses model.completed events, and upserts here.
--
-- The admin Mate dashboard reads from this table — no live trajectory parsing.
-- Pricing applied at write time so we have a stable historical record even if
-- Anthropic changes prices later.

CREATE TABLE IF NOT EXISTS public.mate_cost_daily (
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day               date NOT NULL,
  model             text NOT NULL,
  input_tokens      bigint NOT NULL DEFAULT 0,
  output_tokens     bigint NOT NULL DEFAULT 0,
  cache_read_tokens bigint NOT NULL DEFAULT 0,
  cache_write_tokens bigint NOT NULL DEFAULT 0,
  cost_usd          numeric(12, 6) NOT NULL DEFAULT 0,
  updated_at        timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, day, model)
);

CREATE INDEX IF NOT EXISTS mate_cost_daily_day_idx ON public.mate_cost_daily (day DESC);
CREATE INDEX IF NOT EXISTS mate_cost_daily_user_idx ON public.mate_cost_daily (user_id, day DESC);

ALTER TABLE public.mate_cost_daily ENABLE ROW LEVEL SECURITY;

-- Only admins read; service role writes (the cron uses service role)
DROP POLICY IF EXISTS "admins read mate_cost_daily" ON public.mate_cost_daily;
CREATE POLICY "admins read mate_cost_daily"
  ON public.mate_cost_daily
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.admin_role IS NOT NULL
    )
  );

COMMENT ON TABLE public.mate_cost_daily IS
  'Per-user-per-day Mate (Elec-AI) token + cost aggregation. Populated hourly from VPS trajectory jsonl files. Admin-readable via RLS.';
