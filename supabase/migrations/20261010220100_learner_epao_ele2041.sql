-- ELE-2041 — the end-point assessment organisation chosen on time.
--
-- 2026/27 funding rules (v3), verified against the PDF:
--   143    "at least 6 months before the apprentice reaches gateway, the main
--           provider ... must: 143.1 Select an organisation to deliver the
--           end-point assessment; 143.2 Negotiate a price with the EPAO."
--   100.2.1 "If the end-point assessment organisation is not known at the start
--           of the apprenticeship, the training plan must be updated as soon as
--           this information becomes available. This must be no later than 6
--           months before the learning planned end date (see paragraph 143)."
--   145.1  "the provider must record the selected EPAO in the Individualised
--           Learner Record (ILR) for every apprentice."
--   382    (revised assessment plans) "The provider must engage an assessment
--           organisation (AO) at the start of the apprenticeship".
-- 2025/26 equivalents: 115, 96.2.1, 117.1, 346.
--
-- Due date: revised assessment plan -> the start date; otherwise 6 months
-- before the planned end date (the latest the plan may name the EPAO, 100.2.1,
-- and the gateway proxy used across the hub).
-- Which plan: what the college records; if nothing is recorded, ST0152 starts
-- on or after 17 Dec 2026 are taken as the revised plan (Skills England lists
-- the revised ST0152 plan with that earliest start; src/lib/epa/facts.ts).

