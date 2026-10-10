-- ELE-2055 — Road to Gold Card after the AM2S, and
-- ELE-2054 — the assessment plan version by the learner's start date.
-- Additive. Structure and sourced facts only; no criteria and no JIB rules.

/* ══ ELE-2055: the learner's own checklist after the AM2S ════════════════
   The steps and their wording live in src/data/goldCardRoad.ts, each linked
   to the official page it comes from (ECS: ecscard.org.uk; NET; the ECS/NET
   integration reported by Electrical Contracting News, 3 Aug 2026). This
   table only records which steps the learner says they have done, and when.
   The college sees it; only the learner ticks it. */

create table if not exists public.gold_card_steps (
  learner_id uuid not null references auth.users(id) on delete cascade,
  step_key text not null check (step_key in (
    'am2s_passed', 'myecs_registered', 'hse_assessment', 'documents_ready',
    'gold_card_applied', 'gold_card_received', 'jib_grade_applied', 'approved_grade_plan')),
  done_on date not null default current_date,
  note text,
  updated_at timestamptz not null default now(),
  primary key (learner_id, step_key)
);

comment on table public.gold_card_steps is
  '[APPRENTICE → COLLEGE] ELE-2055. Steps on the road to the ECS Gold Card and JIB grading that the apprentice has ticked as done, with the date. Scope: learner_id = the apprentice. Used by: GoldCardRoad (learner /apprentice/gold-card, Student 360 read-only). Rule: written only by the learner through set_gold_card_step; step wording and sources are in src/data/goldCardRoad.ts, never stored here.';

alter table public.gold_card_steps enable row level security;

drop policy if exists "gold_card_steps: learner or their college staff read" on public.gold_card_steps;
create policy "gold_card_steps: learner or their college staff read"
  on public.gold_card_steps for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id) or public.is_staff_for_learner_user(learner_id));

revoke all on public.gold_card_steps from anon;
revoke insert, update, delete on public.gold_card_steps from authenticated;
grant select on public.gold_card_steps to authenticated;

create or replace function public.set_gold_card_step(
  p_step text, p_done boolean, p_done_on date default null, p_note text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'not allowed' using errcode = '42501'; end if;
  if p_done then
    if p_done_on is not null and p_done_on > current_date then
      return jsonb_build_object('error', 'The date cannot be in the future.');
    end if;
    insert into public.gold_card_steps (learner_id, step_key, done_on, note)
    values (auth.uid(), p_step, coalesce(p_done_on, current_date), nullif(trim(coalesce(p_note, '')), ''))
    on conflict (learner_id, step_key) do update
      set done_on = excluded.done_on, note = excluded.note, updated_at = now();
  else
    delete from public.gold_card_steps where learner_id = auth.uid() and step_key = p_step;
  end if;
  return jsonb_build_object('success', true);
end;
$$;

revoke all on function public.set_gold_card_step(text, boolean, date, text) from public, anon;
grant execute on function public.set_gold_card_step(text, boolean, date, text) to authenticated;

-- The learner's steps, plus what the college has recorded (an EPA result on
-- college_epa), so "AM2S passed" can show the college's record.
create or replace function public.get_gold_card_road(p_learner uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  v_epa record;
  q record;
  st record;
  v_nation text;
begin
  if auth.uid() is null or not (auth.uid() = u or public._can_assess(u) or public.is_staff_for_learner_user(u)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into q from public._resolve_qualification(u, null) limit 1;
  select * into st from public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code));
  select e.result, e.epa_date, c.nation into v_epa
    from public.college_students cs
    left join public.college_epa e on e.student_id = cs.id
    left join public.colleges c on c.id = cs.college_id
   where cs.user_id = u
   order by e.updated_at desc nulls last
   limit 1;
  return jsonb_build_object(
    'viewer', case when auth.uid() = u then 'learner' else 'staff' end,
    'route', st.route,
    'assessment', st.assessment,
    'nation', v_epa.nation,
    'college_epa', case when v_epa.result is null then null
                        else jsonb_build_object('result', v_epa.result, 'epa_date', v_epa.epa_date) end,
    'steps', coalesce((select jsonb_object_agg(step_key, jsonb_build_object('done_on', done_on, 'note', note))
                         from public.gold_card_steps where learner_id = u), '{}'::jsonb));
end;
$$;

revoke all on function public.get_gold_card_road(uuid) from public, anon;
grant execute on function public.get_gold_card_road(uuid) to authenticated;

