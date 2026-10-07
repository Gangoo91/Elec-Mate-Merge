-- ELE-1874 Assessment plan (Portfolio 2.0, P-ELE-13).
--
-- The tutor or assessor sets what the learner should evidence next: these
-- criteria, how (observation, product evidence, professional discussion,
-- witness…), by this date, with a suggested activity. The learner sees it as
-- a to-do in their portfolio and in "Do next" with a button straight into
-- capture with the criteria ticked.
--
-- Each row of portfolio_assessment_plans is ONE plan item; a learner's plan is
-- all their open items. portfolio_assessment_plan_criteria holds the criteria
-- each item covers and when each one was met.
--
-- An item closes itself when every criterion on it is met:
--   * the learner submits evidence claiming it (portfolio_submission_items), or
--   * an assessor passes it (portfolio_assessment_decisions, decision passed).
-- Staff can also mark it done, cancel it, or reopen it.
--
-- Writers (no direct table writes):
--   set_assessment_plan_item()    create / edit (staff who _can_assess the learner)
--   close_assessment_plan_item()  done / cancelled / reopen (same staff)
--   triggers                      automatic completion
-- Reader: get_assessment_plans(learner) for the learner and their staff.
-- Setting an item notifies the learner (bell + push via notify_user) with a
-- deep link to /apprentice/hub?plan=<id>.

