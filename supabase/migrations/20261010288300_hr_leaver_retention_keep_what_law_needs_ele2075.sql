-- ELE-2075 follow-up (gap analysis 3C #31): leaver anonymising covers the date
-- of birth, sickness records, fit notes, signatures and the copies of the name
-- on other records, and never removes anything still inside its legal period.
--
-- What must be kept, and for how long (primary sources, checked 10 Oct 2026):
--   * Minimum wage records (hours worked and pay, so timesheets, and the date
--     of birth that sets the age band): 6 years, starting "from the last day of
--     the pay reference period after the one they cover".
--       https://www.gov.uk/national-minimum-wage/employers-and-the-minimum-wage
--   * PAYE records, including "employee leave and sickness absences" (so SSP
--     and sickness records): 3 years from the end of the tax year they relate to.
--       https://www.gov.uk/paye-for-employers/keeping-records
--   * Holiday records: 6 years from the date they were made, from 6 Apr 2026
--     (WTR 1998 reg 16B, inserted by Employment Rights Act 2025 s.35; the 2023
--     amendment regulations did not add a records duty).
--       https://www.legislation.gov.uk/ukpga/2025/36/section/35
--   * CIS records: "at least 3 years after the end of the tax year they relate to".
--       https://www.gov.uk/what-you-must-do-as-a-cis-contractor/record-keeping
--   * Accident book: "at least 3 years from the date of its entry"
--     (SS (Claims and Payments) Regs 1979 reg 25); RIDDOR records 3 years
--     (RIDDOR 2013 reg 12). Never removed here.
--       https://www.legislation.gov.uk/uksi/1979/628/regulation/25
--       https://www.legislation.gov.uk/uksi/2013/1471/regulation/12
--   * Right-to-work copies: the employment plus 2 years, then destroyed
--     (Home Office employer's guide, 1 Oct 2026).
--   * Signatures, names on old records, HR notes: no fixed period. Suggested
--     6 years after leaving (contract claims, Limitation Act 1980 s.5); UK GDPR
--     storage limitation says no longer than needed.
--       https://www.legislation.gov.uk/ukpga/1980/58/section/5
--       https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/
--
-- Rules this applies:
--   * Each part has its own date, worked out from the person's actual records.
--   * The name goes last: never before every record that is identified only by
--     the roster row (timesheets, holiday, sickness, CIS statements, incidents)
--     is past its period, whatever shorter HR-file period a firm chooses.
--   * Records the law needs are kept; their copies of the name are replaced
--     only when the name itself goes.
--   * Fit-note files of removed sickness records are queued and deleted by
--     the owner or an admin through Storage (direct storage deletes are not
--     allowed); the queue lists any that are still there.
--
-- Additive: one new table (RLS on), one new storage policy, new private
-- helpers, and new definitions of hr_retention_schedule / hr_retention_queue /
-- hr_anonymise_leaver with the same signatures (none is in HEAD or build 49).

-- 1. Retention schedule: the extra record types, the right holiday source ------
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
     'Kept until then', 'https://www.legislation.gov.uk/ukpga/2025/36/section/35'),
    ('timesheets', 'Timesheets and pay records', 72, 'record', 'statutory',
     'Kept until then', 'https://www.gov.uk/national-minimum-wage/employers-and-the-minimum-wage'),
    ('payroll', 'Payroll exports', 72, 'record', 'statutory',
     'Kept until then', 'https://www.gov.uk/paye-for-employers/keeping-records'),
    ('sickness', 'Sickness records and fit notes', 36, 'tax_year', 'statutory',
     'Removed', 'https://www.gov.uk/paye-for-employers/keeping-records'),
    ('dob', 'Date of birth', 72, 'last_pay', 'statutory',
     'Removed', 'https://www.gov.uk/national-minimum-wage/employers-and-the-minimum-wage'),
    ('cis', 'Subcontractor payment statements (CIS)', 36, 'tax_year', 'statutory',
     'Kept until then', 'https://www.gov.uk/what-you-must-do-as-a-cis-contractor/record-keeping'),
    ('accident', 'Accident book and RIDDOR records', 36, 'record', 'statutory',
     'Never removed here', 'https://www.legislation.gov.uk/uksi/1979/628/regulation/25'),
    ('signatures', 'Signatures on policies, RAMS and checklists', 72, 'leaving', 'suggested',
     'Removed', 'https://www.legislation.gov.uk/ukpga/1980/58/section/5'),
    ('hr_file', 'Name, probation and HR notes', 72, 'leaving', 'suggested',
     'Name replaced', 'https://www.legislation.gov.uk/ukpga/1980/58/section/5'),
    ('contact', 'Leaver contact details', 0, 'leaving', 'suggested',
     'Removed', 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/'),
    ('cvs', 'CVs from unsuccessful applicants', 6, 'decision', 'suggested',
     'Removed', 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/')
$fn$;
revoke all on function public.hr_retention_schedule() from public, anon;
grant execute on function public.hr_retention_schedule() to authenticated;

-- 5 April that ends the UK tax year a date falls in.
create or replace function public._hr_tax_year_end(p_d date)
returns date
language sql
immutable
set search_path = public
as $fn$
  select case when p_d is null then null
              when p_d <= make_date(extract(year from p_d)::int, 4, 5)
                then make_date(extract(year from p_d)::int, 4, 5)
              else make_date(extract(year from p_d)::int + 1, 4, 5) end;
$fn$;
revoke all on function public._hr_tax_year_end(date) from public, anon;
grant execute on function public._hr_tax_year_end(date) to authenticated;

-- 2. Fit-note files waiting to be deleted --------------------------------------
create table if not exists public.employer_hr_file_purges (
  bucket text not null check (bucket in ('fit-notes')),
  path text not null,
  employer_id uuid not null,
  queued_at timestamptz not null default now(),
  primary key (bucket, path)
);
create index if not exists employer_hr_file_purges_firm_idx on public.employer_hr_file_purges (employer_id);
alter table public.employer_hr_file_purges enable row level security;
comment on table public.employer_hr_file_purges is
  '[EMPLOYER] Files whose records were removed at the end of their retention period and that the owner or an admin must now delete from Storage (fit notes). Written only by hr_anonymise_leaver. Scope: employer_id = the firm; owner/admin read (can_see_firm_money). Used by: People > Right to work and HR records, Records to review (ELE-2075).';
drop policy if exists "hr file purges owner admin read" on public.employer_hr_file_purges;
create policy "hr file purges owner admin read" on public.employer_hr_file_purges
  for select to authenticated
  using (public.can_see_firm_money(employer_id));

drop policy if exists "Fit notes: owner admin delete after retention" on storage.objects;
create policy "Fit notes: owner admin delete after retention"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'fit-notes'
    and exists (
      select 1 from public.employer_hr_file_purges p
       where p.bucket = 'fit-notes' and p.path = storage.objects.name
         and public.can_see_firm_money(p.employer_id)
    )
    and not exists (
      select 1 from public.employer_sickness_records s where s.fit_note_path = storage.objects.name
    )
  );

-- 3. What a leaver's records need, from their actual records -------------------
create or replace function public._hr_leaver_keep(p_roster_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  r record;
  v_left date;
  v_last_ts date; v_ts int;
  v_hol int; v_hol_last date;
  v_sick int; v_sick_due int; v_sick_until date; v_fit int;
  v_cis int; v_cis_until date;
  v_acc int; v_acc_until date;
  v_dob boolean;
  v_sig int;
  v_ts_until date; v_hol_until date; v_dob_until date; v_sig_until date; v_name_until date;
  m_ts int; m_hol int; m_sick int; m_cis int; m_acc int; m_dob int; m_sig int; m_name int;
begin
  select e.id, e.employer_id, h.left_on into r
    from public.employer_employees e
    left join public.employer_person_hr h on h.roster_id = e.id
   where e.id = p_roster_id;
  if r.id is null then return null; end if;
  v_left := r.left_on;
  m_ts := public._hr_months(r.employer_id, 'timesheets');
  m_hol := public._hr_months(r.employer_id, 'holiday');
  m_sick := public._hr_months(r.employer_id, 'sickness');
  m_cis := public._hr_months(r.employer_id, 'cis');
  m_acc := public._hr_months(r.employer_id, 'accident');
  m_dob := public._hr_months(r.employer_id, 'dob');
  m_sig := public._hr_months(r.employer_id, 'signatures');
  m_name := public._hr_months(r.employer_id, 'hr_file');

  select count(*), max(t.date) into v_ts, v_last_ts
    from public.employer_timesheets t where t.employee_id = r.id;
  select count(*), max(hr.created_at)::date into v_hol, v_hol_last
    from public.employer_holiday_records hr where hr.employee_id = r.id;
  select count(*),
         count(*) filter (where (public._hr_tax_year_end(coalesce(s.end_date, s.start_date))
                                 + make_interval(months => m_sick))::date <= current_date),
         max((public._hr_tax_year_end(coalesce(s.end_date, s.start_date)) + make_interval(months => m_sick))::date),
         count(s.fit_note_path)
    into v_sick, v_sick_due, v_sick_until, v_fit
    from public.employer_sickness_records s where s.employee_id = r.id;
  select count(*), (public._hr_tax_year_end(max(st.period_end)) + make_interval(months => m_cis))::date
    into v_cis, v_cis_until
    from public.employer_subcontractor_statements st where st.roster_id = r.id;
  select count(*), (max(x.d) + make_interval(months => m_acc))::date into v_acc, v_acc_until
    from (
      select a.created_at::date d from public.accident_records a where a.injured_employee_id = r.id
      union all
      select i.created_at::date from public.employer_incidents i where i.injured_employee_id = r.id
    ) x;
  select exists (select 1 from public.employer_employee_pay_profiles p
                  where p.employee_id = r.id and p.date_of_birth is not null)
      or exists (select 1 from public.employer_rtw_submissions s
                  where s.roster_id = r.id and s.date_of_birth is not null)
    into v_dob;
  select (select count(*) from public.employer_policy_acknowledgements a
           where a.employee_id = r.id and a.signature <> '')
       + (select count(*) from public.safety_acknowledgements a
           where a.employee_id = r.id and a.signature <> '')
       + (select count(*) from public.employer_job_pack_acknowledgements a
           where a.employee_id = r.id and a.signature_data is not null)
       + (select count(*) from public.employer_job_checklist_responses c
           where c.employee_id = r.id and c.signature_data is not null)
    into v_sig;

  -- NMW: 6 years from the end of the pay reference period after the one the
  -- record covers. Two months past the last day worked covers a monthly payroll.
  v_ts_until := case when v_ts > 0 or v_left is not null
                     then (greatest(v_last_ts, v_left) + interval '2 months'
                           + make_interval(months => m_ts))::date end;
  v_hol_until := case when v_hol > 0 then (v_hol_last + make_interval(months => m_hol))::date end;
  v_dob_until := case when v_dob and (v_last_ts is not null or v_left is not null)
                      then (greatest(v_last_ts, v_left) + interval '2 months'
                            + make_interval(months => m_dob))::date end;
  v_sig_until := case when v_left is not null then (v_left + make_interval(months => m_sig))::date end;
  -- The name goes last: after every record identified by this roster row.
  v_name_until := case when v_left is not null then greatest(
      (v_left + make_interval(months => m_name))::date,
      v_ts_until, v_hol_until, v_sick_until, v_cis_until, v_acc_until, v_dob_until, v_sig_until) end;

  return jsonb_build_object(
    'left_on', v_left,
    'timesheets', v_ts, 'timesheets_until', v_ts_until,
    'holiday', v_hol, 'holiday_until', v_hol_until,
    'sickness', v_sick, 'sickness_due', v_sick_due, 'sickness_until', v_sick_until,
    'fit_notes', v_fit,
    'cis', v_cis, 'cis_until', v_cis_until,
    'accident', v_acc, 'accident_until', v_acc_until,
    'dob_on_file', v_dob, 'dob_until', v_dob_until,
    'signatures', v_sig, 'signatures_until', v_sig_until,
    'name_until', v_name_until);
end;
$fn$;
revoke all on function public._hr_leaver_keep(uuid) from public, anon, authenticated;

-- 4. Review queue: per leaver, what can go now and what is kept, until when ------
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
  v_leavers jsonb; v_apps jsonb; v_purge jsonb;
begin
  if v_firm is null or not public.can_see_firm_money(v_firm) then
    return jsonb_build_object('error', 'not_allowed');
  end if;
  v_rtw := public._hr_months(v_firm, 'rtw');
  v_name := public._hr_months(v_firm, 'hr_file');
  v_cv := public._hr_months(v_firm, 'cvs');

  with l as (
    select r.id, r.name, h.left_on,
           (r.phone is not null or r.email is not null or r.photo_url is not null
             or r.emergency_contact_name is not null or r.emergency_contact_phone is not null) as has_contact,
           h.name_removed_at is not null as name_removed,
           (select count(*) from public.employer_rtw_checks c where c.roster_id = r.id) as rtw_checks,
           (select count(*) from public.employer_rtw_submissions s where s.roster_id = r.id) as rtw_sent,
           public._hr_leaver_keep(r.id) as k
      from public.employer_employees r
      left join public.employer_person_hr h on h.roster_id = r.id
     where r.employer_id = v_firm
       and lower(coalesce(r.status, '')) = 'archived'
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'roster_id', l.id, 'name', l.name, 'left_on', l.left_on,
           'needs_left_on', l.left_on is null
              and (l.rtw_checks + l.rtw_sent > 0 or not l.name_removed),
           'contact_on_file', l.has_contact,
           'rtw_records', l.rtw_checks + l.rtw_sent,
           'rtw_until', (l.left_on + make_interval(months => v_rtw))::date,
           'name_until', (l.k->>'name_until')::date,
           'name_removed', l.name_removed,
           'sickness_records', (l.k->>'sickness')::int,
           'sickness_due', (l.k->>'sickness_due')::int,
           'sickness_until', (l.k->>'sickness_until')::date,
           'dob_on_file', (l.k->>'dob_on_file')::boolean,
           'dob_until', (l.k->>'dob_until')::date,
           'signatures', (l.k->>'signatures')::int,
           'signatures_until', (l.k->>'signatures_until')::date,
           'keep', l.k,
           'ready', array_remove(array[
              case when l.has_contact then 'contact' end,
              case when l.left_on is not null and l.rtw_checks + l.rtw_sent > 0
                    and (l.left_on + make_interval(months => v_rtw))::date <= current_date then 'rtw' end,
              case when l.left_on is not null and (l.k->>'sickness_due')::int > 0 then 'sickness' end,
              case when l.left_on is not null and (l.k->>'dob_on_file')::boolean
                    and (l.k->>'dob_until')::date <= current_date then 'dob' end,
              case when l.left_on is not null and (l.k->>'signatures')::int > 0
                    and (l.k->>'signatures_until')::date <= current_date then 'signatures' end,
              case when l.left_on is not null and not l.name_removed
                    and (l.k->>'name_until')::date <= current_date then 'name' end
           ], null)
         ) order by l.left_on nulls first, l.name), '[]'::jsonb)
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

  -- Fit notes whose records were removed and that are still in Storage.
  select coalesce(jsonb_agg(p.path order by p.path), '[]'::jsonb) into v_purge
    from public.employer_hr_file_purges p
   where p.employer_id = v_firm and p.bucket = 'fit-notes'
     and exists (select 1 from storage.objects o where o.bucket_id = 'fit-notes' and o.name = p.path);

  return jsonb_build_object(
    'months', jsonb_build_object('rtw', v_rtw, 'hr_file', v_name, 'cvs', v_cv),
    'leavers', v_leavers,
    'applications', v_apps,
    'orphan_files', to_jsonb(public._rtw_orphan_paths(v_firm)),
    'fit_note_files', v_purge);
end;
$fn$;
revoke all on function public.hr_retention_queue(uuid) from public, anon;
grant execute on function public.hr_retention_queue(uuid) to authenticated;

-- 5. Anonymise a leaver, part by part, each only once its period is over --------
-- Parts: contact, rtw, sickness, dob, signatures, name. 'name' is the last
-- step and does everything else with it.
-- Returns the rtw-evidence paths and fit-note paths the caller removes from
-- Storage.
create or replace function public.hr_anonymise_leaver(p_roster_id uuid, p_parts text[])
returns jsonb
language plpgsql
security definer
set search_path = public
as $fn$
declare
  r record;
  k jsonb;
  v_left date;
  v_parts text[] := coalesce(p_parts, array[]::text[]);
  v_paths text[] := array[]::text[];
  v_fit text[] := array[]::text[];
  v_done text[] := array[]::text[];
  v_former constant text := 'Former team member';
  m_sick int;
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
  v_left := r.hr_left_on;
  if v_left is null and v_parts && array['rtw', 'sickness', 'dob', 'signatures', 'name'] then
    raise exception 'left_on_required';
  end if;
  k := public._hr_leaver_keep(r.id);

  -- The name is the last step: check it first so nothing runs if it is early.
  if 'name' = any(v_parts) and r.name_removed_at is null then
    if (k->>'name_until')::date > current_date then
      raise exception 'name_not_due';
    end if;
    v_parts := v_parts || array['contact', 'rtw', 'sickness', 'dob', 'signatures'];
  end if;

  insert into public.employer_person_hr (roster_id, employer_id)
  values (r.id, r.employer_id)
  on conflict (roster_id) do nothing;

  if 'contact' = any(v_parts) then
    update public.employer_employees
       set phone = null, email = null, photo_url = null,
           emergency_contact_name = null, emergency_contact_phone = null,
           emergency_contact_relationship = null, updated_at = now()
     where id = r.id;
    update public.employer_person_hr set contact_removed_at = now(), updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'contact');
  end if;

  if 'rtw' = any(v_parts)
     and exists (select 1 from public.employer_rtw_checks c where c.roster_id = r.id
                 union all select 1 from public.employer_rtw_submissions s where s.roster_id = r.id) then
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
    v_done := array_append(v_done, 'rtw');
  end if;

  -- Sickness: only the records past 3 years after their tax year. Health
  -- detail in a sick leave request's reason goes with them; the absence dates
  -- stay on the leave request.
  if 'sickness' = any(v_parts) then
    m_sick := public._hr_months(r.employer_id, 'sickness');
    with gone as (
      delete from public.employer_sickness_records s
       where s.employee_id = r.id
         and (public._hr_tax_year_end(coalesce(s.end_date, s.start_date))
              + make_interval(months => m_sick))::date <= current_date
      returning s.fit_note_path
    )
    select coalesce(array_agg(fit_note_path) filter (where fit_note_path is not null), array[]::text[])
      into v_fit from gone;
    insert into public.employer_hr_file_purges (bucket, path, employer_id)
    select 'fit-notes', p, r.employer_id from unnest(v_fit) p
    on conflict do nothing;
    update public.employer_leave_requests l
       set reason = null
     where l.employee_id = r.id and l.type = 'sick' and l.reason is not null
       and (public._hr_tax_year_end(coalesce(l.end_date, l.start_date))
            + make_interval(months => m_sick))::date <= current_date;
    v_done := array_append(v_done, 'sickness');
  end if;

  if 'dob' = any(v_parts) and (k->>'dob_on_file')::boolean then
    if (k->>'dob_until')::date > current_date then
      raise exception 'dob_not_due';
    end if;
    update public.employer_employee_pay_profiles set date_of_birth = null where employee_id = r.id;
    update public.employer_rtw_submissions set date_of_birth = null where roster_id = r.id;
    v_done := array_append(v_done, 'dob');
  end if;

  if 'signatures' = any(v_parts) and (k->>'signatures')::int > 0 then
    if (k->>'signatures_until')::date > current_date then
      raise exception 'signatures_not_due';
    end if;
    -- The fact and date of signing stay; the signature image, place and device go.
    update public.employer_policy_acknowledgements
       set signature = '', location = null, user_agent = null
     where employee_id = r.id and signature <> '';
    update public.safety_acknowledgements
       set signature = '', location = null, user_agent = null
     where employee_id = r.id and signature <> '';
    update public.employer_job_pack_acknowledgements
       set signature_data = null, location = null, device_info = null
     where employee_id = r.id and signature_data is not null;
    update public.employer_job_checklist_responses
       set signature_data = null
     where employee_id = r.id and signature_data is not null;
    v_done := array_append(v_done, 'signatures');
  end if;

  if 'name' = any(p_parts) and r.name_removed_at is null then
    update public.employer_employees
       set name = v_former, avatar_initials = 'FT', updated_at = now()
     where id = r.id;
    update public.employer_leave_requests set employee_name = v_former
     where employee_id = r.id and employee_name is distinct from v_former;
    update public.employer_holiday_records set employee_name = v_former
     where employee_id = r.id and employee_name is distinct from v_former;
    update public.employer_policy_acknowledgements set signer_name = v_former
     where employee_id = r.id and signer_name is distinct from v_former;
    update public.safety_acknowledgements set signer_name = v_former
     where employee_id = r.id and signer_name is distinct from v_former;
    update public.employer_job_checklist_responses
       set signer_name = case when signer_name is not null then v_former end,
           done_by_name = case when done_by_name is not null then v_former end
     where employee_id = r.id and (signer_name is not null or done_by_name is not null);
    update public.employer_subcontractor_statements
       set subcontractor_name = v_former, trading_name = null, utr = null, cis_verification_number = null
     where roster_id = r.id;
    delete from public.employer_subcontractor_terms where roster_id = r.id;
    delete from public.employer_subcontractor_details where roster_id = r.id;
    delete from public.employer_employee_pay_profiles where employee_id = r.id;
    update public.employer_person_hr
       set name_removed_at = now(), probation_notes = null, updated_at = now(), updated_by = auth.uid()
     where roster_id = r.id;
    v_done := array_append(v_done, 'name');
  end if;

  return jsonb_build_object('success', true, 'done', to_jsonb(v_done),
                            'paths', to_jsonb(v_paths), 'fit_note_paths', to_jsonb(v_fit));
end;
$fn$;
revoke all on function public.hr_anonymise_leaver(uuid, text[]) from public, anon;
grant execute on function public.hr_anonymise_leaver(uuid, text[]) to authenticated;
