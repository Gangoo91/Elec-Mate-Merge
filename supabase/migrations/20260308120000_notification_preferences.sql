-- Notification preferences per user per category
-- Categories: daily_briefing, tasks_projects, invoices_quotes,
--   certificates_compliance, study_centre, mental_health, apprentice, messages

create table if not exists notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  category text not null,
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  unique(user_id, category)
);

-- Index for fast lookup per user
create index if not exists idx_notification_preferences_user
  on notification_preferences(user_id);

-- RLS
alter table notification_preferences enable row level security;

create policy "Users can read own preferences"
  on notification_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on notification_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on notification_preferences for update
  using (auth.uid() = user_id);