/* ══ ELE-2054: plan versions by start date ═══════════════════════════════
   Version log, Skills England, read 10 Oct 2026:
     https://skillsengland.education.gov.uk/apprenticeship-standards/st0152
       1.0  starts 10/09/2015 – 02/09/2023
       1.1  starts 03/09/2023 – 20/07/2025
       1.2  starts 21/07/2025 – 16/12/2026   (already recorded by ELE-1903)
       Revised assessment plan: "On 17/12/26, it will replace the current
       version for new starts with a funding band of £23,000"
       (https://skillsengland.education.gov.uk/apprenticeships/st0152-in-revision)
     https://skillsengland.education.gov.uk/apprenticeship-standards/st1017
       1.0  starts 01/06/2022 – 20/08/2025
       1.1  starts 21/08/2025 – 16/12/2026
       Revised assessment plan: the ST1017 page banner and the in-revision
       page say it replaces the current version for new starts on
       17/12/2026 (funding band £19,000); the version log row on the same
       page says 17/12/2025. 1.1 is approved for starts to 16/12/2026, so
       17/12/2026 is recorded, with the conflict noted in the source.
   End assessments, NET, read 10 Oct 2026:
     https://www.netservices.org.uk/am2s/  the original AM2S is for
       apprentices who "started their apprenticeship before September 2023";
     https://www.netservices.org.uk/am2s-v1/  AM2S v1 from September 2023.
     AM2S v1 is the end assessment under plans 1.1 and 1.2. New starts from
     17/12/2026 are on the revised plan, whose end assessment is not
     recorded here yet, so AM2S v1 is closed to starts up to 16/12/2026.
   The revised plan's criteria map, KSB links and end assessment are
   content for a person to load (gaps in get_learner_plan_version). */

insert into public.apprenticeship_standards
  (code, version, title, level, nation, effective_from, effective_to, source, source_url)
values
  ('ST0152', '1.0', 'Installation and maintenance electrician', 'Level 3', 'England', '2015-09-10', '2023-09-02',
   'Skills England ST0152 version log: 1.0 earliest start 10/09/2015, latest start 02/09/2023 (read 10 Oct 2026).',
   'https://skillsengland.education.gov.uk/apprenticeships/st0152-v1-0'),
  ('ST0152', '1.1', 'Installation and maintenance electrician', 'Level 3', 'England', '2023-09-03', '2025-07-20',
   'Skills England ST0152 version log: 1.1 earliest start 03/09/2023, latest start 20/07/2025 (read 10 Oct 2026).',
   'https://skillsengland.education.gov.uk/apprenticeships/st0152-v1-1'),
  ('ST0152', 'revised-2026-12-17', 'Installation and maintenance electrician (revised assessment plan)', 'Level 3', 'England', '2026-12-17', null,
   'Skills England: the revised assessment plan "On 17/12/26 ... will replace the current version for new starts with a funding band of £23,000" (in-revision page, read 10 Oct 2026). Criteria map and end assessment not recorded yet.',
   'https://skillsengland.education.gov.uk/apprenticeships/st0152-in-revision'),
  ('ST1017', '1.0', 'Domestic electrician', 'Level 3', 'England', '2022-06-01', '2025-08-20',
   'Skills England ST1017 version log: 1.0 earliest start 01/06/2022, latest start 20/08/2025 (read 10 Oct 2026).',
   'https://skillsengland.education.gov.uk/apprenticeship-standards/st1017'),
  ('ST1017', '1.1', 'Domestic electrician', 'Level 3', 'England', '2025-08-21', '2026-12-16',
   'Skills England ST1017 version log: 1.1 earliest start 21/08/2025, latest start 16/12/2026 (read 10 Oct 2026).',
   'https://skillsengland.education.gov.uk/apprenticeships/st1017-v1-1'),
  ('ST1017', 'revised-2026-12-17', 'Domestic electrician (revised assessment plan)', 'Level 3', 'England', '2026-12-17', null,
   'Skills England: the ST1017 banner and in-revision page say the revised plan replaces the current version for new starts on 17/12/2026 (funding band £19,000); the version log row on the same page says 17/12/2025, which conflicts with 1.1 being open to 16/12/2026. Recorded as 17/12/2026; confirm with Skills England. Criteria map and end assessment not recorded yet.',
   'https://skillsengland.education.gov.uk/apprenticeships/st1017-in-revision')
on conflict (code, version) do nothing;

-- NET lists the same gateway qualifications for the AM2S v1, which covers 1.1.
insert into public.standard_qualifications (standard_id, qualification_code, role, source)
select s.id, q.code, 'gateway_qualification',
       'NET AM2S v1 mandatory evidence: City & Guilds 601/6299-5 (5357-23 or 5357-94) or EAL 601/7345/2 (v1.1); AM2S v1 is for registrations from September 2023 (netservices.org.uk/am2s-v1, read 10 Oct 2026)'
  from public.apprenticeship_standards s
  cross join (values ('5357'), ('601/7345/2')) as q(code)
 where s.code = 'ST0152' and s.version = '1.1'
on conflict (standard_id, qualification_code) do nothing;

insert into public.standard_end_assessments
  (standard_code, assessment_code, assessment_version, registered_from, registered_to, source, source_url)
values
  ('ST0152', 'AM2S', 'original', null, '2023-08-31',
   'NET: the AM2S is for apprentices on the Installation & Maintenance Electrician standard who started before September 2023; from September 2023 they take the AM2S v1 (read 10 Oct 2026).',
   'https://www.netservices.org.uk/am2s/')
on conflict (standard_code, assessment_code, assessment_version) do nothing;

