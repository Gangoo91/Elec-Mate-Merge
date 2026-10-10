-- Countersignature for trainee assessors (10 Oct 2026, batch 2).
--
-- An assessor still working towards their assessor award can be marked a
-- trainee on their staff record (college_staff.assessor_status = 'trainee').
-- A PASS they record is stored as normal (append-only, their name and
-- qualifications at the time) but flagged countersign_required, and it does
-- NOT count as passed anywhere until a qualified assessor countersigns it:
--
--   * get_portfolio_ac_state reads it as 'submitted' (with the assessor),
--     so coverage, readiness, gateway, cohort figures and the evidence pack
--     states (all built on it) leave it out. The client shows "Passed,
--     awaiting countersignature" from countersign_required/countersigned_at.
--   * the direct readers of decisions are patched the same way:
--     _close_decided_submission (the submission stays open), _plan_on_decision
--     (the plan item stays open), _gateway_forecast_core, _gateway_snapshot,
--     _shared_portfolio_record, get_portfolio_ac_occasions,
--     set_assessment_plan_item; the coverage / ac_signoffs mirror waits.
--   * countersign_decisions() records the countersignature (named, timed,
--     fingerprinted, append-only in portfolio_decision_countersignatures),
--     stamps the decision, then runs what a pass normally does: the mirror,
--     the plan, closing the submission, telling the learner.
--
-- Referrals and "not yet" from a trainee are formative and need no
-- countersignature. Staff with no assessor_status set are treated as
-- qualified (no change for anyone today).
--
-- Additive: new columns (nullable / default false), a new table, new
-- functions; the existing functions are patched in place on their live text.
begin;
set local lock_timeout = '5s';

-- ── Who is a trainee ──────────────────────────────────────────────────────
alter table public.college_staff add column if not exists assessor_status text;
alter table public.college_staff drop constraint if exists college_staff_assessor_status_check;
alter table public.college_staff add constraint college_staff_assessor_status_check
  check (assessor_status is null or assessor_status in ('qualified', 'trainee'));
comment on column public.college_staff.assessor_status is
  'qualified | trainee. A trainee''s passes wait for a qualified assessor''s countersignature (countersign_decisions). Null = not stated, treated as qualified.';

create or replace function public._is_trainee_assessor(p_user uuid, p_learner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.college_staff st
      join public.college_students cs on cs.college_id = st.college_id
     where st.user_id = p_user and cs.user_id = p_learner
       and st.archived_at is null and st.assessor_status = 'trainee');
$$;
revoke all on function public._is_trainee_assessor(uuid, uuid) from public, anon;
grant execute on function public._is_trainee_assessor(uuid, uuid) to authenticated;

-- ── The decision carries the flag ─────────────────────────────────────────
alter table public.portfolio_assessment_decisions
  add column if not exists countersign_required boolean not null default false,
  add column if not exists countersigned_at timestamptz,
  add column if not exists countersigned_by uuid references auth.users(id),
  add column if not exists countersigned_by_name text;
comment on column public.portfolio_assessment_decisions.countersign_required is
  'True when a trainee assessor recorded this pass: it does not count until countersigned_at is set by countersign_decisions().';
comment on column public.portfolio_assessment_decisions.countersigned_at is
  'When a qualified assessor countersigned this trainee pass (the record is in portfolio_decision_countersignatures).';

create index if not exists pad_countersign_pending_idx
  on public.portfolio_assessment_decisions (learner_id, decided_at)
  where countersign_required and countersigned_at is null and superseded_at is null;

-- Runs after trg_pad_before_insert (triggers fire in name order).
create or replace function public._pad_countersign_flag()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.countersign_required := new.decision = 'passed'
                              and public._is_trainee_assessor(new.assessor_id, new.learner_id);
  new.countersigned_at := null;
  new.countersigned_by := null;
  new.countersigned_by_name := null;
  return new;
end $$;
drop trigger if exists trg_pad_countersign_flag on public.portfolio_assessment_decisions;
create trigger trg_pad_countersign_flag before insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_countersign_flag();

