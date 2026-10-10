-- Gateway forecast (8 Oct 2026)
--
-- "At this pace, ready for gateway by March 2027." Tutors and learners know
-- where a learner is today; this says when they will be ready if nothing
-- changes, and what would bring the date forward.
--
-- Additive only: three new functions, nothing existing is altered.
--
-- The forecast date is the LATEST of:
--   criteria  when every qualification criterion will be passed, at the pace
--             criteria have been passed over the last 12 weeks (or since the
--             start date, when the learner has been on programme less than 12
--             weeks). Passed = the same rule as get_portfolio_ac_state:
--             the current (not superseded) decision is 'passed' and the IQA
--             has not rejected it.
--   hours     when counted off-the-job hours reach the target, at the weekly
--             pace from _otj_summary_core (counted hours / weeks on programme).
--   duration  the date the minimum time on programme is met, worked out
--             exactly as get_gateway_readiness does (EPA standards only).
--
-- Status: on_pace (forecast on or before the planned end), at_risk (within
-- 8 weeks after it), off_pace (later, or never at the current pace),
-- not_enough_history (under 4 weeks on programme, no start date, or no
-- qualification), plus gateway_passed, stopped (withdrawn, completed or
-- transferred: hours frozen) and no_end_date (a forecast, but no planned end
-- to compare it with).
--
-- Who can read: the learner themselves, staff who assess them (_can_assess),
-- and college staff with learners.view_all, or learners.view_mine for a
-- learner who is theirs.