update public.standard_end_assessments
   set registered_to = '2026-12-16',
       source = source || ' Closed to starts up to 16/12/2026: from 17/12/2026 new starts are on the revised ST0152 assessment plan (Skills England), whose end assessment is not recorded yet (ELE-2054).'
 where standard_code = 'ST0152' and assessment_code = 'AM2S' and assessment_version = 'v1'
   and registered_to is null;

-- The plan a learner is on, by start date, and its end assessment.
-- Same rule as catalogue_for (ELE-1903): the version whose start window
-- holds the learner's start date. The standard comes from the learner's
-- course (_gateway_standard), not from a qualification link, so a learner
-- starting on the revised plan is placed on it even before its
-- qualifications are recorded.
create or replace function public.get_learner_plan_version(
  p_user_id uuid default null,
  p_student_id uuid default null,
  p_as_of date default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := p_user_id;
  q record;
  st record;
  v_start date;
  v_as_of date;
  v_std public.apprenticeship_standards%rowtype;
  v_ea jsonb;
  v_qual record;
  v_status text;
  v_gaps text[] := '{}';
begin
  if u is null and p_student_id is not null then
    select user_id into u from public.college_students where id = p_student_id;
  end if;
  u := coalesce(u, auth.uid());
  if auth.uid() is null or not (auth.uid() = u or public._can_assess(u) or public.is_staff_for_learner_user(u)
                                or public._is_platform_admin()) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  select * into q from public._resolve_qualification(u, p_student_id) limit 1;
  select * into st from public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code));
  select start_date into v_start from public.college_students
   where (p_student_id is not null and id = p_student_id) or (p_student_id is null and user_id = u)
   order by (lower(coalesce(status, '')) in ('withdrawn', 'completed', 'archived')), created_at desc
   limit 1;
  v_as_of := coalesce(p_as_of, v_start);

  if st.standard_code is null then
    v_status := 'no_standard';
  elsif v_as_of is null then
    v_status := 'no_start_date';
    v_gaps := array_append(v_gaps, 'start_date');
  else
    select * into v_std from public.apprenticeship_standards s
     where s.code = st.standard_code
       and (s.effective_from is null or s.effective_from <= v_as_of)
       and (s.effective_to is null or s.effective_to >= v_as_of)
     order by s.effective_from desc nulls last
     limit 1;
    select to_jsonb(a) - 'id' - 'created_at' into v_ea
      from public.standard_end_assessments a
     where a.standard_code = st.standard_code
       and (a.registered_from is null or a.registered_from <= v_as_of)
       and (a.registered_to is null or a.registered_to >= v_as_of)
     order by a.registered_from desc nulls last
     limit 1;
    v_status := case
      when v_std.id is null then 'no_version_for_date'
      when v_std.version like 'revised%' then 'revised_plan'
      else 'current' end;
    if v_std.id is null then v_gaps := array_append(v_gaps, 'standard_version_for_date'); end if;
    if v_ea is null then v_gaps := array_append(v_gaps, 'end_assessment_for_date'); end if;
    if v_std.version like 'revised%' then v_gaps := array_append(v_gaps, 'criteria_map_for_revised_plan'); end if;
  end if;

  select code, version_label, effective_from, effective_to into v_qual
    from public.qualifications where code = coalesce(q.course_code, q.code) limit 1;
  if v_qual.code is not null and v_qual.version_label is null then
    v_gaps := array_append(v_gaps, 'qualification_version');
  end if;

  return jsonb_build_object(
    'learner_id', u,
    'start_date', v_start,
    'as_of', v_as_of,
    'route', st.route,
    'status', v_status,
    'standard', case when v_std.id is null then
                  case when st.standard_code is null then null
                       else jsonb_build_object('code', st.standard_code, 'title', st.standard_title) end
                else jsonb_build_object('code', v_std.code, 'version', v_std.version, 'title', v_std.title,
                       'effective_from', v_std.effective_from, 'effective_to', v_std.effective_to,
                       'source', v_std.source, 'source_url', v_std.source_url) end,
    'end_assessment', v_ea,
    'qualification', case when v_qual.code is null then null
                     else jsonb_build_object('code', v_qual.code, 'version_label', v_qual.version_label,
                            'effective_from', v_qual.effective_from, 'effective_to', v_qual.effective_to) end,
    'gaps', to_jsonb(v_gaps));
end;
$$;

revoke all on function public.get_learner_plan_version(uuid, uuid, date) from public, anon;
grant execute on function public.get_learner_plan_version(uuid, uuid, date) to authenticated;

comment on function public.get_learner_plan_version(uuid, uuid, date) is
  '[COLLEGE] ELE-2054. The assessment plan version a learner is on, chosen by their start date (Skills England version windows in apprenticeship_standards), and the end assessment for that date (standard_end_assessments). status: current | revised_plan | no_start_date | no_standard | no_version_for_date. gaps: what a person still has to load (criteria map for the revised plan, its end assessment, qualification version). p_as_of overrides the start date (testing, what-if).';
