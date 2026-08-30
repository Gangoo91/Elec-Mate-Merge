-- V11 — incomplete-signup campaign (replaces V10, whose deadline string went
-- stale in April 2026). Separate tracking columns so V11 sends are managed
-- independently of V9/V10 and neither invalidates the other's stats.
--
-- Two columns, because V11 is a two-step sequence: the main email, then a
-- day-3 nudge sent by cron only to people who got the main email and still
-- haven't subscribed.

alter table public.profiles
  add column if not exists incomplete_signup_v11_sent_at timestamptz,
  add column if not exists incomplete_signup_v11_nudge_sent_at timestamptz;

comment on column public.profiles.incomplete_signup_v11_sent_at is
  'When the V11 incomplete-signup (abandoned checkout) email was sent. Null = eligible.';
comment on column public.profiles.incomplete_signup_v11_nudge_sent_at is
  'When the V11 day-3 nudge was sent. Null + a non-null v11_sent_at 3-7 days old = eligible for the nudge cron.';

-- Partial index on the "still eligible for the main send" predicate the admin
-- page polls. Tiny on disk — it shrinks to nothing as the campaign completes.
create index if not exists idx_profiles_incomplete_signup_v11_unsent
  on public.profiles (created_at)
  where incomplete_signup_v11_sent_at is null;

-- The nudge cron's predicate: sent the main email, not yet nudged. Ordered by
-- send time because the cron selects a 3-7 day window on that column.
create index if not exists idx_profiles_incomplete_signup_v11_nudge_due
  on public.profiles (incomplete_signup_v11_sent_at)
  where incomplete_signup_v11_sent_at is not null
    and incomplete_signup_v11_nudge_sent_at is null;
