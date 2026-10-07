-- Quizzes and mocks count as app learning time (College Hub follow-up, 8 Oct 2026).
--
-- A learner who sat four quizzes showed 0 minutes of "Learning in the app":
-- only the page tracker's measured time (time_entries) was read. Completed
-- quiz and mock attempts now count, from their own timings (start to finish,
-- at most 60 minutes per attempt), MINUS any minute the tracker already
-- measured, so the same minute is never counted twice.
--
-- They are shown in get_app_learning_breakdown, and become PROPOSED hours
-- (otj_proposals source 'app_quiz', one per day) that the apprentice confirms
-- and the tutor verifies. They never go into counted hours on their own.

begin;

create or replace function public._app_quiz_minutes(
  p_user uuid, p_from date, p_to date, p_settled_before timestamptz default null)
returns table(day date, area text, attempts int, minutes int)
language sql
stable
security definer
set search_path = public
as $$
  with att as (
    select 'Quizzes'::text as area, coalesce(r.completed_at, r.created_at) as e, r.time_spent::numeric as d
      from quiz_results r where r.user_id = p_user
    union all
    select 'Quizzes', a.created_at, a.time_taken::numeric
      from quiz_attempts a where a.user_id = p_user
    union all
    select 'Quizzes', t.completed_at,
           coalesce(extract(epoch from (t.completed_at - t.started_at)), t.time_taken_seconds)::numeric
      from tutor_quiz_attempts t where t.student_id = p_user and t.completed_at is not null
    union all
    select 'Mock exams', m.created_at, m.time_taken_seconds::numeric
      from seo_mock_attempts m where m.user_id = p_user
    union all
    select 'EPA practice', s.completed_at,
           coalesce(extract(epoch from (s.completed_at - s.started_at)), s.time_spent_seconds)::numeric
      from epa_mock_sessions s where s.user_id = p_user and s.completed_at is not null
    union all
    select 'AM2 simulator', s.completed_at,
           coalesce(extract(epoch from (s.completed_at - s.started_at)), s.time_spent_seconds)::numeric
      from am2_mock_sessions s where s.user_id = p_user and s.completed_at is not null
  ), spans as (
    -- Real duration, capped at an hour: a tab left open overnight is not study.
    select area, (e at time zone 'Europe/London')::date as day,
           tstzrange(e - make_interval(secs => least(d, 3600)::double precision), e) as r
      from att
     where e is not null and d >= 1
       and (e at time zone 'Europe/London')::date between p_from and p_to
       and (p_settled_before is null or e < p_settled_before)
  ), tracked as (
    -- Minutes the page tracker already measured. A save is written at the end
    -- of the session (created_at); rows split from one save share created_at.
    select coalesce(range_agg(tstzrange(c - make_interval(mins => m), c)), '{}'::tstzmultirange) as mr
      from (select t.created_at as c, sum(t.duration)::int as m
              from time_entries t
             where t.user_id = p_user and public._otj_is_measured(t.is_automatic, t.notes)
               and coalesce(t.duration, 0) > 0 and t.date between p_from - 1 and p_to + 1
             group by t.created_at) x
  ), per as (
    select s.day, s.area, count(*)::int as n, range_agg(s.r) - (select mr from tracked) as mr
      from spans s group by s.day, s.area
  )
  select per.day, per.area, per.n,
         coalesce((select round(sum(extract(epoch from (upper(x) - lower(x)))) / 60.0)::int
                     from unnest(per.mr) as x), 0)
    from per;
$$;

comment on function public._app_quiz_minutes(uuid, date, date, timestamptz) is
  'Quiz and mock minutes per London day and area: each attempt timed start to finish (max 60 min), minus tracker-measured time. Internal; read by get_app_learning_breakdown and _otj_build_proposals.';

revoke all on function public._app_quiz_minutes(uuid, date, date, timestamptz) from public, anon, authenticated;

