-- Progress reviews: criteria passed, not the typed progress figure (8 Oct 2026).
--
-- _tripartite_prefill handed the review workspace college_students.progress_percent,
-- a number a tutor types (0% for learners with passed criteria). It now also
-- returns learner.criteria = { passed, total } from get_portfolio_ac_state, the
-- same count as Student 360, the portfolio and the gate's criteria line. The
-- client shows criteria when present and never the typed figure.
-- progress_percent stays in the payload so older snapshots keep their shape.
--
-- Applied 8 Oct 2026. Body is the live definition (read 8 Oct 2026) with v_criteria added.

create or replace function public._tripartite_prefill(p_review uuid)
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  r college_tripartite_reviews;
  s college_students;
  v_since date;
  v_prev uuid;
  v_otj jsonb;
  v_criteria jsonb;
begin
  select * into r from college_tripartite_reviews where id = p_review;
  if r.id is null then raise exception 'not found' using errcode = 'P0002'; end if;
  select * into s from college_students where id = r.student_id;

  select p.id, coalesce(p.held_on, public._lon(p.scheduled_at)) into v_prev, v_since
    from college_tripartite_reviews p
   where p.student_id = r.student_id and p.locked_at is not null and p.id <> r.id
     and coalesce(p.held_on, public._lon(p.scheduled_at))
         <= coalesce(r.held_on, public._lon(r.scheduled_at), public._lon(now()))
   order by coalesce(p.held_on, public._lon(p.scheduled_at)) desc limit 1;
  v_since := coalesce(v_since, s.start_date, public._lon(s.created_at));

  if s.user_id is not null then
    v_otj := public._otj_summary_core(s.user_id);
    -- The one criterion state. A viewer it refuses (or a learner with no
    -- qualification) gets no figure rather than an error.
    begin
      select case when count(*) = 0 then null else jsonb_build_object(
               'passed', count(*) filter (where st.state in ('passed', 'iqa_confirmed')),
               'total', count(*)) end
        into v_criteria
        from public.get_portfolio_ac_state(s.user_id) st;
    exception when others then
      v_criteria := null;
    end;
  end if;

  return jsonb_build_object(
    'learner', jsonb_build_object(
      'name', s.name, 'start_date', s.start_date, 'expected_end_date', s.expected_end_date,
      'course', (select c.name from college_courses c where c.id = s.course_id),
      'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
      'employer', (select e.company_name from college_employers e where e.id = coalesce(r.employer_id, s.employer_id)),
      'progress_percent', coalesce(s.progress_percent, 0),
      'criteria', v_criteria,
      'has_account', s.user_id is not null),
    'since', v_since,
    'previous_review_id', v_prev,
    'due_by', public.tripartite_due_by(s.id),
    'otj', case when v_otj is null then null else jsonb_build_object(
      'counted_hours', v_otj->'counted_hours', 'required_hours', v_otj->'required_hours',
      'planned_to_date_hours', v_otj->'planned_to_date_hours', 'pending_hours', v_otj->'pending_hours',
      'app_learning_hours', v_otj->'app_learning_hours', 'risk', v_otj->'risk',
      'weekly_needed_hours', v_otj->'weekly_needed_hours',
      'slippage_hours', greatest(0, coalesce((v_otj->>'planned_to_date_hours')::numeric, 0)
                                   - coalesce((v_otj->>'counted_hours')::numeric, 0))) end,
    'training_since', coalesce((
      select jsonb_agg(jsonb_build_object('type', t.activity_type, 'hours', t.h) order by t.h desc)
        from (select o.activity_type, round(sum(o.duration_minutes) / 60.0, 1) h
                from college_otj_entries o
               where o.student_id = s.user_id and o.activity_date >= v_since
                 and o.verification_status in ('verified', 'verified_by_employer')
               group by 1) t), '[]'::jsonb),
    'hours_since', coalesce((
      select round(sum(o.duration_minutes) / 60.0, 1) from college_otj_entries o
       where o.student_id = s.user_id and o.activity_date >= v_since
         and o.verification_status in ('verified', 'verified_by_employer')), 0),
    'attendance_since', (
      select jsonb_build_object('sessions', count(*),
               'percent', round(100.0 * count(*) filter (where a.status in ('Present', 'Late')) / nullif(count(*), 0)))
        from college_attendance a where a.student_id = s.id and a.date >= v_since),
    'evidence_since', jsonb_build_object(
      'signed_off', (select count(*) from portfolio_submissions p
                      where p.user_id = s.user_id and p.signed_off_at >= v_since),
      'awaiting_assessment', (select count(*) from portfolio_submissions p
                               where p.user_id = s.user_id and p.status in ('submitted', 'resubmitted', 'in_review')),
      'witness_statements', (select count(*) from portfolio_witness_statements w
                              where w.learner_id = s.user_id and w.signed_at >= v_since)),
    -- 98.1: actions agreed at a SIGNED earlier review, still open or closed here.
    'open_actions', coalesce((
      select jsonb_agg(jsonb_build_object('id', a.id, 'action', a.action, 'owner_party', a.owner_party,
                                          'due_date', a.due_date, 'status', a.status, 'outcome_note', a.outcome_note,
                                          'closed_in_review_id', a.closed_in_review_id)
                       order by a.created_at, a.position)
        from college_review_actions a
        join college_tripartite_reviews ar on ar.id = a.review_id and ar.locked_at is not null
       where a.student_id = s.id and a.review_id <> r.id
         and (a.status = 'open' or a.closed_in_review_id = r.id)), '[]'::jsonb),
    'goals', coalesce((
      select jsonb_agg(jsonb_build_object('title', g.title, 'status', g.status, 'target_date', g.target_date)
                       order by g.position)
        from college_ilp_goals g
        join college_ilps i on i.id = g.ilp_id and i.is_current
       where g.student_id = s.id), '[]'::jsonb),
    'support_needs', exists (select 1 from college_ilps i where i.student_id = s.id and i.is_current
                              and length(trim(coalesce(i.support_needs, ''))) > 0)
                     or coalesce(array_length(s.send_flags, 1), 0) > 0 or s.ehcp_ref is not null
  );
end; $function$;
