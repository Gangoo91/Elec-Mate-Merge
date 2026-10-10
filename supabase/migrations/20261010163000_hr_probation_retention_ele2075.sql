-- ELE-2075 (not the complaints log, which ships with the assessment pack):
-- probation and qualifying-period tracker, data retention schedule with a
-- review queue, and leaver anonymisation that keeps what the law requires.
--
-- Law (checked 10 Oct 2026):
--   * Unfair dismissal qualifying period falls from 2 years to 6 months for
--     dismissals from 1 January 2027 (Employment Rights Act 2025 s.25):
--     https://www.gov.uk/dismiss-staff/eligibility-to-claim-unfair-dismissal
--     https://www.gov.uk/government/publications/implementing-the-plan-to-make-work-pay-and-employment-rights-act/plan-to-make-work-pay-and-employment-rights-act-timeline-update
--     https://www.legislation.gov.uk/ukpga/2025/36/section/25
--   * Fire and rehire protections, January 2027 (ERA 2025 s.28, "restricted
--     variation"): https://www.legislation.gov.uk/ukpga/2025/36/section/28
--   * Retention:
--       right-to-work copies: employment + 2 years, then destroy (Home Office guide)
--       holiday records: 6 years from when made, from 6 Apr 2026
--         https://www.gov.uk/holiday-entitlement-rights/holiday-pay-the-basics
--       minimum wage records: 6 years
--         https://www.gov.uk/national-minimum-wage/employers-and-the-minimum-wage
--       PAYE records: 3 years from the end of the tax year
--         https://www.gov.uk/paye-for-employers/keeping-records
--       accident book: 3 years from the entry (SS (Claims and Payments) Regs 1979 reg 25)
--         https://www.legislation.gov.uk/uksi/1979/628/regulation/25
--       RIDDOR records: 3 years (RIDDOR 2013 reg 12)
--         https://www.legislation.gov.uk/uksi/2013/1471/regulation/12
--       contract claims: 6 years (Limitation Act 1980 s.5)
--         https://www.legislation.gov.uk/ukpga/1980/58/section/5
--       UK GDPR sets no fixed periods; keep no longer than needed (ICO storage limitation)
--         https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/
--
-- Additive only:
--   * employer_person_hr          per person: start, probation, leaving date, what was removed
--   * hr_qualifying_date(date)    the date unfair dismissal protection starts
--   * hr_retention_schedule()     the schedule, with sources
--   * hr_people / hr_retention_queue / hr_anonymise_leaver / hr_anonymise_applications
--   * employer_expiry_items gains probation reviews and qualifying dates

-- 1. Per person HR record ------------------------------------------------------
create table if not exists public.employer_person_hr (
  roster_id uuid primary key references public.employer_employees(id) on delete cascade,
  employer_id uuid not null,
  start_date date,
  probation_end_date date,
  probation_review_date date,
  probation_outcome text check (probation_outcome in ('passed', 'extended', 'ended')),
  probation_outcome_on date,
  probation_notes text,
  left_on date,
  contact_removed_at timestamptz,
  rtw_removed_at timestamptz,
  name_removed_at timestamptz,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid()
);
create index if not exists employer_person_hr_firm_idx on public.employer_person_hr (employer_id);
alter table public.employer_person_hr enable row level security;
comment on table public.employer_person_hr is
  '[EMPLOYER] One row per roster person: employment start, probation end / review / outcome, leaving date, and when contact details, right-to-work copies and the name were removed under the retention schedule. Scope: employer_id = the firm; owner/admin only (can_see_firm_money). Used by: People > Right to work and HR records, the person sheet, employer_expiry_items (probation reminders) (ELE-2075).';

drop policy if exists "person hr owner admin read" on public.employer_person_hr;
create policy "person hr owner admin read" on public.employer_person_hr
  for select to authenticated
  using (public.can_see_firm_money(employer_id));
drop policy if exists "person hr owner admin insert" on public.employer_person_hr;
create policy "person hr owner admin insert" on public.employer_person_hr
  for insert to authenticated
  with check (
    public.can_see_firm_money(employer_id)
    and roster_id in (select e.id from public.employer_employees e
                       where e.employer_id = employer_person_hr.employer_id)
  );
drop policy if exists "person hr owner admin update" on public.employer_person_hr;
create policy "person hr owner admin update" on public.employer_person_hr
  for update to authenticated
  using (public.can_see_firm_money(employer_id))
  with check (public.can_see_firm_money(employer_id));

-- 2. Qualifying date ------------------------------------------------------------
-- Before 1 Jan 2027 the period is 2 years; for dismissals from that date it is
-- 6 months. So protection starts at start + 2 years if that falls before
-- 1 Jan 2027, otherwise at the later of start + 6 months and 1 Jan 2027.
create or replace function public.hr_qualifying_date(p_start date)
returns date
language sql
immutable
set search_path = public
as $fn$
  select case
    when p_start is null then null
    when (p_start + interval '2 years')::date < date '2027-01-01' then (p_start + interval '2 years')::date
    else greatest((p_start + interval '6 months')::date, date '2027-01-01')
  end;
$fn$;
revoke all on function public.hr_qualifying_date(date) from public, anon;
grant execute on function public.hr_qualifying_date(date) to authenticated;

-- 3. Retention schedule ---------------------------------------------------------
create or replace function public.hr_retention_schedule()
returns table (
  record_type text, label text, months integer, counted_from text,
  basis text, at_end text, source_url text
)
language sql
immutable
set search_path = public
as $fn$
  values
    ('rtw', 'Right-to-work check copies', 24, 'leaving', 'statutory',
     'Removed', 'https://www.gov.uk/government/publications/right-to-work-checks-employers-guide'),
    ('holiday', 'Holiday records', 72, 'record', 'statutory',
     'Kept until then', 'https://www.gov.uk/holiday-entitlement-rights/holiday-pay-the-basics'),
    ('timesheets', 'Timesheets and pay records', 72, 'record', 'statutory',
     'Kept until then', 'https://www.gov.uk/national-minimum-wage/employers-and-the-minimum-wage'),
    ('payroll', 'Payroll exports', 72, 'record', 'statutory',
     'Kept until then', 'https://www.gov.uk/paye-for-employers/keeping-records'),
    ('accident', 'Accident book and RIDDOR records', 36, 'record', 'statutory',
     'Never removed here', 'https://www.legislation.gov.uk/uksi/1979/628/regulation/25'),
    ('hr_file', 'Name, probation and HR notes', 72, 'leaving', 'suggested',
     'Name replaced', 'https://www.legislation.gov.uk/ukpga/1980/58/section/5'),
    ('contact', 'Leaver contact details', 0, 'leaving', 'suggested',
     'Removed', 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/'),
    ('cvs', 'CVs from unsuccessful applicants', 6, 'decision', 'suggested',
     'Removed', 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/')
$fn$;
revoke all on function public.hr_retention_schedule() from public, anon;
grant execute on function public.hr_retention_schedule() to authenticated;

-- A firm may keep longer than the statutory minimum, never shorter.
create or replace function public._hr_months(p_firm uuid, p_type text)
returns integer
language sql
stable
security definer
set search_path = public
as $fn$
  select case when s.basis = 'statutory'
              then greatest(s.months, coalesce(o.v, s.months))
              else coalesce(o.v, s.months) end
    from public.hr_retention_schedule() s
    left join lateral (
      select case when (h.retention_overrides ->> p_type) ~ '^[0-9]{1,3}$'
                  then (h.retention_overrides ->> p_type)::int end as v
        from public.employer_hr_settings h where h.employer_id = p_firm
    ) o on true
   where s.record_type = p_type;
$fn$;
revoke all on function public._hr_months(uuid, text) from public, anon, authenticated;

-- 4. Probation and qualifying dates per person -------------------------------------
create or replace function public.hr_people(p_firm uuid default null)
returns table (
  roster_id uuid, name text, team_role text, status text,
  start_date date, start_is_join_date boolean,
  probation_end_date date, probation_review_date date,
  probation_outcome text, probation_outcome_on date, probation_notes text,
  qualifying_date date, left_on date
)
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
begin
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    return;
  end if;
  return query
  select r.id, r.name, r.team_role, r.status,
         coalesce(h.start_date, r.join_date), h.start_date is null,
         h.probation_end_date, h.probation_review_date,
         h.probation_outcome, h.probation_outcome_on, h.probation_notes,
         case when r.team_role = 'Subcontractor' then null
              else public.hr_qualifying_date(coalesce(h.start_date, r.join_date)) end,
         h.left_on
    from public.employer_employees r
    left join public.employer_person_hr h on h.roster_id = r.id
   where r.employer_id = v_firm;
end;
$fn$;
revoke all on function public.hr_people(uuid) from public, anon;
grant execute on function public.hr_people(uuid) to authenticated;

-- 5. Review queue ---------------------------------------------------------------
create or replace function public.hr_retention_queue(p_firm uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
  v_rtw int; v_name int; v_cv int;
  v_leavers jsonb; v_apps jsonb;
begin
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    return jsonb_build_object('error', 'not_allowed');
  end if;
  v_rtw := public._hr_months(v_firm, 'rtw');
  v_name := public._hr_months(v_firm, 'hr_file');
  v_cv := public._hr_months(v_firm, 'cvs');

  with l as (
    select r.id, r.name,
           coalesce(h.left_on, r.updated_at::date) as left_on,
           h.left_on is null as left_on_estimated,
           (r.phone is not null or r.email is not null or r.photo_url is not null
             or r.emergency_contact_name is not null or r.emergency_contact_phone is not null) as has_contact,
           h.name_removed_at is not null as name_removed,
           (select count(*) from public.employer_rtw_checks c where c.roster_id = r.id) as rtw_checks,
           (select count(*) from public.employer_rtw_submissions s where s.roster_id = r.id) as rtw_sent
      from public.employer_employees r
      left join public.employer_person_hr h on h.roster_id = r.id
     where r.employer_id = v_firm
       and lower(coalesce(r.status, '')) = 'archived'
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'roster_id', l.id, 'name', l.name, 'left_on', l.left_on,
           'left_on_estimated', l.left_on_estimated,
           'contact_on_file', l.has_contact,
           'rtw_records', l.rtw_checks + l.rtw_sent,
           'rtw_until', (l.left_on + make_interval(months => v_rtw))::date,
           'name_until', (l.left_on + make_interval(months => v_name))::date,
           'name_removed', l.name_removed,
           'ready', array_remove(array[
              case when l.has_contact then 'contact' end,
              case when l.rtw_checks + l.rtw_sent > 0
                    and (l.left_on + make_interval(months => v_rtw))::date <= current_date then 'rtw' end,
              case when not l.name_removed
                    and (l.left_on + make_interval(months => v_name))::date <= current_date then 'name' end
           ], null)
         ) order by l.left_on), '[]'::jsonb)
    into v_leavers
    from l;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', a.id, 'vacancy', v.title, 'decided_on', a.updated_at::date)
           order by a.updated_at), '[]'::jsonb)
    into v_apps
    from public.employer_vacancy_applications a
    join public.employer_vacancies v on v.id = a.vacancy_id
   where v.employer_id = v_firm
     and (a.status = 'Rejected' or (lower(coalesce(v.status, '')) in ('closed', 'filled') and coalesce(a.status, '') <> 'Hired'))
     and a.updated_at < now() - make_interval(months => v_cv)
     and (a.applicant_email is not null or a.applicant_phone is not null or a.cv_url is not null
          or a.cover_letter is not null);

  return jsonb_build_object(
    'months', jsonb_build_object('rtw', v_rtw, 'hr_file', v_name, 'cvs', v_cv),
    'leavers', v_leavers,
    'applications', v_apps);