create or replace function public._gateway_forecast_can_read(p_learner uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select auth.uid() is not null and p_learner is not null and (
       p_learner = auth.uid()
    or public._can_assess(p_learner)
    or exists (select 1 from public.college_students cs
                where cs.user_id = p_learner
                  and (public.college_can('learners.view_all', cs.college_id, cs.id)
                       or public.college_can('learners.view_mine', cs.college_id, cs.id))));
$function$;

revoke all on function public._gateway_forecast_can_read(uuid) from public, anon;
grant execute on function public._gateway_forecast_can_read(uuid) to authenticated;

-- The working. No permission check of its own, so nobody but the owner may
-- call it: get_gateway_forecast and get_gateway_forecast_many check first.
create or replace function public._gateway_forecast_core(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  u uuid := p_learner;
  v_today date := (now() at time zone 'Europe/London')::date;
  q record;
  st record;
  g public.epa_gateway_checklist;
  s jsonb;
  v_start date;
  v_end date;
  v_weeks_on numeric;
  v_window_weeks numeric;
  v_window_from date;
  -- criteria
  v_total int := 0;
  v_passed int := 0;
  v_recent int := 0;
  v_remaining int := 0;
  v_c_pace numeric;
  v_c_date date;
  v_c_state text;
  v_c_needed numeric;
  v_c_basis text;
  -- hours
  v_required numeric;
  v_counted numeric;
  v_h_pace numeric;
  v_h_date date;
  v_h_state text;
  v_h_needed numeric;
  -- duration
  v_d_start date;
  v_min int;
  v_met date;
  v_d_state text;
  v_is_epa boolean;
  -- result
  v_weeks_to_end numeric;
  v_forecast date;
  v_status text;
  v_reason text;
  v_lever text;
  v_late_days int;
  v_first_forecast date;
  v_open jsonb;
  v_horizon date := ((now() at time zone 'Europe/London')::date + interval '15 years')::date;
  v_frozen date;
begin
  select * into q from public._resolve_qualification(u, null) limit 1;
  select * into st from public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code));
  v_is_epa := st.standard_code is not null;
  select * into g from public.epa_gateway_checklist where user_id = u order by updated_at desc nulls last limit 1;
  s := public._otj_summary_core(u);
  v_start := (s->>'start_date')::date;
  v_end := (s->>'end_date')::date;
  v_frozen := (s->>'frozen_at')::date;
  if v_frozen is not null and v_frozen < v_today then
    v_today := v_frozen;
  end if;

  v_weeks_on := case when v_start is not null then greatest(0, (v_today - v_start)) / 7.0 end;
  v_weeks_to_end := case when v_end is not null then greatest(0, (v_end - v_today)) / 7.0 end;
  v_first_forecast := case when v_start is not null then v_start + 28 end;

  -- 1 Criteria ---------------------------------------------------------------
  if q.requirement_code is not null then
    select count(*) into v_total
      from public.qualification_requirements qr
     where qr.qualification_code = q.requirement_code;

    with cur as (
      select distinct on (d.unit_code, d.ac_code) d.unit_code, d.ac_code, d.decision, d.iqa_verdict, d.decided_at
        from public.portfolio_assessment_decisions d
       where d.learner_id = u and d.qualification_code = q.requirement_code and d.superseded_at is null
       order by d.unit_code, d.ac_code, d.decided_at desc
    ), passed as (
      select cur.decided_at
        from public.qualification_requirements qr
        join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
       where qr.qualification_code = q.requirement_code
         and cur.decision = 'passed' and coalesce(cur.iqa_verdict, '') <> 'not_confirmed'
    )
    select count(*),
           count(*) filter (where v_start is not null
                              and (passed.decided_at at time zone 'Europe/London')::date
                                  > v_today - (least(12, v_weeks_on) * 7)::int)
      into v_passed, v_recent
      from passed;
  end if;
  v_remaining := greatest(0, v_total - v_passed);

  if v_total = 0 then
    v_c_state := 'no_qualification';
  elsif v_remaining = 0 then
    v_c_state := 'done';
    v_c_date := v_today;
  elsif v_start is null then
    v_c_state := 'no_start_date';
  elsif v_weeks_on < 4 then
    v_c_state := 'too_early';
  else
    -- Last 12 weeks; when fewer than 3 criteria were passed in them, fall
    -- back to the pace since the start date.
    if v_weeks_on > 12 and v_recent < 3 then
      v_window_weeks := v_weeks_on;
      v_window_from := v_start;
      v_c_basis := 'since_start';
      v_c_pace := round(v_passed / v_window_weeks, 2);
    else
      v_window_weeks := least(12, v_weeks_on);
      v_window_from := v_today - (v_window_weeks * 7)::int;
      v_c_basis := case when v_weeks_on > 12 then 'last_12_weeks' else 'since_start' end;
      v_c_pace := round(v_recent / v_window_weeks, 2);
    end if;
    if v_c_pace <= 0 then
      v_c_state := 'stalled';
    else
      v_c_date := v_today + ceil(v_remaining / v_c_pace * 7)::int;
      v_c_state := case when v_c_date > v_horizon then 'stalled' else 'forecast' end;
      if v_c_state = 'stalled' then v_c_date := null; end if;
    end if;
  end if;
  if v_remaining > 0 and v_weeks_to_end is not null and v_weeks_to_end > 0 then
    v_c_needed := round(v_remaining / v_weeks_to_end, 1);
  end if;

  -- 2 Off-the-job hours ------------------------------------------------------
  v_required := nullif((s->>'required_hours')::numeric, 0);
  v_counted := coalesce((s->>'counted_hours')::numeric, 0);
  -- The summary only works out a pace when it has a planned end date too.
  v_h_pace := coalesce((s->>'weekly_pace_hours')::numeric,
                       case when v_weeks_on >= 4 then round(v_counted / v_weeks_on, 1) end);
  v_h_needed := (s->>'weekly_needed_hours')::numeric;
  if v_required is null then
    v_h_state := 'not_set';
  elsif v_counted >= v_required then
    v_h_state := 'done';
    v_h_date := v_today;
    v_h_needed := null;
  elsif v_start is null then
    v_h_state := 'no_start_date';
  elsif v_h_pace is null then
    v_h_state := 'too_early';
  elsif v_h_pace <= 0 then
    v_h_state := 'stalled';
  else
    v_h_date := v_today + ceil((v_required - v_counted) / v_h_pace * 7)::int;
    v_h_state := case when v_h_date > v_horizon then 'stalled' else 'forecast' end;
    if v_h_state = 'stalled' then v_h_date := null; end if;
  end if;

  -- 3 Minimum time on programme (as get_gateway_readiness works it out) ------
  if v_is_epa then
    select cs.start_date into v_d_start from public.college_students cs where cs.id = q.college_student_id;
    if v_d_start is null then
      select p.start_date into v_d_start from public.user_otj_programmes p where p.user_id = u;
    end if;
    select r.min_duration_months into v_min
      from public.apprenticeship_standard_rules r
     where r.standard_code in (st.standard_code, '*')
     order by (r.standard_code = '*') limit 1;
    if v_d_start is not null and v_d_start < date '2025-08-01' and coalesce(v_min, 0) < 12 then
      v_min := 12;
    end if;
    v_met := case when v_d_start is not null and v_min is not null
                  then (v_d_start + make_interval(months => v_min))::date end;
    v_d_state := case when v_met is null then 'unknown' when v_met <= v_today then 'done' else 'forecast' end;
  else
    v_d_state := 'not_applicable';
  end if;

  -- Other gateway lines that have no date (English, maths, sign-offs). Read
  -- through get_gateway_readiness itself when the caller may read it.
  begin
    select coalesce(jsonb_agg(jsonb_build_object('key', i->>'key', 'label', i->>'label')), '[]'::jsonb)
      into v_open
      from jsonb_array_elements(public.get_gateway_readiness(u)->'items') i
     where i->>'state' <> 'green' and i->>'key' not in ('criteria', 'otj', 'duration');
  exception when others then
    v_open := null;
  end;

  -- 4 The forecast -------------------------------------------------------------
  if coalesce(g.gateway_passed, false) then
    v_status := 'gateway_passed';
  elsif v_frozen is not null then
    v_status := 'stopped';
    v_reason := s->>'frozen_reason';
  elsif v_c_state = 'no_qualification' then
    v_status := 'not_enough_history';
    v_reason := 'no_qualification';
  elsif v_c_state = 'no_start_date' or v_h_state = 'no_start_date' then
    v_status := 'not_enough_history';
    v_reason := 'no_start_date';
  elsif v_c_state = 'stalled' or v_h_state = 'stalled' then
    v_status := 'off_pace';
    v_reason := 'stalled';
  elsif v_c_state = 'too_early' or v_h_state = 'too_early' then
    v_status := 'not_enough_history';
    v_reason := 'too_early';
  else
    v_forecast := greatest(v_c_date, v_h_date, case when v_d_state in ('forecast', 'done') then v_met end, v_today);
    if v_end is null then
      v_status := 'no_end_date';
    else
      v_late_days := v_forecast - v_end;
      v_status := case when v_late_days <= 0 then 'on_pace'
                       when v_late_days <= 56 then 'at_risk'
                       else 'off_pace' end;
    end if;
  end if;

  -- The one thing that most moves the date: the component that sets it.
  if v_status in ('gateway_passed', 'stopped') or v_reason in ('no_qualification', 'no_start_date') then
    v_lever := null;
  elsif v_c_state = 'stalled' then
    v_lever := 'criteria';
  elsif v_h_state = 'stalled' then
    v_lever := 'hours';
  elsif v_forecast is not null then
    v_lever := case
      when v_forecast = v_c_date and v_c_state = 'forecast' then 'criteria'
      when v_forecast = v_h_date and v_h_state = 'forecast' then 'hours'
      when v_forecast = v_met and v_d_state = 'forecast' then 'duration'
      when v_c_state = 'done' and v_h_state in ('done', 'not_set') and v_d_state <> 'forecast' then 'none'
      else null end;
  elsif v_remaining > 0 then
    v_lever := 'criteria';
  end if;

  return jsonb_build_object(
    'learner_id', u,
    'college_student_id', coalesce(q.college_student_id, (s->>'college_student_id')::uuid),
    'status', v_status,
    'reason', v_reason,
    'forecast_date', v_forecast,
    'ready_now', v_forecast is not null and v_forecast <= v_today,
    'planned_end_date', v_end,
    'start_date', v_start,
    'weeks_on_programme', round(v_weeks_on, 1),
    'first_forecast_on', case when v_reason = 'too_early' then v_first_forecast end,
    'days_after_end', case when v_forecast is not null and v_end is not null then v_forecast - v_end end,
    'lever', v_lever,
    'criteria', jsonb_build_object(
      'state', v_c_state,
      'total', v_total,
      'passed', v_passed,
      'remaining', v_remaining,
      'passed_in_window', v_recent,
      'window_weeks', round(v_window_weeks, 1),
      'window_from', v_window_from,
      'pace_basis', v_c_basis,
      'weekly_pace', v_c_pace,
      'weekly_needed', v_c_needed,
      'date', v_c_date),
    'hours', jsonb_build_object(
      'state', v_h_state,
      'required', v_required,
      'counted', v_counted,
      'weekly_pace', v_h_pace,
      'weekly_needed', v_h_needed,
      'forecast_at_end', (s->>'forecast_at_end_hours')::numeric,
      'date', v_h_date),
    'duration', jsonb_build_object(
      'state', v_d_state,
      'min_months', v_min,
      'met_on', v_met),
    'open_lines', v_open,
    'taken_at', now());
