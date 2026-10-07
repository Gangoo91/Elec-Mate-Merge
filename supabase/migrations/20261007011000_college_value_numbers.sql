-- ELE-1858 — "What Elec-Mate did for you this month": the value-in-numbers
-- screen a head of department opens in a meeting and at renewal.
--
-- Every figure comes from the college's own record for a calendar month
-- (Europe/London) and the month before it, never an estimate. One function,
-- staff of the college only (same guard as get_college_inbox).

create or replace function public.get_college_value(p_college uuid default null, p_month date default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_college uuid := p_college;
  v_from date := date_trunc('month', coalesce(p_month, (now() at time zone 'Europe/London')::date))::date;
  v_to date;
  v_pfrom date;
  v_this jsonb;
  v_last jsonb;
  v_learners int;
  v_today date;
  v_pto date;
begin
  if v_college is null then
    select st.college_id into v_college from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null
     order by st.created_at desc limit 1;
  end if;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  v_to := (v_from + interval '1 month')::date;
  v_pfrom := (v_from - interval '1 month')::date;
  -- The month in progress is compared with the same days of last month, so a
  -- week-old month is never set against a whole one.
  v_today := (now() at time zone 'Europe/London')::date;
  if v_to > v_today + 1 then
    v_to := v_today + 1;
    v_pto := least(v_pfrom + (v_to - v_from), v_from);
  else
    v_pto := v_from;
  end if;

  select count(*) into v_learners from college_students s
   where s.college_id = v_college and coalesce(s.status, 'active') not in ('withdrawn', 'archived');

  select public._college_value_month(v_college, v_from, v_to) into v_this;
  select public._college_value_month(v_college, v_pfrom, v_pto) into v_last;

  return jsonb_build_object(
    'college_id', v_college,
    'month', v_from,
    'previous_month', v_pfrom,
    'to_date', v_to - 1,
    'previous_to_date', v_pto - 1,
    'partial', v_to < (v_from + interval '1 month')::date,
    'learners', v_learners,
    'this', v_this,
    'last', v_last
  );
end;
$$;

-- The figures for one month. Internal: called only by get_college_value,
-- which has already checked the caller is staff of the college.
create or replace function public._college_value_month(p_college uuid, p_from date, p_to date)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  with learners as (
    select s.id, s.user_id from college_students s where s.college_id = p_college
  ),
  lon as (
    select (p_from::timestamp at time zone 'Europe/London') as t0,
           (p_to::timestamp at time zone 'Europe/London') as t1
  )
  select jsonb_build_object(
    -- Off-the-job hours a tutor verified or an employer attested this month.
    'hours_verified', (
      select coalesce(round(sum(o.duration_minutes) / 60.0, 1), 0)
        from college_otj_entries o, lon
       where o.college_id = p_college
         and o.verification_status in ('verified', 'verified_by_employer')
         and coalesce(o.verified_at, o.updated_at) >= lon.t0 and coalesce(o.verified_at, o.updated_at) < lon.t1
    ),
    -- Learning measured in the app, by learners of this college.
    'app_learning_hours', (
      select coalesce(round(sum(t.duration) / 60.0, 1), 0)
        from time_entries t join learners l on l.user_id = t.user_id
       where public._otj_is_measured(t.is_automatic, t.notes)
         and t.date >= p_from and t.date < p_to
    ),
    'learners_studied', (
      select count(distinct t.user_id)
        from time_entries t join learners l on l.user_id = t.user_id
       where public._otj_is_measured(t.is_automatic, t.notes)
         and coalesce(t.duration, 0) > 0
         and t.date >= p_from and t.date < p_to
    ),
    -- Portfolio submissions given a decision, and how long a decision took.
    'evidence_assessed', (
      select count(*) from portfolio_submissions p join learners l on l.user_id = p.user_id, lon
       where p.reviewed_at >= lon.t0 and p.reviewed_at < lon.t1
    ),
    'decision_days', (
      select round(avg(extract(epoch from (p.reviewed_at - p.submitted_at)) / 86400.0)::numeric, 1)
        from portfolio_submissions p join learners l on l.user_id = p.user_id, lon
       where p.reviewed_at >= lon.t0 and p.reviewed_at < lon.t1
         and p.submitted_at is not null and p.reviewed_at >= p.submitted_at
    ),
    'observations', (
      select count(*) from college_observations o
       where o.college_id = p_college and o.observed_at >= p_from and o.observed_at < p_to
    ),
    'reviews_held', (
      select count(*) from college_tripartite_reviews r, lon
       where r.college_id = p_college
         and (
           (r.held_on is not null and r.held_on >= p_from and r.held_on < p_to)
           or (r.held_on is null and r.completed_at >= lon.t0 and r.completed_at < lon.t1)
         )
    ),
    -- Tutor replies to learner messages.
    'messages_answered', (
      select count(*) from student_messages m
        join student_message_threads th on th.id = m.thread_id, lon
       where th.college_id = p_college and m.sender_kind = 'tutor'
         and m.created_at >= lon.t0 and m.created_at < lon.t1
    ),
    -- A register is one cohort on one day.
    'registers_taken', (
      select count(distinct (a.cohort_id, a.date))
        from college_attendance a join learners l on l.id = a.student_id
       where a.date >= p_from and a.date < p_to
    ),
    'attendance_rate', (
      select case when count(*) = 0 then null
             else round(100.0 * count(*) filter (where lower(a.status) in ('present', 'late')) / count(*)) end
        from college_attendance a join learners l on l.id = a.student_id
       where a.date >= p_from and a.date < p_to
    ),
    'quizzes_completed', (
      select count(*) from tutor_quiz_attempts q join learners l on l.id = q.student_id, lon
       where q.completed_at >= lon.t0 and q.completed_at < lon.t1
    ),
    'quiz_average', (
      select case when count(*) = 0 then null
             else round(avg(100.0 * q.score / nullif(q.total_points, 0))) end
        from tutor_quiz_attempts q join learners l on l.id = q.student_id, lon
       where q.completed_at >= lon.t0 and q.completed_at < lon.t1
    ),
    -- Learners flagged high or critical, and how many of them a member of
    -- staff recorded contact with (a note, 1-2-1, concern or intervention).
    'at_risk', (
      select count(*) from student_risk_scores r join learners l on l.id = r.student_id
       where r.is_current and r.level in ('high', 'critical')
    ),
    'at_risk_contacted', (
      select count(distinct r.student_id)
        from student_risk_scores r join learners l on l.id = r.student_id
        join pastoral_notes n on n.student_id = r.student_id, lon
       where r.is_current and r.level in ('high', 'critical')
         and n.kind in ('note', 'one_to_one', 'concern', 'intervention', 'flag')
         and n.created_at >= lon.t0 and n.created_at < lon.t1
    )
  );
$$;

revoke all on function public._college_value_month(uuid, date, date) from public, anon, authenticated;
revoke all on function public.get_college_value(uuid, date) from public, anon;
grant execute on function public.get_college_value(uuid, date) to authenticated;
