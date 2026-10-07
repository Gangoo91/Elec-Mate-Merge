-- Quality & compliance review fixes (7 Oct 2026).
--
-- 1. IQA findings: allow a 'Concern' finding type (the UI offers one).
-- 2. Safeguarding with no lead: one SECURITY DEFINER test, _safeguarding_reader,
--    used by the read policy and both lead RPCs. A DSL/deputy reads; when the
--    college has no active lead with an account, admins and heads of
--    department (the people tg_notify_safeguarding alerts) read and act.
-- 3. Archived / inactive leads neither read nor count as recipients.
-- 8. SAR: only admin / head of department may approve, or edit an approved draft.
-- 9. college_activity is append-only and read by admin, HoD and quality staff.
-- 16. can_write_college_iqa compares status case-insensitively; status CHECK.
-- 18. Reopening a safeguarding concern clears action_completed_at.
-- +   pastoral_notes: kind 'safeguarding' must be visibility 'safeguarding'.

-- ---------------------------------------------------------------------------
-- 1. IQA finding types
-- ---------------------------------------------------------------------------
alter table public.college_iqa_findings drop constraint if exists college_iqa_findings_finding_type_check;
alter table public.college_iqa_findings add constraint college_iqa_findings_finding_type_check
  check (finding_type = any (array['Good Practice','Area for Improvement','Action Required','Concern']));

-- ---------------------------------------------------------------------------
-- 16. college_staff.status
-- ---------------------------------------------------------------------------
update public.college_staff set status = 'Active' where lower(btrim(status)) = 'active' and status <> 'Active';
update public.college_staff set status = 'On Leave' where lower(btrim(status)) = 'on leave' and status <> 'On Leave';
update public.college_staff set status = 'Archived' where lower(btrim(status)) = 'archived' and status <> 'Archived';
alter table public.college_staff drop constraint if exists college_staff_status_check;
alter table public.college_staff add constraint college_staff_status_check
  check (status is null or status = any (array['Active','On Leave','Archived']));

create or replace function public.can_write_college_iqa(target_college uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select exists (
    select 1 from public.college_staff cs
    where cs.user_id = auth.uid()
      and cs.college_id = target_college
      and cs.archived_at is null
      and lower(coalesce(cs.status, 'active')) = 'active'
      and (
        cs.is_quality_nominee = true
        or cs.iqa_qual is not null
        or cs.role in ('admin','head_of_department')
      )
  )
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.college_id = target_college
      and coalesce(p.college_role, '') in ('admin','iqa','lead_iqa','quality_nominee')
  );
$function$;

-- ---------------------------------------------------------------------------
-- 2/3. Safeguarding readers
-- ---------------------------------------------------------------------------

