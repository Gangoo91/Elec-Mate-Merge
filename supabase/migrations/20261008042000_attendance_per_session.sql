-- Attendance: one mark per learner per SESSION, not per day (Andrew, 7 Oct 2026:
-- "one mark per session, or morning and afternoon").
--
-- college_attendance.session  'morning' | 'afternoon' | 'all_day'
--   * new registers pick Morning or Afternoon (QuickRegisterSheet and friends);
--   * rows written before this change are 'all_day' (one mark covered the day);
--   * a client that omits session (an old app build) gets it filled by the
--     BEFORE trigger: from the lesson's scheduled_start_time when lesson_plan_id
--     is set (before 12:30 = morning, else afternoon), otherwise 'all_day'.
-- Unique key: (student_id, date) -> (student_id, date, session).
--
-- OLD-CLIENT DECISION (tested in a rolled-back script, 7 Oct):
--   An upsert with on_conflict=student_id,date needs a unique index on exactly
--   (student_id, date). A partial index (… where session = 'all_day') is NOT
--   inferred by ON CONFLICT without the matching WHERE, and Postgres offers no
--   other way (rules and INSTEAD OF views refuse ON CONFLICT; inference runs
--   before triggers). Keeping a full (student_id, date) index would forbid the
--   afternoon mark, which is the whole point. So the old key is dropped: an old
--   build's upsert fails loudly with 42P10 ("no unique or exclusion constraint
--   matching the ON CONFLICT specification") and its register shows "could not
--   save" — nothing is overwritten or lost silently. Plain inserts from old
--   builds keep working (session filled as 'all_day'). On 7 Oct every one of the
--   65 attendance rows belonged to the demo fixture college, so no real college
--   is on an old register.

-- 1. Which half of the day a lesson start time falls in.
create or replace function public._attendance_session_of(p_start time)
returns text
language sql
immutable
set search_path = ''
as $$
  select case when p_start is null then null
              when p_start < time '12:30' then 'morning'
              else 'afternoon' end
$$;
revoke all on function public._attendance_session_of(time) from public, anon;
grant execute on function public._attendance_session_of(time) to authenticated, service_role;

-- 2. The column (no default: the trigger fills it, NOT NULL is checked after).
alter table public.college_attendance add column if not exists session text;

update public.college_attendance a
   set session = coalesce(
         (select public._attendance_session_of(lp.scheduled_start_time)
            from public.college_lesson_plans lp where lp.id = a.lesson_plan_id),
         'all_day')
 where a.session is null;

alter table public.college_attendance alter column session set not null;
alter table public.college_attendance drop constraint if exists college_attendance_session_check;
alter table public.college_attendance
  add constraint college_attendance_session_check check (session in ('morning', 'afternoon', 'all_day'));

-- 3. Fill session when the client leaves it out.
create or replace function public.tg_college_attendance_session()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.session is null or btrim(new.session) = '' then
    if new.lesson_plan_id is not null then
      select public._attendance_session_of(lp.scheduled_start_time) into new.session
        from public.college_lesson_plans lp where lp.id = new.lesson_plan_id;
    end if;
    new.session := coalesce(new.session, 'all_day');
  else
    new.session := lower(btrim(new.session));
    if new.session in ('am') then new.session := 'morning'; end if;
    if new.session in ('pm') then new.session := 'afternoon'; end if;
    if new.session in ('all day', 'allday', 'day') then new.session := 'all_day'; end if;
  end if;
  return new;
end $$;

drop trigger if exists a1_session on public.college_attendance;
create trigger a1_session
  before insert or update of session, lesson_plan_id on public.college_attendance
  for each row execute function public.tg_college_attendance_session();

-- 4. The key.
alter table public.college_attendance drop constraint if exists college_attendance_unique_per_day;
drop index if exists public.college_attendance_unique_per_day;
alter table public.college_attendance drop constraint if exists college_attendance_unique_per_session;
alter table public.college_attendance
  add constraint college_attendance_unique_per_session unique (student_id, date, session);

comment on column public.college_attendance.session is
  'morning | afternoon | all_day. One mark per learner per session (Andrew 7 Oct 2026). all_day = rows from before per-session registers, or an old client that sent no session and no lesson. Filled by trigger a1_session from the lesson start time (< 12:30 morning) when omitted.';

-- 5. OTJ proposals: one per register ROW (per session), keyed on the attendance id.
update public.otj_proposals
   set source_ref = source_id::text, updated_at = now()
 where source = 'register' and source_id is not null and source_ref is distinct from source_id::text;

drop index if exists public.otj_proposals_one_college_day;
create unique index otj_proposals_one_college_day
  on public.otj_proposals (user_id, activity_date) where source = 'college_day';
