-- Per-user throttle ledger for AI edge functions (service-role only)
create table if not exists public.ai_usage_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  fn_name text not null,
  called_at timestamptz not null default now()
);
create index if not exists idx_ai_usage_user_fn_time on public.ai_usage_log (user_id, fn_name, called_at desc);
alter table public.ai_usage_log enable row level security;
-- no policies: only service-role (edge functions) reads/writes