end;
$function$;

revoke all on function public._gateway_forecast_core(uuid) from public, anon, authenticated;

create or replace function public.get_gateway_forecast(p_learner uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  u uuid := coalesce(p_learner, auth.uid());
begin
  if not public._gateway_forecast_can_read(u) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  return public._gateway_forecast_core(u);
end;
$function$;

revoke all on function public.get_gateway_forecast(uuid) from public, anon;
grant execute on function public.get_gateway_forecast(uuid) to authenticated;

create or replace function public.get_gateway_forecast_many(p_learners uuid[])
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  u uuid;
  v_out jsonb := '{}'::jsonb;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if coalesce(array_length(p_learners, 1), 0) > 500 then
    raise exception 'too many learners (500 at most)' using errcode = '22023';
  end if;

  foreach u in array coalesce((select array_agg(distinct x) from unnest(p_learners) x where x is not null), '{}'::uuid[]) loop
    if public._gateway_forecast_can_read(u) then
      begin
        v_out := v_out || jsonb_build_object(u::text, public._gateway_forecast_core(u));
      exception when others then
        null;
      end;
    end if;
  end loop;
  return v_out;
end;
$function$;

revoke all on function public.get_gateway_forecast_many(uuid[]) from public, anon;
grant execute on function public.get_gateway_forecast_many(uuid[]) to authenticated;