create or replace function public._otj_build_proposals(p_user uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  cs record;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_from date;
begin
  if p_user is null then return; end if;

  select s.id, s.college_id, s.cohort_id, s.start_date into cs
    from college_students s
   where s.user_id = p_user and s.college_id is not null
     and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by s.created_at desc limit 1;
  if cs.id is null then return; end if;

  -- Only time inside the programme counts; never more than a year back.
  v_from := greatest(coalesce(cs.start_date, v_today - 90), v_today - 365);

  -- Confirmed proposals whose entry was deleted (the apprentice withdrew a
  -- pending entry) go back on the list rather than silently vanishing.
  update otj_proposals set status = 'proposed', confirmed_minutes = null, decided_at = null, updated_at = now()
   where user_id = p_user and status = 'confirmed' and otj_entry_id is null;

  -- Withdraw open proposals whose source no longer holds.
  delete from otj_proposals p
   where p.user_id = p_user and p.status = 'proposed' and (
        (p.source = 'register' and not exists (
            select 1 from college_attendance a
             where a.id = p.source_id and a.student_id = cs.id
               and lower(coalesce(a.status, '')) in ('present', 'late')))
     or (p.source = 'college_day' and (
            not exists (select 1 from site_diary_day_marks m
                         where m.user_id = p_user and m.date = p.activity_date and m.kind = 'college')
            or exists (select 1 from college_attendance a
                        where a.student_id = cs.id and a.date = p.activity_date)))
     or (p.source = 'diary' and not exists (
            select 1 from site_diary_entries d
             where d.id = p.source_id and d.user_id = p_user
               and coalesce(d.training_minutes, 0) > 0 and d.linked_otj_entry_id is null))
   );

  -- Registers: Present / Late. Skipped where a tutor already recorded hours
  -- that day (the college logged the day itself).
  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref, source_id,
                             activity_date, proposed_minutes, activity_type, title, detail,
                             attested_by, attested_by_name)
  select p_user, cs.college_id, cs.id, 'register', a.id::text, a.id, a.date,
         nullif(least(coalesce(lp.duration_minutes, sched.minutes, 0), 1440), 0),
         'theory',
         coalesce(lp.title, sched.titles, 'College session'),
         'Marked ' || initcap(lower(a.status))
           || case a.session when 'morning' then ' (morning)' when 'afternoon' then ' (afternoon)' else '' end
           || coalesce(' by ' || mk.name, ''),
         mk.user_id, mk.name
    from college_attendance a
    left join college_lesson_plans lp on lp.id = a.lesson_plan_id
    left join lateral (
      select sum(l.duration_minutes)::int as minutes,
             string_agg(l.title, ' · ' order by l.scheduled_start_time nulls last, l.title) as titles
        from college_lesson_plans l
       where a.lesson_plan_id is null and l.cohort_id = coalesce(a.cohort_id, cs.cohort_id)
         and l.scheduled_date = a.date and coalesce(l.duration_minutes, 0) > 0
         and (a.session = 'all_day' or public._attendance_session_of(l.scheduled_start_time) = a.session)
    ) sched on true
    left join lateral (
      select st.user_id, st.name
        from college_staff st
       where st.college_id = cs.college_id and (st.id = a.recorded_by or st.user_id = a.recorded_by)
       order by (st.archived_at is null) desc
       limit 1
    ) mk on true
   where a.student_id = cs.id
     and lower(coalesce(a.status, '')) in ('present', 'late')
     and a.date between v_from and v_today
     and not exists (select 1 from college_otj_entries e
                      where e.student_id = p_user and e.activity_date = a.date
                        and e.source_kind = 'tutor_recorded' and e.verification_status <> 'rejected'
                        -- an entry made by confirming another session's register is not
                        -- "the college logged the day itself"
                        and not exists (select 1 from otj_proposals q2
                                         where q2.user_id = p_user and q2.otj_entry_id = e.id))
     -- already answered: this register row, or a college day for the same date
     and not exists (select 1 from otj_proposals q
                      where q.user_id = p_user and q.status <> 'proposed'
                        and ((q.source = 'register' and q.source_id = a.id)
                          or (q.source = 'college_day' and q.activity_date = a.date)))
  on conflict do nothing;

  -- (A register supersedes an open "college day" proposal for the same date:
  -- the withdraw step above already removed it, so the insert does not clash.)

  -- College days marked in the diary with no register for that day.
  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref,
                             activity_date, proposed_minutes, activity_type, title, detail)
  select p_user, cs.college_id, cs.id, 'college_day', m.date::text, m.date,
         nullif(least(coalesce(sched.minutes, 0), 1440), 0), 'theory',
         coalesce(sched.titles, 'College day'),
         'You marked this day as College in your site diary'
    from site_diary_day_marks m
    left join lateral (
      select sum(l.duration_minutes)::int as minutes,
             string_agg(l.title, ' · ' order by l.scheduled_start_time nulls last, l.title) as titles
        from college_lesson_plans l
       where l.cohort_id = cs.cohort_id and l.scheduled_date = m.date and coalesce(l.duration_minutes, 0) > 0
    ) sched on true
   where m.user_id = p_user and m.kind = 'college'
     and m.date between v_from and v_today
     and not exists (select 1 from college_attendance a where a.student_id = cs.id and a.date = m.date)
     and not exists (select 1 from college_otj_entries e
                      where e.student_id = p_user and e.activity_date = m.date
                        and e.source_kind = 'tutor_recorded' and e.verification_status <> 'rejected')
  on conflict do nothing;

  -- Site diary training that never reached the hours record. 30 minutes'
  -- grace so a save still in flight is not caught mid-way.
  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref, source_id,
                             activity_date, proposed_minutes, activity_type, title, detail)
  select p_user, cs.college_id, cs.id, 'diary', d.id::text, d.id, d.date,
         least(d.training_minutes, 1440),
         case when d.training_type in ('practical', 'shadowing', 'tutorial', 'manufacturer_training',
                                       'workshop', 'mentoring', 'other')
              then d.training_type else 'practical' end,
         'Site diary · ' || coalesce(nullif(trim(d.site_name), ''), 'site day'),
         nullif(left(trim(coalesce(d.what_i_learned, '')), 200), '')
    from site_diary_entries d
   where d.user_id = p_user and coalesce(d.training_minutes, 0) > 0 and d.linked_otj_entry_id is null
     and d.updated_at < now() - interval '30 minutes'
     and d.date between v_from and v_today
  on conflict (user_id, source, source_ref) do update
     set proposed_minutes = excluded.proposed_minutes,
         activity_type = excluded.activity_type,
         title = excluded.title,
         detail = excluded.detail,
         updated_at = now()
   where otj_proposals.status = 'proposed';

  -- Open register / college-day proposals follow lesson-length changes.
  update otj_proposals p
     set proposed_minutes = nullif(least(coalesce(lp.duration_minutes, (
            select sum(l.duration_minutes)::int from college_lesson_plans l
             where a.lesson_plan_id is null and l.cohort_id = coalesce(a.cohort_id, cs.cohort_id)
               and l.scheduled_date = a.date and coalesce(l.duration_minutes, 0) > 0
               and (a.session = 'all_day' or public._attendance_session_of(l.scheduled_start_time) = a.session)), 0), 1440), 0),
         updated_at = now()
    from college_attendance a
    left join college_lesson_plans lp on lp.id = a.lesson_plan_id
   where p.user_id = p_user and p.status = 'proposed' and p.source = 'register' and a.id = p.source_id
     and p.proposed_minutes is distinct from nullif(least(coalesce(lp.duration_minutes, (
            select sum(l.duration_minutes)::int from college_lesson_plans l
             where a.lesson_plan_id is null and l.cohort_id = coalesce(a.cohort_id, cs.cohort_id)
               and l.scheduled_date = a.date and coalesce(l.duration_minutes, 0) > 0
               and (a.session = 'all_day' or public._attendance_session_of(l.scheduled_start_time) = a.session)), 0), 1440), 0);
