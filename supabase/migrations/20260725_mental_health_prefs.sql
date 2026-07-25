-- Mental health prefs KV (2026-07-25).
--
-- Small per-user key/value store so the remaining device-only wellbeing state
-- (self-care reminders, liked affirmations, goals, weekly reflection, starred
-- resources) survives a phone switch. Everything else in the hub already
-- syncs; these were localStorage-only and died with the device.

create table if not exists public.mental_health_prefs (
  user_id uuid not null references auth.users (id) on delete cascade,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.mental_health_prefs enable row level security;

drop policy if exists "Users manage own prefs" on public.mental_health_prefs;
create policy "Users manage own prefs"
  on public.mental_health_prefs
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
