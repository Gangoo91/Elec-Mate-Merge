-- profiles is readable by every signed-in user ("Authenticated users can view
-- basic profile info"), so profiles.ical_feed_token let anyone fetch another
-- user's job calendar (client names, addresses) from calendar-ical-feed.
-- Move the token to a table only the server can read. Token values are kept,
-- so existing calendar subscriptions keep working.
create table if not exists public.calendar_feed_tokens (
  user_id uuid primary key references auth.users(id) on delete cascade,
  token text not null unique,
  created_at timestamptz not null default now()
);
alter table public.calendar_feed_tokens enable row level security;
-- No policies: service role only (calendar-get-feed-url, calendar-ical-feed).
revoke all on public.calendar_feed_tokens from anon, authenticated;

insert into public.calendar_feed_tokens (user_id, token)
select id, ical_feed_token from public.profiles
where ical_feed_token is not null
on conflict (user_id) do nothing;

-- Applied after calendar-ical-feed and calendar-get-feed-url were redeployed to
-- read calendar_feed_tokens (verified: 20 of 20 tokens matched, feed 200 / bad token 404).
update public.profiles set ical_feed_token = null where ical_feed_token is not null;
comment on column public.profiles.ical_feed_token is
  'RETIRED 6 Oct 2026: readable by every signed-in user. Use calendar_feed_tokens.';
