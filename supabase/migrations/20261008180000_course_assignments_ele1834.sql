-- ELE-1834 — assigned learning.
--
-- The office assigns a Study Centre course to a team member (from the
-- competence matrix, the person's sheet or an expiry row on Overview), with a
-- due date and a reason. The worker sees it in Worker Tools and the Study
-- Centre ("Requested by <firm>, due <date>") with a Start button into the
-- course. When they pass the course's final paper (an in-app row in
-- seo_mock_attempts, the one completion signal every course already writes),
-- the assignment closes, a training record lands on their Elec-ID (the single
-- credentials store, employer_elec_id_qualifications, source_table =
-- 'employer_course_assignments', self-declared) and the firm's bell rings.
--
-- A Study Centre course is CPD, not the awarding-body qualification, so the
-- matrix shows it beside the credential column it relates to and never counts
-- it as holding that credential (client: utils/competenceMatrix.ts).

create table if not exists public.employer_course_assignments (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null,
  employee_id uuid not null references public.employer_employees(id) on delete cascade,
  course_key text not null check (course_key ~ '^[a-z0-9-]{2,60}$'),
  course_title text not null check (char_length(course_title) between 2 and 120),
  start_route text not null check (start_route ~ '^/study-centre/[a-z0-9/-]{2,200}$'),
  progress_key text check (progress_key is null or progress_key ~ '^[a-z0-9-]{2,60}$'),
  credential_key text check (credential_key is null or credential_key ~ '^[a-z0-9]{2,20}$'),
  reason text check (reason is null or char_length(reason) <= 300),
  due_date date not null,
  status text not null default 'assigned' check (status in ('assigned', 'completed', 'cancelled')),
  assigned_by uuid,
  completed_at timestamptz,
  completion_attempt_id uuid,
  completion_score integer,
  qualification_id uuid,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.employer_course_assignments is
  '[EMPLOYER] Study Centre courses the office assigned to a team member, with a due date and reason (ELE-1834). Scope: employer_id via my_employer_scope(); worker reads own via get_my_course_assignments(). Written only via assign_team_course / cancel_team_course_assignment and the seo_mock_attempts pass trigger.';

create unique index if not exists employer_course_assignments_one_open
  on public.employer_course_assignments (employee_id, course_key) where status = 'assigned';
create index if not exists employer_course_assignments_employer
  on public.employer_course_assignments (employer_id, status, due_date);

alter table public.employer_course_assignments enable row level security;
revoke all on public.employer_course_assignments from public, anon, authenticated;

insert into public.notification_types (type, category, push, importance) values
  ('course_completed', 'certificates_compliance', true, 1)
on conflict (type) do nothing;

/* ── Shared row shape ─────────────────────────────────────────────────── */
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

/* ── Office: assign ───────────────────────────────────────────────────── */
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
      'Due ' || to_char(p_due, 'Dy DD Mon') || '. Pass the final paper and it''s added to your Elec-ID'
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

/* ── Office: cancel ───────────────────────────────────────────────────── */
create or replace function public.cancel_team_course_assignment(p_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  update public.employer_course_assignments a
     set status = 'cancelled', cancelled_at = now(), updated_at = now()
   where a.id = p_id
     and a.status = 'assigned'
     and a.employer_id in (select public.my_employer_scope());
  if not found then
    raise exception 'That course isn''t open on your team' using errcode = '42501';
  end if;
end;
$function$;
revoke all on function public.cancel_team_course_assignment(uuid) from public, anon;
grant execute on function public.cancel_team_course_assignment(uuid) to authenticated;

/* ── Office: read ─────────────────────────────────────────────────────── */
create or replace function public.get_team_course_assignments()
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  select coalesce(jsonb_agg(public._course_assignment_json(a)
           order by (a.status = 'assigned') desc, a.due_date, a.created_at desc), '[]'::jsonb)
    from public.employer_course_assignments a
    join public._my_team_roster() r on r.id = a.employee_id
   where a.status <> 'cancelled'
     and (a.status = 'assigned' or a.completed_at > now() - interval '180 days');
$function$;
revoke all on function public.get_team_course_assignments() from public, anon;
grant execute on function public.get_team_course_assignments() to authenticated;

/* ── Worker: read own ─────────────────────────────────────────────────── */
create or replace function public.get_my_course_assignments()
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  select coalesce(jsonb_agg(public._course_assignment_json(a)
           order by (a.status = 'assigned') desc, a.due_date, a.created_at desc), '[]'::jsonb)
    from public.employer_course_assignments a
    join public.employer_employees r on r.id = a.employee_id
   where auth.uid() is not null
     and r.user_id = auth.uid()
     and coalesce(r.status, 'Active') <> 'Archived'
     and a.status <> 'cancelled'
     and (a.status = 'assigned' or a.completed_at > now() - interval '90 days');
$function$;
revoke all on function public.get_my_course_assignments() from public, anon;
grant execute on function public.get_my_course_assignments() to authenticated;

/* ── Completion: passing the course's final paper ─────────────────────── */
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
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  if new.user_id is null or not new.passed or new.source <> 'in_app'
     or new.percentage < coalesce(new.pass_mark, 60) then
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
      v_qual := null;
      v_profile := public._elec_id_profile_for_roster(a.employee_id);
      if v_profile is not null then
        insert into public.employer_elec_id_qualifications (
          profile_id, qualification_name, qualification_type, category, awarding_body, grade,
          date_achieved, training_type, training_status, verification_level,
          added_by, added_by_employer_id, source_table, source_id)
        values (
          v_profile, a.course_title || ' (Study Centre course)', 'training', 'training',
          'Elec-Mate Study Centre', new.percentage || '%',
          v_today, 'Study Centre course', 'Completed', 'self_declared',
          new.user_id, a.employer_id, 'employer_course_assignments', a.id)
        returning id into v_qual;
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
          || '. It''s on their Elec-ID as a Study Centre course',
        jsonb_build_object(
          'route', '/employer?section=elecid&member=' || a.employee_id,
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

drop trigger if exists trg_course_assignment_on_mock_pass on public.seo_mock_attempts;
create trigger trg_course_assignment_on_mock_pass
  after insert on public.seo_mock_attempts
  for each row
  when (new.passed and new.user_id is not null)
  execute function public._course_assignment_on_mock_pass();
