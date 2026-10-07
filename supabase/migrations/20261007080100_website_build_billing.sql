-- Website build (£199 set-up + £39/month, 12-month minimum) paid through Stripe.
-- Billed on a SEPARATE Stripe customer tagged kind=website, so it never touches the
-- account's Elec-Mate plan (webhook, nightly sync, reconcile and stats all skip it).
alter table public.website_build_requests
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists checkout_session_id text,
  add column if not exists subscription_status text,
  add column if not exists paid_at timestamptz,
  add column if not exists last_paid_at timestamptz,
  add column if not exists commitment_ends_at timestamptz,
  add column if not exists site_url text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.website_build_requests drop constraint if exists website_build_requests_status_check;
alter table public.website_build_requests add constraint website_build_requests_status_check
  check (status in ('new', 'contacted', 'paid', 'building', 'live', 'won', 'lost', 'cancelled'));

-- One active request or website per account
drop index if exists website_build_requests_one_open;
create unique index website_build_requests_one_open
  on public.website_build_requests (user_id) where status in ('new', 'contacted', 'paid', 'building', 'live');
create unique index if not exists website_build_requests_subscription
  on public.website_build_requests (stripe_subscription_id) where stripe_subscription_id is not null;

alter table public.website_build_requests add column if not exists origin text not null default 'interest' check (origin in ('interest', 'checkout'));
comment on column public.website_build_requests.origin is 'interest = they tapped "Talk to us first" (founder emailed); checkout = row made when they opened Stripe Checkout (may never have paid).';
