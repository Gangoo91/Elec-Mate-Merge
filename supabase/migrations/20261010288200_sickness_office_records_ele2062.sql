-- ELE-2062 follow-up (gap analysis 3C #33): office managers record sickness
-- and fit notes; the record exists from the day the absence is logged.
--
-- Before: employer_sickness_records was owner/admin only
-- (my_employer_admin_scope), so an office manager logging sick leave got an
-- RLS error on the sickness record, and the record (which must outlive the
-- leave request) only existed once the owner opened and saved it.
--
-- Access, decided:
--   * Recording an absence is an office task: office managers already add and
--     approve leave (employer_leave_requests is my_employer_scope). They can
--     now attach the fit note, set the date it runs to and the date the
--     person came back.
--   * Pay is owner/admin only (can_see_firm_money): average weekly earnings,
--     qualifying days and the SSP figures are never returned to the office.
--   * Health detail is need-to-know (ICO, sickness and injury records: "You
--     should not make the sickness, injury or absence records of individual
--     workers available to others, unless it is necessary for them to do
--     their jobs"). The office sees whether a fit note is in and until when,
--     not the fit note itself (the storage policy is unchanged: owner/admin,
--     the worker, and whoever uploaded that file), nor the return-to-work
--     notes or adjustments.
--       https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/information-about-workers-health/how-do-we-handle-sickness-and-injury-records/
--   * DWP fit note guidance: "Always consider taking a copy of the fit note
--     ... for your records (your employee should keep the original)" and keep
--     it confidential, "only available to those who genuinely need it".
--       https://www.gov.uk/government/publications/fit-note-guidance-for-employers-and-line-managers/getting-the-most-out-of-the-fit-note-guidance-for-employers-and-line-managers
--   * HMRC: employers keep records of "employee leave and sickness absences"
--     for 3 years from the end of the tax year they relate to.
--       https://www.gov.uk/paye-for-employers/keeping-records
--
-- Additive:
--   * one new AFTER trigger on employer_leave_requests (sick leave only) that
--     creates the sickness record with the absence dates, keeps the dates in
--     step, and removes an empty record when the absence is declined or
--     cancelled. It swallows its own errors, like holiday_record_from_leave,
--     so a leave write can never fail because of it. Proved with rolled-back
--     inserts and updates before applying.
--   * two new functions for the office. No policy changes. No backfill.

-- 1. The record exists from the start -------------------------------------------
create or replace function public.tg_sickness_record_from_leave()
returns trigger
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_firm uuid;
  v_status text := lower(coalesce(new.status, ''));
begin
  -- No longer sick leave (type changed): drop an empty record.
  if coalesce(new.type, '') <> 'sick' then
    if tg_op = 'UPDATE' and coalesce(old.type, '') = 'sick' then
      delete from public.employer_sickness_records s
       where s.leave_request_id = new.id
         and s.fit_note_path is null and s.average_weekly_earnings is null
         and s.qualifying_days_per_week is null and s.rtw_date is null
         and s.rtw_notes is null and s.rtw_adjustments is null
         and s.rtw_fit_for_full_duties is null;
    end if;
    return new;
  end if;

  if v_status in ('rejected', 'cancelled', 'declined') then
    delete from public.employer_sickness_records s
     where s.leave_request_id = new.id
       and s.fit_note_path is null and s.average_weekly_earnings is null
       and s.qualifying_days_per_week is null and s.rtw_date is null
       and s.rtw_notes is null and s.rtw_adjustments is null
       and s.rtw_fit_for_full_duties is null;
    return new;
  end if;
  if v_status not in ('approved', 'pending') then
    return new;
  end if;

  select e.employer_id into v_firm
    from public.employer_employees e where e.id = new.employee_id;
  if v_firm is null then
    return new;
  end if;

  insert into public.employer_sickness_records
    (employer_id, employee_id, leave_request_id, start_date, end_date)
  values (v_firm, new.employee_id, new.id, new.start_date, new.end_date)
  on conflict (leave_request_id) do update
     set start_date = excluded.start_date, end_date = excluded.end_date
   where employer_sickness_records.start_date is distinct from excluded.start_date
      or employer_sickness_records.end_date is distinct from excluded.end_date;
  return new;
exception when others then
  raise warning '[tg_sickness_record_from_leave] %: %', new.id, sqlerrm;
  return new;
end;
$fn$;
revoke all on function public.tg_sickness_record_from_leave() from public, anon, authenticated;

drop trigger if exists sickness_record_from_leave on public.employer_leave_requests;
create trigger sickness_record_from_leave
  after insert or update of status, type, start_date, end_date on public.employer_leave_requests
  for each row execute function public.tg_sickness_record_from_leave();

-- 2. What the office sees: the absence, the fit note's state, back-at-work date.
-- No pay, no notes, no file path.
create or replace function public.sickness_office_rows(p_firm uuid default null)
returns table (
  leave_request_id uuid, employee_id uuid, start_date date, end_date date,
  fit_note_on_file boolean, fit_note_until date, fit_note_uploaded_at timestamptz,
  rtw_date date
)
language plpgsql
stable
security definer
set search_path = public
as $fn$
declare
  v_firm uuid := coalesce(p_firm, auth.uid());
begin
  if v_firm is null or v_firm not in (select public.my_employer_scope()) then
    return;
  end if;
  return query
  select s.leave_request_id, s.employee_id, s.start_date, s.end_date,
         s.fit_note_path is not null, s.fit_note_until, s.fit_note_uploaded_at, s.rtw_date
    from public.employer_sickness_records s
   where s.employer_id = v_firm
     and s.leave_request_id is not null
     and coalesce(s.end_date, s.start_date) >= current_date - 180
   order by s.start_date desc
   limit 500;
end;
$fn$;
revoke all on function public.sickness_office_rows(uuid) from public, anon;
grant execute on function public.sickness_office_rows(uuid) to authenticated;

-- 3. The office records the fit note and the dates. The file goes under the
-- uploader's own folder (the existing upload policy). Pay and the
-- return-to-work conversation stay with the owner and admins.
create or replace function public.sickness_office_save(
  p_leave_request uuid,
  p_fit_note_until date,
  p_rtw_date date,
  p_fit_note_path text default null,
  p_fit_note_name text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_lr record;
  v_id uuid;
begin
  select lr.id, lr.employee_id, lr.start_date, lr.end_date, lr.type, e.employer_id
    into v_lr
    from public.employer_leave_requests lr
    join public.employer_employees e on e.id = lr.employee_id
   where lr.id = p_leave_request;
  if v_lr.id is null or v_lr.employer_id not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if v_lr.type <> 'sick' then
    raise exception 'not_sick_leave' using errcode = '22023';
  end if;
  if p_fit_note_path is not null and split_part(p_fit_note_path, '/', 1) <> auth.uid()::text then
    raise exception 'invalid' using errcode = '22023';
  end if;
  if p_rtw_date is not null and p_rtw_date < v_lr.start_date then
    raise exception 'rtw_before_start' using errcode = '22023';
  end if;
  if p_fit_note_until is not null and p_fit_note_until < v_lr.start_date then
    raise exception 'until_before_start' using errcode = '22023';
  end if;

  insert into public.employer_sickness_records
    (employer_id, employee_id, leave_request_id, start_date, end_date,
     fit_note_until, rtw_date,
     fit_note_path, fit_note_name, fit_note_uploaded_at, fit_note_uploaded_by)
  values (v_lr.employer_id, v_lr.employee_id, v_lr.id, v_lr.start_date, v_lr.end_date,
          p_fit_note_until, p_rtw_date,
          p_fit_note_path, left(p_fit_note_name, 200),
          case when p_fit_note_path is not null then now() end,
          case when p_fit_note_path is not null then auth.uid() end)
  on conflict (leave_request_id) do update
     set fit_note_until = excluded.fit_note_until,
         rtw_date = excluded.rtw_date,
         fit_note_path = coalesce(excluded.fit_note_path, employer_sickness_records.fit_note_path),
         fit_note_name = coalesce(excluded.fit_note_name, employer_sickness_records.fit_note_name),
         fit_note_uploaded_at = coalesce(excluded.fit_note_uploaded_at, employer_sickness_records.fit_note_uploaded_at),
         fit_note_uploaded_by = coalesce(excluded.fit_note_uploaded_by, employer_sickness_records.fit_note_uploaded_by)
  returning id into v_id;
  return v_id;
end;
$fn$;
revoke all on function public.sickness_office_save(uuid, date, date, text, text) from public, anon;
grant execute on function public.sickness_office_save(uuid, date, date, text, text) to authenticated;
