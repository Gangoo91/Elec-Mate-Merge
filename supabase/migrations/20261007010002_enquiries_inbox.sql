-- ELE-2022 Enquiries inbox (Isaac Stafford request, 6 Oct 2026).
-- Website forms, forwarded Gmail and lead-site emails arrive at a per-account address
-- (<prefix>-<token>@in.elec-mate.com) and land here as enquiries. Nothing touches
-- `customers` until the user taps Add, so spam and mis-reads stay out of the book.

-- ── Per-account receiving address ────────────────────────────────────────────
create table if not exists public.enquiry_inboxes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  -- Only the token identifies the account; the prefix is cosmetic.
  token text not null unique check (token ~ '^[a-z0-9]{8,16}$'),
  address_prefix text not null default 'enquiries' check (address_prefix ~ '^[a-z0-9]{1,24}$'),
  enabled boolean not null default true,
  -- Gmail sends a confirmation to a new forwarding address; we capture it so the
  -- user can finish setting up the filter without seeing the raw email.
  forwarding_confirmation_code text,
  forwarding_confirmation_link text,
  forwarding_confirmation_at timestamptz,
  last_received_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.enquiry_inboxes enable row level security;

drop policy if exists "Account reads its inbox" on public.enquiry_inboxes;
create policy "Account reads its inbox" on public.enquiry_inboxes
  for select to authenticated
  using (user_id in (select public.my_employer_scope()));
-- No insert/update/delete policies: changes go through the RPCs below.

