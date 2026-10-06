-- ============================================================================
-- College Hub — learner read access (6 Oct 2026)
--
-- Verified against the live project: a LEARNER (college_students.user_id =
-- auth.uid(), no college_role) could not read
--   * college_lesson_plans  → "Your timetable" was always empty for a real
--                             apprentice (it only worked for Andrew, who is
--                             staff AND student on the demo college);
--   * college_resources     → "Resources from your tutor" was always empty;
--   * storage college-resources → the private bucket had staff-only policies
--                             while the apprentice card built a PUBLIC url;
--   * college_resource_views INSERT → learner opens were never logged, so
--                             tutor resource analytics never saw a learner.
-- These policies are additive and scoped to the learner's own cohort/college.
-- ============================================================================

-- Lessons for my cohort (not drafts).
drop policy if exists "Learner reads own cohort lessons" on public.college_lesson_plans;
create policy "Learner reads own cohort lessons"
  on public.college_lesson_plans
  for select
  to authenticated
  using (
    coalesce(status, '') <> 'draft'
    and cohort_id is not null
    and cohort_id in (
      select cs.cohort_id from public.college_students cs
       where cs.user_id = (select auth.uid()) and cs.cohort_id is not null
    )
  );

-- Resources shared with learners at my college.
drop policy if exists "Learner reads shared resources" on public.college_resources;
create policy "Learner reads shared resources"
  on public.college_resources
  for select
  to authenticated
  using (
    visibility in ('cohort_members', 'college')
    and college_id in (
      select cs.college_id from public.college_students cs
       where cs.user_id = (select auth.uid())
    )
  );

-- Learner logs their own open/download of a shared resource.
drop policy if exists "Learner logs own resource view" on public.college_resource_views;
create policy "Learner logs own resource view"
  on public.college_resource_views
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1
        from public.college_resources r
        join public.college_students cs on cs.college_id = r.college_id
       where r.id = college_resource_views.resource_id
         and cs.user_id = (select auth.uid())
         and r.visibility in ('cohort_members', 'college')
    )
  );

-- Storage: learner reads a file that belongs to a resource shared with them.
drop policy if exists "college-resources: learner read shared" on storage.objects;
create policy "college-resources: learner read shared"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'college-resources'
    and exists (
      select 1
        from public.college_resources r
        join public.college_students cs on cs.college_id = r.college_id
       where r.file_path = storage.objects.name
         and cs.user_id = (select auth.uid())
         and r.visibility in ('cohort_members', 'college')
    )
  );

-- Context RPC: add the cohort tutor's college_staff.id (needed when a learner
-- starts a message thread — student_message_threads.created_by FKs college_staff,
-- and notify-student-message skips the tutor push when it is null).
create or replace function public.get_my_college_context()
 returns jsonb
 language sql
 stable
 security definer
 set search_path to 'public'
as $function$
  with me as (select auth.uid() as uid),
  learner as (
    select
      cs.id                     as student_id,
      cs.college_id,
      cs.cohort_id,
      cs.course_id,
      cs.name                   as student_name,
      cs.status,
      cs.start_date,
      cs.expected_end_date,
      cs.otj_required_hours,
      c.name                    as college_name,
      c.code                    as college_code,
      co.name                   as cohort_name,
      co.start_date             as cohort_start_date,
      co.end_date               as cohort_end_date,
      cc.name                   as course_name,
      cc.code                   as course_code,
      cc.level                  as course_level,
      cc.qualification_id,
      q.code                    as qualification_code,
      q.title                   as qualification_title,
      q.awarding_body,
      coalesce(
        st.name,
        (select s2.name
           from college_student_assignments csa
           join college_staff s2 on s2.user_id = csa.tutor_id
          where csa.student_id = (select uid from me)
            and csa.college_id = cs.college_id
          limit 1)
      )                         as tutor_name,
      coalesce(
        st.user_id,
        (select csa.tutor_id
           from college_student_assignments csa
          where csa.student_id = (select uid from me)
            and csa.college_id = cs.college_id
          limit 1)
      )                         as tutor_user_id,
      coalesce(
        st.id,
        (select s2.id
           from college_student_assignments csa
           join college_staff s2 on s2.user_id = csa.tutor_id
          where csa.student_id = (select uid from me)
            and csa.college_id = cs.college_id
          limit 1)
      )                         as tutor_staff_id,
      (select count(*) from college_students x where x.cohort_id = cs.cohort_id and cs.cohort_id is not null) as cohort_size
    from college_students cs
    join colleges c          on c.id  = cs.college_id
    left join college_cohorts co on co.id = cs.cohort_id
    left join college_courses cc on cc.id = cs.course_id
    left join qualifications q   on q.id  = cc.qualification_id
    left join college_staff st   on st.id = co.tutor_id and st.archived_at is null
    where cs.user_id = (select uid from me)
    limit 1
  ),
  staff as (
    select
      s.id                      as staff_id,
      s.college_id,
      s.role,
      s.name,
      c.name                    as college_name,
      c.code                    as college_code,
      (select coalesce(jsonb_agg(jsonb_build_object(
                 'id', co.id, 'name', co.name,
                 'members', (select count(*) from college_students x where x.cohort_id = co.id)
               ) order by co.name), '[]'::jsonb)
         from college_cohorts co
        where co.tutor_id = s.id)                                   as my_cohorts,
      (select count(*) from college_cohorts co where co.college_id = s.college_id) as cohort_count,
      (select count(*) from college_students x where x.college_id = s.college_id) as learner_count,
      (select count(*) from college_staff x where x.college_id = s.college_id and x.archived_at is null) as staff_count
    from college_staff s
    join colleges c on c.id = s.college_id
    where s.user_id = (select uid from me)
      and s.archived_at is null
    order by s.created_at
    limit 1
  )
  select jsonb_build_object(
    'learner', (select to_jsonb(l) from learner l),
    'staff',   (select to_jsonb(s) from staff s)
  );
$function$;

grant execute on function public.get_my_college_context() to authenticated;
