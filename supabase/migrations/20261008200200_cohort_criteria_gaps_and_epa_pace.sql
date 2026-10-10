-- Criteria gaps by cohort + EPA pace (College Hub, 8 Oct 2026). Additive only.
--
-- get_cohort_criteria_gaps(p_cohort)  one cohort, or (null) every cohort the
--   caller tutors. For each learner it reads get_portfolio_ac_state (the one
--   source of truth for a criterion's state) and aggregates, per criterion of
--   each qualification in the cohort, how many learners are:
--     passed         passed, iqa_confirmed
--     with_assessor  submitted, iqa_rejected (an IQA queried the pass)
--     sent_back      referred, not_yet
--     claimed        claimed (tagged by the learner, not yet sent)
--     nothing        not_started, suggested (only an AI suggestion)
--   It also returns each learner's raw state per criterion, in learner order,
--   for the "who" drill-down.
--
-- get_college_epa_pace(p_college)  for every active learner at the college:
--   elapsed share of start_date -> expected_end_date against the share of
--   their qualification's criteria passed (passed or iqa_confirmed). On pace
--   when passed share >= elapsed share - 10 percentage points.
--
-- Permissions: a learner is only read when the caller has
-- college_can('learners.view_all') or college_can('learners.view_mine') for
-- that learner, AND get_portfolio_ac_state itself allows it (a learner it
-- refuses is counted in "hidden", never read).

create or replace function public.get_cohort_criteria_gaps(p_cohort uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_cohorts uuid[];
  l record;
  v_states jsonb;
  v_q text;
  v_learners jsonb := '[]'::jsonb;
  v_hidden int := 0;
  v_no_qual int := 0;
  v_out jsonb;
begin
  if v_uid is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  if p_cohort is not null then
    if not exists (
      select 1 from public.college_cohorts c
       where c.id = p_cohort
         and (public.college_can('learners.view_all', c.college_id)
              or public.college_can('learners.view_mine', c.college_id))
    ) then
      raise exception 'not allowed' using errcode = '42501';
    end if;
    v_cohorts := array[p_cohort];
  else
    select coalesce(array_agg(c.id order by c.name), '{}'::uuid[]) into v_cohorts
      from public.college_cohorts c
      join public.college_staff st on st.id = c.tutor_id
     where st.user_id = v_uid
       and st.archived_at is null
       and lower(coalesce(c.status, 'active')) not in ('archived', 'completed', 'closed');
  end if;

  if coalesce(array_length(v_cohorts, 1), 0) > 50 then
    raise exception 'too many cohorts (50 at most)' using errcode = '22023';
  end if;

  for l in
    select cs.id roll_id, cs.user_id, cs.name, cs.cohort_id, cs.college_id
      from public.college_students cs
     where cs.cohort_id = any (v_cohorts)
       and cs.user_id is not null
       and lower(coalesce(cs.status, 'active')) not in ('withdrawn', 'archived', 'completed')
     order by cs.name, cs.id
     limit 500
  loop
    if not (public.college_can('learners.view_all', l.college_id, l.roll_id)
            or public.college_can('learners.view_mine', l.college_id, l.roll_id)) then
      v_hidden := v_hidden + 1;
      continue;
    end if;
    begin
      select max(x.qualification_code),
             coalesce(jsonb_object_agg(x.unit_code || '|' || x.ac_code, x.state)
                        filter (where x.state <> 'not_started'), '{}'::jsonb)
        into v_q, v_states
        from public.get_portfolio_ac_state(l.user_id) x;
    exception when others then
      v_hidden := v_hidden + 1;
      continue;
    end;
    if v_q is null then
      v_no_qual := v_no_qual + 1;
      continue;
    end if;
    v_learners := v_learners || jsonb_build_array(jsonb_build_object(
      'user_id', l.user_id, 'roll_id', l.roll_id, 'name', l.name,
      'cohort_id', l.cohort_id, 'q', v_q, 's', v_states));
  end loop;

  with lr as (
    select e.value v, e.ordinality i from jsonb_array_elements(v_learners) with ordinality e
  ),
  qs as (
    select distinct lr.v ->> 'q' code from lr
  ),
  crit as (
    select qr.qualification_code q, qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text,
           qr.ac_code, qr.ac_text,
           array_agg(coalesce(lr.v -> 's' ->> (qr.unit_code || '|' || qr.ac_code), 'not_started')
                     order by lr.i) states
      from public.qualification_requirements qr
      join qs on qs.code = qr.qualification_code
      join lr on lr.v ->> 'q' = qr.qualification_code
     group by qr.qualification_code, qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text,
              qr.ac_code, qr.ac_text
  ),
  counted as (
    select crit.*,
      (select count(*) from unnest(crit.states) s where s in ('passed', 'iqa_confirmed')) n_passed,
      (select count(*) from unnest(crit.states) s where s in ('submitted', 'iqa_rejected')) n_with_assessor,
      (select count(*) from unnest(crit.states) s where s in ('referred', 'not_yet')) n_sent_back,
      (select count(*) from unnest(crit.states) s where s = 'claimed') n_claimed,
      (select count(*) from unnest(crit.states) s where s in ('not_started', 'suggested')) n_nothing
    from crit
  ),
  units as (
    select q, unit_code, max(unit_title) unit_title,
      jsonb_agg(jsonb_build_object(
        'ac_code', ac_code, 'ac_text', ac_text, 'lo_number', lo_number, 'lo_text', lo_text,
        'passed', n_passed, 'with_assessor', n_with_assessor, 'sent_back', n_sent_back,
        'claimed', n_claimed, 'nothing', n_nothing, 'states', to_jsonb(states)
      ) order by lo_number, ac_code) criteria
    from counted
    group by q, unit_code
  ),
  quals as (
    select u.q,
      jsonb_agg(jsonb_build_object('unit_code', u.unit_code, 'unit_title', u.unit_title,
                                   'criteria', u.criteria) order by u.unit_code) units
    from units u group by u.q
  )
  select jsonb_build_object(
    'cohorts', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'college_id', c.college_id)
                       order by c.name)
        from public.college_cohorts c where c.id = any (v_cohorts)), '[]'::jsonb),
    'hidden', v_hidden,
    'no_qualification', v_no_qual,
    'qualifications', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', quals.q,
        'title', (select qq.title from public.qualifications qq where qq.code = quals.q
                   order by qq.title limit 1),
        'learners', (select coalesce(jsonb_agg(jsonb_build_object(
                        'user_id', lr.v ->> 'user_id', 'roll_id', lr.v ->> 'roll_id',
                        'name', lr.v ->> 'name', 'cohort_id', lr.v ->> 'cohort_id') order by lr.i),
                        '[]'::jsonb)
                       from lr where lr.v ->> 'q' = quals.q),
        'units', quals.units) order by quals.q)
      from quals), '[]'::jsonb)
  ) into v_out;

  return v_out;
