-- ELE-1977: the learner's starting point on their college record.
--
-- Ofsted and the apprenticeship funding rules expect the provider to record:
--   * initial assessment (starting levels in English, maths and digital,
--     prior qualifications and experience);
--   * recognition of prior learning (RPL), which REDUCES the planned
--     off-the-job hours, with the decision recorded;
--   * English and maths progress towards the level 2 requirement (already
--     stored in college_functional_skills, which get_gateway_readiness reads;
--     the app had no screen writing it until now).
-- Support needs and adjustments already live on college_students (send_flags,
-- eal, ehcp_ref, accessibility_notes) and are edited in Student 360.
--
-- One row per learner. Written only through the two functions below, which
-- check college_can('learners.edit'). Readable by staff who can view the
-- learner and by the learner themselves.

create table if not exists public.college_learner_starting_points (
  student_id uuid primary key references public.college_students(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  -- Initial assessment
  assessed_on date,
  english_level text,
  maths_level text,
  digital_level text,
  prior_learning text,
  assessment_notes text,
  assessed_by uuid references auth.users(id),
  -- Recognition of prior learning
  rpl_decision text not null default 'not_decided' check (rpl_decision in ('not_decided', 'none', 'reduced')),
  rpl_hours_reduced numeric not null default 0 check (rpl_hours_reduced >= 0),
  rpl_base_hours numeric,
  rpl_reason text,
  rpl_decided_by uuid references auth.users(id),
  rpl_decided_at timestamptz,
  updated_at timestamptz not null default now()
);

comment on table public.college_learner_starting_points is
  '[COLLEGE] A learner''s starting point: initial assessment levels and the recognition-of-prior-learning decision (which reduces college_students.otj_required_hours). Scope: one row per college learner. Used by: Student 360 Starting point, compliance pack, learner record. Rule: written only via upsert_learner_starting_point / record_rpl_decision.';

create index if not exists college_learner_starting_points_college_idx
  on public.college_learner_starting_points (college_id);

alter table public.college_learner_starting_points enable row level security;

drop policy if exists "Staff who can view the learner read the starting point" on public.college_learner_starting_points;
create policy "Staff who can view the learner read the starting point"
  on public.college_learner_starting_points for select to authenticated
  using (
    public.college_can('learners.view_all', college_id, student_id)
    or public.college_can('learners.view_mine', college_id, student_id)
    or exists (select 1 from public.college_students s where s.id = student_id and s.user_id = auth.uid())
  );

revoke all on public.college_learner_starting_points from anon, authenticated;
grant select on public.college_learner_starting_points to authenticated;
grant all on public.college_learner_starting_points to service_role;

-- ── Initial assessment ─────────────────────────────────────────────────────
create or replace function public.upsert_learner_starting_point(
  p_student uuid,
  p_assessed_on date,
  p_english_level text,
  p_maths_level text,
  p_digital_level text,
  p_prior_learning text,
  p_notes text
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_college uuid;
begin
  select college_id into v_college from public.college_students where id = p_student;
  if v_college is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', v_college, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  insert into public.college_learner_starting_points as sp
    (student_id, college_id, assessed_on, english_level, maths_level, digital_level,
     prior_learning, assessment_notes, assessed_by, updated_at)
  values (p_student, v_college, p_assessed_on, nullif(trim(p_english_level), ''), nullif(trim(p_maths_level), ''),
          nullif(trim(p_digital_level), ''), nullif(trim(p_prior_learning), ''), nullif(trim(p_notes), ''),
          auth.uid(), now())
  on conflict (student_id) do update
     set assessed_on = excluded.assessed_on,
         english_level = excluded.english_level,
         maths_level = excluded.maths_level,
         digital_level = excluded.digital_level,
         prior_learning = excluded.prior_learning,
         assessment_notes = excluded.assessment_notes,
         assessed_by = auth.uid(),
         updated_at = now();
  return jsonb_build_object('ok', true);
end; $$;

revoke all on function public.upsert_learner_starting_point(uuid, date, text, text, text, text, text) from public, anon;
grant execute on function public.upsert_learner_starting_point(uuid, date, text, text, text, text, text) to authenticated;

-- ── Recognition of prior learning ──────────────────────────────────────────
-- Reduces the learner's required off-the-job hours from the base (the
-- course's target, or the learner's own figure if there was no course
-- target), records who decided, when and why. A reduction of 0 records
-- "no reduction" and restores the base.
create or replace function public.record_rpl_decision(
  p_student uuid,
  p_hours_reduced numeric,
  p_reason text
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  s public.college_students%rowtype;
  v_course_hours numeric;
  v_prev public.college_learner_starting_points%rowtype;
  v_base numeric;
  v_new numeric;
  v_reduce numeric := greatest(coalesce(p_hours_reduced, 0), 0);
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

  return jsonb_build_object('ok', true, 'base_hours', v_base, 'hours_reduced', v_reduce, 'required_hours', v_new);
end; $$;

revoke all on function public.record_rpl_decision(uuid, numeric, text) from public, anon;
grant execute on function public.record_rpl_decision(uuid, numeric, text) to authenticated;
