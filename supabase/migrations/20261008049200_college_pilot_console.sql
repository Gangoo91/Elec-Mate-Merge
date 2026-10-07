-- Founder pilot console (ELE-1965) for Admin → Colleges → Hub colleges.
--
-- admin_college_pilot_console() — platform admins only. One row per hub
-- college with its access (status, days left, grace), people (staff invited
-- vs signed in, learners on the roster vs joined, covered by access), and
-- what moved since the pilot started and in the last 7 days: active learners,
-- evidence, assessment decisions, off-the-job hours logged and verified,
-- quizzes set, messages, registers taken, and the last tutor activity.
-- "Needs a nudge" = the college has access and nothing moved in 7 days.
--
-- Also: the monthly count of learners (and staff) with access, from
-- college_access_grants, for invoicing; and pilots ending in the next 14 days.
--
-- Fixture accounts (demo_fixture_rows 'auth.users'), profiles made by
-- admin_bulk, and rows registered as demo fixtures are left out of every count.

begin;

create or replace function public.admin_college_pilot_console()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_res jsonb;
begin
  if not public._is_platform_admin() then
    raise exception 'Platform admins only' using errcode = '42501';
  end if;

  with excluded as (
    select row_id as user_id from demo_fixture_rows where table_name = 'auth.users' and row_id is not null
    union select id from profiles where created_via = 'admin_bulk'
  ),
  fx as (select table_name, row_id from demo_fixture_rows where row_id is not null),
  base as (
    select c.id, c.name, c.code, c.created_at, ca.notes, ca.pilot_started_at, ca.pilot_ends_at, ca.contract_until,
           ca.updated_at as access_updated_at, w.*,
           coalesce(ca.pilot_started_at::timestamptz, c.created_at) as since
      from colleges c
      left join college_access ca on ca.college_id = c.id
      cross join lateral public._college_access_state(c.id) w
  ),
  roll as (
    select s.college_id, s.id as roll_id, s.user_id, s.status
      from college_students s
     where (s.user_id is null or s.user_id not in (select user_id from excluded))
       and s.id not in (select row_id from fx where table_name = 'college_students')
  ),
  staff as (
    select st.college_id, st.id as staff_id, st.user_id, st.role, st.name, st.email, st.created_at
      from college_staff st
     where st.archived_at is null
       and (st.user_id is null or st.user_id not in (select user_id from excluded))
       and st.id not in (select row_id from fx where table_name = 'college_staff')
  ),
  per as (
    select b.id,
      (select count(*) from staff x where x.college_id = b.id) as staff_invited,
      (select count(*) from staff x join auth.users u on u.id = x.user_id
        where x.college_id = b.id and u.last_sign_in_at is not null) as staff_signed_in,
      (select count(*) from roll r where r.college_id = b.id) as learners_roster,
      (select count(*) from roll r where r.college_id = b.id and r.user_id is not null) as learners_joined,
      (select count(distinct g.user_id) from college_access_grants g
        where g.college_id = b.id and g.kind = 'learner' and g.ended_at is null
          and g.user_id not in (select user_id from excluded)) as learners_with_access,
      (select count(distinct g.user_id) from college_access_grants g
        where g.college_id = b.id and g.kind = 'staff' and g.ended_at is null
          and g.user_id not in (select user_id from excluded)) as staff_with_access,
      (select count(distinct r.user_id) from roll r
        where r.college_id = b.id and r.user_id is not null and (
              exists (select 1 from auth.users u where u.id = r.user_id and u.last_sign_in_at > now() - interval '7 days')
           or exists (select 1 from learning_activity_log l where l.user_id = r.user_id and l.created_at > now() - interval '7 days')
           or exists (select 1 from portfolio_items pi where pi.user_id = r.user_id and pi.created_at > now() - interval '7 days')
           or exists (select 1 from college_otj_entries o where o.student_id = r.user_id and o.created_at > now() - interval '7 days'))) as active_7d,
      (select count(*) from portfolio_items pi join roll r on r.user_id = pi.user_id and r.college_id = b.id
        where pi.created_at >= b.since and pi.id not in (select row_id from fx where table_name = 'portfolio_items')) as evidence,
      (select count(*) from portfolio_items pi join roll r on r.user_id = pi.user_id and r.college_id = b.id
        where pi.created_at > now() - interval '7 days' and pi.id not in (select row_id from fx where table_name = 'portfolio_items')) as evidence_7d,
      (select count(*) from portfolio_assessment_decisions d join roll r on r.user_id = d.learner_id and r.college_id = b.id
        where d.decided_at >= b.since and d.id not in (select row_id from fx where table_name = 'portfolio_assessment_decisions')) as decisions,
      (select count(*) from portfolio_assessment_decisions d join roll r on r.user_id = d.learner_id and r.college_id = b.id
        where d.decided_at > now() - interval '7 days' and d.id not in (select row_id from fx where table_name = 'portfolio_assessment_decisions')) as decisions_7d,
      (select round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1) from college_otj_entries o join roll r on r.user_id = o.student_id and r.college_id = b.id
        where o.created_at >= b.since and o.id not in (select row_id from fx where table_name = 'college_otj_entries')) as hours_logged,
      (select round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1) from college_otj_entries o join roll r on r.user_id = o.student_id and r.college_id = b.id
        where o.created_at >= b.since and o.verification_status in ('verified', 'verified_by_employer')
          and o.id not in (select row_id from fx where table_name = 'college_otj_entries')) as hours_verified,
      (select round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1) from college_otj_entries o join roll r on r.user_id = o.student_id and r.college_id = b.id
        where o.created_at > now() - interval '7 days' and o.id not in (select row_id from fx where table_name = 'college_otj_entries')) as hours_7d,
      (select count(*) from tutor_quizzes q
        where q.created_at >= b.since and q.id not in (select row_id from fx where table_name = 'tutor_quizzes')
          and (q.cohort_id in (select id from college_cohorts where college_id = b.id)
               or q.creator_id in (select user_id from staff x where x.college_id = b.id and x.user_id is not null))) as quizzes_set,
      (select count(*) from student_messages m join student_message_threads t on t.id = m.thread_id
        where t.college_id = b.id and m.created_at >= b.since and m.sender_kind <> 'system'
          and m.id not in (select row_id from fx where table_name = 'student_messages')) as messages,
      (select count(*) from student_messages m join student_message_threads t on t.id = m.thread_id
        where t.college_id = b.id and m.created_at > now() - interval '7 days' and m.sender_kind <> 'system'
          and m.id not in (select row_id from fx where table_name = 'student_messages')) as messages_7d,
      (select count(distinct (a.cohort_id, a.date, a.session)) from college_attendance a join roll r on r.roll_id = a.student_id
        where r.college_id = b.id and a.date >= b.since::date
          and a.id not in (select row_id from fx where table_name = 'college_attendance')) as registers,
      (select count(distinct (a.cohort_id, a.date, a.session)) from college_attendance a join roll r on r.roll_id = a.student_id
        where r.college_id = b.id and a.created_at > now() - interval '7 days'
          and a.id not in (select row_id from fx where table_name = 'college_attendance')) as registers_7d,
      greatest(
        (select max(a.created_at) from college_attendance a join roll r on r.roll_id = a.student_id
          where r.college_id = b.id and a.recorded_by in (select user_id from staff x where x.college_id = b.id)
            and a.id not in (select row_id from fx where table_name = 'college_attendance')),
        (select max(d.decided_at) from portfolio_assessment_decisions d join roll r on r.user_id = d.learner_id and r.college_id = b.id
          where d.assessor_id in (select user_id from staff x where x.college_id = b.id)
            and d.id not in (select row_id from fx where table_name = 'portfolio_assessment_decisions')),
        (select max(q.created_at) from tutor_quizzes q
          where q.creator_id in (select user_id from staff x where x.college_id = b.id and x.user_id is not null)
            and q.id not in (select row_id from fx where table_name = 'tutor_quizzes')),
        (select max(m.created_at) from student_messages m join student_message_threads t on t.id = m.thread_id
          where t.college_id = b.id and m.sender_kind = 'tutor'
            and m.id not in (select row_id from fx where table_name = 'student_messages')),
        (select max(o.verified_at) from college_otj_entries o join roll r on r.user_id = o.student_id and r.college_id = b.id
          where o.verified_by in (select user_id from staff x where x.college_id = b.id)
            and o.id not in (select row_id from fx where table_name = 'college_otj_entries')),
        (select max(ac.created_at) from college_activity ac
          where ac.college_id = b.id and ac.action not like 'elec_mate_acting.%'
            and ac.actor_id in (select user_id from staff x where x.college_id = b.id))
      ) as last_tutor_activity,
      greatest(
        (select max(pi.created_at) from portfolio_items pi join roll r on r.user_id = pi.user_id and r.college_id = b.id
          where pi.id not in (select row_id from fx where table_name = 'portfolio_items')),
        (select max(o.created_at) from college_otj_entries o join roll r on r.user_id = o.student_id and r.college_id = b.id
          where o.id not in (select row_id from fx where table_name = 'college_otj_entries')),
        (select max(l.created_at) from learning_activity_log l join roll r on r.user_id = l.user_id and r.college_id = b.id
          where l.id not in (select row_id from fx where table_name = 'learning_activity_log'))
      ) as last_learner_activity,
      (select jsonb_build_object('name', x.name, 'email', coalesce(nullif(btrim(x.email), ''), u.email))
         from staff x left join auth.users u on u.id = x.user_id
        where x.college_id = b.id and x.role in ('admin', 'head_of_department')
        order by (x.role = 'admin') desc, x.created_at limit 1) as lead
      from base b
  ),
  months as (
    select generate_series(date_trunc('month', now() at time zone 'Europe/London') - interval '11 months',
                           date_trunc('month', now() at time zone 'Europe/London'), interval '1 month')::date as m
  )
  select jsonb_build_object(
    'generated_at', now(),
    'colleges', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', b.id, 'name', b.name, 'code', b.code, 'created_at', b.created_at, 'notes', b.notes,
        'access_status', b.access_status, 'phase', b.phase, 'has_access', b.has_access,
        'pilot_started_at', b.pilot_started_at, 'pilot_ends_at', b.pilot_ends_at, 'contract_until', b.contract_until,
        'ends_on', b.ends_on, 'grace_until', b.grace_until, 'days_left', b.days_left, 'since', b.since,
        'staff_invited', p.staff_invited, 'staff_signed_in', p.staff_signed_in, 'staff_with_access', p.staff_with_access,
        'learners_roster', p.learners_roster, 'learners_joined', p.learners_joined, 'learners_with_access', p.learners_with_access,
        'active_7d', p.active_7d,
        'evidence', p.evidence, 'evidence_7d', p.evidence_7d,
        'decisions', p.decisions, 'decisions_7d', p.decisions_7d,
        'hours_logged', p.hours_logged, 'hours_verified', p.hours_verified, 'hours_7d', p.hours_7d,
        'quizzes_set', p.quizzes_set,
        'messages', p.messages, 'messages_7d', p.messages_7d,
        'registers', p.registers, 'registers_7d', p.registers_7d,
        'last_tutor_activity', p.last_tutor_activity,
        'last_movement', greatest(p.last_tutor_activity, p.last_learner_activity),
        'needs_nudge', b.has_access and coalesce(greatest(p.last_tutor_activity, p.last_learner_activity) < now() - interval '7 days', true),
        'lead', p.lead
      ) order by (b.access_status = 'none'), b.ends_on nulls last, b.name)
      from base b join per p on p.id = b.id), '[]'::jsonb),
    'monthly', coalesce((
      select jsonb_agg(jsonb_build_object('month', mm.m, 'college_id', mm.college_id, 'college_name', mm.name,
                                          'learners', mm.learners, 'staff', mm.staff) order by mm.m desc, mm.name)
        from (
          select mo.m, c.id as college_id, c.name,
                 count(distinct g.user_id) filter (where g.kind = 'learner') as learners,
                 count(distinct g.user_id) filter (where g.kind = 'staff') as staff
            from months mo
            join college_access_grants g
              on g.started_at < ((mo.m + interval '1 month')::timestamp at time zone 'Europe/London')
             and (g.ended_at is null or g.ended_at >= (mo.m::timestamp at time zone 'Europe/London'))
            join colleges c on c.id = g.college_id
           where g.user_id not in (select user_id from excluded)
           group by mo.m, c.id, c.name) mm), '[]'::jsonb),
    'history', coalesce((
      select jsonb_agg(jsonb_build_object('college_id', h.college_id, 'action', h.action, 'access_status', h.access_status,
                                          'starts_on', h.starts_on, 'ends_on', h.ends_on, 'notes', h.notes,
                                          'created_at', h.created_at,
                                          'by', (select coalesce(full_name, '') from profiles where id = h.created_by))
                       order by h.created_at desc)
        from (select * from college_access_periods order by created_at desc limit 200) h), '[]'::jsonb)
  ) into v_res;

  return v_res;
end;
$$;
revoke all on function public.admin_college_pilot_console() from public, anon;
grant execute on function public.admin_college_pilot_console() to authenticated;

commit;