end;
$function$;

revoke all on function public.get_cohort_criteria_gaps(uuid) from public, anon;
grant execute on function public.get_cohort_criteria_gaps(uuid) to authenticated;

create or replace function public.get_college_epa_pace(p_college uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_college uuid := p_college;
  v_tol numeric := 0.10;
  l record;
  v_total int;
  v_passed int;
  v_elapsed numeric;
  v_share numeric;
  v_rows jsonb := '[]'::jsonb;
  v_on int := 0;
  v_measured int := 0;
  v_unmeasured int := 0;
  v_hidden int := 0;
begin
  if v_uid is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if v_college is null then
    select st.college_id into v_college
      from public.college_staff st
     where st.user_id = v_uid and st.archived_at is null
     order by (st.role in ('admin', 'head_of_department')) desc, st.created_at
     limit 1;
  end if;
  if v_college is null or not (
       public.college_can('quality.view', v_college)
       or public.college_can('learners.view_all', v_college)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  for l in
    select cs.id roll_id, cs.user_id, cs.name, cs.cohort_id, cs.start_date, cs.expected_end_date
      from public.college_students cs
     where cs.college_id = v_college
       and cs.user_id is not null
       and lower(coalesce(cs.status, 'active')) = 'active'
     order by cs.name, cs.id
     limit 2000
  loop
    if not public.college_can('learners.view_all', v_college, l.roll_id) then
      v_hidden := v_hidden + 1;
      continue;
    end if;
    if l.start_date is null or l.expected_end_date is null or l.expected_end_date <= l.start_date then
      v_unmeasured := v_unmeasured + 1;
      v_rows := v_rows || jsonb_build_array(jsonb_build_object(
        'roll_id', l.roll_id, 'user_id', l.user_id, 'name', l.name, 'cohort_id', l.cohort_id,
        'on_pace', null, 'reason', 'no_dates'));
      continue;
    end if;
    begin
      select count(*), count(*) filter (where x.state in ('passed', 'iqa_confirmed'))
        into v_total, v_passed
        from public.get_portfolio_ac_state(l.user_id) x;
    exception when others then
      v_hidden := v_hidden + 1;
      continue;
    end;
    if coalesce(v_total, 0) = 0 then
      v_unmeasured := v_unmeasured + 1;
      v_rows := v_rows || jsonb_build_array(jsonb_build_object(
        'roll_id', l.roll_id, 'user_id', l.user_id, 'name', l.name, 'cohort_id', l.cohort_id,
        'on_pace', null, 'reason', 'no_qualification'));
      continue;
    end if;
    v_elapsed := greatest(0, least(1,
      (current_date - l.start_date)::numeric / (l.expected_end_date - l.start_date)::numeric));
    v_share := v_passed::numeric / v_total::numeric;
    v_measured := v_measured + 1;
    if v_share >= v_elapsed - v_tol then
      v_on := v_on + 1;
    end if;
    v_rows := v_rows || jsonb_build_array(jsonb_build_object(
      'roll_id', l.roll_id, 'user_id', l.user_id, 'name', l.name, 'cohort_id', l.cohort_id,
      'elapsed_pct', round(v_elapsed * 100), 'passed_pct', round(v_share * 100),
      'passed', v_passed, 'total', v_total,
      'on_pace', v_share >= v_elapsed - v_tol, 'reason', null));
  end loop;

  return jsonb_build_object(
    'college_id', v_college,
    'tolerance_pct', round(v_tol * 100),
    'measured', v_measured,
    'on_pace', v_on,
    'unmeasured', v_unmeasured,
    'hidden', v_hidden,
    'learners', v_rows);
end;
$function$;

revoke all on function public.get_college_epa_pace(uuid) from public, anon;
grant execute on function public.get_college_epa_pace(uuid) to authenticated;