-- 1. Tables -------------------------------------------------------------------
create table if not exists public.portfolio_assessment_plans (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete set null,
  college_id uuid,
  qualification_code text,
  activity text not null check (length(trim(activity)) between 1 and 500),
  method text not null default 'other'
    check (method in ('observation', 'product', 'professional_discussion', 'questioning', 'witness', 'simulation', 'other')),
  due_date date,
  notes text check (notes is null or length(notes) <= 2000),
  status text not null default 'open' check (status in ('open', 'done', 'cancelled')),
  set_by uuid references auth.users(id) on delete set null,
  set_by_name text,
  closed_at timestamptz,
  closed_by uuid references auth.users(id) on delete set null,
  close_reason text check (close_reason in ('evidence_submitted', 'criteria_passed', 'staff_closed', 'cancelled')),
  close_note text check (close_note is null or length(close_note) <= 1000),
  notified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists pap_learner_status_idx on public.portfolio_assessment_plans (learner_id, status, due_date);
create index if not exists pap_college_open_idx on public.portfolio_assessment_plans (college_id, due_date) where status = 'open';
alter table public.portfolio_assessment_plans enable row level security;

comment on table public.portfolio_assessment_plans is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Assessment plan items: what a tutor or assessor asks the learner to evidence next (criteria, method, suggested activity, due date). Scope: one row per plan item, keyed on the learner (learner_id); college_id copied for the tutor inbox. Used by: Student 360 (assessment plan, What we agreed), learner portfolio home to-do, College Hub Do next, college inbox overdue check-in. Rule: written only through set_assessment_plan_item / close_assessment_plan_item and the completion triggers; an item closes itself when every criterion on it is submitted or passed.';

create table if not exists public.portfolio_assessment_plan_criteria (
  plan_id uuid not null references public.portfolio_assessment_plans(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  unit_code text not null,
  ac_code text not null,
  met_at timestamptz,
  met_by text check (met_by in ('evidence_submitted', 'criteria_passed', 'already_passed')),
  created_at timestamptz not null default now(),
  primary key (plan_id, unit_code, ac_code)
);
create index if not exists papc_learner_idx on public.portfolio_assessment_plan_criteria (learner_id, unit_code, ac_code) where met_at is null;
alter table public.portfolio_assessment_plan_criteria enable row level security;

comment on table public.portfolio_assessment_plan_criteria is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] The criteria each assessment plan item asks for, and when each was met (evidence submitted or passed). Scope: plan_id → portfolio_assessment_plans; learner_id copied for policies. Used by: get_assessment_plans, completion triggers. Rule: never written directly; set_assessment_plan_item replaces the set, the triggers stamp met_at.';

-- 2. Policies: learner reads own, assessing staff read; nobody writes directly
revoke all on public.portfolio_assessment_plans from anon;
revoke all on public.portfolio_assessment_plan_criteria from anon;
revoke insert, update, delete on public.portfolio_assessment_plans from authenticated;
revoke insert, update, delete on public.portfolio_assessment_plan_criteria from authenticated;
grant select on public.portfolio_assessment_plans to authenticated;
grant select on public.portfolio_assessment_plan_criteria to authenticated;

drop policy if exists "Learner reads own plan" on public.portfolio_assessment_plans;
create policy "Learner reads own plan" on public.portfolio_assessment_plans
  for select to authenticated using (learner_id = auth.uid());
drop policy if exists "Assessing staff read plan" on public.portfolio_assessment_plans;
create policy "Assessing staff read plan" on public.portfolio_assessment_plans
  for select to authenticated using (public._can_assess(learner_id));

drop policy if exists "Learner reads own plan criteria" on public.portfolio_assessment_plan_criteria;
create policy "Learner reads own plan criteria" on public.portfolio_assessment_plan_criteria
  for select to authenticated using (learner_id = auth.uid());
drop policy if exists "Assessing staff read plan criteria" on public.portfolio_assessment_plan_criteria;
create policy "Assessing staff read plan criteria" on public.portfolio_assessment_plan_criteria
  for select to authenticated using (public._can_assess(learner_id));

-- 3. Notification types --------------------------------------------------------
insert into public.notification_types (type, category, push, importance) values
  ('assessment_plan_set', 'apprentice', true, 1),
  ('assessment_plan_done', null, false, 1)
on conflict (type) do update
  set category = excluded.category, push = excluded.push, importance = excluded.importance, updated_at = now();

-- 4. Plain words ----------------------------------------------------------------
create or replace function public._plan_method_label(p text)
returns text language sql immutable set search_path to 'public' as $$
  select case p
    when 'observation' then 'Observation'
    when 'product' then 'Product evidence'
    when 'professional_discussion' then 'Professional discussion'
    when 'questioning' then 'Questioning'
    when 'witness' then 'Witness statement'
    when 'simulation' then 'Simulation'
    else 'Evidence' end;
$$;

-- 5. Completion -----------------------------------------------------------------
-- Stamps the learner's open plan criteria in p_refs ('unit|ac') as met, then
-- closes any item whose criteria are all met.
create or replace function public._plan_mark_met(p_learner uuid, p_refs text[], p_by text)
returns int language plpgsql security definer set search_path to 'public' as $$
declare r record; n int := 0; v_name text;
begin
  if p_learner is null or coalesce(array_length(p_refs, 1), 0) = 0 then return 0; end if;
  update public.portfolio_assessment_plan_criteria c
     set met_at = now(), met_by = p_by
    from public.portfolio_assessment_plans p
   where p.id = c.plan_id and p.status = 'open' and c.learner_id = p_learner
     and c.met_at is null and (c.unit_code || '|' || c.ac_code) = any (p_refs);

  for r in
    update public.portfolio_assessment_plans p
       set status = 'done', closed_at = now(), close_reason = p_by, updated_at = now()
     where p.learner_id = p_learner and p.status = 'open'
       and exists (select 1 from public.portfolio_assessment_plan_criteria c where c.plan_id = p.id)
       and not exists (select 1 from public.portfolio_assessment_plan_criteria c where c.plan_id = p.id and c.met_at is null)
    returning p.id, p.set_by, p.activity, p.college_student_id
  loop
    n := n + 1;
    if r.set_by is not null then
      select public.notif_person(coalesce(s.name, 'Your learner')) into v_name
        from public.college_students s where s.id = r.college_student_id;
      perform public.notify_user(r.set_by, 'assessment_plan_done',
        coalesce(v_name, 'Your learner') || ' has evidenced a plan item',
        left(r.activity, 140) || case when p_by = 'criteria_passed' then ' · criteria passed' else ' · evidence sent for assessment' end,
        jsonb_build_object('ref_id', r.id::text, 'plan_id', r.id,
          'route', case when r.college_student_id is not null
                        then '/college?section=student360&studentId=' || r.college_student_id || '#plan' end));
    end if;
  end loop;
  return n;
end; $$;
revoke all on function public._plan_mark_met(uuid, text[], text) from public, anon, authenticated;

-- Evidence sent: the criteria claimed on that item count as submitted.
create or replace function public._plan_on_submission_item()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_owner uuid; v_refs text[];
begin
  select user_id into v_owner from public.portfolio_items where id = new.portfolio_item_id;
  if v_owner is null then return new; end if;
  select coalesce(array_agg(distinct c.unit_code || '|' || c.ac_code), '{}') into v_refs
    from public.portfolio_item_criteria c
   where c.portfolio_item_id = new.portfolio_item_id and c.source in ('learner', 'assessor');
  begin
    perform public._plan_mark_met(v_owner, v_refs, 'evidence_submitted');
  exception when others then
    raise warning '[assessment plan] submission hook failed: %', sqlerrm;
  end;
  return new;
end; $$;
drop trigger if exists trg_plan_on_submission_item on public.portfolio_submission_items;
create trigger trg_plan_on_submission_item after insert on public.portfolio_submission_items
  for each row execute function public._plan_on_submission_item();

-- Criterion passed (by any route, including a decision without a submission).
create or replace function public._plan_on_decision()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if new.decision = 'passed' and new.superseded_at is null then
    begin
      perform public._plan_mark_met(new.learner_id, array[new.unit_code || '|' || new.ac_code], 'criteria_passed');
    exception when others then
      raise warning '[assessment plan] decision hook failed: %', sqlerrm;
    end;
  end if;
  return new;
end; $$;
drop trigger if exists trg_plan_on_decision on public.portfolio_assessment_decisions;
create trigger trg_plan_on_decision after insert on public.portfolio_assessment_decisions
  for each row execute function public._plan_on_decision();

-- 6. Set (create or edit) -------------------------------------------------------
-- p_criteria: [{unit_code, ac_code}] on the learner's qualification, 1–30.
create or replace function public.set_assessment_plan_item(
  p_learner uuid,
  p_criteria jsonb,
  p_activity text,
  p_method text default 'other',
  p_due_date date default null,
  p_notes text default null,
  p_id uuid default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_uid uuid := auth.uid();
  q record;
  v_refs text[];
  v_bad text;
  v_id uuid := p_id;
  v_row public.portfolio_assessment_plans%rowtype;
  v_name text;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_passed text[];
  v_new boolean := p_id is null;
  v_n int;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  if p_learner is null or p_learner = v_uid or not public._can_assess(p_learner) then
    raise exception 'only staff who assess this learner can set their plan' using errcode = '42501';
  end if;
  if coalesce(trim(p_activity), '') = '' then
    raise exception 'say what the learner should do' using errcode = '22023';
  end if;
  if p_method is null or p_method not in ('observation', 'product', 'professional_discussion', 'questioning', 'witness', 'simulation', 'other') then
    raise exception 'unknown method' using errcode = '22023';
  end if;
  if jsonb_typeof(coalesce(p_criteria, '[]'::jsonb)) <> 'array' then
    raise exception 'criteria must be a list' using errcode = '22023';
  end if;

  select * into q from public._resolve_qualification(p_learner, null);
  if q.requirement_code is null then
    raise exception 'this learner has no qualification set, so there are no criteria to plan' using errcode = 'P0001';
  end if;

  select coalesce(array_agg(distinct trim(x->>'unit_code') || '|' || trim(x->>'ac_code')), '{}') into v_refs
    from jsonb_array_elements(coalesce(p_criteria, '[]'::jsonb)) x
   where coalesce(trim(x->>'unit_code'), '') <> '' and coalesce(trim(x->>'ac_code'), '') <> '';
  if coalesce(array_length(v_refs, 1), 0) = 0 then
    raise exception 'choose at least one criterion' using errcode = '22023';
  end if;
  if array_length(v_refs, 1) > 30 then
    raise exception 'choose at most 30 criteria for one plan item' using errcode = '22023';
  end if;
  select r into v_bad from unnest(v_refs) r
   where not exists (select 1 from public.qualification_requirements qr
                      where qr.qualification_code = q.requirement_code
                        and qr.unit_code || '|' || qr.ac_code = r) limit 1;
  if v_bad is not null then
    raise exception 'criterion % is not on this learner''s qualification', replace(v_bad, '|', ' AC ') using errcode = '22023';
  end if;

  -- Criteria already passed need no new evidence.
  select coalesce(array_agg(s.unit_code || '|' || s.ac_code), '{}') into v_passed
    from public.portfolio_assessment_decisions s
   where s.learner_id = p_learner and s.qualification_code = q.requirement_code
     and s.superseded_at is null and s.decision = 'passed'
     and s.unit_code || '|' || s.ac_code = any (v_refs)
     and s.decided_at = (select max(d2.decided_at) from public.portfolio_assessment_decisions d2
                          where d2.learner_id = s.learner_id and d2.qualification_code = s.qualification_code
                            and d2.unit_code = s.unit_code and d2.ac_code = s.ac_code and d2.superseded_at is null);
  if array_length(v_passed, 1) = array_length(v_refs, 1) then
    raise exception 'those criteria are already passed' using errcode = 'P0001';
  end if;

  select public.notif_person(coalesce(p.full_name, p.username, 'Your tutor')) into v_name
    from public.profiles p where p.id = v_uid;

  if v_new then
    if p_due_date is not null and p_due_date < v_today then
      raise exception 'the due date is in the past' using errcode = '22023';
    end if;
    insert into public.portfolio_assessment_plans
      (learner_id, college_student_id, college_id, qualification_code, activity, method, due_date, notes, set_by, set_by_name)
    values (p_learner, q.college_student_id,
            (select s.college_id from public.college_students s where s.id = q.college_student_id),
            q.requirement_code, left(trim(p_activity), 500), p_method, p_due_date,
            nullif(left(trim(coalesce(p_notes, '')), 2000), ''), v_uid, coalesce(v_name, 'Your tutor'))
    returning id into v_id;
  else
    select * into v_row from public.portfolio_assessment_plans where id = p_id for update;
    if v_row.id is null or v_row.learner_id <> p_learner then
      raise exception 'plan item not found' using errcode = 'P0002';
    end if;
    if v_row.status <> 'open' then
      raise exception 'reopen the plan item before changing it' using errcode = 'P0001';
    end if;
    update public.portfolio_assessment_plans
       set activity = left(trim(p_activity), 500), method = p_method, due_date = p_due_date,
           notes = nullif(left(trim(coalesce(p_notes, '')), 2000), ''), updated_at = now()
     where id = p_id;
    delete from public.portfolio_assessment_plan_criteria
     where plan_id = p_id and not ((unit_code || '|' || ac_code) = any (v_refs));
  end if;

  insert into public.portfolio_assessment_plan_criteria (plan_id, learner_id, unit_code, ac_code, met_at, met_by)
  select v_id, p_learner, split_part(r, '|', 1), split_part(r, '|', 2),
         case when r = any (v_passed) then now() end,
         case when r = any (v_passed) then 'already_passed' end
    from unnest(v_refs) r
  on conflict (plan_id, unit_code, ac_code) do nothing;

  -- Tell the learner, with a link to the exact item.
  perform public.notify_user(p_learner, 'assessment_plan_set',
    case when v_new then coalesce(v_name, 'Your tutor') || ' set you something to evidence'
         else coalesce(v_name, 'Your tutor') || ' changed your assessment plan' end,
    left(trim(p_activity), 120)
      || case when p_due_date is not null then ' · by ' || to_char(p_due_date, 'FMDy DD Mon') else '' end,
    jsonb_build_object('route', '/apprentice/hub?plan=' || v_id, 'ref_id', v_id::text,
                       'plan_id', v_id, 'push_type', 'college'));
  update public.portfolio_assessment_plans set notified_at = now() where id = v_id;

  select count(*) into v_n from public.portfolio_assessment_plan_criteria where plan_id = v_id;
  return jsonb_build_object('id', v_id, 'criteria', v_n, 'already_passed', coalesce(array_length(v_passed, 1), 0));
end; $$;
revoke all on function public.set_assessment_plan_item(uuid, jsonb, text, text, date, text, uuid) from public, anon;
grant execute on function public.set_assessment_plan_item(uuid, jsonb, text, text, date, text, uuid) to authenticated;

-- 7. Close / cancel / reopen ------------------------------------------------------
create or replace function public.close_assessment_plan_item(p_id uuid, p_status text, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare v_uid uuid := auth.uid(); v_row public.portfolio_assessment_plans%rowtype;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  select * into v_row from public.portfolio_assessment_plans where id = p_id for update;
  if v_row.id is null or v_row.learner_id = v_uid or not public._can_assess(v_row.learner_id) then
    raise exception 'only staff who assess this learner can change their plan' using errcode = '42501';
  end if;
  if p_status = 'done' or p_status = 'cancelled' then
    update public.portfolio_assessment_plans
       set status = p_status, closed_at = now(), closed_by = v_uid,
           close_reason = case when p_status = 'done' then 'staff_closed' else 'cancelled' end,
           close_note = nullif(left(trim(coalesce(p_note, '')), 1000), ''), updated_at = now()
     where id = p_id;
  elsif p_status = 'open' then
    update public.portfolio_assessment_plans
       set status = 'open', closed_at = null, closed_by = null, close_reason = null, close_note = null, updated_at = now()
     where id = p_id;
    -- Reopened on purpose: criteria met by evidence count again only when sent again.
    update public.portfolio_assessment_plan_criteria
       set met_at = null, met_by = null
     where plan_id = p_id and met_by = 'evidence_submitted';
  else
    raise exception 'status must be done, cancelled or open' using errcode = '22023';
  end if;
  return jsonb_build_object('id', p_id, 'status', p_status);
end; $$;
revoke all on function public.close_assessment_plan_item(uuid, text, text) from public, anon;
grant execute on function public.close_assessment_plan_item(uuid, text, text) to authenticated;

-- 8. Read ---------------------------------------------------------------------------
-- Open items first (soonest due), then the last 20 closed. Criteria carry
-- their wording and current state so the learner reads them in plain words.
create or replace function public.get_assessment_plans(p_learner uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_user uuid := coalesce(p_learner, auth.uid());
  v_today date := (now() at time zone 'Europe/London')::date;
  v_out jsonb;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  with items as (
    select p.*, row_number() over (partition by (p.status = 'open') order by
             case when p.status = 'open' then coalesce(p.due_date, date '9999-12-31') end,
             p.closed_at desc nulls last, p.created_at desc) rn
      from public.portfolio_assessment_plans p
     where p.learner_id = v_user
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', i.id, 'activity', i.activity, 'method', i.method,
           'method_label', public._plan_method_label(i.method),
           'due_date', i.due_date, 'notes', i.notes, 'status', i.status,
           'overdue', i.status = 'open' and i.due_date is not null and i.due_date < v_today,
           'set_by', i.set_by, 'set_by_name', i.set_by_name, 'created_at', i.created_at,
           'closed_at', i.closed_at, 'close_reason', i.close_reason, 'close_note', i.close_note,
           'college_student_id', i.college_student_id,
           'criteria', coalesce((
             select jsonb_agg(jsonb_build_object(
                      'unit_code', c.unit_code, 'ac_code', c.ac_code,
                      'unit_title', qr.unit_title, 'ac_text', qr.ac_text,
                      'met_at', c.met_at, 'met_by', c.met_by)
                    order by c.unit_code, c.ac_code)
               from public.portfolio_assessment_plan_criteria c
               left join public.qualification_requirements qr
                 on qr.qualification_code = i.qualification_code
                and qr.unit_code = c.unit_code and qr.ac_code = c.ac_code
              where c.plan_id = i.id), '[]'::jsonb))
         order by (i.status <> 'open'), case when i.status = 'open' then coalesce(i.due_date, date '9999-12-31') end,
                  i.closed_at desc nulls last), '[]'::jsonb)
    into v_out
    from items i
   where i.status = 'open' or i.rn <= 20;
  return v_out;
end; $$;
revoke all on function public.get_assessment_plans(uuid) from public, anon;
grant execute on function public.get_assessment_plans(uuid) to authenticated;
