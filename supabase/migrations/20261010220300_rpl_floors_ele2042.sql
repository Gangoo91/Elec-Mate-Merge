-- ELE-2042 — prior learning: KSB skills scan, the 187-hour and 8-month floors,
-- and the price reduction, enforced where the decision is recorded.
--
-- 2026/27 funding rules (v3), verified against the PDF:
--   38.2   "Conduct a skills scan against the knowledge, skills and behaviours
--           requirements of the proposed apprenticeship standard ..."
--   39     summarise the impact, including whether and by how much content and
--           price have been reduced; 39.1 shown as off-the-job hours, and "The
--           reduction in hours must translate to a reduction in price."
--   39.3.1 prior learning % = prior-learning hours / the provider's own planned
--           hours for a learner with no prior learning;
--   39.3.2 "Reduce the total price by at least 50% of the prior learning
--           percentage, from the funding band maximum";
--   39.3.4 the final price is split over TNP1 and TNP2 in the ILR;
--   86.2   "No programme must fall below 187 hours of evidenced delivery."
--   77     the practical period lasts at least 8 months after prior learning.
-- 2025/26: 33.2, 35, 35.1.1 ("less than 8 months or 187 hours ... ineligible"),
--   35.2, 81.2, 73. 2024/25: 26.2, 28, 28.1.1 (less than 12 months remaining),
--   28.2, 75 — no 187-hour floor that year.
-- ILR 2026/27 HRSRecord HRS4 = planned hours reduced for prior learning.

alter table public.college_learner_starting_points
  add column if not exists ksb_scan jsonb,
  add column if not exists ksb_scan_on date,
  add column if not exists ksb_scan_by uuid references auth.users(id) on delete set null,
  add column if not exists funding_band_max numeric check (funding_band_max is null or funding_band_max > 0),
  add column if not exists rpl_percent numeric,
  add column if not exists price_reduction_min numeric,
  add column if not exists max_price numeric,
  add column if not exists agreed_price numeric check (agreed_price is null or agreed_price >= 0),
  add column if not exists price_recorded_by uuid references auth.users(id) on delete set null,
  add column if not exists price_recorded_at timestamptz;

comment on column public.college_learner_starting_points.ksb_scan is
  '[COLLEGE] ELE-2042. The skills scan against the standard''s KSBs (funding rules 2026/27 para 38.2): [{code, kind K/S/B, title, level none|partial|full, evidence, hours_credit}].';
comment on column public.college_learner_starting_points.agreed_price is
  '[COLLEGE] ELE-2042. Total price (TNP1 + TNP2) agreed after the prior-learning reduction; never above max_price (para 39.3.2).';

