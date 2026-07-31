-- Durable billing event log (RevenueCat webhook → here). Answers "was that
-- cancel web or app store?" — store subs can't use the in-app cancel flow,
-- so without this, mobile churn is invisible to the weekly digest.
create table public.billing_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  source text not null default 'revenuecat',
  event_type text not null,
  store text not null default '',
  product_id text not null default '',
  created_at timestamptz not null default now()
);
create index idx_billing_events_type_time on public.billing_events (event_type, created_at desc);
alter table public.billing_events enable row level security;
-- no policies: service role only
