-- ELE-2087 ILR 2026/27 XML return. ADDITIVE ONLY.
--
-- The college-ilr-return edge function builds an ILR 2026/27 XML file for a
-- college and a return period (R01 to R14), checks it against the published
-- 2026/27 XSD and a stated subset of the published validation rules (v4), and
-- lists what to fix per learner. Sources, versions and the rule list:
--   supabase/functions/_shared/ilr/2627/README.md
--
-- 1. college_student_ilr: six columns the XML needs that the flat export did
--    not hold (LearnerEmploymentStatus.DateEmpStatApp, the EII and LOE
--    employment status monitoring codes, PriorAttain.DateLevelApp, the LLDD
--    and health problem categories and the primary one).
-- 2. save_learner_ilr_return(): writes those six, learners.edit, like
--    save_learner_ilr() (which is untouched).
-- 3. college_ilr_return_rows(): everything the XML needs for one college, in
--    one read, capability 'exports', logged in college_data_access_log.
--
-- HRS3 (actual off-the-job hours) is verified hours only: entries verified by
-- the college or attested by the employer. Learning measured in the app is
-- never folded in (ELE-2037 is undecided). Same rule as _college_interchange.

-- 1 ───────────────────────────────────────────────────────────────────────
alter table public.college_student_ilr
  add column if not exists date_emp_stat_app date,
  add column if not exists esm_eii smallint,
  add column if not exists esm_loe smallint,
  add column if not exists prior_level_date date,
  add column if not exists lldd_cats smallint[],
  add column if not exists primary_lldd smallint;

do $$ begin
  alter table public.college_student_ilr add constraint college_student_ilr_esm_codes
    check ((esm_eii is null or esm_eii between 1 and 99) and (esm_loe is null or esm_loe between 1 and 99));
exception when duplicate_object then null; end $$;
do $$ begin
  -- LLDDCat codes, ILR 2026/27 specification (15 was valid to 31 Jul 2025).
  alter table public.college_student_ilr add constraint college_student_ilr_lldd_codes
    check ((lldd_cats is null or (cardinality(lldd_cats) between 1 and 22
             and lldd_cats <@ array[4,5,6,7,8,9,10,11,12,13,14,16,17,18,93,94,95,96,97,98,99]::smallint[]))
           and (primary_lldd is null or (lldd_cats is not null and primary_lldd = any(lldd_cats))));
exception when duplicate_object then null; end $$;

comment on column public.college_student_ilr.date_emp_stat_app is
  'ILR LearnerEmploymentStatus.DateEmpStatApp: the date the employment status was confirmed to apply, before the learning start date. When null the XML uses the day before LearnStartDate and the return check says so.';
comment on column public.college_student_ilr.esm_eii is
  'ILR EmploymentStatusMonitoring ESMType EII (employment intensity) code, as held in the college MIS. Needed for EmpStat 10 (rule ESMType_02).';
comment on column public.college_student_ilr.esm_loe is
  'ILR EmploymentStatusMonitoring ESMType LOE (length of employment) code, as held in the college MIS. Needed for employed apprentices (rule ESMType_09).';
comment on column public.college_student_ilr.prior_level_date is
  'ILR PriorAttain.DateLevelApp. When null the XML uses LearnStartDate (on or before the earliest start, rule R_131) and the return check says so.';
comment on column public.college_student_ilr.lldd_cats is
  'ILR LLDDandHealthProblem.LLDDCat codes (2026/27 list). Needed when LLDDHealthProb = 1 for learners under 25 (rule LLDDHealthProb_06).';
comment on column public.college_student_ilr.primary_lldd is
  'ILR LLDDandHealthProblem.PrimaryLLDD: which of lldd_cats is primary (rule PrimaryLLDD_04).';

-- 2 ───────────────────────────────────────────────────────────────────────
create or replace function public.save_learner_ilr_return(p_student uuid, p_fields jsonb)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  v_college uuid;
  f jsonb := coalesce(p_fields, '{}'::jsonb);
  v_cats smallint[];
begin
  select college_id into v_college from public.college_students where id = p_student;
  if v_college is null or not public.college_can('learners.edit', v_college) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;

  if f ? 'lldd_cats' then
    -- '' or [] clears; otherwise a JSON array or a comma-separated string of codes.
    if jsonb_typeof(f->'lldd_cats') = 'array' then
      select array_agg(distinct (v)::smallint order by (v)::smallint) into v_cats
        from jsonb_array_elements_text(f->'lldd_cats') v where trim(v) <> '';
    else
      select array_agg(distinct trim(v)::smallint order by trim(v)::smallint) into v_cats
        from unnest(string_to_array(coalesce(f->>'lldd_cats', ''), ',')) v where trim(v) <> '';
    end if;
  end if;

  insert into public.college_student_ilr (student_id, college_id) values (p_student, v_college)
  on conflict (student_id) do nothing;

  update public.college_student_ilr set
    date_emp_stat_app = case when f ? 'date_emp_stat_app' then nullif(f->>'date_emp_stat_app', '')::date else date_emp_stat_app end,
    esm_eii = case when f ? 'esm_eii' then nullif(f->>'esm_eii', '')::smallint else esm_eii end,
    esm_loe = case when f ? 'esm_loe' then nullif(f->>'esm_loe', '')::smallint else esm_loe end,
    prior_level_date = case when f ? 'prior_level_date' then nullif(f->>'prior_level_date', '')::date else prior_level_date end,
    lldd_cats = case when f ? 'lldd_cats' then v_cats else lldd_cats end,
    primary_lldd = case when f ? 'primary_lldd' then nullif(f->>'primary_lldd', '')::smallint else primary_lldd end,
    updated_by = auth.uid(),
    updated_at = now()
  where student_id = p_student;
end;
$$;
revoke all on function public.save_learner_ilr_return(uuid, jsonb) from public, anon;
grant execute on function public.save_learner_ilr_return(uuid, jsonb) to authenticated;

-- 3 ───────────────────────────────────────────────────────────────────────
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
               where i.student_id = cs.id)) as r
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
revoke all on function public.college_ilr_return_rows(uuid, text, uuid[]) from public, anon;
grant execute on function public.college_ilr_return_rows(uuid, text, uuid[]) to authenticated;
