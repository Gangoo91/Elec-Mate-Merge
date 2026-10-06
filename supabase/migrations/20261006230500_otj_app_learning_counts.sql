-- Andrew's decision, 6 Oct 2026: time the app records while an apprentice
-- learns (Study Centre, mock exams, flashcards, quizzes, revision, videos,
-- the AM2 and EPA simulators) COUNTS towards their off-the-job hours.
-- This reverses the 12 Sep position in ELE-1711. It stays labelled by source
-- so a tutor, employer or auditor can always see what was recorded by the
-- app and what was verified by a person, and a tutor can approve it in bulk
-- (approve_app_learning). Phantom rows (ELE-1724) stay out.
-- Applied live as migration otj_app_learning_counts.
create or replace function public.get_otj_summary(p_user uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  u uuid := coalesce(p_user, auth.uid());
  cs record;
  prog record;
  v_required numeric;
  v_required_src text := 'not_set';
  v_start date;
  v_end date;
  v_course uuid;
  v_verified int;
  v_pending int;
  v_rejected int;
  v_app int;
  v_app_week int;
  v_app_30 int;
  v_diary int;
  v_counted numeric;
  v_week_start date := date_trunc('week', (now() at time zone 'Europe/London'))::date;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_planned numeric;
  v_pace numeric;
  v_forecast numeric;
  v_weeks_left numeric;
  v_needed numeric;
  v_risk text := 'unknown';
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  select s.id, s.college_id, s.course_id, s.cohort_id, s.start_date, s.expected_end_date, s.otj_required_hours
    into cs
    from college_students s
   where s.user_id = u
   order by (lower(coalesce(s.status, '')) in ('withdrawn', 'completed', 'archived')), s.created_at desc
   limit 1;

  if cs.id is not null then
    v_start := cs.start_date;
    v_end := cs.expected_end_date;
    if cs.otj_required_hours is not null and cs.otj_required_hours > 0 then
      v_required := cs.otj_required_hours; v_required_src := 'learner_record';
    end if;
    v_course := cs.course_id;
    if cs.cohort_id is not null then
      select coalesce(v_course, c.course_id), coalesce(v_start, c.start_date), coalesce(v_end, c.end_date)
        into v_course, v_start, v_end
        from college_cohorts c where c.id = cs.cohort_id;
    end if;
    if v_required is null and v_course is not null then
      select cc.otj_required_hours into v_required from college_courses cc
       where cc.id = v_course and cc.otj_required_hours > 0;
      if v_required is not null then v_required_src := 'course'; end if;
    end if;
  end if;

  select p.start_date, p.end_date, p.total_hours into prog from user_otj_programmes p where p.user_id = u;
  if v_required is null and prog.total_hours is not null and prog.total_hours > 0 then
    v_required := prog.total_hours; v_required_src := 'self_set';
  end if;
  v_start := coalesce(v_start, prog.start_date);
  v_end := coalesce(v_end, prog.end_date);

  select coalesce(sum(duration_minutes) filter (where verification_status in ('verified', 'verified_by_employer')), 0),
         coalesce(sum(duration_minutes) filter (where verification_status = 'pending'), 0),
         count(*) filter (where verification_status = 'rejected')
    into v_verified, v_pending, v_rejected
    from college_otj_entries where student_id = u;

  -- App learning: every minute the tracker recorded. Rows already approved or
  -- sent (otj_capture_links) are counted through their college entry instead.
  select coalesce(sum(t.duration), 0),
         coalesce(sum(t.duration) filter (where t.date >= v_week_start), 0),
         coalesce(sum(t.duration) filter (where t.date >= v_today - 30), 0)
    into v_app, v_app_week, v_app_30
    from time_entries t
   where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0
     and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id);

  select coalesce(sum(t.duration), 0) into v_diary
    from time_entries t
   where t.user_id = u and not coalesce(t.is_automatic, false) and coalesce(t.duration, 0) > 0
     and coalesce(t.notes, '') <> 'Auto-tracked training time';

  v_counted := (v_verified + v_app) / 60.0;

  if v_required is not null and v_start is not null and v_end is not null and v_end > v_start then
    v_planned := round(v_required * least(1, greatest(0, (v_today - v_start)::numeric / (v_end - v_start))), 1);
    -- Four weeks in before a pace means anything: a learner who started this
    -- week was being told they would "finish 1,063h short".
    if v_today - v_start >= 28 then
      v_pace := v_counted / ((v_today - v_start) / 7.0);
      v_forecast := round(v_counted + v_pace * greatest(0, (v_end - v_today) / 7.0), 1);
    else
      v_pace := null; v_forecast := null;
    end if;
    v_weeks_left := greatest(0, (v_end - v_today) / 7.0);
    v_needed := case when v_weeks_left > 0 then round(greatest(0, v_required - v_counted) / v_weeks_left, 1) end;
    v_risk := case
      when v_counted >= coalesce(v_planned, 0) then 'on_track'
      when v_counted >= 0.8 * v_planned then 'slightly_behind'
      else 'behind' end;
  end if;

  return jsonb_build_object(
    'user_id', u,
    'college_student_id', cs.id,
    'required_hours', v_required,
    'required_source', v_required_src,
    'start_date', v_start,
    'end_date', v_end,
    'planned_to_date_hours', v_planned,
    'counted_hours', round(v_counted, 1),
    'verified_hours', round(v_verified / 60.0, 1),
    'app_learning_hours', round(v_app / 60.0, 1),
    'app_learning_this_week_hours', round(v_app_week / 60.0, 1),
    'app_learning_last_30_days_hours', round(v_app_30 / 60.0, 1),
    'pending_hours', round(v_pending / 60.0, 1),
    'rejected_entries', v_rejected,
    'diary_logged_hours', round(v_diary / 60.0, 1),
    'weekly_pace_hours', round(v_pace, 1),
    'forecast_at_end_hours', v_forecast,
    'weekly_needed_hours', v_needed,
    'risk', v_risk
  );
end; $$;
grant execute on function public.get_otj_summary(uuid) to authenticated;
