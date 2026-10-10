-- The learner's "my team" list names the cohort tutor when nobody is
-- assigned as their personal tutor.
--
-- get_my_college_team only read college_student_assignments, so a learner
-- taught as part of a cohort (no named assignment) saw "A tutor will be
-- assigned soon" although their cohort has a tutor. The cohort tutor now
-- fills the Tutor line in that case; a named assignment still wins.

create or replace function public.get_my_college_team()
 returns jsonb
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  with named as (
    select 'Tutor' as role, s.name, 1 as ord
      from college_student_assignments csa
      join college_staff s on s.id = csa.tutor_id
     where csa.student_id = auth.uid()
    union all
    select 'Assessor', s.name, 2
      from college_student_assignments csa
      join college_staff s on s.id = csa.assessor_id
     where csa.student_id = auth.uid()
    union all
    select 'IQA', s.name, 3
      from college_student_assignments csa
      join college_staff s on s.id = csa.iqa_id
     where csa.student_id = auth.uid()
  ), cohort_tutor as (
    select distinct on (s.id) 'Tutor' as role, s.name, 1 as ord
      from college_students cs
      join college_cohorts c on c.id = cs.cohort_id
      join college_staff s on s.id = c.tutor_id and s.archived_at is null
     where cs.user_id = auth.uid()
       and not exists (select 1 from named n where n.role = 'Tutor' and n.name is not null)
  )
  select coalesce(
    (select jsonb_agg(jsonb_build_object('role', t.role, 'name', t.name) order by t.ord)
       from (select * from named union all select * from cohort_tutor) t
      where t.name is not null),
    '[]'::jsonb
  );
$function$;
