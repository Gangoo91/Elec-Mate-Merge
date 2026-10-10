-- ELE-2053 / ELE-2087: the ILR XML return now knows which learners are on an
-- Apprenticeship Unit course. Before this only the CSV/API export
-- (_college_interchange) defaulted ProgType 34 and the unit's aim reference;
-- the XML builder sent a unit learner as a standard (ProgType 25) unless
-- someone had typed 34 into their ILR fields. Each row gains
-- 'unit': {aim_ref} (null when the learner is not on a unit course); the
-- builder (_shared/ilr/2627/build.ts) uses it when prog_type is not recorded.
create or replace function public.college_ilr_return_rows(
  p_college uuid, p_period text default null, p_learners uuid[] default null)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_out json; v_n int;
begin
  if auth.uid() is null or not public.college_can('exports', p_college) then
    raise exception 'you cannot read this college''s ILR fields' using errcode = '42501';
  end if;
  if p_period is not null and p_period !~ '^R(0[1-9]|1[0-4])$' then
    raise exception 'a return period is R01 to R14' using errcode = '22023';
  end if;

  select json_build_object(
    'college', (select json_build_object('id', c.id, 'name', c.name, 'ukprn', c.ukprn, 'nation', c.nation)
                  from colleges c where c.id = p_college),
    'learners', coalesce(json_agg(r order by r_sort, r_id), '[]'::json))
  into v_out
  from (
    select cs.created_at as r_sort, cs.id as r_id, json_build_object(
      'learner_id', cs.id,
      'name', cs.name,
      'uln', cs.uln,
      'date_of_birth', cs.date_of_birth,
      'ni_number', cs.ni_number,
      'start_date', cs.start_date,
      'planned_end_date', cs.expected_end_date,
      'actual_end_date', cs.learning_actual_end_date,
      'planned_otj_hours', cs.otj_required_hours,
      'verified_otj_minutes', coalesce(otj.minutes, 0),
      'rpl_funding_band_max', sp.funding_band_max,
      'rpl_agreed_price', sp.agreed_price,
      'ilr', (select to_jsonb(i) - 'college_id' - 'updated_by' - 'created_at' from college_student_ilr i
               where i.student_id = cs.id),
      -- ELE-2053: an Apprenticeship Unit learner (ILR programme type 34).
      -- Same rule as _college_student_is_unit: the learner's course, else the cohort's.
      'unit', (select json_build_object('aim_ref', cc.unit_aim_ref)
                 from college_courses cc
                where cc.course_type = 'apprenticeship_unit'
                  and cc.id = coalesce(cs.course_id,
                                       (select co.course_id from college_cohorts co where co.id = cs.cohort_id)))) as r
    from college_students cs
    left join college_learner_starting_points sp on sp.student_id = cs.id
    left join lateral (
      select sum(o.duration_minutes) as minutes from college_otj_entries o
       where cs.user_id is not null and o.student_id = cs.user_id
         and o.verification_status in ('verified', 'verified_by_employer')) otj on true
    where cs.college_id = p_college
      and (p_learners is null or cs.id = any(p_learners))
  ) x;

  v_n := json_array_length(v_out->'learners');
  insert into public.college_data_access_log (college_id, actor_id, channel, dataset, status_code, row_count, detail)
  values (p_college, auth.uid(), 'export', 'ilr', 200, v_n,
          'ilr_xml ' || coalesce(p_period, '') || case when p_learners is not null then ' selected' else '' end);
  return v_out;
end;
$$;
