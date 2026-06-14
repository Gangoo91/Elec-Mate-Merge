-- College -> Employer-Hub bridge.
-- Lets an Employer Hub user see the college progress of THEIR OWN employees
-- who are also college apprentices. Linkage: an employer is auth.uid()
-- (employer_employees.employer_id -> profiles.id); their apprentices are
-- employees whose user_id matches a college_students.user_id.
-- SECURITY DEFINER reads college tables the employer can't see directly, but
-- WHERE employer_employees.employer_id = auth.uid() scopes strictly to the
-- caller's own workers — no cross-tenant exposure. Verified: a different user
-- sees 0 rows for the same apprentice.
-- Applied live 2026-06-14; this file version-controls the live definition.

CREATE OR REPLACE FUNCTION public.get_employer_apprentice_college_progress()
 RETURNS TABLE (
   student_user_id    uuid,
   name               text,
   college_name       text,
   course_name        text,
   progress_percent   integer,
   attendance_percent integer,
   otj_required_hours integer,
   otj_verified_hours integer,
   otj_on_track       boolean,
   epa_status         text,
   last_review_date   date,
   review_overdue     boolean
 )
 LANGUAGE sql
 STABLE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select
    base.student_user_id,
    base.name,
    base.college_name,
    base.course_name,
    base.progress_percent,
    base.attendance_percent,
    base.otj_required_hours,
    base.otj_verified_hours,
    case
      when base.start_date is not null and base.expected_end_date is not null
           and base.expected_end_date > base.start_date
      then base.otj_verified_hours >= 0.9 * base.otj_required_hours *
           least(1.0::numeric, greatest(0.0::numeric,
             (current_date - base.start_date)::numeric
             / nullif((base.expected_end_date - base.start_date)::numeric, 0)))
      else base.otj_verified_hours >= 0.45 * base.otj_required_hours
    end as otj_on_track,
    base.epa_status,
    base.last_review_date,
    (base.last_review_date is null or base.last_review_date < current_date - 84) as review_overdue
  from (
    select
      cs.id                       as cs_id,
      cs.user_id                  as student_user_id,
      cs.name                     as name,
      col.name                    as college_name,
      cc.name                     as course_name,
      coalesce(cs.progress_percent, 0)::int as progress_percent,
      coalesce((
        select round(100.0 * count(*) filter (where a.status in ('Present','Late'))
                     / nullif(count(*), 0))
        from college_attendance a where a.student_id = cs.id
      ), 0)::int                  as attendance_percent,
      coalesce(cc.otj_required_hours, 1066)::int as otj_required_hours,
      coalesce((
        select round(sum(o.duration_minutes) / 60.0)
        from college_otj_entries o
        where o.student_id = cs.user_id and o.verification_status = 'verified'
      ), 0)::int                  as otj_verified_hours,
      (select e.status from college_epa e
         where e.student_id = cs.id
         order by e.updated_at desc nulls last limit 1) as epa_status,
      (select i.last_reviewed from college_ilps i
         where i.student_id = cs.id
         order by i.last_reviewed desc nulls last limit 1) as last_review_date,
      cs.start_date,
      cs.expected_end_date
    from employer_employees ee
    join college_students cs on cs.user_id = ee.user_id
    left join colleges col       on col.id = cs.college_id
    left join college_courses cc on cc.id  = cs.course_id
    where ee.employer_id = auth.uid()
      and coalesce(lower(cs.status), '') not in ('withdrawn', 'archived')
  ) base
$function$;

revoke all on function public.get_employer_apprentice_college_progress() from public, anon;
grant execute on function public.get_employer_apprentice_college_progress() to authenticated;
