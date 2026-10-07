-- ELE-1871: IQA sampling reaches assessment decisions and evidence items.
--
-- 1. A sample in a plan can now be an assessment decision
--    (portfolio_assessment_decisions) or a portfolio evidence item, as well as
--    an observation or an off-the-job entry. Exactly one target per sample.
-- 2. The plan drives the verdict: a verdict on a decision sample is written
--    onto the decision (agree = confirmed, disagree / refer = not confirmed),
--    and a verdict given from Student 360 lands in the matching plan as a
--    sample, so both routes count toward the plan's percentage.
-- 3. A "Returned" verdict (not confirmed, disagree, refer back) opens an action
--    on college_iqa_findings for the assessor and tells them through
--    notify_user, with a link to the learner's Assess section in Student 360.
--    The assessor closes it with close_iqa_action.
-- 4. An IQA can never sample or give a verdict on their own work.
-- 5. New assessors (first six months, no older decisions) are sampled at 100%.
-- 6. get_iqa_sampling_rate: the sampling-compliance figure the audit pack reads.
--
-- Backward compatible: no column or function the released apps use is removed
-- or renamed. Old clients that insert observation / OTJ samples, or update
-- iqa_verdict on a decision, keep working and now also get the plan link and
-- the assessor action for free.
begin;

-- ------------------------------------------------------------ sample targets
alter table public.college_iqa_samples
  add column if not exists decision_id uuid references public.portfolio_assessment_decisions(id) on delete set null,
  add column if not exists portfolio_item_id uuid references public.portfolio_items(id) on delete set null,
  add column if not exists target_title_snapshot text,
  add column if not exists target_date_snapshot date,
  add column if not exists learner_user_id uuid;

comment on column public.college_iqa_samples.decision_id is
  'ELE-1871: the assessment decision this sample checks. The verdict is written back onto portfolio_assessment_decisions.iqa_verdict.';
comment on column public.college_iqa_samples.portfolio_item_id is
  'ELE-1871: the portfolio evidence item this sample checks.';
comment on column public.college_iqa_samples.target_title_snapshot is
  'ELE-1871: what was sampled, frozen at the time (decision or evidence item). Observations and OTJ keep their own snapshot columns.';

alter table public.college_iqa_samples drop constraint if exists college_iqa_samples_target_check;
alter table public.college_iqa_samples add constraint college_iqa_samples_target_check
  check (num_nonnulls(observation_id, otj_id, decision_id, portfolio_item_id) = 1) not valid;
alter table public.college_iqa_samples validate constraint college_iqa_samples_target_check;

create unique index if not exists college_iqa_samples_plan_decision_key
  on public.college_iqa_samples (sampling_plan_id, decision_id) where decision_id is not null;
create unique index if not exists college_iqa_samples_plan_item_key
  on public.college_iqa_samples (sampling_plan_id, portfolio_item_id) where portfolio_item_id is not null;
create index if not exists college_iqa_samples_decision_idx on public.college_iqa_samples (decision_id) where decision_id is not null;

-- ------------------------------------------------------------ actions link
alter table public.college_iqa_findings
  add column if not exists decision_id uuid references public.portfolio_assessment_decisions(id) on delete set null,
  add column if not exists college_student_id uuid references public.college_students(id) on delete set null,
  add column if not exists closed_by uuid references auth.users(id) on delete set null;
comment on column public.college_iqa_findings.decision_id is
  'ELE-1871: the assessment decision an IQA returned. The finding is the action the assessor must close.';
comment on column public.college_iqa_findings.college_student_id is
  'ELE-1871: the learner the returned work belongs to (deep link to Student 360).';
create index if not exists college_iqa_findings_decision_idx on public.college_iqa_findings (decision_id) where decision_id is not null;
create index if not exists college_iqa_findings_owner_open_idx on public.college_iqa_findings (owner_staff_id) where status = 'Open';

insert into public.notification_types (type, category, push, importance) values
  ('iqa_returned', 'college_marking', true, 1),
  ('iqa_action_closed', 'college_marking', false, 1)