-- The KSBs to scan against: the learner's course qualification.
create or replace function public.get_ksb_scan_template(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare s college_students; v_qual uuid;
begin
  select * into s from college_students where id = p_student;
  if s.id is null or not public._review_staff_can(s.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select cc.qualification_id into v_qual from college_courses cc
   where cc.id = coalesce(s.course_id, (select c.course_id from college_cohorts c where c.id = s.cohort_id));
  return jsonb_build_object(
    'qualification', (select jsonb_build_object('code', q.code, 'title', q.title) from qualifications q where q.id = v_qual),
    'ksbs', coalesce((select jsonb_agg(jsonb_build_object(
                         'code', k.ksb_code,
                         'kind', case k.ksb_type when 'knowledge' then 'K' when 'skill' then 'S' when 'behaviour' then 'B' else upper(left(k.ksb_type, 1)) end,
                         'title', k.title)
                       order by case k.ksb_type when 'knowledge' then 1 when 'skill' then 2 else 3 end, k.sort_order, k.ksb_code)
                       from apprenticeship_ksbs k where k.qualification_id = v_qual), '[]'::jsonb),
    'scan', (select sp.ksb_scan from college_learner_starting_points sp where sp.student_id = p_student),
    'scan_on', (select sp.ksb_scan_on from college_learner_starting_points sp where sp.student_id = p_student));
end;
$$;
revoke all on function public.get_ksb_scan_template(uuid) from public, anon;
grant execute on function public.get_ksb_scan_template(uuid) to authenticated;

create or replace function public.save_ksb_skills_scan(p_student uuid, p_scan jsonb, p_assessed_on date)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  v_bad int;
  v_hours numeric;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if p_scan is null or jsonb_typeof(p_scan) <> 'array' or jsonb_array_length(p_scan) = 0 then
    raise exception 'rate at least one knowledge, skill or behaviour' using errcode = '22023';
  end if;
  select count(*) into v_bad from jsonb_array_elements(p_scan) x
   where coalesce(trim(x->>'code'), '') = '' or coalesce(x->>'level', '') not in ('none', 'partial', 'full')
      or ((x->>'level') in ('partial', 'full') and coalesce(trim(x->>'evidence'), '') = '');
  if v_bad > 0 then
    raise exception 'every row needs a rating, and any prior learning needs the evidence seen' using errcode = '22023';
  end if;
  if p_assessed_on is null or p_assessed_on > public._lon(now()) then
    raise exception 'give the date of the skills scan (not in the future)' using errcode = '22023';
  end if;
  select coalesce(sum(greatest(coalesce((x->>'hours_credit')::numeric, 0), 0)), 0) into v_hours
    from jsonb_array_elements(p_scan) x where x->>'level' in ('partial', 'full');

  insert into college_learner_starting_points as sp (student_id, college_id, ksb_scan, ksb_scan_on, ksb_scan_by, updated_at)
  values (p_student, s.college_id, p_scan, p_assessed_on, auth.uid(), now())
  on conflict (student_id) do update
     set ksb_scan = excluded.ksb_scan, ksb_scan_on = excluded.ksb_scan_on, ksb_scan_by = excluded.ksb_scan_by, updated_at = now();
  return jsonb_build_object('ok', true, 'suggested_hours', v_hours,
                            'with_prior_learning', (select count(*) from jsonb_array_elements(p_scan) x where x->>'level' in ('partial', 'full')));
end;
$$;
revoke all on function public.save_ksb_skills_scan(uuid, jsonb, date) from public, anon;
grant execute on function public.save_ksb_skills_scan(uuid, jsonb, date) to authenticated;

-- The decision. Identical to the live function apart from: the skills scan is
-- required before a reduction, the floors are enforced by the learner's
-- start-year rules, HRS4 is written to the ILR fields, and a recorded price is
-- recalculated.
create or replace function public.record_rpl_decision(p_student uuid, p_hours_reduced numeric, p_reason text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s public.college_students%rowtype;
  v_course_hours numeric;
  v_prev public.college_learner_starting_points%rowtype;
  v_base numeric;
  v_new numeric;
  v_reduce numeric := greatest(coalesce(p_hours_reduced, 0), 0);
  v_year text;
  v_min_months int;
  v_pct numeric;
begin
  select * into s from public.college_students where id = p_student;
  if s.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if v_reduce > 0 and coalesce(trim(p_reason), '') = '' then
    raise exception 'say what prior learning justifies the reduction' using errcode = '22023';
  end if;

  select * into v_prev from public.college_learner_starting_points where student_id = p_student;
  select cc.otj_required_hours into v_course_hours
    from public.college_courses cc
   where cc.id = coalesce(s.course_id, (select c.course_id from public.college_cohorts c where c.id = s.cohort_id))
     and cc.otj_required_hours > 0;
  -- The base is fixed at the first decision so repeated edits never compound.
  v_base := coalesce(v_prev.rpl_base_hours, v_course_hours, s.otj_required_hours);
  if v_base is null or v_base <= 0 then
    raise exception 'set an off-the-job hours target on the course first' using errcode = '22023';
  end if;
  if v_reduce >= v_base then
    raise exception 'the reduction must be less than the % hour target', round(v_base) using errcode = '22023';
  end if;
  v_new := v_base - v_reduce;

  -- ELE-2042: the rules of the learner's start year.
  v_year := public._funding_year_for(s.start_date);
  if v_reduce > 0 then
    if v_prev.ksb_scan is null or jsonb_array_length(v_prev.ksb_scan) = 0 then
      raise exception 'record the skills scan against the knowledge, skills and behaviours first (funding rules %)',
        case v_year when '2024/25' then 'para 26.2' when '2025/26' then 'para 33.2' else 'para 38.2' end
        using errcode = '22023';
    end if;
    if v_year in ('2025/26', '2026/27') and v_new < 187 then
      raise exception 'this leaves % planned hours. No programme may fall below 187 hours of evidenced delivery (funding rules %), so the most you can take off is % hours',
        round(v_new), case v_year when '2025/26' then 'para 81.2' else 'para 86.2' end, greatest(0, floor(v_base - 187))
        using errcode = '22023';
    end if;
    v_min_months := case when v_year = '2024/25' or s.start_date < date '2024-08-01' then 12 else 8 end;
    if s.start_date is not null and s.expected_end_date is not null
       and s.expected_end_date < (s.start_date + make_interval(months => v_min_months))::date then
      raise exception 'the practical period (% to %) is shorter than the %-month minimum once prior learning is taken off (funding rules %). Extend the planned end date or reduce less',
        to_char(s.start_date, 'DD Mon YYYY'), to_char(s.expected_end_date, 'DD Mon YYYY'), v_min_months,
        case v_year when '2024/25' then 'para 75' when '2025/26' then 'para 73' else 'para 77' end
        using errcode = '22023';
    end if;
  end if;

  update public.college_students
     set otj_required_hours = case when v_reduce > 0 then v_new
                                   when v_course_hours is not null then null
                                   else v_base end
   where id = p_student;

  insert into public.college_learner_starting_points as sp
    (student_id, college_id, rpl_decision, rpl_hours_reduced, rpl_base_hours, rpl_reason,
     rpl_decided_by, rpl_decided_at, updated_at)
  values (p_student, s.college_id, case when v_reduce > 0 then 'reduced' else 'none' end, v_reduce, v_base,
          nullif(trim(p_reason), ''), auth.uid(), now(), now())
  on conflict (student_id) do update
     set rpl_decision = excluded.rpl_decision,
         rpl_hours_reduced = excluded.rpl_hours_reduced,
         rpl_base_hours = excluded.rpl_base_hours,
         rpl_reason = excluded.rpl_reason,
         rpl_decided_by = excluded.rpl_decided_by,
         rpl_decided_at = excluded.rpl_decided_at,
         updated_at = now();

  -- ELE-2042: a recorded price follows the new percentage (39.3).
  v_pct := round(v_reduce / v_base * 100, 2);
  update public.college_learner_starting_points
     set rpl_percent = v_pct,
         price_reduction_min = case when funding_band_max is not null then round(funding_band_max * v_pct / 100 * 0.5, 2) end,
         max_price = case when funding_band_max is not null then round(funding_band_max - funding_band_max * v_pct / 100 * 0.5, 2) end
   where student_id = p_student;

  -- ELE-2042: HRS4 on the ILR export.
  insert into public.college_student_ilr (student_id, college_id, hrs_planned_reduction, updated_by, updated_at)
  values (p_student, s.college_id, round(v_reduce)::int, auth.uid(), now())
  on conflict (student_id) do update
     set hrs_planned_reduction = excluded.hrs_planned_reduction, updated_by = auth.uid(), updated_at = now();

  return jsonb_build_object('ok', true, 'base_hours', v_base, 'hours_reduced', v_reduce, 'required_hours', v_new,
                            'rules_year', v_year, 'rpl_percent', v_pct);
end; $function$;

-- The price reduction (39.3): at least half the prior-learning percentage off
-- the funding band maximum.
create or replace function public.record_rpl_price(p_student uuid, p_funding_band_max numeric, p_agreed_price numeric)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  sp college_learner_starting_points;
  v_pct numeric;
  v_min numeric;
  v_max numeric;
  v_year text;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  select * into sp from college_learner_starting_points where student_id = p_student;
  if sp.rpl_decision is null then
    raise exception 'record the prior learning decision first' using errcode = '22023';
  end if;
  if coalesce(p_funding_band_max, 0) <= 0 then
    raise exception 'enter the funding band maximum for the standard' using errcode = '22023';
  end if;
  if p_agreed_price is null or p_agreed_price < 0 then
    raise exception 'enter the total price agreed with the employer' using errcode = '22023';
  end if;
  v_year := public._funding_year_for(s.start_date);
  v_pct := case when coalesce(sp.rpl_base_hours, 0) > 0 then round(coalesce(sp.rpl_hours_reduced, 0) / sp.rpl_base_hours * 100, 2) else 0 end;
  v_min := round(p_funding_band_max * v_pct / 100 * 0.5, 2);
  v_max := round(p_funding_band_max - v_min, 2);
  if p_agreed_price > v_max then
    raise exception 'with % per cent prior learning the price must come down by at least £% (half of that percentage of the £% band maximum), so the most that can be agreed is £% (funding rules %)',
      v_pct, to_char(v_min, 'FM999G999D00'), to_char(p_funding_band_max, 'FM999G999'), to_char(v_max, 'FM999G999D00'),
      case v_year when '2024/25' then 'para 28.2' when '2025/26' then 'para 35.2' else 'para 39.3' end
      using errcode = '22023';
  end if;
  update college_learner_starting_points
     set funding_band_max = p_funding_band_max, rpl_percent = v_pct, price_reduction_min = v_min, max_price = v_max,
         agreed_price = p_agreed_price, price_recorded_by = auth.uid(), price_recorded_at = now(), updated_at = now()
   where student_id = p_student;
  return jsonb_build_object('ok', true, 'rpl_percent', v_pct, 'price_reduction_min', v_min, 'max_price', v_max,
                            'agreed_price', p_agreed_price);
end;
$$;
revoke all on function public.record_rpl_price(uuid, numeric, numeric) from public, anon;
grant execute on function public.record_rpl_price(uuid, numeric, numeric) to authenticated;