-- ── The record of each countersignature ───────────────────────────────────
create table if not exists public.portfolio_decision_countersignatures (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null unique references public.portfolio_assessment_decisions(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  qualification_code text,
  unit_code text not null,
  ac_code text not null,
  trainee_assessor_id uuid,
  trainee_assessor_name text,
  countersigned_by uuid not null,
  countersigner_name text,
  countersigner_qualifications text[],
  statement text not null,
  note text,
  decision_content_hash text,
  record_hash text not null,
  countersigned_at timestamptz not null default now()
);
create index if not exists pdc_learner_idx on public.portfolio_decision_countersignatures (learner_id, countersigned_at desc);

alter table public.portfolio_decision_countersignatures enable row level security;
drop policy if exists "Assessing staff read countersignatures" on public.portfolio_decision_countersignatures;
create policy "Assessing staff read countersignatures" on public.portfolio_decision_countersignatures
  for select to authenticated using (public._can_assess(learner_id) or public._can_read_staff_notes(learner_id));
drop policy if exists "Learner reads own countersignatures" on public.portfolio_decision_countersignatures;
create policy "Learner reads own countersignatures" on public.portfolio_decision_countersignatures
  for select to authenticated using (learner_id = auth.uid());
-- No insert, update or delete policy: rows come only from countersign_decisions().
revoke all on public.portfolio_decision_countersignatures from anon;
grant select on public.portfolio_decision_countersignatures to authenticated;

comment on table public.portfolio_decision_countersignatures is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] A qualified assessor''s countersignature of a trainee assessor''s pass: who, when, their qualifications, the decision''s content_hash and a record hash. Append-only. Scope: learner_id = apprentice auth uid; read by the learner and anyone who can assess them. Used by: CountersignQueue (Portfolios), LearnerAssessmentView, EvidenceDetailSheet, portfolio-export-pack. Rule: written only by countersign_decisions(); never updated or deleted.';

-- ── The coverage / ac_signoffs mirror, now one function ───────────────────
create or replace function public._pad_mirror_decision(d public.portfolio_assessment_decisions)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student uuid; v_college uuid; v_staff uuid;
  v_pending boolean := d.countersign_required and d.countersigned_at is null;
begin
  select college_student_id into v_student from public._resolve_qualification(d.learner_id, null);
  if v_student is null then return; end if;
  select college_id into v_college from public.college_students where id = v_student;
  select id into v_staff from public.college_staff
   where college_id = v_college and user_id = d.assessor_id and archived_at is null limit 1;
  update public.student_ac_coverage
     set status = case
                    when v_pending then case when status in ('assessed', 'not_started') then 'evidenced' else status end
                    when d.decision = 'passed' then 'assessed'
                    when d.decision = 'referred' then 'in_progress'
                    else status end,
         assessor_id = coalesce(v_staff, assessor_id),
         last_assessed_at = d.decided_at,
         notes = coalesce(d.feedback, notes),
         updated_at = now()
   where student_id = v_student and qualification_code = d.qualification_code
     and unit_code = d.unit_code and ac_code = d.ac_code;

  -- ELE-1867: ac_signoffs mirrors the current decision so IQA sampling,
  -- standardisation and EPA readiness read the same verdict the learner sees.
  -- A trainee pass waiting for countersignature has no verdict yet.
  insert into public.ac_signoffs as s
    (student_id, qualification_code, unit_code, ac_code, assessor_narrative, assessor_verdict,
     assessor_signed_at, assessor_signed_by, assessor_name_snapshot)
  values (v_student, d.qualification_code, d.unit_code, d.ac_code, d.feedback,
          case when v_pending then null else d.decision end,
          d.decided_at, d.assessor_id, d.assessor_name)
  on conflict (student_id, qualification_code, unit_code, ac_code) do update
     set assessor_narrative = excluded.assessor_narrative,
         assessor_verdict = excluded.assessor_verdict,
         assessor_signed_at = excluded.assessor_signed_at,
         assessor_signed_by = excluded.assessor_signed_by,
         assessor_name_snapshot = excluded.assessor_name_snapshot,
         iqa_verdict = case when s.assessor_signed_at is distinct from excluded.assessor_signed_at
                            then null else s.iqa_verdict end,
         iqa_feedback = case when s.assessor_signed_at is distinct from excluded.assessor_signed_at
                             then null else s.iqa_feedback end;
end $$;
revoke all on function public._pad_mirror_decision(public.portfolio_assessment_decisions) from public, anon, authenticated;

