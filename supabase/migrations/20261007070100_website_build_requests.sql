-- Electricians without a website can ask Elec-Mate to build one (£199 set-up, then £39/month, 12-month minimum; price changed from £500 + £50/month on 7 Oct).
-- Interest only: no payment in the app; Andrew follows up and invoices.
create table if not exists public.website_build_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text,
  contact_email text,
  contact_phone text,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost', 'cancelled')),
  price_quoted text not null default '£199 set-up, £39/month, 12-month minimum',
  created_at timestamptz not null default now()
);
-- One open request per account
create unique index if not exists website_build_requests_one_open
  on public.website_build_requests (user_id) where status in ('new', 'contacted');

alter table public.website_build_requests enable row level security;
drop policy if exists "Account sees its website request" on public.website_build_requests;
create policy "Account sees its website request" on public.website_build_requests
  for select to authenticated using (user_id in (select public.my_employer_scope()));
-- Written only by the website-build-request function (service role)

comment on table public.website_build_requests is '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] An electrician asking Elec-Mate to build them a website (£199 set-up + £39/month, 12-month minimum), offered on Connect enquiries when they have no site (ELE-2022). Scope: user_id = the account. Used by: website-build-request fn, EnquiriesSetupPage. Rule: interest only, no payment taken in-app; one open request per account; Andrew follows up.';
