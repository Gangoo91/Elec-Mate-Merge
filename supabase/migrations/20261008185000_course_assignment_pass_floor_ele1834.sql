-- ELE-1834 review: harden the "passed the final paper" trigger.
--
-- 1. The pass bar can't be set by the client. seo_mock_attempts.pass_mark and
--    .passed come from the browser, so an attempt sent with pass_mark = 1 used
--    to close an assignment at 1%. The bar is now the course's own pass mark
--    (60% for the electrical upskilling papers, 80% for the general site
--    safety papers, as set in their mock exam configs), or the attempt's
--    pass_mark if that's higher, and the paper must have at least 20 questions
--    (every assignable paper is 20 or more).
-- 2. One pass, one Elec-ID record. Someone on two firms who were both asked to
--    do the same course closes both assignments, but gets one training record
--    for that pass, not two copies on the same profile.
-- 3. Say where it landed. 20 of 137 linked team members have no Elec-ID
--    profile, so no training record can be written for them; the bell, the
--    office list and the worker's card said "It's on their Elec-ID" anyway.
--    The row now carries on_elec_id; the bell wording follows it, and with no
--    Elec-ID the bell opens the person's Credentials tab on Team (where the
--    course shows as done) rather than an Elec-ID view that can't find them.
-- 4. The "course assigned" notification said "it's added to your Elec-ID";
--    it now says the firm sees it's done, and the date reads "Thu 8 Oct".
-- Everything else is unchanged.

create or replace function public._course_assignment_on_mock_pass()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  a record;
  v_profile uuid;
  v_qual uuid;
  v_floor integer;
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  if new.user_id is null or not new.passed or new.source <> 'in_app'
     or coalesce(new.total_questions, 0) < 20 then
    return new;
  end if;
  for a in
    select ca.*, r.name as person
      from public.employer_course_assignments ca
      join public.employer_employees r on r.id = ca.employee_id
     where r.user_id = new.user_id
       and coalesce(r.status, 'Active') <> 'Archived'
       and ca.course_key = new.exam_slug
       and ca.status = 'assigned'
       and ca.created_at <= new.created_at
  loop
    begin
      v_floor := greatest(
        case when a.start_route like '/study-centre/general-upskilling/%' then 80 else 60 end,
        coalesce(new.pass_mark, 0));
      if new.percentage < v_floor then
        continue;
      end if;

      v_qual := null;
      v_profile := public._elec_id_profile_for_roster(a.employee_id);
      if v_profile is not null then
        -- A second firm's assignment closed by the same pass reuses the record.
        select q.id into v_qual
          from public.employer_elec_id_qualifications q
          join public.employer_course_assignments ca2
            on ca2.qualification_id = q.id and ca2.completion_attempt_id = new.id
         where q.profile_id = v_profile
         limit 1;
        if v_qual is null then
          insert into public.employer_elec_id_qualifications (
            profile_id, qualification_name, qualification_type, category, awarding_body, grade,
            date_achieved, training_type, training_status, verification_level,
            added_by, added_by_employer_id, source_table, source_id)
          values (
            v_profile, 'Study Centre: ' || a.course_title, 'training', 'training',
            'Elec-Mate Study Centre', new.percentage || '%',
            v_today, 'Study Centre course', 'Completed', 'self_declared',
            new.user_id, a.employer_id, 'employer_course_assignments', a.id)
          returning id into v_qual;
        end if;
      end if;

      update public.employer_course_assignments
         set status = 'completed', completed_at = now(), completion_attempt_id = new.id,
             completion_score = new.percentage, qualification_id = v_qual, updated_at = now()
       where id = a.id;

      perform public.notify_employer_bell(
        a.employer_id, 'course_completed',
        coalesce(nullif(btrim(a.person), ''), 'Someone') || ' finished ' || a.course_title,
        'Passed the final paper with ' || new.percentage || '%'
          || case when v_today > a.due_date then ', after the due date' else ', on time' end
          || case when v_qual is not null then '. It''s on their Elec-ID as a Study Centre course'
                  else '. They have no Elec-ID yet, so it''s recorded here only' end,
        jsonb_build_object(
          'route', case when v_qual is not null then '/employer?section=elecid&member='
                        else '/employer?section=team&memberTab=creds&member=' end || a.employee_id,
          'employee_id', a.employee_id,
          'assignment_id', a.id));
    exception when others then
      raise warning '[_course_assignment_on_mock_pass] %: %', a.id, sqlerrm;
    end;
  end loop;
  return new;
exception when others then
  raise warning '[_course_assignment_on_mock_pass] %', sqlerrm;
  return new;
end;
$function$;
revoke all on function public._course_assignment_on_mock_pass() from public, anon, authenticated;