-- Same as the live _pad_after_insert (10 Oct), the mirror moved into
-- _pad_mirror_decision so countersign_decisions() can run it later.
create or replace function public._pad_after_insert()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  update public.portfolio_assessment_decisions
     set superseded_at = new.decided_at, superseded_by = new.id
   where learner_id = new.learner_id and qualification_code = new.qualification_code
     and unit_code = new.unit_code and ac_code = new.ac_code
     and superseded_at is null and id <> new.id;
  perform public._pad_mirror_decision(new);
  return new;
end; $function$;

create or replace function public._plan_on_decision()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if new.decision = 'passed' and new.superseded_at is null
     and not (new.countersign_required and new.countersigned_at is null) then
    begin
      perform public._plan_mark_met(new.learner_id, array[new.unit_code || '|' || new.ac_code], 'criteria_passed');
    exception when others then
      raise warning '[assessment plan] decision hook failed: %', sqlerrm;
    end;
  end if;
  return new;
end; $function$;

-- ── Patch the readers in place ────────────────────────────────────────────
create or replace function pg_temp._patch_fn(p_sig text, p_old text, p_new text)
returns void language plpgsql as $$
declare v text; n int;
begin
  v := pg_get_functiondef(p_sig::regprocedure);
  if position(p_new in v) > 0 then return; end if;  -- already patched
  n := (length(v) - length(replace(v, p_old, ''))) / greatest(length(p_old), 1);
  if n <> 1 then
    raise exception 'patch target found % times in % (expected once)', n, p_sig;
  end if;
  execute replace(v, p_old, p_new);
end $$;