alter table public.otj_proposals drop constraint otj_proposals_source_check;
alter table public.otj_proposals add constraint otj_proposals_source_check
  check (source = any (array['register', 'college_day', 'diary', 'app_quiz']));

create or replace function public._otj_app_quiz_wanted(p_user uuid, p_from date, p_to date)
returns table(day date, ref text, minutes int, detail text)
language sql
stable
security definer
set search_path = public
as $$
  with q as (
    select m.day, sum(m.minutes)::int as mins,
           string_agg(m.attempts || ' ' || case m.area
               when 'Quizzes' then case when m.attempts = 1 then 'quiz' else 'quizzes' end
               when 'Mock exams' then case when m.attempts = 1 then 'mock exam' else 'mock exams' end
               when 'EPA practice' then 'EPA practice ' || case when m.attempts = 1 then 'session' else 'sessions' end
               else 'AM2 practice ' || case when m.attempts = 1 then 'session' else 'sessions' end
             end, ', ' order by m.area) as what
      from public._app_quiz_minutes(p_user, p_from, p_to, now() - interval '30 minutes') m
     group by m.day
  ), answered as (
    select o.activity_date, count(*)::int as n, coalesce(sum(o.proposed_minutes), 0)::int as offered
      from otj_proposals o
     where o.user_id = p_user and o.source = 'app_quiz' and o.status <> 'proposed'
     group by o.activity_date
  )
  select q.day,
         'app_quiz:' || q.day || ':' || (coalesce(a.n, 0) + 1),
         least(q.mins - coalesce(a.offered, 0), 1440),
         q.what || '. Timed from start to finish, up to an hour each, leaving out time already recorded as you learned.'
    from q left join answered a on a.activity_date = q.day
   where q.mins - coalesce(a.offered, 0) >= 1;
$$;

comment on function public._otj_app_quiz_wanted(uuid, date, date) is
  'Open quiz/mock proposals a learner should have: per day, minutes not yet offered. Internal to _otj_build_proposals.';

revoke all on function public._otj_app_quiz_wanted(uuid, date, date) from public, anon, authenticated;

CREATE OR REPLACE FUNCTION public._otj_build_proposals(p_user uuid)
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

  -- Quizzes and mocks in the app: one proposal per day, timed from each
  -- attempt (max an hour each), minus anything the tracker already measured.
  -- 30 minutes' grace so a tracker save in flight is subtracted first. Once a
  -- day is answered, later attempts that day come back as a second proposal
  -- for the extra minutes only. Never counted until confirmed and verified.
  delete from otj_proposals p
   where p.user_id = p_user and p.status = 'proposed' and p.source = 'app_quiz'
     and p.source_ref not in (
       select w.ref from public._otj_app_quiz_wanted(p_user, v_from, v_today) w);

  insert into otj_proposals (user_id, college_id, college_student_id, source, source_ref,
                             activity_date, proposed_minutes, activity_type, title, detail)
  select p_user, cs.college_id, cs.id, 'app_quiz', w.ref, w.day, w.minutes, 'revision',
         'Quizzes and mocks in the app', w.detail
    from public._otj_app_quiz_wanted(p_user, v_from, v_today) w
  on conflict (user_id, source, source_ref) do update
     set proposed_minutes = excluded.proposed_minutes,
         detail = excluded.detail,
         updated_at = now()
   where otj_proposals.status = 'proposed';
end; $function$;

