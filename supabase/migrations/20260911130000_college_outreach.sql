-- The college outreach tracker, in the database.
--
-- Until now "who we have spoken to" lived in a JSON file on Andrew's Desktop
-- and "who is using it" lived in Stripe. This table carries the tracker's
-- Colleges & training rows so the Colleges page can show both on one row and
-- build the weekly chase list from it. Admin-only: RLS on, no policies, read
-- by the admin-college-activity function with the service role.
create table if not exists public.college_outreach (
  tracker_no     integer primary key,
  org            text not null,
  org_key        text not null,
  contact        text,
  email          text,
  org_type       text,
  first_emailed  date,
  days_silent    integer,
  stage          text not null,
  where_we_are   text,
  why            text,
  next_step      text,
  follow_up      date,
  done           boolean not null default false,
  gmail_url      text,
  code           text,
  signup_link    text,
  imported_at    timestamptz not null default now()
);
comment on table public.college_outreach is 'Colleges & training rows from the outreach tracker (tracker6.json), synced by outreach-tracker/sync_outreach.py. org_key = normalised name for joining to promo codes and tutor accounts.';
create index if not exists college_outreach_org_key_idx on public.college_outreach (org_key);
create index if not exists college_outreach_code_idx on public.college_outreach (code) where code is not null;
create index if not exists college_outreach_stage_idx on public.college_outreach (stage);
alter table public.college_outreach enable row level security;
