-- Status casing, part 2: SQL functions that compared college_students.status
-- (canonical 'Withdrawn'/'Completed') against lowercase literals, so withdrawn
-- and completed learners were counted in cohort summaries, picked as the
-- 'current' enrolment and re-seeded with AC coverage. Now lower()-compared.
-- propose_ilp_goal wrote college_ilps.status 'Active' (canonical 'active').
-- Bodies are the live definitions with only the quoted lines changed.

begin;

CREATE OR REPLACE FUNCTION public._resolve_qualification(p_user_id uuid, p_student_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(source text, qualification_id uuid, code text, requirement_code text, title text, level text, awarding_body text, course_id uuid, course_code text, course_name text, college_student_id uuid, selection_code text, diverges_from_selection boolean)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
     order by (lower(coalesce(status, 'active')) in ('withdrawn', 'completed', 'archived')), created_at desc
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
$function$;

CREATE OR REPLACE FUNCTION public.college_cohort_summaries(p_cohort_ids uuid[])
 RETURNS TABLE(cohort_id uuid, cohort_name text, apprentice_count bigint, avg_progress_pct integer, avg_attendance_pct integer, otj_total_hours numeric, otj_verified_hours numeric, epa_ready bigint, epa_almost bigint, epa_not_yet bigint, epa_no_verdict bigint, at_risk bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  with cs as (
    select c.id, c.user_id, c.cohort_id, c.progress_percent
    from college_students c
    where c.cohort_id = any(p_cohort_ids)
      and lower(coalesce(c.status, '')) not in ('withdrawn', 'completed', 'archived')
      and public._ch_same_college(c.college_id)
  ),
  base as (
    select cohort_id,
           count(*) as apprentice_count,
           round(avg(progress_percent))::int as avg_progress
    from cs group by cohort_id
  ),
  att as (
    select cs.cohort_id,
           count(a.*) as total,
           count(a.*) filter (where a.status in ('Present','Late')) as present_late
    from cs join college_attendance a on a.student_id = cs.id
    group by cs.cohort_id
  ),
  otj as (
    select cs.cohort_id,
           sum(coalesce(o.duration_minutes, 0)) as total_min,
           sum(case when o.verification_status like 'verified%' then coalesce(o.duration_minutes, 0) else 0 end) as verified_min
    from cs join college_otj_entries o on o.student_id = cs.user_id
    group by cs.cohort_id
  ),
  verdicts as (
    select cs.id, cs.cohort_id,
           coalesce(
             max(j.verdict) filter (where j.source = 'tutor'),
             max(j.verdict) filter (where j.source = 'ai'),
             max(j.verdict) filter (where j.source = 'learner')
           ) as verdict
    from cs
    left join college_epa_judgements j on j.college_student_id = cs.id and j.is_current
    group by cs.id, cs.cohort_id
  ),
  vc as (
    select cohort_id,
           count(*) filter (where verdict = 'ready')                as ready,
           count(*) filter (where verdict = 'almost')               as almost,
           count(*) filter (where verdict in ('not_yet','refer'))   as not_yet,
           count(*) filter (where verdict is null or verdict not in ('ready','almost','not_yet','refer')) as no_verdict
    from verdicts group by cohort_id
  ),
  risk as (
    select cs.cohort_id, count(*) as at_risk
    from cs join student_risk_scores r on r.student_id = cs.id and r.is_current
    where lower(r.level) in ('high','critical','amber','medium')
    group by cs.cohort_id
  )
  select
    ch.id,
    ch.name,
    coalesce(base.apprentice_count, 0),
    base.avg_progress,
    case when att.total > 0 then round(att.present_late::numeric / att.total * 100)::int else null end,
    round((coalesce(otj.total_min, 0) / 60.0)::numeric, 1),
    round((coalesce(otj.verified_min, 0) / 60.0)::numeric, 1),
    coalesce(vc.ready, 0),
    coalesce(vc.almost, 0),
    coalesce(vc.not_yet, 0),
    coalesce(vc.no_verdict, 0),
    coalesce(risk.at_risk, 0)
  from unnest(p_cohort_ids) as want(id)
  join college_cohorts ch on ch.id = want.id and public._ch_same_college(ch.college_id)
  left join base on base.cohort_id = ch.id
  left join att  on att.cohort_id  = ch.id
  left join otj  on otj.cohort_id  = ch.id
  left join vc   on vc.cohort_id   = ch.id
  left join risk on risk.cohort_id = ch.id;
$function$;

CREATE OR REPLACE FUNCTION public.seed_student_ac_coverage(p_student_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
declare
  v_code text;
  v_inserted integer := 0;
begin
  if exists (select 1 from public.college_students cs
              where cs.id = p_student_id
                and lower(coalesce(cs.status, 'active')) in ('withdrawn', 'completed', 'archived')) then
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
$function$;

CREATE OR REPLACE FUNCTION public.seed_student_ac_coverage_all()
 RETURNS TABLE(student_id uuid, inserted integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  RETURN QUERY
  SELECT cs.id, public.seed_student_ac_coverage(cs.id)
  FROM public.college_students cs
  WHERE cs.course_id IS NOT NULL
    AND lower(COALESCE(cs.status, 'active')) NOT IN ('withdrawn', 'completed', 'archived');
END;
$function$;

CREATE OR REPLACE FUNCTION public.propose_ilp_goal(p_title text, p_description text, p_acceptance_criteria text, p_category text, p_priority text, p_target_date date)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_student_id uuid;
  v_college_id uuid;
  v_ilp_id uuid;
  v_position int;
  v_goal_id uuid;
  v_clean_category text;
  v_clean_priority text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  -- Resolve apprentice's college_students row.
  SELECT cs.id, cs.college_id
  INTO v_student_id, v_college_id
  FROM public.college_students cs
  WHERE cs.user_id = v_uid;

  IF v_student_id IS NULL THEN
    RAISE EXCEPTION 'no_learner_context';
  END IF;

  -- Validate / coerce check-constrained fields.
  v_clean_category := CASE
    WHEN p_category IN (
      'academic', 'behavioural', 'skills', 'employability',
      'wellbeing', 'attendance', 'other'
    ) THEN p_category
    ELSE 'academic'
  END;
  v_clean_priority := CASE
    WHEN p_priority IN ('low', 'medium', 'high') THEN p_priority
    ELSE 'medium'
  END;

  -- Find or create the apprentice's current ILP.
  SELECT id INTO v_ilp_id
  FROM public.college_ilps
  WHERE student_id = v_student_id
    AND COALESCE(is_current, true) = true
  ORDER BY created_at DESC
  LIMIT 1;

  IF v_ilp_id IS NULL THEN
    INSERT INTO public.college_ilps (student_id, college_id, status, is_current, version)
    VALUES (v_student_id, v_college_id, 'active', true, 1)
    RETURNING id INTO v_ilp_id;
  END IF;

  -- Position: append to end.
  SELECT COALESCE(MAX(position), -1) + 1
  INTO v_position
  FROM public.college_ilp_goals
  WHERE ilp_id = v_ilp_id;

  INSERT INTO public.college_ilp_goals (
    ilp_id, student_id, college_id, position,
    category, priority, source,
    title, description, acceptance_criteria,
    target_date, status, created_by
  )
  VALUES (
    v_ilp_id, v_student_id, v_college_id, v_position,
    v_clean_category, v_clean_priority, 'student',
    LEFT(TRIM(p_title), 200),
    LEFT(TRIM(p_description), 4000),
    NULLIF(LEFT(TRIM(p_acceptance_criteria), 2000), ''),
    p_target_date, 'not_started', v_uid
  )
  RETURNING id INTO v_goal_id;

  RETURN v_goal_id;
END;
$function$;

commit;