/* Row shape: + on_elec_id (a training record was written on completion). */
create or replace function public._course_assignment_json(a public.employer_course_assignments)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  select jsonb_build_object(
    'id', a.id,
    'employer_id', a.employer_id,
    'employee_id', a.employee_id,
    'employee_name', r.name,
    'linked', r.user_id is not null,
    'course_key', a.course_key,
    'course_title', a.course_title,
    'start_route', a.start_route,
    'credential_key', a.credential_key,
    'reason', a.reason,
    'due_date', a.due_date,
    'status', a.status,
    'overdue', a.status = 'assigned' and a.due_date < (now() at time zone 'Europe/London')::date,
    'completed_at', a.completed_at,
    'completion_score', a.completion_score,
    'on_elec_id', a.qualification_id is not null,
    'created_at', a.created_at,
    'firm_name', coalesce(nullif(btrim(cp.company_name), ''), 'Your firm'),
    'assigned_by_name', nullif(btrim(pr.full_name), ''),
    'sections_opened', case when a.progress_key is null or r.user_id is null then 0 else
      (select count(distinct cpg.section_key)::int from public.course_progress cpg
        where cpg.user_id = r.user_id and cpg.course_key = a.progress_key
          and cpg.last_accessed_at >= a.created_at) end,
    'last_studied', case when a.progress_key is null or r.user_id is null then null else
      (select max(cpg.last_accessed_at) from public.course_progress cpg
        where cpg.user_id = r.user_id and cpg.course_key = a.progress_key
          and cpg.last_accessed_at >= a.created_at) end
  )
  from public.employer_employees r
  left join public.company_profiles cp on cp.user_id = a.employer_id
  left join public.profiles pr on pr.id = a.assigned_by
  where r.id = a.employee_id;
$function$;
revoke all on function public._course_assignment_json(public.employer_course_assignments) from public, anon, authenticated;

/* Assign: the worker's notification no longer promises an Elec-ID record
   (they may not have one) and drops the zero-padded day ("Thu 08 Oct"). */
create or replace function public.assign_team_course(
  p_roster_id uuid, p_course jsonb, p_due date, p_reason text default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_roster public.employer_employees;
  v_id uuid;
  v_key text := nullif(btrim(coalesce(p_course->>'course_key', '')), '');
  v_title text := nullif(btrim(coalesce(p_course->>'course_title', '')), '');
  v_route text := nullif(btrim(coalesce(p_course->>'start_route', '')), '');
  v_progress text := nullif(btrim(coalesce(p_course->>'progress_key', '')), '');
  v_cred text := nullif(btrim(coalesce(p_course->>'credential_key', '')), '');
  v_reason text := nullif(left(btrim(coalesce(p_reason, '')), 300), '');
  v_today date := (now() at time zone 'Europe/London')::date;
  v_firm text;
  v_existing boolean := false;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  select * into v_roster from public._my_team_roster() r where r.id = p_roster_id;
  if v_roster.id is null then
    raise exception 'That person is not on your team' using errcode = '42501';
  end if;
  if v_key is null or v_title is null or v_route is null then
    raise exception 'Pick a course' using errcode = '22023';
  end if;
  if p_due is null then
    raise exception 'Give it a due date' using errcode = '22023';
  end if;
  if p_due < v_today then
    raise exception 'The due date can''t be in the past' using errcode = '22023';
  end if;
  if p_due > v_today + 365 then
    raise exception 'Pick a due date within a year' using errcode = '22023';
  end if;

  select id into v_id from public.employer_course_assignments
   where employee_id = v_roster.id and course_key = v_key and status = 'assigned';
  if v_id is not null then
    v_existing := true;
    update public.employer_course_assignments
       set due_date = p_due, reason = coalesce(v_reason, reason), updated_at = now()
     where id = v_id;
  else
    insert into public.employer_course_assignments (
      employer_id, employee_id, course_key, course_title, start_route, progress_key,
      credential_key, reason, due_date, assigned_by)
    values (v_roster.employer_id, v_roster.id, v_key, left(v_title, 120), v_route, v_progress,
            v_cred, v_reason, p_due, auth.uid())
    returning id into v_id;
  end if;

  if v_roster.user_id is not null then
    select coalesce(nullif(btrim(cp.company_name), ''), 'Your firm') into v_firm
      from (select 1) x left join public.company_profiles cp on cp.user_id = v_roster.employer_id;
    perform public.worker_notify(
      v_roster.user_id, 'course_assigned',
      case when v_existing then v_firm || ' moved the due date for ' || v_title
           else v_firm || ' asked you to do the ' || v_title || ' course' end,
      'Due ' || to_char(p_due, 'FMDy FMDD Mon') || '. Pass the course''s final paper and ' || v_firm || ' sees it''s done'
        || coalesce('. ' || v_reason, ''),
      jsonb_build_object(
        'route', '/electrician/worker-tools/learning?assignment=' || v_id,
        'assignment_id', v_id,
        'employee_id', v_roster.id));
  end if;
  return v_id;
end;
$function$;
revoke all on function public.assign_team_course(uuid, jsonb, date, text) from public, anon;
grant execute on function public.assign_team_course(uuid, jsonb, date, text) to authenticated;

