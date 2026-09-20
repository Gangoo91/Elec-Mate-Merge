-- ai_app_cost_daily — what the APP's own Anthropic calls cost. ELE-1748.
-- Applied to the live project 20 Sep 2026 via MCP apply_migration.
--
-- 🔴 DELIBERATELY NOT mate_cost_daily, and the distinction is the whole point
-- of the ticket.
--
-- mate_cost_daily is written by an hourly cron ON THE VPS that walks OpenClaw
-- trajectory jsonl files. It measures INTERNAL DEVELOPMENT usage, and it
-- stopped on 13 July 2026 when that script stopped. Writing the app's spend
-- into the same rows would add customer usage to development usage under one
-- primary key and make both unreadable — destroying exactly the separation
-- ELE-1748 exists to establish. It would also collide on (user_id, day, model)
-- for anyone who both develops and uses the app, which is at least one person.
--
-- fn_name is the column mate_cost_daily does not have, and the ticket names
-- the gap explicitly: "no way to see cost by feature". One row per function
-- per model per user per day.
--
-- Token counts are recorded verbatim from Anthropic and are ground truth.
-- cost_usd is DERIVED at write time from the rate table in
-- supabase/functions/_shared/ai-cost.ts, so the historical record stays stable
-- if Anthropic later changes prices — same reasoning as mate_cost_daily.

CREATE TABLE IF NOT EXISTS public.ai_app_cost_daily (
  user_id            uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day                date NOT NULL,
  model              text NOT NULL,
  fn_name            text NOT NULL,
  input_tokens       bigint NOT NULL DEFAULT 0,
  output_tokens      bigint NOT NULL DEFAULT 0,
  cache_read_tokens  bigint NOT NULL DEFAULT 0,
  cache_write_tokens bigint NOT NULL DEFAULT 0,
  call_count         integer NOT NULL DEFAULT 0,
  cost_usd           numeric(12, 6) NOT NULL DEFAULT 0,
  updated_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, day, model, fn_name)
);

CREATE INDEX IF NOT EXISTS ai_app_cost_daily_day_idx
  ON public.ai_app_cost_daily (day DESC);
CREATE INDEX IF NOT EXISTS ai_app_cost_daily_fn_idx
  ON public.ai_app_cost_daily (fn_name, day DESC);

ALTER TABLE public.ai_app_cost_daily ENABLE ROW LEVEL SECURITY;

-- Only admins read; service role writes (the edge functions use service role).
-- Same shape as mate_cost_daily so the two can be read side by side.
DROP POLICY IF EXISTS "admins read ai_app_cost_daily" ON public.ai_app_cost_daily;
CREATE POLICY "admins read ai_app_cost_daily"
  ON public.ai_app_cost_daily
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.admin_role IS NOT NULL
    )
  );

COMMENT ON TABLE public.ai_app_cost_daily IS
  'Per-user-per-day-per-function Anthropic token + cost for the APP''s own calls (ELE-1748). Separate from mate_cost_daily, which measures internal OpenClaw/development usage from the VPS. Written by edge functions via service role; admin-readable via RLS.';
