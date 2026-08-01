-- ELE-1155: unified AI failure log across all AI edge functions.
-- Written best-effort by supabase/functions/_shared/ai-log.ts (service role only).
-- RLS enabled with NO policies: clients can neither read nor write.

create table if not exists public.ai_error_log (
  id uuid primary key default gen_random_uuid(),
  fn text not null,
  provider text,
  model text,
  http_status integer,
  error_class text not null default 'unknown',
  duration_ms integer,
  user_id uuid,
  detail text,
  created_at timestamptz not null default now()
);

alter table public.ai_error_log enable row level security;

create index if not exists ai_error_log_fn_created_idx
  on public.ai_error_log (fn, created_at desc);
create index if not exists ai_error_log_created_idx
  on public.ai_error_log (created_at desc);

comment on table public.ai_error_log is
  'ELE-1155: structured AI call failures. Service-role writes only; 90-day retention via purge cron.';
