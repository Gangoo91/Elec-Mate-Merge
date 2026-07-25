-- Cache for slow external metric lookups surfaced in the admin panel
-- (first user: RevenueCat /metrics/overview, ~10s per call — served
-- stale-while-revalidate by admin-revenuecat-stats).
CREATE TABLE IF NOT EXISTS public.admin_metric_cache (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS on with no policies: service-role (edge functions) only.
ALTER TABLE public.admin_metric_cache ENABLE ROW LEVEL SECURITY;
