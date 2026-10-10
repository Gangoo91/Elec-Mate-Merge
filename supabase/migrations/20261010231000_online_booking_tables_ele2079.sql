-- ELE-2079 (with ELE-2072) — online booking: tables only.
--
-- Additive: three new tables, RLS on, no client write policies. Everything
-- public goes through the token/slug-keyed SECURITY DEFINER functions in
-- 20261010231200; the office reads and decides through firm-scoped RPCs.
--
--  employer_booking_settings  one row per firm: what can be booked, how long
--                             each takes, the area served, lead time, deposit.
--  employer_online_bookings   each booking a customer made, tentative until the
--                             office accepts it (or confirmed straight away
--                             when the firm allows). The diary entry is a real
--                             employer_jobs row; this is the customer's side.
--  employer_booking_rate_log  hashed IP per lookup / booking, for rate limits.

create table if not exists public.employer_booking_settings (
  firm_id uuid primary key references auth.users(id) on delete cascade,
  enabled boolean not null default false,
  -- The key in /book-visit/<key>: the website embed and the Google Business
  -- Profile "Book" link. Random, so a firm's link can't be guessed or walked.
  public_key text not null unique
    default lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)),
  auto_confirm boolean not null default false,
  lead_days int not null default 2 check (lead_days between 0 and 60),
  horizon_days int not null default 21 check (horizon_days between 3 and 60),
  area_mode text not null default 'radius' check (area_mode in ('radius', 'postcodes')),
  base_postcode text,
  base_lat double precision,
  base_lng double precision,
  radius_miles int not null default 15 check (radius_miles between 1 and 100),
  -- Outward codes ("S10") or whole areas ("S", "DN") the firm covers.
  area_postcodes text[] not null default '{}',
  deposit_enabled boolean not null default false,
  -- [{key, label, minutes, deposit_pounds, required: [credential keys], enabled}]
  types jsonb not null default '[]'::jsonb,
  intro text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid
);
alter table public.employer_booking_settings enable row level security;
comment on table public.employer_booking_settings is
  '[EMPLOYER HUB] Online booking settings (ELE-2079): bookable job types and durations, area served, lead time, deposit, auto-confirm. Scope: firm_id = the owning account. Used by: Diary › Online booking sheet (get/save_booking_settings), public /book-visit/:key and the quote page widget (get_booking_page). Rule: no direct client access; written only by save_booking_settings, deposit fields only by owner/admin.';

create table if not exists public.employer_online_bookings (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid not null references auth.users(id) on delete cascade,
  reference text not null,
  type_key text not null,
  type_label text not null,
  minutes int not null,
  required text[] not null default '{}',
  day date not null,
  half text not null check (half in ('am', 'pm', 'day')),
  start_time time,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  address text,
  postcode text,
  notes text,
  lat double precision,
  lng double precision,
  -- Who the scheduling logic picked for the slot. Holds the slot while the
  -- booking is tentative so two customers can't take the same half-day.
  suggested_employee_id uuid references public.employer_employees(id) on delete set null,
  job_id uuid references public.employer_jobs(id) on delete set null,
  status text not null default 'tentative'
    check (status in ('tentative', 'confirmed', 'declined', 'cancelled')),
  source text not null default 'link' check (source in ('quote_page', 'website', 'google', 'link')),
  deposit_pence int check (deposit_pence is null or deposit_pence between 0 and 100000),
  deposit_invoice_id uuid,
  decided_at timestamptz,
  decided_by uuid,
  decline_reason text,
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists employer_online_bookings_firm_idx
  on public.employer_online_bookings (firm_id, status, day);
create index if not exists employer_online_bookings_person_idx
  on public.employer_online_bookings (suggested_employee_id, day) where status = 'tentative';
alter table public.employer_online_bookings enable row level security;
comment on table public.employer_online_bookings is
  '[EMPLOYER HUB] Bookings customers made online (ELE-2079): type, day and half-day, contact, postcode, deposit, and the diary job it created. Scope: firm_id = the owning account; job_id → employer_jobs; suggested_employee_id → roster. Used by: Diary › Online bookings (get_online_bookings, decide_online_booking), public booking widget (create_online_booking). Rule: no direct client access; tentative rows hold the suggested person''s half-day in the scheduling engine.';

create table if not exists public.employer_booking_rate_log (
  id uuid primary key default gen_random_uuid(),
  firm_id uuid,
  kind text not null check (kind in ('slots', 'book', 'blocked')),
  ip_hash text not null,
  contact_hash text,
  created_at timestamptz not null default now()
);
create index if not exists employer_booking_rate_log_ip_idx
  on public.employer_booking_rate_log (ip_hash, kind, created_at);
alter table public.employer_booking_rate_log enable row level security;
comment on table public.employer_booking_rate_log is
  '[EMPLOYER HUB] Online booking request log (ELE-2079): hashed IP and contact per slot lookup or booking, for server-side rate limits. Scope: firm_id = the owning account. Used by: get_booking_slots, create_online_booking. Rule: no client access; rows older than 30 days are purged on each booking.';

revoke all on public.employer_booking_settings from anon, authenticated;
revoke all on public.employer_online_bookings from anon, authenticated;
revoke all on public.employer_booking_rate_log from anon, authenticated;

insert into public.notification_types (type, category, push, importance)
values ('online_booking', 'tasks_projects', true, 2)
on conflict (type) do nothing;
