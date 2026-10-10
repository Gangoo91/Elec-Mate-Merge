-- Two-occasion counting for performance units.
--
-- City & Guilds 5357-03 handbook (v2.8, April 2026), "Assessment Types",
-- Workplace evidence logbook (p.14):
--   "Evidence that is sourced from the real working environment for
--    performance units must be naturally occurring and assessed on a minimum
--    of two occasions."
-- Restated per unit in "Evidence requirements":
--   Unit 102 (p.36) "demonstrated on two separate occasions"; "subject to
--     direct observation on at least two separate occasions in the workplace
--     by a qualified assessor ... one of the two direct observations must be a
--     physical, face to face, site visit".
--   Unit 106 (p.60) LO1-6 "demonstrated on two separate occasions".
--   Unit 113 (p.81) LO1 safe isolation and risk assessment "on two separate
--     occasions"; LO2-3 "demonstrated on two separate occasions".
-- Units 108, 109, 110 and 115 are performance units ("Assessment type
-- Portfolio of evidence") with no unit-specific restatement, so the general
-- p.14 rule applies to them.
--
-- The rule is DATA (qualification_occasion_rules), keyed by requirement code +
-- unit (+ optional criterion). A criterion with no rule needs one occasion.
--
-- An OCCASION, for one learner and one criterion, is a distinct day of work
-- behind an assessor's PASS for that criterion:
--   * every passing decision counts, current or since superseded (each new
--     decision supersedes the last, so a second pass on a new occasion
--     replaces the first one's row as "current" but both were judged),
--   * except a decision the IQA did not confirm (iqa_verdict = 'not_confirmed'),
--   * the day is the evidence item's work day: metadata.workDate, else an
--     observation's observed_at, else captured_at, else date_completed, else
--     created_at (London time); a decision with no evidence item counts on the
--     day it was decided,
--   * two items from the same day are ONE occasion.
-- Nothing here changes get_portfolio_ac_state or any "every criterion passed"
-- logic: this is a separate read.

create table if not exists public.qualification_occasion_rules (
  id uuid primary key default gen_random_uuid(),
  qualification_code text not null,
  unit_code text not null,
  ac_code text,
  min_occasions smallint not null check (min_occasions between 1 and 10),
  source_ref text not null,
  note text,
  created_at timestamptz not null default now()
);
create unique index if not exists qualification_occasion_rules_key
  on public.qualification_occasion_rules (qualification_code, unit_code, coalesce(ac_code, ''));

comment on table public.qualification_occasion_rules is
  '[COLLEGE] Minimum number of separate assessed occasions a criterion needs (awarding body rule). '
  'Scope: reference data per requirement code + unit (+ optional AC; null = whole unit). '
  'Used by: get_portfolio_ac_occasions (coverage gap grid, Student 360 AC matrix, assessor workspace, readiness). '
  'Rule: no row = 1 occasion; seeded from the awarding body handbook with source_ref; read-only to clients.';

alter table public.qualification_occasion_rules enable row level security;
drop policy if exists qualification_occasion_rules_read on public.qualification_occasion_rules;
create policy qualification_occasion_rules_read on public.qualification_occasion_rules
  for select to authenticated using (true);

-- 5357 (requirement code for C&G 5357-03). The qualification data files the
-- handbook's Unit 108 "Terminate and Connect Conductors" as unit 118, so both
-- codes are seeded (108 is inert until the data uses it).
insert into public.qualification_occasion_rules (qualification_code, unit_code, ac_code, min_occasions, source_ref, note)
values
  ('5357', '102', null, 2, 'C&G 5357-03 handbook v2.8 p.14; Unit 102 evidence requirements p.36',
   'Direct observation on at least two separate occasions by a qualified assessor; one must be a face-to-face site visit. Reflective accounts not accepted.'),
  ('5357', '106', null, 2, 'C&G 5357-03 handbook v2.8 p.14; Unit 106 evidence requirements p.60', null),
  ('5357', '108', null, 2, 'C&G 5357-03 handbook v2.8 p.14 (performance unit, general rule)', null),
  ('5357', '118', null, 2, 'C&G 5357-03 handbook v2.8 p.14 (handbook Unit 108, performance unit, general rule)', null),
  ('5357', '109', null, 2, 'C&G 5357-03 handbook v2.8 p.14 (performance unit, general rule)', null),
  ('5357', '110', null, 2, 'C&G 5357-03 handbook v2.8 p.14 (performance unit, general rule)', null),
  ('5357', '113', null, 2, 'C&G 5357-03 handbook v2.8 p.14; Unit 113 evidence requirements p.81',
   'LO1: safe isolation and risk assessment each on two separate occasions. LO2-3: two separate occasions.'),
  ('5357', '115', null, 2, 'C&G 5357-03 handbook v2.8 p.14 (performance unit, general rule)', null)
on conflict do nothing;

-- The work day an evidence item records (London date).
create or replace function public._portfolio_item_work_day(p public.portfolio_items)
returns date
language sql
stable
set search_path = public
as $$
  select coalesce(
    case when coalesce(p.metadata->>'workDate', '') ~ '^\d{4}-\d{2}-\d{2}$'
         then (p.metadata->>'workDate')::date end,
    case when coalesce(p.metadata->'observation'->>'observed_at', '') ~ '^\d{4}-\d{2}-\d{2}'
         then left(p.metadata->'observation'->>'observed_at', 10)::date end,
    (p.captured_at at time zone 'Europe/London')::date,
    (p.date_completed at time zone 'Europe/London')::date,
    (p.created_at at time zone 'Europe/London')::date
  );
$$;

-- Per criterion of the learner's qualification: occasions held vs needed.
-- Same access rule as get_portfolio_ac_state.
create or replace function public.get_portfolio_ac_occasions(p_user_id uuid default null)
returns table (
  unit_code text,
  ac_code text,
  required int,
  occasions int,
  occasion_days date[],
  item_ids uuid[],
  rule_ref text,
  rule_note text
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (
       v_user = auth.uid()
       or public._can_assess(v_user)
       or exists (select 1 from public.college_students cs
                   where cs.user_id = v_user
                     and (public.college_can('learners.view_all', cs.college_id, cs.id)
                          or public.college_can('learners.view_mine', cs.college_id, cs.id)))
     ) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, null);
  if r.requirement_code is null then return; end if;

  return query
  with passes as (
    select d.id, d.unit_code u, d.ac_code a, d.decided_at, d.evidence_item_ids
      from public.portfolio_assessment_decisions d
     where d.learner_id = v_user
       and d.qualification_code = r.requirement_code
       and d.decision = 'passed'
       and d.iqa_verdict is distinct from 'not_confirmed'
  ),
  days as (
    select p.u, p.a, i.id item_id,
           coalesce(public._portfolio_item_work_day(i),
                    (p.decided_at at time zone 'Europe/London')::date) d
      from passes p
      left join lateral unnest(
             case when coalesce(cardinality(p.evidence_item_ids), 0) = 0
                  then array[null::uuid] else p.evidence_item_ids end) e(item_id) on true
      left join public.portfolio_items i on i.id = e.item_id and i.user_id = v_user
  ),
  agg as (
    select days.u, days.a,
           count(distinct days.d)::int n,
           array_agg(distinct days.d order by days.d) ds,
           coalesce(array_agg(distinct days.item_id) filter (where days.item_id is not null), '{}') ids
      from days
     group by days.u, days.a
  )
  select qr.unit_code, qr.ac_code,
         coalesce(rac.min_occasions, ru.min_occasions, 1)::int,
         coalesce(agg.n, 0),
         coalesce(agg.ds, '{}'),
         coalesce(agg.ids, '{}'),
         coalesce(rac.source_ref, ru.source_ref),
         coalesce(rac.note, ru.note)
    from public.qualification_requirements qr
    left join public.qualification_occasion_rules rac
      on rac.qualification_code = qr.qualification_code and rac.unit_code = qr.unit_code
     and rac.ac_code = qr.ac_code
    left join public.qualification_occasion_rules ru
      on ru.qualification_code = qr.qualification_code and ru.unit_code = qr.unit_code
     and ru.ac_code is null
    left join agg on agg.u = qr.unit_code and agg.a = qr.ac_code
   where qr.qualification_code = r.requirement_code
   order by qr.unit_code, qr.lo_number, qr.ac_code;
end;
$$;

revoke all on function public.get_portfolio_ac_occasions(uuid) from public, anon;
grant execute on function public.get_portfolio_ac_occasions(uuid) to authenticated;

comment on function public.get_portfolio_ac_occasions(uuid) is
  'Per criterion: separate assessed occasions held (distinct work days behind passing decisions, current or superseded, not IQA-rejected) vs the qualification_occasion_rules minimum. Read-only; does not change get_portfolio_ac_state.';