-- ── Enquiries ────────────────────────────────────────────────────────────────
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null default 'email'
    check (source in ('website','email','checkatrade','mybuilder','bark','ratedpeople','trustatrader','yell','form_post','manual')),
  status text not null default 'new'
    check (status in ('new','converted','dismissed','spam')),

  -- What we read out of the message (all optional; the user confirms before converting)
  name text,
  email text,
  phone text,
  address text,
  postcode text,
  job_description text,
  job_type text,
  urgency text check (urgency in ('emergency','soon','flexible')),
  summary text,
  confidence numeric(3,2) check (confidence between 0 and 1),

  -- The original message
  raw_from text,
  raw_subject text,
  raw_text text,
  message_id text,
  received_at timestamptz not null default now(),

  -- Links once acted on
  matched_customer_id uuid references public.customers(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  quote_id uuid,
  calendar_event_id uuid,
  first_actioned_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_user_status_received_idx
  on public.enquiries (user_id, status, received_at desc);
-- Same message forwarded twice (e.g. form email + Gmail filter) is stored once
create unique index if not exists enquiries_user_message_id_uidx
  on public.enquiries (user_id, message_id) where message_id is not null;

alter table public.enquiries enable row level security;

drop policy if exists "Account reads its enquiries" on public.enquiries;
create policy "Account reads its enquiries" on public.enquiries
  for select to authenticated
  using (user_id in (select public.my_employer_scope()));

drop policy if exists "Account adds enquiries" on public.enquiries;
create policy "Account adds enquiries" on public.enquiries
  for insert to authenticated
  with check (user_id in (select public.my_employer_scope()) and source = 'manual');

drop policy if exists "Account updates its enquiries" on public.enquiries;
create policy "Account updates its enquiries" on public.enquiries
  for update to authenticated
  using (user_id in (select public.my_employer_scope()))
  with check (user_id in (select public.my_employer_scope()));

drop policy if exists "Account deletes its enquiries" on public.enquiries;
create policy "Account deletes its enquiries" on public.enquiries
  for delete to authenticated
  using (user_id in (select public.my_employer_scope()));

create or replace function public.tg_enquiries_touch()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  -- Response time: the first time the user does anything with a new enquiry
  if old.status = 'new' and new.status <> 'new' and new.first_actioned_at is null then
    new.first_actioned_at := now();
  end if;
  -- The original message and where it came from are evidence; never rewritten
  new.raw_from := old.raw_from;
  new.raw_subject := old.raw_subject;
  new.raw_text := old.raw_text;
  new.message_id := old.message_id;
  new.received_at := old.received_at;
  new.user_id := old.user_id;
  return new;
end $$;

drop trigger if exists enquiries_touch on public.enquiries;
create trigger enquiries_touch before update on public.enquiries
  for each row execute function public.tg_enquiries_touch();

-- ── RPCs ─────────────────────────────────────────────────────────────────────
-- Returns the caller's inbox, creating it on first use.
create or replace function public.get_my_enquiry_inbox()
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_row public.enquiry_inboxes;
  v_prefix text;
begin
  if v_uid is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;

  select * into v_row from public.enquiry_inboxes where user_id = v_uid;
  if found then
    return v_row;
  end if;

  select left(regexp_replace(lower(coalesce(cp.company_name, '')), '[^a-z0-9]', '', 'g'), 24)
    into v_prefix
    from public.company_profiles cp where cp.user_id = v_uid
   limit 1;
  if coalesce(v_prefix, '') = '' then
    v_prefix := 'enquiries';
  end if;

  insert into public.enquiry_inboxes (user_id, token, address_prefix)
  values (v_uid, substr(md5(gen_random_uuid()::text), 1, 10), v_prefix)
  on conflict (user_id) do nothing;

  select * into v_row from public.enquiry_inboxes where user_id = v_uid;
  return v_row;
end $$;

-- New token = old address stops working (use if the address is being spammed).
create or replace function public.reset_my_enquiry_inbox_token()
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_row public.enquiry_inboxes;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes
     set token = substr(md5(gen_random_uuid()::text), 1, 10),
         forwarding_confirmation_code = null,
         forwarding_confirmation_link = null,
         forwarding_confirmation_at = null
   where user_id = auth.uid()
  returning * into v_row;
  return v_row;
end $$;

create or replace function public.set_my_enquiry_inbox_enabled(p_enabled boolean)
returns public.enquiry_inboxes
language plpgsql security definer set search_path = public as $$
declare
  v_row public.enquiry_inboxes;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  perform public.get_my_enquiry_inbox();
  update public.enquiry_inboxes set enabled = p_enabled
   where user_id = auth.uid()
  returning * into v_row;
  return v_row;
end $$;

revoke all on function public.get_my_enquiry_inbox() from public, anon;
revoke all on function public.reset_my_enquiry_inbox_token() from public, anon;
revoke all on function public.set_my_enquiry_inbox_enabled(boolean) from public, anon;
grant execute on function public.get_my_enquiry_inbox() to authenticated;
grant execute on function public.reset_my_enquiry_inbox_token() to authenticated;
grant execute on function public.set_my_enquiry_inbox_enabled(boolean) to authenticated;

-- ── Labels (schema_map) ──────────────────────────────────────────────────────
comment on table public.enquiry_inboxes is '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] Per-account enquiry receiving address <address_prefix>-<token>@in.elec-mate.com (ELE-2022). Scope: user_id = the owning account. Used by: Enquiries settings, inbound-enquiry-email fn. Rule: Only the token identifies the account; changed only via get_my_enquiry_inbox / reset_my_enquiry_inbox_token / set_my_enquiry_inbox_enabled.';
comment on table public.enquiries is '[SHARED: ELECTRICAL HUB + EMPLOYER HUB] Inbound customer enquiries (website forms, forwarded email, lead sites) awaiting action (ELE-2022). Scope: user_id = the owning account; firm managers via my_employer_scope(). Used by: Enquiries inbox; converts into customers (+ quote / site visit). Rule: Never writes to customers until the user taps Add; raw_* fields are immutable evidence.';

-- ── Distance from base (postcodes.io → office_lat/lng on company_profiles) ──
alter table public.enquiries
  add column if not exists latitude double precision,
  add column if not exists longitude double precision,
  add column if not exists distance_miles numeric(6,1);