create table if not exists public.college_learner_epao (
  student_id uuid primary key references public.college_students(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  epao_name text not null check (length(trim(epao_name)) between 2 and 200),
  epao_org_id text check (epao_org_id is null or epao_org_id ~ '^[A-Za-z0-9]{1,8}$'),
  assessment_plan text check (assessment_plan is null or assessment_plan in ('current', 'revised')),
  chosen_on date not null,
  price numeric check (price is null or price >= 0),
  agreement_signed_on date,
  notes text,
  recorded_by uuid references auth.users(id) on delete set null,
  recorded_by_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.college_learner_epao is
  '[COLLEGE] The end-point assessment organisation chosen for a learner, when, at what price, and which assessment plan applies (ELE-2041; funding rules 2026/27 paras 143, 145.1, 100.2.1, 382). Scope: one row per college_students row. Used by: Student 360 EPA organisation card, training plan parties, evidence pack (epao_on_time), college inbox deadlines. Rule: written only via set_learner_epao(), which also writes EPAOrgID to college_student_ilr.';

alter table public.college_learner_epao enable row level security;
drop policy if exists "college_learner_epao: college staff read" on public.college_learner_epao;
create policy "college_learner_epao: college staff read"
  on public.college_learner_epao for select to authenticated
  using (public._review_staff_can(college_id));
revoke all on public.college_learner_epao from anon;
revoke insert, update, delete on public.college_learner_epao from authenticated;
grant select on public.college_learner_epao to authenticated;

-- When the EPAO is due, and whether it was chosen on time.
create or replace function public._epao_due(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  s college_students;
  e college_learner_epao;
  v_today date := public._lon(now());
  v_code text;
  v_std text;
  v_plan text;
  v_plan_src text;
  v_due date;
  v_status text;
  v_year text;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then return null; end if;
  select * into e from college_learner_epao where student_id = p_student;
  v_year := public._funding_year_for(s.start_date);

  select coalesce(nullif(cc.programme_code, ''), cc.code) into v_code
    from college_courses cc
   where cc.id = coalesce(s.course_id, (select c.course_id from college_cohorts c where c.id = s.cohort_id));
  select g.standard_code into v_std from public._gateway_standard(v_code) g;

  if e.assessment_plan is not null then
    v_plan := e.assessment_plan; v_plan_src := 'recorded';
  elsif v_std = 'ST0152' and s.start_date >= date '2026-12-17' then
    v_plan := 'revised'; v_plan_src := 'derived';
  else
    v_plan := 'current'; v_plan_src := 'derived';
  end if;

  v_due := case when v_plan = 'revised' then s.start_date
                when s.expected_end_date is not null then (s.expected_end_date - interval '6 months')::date end;

  v_status := case
    when e.student_id is not null and (v_due is null or e.chosen_on <= v_due) then 'ok'
    when e.student_id is not null then 'ok_late'
    when v_due is null then 'unknown'
    when v_due < v_today then 'overdue'
    when v_due <= v_today + 60 then 'due_soon'
    else 'not_yet_due' end;

  return jsonb_build_object(
    'due_date', v_due,
    'basis', case when v_plan = 'revised' then 'revised_start' when v_due is null then 'no_end_date' else 'six_months_before_end' end,
    'assessment_plan', v_plan,
    'assessment_plan_source', v_plan_src,
    'standard_code', v_std,
    'rules_year', v_year,
    'para', (public._fr_ref(case when v_plan = 'revised' then 'epao_on_time_revised' else 'epao_on_time' end, v_year))->>'para',
    'para_verified', ((public._fr_ref(case when v_plan = 'revised' then 'epao_on_time_revised' else 'epao_on_time' end, v_year))->>'verified')::boolean,
    'chosen', e.student_id is not null,
    'chosen_on', e.chosen_on,
    'status', v_status,
    'days_left', case when v_due is not null then v_due - v_today end);
end;
$$;
revoke all on function public._epao_due(uuid) from public, anon, authenticated;

create or replace function public.get_learner_epao(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare v_college uuid;
begin
  select college_id into v_college from college_students where id = p_student;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'record', (select to_jsonb(e) from college_learner_epao e where e.student_id = p_student),
    'due', public._epao_due(p_student));
end;
$$;
revoke all on function public.get_learner_epao(uuid) from public, anon;
grant execute on function public.get_learner_epao(uuid) to authenticated;

create or replace function public.set_learner_epao(
  p_student uuid, p_name text, p_org_id text, p_plan text, p_chosen_on date,
  p_price numeric default null, p_agreement_signed_on date default null, p_notes text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  v_name text;
  v_org text := upper(nullif(regexp_replace(coalesce(p_org_id, ''), '\s', '', 'g'), ''));
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if coalesce(length(trim(p_name)), 0) < 2 then
    raise exception 'name the end-point assessment organisation' using errcode = '22023';
  end if;
  if v_org is not null and v_org !~ '^[A-Z0-9]{1,8}$' then
    raise exception 'the EPAO ID is up to 8 letters and numbers, for example EPA0001' using errcode = '22023';
  end if;
  if p_chosen_on is null or p_chosen_on > public._lon(now()) then
    raise exception 'give the date the organisation was chosen (not in the future)' using errcode = '22023';
  end if;
  if p_plan is not null and p_plan not in ('current', 'revised') then
    raise exception 'assessment plan must be current or revised' using errcode = '22023';
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Staff') into v_name from profiles where id = auth.uid();

  insert into college_learner_epao as x (student_id, college_id, epao_name, epao_org_id, assessment_plan, chosen_on,
                                         price, agreement_signed_on, notes, recorded_by, recorded_by_name)
  values (p_student, s.college_id, trim(p_name), v_org, p_plan, p_chosen_on, p_price, p_agreement_signed_on,
          nullif(trim(coalesce(p_notes, '')), ''), auth.uid(), v_name)
  on conflict (student_id) do update
     set epao_name = excluded.epao_name, epao_org_id = excluded.epao_org_id,
         assessment_plan = excluded.assessment_plan, chosen_on = excluded.chosen_on,
         price = excluded.price, agreement_signed_on = excluded.agreement_signed_on,
         notes = excluded.notes, recorded_by = excluded.recorded_by,
         recorded_by_name = excluded.recorded_by_name, updated_at = now();

  -- 145.1: the selected EPAO goes on the ILR.
  if v_org is not null then
    insert into college_student_ilr (student_id, college_id, epa_org_id, updated_by, updated_at)
    values (p_student, s.college_id, v_org, auth.uid(), now())
    on conflict (student_id) do update set epa_org_id = excluded.epa_org_id, updated_by = auth.uid(), updated_at = now();
  end if;

  return jsonb_build_object('ok', true, 'due', public._epao_due(p_student));
end;
$$;
revoke all on function public.set_learner_epao(uuid, text, text, text, date, numeric, date, text) from public, anon;
grant execute on function public.set_learner_epao(uuid, text, text, text, date, numeric, date, text) to authenticated;