-- The one state function: a pending trainee pass is still with the assessor.
select pg_temp._patch_fn('public.get_portfolio_ac_state(uuid)',
  $o$when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'$o$,
  $n$when cur.decision = 'passed' and cur.countersign_required and cur.countersigned_at is null then 'submitted'
      when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'$n$);

-- A submission is not decided while a pass on it waits for countersignature.
select pg_temp._patch_fn('public._close_decided_submission(uuid, uuid)',
  $o$select d.decision, d.decided_at$o$,
  $n$select case when d.countersign_required and d.countersigned_at is null then null else d.decision end as decision, d.decided_at$n$);

select pg_temp._patch_fn('public._gateway_forecast_core(uuid)',
  $o$d.unit_code, d.ac_code, d.decision, d.iqa_verdict, d.decided_at$o$,
  $n$d.unit_code, d.ac_code, d.decision, d.iqa_verdict, d.decided_at, d.countersign_required, d.countersigned_at$n$);
select pg_temp._patch_fn('public._gateway_forecast_core(uuid)',
  $o$and cur.decision = 'passed' and coalesce(cur.iqa_verdict, '') <> 'not_confirmed'$o$,
  $n$and cur.decision = 'passed' and coalesce(cur.iqa_verdict, '') <> 'not_confirmed'
         and not (cur.countersign_required and cur.countersigned_at is null)$n$);

select pg_temp._patch_fn('public._gateway_snapshot(uuid)',
  $o$select distinct on (unit_code, ac_code) decision, iqa_verdict$o$,
  $n$select distinct on (unit_code, ac_code)
                   case when countersign_required and countersigned_at is null then 'awaiting_countersign' else decision end as decision,
                   iqa_verdict$n$);

-- A shared record (employer / EPA links) leaves a pending pass out entirely.
select pg_temp._patch_fn('public._shared_portfolio_record(uuid, uuid[])',
  E'         and d.superseded_at is null\n       order by d.unit_code, d.ac_code, d.decided_at desc\n    ),\n    acs as (',
  E'         and d.superseded_at is null\n         and not (d.countersign_required and d.countersigned_at is null)\n       order by d.unit_code, d.ac_code, d.decided_at desc\n    ),\n    acs as (');

select pg_temp._patch_fn('public.get_portfolio_ac_occasions(uuid)',
  $o$and d.iqa_verdict is distinct from 'not_confirmed'$o$,
  $n$and d.iqa_verdict is distinct from 'not_confirmed'
       and not (d.countersign_required and d.countersigned_at is null)$n$);

select pg_temp._patch_fn('public.set_assessment_plan_item(uuid, jsonb, text, text, date, text, uuid)',
  $o$and s.superseded_at is null and s.decision = 'passed'$o$,
  $n$and s.superseded_at is null and s.decision = 'passed'
     and not (s.countersign_required and s.countersigned_at is null)$n$);

-- The learner is told a trainee's pass is waiting, not that it is done.
select pg_temp._patch_fn('public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text)',
  $o$when 'passed' then n || case when n = 1 then ' criterion' else ' criteria' end || ' passed'$o$,
  $n$when 'passed' then n || case when n = 1 then ' criterion' else ' criteria' end
          || case when public._is_trainee_assessor(auth.uid(), p_learner_id)
                  then ' passed, awaiting countersignature' else ' passed' end$n$);

-- ── Countersign ───────────────────────────────────────────────────────────
create or replace function public.countersign_decisions(p_decision_ids uuid[], p_note text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_name text;
  v_quals text[];
  v_now timestamptz := now();
  v_note text := nullif(left(trim(coalesce(p_note, '')), 1000), '');
  v_stmt text := 'I have reviewed this decision and the evidence it rests on, and I countersign it.';
  d public.portfolio_assessment_decisions%rowtype;
  v_id uuid;
  v_n int := 0;
  v_skipped int := 0;
  v_by_learner jsonb := '{}'::jsonb;
  v_learner text;
  v_sub uuid;
  v_count int;
  v_trainees uuid[];
  v_t uuid;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  if public._viewing_as_now() then
    raise exception 'viewing as someone else: nothing can be signed' using errcode = '42501';
  end if;
  if coalesce(cardinality(p_decision_ids), 0) = 0 then
    return jsonb_build_object('countersigned', 0, 'skipped', 0);
  end if;
  if cardinality(p_decision_ids) > 200 then
    raise exception 'too many decisions (200 at most)' using errcode = '22023';
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Assessor') into v_name from public.profiles where id = v_uid;
  select nullif(ap.qualifications, '{}') into v_quals from public.assessor_profiles ap where ap.user_id = v_uid;

  for d in
    select * from public.portfolio_assessment_decisions
     where id = any (p_decision_ids)
     order by learner_id, decided_at
     for update
  loop
    if d.learner_id = v_uid or not public._can_assess(d.learner_id) then
      raise exception 'you are not an assessor for this learner' using errcode = '42501';
    end if;
    if d.assessor_id = v_uid then
      raise exception 'you cannot countersign your own decision' using errcode = '42501';
    end if;
    if public._is_trainee_assessor(v_uid, d.learner_id) then
      raise exception 'a trainee assessor cannot countersign; ask a qualified assessor' using errcode = '42501';
    end if;
    -- Already countersigned, not a trainee pass, or replaced by a newer decision.
    if not d.countersign_required or d.countersigned_at is not null or d.superseded_at is not null then
      v_skipped := v_skipped + 1;
      continue;
    end if;

    v_id := gen_random_uuid();
    insert into public.portfolio_decision_countersignatures
      (id, decision_id, learner_id, qualification_code, unit_code, ac_code, trainee_assessor_id,
       trainee_assessor_name, countersigned_by, countersigner_name, countersigner_qualifications,
       statement, note, decision_content_hash, record_hash, countersigned_at)
    values (v_id, d.id, d.learner_id, d.qualification_code, d.unit_code, d.ac_code, d.assessor_id,
            d.assessor_name, v_uid, v_name, v_quals, v_stmt, v_note, d.content_hash,
            encode(extensions.digest(concat_ws('|', v_id, d.id, coalesce(d.content_hash, ''), v_uid, v_stmt,
                   coalesce(v_note, ''), to_char(v_now at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')),
                   'sha256'), 'hex'),
            v_now);

    update public.portfolio_assessment_decisions
       set countersigned_at = v_now, countersigned_by = v_uid, countersigned_by_name = v_name
     where id = d.id
     returning * into d;

    -- Now it counts: what a pass normally does on insert.
    perform public._pad_mirror_decision(d);
    begin
      perform public._plan_mark_met(d.learner_id, array[d.unit_code || '|' || d.ac_code], 'criteria_passed');
    exception when others then
      raise warning '[assessment plan] countersign hook failed: %', sqlerrm;
    end;
    perform public._pae_write(d.learner_id, 'decision_countersigned', 'assessment_decision', d.id,
      jsonb_build_object('unit_code', d.unit_code, 'ac_code', d.ac_code, 'decision', d.decision,
                         'assessor_name', d.assessor_name, 'countersigned_by_name', v_name,
                         'evidence_item_ids', to_jsonb(d.evidence_item_ids), 'countersignature_id', v_id),
      d.content_hash, 'assessor');

    v_n := v_n + 1;
    v_by_learner := jsonb_set(v_by_learner, array[d.learner_id::text],
      coalesce(v_by_learner->(d.learner_id::text), '[]'::jsonb)
        || jsonb_build_array(jsonb_build_object('u', d.unit_code, 'a', d.ac_code, 't', d.assessor_id)));
  end loop;

  -- Per learner: close what is now decided, and tell them (and the trainee).
  for v_learner in select jsonb_object_keys(v_by_learner) loop
    for v_sub in
      select id from public.portfolio_submissions
       where user_id = v_learner::uuid and status in ('submitted', 'under_review', 'resubmitted')
    loop
      begin
        perform public._close_decided_submission(v_sub, v_uid);
      exception when others then
        raise warning '[countersign] close submission % failed: %', v_sub, sqlerrm;
      end;
    end loop;
    v_count := jsonb_array_length(v_by_learner->v_learner);
    perform public.notify_user(v_learner::uuid, 'assessment_decision',
      v_count || case when v_count = 1 then ' criterion' else ' criteria' end || ' passed',
      'Countersigned by ' || v_name || '. ' ||
        (select string_agg(e->>'u' || ' AC ' || (e->>'a'), ', ')
           from (select e from jsonb_array_elements(v_by_learner->v_learner) e limit 3) s),
      jsonb_build_object('route', '/apprentice/college/progress?ac=' ||
        (select string_agg(e->>'u' || ':' || (e->>'a'), ',')
           from (select e from jsonb_array_elements(v_by_learner->v_learner) e limit 20) s),
        'decision', 'passed', 'count', v_count, 'countersigned', true));
    select coalesce(array_agg(distinct (e->>'t')::uuid), '{}') into v_trainees
      from jsonb_array_elements(v_by_learner->v_learner) e;
    foreach v_t in array v_trainees loop
      if v_t is not null and v_t <> v_uid then
        perform public.notify_user(v_t, 'decision_countersigned',
          v_name || ' countersigned your decision',
          'Your passes now count for this learner.',
          jsonb_build_object('learner_id', v_learner));
      end if;
    end loop;
  end loop;

  return jsonb_build_object('countersigned', v_n, 'skipped', v_skipped);
end $$;
revoke all on function public.countersign_decisions(uuid[], text) from public, anon;
grant execute on function public.countersign_decisions(uuid[], text) to authenticated;

-- ── The queue: trainee passes waiting, for learners the caller can assess ──
create or replace function public.get_countersign_queue()
returns table (
  decision_id uuid, learner_id uuid, learner_name text, college_student_id uuid,
  qualification_code text, unit_code text, ac_code text, ac_text text, method text,
  feedback text, evidence_item_ids uuid[], assessor_id uuid, assessor_name text,
  assessor_qualifications text[], decided_at timestamptz, can_countersign boolean)
language sql
stable
security definer
set search_path = public
as $$
  select d.id, d.learner_id,
         coalesce(cs.name, p.full_name, 'Learner'),
         cs.id,
         d.qualification_code, d.unit_code, d.ac_code, qr.ac_text, d.method, d.feedback,
         d.evidence_item_ids, d.assessor_id, d.assessor_name, d.assessor_qualifications, d.decided_at,
         (d.assessor_id <> auth.uid() and not public._is_trainee_assessor(auth.uid(), d.learner_id))
    from public.portfolio_assessment_decisions d
    left join lateral (select s.id, s.name from public.college_students s
                        where s.user_id = d.learner_id order by s.created_at desc limit 1) cs on true
    left join public.profiles p on p.id = d.learner_id
    left join lateral (select q.ac_text from public.qualification_requirements q
                        where q.qualification_code = d.qualification_code and q.unit_code = d.unit_code
                          and q.ac_code = d.ac_code limit 1) qr on true
   where auth.uid() is not null
     and d.countersign_required and d.countersigned_at is null and d.superseded_at is null
     and d.learner_id <> auth.uid()
     and public._can_assess(d.learner_id)
   order by d.decided_at
   limit 500;
$$;
revoke all on function public.get_countersign_queue() from public, anon;
grant execute on function public.get_countersign_queue() to authenticated;

commit;
