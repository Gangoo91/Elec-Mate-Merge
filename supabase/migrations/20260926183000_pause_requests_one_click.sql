-- pause_requests — the token behind the "pause it for a month" link.
--
-- Applied to the live project 26 Sep 2026 as `pause_requests_one_click`, and
-- written into the repo here so the table is not a live object with no source.
--
-- Why it exists: on 24 Sep at 23:34 a customer replied to the dormancy email
-- asking to pause for a couple of months while he was signed off sick. That
-- email had offered exactly that, in those words. A reply triggers nothing, so
-- nobody saw it, and his subscription ended at 07:30 the next morning. The
-- offer now ships as a link that does the thing.
--
-- The token IS the authorisation — it arrives in an email, from a mail client
-- with no session. So this table is service-role only: if a signed-in client
-- could read it, it could read someone else's token and pause their billing.
create table if not exists public.pause_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null unique,
  -- offered  → minted at send time, not yet clicked
  -- applied  → Stripe collection actually paused
  -- needs_action → store billing, or nothing live to pause; a human owes a reply
  -- failed / expired → kept for the record, never silently retried
  status text not null default 'offered'
    check (status in ('offered','applied','needs_action','failed','expired')),
  months integer check (months >= 1 and months <= 3),
  source text not null default 'dormant_nudge',
  detail jsonb,
  created_at timestamptz not null default now(),
  used_at timestamptz,
  resumes_at timestamptz
);

create index if not exists pause_requests_user_id_idx on public.pause_requests(user_id);
create index if not exists pause_requests_status_idx on public.pause_requests(status);

alter table public.pause_requests enable row level security;
-- No policies, deliberately: RLS on with nothing granted means only the service
-- role reaches it, which is the whole security model of the link.
revoke all on table public.pause_requests from anon, authenticated;
