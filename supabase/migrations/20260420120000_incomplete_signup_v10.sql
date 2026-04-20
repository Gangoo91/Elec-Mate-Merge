-- V10 — "Launch price just for you" incomplete-signup campaign
-- Adds a separate tracking column so V10 sends can be managed independently
-- of the V9 (Quick question) campaign without either invalidating the other.

alter table public.profiles
  add column if not exists incomplete_signup_v10_sent_at timestamptz;

-- Partial index: only rows still eligible to receive V10. Tiny on disk,
-- accelerates the "unsent" eligibility query that the admin page polls.
create index if not exists idx_profiles_incomplete_signup_v10_unsent
  on public.profiles (created_at)
  where incomplete_signup_v10_sent_at is null;