end; $function$
;

-- 6. Value report: a register is a (cohort, date, session).
CREATE OR REPLACE FUNCTION public._college_value_month(p_college uuid, p_from date, p_to date)
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  with learners as (
    select s.id, s.user_id from college_students s where s.college_id = p_college
  ),
  lon as (
    select (p_from::timestamp at time zone 'Europe/London') as t0,
           (p_to::timestamp at time zone 'Europe/London') as t1
  )
  select jsonb_build_object(
    'hours_verified', (
      select coalesce(round(sum(o.duration_minutes) / 60.0, 1), 0)
        from college_otj_entries o, lon
       where o.college_id = p_college
         and o.verification_status in ('verified', 'verified_by_employer')
         and coalesce(o.verified_at, o.updated_at) >= lon.t0 and coalesce(o.verified_at, o.updated_at) < lon.t1
    ),
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
    'messages_answered', (
      select count(*) from student_messages m
        join student_message_threads th on th.id = m.thread_id, lon
       where th.college_id = p_college and m.sender_kind = 'tutor'
         and m.created_at >= lon.t0 and m.created_at < lon.t1
    ),
    'registers_taken', (
      select count(distinct (a.cohort_id, a.date, a.session))
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
      select count(*) from tutor_quiz_attempts q join learners l on l.user_id = q.student_id, lon
       where q.completed_at >= lon.t0 and q.completed_at < lon.t1
    ),
    'quiz_average', (
      select case when count(*) = 0 then null
             else round(avg(100.0 * q.score / nullif(q.total_points, 0))) end
        from tutor_quiz_attempts q join learners l on l.user_id = q.student_id, lon
       where q.completed_at >= lon.t0 and q.completed_at < lon.t1
    ),
    'at_risk', (
      select count(*) from student_risk_scores r join learners l on l.id = r.student_id
       where r.is_current and lower(r.level) in ('high', 'critical')
    ),
    'at_risk_contacted', (
      select count(distinct r.student_id)
        from student_risk_scores r join learners l on l.id = r.student_id
        join pastoral_notes n on n.student_id = r.student_id, lon
       where r.is_current and lower(r.level) in ('high', 'critical')
         and n.kind in ('note', 'one_to_one', 'concern', 'intervention', 'flag')
         and n.created_at >= lon.t0 and n.created_at < lon.t1
    )
  );
$function$
;