end;
$fn$;
revoke all on function public.hr_retention_queue(uuid) from public, anon;
grant execute on function public.hr_retention_queue(uuid) to authenticated;

-- 6. Leaver anonymisation ------------------------------------------------------------
-- Parts: 'contact' (any time after leaving), 'rtw' (after leaving + the RTW
-- period), 'name' (after leaving + the HR file period). Timesheets, holiday,
-- payroll and accident book rows are never deleted here: they stay against the
-- roster row, which keeps its id, so the legal records survive.
-- Returns the storage paths the caller must remove from rtw-evidence.
create or replace function public.hr_anonymise_leaver(p_roster_id uuid, p_parts text[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  v_left date;
  v_paths text[] := array[]::text[];
  v_done text[] := array[]::text[];
begin
  select e.*, h.left_on as hr_left_on, h.name_removed_at
    into r
    from public.employer_employees e
    left join public.employer_person_hr h on h.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null or not public.can_see_firm_money(r.employer_id) then
    raise exception 'not_found';
  end if;
  if lower(coalesce(r.status, '')) <> 'archived' then
    raise exception 'not_a_leaver';
  end if;
  v_left := coalesce(r.hr_left_on, r.updated_at::date);

  insert into public.employer_person_hr (roster_id, employer_id, left_on)
  values (r.id, r.employer_id, v_left)
  on conflict (roster_id) do update set left_on = coalesce(employer_person_hr.left_on, excluded.left_on);

  if 'contact' = any(p_parts) then
    update public.employer_employees
       set phone = null, email = null, photo_url = null,
           emergency_contact_name = null, emergency_contact_phone = null,
           emergency_contact_relationship = null, updated_at = now()
     where id = r.id;
    update public.employer_person_hr set contact_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := v_done || 'contact';
  end if;

  if 'rtw' = any(p_parts) then
    if (v_left + make_interval(months => public._hr_months(r.employer_id, 'rtw')))::date > current_date then
      raise exception 'rtw_not_due';
    end if;
    select coalesce(array_agg(p), array[]::text[]) into v_paths
      from (
        select unnest(c.evidence_paths) p from public.employer_rtw_checks c where c.roster_id = r.id
        union
        select unnest(s.document_paths) from public.employer_rtw_submissions s where s.roster_id = r.id
      ) x;
    delete from public.employer_rtw_checks where roster_id = r.id;
    delete from public.employer_rtw_submissions where roster_id = r.id;
    update public.employer_person_hr set rtw_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := v_done || 'rtw';
  end if;

  if 'name' = any(p_parts) and r.name_removed_at is null then
    if (v_left + make_interval(months => public._hr_months(r.employer_id, 'hr_file')))::date > current_date then
      raise exception 'name_not_due';
    end if;
    update public.employer_employees
       set name = 'Former team member', avatar_initials = 'FT', updated_at = now()
     where id = r.id;
    update public.employer_leave_requests set employee_name = 'Former team member'
     where employee_id = r.id;
    update public.employer_person_hr
       set name_removed_at = now(), probation_notes = null, updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := v_done || 'name';
  end if;

  return jsonb_build_object('success', true, 'done', to_jsonb(v_done), 'paths', to_jsonb(v_paths));
end;
$fn$;
revoke all on function public.hr_anonymise_leaver(uuid, text[]) from public, anon;
grant execute on function public.hr_anonymise_leaver(uuid, text[]) to authenticated;

-- 7. Unsuccessful applicants -----------------------------------------------------------
create or replace function public.hr_anonymise_applications(p_ids uuid[])
returns integer
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_n int;
begin
  update public.employer_vacancy_applications a
     set applicant_name = 'Applicant removed', applicant_email = null, applicant_phone = null,
         cover_letter = null, cv_url = null, notes = null, updated_at = now()
    from public.employer_vacancies v
   where a.id = any(coalesce(p_ids, array[]::uuid[]))
     and v.id = a.vacancy_id
     and public.can_see_firm_money(v.employer_id)
     and (a.status = 'Rejected' or (lower(coalesce(v.status, '')) in ('closed', 'filled') and coalesce(a.status, '') <> 'Hired'))
     and a.updated_at < now() - make_interval(months => public._hr_months(v.employer_id, 'cvs'));
  get diagnostics v_n = row_count;
  return v_n;
end;
$fn$;
revoke all on function public.hr_anonymise_applications(uuid[]) from public, anon;
grant execute on function public.hr_anonymise_applications(uuid[]) to authenticated;

-- 8. Reminders through the daily expiry job (bell at 30 days, 7 days, overdue) -----
do $do$
declare
  v_def text := pg_get_functiondef('public.employer_expiry_items()'::regprocedure);
  v_new text := $n$
  union all
  select h.employer_id, 'probation', h.roster_id, 'probation_review',
         'Probation review', coalesce(h.probation_review_date, h.probation_end_date),
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=team&member=' || r.id
    from public.employer_person_hr h
    join public.employer_employees r on r.id = h.roster_id and r.employer_id = h.employer_id
   where coalesce(h.probation_review_date, h.probation_end_date) is not null
     and (h.probation_outcome is null or h.probation_outcome = 'extended')
     and lower(coalesce(r.status, '')) <> 'archived'
  union all
  select h.employer_id, 'qualifying_period', h.roster_id, 'qualifying_date',
         'Unfair dismissal protection', public.hr_qualifying_date(coalesce(h.start_date, r.join_date)),
         coalesce(nullif(trim(r.name), ''), 'Team member'),
         '/employer?section=team&member=' || r.id
    from public.employer_person_hr h
    join public.employer_employees r on r.id = h.roster_id and r.employer_id = h.employer_id
   where h.probation_end_date is not null
     and (h.probation_outcome is null or h.probation_outcome = 'extended')
     and coalesce(r.team_role, '') <> 'Subcontractor'
     and lower(coalesce(r.status, '')) <> 'archived'
     and public.hr_qualifying_date(coalesce(h.start_date, r.join_date)) >= current_date
$function$$n$;
begin
  if position('''probation''' in v_def) > 0 then
    return;
  end if;
  if v_def !~ E'\\n\\$function\\$\\s*$' then
    raise exception 'employer_expiry_items: closing anchor not found';
  end if;
  execute regexp_replace(v_def, E'\\n\\$function\\$\\s*$', v_new);
end
$do$;