-- True when the college has at least one active, non-archived DSL or deputy
-- with an account (someone who can actually be told).
create or replace function public._safeguarding_has_lead(p_college uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select exists (
    select 1 from public.college_staff s
    where s.college_id = p_college
      and s.user_id is not null
      and s.archived_at is null
      and lower(coalesce(s.status, 'active')) = 'active'
      and (s.is_dsl or s.is_deputy_dsl)
  );
$function$;

-- The caller's college_staff id when they may read and act on safeguarding
-- concerns at p_college, else null.
create or replace function public._safeguarding_reader_staff_id(p_college uuid)
 returns uuid
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select s.id from public.college_staff s
  where s.college_id = p_college
    and s.user_id = auth.uid()
    and s.archived_at is null
    and lower(coalesce(s.status, 'active')) = 'active'
    and (
      s.is_dsl or s.is_deputy_dsl
      or (s.role in ('admin','head_of_department') and not public._safeguarding_has_lead(p_college))
    )
  order by (s.is_dsl or s.is_deputy_dsl) desc
  limit 1;
$function$;

create or replace function public._safeguarding_reader(p_college uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select p_college is not null and public._safeguarding_reader_staff_id(p_college) is not null;
$function$;

revoke all on function public._safeguarding_has_lead(uuid) from public, anon;
revoke all on function public._safeguarding_reader_staff_id(uuid) from public, anon;
revoke all on function public._safeguarding_reader(uuid) from public, anon;
grant execute on function public._safeguarding_has_lead(uuid) to authenticated;
grant execute on function public._safeguarding_reader_staff_id(uuid) to authenticated;
grant execute on function public._safeguarding_reader(uuid) to authenticated;

drop policy if exists "pastoral: safeguarding leads read" on public.pastoral_notes;
create policy "pastoral: safeguarding leads read" on public.pastoral_notes
  for select
  using (
    visibility = 'safeguarding'
    and public._safeguarding_reader(
      (select s.college_id from public.college_students s where s.id = pastoral_notes.student_id)
    )
  );

create or replace function public.acknowledge_safeguarding_concern(p_concern_id uuid)
 returns timestamp with time zone
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_college uuid;
  v_staff_id uuid;
  v_ack timestamptz;
begin
  select s.college_id into v_college
  from pastoral_notes n
  join college_students s on s.id = n.student_id
  where n.id = p_concern_id and n.visibility = 'safeguarding';
  if v_college is null then
    raise exception 'not a safeguarding concern';
  end if;

  v_staff_id := public._safeguarding_reader_staff_id(v_college);
  if v_staff_id is null then
    raise exception 'not authorised: safeguarding leads only' using errcode = '42501';
  end if;

  -- idempotent: first acknowledgement wins
  update pastoral_notes
  set acknowledged_at = now(), acknowledged_by = v_staff_id
  where id = p_concern_id and acknowledged_at is null;

  select acknowledged_at into v_ack from pastoral_notes where id = p_concern_id;
  return v_ack;
end;
$function$;

create or replace function public.close_safeguarding_concern(p_concern_id uuid, p_outcome text, p_reopen boolean default false)
 returns timestamp with time zone
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_college uuid;
  v_staff_id uuid;
  v_at timestamptz;
begin
  select s.college_id into v_college
  from pastoral_notes n
  join college_students s on s.id = n.student_id
  where n.id = p_concern_id and n.visibility = 'safeguarding';
  if v_college is null then
    raise exception 'not a safeguarding concern';
  end if;

  v_staff_id := public._safeguarding_reader_staff_id(v_college);
  if v_staff_id is null then
    raise exception 'not authorised: safeguarding leads only' using errcode = '42501';
  end if;

  if p_outcome is null or length(btrim(p_outcome)) < 3 then
    raise exception 'say what was done' using errcode = '22023';
  end if;

  if p_reopen then
    update pastoral_notes
       set closed_at = null, closed_by = null,
           action_completed_at = null,
           closure_note = coalesce(closure_note || E'\n', '') || 'Reopened ' || to_char(now() at time zone 'Europe/London', 'DD Mon YYYY') || ': ' || btrim(p_outcome)
     where id = p_concern_id;
    return null;
  end if;

  update pastoral_notes
     set closed_at = now(), closed_by = v_staff_id,
         closure_note = coalesce(closure_note || E'\n', '') || btrim(p_outcome),
         acknowledged_at = coalesce(acknowledged_at, now()),
         acknowledged_by = coalesce(acknowledged_by, v_staff_id)
   where id = p_concern_id
   returning closed_at into v_at;
  return v_at;
end;
$function$;

-- Alert the same people who can read the concern: active, non-archived leads
-- with an account; when there are none, active non-archived admins and heads
-- of department with an account.
create or replace function public.tg_notify_safeguarding()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if new.kind = 'safeguarding' or new.visibility = 'safeguarding' then
    if public._safeguarding_has_lead(new.college_id) then
      insert into push_notification_log (user_id, type, reference_id, title, body)
      select s.user_id,
             'safeguarding',
             new.id::text,
             'Safeguarding entry logged',
             'A safeguarding record has been added at your college. Open the safeguarding area to review.'
      from college_staff s
      where s.college_id = new.college_id
        and (s.is_dsl is true or s.is_deputy_dsl is true)
        and s.user_id is not null
        and s.archived_at is null
        and lower(coalesce(s.status, 'active')) = 'active'
        and s.id is distinct from new.author_id;
    else
      insert into push_notification_log (user_id, type, reference_id, title, body)
      select s.user_id,
             'safeguarding',
             new.id::text,
             'Safeguarding entry, no DSL set',
             'A safeguarding record was logged but no Designated Safeguarding Lead is configured. Please review it and assign a DSL.'
      from college_staff s
      where s.college_id = new.college_id
        and s.role in ('admin', 'head_of_department')
        and s.user_id is not null
        and s.archived_at is null
        and lower(coalesce(s.status, 'active')) = 'active'
        and s.id is distinct from new.author_id;
    end if;
  end if;
  return new;
end;
$function$;

-- ---------------------------------------------------------------------------
-- pastoral_notes: a safeguarding kind is always safeguarding-visible
-- ---------------------------------------------------------------------------
update public.pastoral_notes set visibility = 'safeguarding'
 where kind = 'safeguarding' and visibility is distinct from 'safeguarding';
alter table public.pastoral_notes drop constraint if exists pastoral_notes_safeguarding_visibility_check;
alter table public.pastoral_notes add constraint pastoral_notes_safeguarding_visibility_check
  check (kind <> 'safeguarding' or visibility = 'safeguarding');

-- ---------------------------------------------------------------------------
-- 8. SAR approval: admin / head of department only
-- ---------------------------------------------------------------------------
create or replace function public._college_leader(p_college uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select exists (
    select 1 from public.college_staff s
    where s.college_id = p_college
      and s.user_id = auth.uid()
      and s.archived_at is null
      and lower(coalesce(s.status, 'active')) = 'active'
      and s.role in ('admin','head_of_department')
  );
$function$;
revoke all on function public._college_leader(uuid) from public, anon;
grant execute on function public._college_leader(uuid) to authenticated;

drop policy if exists sar_drafts_update on public.college_sar_drafts;
create policy sar_drafts_update on public.college_sar_drafts
  for update
  using (_ch_same_college(college_id) and (status <> 'approved' or public._college_leader(college_id)))
  with check (_ch_same_college(college_id) and (status <> 'approved' or public._college_leader(college_id)));

-- ---------------------------------------------------------------------------
-- 9. college_activity: append-only, read by admin, HoD and quality staff
-- ---------------------------------------------------------------------------
create or replace function public._college_quality_reader(p_college uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select exists (
    select 1 from public.college_staff s
    where s.college_id = p_college
      and s.user_id = auth.uid()
      and s.archived_at is null
      and lower(coalesce(s.status, 'active')) = 'active'
      and (s.role in ('admin','head_of_department','iqa') or s.is_quality_nominee is true)
  );
$function$;
revoke all on function public._college_quality_reader(uuid) from public, anon;
grant execute on function public._college_quality_reader(uuid) to authenticated;

drop policy if exists "Same-college staff update activity" on public.college_activity;
drop policy if exists "Same-college staff delete activity" on public.college_activity;
drop policy if exists "Same-college users read activity" on public.college_activity;
-- The actor may read their own rows so logActivity's insert ... returning
-- keeps working for tutors (MockGradingSheet, calibration sessions).
create policy "Quality staff read activity" on public.college_activity
  for select to authenticated
  using (public._college_quality_reader(college_id) or actor_id = auth.uid());
