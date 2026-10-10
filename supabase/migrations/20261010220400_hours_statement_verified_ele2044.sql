-- ELE-2044 — the end-of-programme hours statement compares eligible ACTUAL
-- hours with PLANNED hours (funding rules 2026/27 paras 96–98; 2025/26 92–94):
--   96   "if the actual volume of off-the-job training delivered is less than
--         the original volume planned and agreed with the employer, the
--         provider must produce a statement" (96.1 planned, 96.2 delivered
--         "supported by proof of delivery", 96.3 reason, 96.4 minimum met);
--   97   signed by the employer and apprentice;
--   98   "completed, signed and made available as part of the evidence pack
--         within 12 weeks of the apprentice completing their apprenticeship."
-- ELE-2037 (does app-tracked learning count?) is undecided, so "actual" here
-- is VERIFIED hours (college-verified + employer-attested). App-tracked time
-- stays a separate, visible figure and is never folded into the statement.
--
-- prepare_otj_hours_statement: identical to the live function apart from the
-- actual figure (verified, not counted) and refusing a statement that is not
-- needed. _hours_statement_basis / get_hours_statement_basis: new.

CREATE OR REPLACE FUNCTION public.prepare_otj_hours_statement(p_user uuid, p_planned_hours numeric, p_reason text, p_rpl_hours numeric DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s jsonb;
  cs record;
  v_name text;
  v_min numeric;
  v_actual numeric;
  v_row public.otj_hours_statements;
begin
  if auth.uid() is null or not public._otj_staff_can_act(p_user) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if coalesce(p_planned_hours, 0) <= 0 then
    return jsonb_build_object('error', 'Enter the planned hours agreed with the employer.');
  end if;
  if length(trim(coalesce(p_reason, ''))) < 10 then
    return jsonb_build_object('error', 'Give the reason fewer hours were delivered than planned.');
  end if;
  s := public.get_otj_summary(p_user);
  -- ELE-2044: the statutory figure is eligible ACTUAL hours. Until ELE-2037
  -- decides on app-tracked learning, that is hours verified by the college or
  -- attested by the employer; app minutes are stored separately and never
  -- folded in.
  v_actual := coalesce((s->>'verified_hours')::numeric, 0);
  if v_actual >= p_planned_hours then
    return jsonb_build_object('error', 'No statement is needed: ' || round(v_actual, 1) || ' verified hours meet the '
                              || round(p_planned_hours, 1) || ' planned. A statement is only needed when fewer hours are delivered than planned.');
  end if;
  v_min := nullif((s->>'required_hours')::numeric, 0);
  if v_min is not null then
    v_min := greatest(187, v_min - coalesce(p_rpl_hours, 0));
  end if;
  select id, college_id into cs from college_students where id = (s->>'college_student_id')::uuid;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from profiles where id = auth.uid();

  update otj_hours_statements set superseded_at = now()
   where user_id = p_user and superseded_at is null;

  insert into otj_hours_statements (
    user_id, college_student_id, college_id, planned_hours, minimum_hours, rpl_hours,
    actual_hours, verified_hours, app_learning_hours, minimum_met, reason, prepared_by, prepared_by_name)
  values (
    p_user, cs.id, cs.college_id, round(p_planned_hours, 1), v_min, coalesce(p_rpl_hours, 0),
    v_actual, (s->>'verified_hours')::numeric, (s->>'app_learning_hours')::numeric,
    v_min is not null and v_actual >= v_min, trim(p_reason), auth.uid(), v_name)
  returning * into v_row;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (p_user, 'otj_statement', 'Sign your off-the-job hours statement',
            'Your tutor has prepared a statement of your planned and actual off-the-job hours. Read it and sign.',
            '/apprentice/ojt-hub?statement=' || v_row.id, jsonb_build_object('statement_id', v_row.id));
  exception when others then null;
  end;

  return jsonb_build_object('success', true, 'id', v_row.id, 'employer_token', v_row.employer_token,
                            'minimum_met', v_row.minimum_met);
end; $function$;


-- Planned (the plan in force, else the learner's planned hours), verified,
-- app-tracked, and where the programme is.
create or replace function public._hours_statement_basis(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  cs college_students;
  v_sum jsonb;
  v_planned numeric;
  v_src text;
  v_verified numeric;
  v_app numeric;
  v_end date;
  v_today date := public._lon(now());
  v_elapsed numeric;
  v_stmt otj_hours_statements;
begin
  select * into cs from college_students where id = p_student;
  if cs.id is null then return null; end if;
  if cs.user_id is not null then v_sum := public._otj_summary_core(cs.user_id); end if;
  select p.planned_otj_hours into v_planned from college_training_plans p
   where p.student_id = cs.id and p.status = 'in_force' order by p.version desc limit 1;
  if v_planned is not null then v_src := 'training_plan';
  elsif (v_sum->>'required_hours') is not null then v_planned := (v_sum->>'required_hours')::numeric; v_src := v_sum->>'required_source';
  elsif cs.otj_required_hours is not null then v_planned := cs.otj_required_hours; v_src := 'learner_record';
  end if;
  v_verified := coalesce((v_sum->>'verified_hours')::numeric, 0);
  v_app := coalesce((v_sum->>'app_learning_hours')::numeric, 0);
  v_end := coalesce(cs.learning_actual_end_date, cs.expected_end_date);
  v_elapsed := case when cs.start_date is not null and v_end is not null and v_end > cs.start_date
                    then least(1, greatest(0, (least(v_today, v_end) - cs.start_date)::numeric / (v_end - cs.start_date))) end;
  select * into v_stmt from otj_hours_statements h
   where h.college_student_id = cs.id and h.superseded_at is null order by h.prepared_at desc limit 1;
  return jsonb_build_object(
    'planned_hours', v_planned,
    'planned_source', v_src,
    'verified_hours', round(v_verified, 1),
    'employer_attested_hours', (v_sum->>'employer_attested_hours')::numeric,
    'college_verified_hours', (v_sum->>'college_verified_hours')::numeric,
    'app_tracked_hours', round(v_app, 1),
    'shortfall_hours', case when v_planned is not null then greatest(0, round(v_planned - v_verified, 1)) end,
    'end_date', v_end,
    'ended', cs.learning_actual_end_date is not null or lower(coalesce(cs.status, '')) in ('completed', 'withdrawn')
             or (cs.expected_end_date is not null and cs.expected_end_date < v_today),
    'statement_due_by', case when v_end is not null then v_end + 84 end,
    'elapsed_pct', case when v_elapsed is not null then round(v_elapsed * 100) end,
    'planned_by_now', case when v_planned is not null and v_elapsed is not null then round(v_planned * v_elapsed, 1) end,
    'warn_80', v_elapsed is not null and v_elapsed >= 0.8 and v_planned is not null and v_verified < v_planned * v_elapsed,
    'statement_needed', v_planned is not null and v_verified < v_planned,
    'statement', case when v_stmt.id is not null then jsonb_build_object(
                   'id', v_stmt.id, 'prepared_at', v_stmt.prepared_at,
                   'learner_signed_at', v_stmt.learner_signed_at, 'employer_signed_at', v_stmt.employer_signed_at) end);
end;
$$;
revoke all on function public._hours_statement_basis(uuid) from public, anon, authenticated;

create or replace function public.get_hours_statement_basis(p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare v_student uuid;
begin
  if auth.uid() is null or not public._otj_staff_can_act(p_user) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select s.id into v_student from college_students s where s.user_id = p_user
   order by (lower(coalesce(s.status, '')) in ('withdrawn', 'completed', 'archived')), s.created_at desc limit 1;
  return public._hours_statement_basis(v_student);
end;
$$;
revoke all on function public.get_hours_statement_basis(uuid) from public, anon;
grant execute on function public.get_hours_statement_basis(uuid) to authenticated;