on conflict (type) do nothing;

-- ------------------------------------------------------------ helpers
-- Verdict vocabularies: samples say agree / disagree / refer / pending,
-- decisions say confirmed / not_confirmed / null.
create or replace function public._iqa_sample_to_decision(p_verdict text)
returns text language sql immutable set search_path = public as $$
  select case p_verdict when 'agree' then 'confirmed'
                        when 'disagree' then 'not_confirmed'
                        when 'refer' then 'not_confirmed'
                        else null end;
$$;

-- The auth user whose work a sample checks (null when unknown).
create or replace function public._iqa_sample_assessor_user(
  p_decision uuid, p_observation uuid, p_otj uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select coalesce(
    (select d.assessor_id from public.portfolio_assessment_decisions d where d.id = p_decision),
    (select st.user_id from public.college_observations o
       join public.college_staff st on st.id = o.college_staff_id where o.id = p_observation),
    (select e.verified_by from public.college_otj_entries e where e.id = p_otj));
$$;
revoke all on function public._iqa_sample_assessor_user(uuid, uuid, uuid) from public, anon;

-- Open (or reuse) the assessor's action for returned work and tell them.
create or replace function public._iqa_open_return_action(
  p_college uuid, p_assessor_user uuid, p_student uuid, p_decision uuid, p_sample uuid,
  p_what text, p_feedback text)
returns uuid
language plpgsql security definer set search_path = public as $$
declare
  v_assessor public.college_staff%rowtype;
  v_iqa public.college_staff%rowtype;
  v_id uuid;
  v_route text;
  v_learner text;
begin
  if p_college is null or p_assessor_user is null then return null; end if;
  select * into v_assessor from public.college_staff
   where college_id = p_college and user_id = p_assessor_user and archived_at is null
   order by created_at limit 1;
  select * into v_iqa from public.college_staff
   where college_id = p_college and user_id = auth.uid() and archived_at is null
   order by created_at limit 1;

  -- One open action per returned decision / sample.
  select f.id into v_id from public.college_iqa_findings f
   where f.status = 'Open'
     and ((p_decision is not null and f.decision_id = p_decision)
       or (p_decision is null and p_sample is not null and f.sample_id = p_sample))
   limit 1;
  if v_id is not null then
    update public.college_iqa_findings
       set description = left('Returned by IQA: ' || p_what || coalesce('. IQA feedback: ' || nullif(btrim(p_feedback), ''), ''), 2000),
           sample_id = coalesce(sample_id, p_sample),
           updated_at = now()
     where id = v_id;
    return v_id;
  end if;

  select name into v_learner from public.college_students where id = p_student;

  insert into public.college_iqa_findings (
    college_id, assessor_id, assessor_name, finding_type, description, status,
    action_plan, iqa_id, iqa_name_snapshot, severity, due_date, area, owner_staff_id,
    created_by, sample_id, decision_id, college_student_id)
  values (
    p_college, v_assessor.id, coalesce(v_assessor.name, 'Assessor'), 'Action Required',
    left('Returned by IQA: ' || p_what || coalesce('. IQA feedback: ' || nullif(btrim(p_feedback), ''), ''), 2000),
    'Open',
    'Look at the work again with the IQA''s feedback, record a new decision if needed, then close this action with a short note.',
    v_iqa.id, v_iqa.name, 'minor', current_date + 14, 'Assessment decision', v_assessor.id,
    auth.uid(), p_sample, p_decision, p_student)
  returning id into v_id;

  if p_student is not null then
    v_route := '/college?section=student360&studentId=' || p_student || '#assess';
  else
    v_route := '/college?section=iqa';
  end if;

  perform public.notify_user(
    p_assessor_user,
    'iqa_returned',
    'IQA returned a decision',
    coalesce(v_learner || ': ', '') || p_what || coalesce('. IQA feedback: ' || nullif(btrim(p_feedback), ''), '')
      || '. Look again and close the action.',
    jsonb_build_object('route', v_route, 'finding_id', v_id, 'decision_id', p_decision,
                       'college_student_id', p_student));
  return v_id;
end; $$;
revoke all on function public._iqa_open_return_action(uuid, uuid, uuid, uuid, uuid, text, text) from public, anon, authenticated;

-- ------------------------------------------------------------ sample guards
create or replace function public._iqa_sample_before()
returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_assessor uuid;
  d public.portfolio_assessment_decisions%rowtype;
  v_name text;
begin
  -- Snapshots for the new target kinds.
  if tg_op = 'INSERT' then
    if new.decision_id is not null then
      select * into d from public.portfolio_assessment_decisions where id = new.decision_id;
      if found then
        select cs.name into v_name from public.college_students cs where cs.user_id = d.learner_id limit 1;
        new.target_title_snapshot := coalesce(new.target_title_snapshot,
          'Unit ' || d.unit_code || ' AC ' || d.ac_code || ' · ' ||
          case d.decision when 'passed' then 'Passed' when 'referred' then 'Needs more' else 'Not yet' end ||
          coalesce(' · ' || v_name, ''));
        new.target_date_snapshot := coalesce(new.target_date_snapshot, d.decided_at::date);
        new.learner_user_id := coalesce(new.learner_user_id, d.learner_id);
      end if;
    elsif new.portfolio_item_id is not null then
      select coalesce(new.target_title_snapshot, pi.title), coalesce(new.target_date_snapshot, pi.created_at::date),
             coalesce(new.learner_user_id, pi.user_id)
        into new.target_title_snapshot, new.target_date_snapshot, new.learner_user_id
        from public.portfolio_items pi where pi.id = new.portfolio_item_id;
    end if;
  end if;

  -- Never on your own work (only a signed-in person is checked; the system
  -- path from a decision verdict has already been checked there).
  if auth.uid() is not null and coalesce(new.verdict, 'pending') <> 'pending'
     and (tg_op = 'INSERT' or new.verdict is distinct from old.verdict) then
    v_assessor := public._iqa_sample_assessor_user(new.decision_id, new.observation_id, new.otj_id);
    if v_assessor = auth.uid()
       or (new.portfolio_item_id is not null and exists (
             select 1 from public.portfolio_assessment_decisions x
              where new.portfolio_item_id = any (x.evidence_item_ids) and x.assessor_id = auth.uid())) then
      raise exception 'an IQA cannot verify their own assessment decisions' using errcode = '42501';
    end if;
  end if;
  return new;
end; $$;

drop trigger if exists iqa_sample_targets_before on public.college_iqa_samples;
create trigger iqa_sample_targets_before
  before insert or update of verdict on public.college_iqa_samples
  for each row execute function public._iqa_sample_before();

-- After a verdict: write it onto the decision, and open the assessor's action
-- for returned observations / OTJ / evidence items (decisions open theirs in
-- the decision trigger below, whichever route the verdict came by).
create or replace function public._iqa_sample_after()
returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_target text;
  v_college uuid;
  v_student uuid;
  v_assessor uuid;
  v_what text;
begin
  if tg_op = 'UPDATE' and new.verdict is not distinct from old.verdict then
    return new;
  end if;

  if new.decision_id is not null then
    -- Adding a decision to the plan unjudged leaves any verdict it already has.
    if tg_op = 'INSERT' and new.verdict = 'pending' then return new; end if;
    v_target := public._iqa_sample_to_decision(new.verdict);
    update public.portfolio_assessment_decisions d
       set iqa_verdict = v_target,
           iqa_feedback = case when v_target is null then null else coalesce(nullif(btrim(new.comments), ''), d.iqa_feedback) end,
           iqa_by = case when v_target is null then null else coalesce(auth.uid(), d.iqa_by) end,
           iqa_at = case when v_target is null then null else now() end
     where d.id = new.decision_id
       and d.superseded_at is null
       -- disagree and refer both read as not confirmed: no churn between them
       and d.iqa_verdict is distinct from v_target;
    return new;
  end if;

  if new.verdict in ('disagree', 'refer') then
    select sp.college_id into v_college from public.college_iqa_sampling sp where sp.id = new.sampling_plan_id;
    v_assessor := public._iqa_sample_assessor_user(null, new.observation_id, new.otj_id);
    if new.observation_id is not null then
      select o.college_student_id into v_student from public.college_observations o where o.id = new.observation_id;
      v_what := 'Observation "' || coalesce(new.observation_title_snapshot, 'untitled') || '"';
    elsif new.otj_id is not null then
      select cs.id into v_student from public.college_otj_entries e
        join public.college_students cs on cs.user_id = e.student_id and cs.college_id = v_college
       where e.id = new.otj_id limit 1;
      v_what := 'Off-the-job entry "' || coalesce(new.otj_title_snapshot, 'untitled') || '"';
    elsif new.portfolio_item_id is not null then
      select cs.id into v_student from public.college_students cs
       where cs.user_id = new.learner_user_id and cs.college_id = v_college limit 1;
      select x.assessor_id into v_assessor from public.portfolio_assessment_decisions x
       where new.portfolio_item_id = any (x.evidence_item_ids) and x.superseded_at is null
       order by x.decided_at desc limit 1;
      v_what := 'Evidence "' || coalesce(new.target_title_snapshot, 'untitled') || '"';
    end if;
    perform public._iqa_open_return_action(v_college, v_assessor, v_student, null, new.id, v_what, new.comments);
  end if;
  return new;
end; $$;

drop trigger if exists iqa_sample_targets_after on public.college_iqa_samples;
create trigger iqa_sample_targets_after
  after insert or update of verdict on public.college_iqa_samples
  for each row execute function public._iqa_sample_after();

-- ------------------------------------------------------------ decision verdicts
-- Whichever route a decision verdict comes by (Student 360 IQA mode, or a
-- plan sample), it lands in the matching plan and a return opens an action.
create or replace function public._pad_iqa_verdict_after()
returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_student public.college_students%rowtype;
  v_staff uuid;
  v_plan uuid;
  v_sample public.college_iqa_samples%rowtype;
  v_want text;
  v_iqa_staff uuid;
  v_sample_id uuid;
begin
  if new.iqa_verdict is not distinct from old.iqa_verdict then return new; end if;

  -- The learner's college row where the assessor works.
  select cs.* into v_student from public.college_students cs
   where cs.user_id = new.learner_id
     and exists (select 1 from public.college_staff st where st.college_id = cs.college_id and st.user_id = new.assessor_id)
   order by cs.created_at desc limit 1;
  if not found then return new; end if;

  select st.id into v_staff from public.college_staff st
   where st.college_id = v_student.college_id and st.user_id = new.assessor_id
   order by st.archived_at nulls first, st.created_at limit 1;
  select st.id into v_iqa_staff from public.college_staff st
   where st.college_id = v_student.college_id and st.user_id = auth.uid() and st.archived_at is null
   order by st.created_at limit 1;

  -- The plan this decision falls in.
  select sp.id into v_plan from public.college_iqa_sampling sp
   where sp.college_id = v_student.college_id
     and sp.assessor_id = v_staff
     and new.decided_at::date between sp.period_start and sp.period_end
     and (sp.qualification_code is null or sp.qualification_code = new.qualification_code)
     and (sp.unit_code is null or sp.unit_code = new.unit_code)
   order by (sp.unit_code is not null) desc, (sp.qualification_code is not null) desc, sp.period_start desc
   limit 1;

  if v_plan is not null then
    v_want := case new.iqa_verdict when 'confirmed' then 'agree' when 'not_confirmed' then 'refer' else 'pending' end;
    select * into v_sample from public.college_iqa_samples
     where sampling_plan_id = v_plan and decision_id = new.id;
    if found then
      if public._iqa_sample_to_decision(v_sample.verdict) is distinct from new.iqa_verdict then
        update public.college_iqa_samples
           set verdict = v_want, comments = coalesce(new.iqa_feedback, comments),
               iqa_id = coalesce(v_iqa_staff, iqa_id)
         where id = v_sample.id;
      end if;
    elsif new.iqa_verdict is not null then
      insert into public.college_iqa_samples (sampling_plan_id, decision_id, iqa_id, verdict, comments)
      values (v_plan, new.id, v_iqa_staff, v_want, new.iqa_feedback)
      on conflict do nothing;
    end if;
  end if;

  if new.iqa_verdict = 'not_confirmed' then
    select id into v_sample_id from public.college_iqa_samples where decision_id = new.id order by sampled_at desc limit 1;
    perform public._iqa_open_return_action(
      v_student.college_id, new.assessor_id, v_student.id, new.id, v_sample_id,
      'Unit ' || new.unit_code || ' AC ' || new.ac_code, new.iqa_feedback);
  end if;
  return new;
end; $$;

drop trigger if exists trg_pad_iqa_verdict_after on public.portfolio_assessment_decisions;
create trigger trg_pad_iqa_verdict_after
  after update of iqa_verdict on public.portfolio_assessment_decisions
  for each row execute function public._pad_iqa_verdict_after();

-- ------------------------------------------------------------ closing actions
create or replace function public.close_iqa_action(p_finding uuid, p_note text)
returns void
language plpgsql security definer set search_path = public as $$
declare
  f public.college_iqa_findings%rowtype;
  v_iqa_user uuid;
begin
  if auth.uid() is null then raise exception 'sign in first' using errcode = '42501'; end if;
  select * into f from public.college_iqa_findings where id = p_finding for update;
  if not found then raise exception 'action not found' using errcode = 'P0002'; end if;
  if not (
       exists (select 1 from public.college_staff st
                where st.id in (f.owner_staff_id, f.assessor_id) and st.user_id = auth.uid() and st.archived_at is null)
       or public.college_can('iqa.sample', f.college_id)) then
    raise exception 'only the assessor or an IQA can close this action' using errcode = '42501';
  end if;
  if nullif(btrim(coalesce(p_note, '')), '') is null then
    raise exception 'say what you did before closing the action' using errcode = '22023';
  end if;
  if f.status = 'Closed' then return; end if;
  update public.college_iqa_findings
     set status = 'Closed', closed_at = now(), closed_by = auth.uid(),
         resolution_notes = left(btrim(p_note), 2000), updated_at = now()
   where id = p_finding;

  select st.user_id into v_iqa_user from public.college_staff st where st.id = f.iqa_id;
  if v_iqa_user is not null and v_iqa_user <> auth.uid() then
    perform public.notify_user(v_iqa_user, 'iqa_action_closed', 'Assessor closed an IQA action',
      coalesce(f.assessor_name, 'The assessor') || ': ' || left(btrim(p_note), 200),
      jsonb_build_object('route',
        case when f.college_student_id is not null
             then '/college?section=student360&studentId=' || f.college_student_id || '#assess'
             else '/college?section=iqa' end,
        'finding_id', f.id));
  end if;
end; $$;
revoke all on function public.close_iqa_action(uuid, text) from public, anon;
grant execute on function public.close_iqa_action(uuid, text) to authenticated;

-- ------------------------------------------------------------ new assessors
-- First six months with no older decisions: sample everything.
create or replace function public._iqa_is_new_assessor(p_staff uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((
    select st.created_at > now() - interval '6 months'
       and not exists (select 1 from public.portfolio_assessment_decisions d
                        where d.assessor_id = st.user_id and d.decided_at < now() - interval '6 months')
       and not exists (select 1 from public.college_observations o
                        where o.college_staff_id = st.id and o.observed_at < current_date - 182)
      from public.college_staff st where st.id = p_staff), false);
$$;
revoke all on function public._iqa_is_new_assessor(uuid) from public, anon;
grant execute on function public._iqa_is_new_assessor(uuid) to authenticated;

create or replace function public._iqa_plan_new_assessor_rate()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.assessor_id is not null and coalesce(new.target_sample_percent, 0) < 100
     and public._iqa_is_new_assessor(new.assessor_id) then
    new.target_sample_percent := 100;
    new.notes := concat_ws(E'\n', nullif(new.notes, ''),
      'Raised to 100% because this is a new assessor (first six months).');
  end if;
  return new;
end; $$;
drop trigger if exists iqa_plan_new_assessor_rate on public.college_iqa_sampling;
create trigger iqa_plan_new_assessor_rate
  before insert on public.college_iqa_sampling
  for each row execute function public._iqa_plan_new_assessor_rate();

-- ------------------------------------------------------------ sampling figure
-- The sampling-compliance figure: of the assessment decisions college
-- assessors made in the window, how many an IQA has sampled, overall and per
-- assessor against the plan target.
create or replace function public.get_iqa_sampling_rate(p_college uuid default null, p_months int default 12)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  v_college uuid := p_college;
  v_from timestamptz := now() - make_interval(months => greatest(1, least(coalesce(p_months, 12), 36)));
  v jsonb;
begin
  if v_college is null then
    select st.college_id into v_college from public.college_staff st
     where st.user_id = auth.uid() and st.archived_at is null order by st.created_at limit 1;
  end if;
  if v_college is null or not (public.college_can('quality.view', v_college) or public.college_can('iqa.sample', v_college)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  with dec as (
    select d.id, d.assessor_id, d.iqa_verdict, d.decision
      from public.portfolio_assessment_decisions d
      join public.college_students cs on cs.user_id = d.learner_id and cs.college_id = v_college
     where d.decided_at >= v_from
       and d.superseded_at is null
       and exists (select 1 from public.college_staff st where st.college_id = v_college and st.user_id = d.assessor_id)
  ), per as (
    select st.id as staff_id, st.name,
           count(dec.id) as total,
           count(dec.id) filter (where dec.iqa_verdict is not null) as sampled,
           count(dec.id) filter (where dec.iqa_verdict = 'confirmed') as confirmed,
           count(dec.id) filter (where dec.iqa_verdict = 'not_confirmed') as returned,
           public._iqa_is_new_assessor(st.id) as is_new,
           (select max(sp.target_sample_percent) from public.college_iqa_sampling sp
             where sp.assessor_id = st.id and sp.period_end >= current_date - 365) as target
      from dec
      join lateral (select s.id, s.name from public.college_staff s
                     where s.college_id = v_college and s.user_id = dec.assessor_id
                     order by s.archived_at nulls first, s.created_at limit 1) st on true
     group by st.id, st.name
  )
  select jsonb_build_object(
    'months', greatest(1, least(coalesce(p_months, 12), 36)),
    'decisions_total', coalesce(sum(total), 0),
    'decisions_sampled', coalesce(sum(sampled), 0),
    'confirmed', coalesce(sum(confirmed), 0),
    'returned', coalesce(sum(returned), 0),
    'rate_pct', case when coalesce(sum(total), 0) = 0 then null
                     else round(100.0 * sum(sampled) / sum(total), 1) end,
    'assessors_at_target', count(*) filter (where total > 0 and (case when is_new then 100 else target end) is not null
                                                 and 100.0 * sampled / total >= (case when is_new then 100 else target end)),
    'assessors_total', count(*),
    'assessors', coalesce(jsonb_agg(jsonb_build_object(
        'staff_id', staff_id, 'name', name, 'total', total, 'sampled', sampled,
        'confirmed', confirmed, 'returned', returned, 'is_new', is_new,
        'target_pct', case when is_new then 100 else target end,
        'rate_pct', case when total = 0 then null else round(100.0 * sampled / total, 1) end)
        order by name), '[]'::jsonb),
    'open_actions', (select count(*) from public.college_iqa_findings f
                      where f.college_id = v_college and f.status = 'Open' and f.decision_id is not null))
    into v from per;
  return v;
end; $$;
revoke all on function public.get_iqa_sampling_rate(uuid, int) from public, anon;
grant execute on function public.get_iqa_sampling_rate(uuid, int) to authenticated;

commit;
