-- ============================================================================
-- DEMO FIXTURE — Northgate Technical College (college a1b2c3d4-e5f6-7890-abcd-ef1234567890)
--
-- Northgate is the seeded DEMO college (created by 20260215_college_hub_tables.sql;
-- learners are fictional @student.northgate.ac.uk records with NO auth account).
-- This script brings the fixture's dates up to the present so the dashboard
-- shows a plausible teaching week instead of "ILP review 112 days overdue" for
-- everyone. It is idempotent and touches ONLY:
--   * the six fictional learners (college_students.user_id IS NULL at Northgate)
--   * the two seeded cohorts (33333333-cccc-…-0001 / -0002) and the connected
--     demo cohort cccc1111-…-0001 (lesson plans only)
-- It NEVER writes to a learner who has a real account (user_id not null), and
-- never touches OTJ, portfolio or quiz tables (those are keyed on auth users).
--
-- Run with the service role (SQL editor / MCP). Re-run any time before a demo.
-- ============================================================================

do $$
declare
  v_college constant uuid := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
  v_l2      constant uuid := '33333333-cccc-4000-8000-000000000001'; -- L2 Electrical 2025-A (James Cooper)
  v_l3      constant uuid := '33333333-cccc-4000-8000-000000000002'; -- L3 Electrotechnical 2025-A (Helen Clarke)
  v_y2      constant uuid := 'cccc1111-1111-4000-8000-000000000001'; -- Year 2 — Sept 2026 intake (connected demo cohort)
  v_course_l2 constant uuid := '22222222-bbbb-4000-8000-000000000001';
  v_tutor_cooper constant uuid := '11111111-aaaa-4000-8000-000000000002';
  v_tutor_clarke constant uuid := '11111111-aaaa-4000-8000-000000000003';
  v_tutor_jay    constant uuid := '01706a83-a7de-4f3b-a4ee-0a0a44460110';
  v_monday  date := date_trunc('week', current_date)::date; -- this week's Monday
  r record;
  wk int;
  d date;
begin
  -- Run as the founder's staff account: the ILP learner-field guard trigger
  -- raises 'not authorised' for a bare service-role session (auth.uid() null).
  perform set_config('request.jwt.claims', '{"sub":"aa69361d-dad9-4841-84e4-25ee41568594","role":"authenticated"}', true);

  -- 0. The connected demo cohort had no course; give it the same course its members are on.
  update college_cohorts set course_id = coalesce(course_id, v_course_l2) where id = v_y2;

  -- 1. ILP reviews for the fictional six: reviewed a fortnight ago, next review in four weeks,
  --    goals re-dated into the coming weeks. Keeps versions/narratives as they are.
  for r in
    select i.id as ilp_id, cs.id as student_id
      from college_ilps i
      join college_students cs on cs.id = i.student_id
     where cs.college_id = v_college and cs.user_id is null and i.is_current
  loop
    update college_ilps
       set last_reviewed = current_date - 14,
           review_date   = current_date + 28,
           updated_at    = now()
     where id = r.ilp_id;

    -- Spread goal targets over the next 1–6 weeks; completed ones stay completed.
    update college_ilp_goals g
       set target_date = current_date + 7 * sub.rn::int
      from (
        select id, row_number() over (order by position, created_at) as rn
          from college_ilp_goals
         where ilp_id = r.ilp_id and status not in ('completed','cancelled')
      ) sub
     where g.id = sub.id;
  end loop;

  -- 2. Attendance for the fictional six: one register a week for the last six weeks
  --    (Tuesday for L2, Thursday for L3). Mostly present; a late and an absence so the
  --    register reads as real. Upsert by (student_id, date) so re-runs don't duplicate.
  for r in
    select cs.id, cs.cohort_id, row_number() over (order by cs.name) as n
      from college_students cs
     where cs.college_id = v_college and cs.user_id is null and cs.cohort_id in (v_l2, v_l3)
  loop
    for wk in 1..6 loop
      d := v_monday - 7 * wk + (case when r.cohort_id = v_l2 then 1 else 3 end);
      if not exists (select 1 from college_attendance a where a.student_id = r.id and a.date = d) then
        insert into college_attendance (student_id, cohort_id, date, status, recorded_by)
        values (
          r.id, r.cohort_id, d,
          case
            when wk = 3 and r.n = 2 then 'Late'
            when wk = 5 and r.n = 4 then 'Absent'
            else 'Present'
          end,
          case when r.cohort_id = v_l2 then v_tutor_cooper else v_tutor_clarke end
        );
      end if;
    end loop;
  end loop;

  -- 3. Lessons this week and next so "Today's classes" / the apprentice timetable have
  --    something to show. Titles are generic unit topics; status 'ready' (not draft).
  --    Keyed on (cohort_id, scheduled_date, scheduled_start_time) to stay idempotent.
  insert into college_lesson_plans (college_id, cohort_id, tutor_id, title, scheduled_date, scheduled_start_time, duration_minutes, scheduled_room, status)
  select v_college, x.cohort_id, x.tutor_id, x.title, x.d, x.t, x.mins, x.room, 'ready'
    from (values
      (v_l2, v_tutor_cooper, 'Safe isolation and GS38 — practical', v_monday + 1, time '09:30', 180, 'Workshop 1'),
      (v_l2, v_tutor_cooper, 'Cable selection: current-carrying capacity and voltage drop', v_monday + 8, time '09:30', 150, 'Room 4'),
      (v_l3, v_tutor_clarke, 'Inspection and testing: continuity and insulation resistance', v_monday + 3, time '13:00', 180, 'Lab 2'),
      (v_l3, v_tutor_clarke, 'Fault diagnosis: ring final circuits', v_monday + 10, time '13:00', 180, 'Lab 2'),
      (v_y2, v_tutor_jay,    'Initial verification — sequence of tests', v_monday + 2, time '10:00', 180, 'Lab 2'),
      (v_y2, v_tutor_jay,    'Earth fault loop impedance and RCD testing', v_monday + 9, time '10:00', 180, 'Lab 2')
    ) as x(cohort_id, tutor_id, title, d, t, mins, room)
   where not exists (
     select 1 from college_lesson_plans lp
      where lp.cohort_id = x.cohort_id and lp.scheduled_date = x.d and lp.scheduled_start_time = x.t
   );
end $$;
