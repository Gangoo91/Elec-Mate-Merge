-- ELE-2053 Apprenticeship Units (ILR programme type 34): STRUCTURE ONLY. ADDITIVE.
--
-- Apprenticeship Units started on 28 Apr 2026 (FE News, DWP on Growth and
-- Skills Levy funding); the ILR 2026/27 adds "Programme type 34 ... to record
-- Growth and Skills Offer Apprenticeship Units":
--   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/summaryofchanges
--   https://www.fenews.co.uk/skills/dwp-sets-out-how-apprenticeship-units-will-be-funded-under-the-growth-and-skills-levy/
--
-- A course can be an Apprenticeship Unit: a short programme with planned
-- hours, the unit's criteria set (the course's qualification, as for any
-- course) and a LARS learning aim reference. Nothing here stores unit
-- content: the criteria come from the awarding organisation's unit
-- specification, loaded as a qualification like any other. Where a unit has
-- no criteria loaded, or no aim reference, the hub says so.
--
-- The full-apprenticeship machinery is switched off for unit learners:
--   * progress reviews: get_review_board leaves them out, so the review board,
--     the tutor inbox and every count built on it do too;
--   * gateway and EPA readiness: hidden on the learner profile (client).
-- The ILR export defaults ProgType to 34 and LearnAimRef to the unit's aim
-- reference when the learner's own ILR fields are blank (in the ELE-2057
-- migration, which replaces _college_interchange once for both).
--
-- 1. college_courses.course_type, unit_planned_hours, unit_aim_ref, unit_duration_weeks
-- 2. _college_student_is_unit()
-- 3. get_review_board: unit learners left out (live definition, one filter added)
-- 4. college_unit_programme_save()   create or convert a unit programme
-- 5. college_unit_overview()          programmes, learners, criteria and hours, what is missing
-- 6. college_unit_complete()          record a learner's unit as complete

