-- Review fixes M7 (RTW date) + L13 (ELE-2075, ELE-2061), 10 Oct 2026.
--
-- Home Office: right-to-work copies are kept "for the duration of the
-- worker's employment and for two years afterwards" and then securely
-- destroyed (Employer's guide to right to work checks, 1 October 2026, PDF
-- pp. 22, 30, 32 and 34).
--   https://www.gov.uk/government/publications/right-to-work-checks-employers-guide
--
-- 1. The RTW date is counted from when the employment actually ended: the
--    later of the leaving date and the last day on a timesheet that was not
--    rejected (_hr_rtw_until). Before, hr_retention_queue.rtw_until and the
--    rtw step of hr_anonymise_leaver used left_on only, so a leaving date
--    recorded too early (or work logged after it) started the two years early.
-- 2. L13: the name step pulls in the rtw part. With an RTW period longer than
--    the name's (a firm can set up to 120 months) it raised rtw_not_due and
--    the name could never be removed. Now that pulled-in part is skipped; it
--    still raises when rtw is asked for on its own before it is due.
-- 3. "Today" is UK time ((now() at time zone 'Europe/London')::date) in both.
--
-- Additive: one new private helper; new bodies for hr_retention_queue and
-- hr_anonymise_leaver with the same signatures (neither is in HEAD or build
-- 49). Everything else is as 20261010288300.

create or replace function public._hr_rtw_until(p_roster_id uuid, p_firm uuid)
returns date
language sql
stable
security definer
set search_path = public
as $fn$
  select (greatest(h.left_on,
                   (select max(t.date) from public.employer_timesheets t
                     where t.employee_id = h.roster_id
                       and lower(coalesce(t.status, '')) <> 'rejected'))
          + make_interval(months => public._hr_months(p_firm, 'rtw')))::date
    from public.employer_person_hr h
   where h.roster_id = p_roster_id and h.left_on is not null;
$fn$;
revoke all on function public._hr_rtw_until(uuid, uuid) from public, anon, authenticated;

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
  v_today date := (now() at time zone 'Europe/London')::date;
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
           'rtw_until', public._hr_rtw_until(l.id, v_firm),
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
                    and public._hr_rtw_until(l.id, v_firm) <= v_today then 'rtw' end,
              case when l.left_on is not null and (l.k->>'sickness_due')::int > 0 then 'sickness' end,
              case when l.left_on is not null and (l.k->>'dob_on_file')::boolean
                    and (l.k->>'dob_until')::date <= v_today then 'dob' end,
              case when l.left_on is not null and (l.k->>'signatures')::int > 0
                    and (l.k->>'signatures_until')::date <= v_today then 'signatures' end,
              case when l.left_on is not null and not l.name_removed
                    and (l.k->>'name_until')::date <= v_today then 'name' end
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
  v_today date := (now() at time zone 'Europe/London')::date;
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
    if (k->>'name_until')::date > v_today then
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

  -- Right-to-work copies: two years after the employment ended, counted from
  -- the later of the leaving date and the last day on a timesheet. When the
  -- name step brought this part in (it was not asked for) and the firm keeps
  -- these longer than the name, it is skipped rather than stopping the name.
  if 'rtw' = any(v_parts)
     and exists (select 1 from public.employer_rtw_checks c where c.roster_id = r.id
                 union all select 1 from public.employer_rtw_submissions s where s.roster_id = r.id)
     and (public._hr_rtw_until(r.id, r.employer_id) <= v_today or 'rtw' = any(p_parts)) then
    if public._hr_rtw_until(r.id, r.employer_id) > v_today then
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
              + make_interval(months => m_sick))::date <= v_today
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
            + make_interval(months => m_sick))::date <= v_today;
    v_done := array_append(v_done, 'sickness');
  end if;

  if 'dob' = any(v_parts) and (k->>'dob_on_file')::boolean then
    if (k->>'dob_until')::date > v_today then
      raise exception 'dob_not_due';
    end if;
    update public.employer_employee_pay_profiles set date_of_birth = null where employee_id = r.id;
    update public.employer_rtw_submissions set date_of_birth = null where roster_id = r.id;
    v_done := array_append(v_done, 'dob');
  end if;

  if 'signatures' = any(v_parts) and (k->>'signatures')::int > 0 then
    if (k->>'signatures_until')::date > v_today then
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
