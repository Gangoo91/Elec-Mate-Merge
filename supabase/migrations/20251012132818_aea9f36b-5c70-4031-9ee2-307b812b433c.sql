-- Create agent_metrics table for observability
CREATE TABLE IF NOT EXISTS public.agent_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id TEXT NOT NULL,
  function_name TEXT NOT NULL,
  parse_time INTEGER,
  calculation_time INTEGER,
  rag_time INTEGER,
  gpt5_time INTEGER,
  total_time INTEGER NOT NULL,
  cache_hit BOOLEAN DEFAULT FALSE,
  query_type TEXT,
  success BOOLEAN DEFAULT FALSE,
  error_type TEXT,
  regulation_count INTEGER,
  timestamp TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_agent_metrics_timestamp ON public.agent_metrics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_function ON public.agent_metrics(function_name);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_success ON public.agent_metrics(success);

-- Enable RLS
ALTER TABLE public.agent_metrics ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write metrics
CREATE POLICY "Service role can read metrics"
  ON public.agent_metrics
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert metrics"
  ON public.agent_metrics
  FOR INSERT
  TO service_role
  WITH CHECK (true);