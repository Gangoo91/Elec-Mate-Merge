-- Push notification log: prevents duplicate notifications per user per day
create table if not exists public.push_notification_log (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  type          text not null,        -- overdue_invoice, quote_accepted, task_overdue, etc.
  reference_id  text,                 -- quote id, invoice id, task id, etc.
  title         text,
  body          text,
  sent_at       timestamptz not null default now()
);

-- Index for deduplication checks
create index if not exists push_notification_log_user_type_ref_day
  on public.push_notification_log (user_id, type, reference_id, date_trunc('day', sent_at));

-- RLS: users can only see their own logs
alter table public.push_notification_log enable row level security;

create policy "Users can view their own push log"
  on public.push_notification_log for select
  using (auth.uid() = user_id);

-- Service role can insert
create policy "Service role can insert push log"
  on public.push_notification_log for insert
  with check (true);