-- 1 ───────────────────────────────────────────────────────────────────────
alter table public.college_courses add column if not exists course_type text;
alter table public.college_courses add column if not exists unit_planned_hours numeric;
alter table public.college_courses add column if not exists unit_aim_ref text;
alter table public.college_courses add column if not exists unit_duration_weeks integer;
do $$ begin
  alter table public.college_courses add constraint college_courses_course_type_chk
    check (course_type is null or course_type in ('apprenticeship', 'apprenticeship_unit'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.college_courses add constraint college_courses_unit_hours_chk
    check (unit_planned_hours is null or unit_planned_hours between 1 and 1000);
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.college_courses add constraint college_courses_unit_aim_ref_chk
    check (unit_aim_ref is null or unit_aim_ref ~ '^[A-Za-z0-9]{1,8}$');
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.college_courses add constraint college_courses_unit_weeks_chk
    check (unit_duration_weeks is null or unit_duration_weeks between 1 and 104);
exception when duplicate_object then null; end $$;
comment on column public.college_courses.course_type is
  'apprenticeship (null reads the same) or apprenticeship_unit: an Apprenticeship Unit, ILR ProgType 34 (ELE-2053). Units have no progress reviews or gateway.';
comment on column public.college_courses.unit_planned_hours is
  'Apprenticeship Unit: planned hours for the unit, as the college sets them from the unit specification (ELE-2053).';
comment on column public.college_courses.unit_aim_ref is
  'Apprenticeship Unit: the LARS learning aim reference the college supplies (ILR LearnAimRef, up to 8 characters). Never invented.';

-- 2 ───────────────────────────────────────────────────────────────────────
create or replace function public._college_student_is_unit(p_student uuid)
returns boolean
language sql stable security definer set search_path to 'public'
as $$
  select coalesce((
    select cc.course_type = 'apprenticeship_unit'
      from public.college_students cs
      left join public.college_cohorts co on co.id = cs.cohort_id
      join public.college_courses cc on cc.id = coalesce(cs.course_id, co.course_id)
     where cs.id = p_student), false);
$$;
revoke all on function public._college_student_is_unit(uuid) from public, anon;
grant execute on function public._college_student_is_unit(uuid) to authenticated, service_role;

-- 3 ───────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_review_board(p_college uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_college uuid := p_college;
  v_today date := public._lon(now());
begin
  if v_college is null then
    select st.college_id into v_college from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null
     order by st.created_at desc limit 1;
  end if;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  return (
    with learners as (
      select s.id, s.user_id, s.name, s.cohort_id, s.employer_id,
             public.tripartite_due_by(s.id) as due_by, s.review_frequency_months
        from college_students s
       where s.college_id = v_college
         and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
         -- ELE-2053: an Apprenticeship Unit has no progress reviews.
         and not public._college_student_is_unit(s.id)
    ), last_done as (
      select r.student_id, max(coalesce(r.held_on, public._lon(r.scheduled_at))) as held_on
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
       group by 1
    ), upcoming as (   -- the next review to hold: earliest UNLOCKED one
      select distinct on (r.student_id) r.student_id, r.id, r.scheduled_at, public._lon(r.scheduled_at) as d,
             r.employer_input is not null as employer_input, r.learner_input is not null as learner_input,
             r.employer_invited_at
        from college_tripartite_reviews r
       where r.college_id = v_college and r.status <> 'cancelled' and r.locked_at is null
       order by r.student_id, r.scheduled_at nulls last
    ), to_sign as (    -- the latest signed-off review still missing a signature that is needed
      select distinct on (r.student_id) r.student_id, r.id,
             r.signatures ? 'student_signed_at' as learner_signed,
             r.signatures ? 'employer_signed_at' as employer_signed,
             coalesce((r.snapshot->>'employer_must_sign')::boolean, false) as employer_must_sign
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
         and (not (r.signatures ? 'student_signed_at')
              or (coalesce((r.snapshot->>'employer_must_sign')::boolean, false) and not (r.signatures ? 'employer_signed_at')))
       order by r.student_id, r.held_on desc
    ), emp as (
      select r.student_id, count(*) as total, count(*) filter (where r.employer_attendance = 'attended') as attended
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
       group by 1
    )
    select jsonb_build_object(
      'today', v_today,
      'rows', coalesce(jsonb_agg(jsonb_build_object(
        'student_id', l.id, 'user_id', l.user_id, 'name', l.name,
        'cohort', (select c.name from college_cohorts c where c.id = l.cohort_id),
        'employer', (select e.company_name from college_employers e where e.id = l.employer_id),
        'last_held_on', d.held_on, 'due_by', l.due_by, 'frequency_months', coalesce(l.review_frequency_months, 3),
        'next', case when u.id is null then null else jsonb_build_object(
          'id', u.id, 'scheduled_at', u.scheduled_at,
          'employer_input', u.employer_input, 'learner_input', u.learner_input,
          'employer_invited', u.employer_invited_at is not null) end,
        'to_sign', case when t.id is null then null else jsonb_build_object(
          'id', t.id, 'learner_signed', t.learner_signed, 'employer_signed', t.employer_signed,
          'employer_must_sign', t.employer_must_sign) end,
        'employer_attended', coalesce(e.attended, 0), 'reviews_done', coalesce(e.total, 0),
        'state', case
          when l.due_by < v_today then 'overdue'
          when u.id is not null and u.d < v_today then 'write_up'
          when t.id is not null then 'signatures'
          when u.id is not null and u.d <= l.due_by then 'scheduled'
          when u.id is not null and u.d > l.due_by then 'late'
          when l.due_by <= v_today + 21 then 'due_soon'
          else 'ok' end
      ) order by l.due_by, l.name), '[]'::jsonb))
      from learners l
      left join last_done d on d.student_id = l.id
      left join upcoming u on u.student_id = l.id
      left join to_sign t on t.student_id = l.id
      left join emp e on e.student_id = l.id
  );
end; $function$;

-- 4 ───────────────────────────────────────────────────────────────────────
-- p_course null creates a course; otherwise converts or edits that course.
create or replace function public.college_unit_programme_save(
  p_college uuid, p_course uuid, p_name text, p_code text, p_qualification uuid,
  p_planned_hours numeric, p_aim_ref text, p_duration_weeks integer)
returns uuid
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_id uuid;
begin
  if not public.college_can('cohorts.manage', p_college) then
    raise exception 'you cannot set up programmes for this college' using errcode = '42501';
  end if;
  if p_qualification is not null and not exists (select 1 from public.qualifications where id = p_qualification) then
    raise exception 'unknown criteria set' using errcode = '22023';
  end if;
  if nullif(trim(coalesce(p_aim_ref, '')), '') is not null and trim(p_aim_ref) !~ '^[A-Za-z0-9]{1,8}$' then
    raise exception 'a learning aim reference is up to 8 letters and digits' using errcode = '22023';
  end if;
  if p_course is null then
    if length(trim(coalesce(p_name, ''))) < 2 then
      raise exception 'give the unit programme a name' using errcode = '22023';
    end if;
    insert into public.college_courses (college_id, name, code, qualification_id, status, course_type,
                                        unit_planned_hours, unit_aim_ref, unit_duration_weeks, nation, programme_kind)
    values (p_college, trim(p_name), nullif(trim(coalesce(p_code, '')), ''), p_qualification, 'Active',
            'apprenticeship_unit', p_planned_hours, nullif(upper(trim(coalesce(p_aim_ref, ''))), ''),
            p_duration_weeks, 'england', null)
    returning id into v_id;
  else
    update public.college_courses set
      name = coalesce(nullif(trim(coalesce(p_name, '')), ''), name),
      code = case when p_code is null then code else nullif(trim(p_code), '') end,
      qualification_id = coalesce(p_qualification, qualification_id),
      course_type = 'apprenticeship_unit',
      unit_planned_hours = p_planned_hours,
      unit_aim_ref = nullif(upper(trim(coalesce(p_aim_ref, ''))), ''),
      unit_duration_weeks = p_duration_weeks
    where id = p_course and college_id = p_college
    returning id into v_id;
    if v_id is null then raise exception 'that course is not in your college' using errcode = '22023'; end if;
  end if;
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), 'unit_programme.saved', 'college_courses', v_id,
          jsonb_build_object('planned_hours', p_planned_hours, 'aim_ref', p_aim_ref));
  return v_id;
end;
$$;
revoke all on function public.college_unit_programme_save(uuid, uuid, text, text, uuid, numeric, text, integer) from public, anon;
grant execute on function public.college_unit_programme_save(uuid, uuid, text, text, uuid, numeric, text, integer) to authenticated;

-- Back to a full apprenticeship (the unit fields are kept, unused).
create or replace function public.college_unit_programme_unset(p_course uuid)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_college uuid;
begin
  select college_id into v_college from public.college_courses where id = p_course;
  if v_college is null or not public.college_can('cohorts.manage', v_college) then
    raise exception 'you cannot change this course' using errcode = '42501';
  end if;
  update public.college_courses set course_type = 'apprenticeship' where id = p_course;
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (v_college, auth.uid(), 'unit_programme.unset', 'college_courses', p_course, '{}'::jsonb);
end;
$$;
revoke all on function public.college_unit_programme_unset(uuid) from public, anon;
grant execute on function public.college_unit_programme_unset(uuid) to authenticated;

-- 5 ───────────────────────────────────────────────────────────────────────
-- Criteria states come from get_portfolio_ac_state (the one read model), run
-- as the caller, so a member of staff sees exactly the states the learner
-- profile shows. Hours are verified or employer-attested entries in the
-- off-the-job log, the same rule as the ILR HRS3 column.
create or replace function public.college_unit_overview(p_college uuid)
returns json
language plpgsql stable security definer set search_path to 'public'
as $$
declare v_out json;
begin
  if not (public.college_can('learners.view_all', p_college) or public.college_can('learners.view_mine', p_college)
          or public._review_staff_can(p_college)) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  with courses as (
    select cc.*, q.code as q_code, q.title as q_title,
           coalesce((select m.requirement_code from qualification_requirement_mappings m
                      where m.qualification_code = q.code order by m.is_primary desc nulls last limit 1), q.code) as req_code
      from college_courses cc
      left join qualifications q on q.id = cc.qualification_id
     where cc.college_id = p_college and cc.course_type = 'apprenticeship_unit'
  ),
  learners as (
    select cs.id, cs.user_id, cs.name, cs.status, cs.start_date, cs.expected_end_date,
           cs.learning_actual_end_date, co.name as cohort, c.id as course_id,
           ilr.comp_status
      from college_students cs
      left join college_cohorts co on co.id = cs.cohort_id
      join courses c on c.id = coalesce(cs.course_id, co.course_id)
      left join college_student_ilr ilr on ilr.student_id = cs.id
     where cs.college_id = p_college and lower(coalesce(cs.status, '')) <> 'archived'
  ),
  states as (
    select l.id,
           count(*) filter (where s.state is not null) as total,
           count(*) filter (where s.state in ('passed', 'iqa_confirmed')) as achieved,
           count(*) filter (where s.state in ('submitted')) as submitted,
           count(*) filter (where s.state in ('referred', 'not_yet', 'iqa_rejected')) as referred
      from learners l
      left join lateral (
        select t.state from public.get_portfolio_ac_state(l.user_id) t
         where l.user_id is not null) s on true
     group by l.id
  ),
  hrs as (
    select l.id, round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1) as verified
      from learners l
      left join college_otj_entries o on l.user_id is not null and o.student_id = l.user_id
           and o.verification_status in ('verified', 'verified_by_employer')
     group by l.id
  )
  select json_build_object(
    'programmes', coalesce((select json_agg(json_build_object(
        'course_id', c.id, 'name', c.name, 'code', c.code,
        'qualification_id', c.qualification_id, 'qualification_code', c.q_code, 'qualification_title', c.q_title,
        'criteria_count', (select count(*) from qualification_requirements r where r.qualification_code = c.req_code),
        'planned_hours', c.unit_planned_hours, 'aim_ref', c.unit_aim_ref, 'duration_weeks', c.unit_duration_weeks,
        'cohorts', (select count(*) from college_cohorts co where co.course_id = c.id),
        'missing', array_remove(array[
            case when c.qualification_id is null then 'criteria_set' end,
            case when c.qualification_id is not null
                  and not exists (select 1 from qualification_requirements r where r.qualification_code = c.req_code)
                 then 'criteria_content' end,
            case when c.unit_aim_ref is null then 'aim_ref' end,
            case when c.unit_planned_hours is null then 'planned_hours' end], null),
        'learners', coalesce((select json_agg(json_build_object(
            'student_id', l.id, 'name', l.name, 'cohort', l.cohort, 'status', l.status,
            'start_date', l.start_date, 'planned_end_date', l.expected_end_date,
            'actual_end_date', l.learning_actual_end_date,
            'criteria_total', st.total, 'criteria_achieved', st.achieved,
            'criteria_submitted', st.submitted, 'criteria_referred', st.referred,
            'hours_verified', h.verified,
            'criteria_met', st.total > 0 and st.achieved = st.total,
            'hours_met', c.unit_planned_hours is not null and h.verified >= c.unit_planned_hours,
            'completed', lower(coalesce(l.status, '')) = 'completed' or l.comp_status = 2)
            order by l.name)
           from learners l join states st on st.id = l.id join hrs h on h.id = l.id
          where l.course_id = c.id), '[]'::json))
      order by c.name) from courses c), '[]'::json),
    'courses', coalesce((select json_agg(json_build_object('id', cc.id, 'name', cc.name, 'code', cc.code,
                                                          'course_type', cc.course_type) order by cc.name)
                          from college_courses cc where cc.college_id = p_college), '[]'::json))
  into v_out;
  return v_out;
