-- ELE-2062 + ELE-2063: holiday and sick pay law, apprentice pay and money.
--
-- Additive only. Nothing HEAD or iOS build 49 reads changes shape:
--   * new tables (RLS on): statutory_pay_rates, employer_employee_pay_profiles,
--     employer_holiday_records, employer_sickness_records
--   * one nullable column: employer_leave_requests.hours
--   * one new AFTER trigger on employer_leave_requests that only copies an
--     approved holiday into the 6-year record; it swallows its own errors so a
--     leave write can never fail because of it
--   * new functions, a private 'fit-notes' bucket, two notification types and a
--     daily cron job
--
-- Law (checked 10 Oct 2026, links in the Linear comments):
--   NMW from 1 Apr 2026: 21+ £12.71, 18-20 £10.85, under 18 £8.00, apprentice
--     £8.00 (under 19, or 19+ in the first year). gov.uk/national-minimum-wage-rates
--   SSP from 6 Apr 2026: lower of £123.25 or 80% of normal weekly earnings
--     (SSCBA 1992 s.157), waiting days gone (s.155(1) omitted by ERA 2025).
--   Holiday records: WTR 1998 reg 16B, keep 6 years (from 6 Apr 2026).
--   Irregular hours: WTR reg 15B (12.07% of hours worked each pay period),
--     reg 16A rolled-up holiday pay.
--   Young workers: WTR reg 5A (8h a day, 40h a week), reg 12(4) (30 minutes
--     after 4.5 hours).
--   Apprentice funding 2026/27 v3: rule 125 (£1,000), 127.2 (care leaver
--     bursary £3,000), 133 and 137 (£2,000 hiring payment).

-- ── 1. Statutory rates (one source for the cron and the app) ─────────────
create table if not exists public.statutory_pay_rates (
  key text not null check (key in ('nmw_21_plus', 'nmw_18_20', 'nmw_under_18', 'nmw_apprentice', 'ssp_weekly')),
  effective_from date not null,
  amount numeric(10, 2) not null check (amount > 0),
  source_url text not null,
  primary key (key, effective_from)
);
alter table public.statutory_pay_rates enable row level security;
drop policy if exists "Anyone signed in reads statutory pay rates" on public.statutory_pay_rates;
create policy "Anyone signed in reads statutory pay rates"
  on public.statutory_pay_rates for select to authenticated using (true);

