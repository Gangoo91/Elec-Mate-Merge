-- ELE-1866: one qualification resolver (approved by Andrew 6 Oct: "do what you
-- need to do ... work fully end to end in production").
-- 14 sites resolved a learner's qualification with ~5 precedence rules. Live
-- consequence: sync_portfolio_ac_evidence matched evidence against the learner's
-- OWN selection while student_ac_coverage is seeded from the COLLEGE course, and
-- seed used the raw course code (0 rows for codes that map elsewhere).
--
-- Rule:
--   1. College course: college_students.course_id, else the cohort's course.
--      Qualification = college_courses.qualification_id, else qualifications.code = course code.
--   2. Otherwise the learner's active user_qualification_selections row.
--   3. Otherwise none.
-- id, code and title come from the SAME qualifications row.
-- requirement_code = primary qualification_requirement_mappings target, else code.

create or replace function public._resolve_qualification(p_user_id uuid, p_student_id uuid default null)
returns table (
  source text,
  qualification_id uuid,
  code text,
  requirement_code text,
  title text,
  level text,
  awarding_body text,
  course_id uuid,
  course_code text,
  course_name text,
  college_student_id uuid,
  selection_code text,
  diverges_from_selection boolean
)
language plpgsql stable security definer set search_path to 'public'
as $$
declare
  v_student public.college_students%rowtype;
  v_course public.college_courses%rowtype;
  v_q public.qualifications%rowtype;
  v_sel public.qualifications%rowtype;
  v_user uuid := p_user_id;
  v_req text;
begin
  if p_student_id is not null then
    select * into v_student from public.college_students where id = p_student_id;
    v_user := coalesce(v_user, v_student.user_id);
  elsif v_user is not null then
    select * into v_student from public.college_students
     where user_id = v_user
     order by (coalesce(status, 'active') in ('withdrawn', 'completed')), created_at desc
     limit 1;
  end if;

  if v_user is not null then
    select q.* into v_sel
      from public.user_qualification_selections u
      join public.qualifications q on q.id = u.qualification_id
     where u.user_id = v_user and u.is_active
     limit 1;
  end if;

  if v_student.id is not null then
    select * into v_course from public.college_courses
     where id = coalesce(v_student.course_id,
                         (select c.course_id from public.college_cohorts c where c.id = v_student.cohort_id));
  end if;

  if v_course.id is not null then
    if v_course.qualification_id is not null then
      select * into v_q from public.qualifications where id = v_course.qualification_id;
    end if;
    if v_q.id is null and v_course.code is not null then
      select * into v_q from public.qualifications where code = v_course.code limit 1;
    end if;
    source := 'college_course';
  elsif v_sel.id is not null then
    v_q := v_sel;
    source := 'learner_selection';
  else
    source := 'none';
  end if;

  qualification_id := v_q.id;
  code := coalesce(v_q.code, v_course.code);
  title := coalesce(v_q.title, v_course.name);
  level := coalesce(v_q.level::text, v_course.level::text);
  awarding_body := coalesce(v_q.awarding_body::text, v_course.awarding_body::text);
  if code is not null then
    select m.requirement_code into v_req
      from public.qualification_requirement_mappings m
     where m.qualification_code = code
     order by m.is_primary desc nulls last
     limit 1;
  end if;
  requirement_code := coalesce(v_req, code);
  course_id := v_course.id;
  course_code := v_course.code;
  course_name := v_course.name;
  college_student_id := v_student.id;
  selection_code := v_sel.code;
  diverges_from_selection := source = 'college_course' and v_sel.code is not null
                             and code is not null and v_sel.code <> code;
  return next;
end;
$$;
revoke all on function public._resolve_qualification(uuid, uuid) from public, anon, authenticated;

-- Callable by the learner, staff at the learner's college, or a platform admin.
create or replace function public.resolve_learner_qualification(
  p_user_id uuid default null, p_student_id uuid default null)
returns jsonb
language plpgsql stable security definer set search_path to 'public'
as $$
declare
  v_user uuid := p_user_id;
  v_college uuid;
  r record;
begin
  if p_user_id is null and p_student_id is null then
    v_user := auth.uid();
  end if;
  if p_student_id is not null then
    select user_id, college_id into v_user, v_college from public.college_students where id = p_student_id;
  end if;
  if not (
       (v_user is not null and v_user = auth.uid())
    or (v_user is not null and public.is_staff_for_learner_user(v_user))
    or (v_college is not null and exists (
          select 1 from public.college_staff s
           where s.college_id = v_college and s.user_id = auth.uid() and s.archived_at is null))
    or public._is_platform_admin()
  ) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, p_student_id);
  return to_jsonb(r);