end;
$$;
revoke all on function public.college_unit_overview(uuid) from public, anon;
grant execute on function public.college_unit_overview(uuid) to authenticated;

-- 6 ───────────────────────────────────────────────────────────────────────
-- Records the end of learning on the learner record and CompStatus 2 on the
-- ILR fields. Outcome and AchDate are left for the MIS: what counts as an
-- achievement for a unit is set by the funding rules, not by us.
create or replace function public.college_unit_complete(p_student uuid, p_date date)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_college uuid;
begin
  select college_id into v_college from public.college_students where id = p_student;
  if v_college is null or not public.college_can('learners.edit', v_college) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if not public._college_student_is_unit(p_student) then
    raise exception 'this learner is not on an Apprenticeship Unit' using errcode = '22023';
  end if;
  if p_date is null or p_date > public._lon(now()) then
    raise exception 'the end date cannot be in the future' using errcode = '22023';
  end if;
  update public.college_students
     set status = 'Completed', learning_actual_end_date = p_date, updated_at = now()
   where id = p_student;
  insert into public.college_student_ilr (student_id, college_id, comp_status, updated_by, updated_at)
  values (p_student, v_college, 2, auth.uid(), now())
  on conflict (student_id) do update set comp_status = 2, updated_by = auth.uid(), updated_at = now();
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (v_college, auth.uid(), 'unit.completed', 'college_students', p_student,
          jsonb_build_object('end_date', p_date));
end;
$$;
revoke all on function public.college_unit_complete(uuid, date) from public, anon;
grant execute on function public.college_unit_complete(uuid, date) to authenticated;