insert into public.statutory_pay_rates (key, effective_from, amount, source_url) values
  ('nmw_21_plus',    '2025-04-01', 12.21, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_18_20',      '2025-04-01', 10.00, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_under_18',   '2025-04-01',  7.55, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_apprentice', '2025-04-01',  7.55, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_21_plus',    '2026-04-01', 12.71, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_18_20',      '2026-04-01', 10.85, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_under_18',   '2026-04-01',  8.00, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('nmw_apprentice', '2026-04-01',  8.00, 'https://www.gov.uk/national-minimum-wage-rates'),
  ('ssp_weekly',     '2025-04-06', 118.75, 'https://www.legislation.gov.uk/ukpga/1992/4/section/157'),
  ('ssp_weekly',     '2026-04-06', 123.25, 'https://www.legislation.gov.uk/ukpga/1992/4/section/157')
on conflict (key, effective_from) do nothing;

-- ── 2. Pay profile per roster person (owner/admin only) ─────────────────
create table if not exists public.employer_employee_pay_profiles (
  employee_id uuid primary key references public.employer_employees(id) on delete cascade,
  employer_id uuid not null,
  date_of_birth date check (date_of_birth is null or date_of_birth >= '1930-01-01'),
  apprenticeship_start_date date,
  holiday_basis text not null default 'fixed' check (holiday_basis in ('fixed', 'irregular', 'part_year')),
  rolled_up_holiday boolean not null default false,
  -- Declared by the apprentice with consent (funding rule 127.4). Optional.
  care_leaver_declared boolean not null default false,
  ehcp_declared boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  constraint pay_profile_rolled_up_only_irregular
    check (not rolled_up_holiday or holiday_basis in ('irregular', 'part_year'))
);
create index if not exists employer_employee_pay_profiles_employer_idx
  on public.employer_employee_pay_profiles (employer_id);
alter table public.employer_employee_pay_profiles enable row level security;

drop policy if exists "Owner and admins read pay profiles" on public.employer_employee_pay_profiles;
create policy "Owner and admins read pay profiles"
  on public.employer_employee_pay_profiles for select to authenticated
  using (employer_id in (select public.my_employer_admin_scope()));

drop policy if exists "Owner and admins add pay profiles" on public.employer_employee_pay_profiles;
create policy "Owner and admins add pay profiles"
  on public.employer_employee_pay_profiles for insert to authenticated
  with check (
    employer_id in (select public.my_employer_admin_scope())
    and exists (select 1 from public.employer_employees e
                 where e.id = employee_id and e.employer_id = employer_employee_pay_profiles.employer_id)
  );

drop policy if exists "Owner and admins change pay profiles" on public.employer_employee_pay_profiles;
create policy "Owner and admins change pay profiles"
  on public.employer_employee_pay_profiles for update to authenticated
  using (employer_id in (select public.my_employer_admin_scope()))
  with check (
    employer_id in (select public.my_employer_admin_scope())
    and exists (select 1 from public.employer_employees e
                 where e.id = employee_id and e.employer_id = employer_employee_pay_profiles.employer_id)
  );

create or replace function public.tg_pay_profile_touch()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  return new;
end $$;
drop trigger if exists pay_profile_touch on public.employer_employee_pay_profiles;
create trigger pay_profile_touch before update on public.employer_employee_pay_profiles
  for each row execute function public.tg_pay_profile_touch();

-- ── 3. Hours of holiday on a leave request (irregular-hours workers) ─────
alter table public.employer_leave_requests add column if not exists hours numeric(6, 2);
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'employer_leave_requests_hours_range') then
    alter table public.employer_leave_requests
      add constraint employer_leave_requests_hours_range check (hours is null or (hours >= 0 and hours <= 2000));
  end if;
end $$;