CREATE OR REPLACE FUNCTION public.confirm_otj_proposal(p_id uuid, p_minutes integer DEFAULT NULL::integer, p_in_working_hours boolean DEFAULT NULL::boolean, p_outside_hours_compensated boolean DEFAULT NULL::boolean, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  u uuid := auth.uid();
  p record;
  v_minutes int;
  v_day_total int;
  v_name text;
  v_verified boolean := false;
  v_entry uuid;
  v_status text;
  v_hours text;
  v_desc text;
  v_in boolean;
  v_out boolean;
  v_label text;
  v_units text[] := '{}';
  v_photos text[];
begin
  if u is null then raise exception 'not authorised' using errcode = '42501'; end if;

  -- Make sure the source still holds before anything is written.
  perform public._otj_build_proposals(u);

  select * into p from otj_proposals where id = p_id and user_id = u for update;
  if p.id is null then
    return jsonb_build_object('error', 'That one is no longer on your list. Refresh and try again.');
  end if;
  if p.status <> 'proposed' then
    return jsonb_build_object('error', 'You have already answered this one.');
  end if;

  v_minutes := coalesce(p_minutes, p.proposed_minutes);
  if v_minutes is null or v_minutes < 1 or v_minutes > 1440 then
    return jsonb_build_object('error', 'Say how long it was.');
  end if;

  -- College is day release in paid hours; everything else asks (funding rules 79.6).
  v_in := case when p.source = 'register' then coalesce(p_in_working_hours, true) else p_in_working_hours end;
  v_out := coalesce(p_outside_hours_compensated, false);
  if not (coalesce(v_in, false) or v_out) then
    return jsonb_build_object('error', 'Only time in your paid working hours, or paid back by your employer, can count.');
  end if;

  select coalesce(sum(duration_minutes), 0)::int into v_day_total
    from college_otj_entries
   where student_id = u and activity_date = p.activity_date and verification_status <> 'rejected';
  if v_day_total + v_minutes > 1440 then
    return jsonb_build_object('error', 'That would put more than 24 hours on one day.');
  end if;

  select coalesce(nullif(trim(full_name), ''), 'Apprentice') into v_name from profiles where id = u;
  v_hours := regexp_replace(trim(to_char(v_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h';
  v_label := case p.source
    when 'register' then 'From your register'
    when 'college_day' then 'From your site diary (college day)'
    when 'app_quiz' then 'From your quizzes and mocks in the app'
    else 'From your site diary' end;
  v_desc := v_label || ' on ' || to_char(p.activity_date, 'FMDy FMDD Mon') || ', ' || v_hours
            || coalesce('. ' || p.detail, '') || '.'
            || case when p.proposed_minutes is not null and v_minutes <> p.proposed_minutes
                    then ' Changed by the apprentice from '
                         || regexp_replace(trim(to_char(p.proposed_minutes / 60.0, 'FM990.0')), '\.0$', '') || 'h.'
                    else '' end
            || coalesce(E'\n\n' || nullif(left(trim(coalesce(p_note, '')), 1000), ''), '');

  -- Verified by construction: the tutor's own register, a known lesson
  -- length, the apprentice keeping to it, the marker still current staff.
  v_verified := p.source = 'register'
    and p.proposed_minutes is not null
    and v_minutes <= p.proposed_minutes
    and p.attested_by is not null
    and exists (select 1 from college_staff st
                 where st.user_id = p.attested_by and st.college_id = p.college_id
                   and st.archived_at is null and lower(coalesce(st.status, 'active')) = 'active');

  if v_verified then
    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, source, source_kind, verification_status,
      verified_by, verified_at, verification_rationale, in_working_hours, outside_hours_compensated)
    values (
      p.college_id, u, p.attested_by, p.attested_by_name, p.activity_date, v_minutes,
      p.activity_type, p.title, left(v_desc, 4000), 'college', 'tutor_recorded', 'verified',
      p.attested_by, now(),
      'Register: ' || coalesce(p.detail, 'marked Present') || ' on ' || to_char(p.activity_date, 'FMDD Mon YYYY')
        || '; hours from the lesson length, confirmed by the apprentice.',
      coalesce(v_in, false), v_out)
    returning id, verification_status into v_entry, v_status;
  else
    if p.source = 'diary' then
      select coalesce(de.unit_codes, '{}'), de.photos::text[] into v_units, v_photos
        from site_diary_entries de where de.id = p.source_id and de.user_id = u;
    end if;
    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, unit_codes, evidence_url, evidence_urls,
      source, source_kind, verification_status, in_working_hours, outside_hours_compensated)
    values (
      p.college_id, u, u, v_name, p.activity_date, v_minutes,
      p.activity_type, p.title, left(v_desc, 4000),
      coalesce(v_units, '{}'),
      v_photos[1],
      case when coalesce(array_length(v_photos, 1), 0) > 0 then v_photos end,
      'apprentice', 'apprentice_submitted', 'pending', coalesce(v_in, false), v_out)
    returning id, verification_status into v_entry, v_status;

    if p.source = 'diary' then
      update site_diary_entries set linked_otj_entry_id = v_entry
       where id = p.source_id and user_id = u and linked_otj_entry_id is null;
    end if;
  end if;

  update otj_proposals
     set status = 'confirmed', confirmed_minutes = v_minutes, otj_entry_id = v_entry,
         reject_reason = null, decided_at = now(), updated_at = now()
   where id = p.id;

  return jsonb_build_object('success', true, 'entry_id', v_entry, 'status', v_status,
                            'minutes', v_minutes, 'verified', v_verified);
end; $function$;

create or replace function public.get_app_learning_breakdown(p_user uuid default null, p_days integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_user, auth.uid());
  v_today date := (now() at time zone 'Europe/London')::date;
  v_since date := (now() at time zone 'Europe/London')::date - greatest(1, least(coalesce(p_days, 30), 366)) + 1;
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return (
    with rows as (
      select t.date, t.duration, public._otj_area(t.activity) as area,
             e.verification_status as decided
        from time_entries t
        left join otj_capture_links l on l.time_entry_id = t.id
        left join college_otj_entries e on e.id = l.otj_entry_id
       where t.user_id = u and public._otj_is_measured(t.is_automatic, t.notes)
         and coalesce(t.duration, 0) > 0 and t.date >= v_since
    ), counting as (
      select * from rows where decided is distinct from 'rejected'
    ), quiz as (
      -- Quizzes and mocks, timed per attempt, never overlapping tracker time.
      select q.day, q.area, q.minutes from public._app_quiz_minutes(u, v_since, v_today, null) q
       where q.minutes > 0
    ), allm as (
      select c.date as day, c.area, c.duration as m from counting c
      union all
      select q.day, q.area, q.minutes from quiz q
    )
    select jsonb_build_object(
      'since', v_since,
      'days', coalesce((select jsonb_agg(jsonb_build_object('day', d.day, 'minutes', d.m) order by d.day)
                          from (select day, sum(m)::int m from allm group by 1) d), '[]'::jsonb),
      'areas', coalesce((select jsonb_agg(jsonb_build_object('area', a.area, 'minutes', a.m) order by a.m desc)
                           from (select area, sum(m)::int m from allm group by 1) a), '[]'::jsonb),
      'approved_minutes', (select coalesce(sum(duration), 0)::int from rows where decided in ('verified', 'verified_by_employer')),
      'left_out_minutes', (select coalesce(sum(duration), 0)::int from rows where decided = 'rejected'),
      -- Quiz/mock minutes are proposed hours: they count once the apprentice
      -- confirms them (Hours to confirm) and the tutor verifies.
      'quiz_minutes', (select coalesce(sum(minutes), 0)::int from quiz),
      'quiz_confirmed_minutes', (select coalesce(sum(o.confirmed_minutes), 0)::int from otj_proposals o
                                  where o.user_id = u and o.source = 'app_quiz' and o.status = 'confirmed'
                                    and o.activity_date >= v_since),
      'total_minutes', (select coalesce(sum(m), 0)::int from allm))
  );
end; $$;

revoke all on function public.get_app_learning_breakdown(uuid, integer) from public, anon;
grant execute on function public.get_app_learning_breakdown(uuid, integer) to authenticated;
revoke all on function public._otj_build_proposals(uuid) from public, anon, authenticated;

commit;
