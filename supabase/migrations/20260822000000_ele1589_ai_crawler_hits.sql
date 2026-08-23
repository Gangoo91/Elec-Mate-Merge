-- ELE-1589: first-party AI-crawler hit counters. APPLIED TO PROD 2026-08-22
-- via MCP apply_migration — do not re-apply. Repo copy for review only.
--
-- Aggregate-by-design: (day, agent, path) counters only — no IPs, no UAs
-- stored, no user linkage. Written via SECURITY DEFINER RPC only; the table
-- has RLS enabled with NO policies so PostgREST cannot read or write it
-- directly with the anon key. Writers: middleware.ts (edge, bot fetches) and
-- src/main.tsx (client, AI-assistant referrals).
--
-- Read it with e.g.:
--   SELECT agent, sum(hits) FROM ai_crawler_hits
--   WHERE day > now()::date - 30 GROUP BY 1 ORDER BY 2 DESC;
CREATE TABLE IF NOT EXISTS public.ai_crawler_hits (
  day date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  agent text NOT NULL,
  path text NOT NULL,
  hits integer NOT NULL DEFAULT 0,
  PRIMARY KEY (day, agent, path)
);
ALTER TABLE public.ai_crawler_hits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.increment_ai_crawler_hit(p_agent text, p_path text)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Anon-callable: validate hard and fail silent. Counters only — worst-case
  -- abuse inflates a count, never exposes data.
  IF p_agent IS NULL OR length(p_agent) > 40 OR p_agent !~ '^[a-z0-9_:.-]+$' THEN RETURN; END IF;
  IF p_path IS NULL OR length(p_path) > 200 OR left(p_path, 1) <> '/' THEN RETURN; END IF;
  INSERT INTO public.ai_crawler_hits(day, agent, path, hits)
  VALUES ((now() AT TIME ZONE 'utc')::date, p_agent, p_path, 1)
  ON CONFLICT (day, agent, path) DO UPDATE SET hits = ai_crawler_hits.hits + 1;
END $$;

REVOKE ALL ON FUNCTION public.increment_ai_crawler_hit(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_ai_crawler_hit(text, text) TO anon, authenticated;