-- ── 4. The 6-year holiday record (WTR reg 16B) ──────────────────────────
-- No foreign key to the roster on purpose: the record must outlive a person
-- being removed. No insert/update/delete policies: rows are written only by
-- the functions below, and nobody can edit or delete them from the app.
create table if not exists public.employer_holiday_records (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  employee_id uuid not null,
  employee_name text,
  kind text not null check (kind in (
    'leave_approved', 'leave_reversed', 'accrual', 'holiday_pay', 'rolled_up_pay', 'entitlement')),
  period_start date,
  period_end date,
  days numeric(6, 2),
  hours numeric(8, 2),
  amount numeric(12, 2),
  basis text check (basis is null or basis in ('fixed', 'irregular', 'part_year')),
  method text,
  is_estimate boolean not null default false,
  source text,
  source_id uuid,
  recorded_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists employer_holiday_records_person_idx
  on public.employer_holiday_records (employer_id, employee_id, created_at desc);
create index if not exists employer_holiday_records_source_idx
  on public.employer_holiday_records (source_id) where source_id is not null;
alter table public.employer_holiday_records enable row level security;

drop policy if exists "Owner and admins read holiday records" on public.employer_holiday_records;
create policy "Owner and admins read holiday records"
  on public.employer_holiday_records for select to authenticated
  using (employer_id in (select public.my_employer_admin_scope()));

drop policy if exists "Worker reads own holiday record" on public.employer_holiday_records;
create policy "Worker reads own holiday record"
  on public.employer_holiday_records for select to authenticated
  using (employee_id in (select public.my_employee_ids()));

-- Copy approved holiday into the record (and a reversal if it is later
-- declined or cancelled). Never blocks the leave write.
create or replace function public.tg_holiday_record_from_leave()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_emp record;
  v_old text := case when tg_op = 'UPDATE' then lower(coalesce(old.status, '')) else '' end;
  v_new text := lower(coalesce(new.status, ''));
  v_kind text;
begin
  if coalesce(new.type, '') not in ('annual', 'bank_holiday') then
    return new;
  end if;
  if v_new = 'approved' and v_old <> 'approved' then
    v_kind := 'leave_approved';
  elsif v_old = 'approved' and v_new in ('rejected', 'cancelled') then
    v_kind := 'leave_reversed';
  else
    return new;
  end if;

  select e.employer_id, e.name into v_emp from employer_employees e where e.id = new.employee_id;
  if v_emp.employer_id is null then
    return new;
  end if;
  insert into employer_holiday_records
    (employer_id, employee_id, employee_name, kind, period_start, period_end, days, hours,
     basis, method, source, source_id, recorded_by)
  values (
    v_emp.employer_id, new.employee_id, coalesce(new.employee_name, v_emp.name), v_kind,
    new.start_date, coalesce(case when new.half_day is not null then new.start_date end, new.end_date),
    new.total_days, new.hours,
    (select p.holiday_basis from employer_employee_pay_profiles p where p.employee_id = new.employee_id),
    case when v_kind = 'leave_approved'
         then initcap(replace(new.type, '_', ' ')) || ' approved by ' || coalesce(new.approved_by, 'the office')
         else initcap(replace(new.type, '_', ' ')) || ' ' || v_new || ' after approval' end,
    'leave_request', new.id, auth.uid());
  return new;
exception when others then
  raise warning '[tg_holiday_record_from_leave] %: %', new.id, sqlerrm;
  return new;
end $$;
revoke all on function public.tg_holiday_record_from_leave() from public, anon;

drop trigger if exists holiday_record_from_leave on public.employer_leave_requests;
create trigger holiday_record_from_leave
  after insert or update of status on public.employer_leave_requests
  for each row execute function public.tg_holiday_record_from_leave();

-- Accrual, holiday pay and rolled-up pay per pay period, written when the
-- payroll file is made. Identical rows are not written twice; a changed figure
-- for the same period is written as a new row (the latest is the current one).
create or replace function public.record_holiday_period(p_firm uuid, p_rows jsonb)
returns integer language plpgsql security definer set search_path = public as $$
declare
  r jsonb;
  v_n int := 0;
  v_emp record;
  v_kind text;
begin
  if not public.can_see_firm_money(p_firm) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if jsonb_typeof(p_rows) <> 'array' or jsonb_array_length(p_rows) > 500 then
    raise exception 'invalid' using errcode = '22023';
  end if;
  for r in select * from jsonb_array_elements(p_rows) loop
    v_kind := r->>'kind';
    continue when v_kind not in ('accrual', 'holiday_pay', 'rolled_up_pay', 'entitlement');
    select e.id, e.name into v_emp from employer_employees e
     where e.id = (r->>'employee_id')::uuid and e.employer_id = p_firm;
    continue when v_emp.id is null;
    continue when exists (
      select 1 from employer_holiday_records h
       where h.employer_id = p_firm and h.employee_id = v_emp.id and h.kind = v_kind
         and h.period_start is not distinct from (r->>'period_start')::date
         and h.period_end is not distinct from (r->>'period_end')::date
         and h.hours is not distinct from (r->>'hours')::numeric
         and h.days is not distinct from (r->>'days')::numeric
         and h.amount is not distinct from (r->>'amount')::numeric);
    insert into employer_holiday_records
      (employer_id, employee_id, employee_name, kind, period_start, period_end, days, hours,
       amount, basis, method, is_estimate, source)
    values (p_firm, v_emp.id, v_emp.name, v_kind, (r->>'period_start')::date, (r->>'period_end')::date,
            (r->>'days')::numeric, (r->>'hours')::numeric, (r->>'amount')::numeric,
            nullif(r->>'basis', ''), left(r->>'method', 500), coalesce((r->>'is_estimate')::boolean, false),
            coalesce(nullif(r->>'source', ''), 'payroll_export'));
    v_n := v_n + 1;
  end loop;
  return v_n;
end $$;
revoke all on function public.record_holiday_period(uuid, jsonb) from public, anon;
grant execute on function public.record_holiday_period(uuid, jsonb) to authenticated;

-- ── 5. Sickness: SSP inputs, fit note, return to work ───────────────────
-- Keyed to the sick leave request. The record outlives the request (SSP
-- records are kept 3 years after the tax year), so the link is set null.
create table if not exists public.employer_sickness_records (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  employee_id uuid not null,
  leave_request_id uuid unique references public.employer_leave_requests(id) on delete set null,
  start_date date not null,
  end_date date,
  qualifying_days_per_week numeric(3, 1) check (qualifying_days_per_week is null or qualifying_days_per_week between 1 and 7),
  average_weekly_earnings numeric(10, 2) check (average_weekly_earnings is null or average_weekly_earnings >= 0),
  fit_note_path text,
  fit_note_name text,
  fit_note_until date,
  fit_note_uploaded_at timestamptz,
  fit_note_uploaded_by uuid,
  rtw_date date,
  rtw_fit_for_full_duties boolean,
  rtw_adjustments text check (rtw_adjustments is null or length(rtw_adjustments) <= 2000),
  rtw_notes text check (rtw_notes is null or length(rtw_notes) <= 4000),
  rtw_recorded_by uuid,
  rtw_recorded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists employer_sickness_records_person_idx
  on public.employer_sickness_records (employer_id, employee_id, start_date desc);
alter table public.employer_sickness_records enable row level security;

drop policy if exists "Owner and admins manage sickness records" on public.employer_sickness_records;
create policy "Owner and admins manage sickness records"
  on public.employer_sickness_records for all to authenticated
  using (employer_id in (select public.my_employer_admin_scope()))
  with check (
    employer_id in (select public.my_employer_admin_scope())
    and exists (select 1 from public.employer_employees e
                 where e.id = employee_id and e.employer_id = employer_sickness_records.employer_id)
  );

drop policy if exists "Worker reads own sickness records" on public.employer_sickness_records;
create policy "Worker reads own sickness records"
  on public.employer_sickness_records for select to authenticated
  using (employee_id in (select public.my_employee_ids()));

create or replace function public.tg_sickness_touch()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists sickness_touch on public.employer_sickness_records;
create trigger sickness_touch before update on public.employer_sickness_records
  for each row execute function public.tg_sickness_touch();

-- Fit notes: private bucket, files under the uploader's own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fit-notes', 'fit-notes', false, 10485760,
        array['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
on conflict (id) do nothing;

drop policy if exists "Fit notes: upload to own folder" on storage.objects;
create policy "Fit notes: upload to own folder"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'fit-notes' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Fit notes: read own or firm" on storage.objects;
create policy "Fit notes: read own or firm"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'fit-notes'
    and (
      (storage.foldername(name))[1] = (select auth.uid())::text
      or exists (
        select 1 from public.employer_sickness_records s
         where s.fit_note_path = storage.objects.name
           and (s.employer_id in (select public.my_employer_admin_scope())
                or s.employee_id in (select public.my_employee_ids()))
      )
    )
  );

-- The worker sends their own fit note from Worker Tools.
create or replace function public.attach_my_fit_note(
  p_leave_request uuid, p_path text, p_name text, p_until date default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_lr record;
  v_id uuid;
begin
  select lr.id, lr.employee_id, lr.start_date, lr.end_date, lr.type, e.employer_id, e.name
    into v_lr
    from employer_leave_requests lr join employer_employees e on e.id = lr.employee_id
   where lr.id = p_leave_request and lr.employee_id in (select public.my_employee_ids());
  if v_lr.id is null or v_lr.type <> 'sick' then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if p_path is null or split_part(p_path, '/', 1) <> auth.uid()::text then
    raise exception 'invalid' using errcode = '22023';
  end if;
  insert into employer_sickness_records
    (employer_id, employee_id, leave_request_id, start_date, end_date,
     fit_note_path, fit_note_name, fit_note_until, fit_note_uploaded_at, fit_note_uploaded_by)
  values (v_lr.employer_id, v_lr.employee_id, v_lr.id, v_lr.start_date, v_lr.end_date,
          p_path, left(p_name, 200), p_until, now(), auth.uid())
  on conflict (leave_request_id) do update
    set fit_note_path = excluded.fit_note_path, fit_note_name = excluded.fit_note_name,
        fit_note_until = excluded.fit_note_until, fit_note_uploaded_at = now(),
        fit_note_uploaded_by = auth.uid()
  returning id into v_id;

  perform public.notify_employer_bell(
    v_lr.employer_id, 'fit_note',
    'Fit note from ' || coalesce(nullif(split_part(v_lr.name, ' ', 1), ''), 'a worker'),
    'Sent for the sickness from ' || to_char(v_lr.start_date, 'FMDD Mon') || '.',
    jsonb_build_object('route', '/employer?section=leave&sick=' || v_lr.id,
                       'employee_id', v_lr.employee_id, 'leave_request_id', v_lr.id));
  return v_id;
end $$;
revoke all on function public.attach_my_fit_note(uuid, text, text, date) from public, anon;
grant execute on function public.attach_my_fit_note(uuid, text, text, date) to authenticated;

-- ── 6. Helpers the app reads ────────────────────────────────────────────
-- Under-18s on the team (for the timesheet and diary warnings). Gives the date
-- they turn 18, only for people under 18 now or in the last two years
-- (working-time records are kept two years). Office managers can call it.
create or replace function public.get_young_workers(p_firm uuid)
returns table (employee_id uuid, adult_from date)
language sql stable security definer set search_path = public as $$
  select p.employee_id, (p.date_of_birth + interval '18 years')::date
    from employer_employee_pay_profiles p
    join employer_employees e on e.id = p.employee_id
   where p.employer_id = p_firm
     and p_firm in (select public.my_employer_scope())
     and p.date_of_birth is not null
     and (p.date_of_birth + interval '18 years')::date > current_date - 730;
$$;
revoke all on function public.get_young_workers(uuid) from public, anon;
grant execute on function public.get_young_workers(uuid) to authenticated;

-- The worker's own holiday basis (no date of birth).
create or replace function public.get_my_holiday_basis()
returns table (employee_id uuid, holiday_basis text, rolled_up_holiday boolean)
language sql stable security definer set search_path = public as $$
  select e.id, coalesce(p.holiday_basis, 'fixed'), coalesce(p.rolled_up_holiday, false)
    from employer_employees e
    left join employer_employee_pay_profiles p on p.employee_id = e.id
   where e.id in (select public.my_employee_ids());
$$;
revoke all on function public.get_my_holiday_basis() from public, anon;
grant execute on function public.get_my_holiday_basis() to authenticated;

-- Legal minimum hourly rate for a person on a date.
create or replace function public.nmw_minimum_on(p_dob date, p_app_start date, p_on date)
returns table (band text, rate numeric)
language plpgsql stable set search_path = public as $$
declare
  v_age int;
  v_band text;
begin
  if p_dob is not null then
    v_age := extract(year from age(p_on, p_dob))::int;
  end if;
  if p_app_start is not null and p_on >= p_app_start
     and ((v_age is not null and v_age < 19) or p_on < (p_app_start + interval '1 year')::date) then
    v_band := 'nmw_apprentice';
  elsif v_age is null then
    return;
  elsif v_age >= 21 then
    v_band := 'nmw_21_plus';
  elsif v_age >= 18 then
    v_band := 'nmw_18_20';
  else
    v_band := 'nmw_under_18';
  end if;
  return query
    select v_band, r.amount from statutory_pay_rates r
     where r.key = v_band and r.effective_from <= p_on
     order by r.effective_from desc limit 1;
end $$;
revoke all on function public.nmw_minimum_on(date, date, date) from public, anon;
grant execute on function public.nmw_minimum_on(date, date, date) to authenticated;

-- ── 7. Daily alerts: apprentice rate, pay below the minimum, fit notes ──
insert into public.notification_types (type, category, push, importance) values
  ('pay_rate_alert', 'certificates_compliance', true, 2),
  ('fit_note', 'tasks_projects', true, 1)
on conflict (type) do nothing;

create or replace function public.notify_pay_law_alerts()
returns void language plpgsql security definer set search_path = public as $$
declare
  r record;
  m record;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_ends date;
  v_ref text;
  v_first text;
  v_min record;
  v_now_min record;
begin
  -- 1. Apprentice rate ending (age 19+ and past the first year).
  for r in
    select p.employee_id, p.employer_id, p.date_of_birth, p.apprenticeship_start_date,
           e.name, e.hourly_rate, e.pay_type
      from employer_employee_pay_profiles p
      join employer_employees e on e.id = p.employee_id
     where p.date_of_birth is not null and p.apprenticeship_start_date is not null
       and lower(coalesce(e.status, '')) = 'active'
  loop
    begin
      v_ends := greatest((r.date_of_birth + interval '19 years')::date,
                         (r.apprenticeship_start_date + interval '1 year')::date);
      continue when v_ends > v_today + 30 or v_ends < v_today - 30;
      v_ref := 'apprate:' || r.employee_id || ':' || v_ends;
      insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
      continue when not found;
      select * into v_min from public.nmw_minimum_on(r.date_of_birth, r.apprenticeship_start_date, v_ends);
      v_first := coalesce(nullif(split_part(r.name, ' ', 1), ''), 'An apprentice');
      perform public.notify_employer_bell(
        r.employer_id, 'pay_rate_alert',
        'Apprentice rate ends for ' || v_first,
        case when v_ends > v_today then 'From ' || to_char(v_ends, 'FMDD Mon YYYY') else 'Since ' || to_char(v_ends, 'FMDD Mon YYYY') end
          || ' they are 19 or over and past their first year, so the legal minimum is £'
          || to_char(v_min.rate, 'FM990.00') || ' an hour'
          || case when r.pay_type = 'hourly' and coalesce(r.hourly_rate, 0) > 0 and r.hourly_rate < v_min.rate
                  then '. Their rate is £' || to_char(r.hourly_rate, 'FM990.00') || ', so it needs to go up.'
                  else '.' end,
        jsonb_build_object('route', '/employer?section=team&member=' || r.employee_id || '&memberTab=details',
                           'employee_id', r.employee_id, 'ref_id', v_ref));
    exception when others then
      raise warning '[notify_pay_law_alerts] apprate %: %', r.employee_id, sqlerrm;
    end;
  end loop;

  -- 2. Hourly rate below the legal minimum now, or within 30 days (a
  --    birthday, the first anniversary, or the April uprating).
  for r in
    select p.employee_id, p.employer_id, p.date_of_birth, p.apprenticeship_start_date,
           e.name, e.hourly_rate
      from employer_employee_pay_profiles p
      join employer_employees e on e.id = p.employee_id
     where lower(coalesce(e.status, '')) = 'active'
       and e.pay_type = 'hourly' and coalesce(e.hourly_rate, 0) > 0
       and (p.date_of_birth is not null or p.apprenticeship_start_date is not null)
  loop
    begin
      v_first := coalesce(nullif(split_part(r.name, ' ', 1), ''), 'Someone');
      select * into v_now_min from public.nmw_minimum_on(r.date_of_birth, r.apprenticeship_start_date, v_today);
      if v_now_min.rate is not null and r.hourly_rate < v_now_min.rate then
        v_ref := 'nmwbelow:' || r.employee_id || ':' || v_now_min.band || ':' || v_now_min.rate || ':' || r.hourly_rate;
        insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
        if found then
          perform public.notify_employer_bell(
            r.employer_id, 'pay_rate_alert',
            v_first || ' is paid below the legal minimum',
            '£' || to_char(r.hourly_rate, 'FM990.00') || ' an hour. The minimum for them today is £'
              || to_char(v_now_min.rate, 'FM990.00') || '.',
            jsonb_build_object('route', '/employer?section=team&member=' || r.employee_id || '&memberTab=details',
                               'employee_id', r.employee_id, 'ref_id', v_ref));
        end if;
        continue;
      end if;
      for m in select g::date as d from generate_series(v_today + 1, v_today + 30, interval '1 day') g loop
        select * into v_min from public.nmw_minimum_on(r.date_of_birth, r.apprenticeship_start_date, m.d);
        if v_min.rate is not null and r.hourly_rate < v_min.rate then
          v_ref := 'nmwrise:' || r.employee_id || ':' || m.d || ':' || v_min.rate;
          insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
          if found then
            perform public.notify_employer_bell(
              r.employer_id, 'pay_rate_alert',
              'Pay rise due for ' || v_first,
              'From ' || to_char(m.d, 'FMDD Mon YYYY') || ' the legal minimum for them is £'
                || to_char(v_min.rate, 'FM990.00') || ' an hour. They are on £'
                || to_char(r.hourly_rate, 'FM990.00') || '.',
              jsonb_build_object('route', '/employer?section=team&member=' || r.employee_id || '&memberTab=details',
                                 'employee_id', r.employee_id, 'ref_id', v_ref));
          end if;
          exit;
        end if;
      end loop;
    exception when others then
      raise warning '[notify_pay_law_alerts] nmw %: %', r.employee_id, sqlerrm;
    end;
  end loop;

  -- 3. Fit note needed: off sick more than 7 days in a row (including
  --    non-working days) and no fit note on the record yet.
  for r in
    select lr.id, lr.employee_id, lr.start_date, lr.end_date, e.employer_id, e.name, e.user_id
      from employer_leave_requests lr
      join employer_employees e on e.id = lr.employee_id
      left join employer_sickness_records s on s.leave_request_id = lr.id
     where lr.type = 'sick'
       and lower(coalesce(lr.status, '')) in ('approved', 'pending')
       and lower(coalesce(e.status, '')) = 'active'
       and lr.start_date + 7 <= v_today
       and lr.end_date - lr.start_date + 1 > 7
       and lr.start_date >= v_today - 120
       and s.fit_note_path is null
  loop
    begin
      v_ref := 'fitnote:' || r.id;
      insert into employer_expiry_sent (firm, ref) values (r.employer_id, v_ref) on conflict do nothing;
      continue when not found;
      v_first := coalesce(nullif(split_part(r.name, ' ', 1), ''), 'Someone');
      perform public.notify_employer_bell(
        r.employer_id, 'fit_note',
        'Fit note needed from ' || v_first,
        'Off sick since ' || to_char(r.start_date, 'FMDD Mon') || ', more than 7 days. Ask for a fit note and add it to the sickness record.',
        jsonb_build_object('route', '/employer?section=leave&sick=' || r.id,
                           'employee_id', r.employee_id, 'leave_request_id', r.id, 'ref_id', v_ref));
      if r.user_id is not null then
        perform public.worker_notify(
          r.user_id, 'fit_note',
          'Send the office your fit note',
          'You have been off more than 7 days, so the office needs a fit note from your GP or the hospital. Add a photo of it in Leave.',
          jsonb_build_object('route', '/electrician/worker-tools/leave?sick=' || r.id,
                             'employee_id', r.employee_id, 'leave_request_id', r.id));
      end if;
    exception when others then
      raise warning '[notify_pay_law_alerts] fitnote %: %', r.id, sqlerrm;
    end;
  end loop;
end $$;
revoke all on function public.notify_pay_law_alerts() from public, anon, authenticated;

do $$ begin
  if exists (select 1 from cron.job where jobname = 'employer-pay-law-alerts') then
    perform cron.unschedule('employer-pay-law-alerts');
  end if;
  perform cron.schedule('employer-pay-law-alerts', '5 8 * * *', 'select public.notify_pay_law_alerts();');
end $$;

-- ── 8. Labels ───────────────────────────────────────────────────────────
comment on table public.statutory_pay_rates is '[SHARED] NMW bands and the SSP weekly rate by the date they start. Scope: everyone signed in reads. Used by: pay-law checks in Team, Apprentices, Timesheets, Leave; notify_pay_law_alerts. Rule: add new rates as new rows each April, never edit old ones.';
comment on table public.employer_employee_pay_profiles is '[EMPLOYER HUB — MONEY] Per roster person: date of birth, apprenticeship start, holiday basis (fixed / irregular / part-year), rolled-up holiday. Scope: owner and admins of the firm. Used by: Team person sheet, Leave, Timesheets payroll file, Apprentices funding. Rule: office managers get only the under-18 date through get_young_workers.';
comment on table public.employer_holiday_records is '[EMPLOYER HUB → WORKER TOOLS] The 6-year holiday record (WTR reg 16B): approved holiday, reversals, accrual and holiday pay per pay period. Scope: owner and admins; the worker reads their own. Used by: Leave, Team person sheet, payroll file. Rule: insert-only through tg_holiday_record_from_leave and record_holiday_period; never update or delete.';
comment on table public.employer_sickness_records is '[EMPLOYER HUB → WORKER TOOLS] Per sick leave request: SSP inputs, fit note, return-to-work record. Scope: owner and admins manage; the worker reads their own and sends the fit note through attach_my_fit_note. Used by: Leave, payroll file, Worker Tools Leave. Rule: kept when the leave request is deleted (SSP records, 3 years after the tax year).';