end;
$$;
revoke all on function public.resolve_learner_qualification(uuid, uuid) from public, anon;
grant execute on function public.resolve_learner_qualification(uuid, uuid) to authenticated;

-- Seed coverage with the resolved requirement code (was raw course code).
create or replace function public.seed_student_ac_coverage(p_student_id uuid)
returns integer
language plpgsql security definer set search_path to 'public', 'pg_temp'
as $$
declare
  v_code text;
  v_inserted integer := 0;
begin
  if exists (select 1 from public.college_students cs
              where cs.id = p_student_id
                and coalesce(cs.status, 'active') in ('withdrawn', 'completed')) then
    return 0;
  end if;
  select r.requirement_code into v_code
    from public._resolve_qualification(null, p_student_id) r
   where r.source = 'college_course';
  if v_code is null then
    return 0;
  end if;
  with inserted as (
    insert into public.student_ac_coverage
      (student_id, qualification_code, unit_code, ac_code, status, evidence_count)
    select p_student_id, qr.qualification_code, qr.unit_code, qr.ac_code, 'not_started', 0
      from public.qualification_requirements qr
     where qr.qualification_code = v_code
       and not exists (
         select 1 from public.student_ac_coverage sac
          where sac.student_id = p_student_id
            and sac.qualification_code = qr.qualification_code
            and sac.unit_code = qr.unit_code
            and sac.ac_code = qr.ac_code)
    returning 1)
  select count(*) into v_inserted from inserted;
  return v_inserted;
end;
$$;

-- Evidence sync matches the SAME code coverage was seeded with.
create or replace function public.sync_portfolio_ac_evidence()
returns trigger
language plpgsql security definer set search_path to 'public'
as $$
declare
  v_student_id uuid;
  v_qual text;
begin
  if new.assessment_criteria_met is null
     or array_length(new.assessment_criteria_met, 1) is null then
    return new;
  end if;
  select r.college_student_id, r.requirement_code into v_student_id, v_qual
    from public._resolve_qualification(new.user_id, null) r;
  if v_student_id is null then return new; end if;
  if v_qual is null then
    select qualification_code into v_qual
      from public.student_ac_coverage where student_id = v_student_id limit 1;
  end if;
  if v_qual is null then return new; end if;

  with parsed as (
    select distinct
      coalesce(
        (regexp_match(s, 'Unit\s*([A-Za-z0-9/._-]+)'))[1],
        (regexp_match(s, '^\s*([A-Za-z0-9/._-]+)\s+AC\b'))[1],
        (regexp_match(s, '([A-Za-z0-9/._-]+)\s*AC\b'))[1]
      ) as unit_code,
      (regexp_match(s, 'AC\s*([0-9]+(?:\.[0-9]+)*)'))[1] as ac_code
    from unnest(new.assessment_criteria_met) as s
  )
  update public.student_ac_coverage sac
     set status = 'evidenced',
         evidence_count = greatest(coalesce(sac.evidence_count, 0), 1),
         last_evidence_at = now(),
         updated_at = now()
    from parsed p
   where sac.student_id = v_student_id
     and sac.qualification_code = v_qual
     and p.ac_code is not null
     and sac.unit_code = p.unit_code
     and sac.ac_code = p.ac_code
     and sac.status in ('not_started', 'in_progress');
  return new;
end;
$$;
