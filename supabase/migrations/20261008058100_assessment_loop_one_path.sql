-- ============================================================================
-- Assessment loop: one way to pass a criterion, AI feedback held until a
-- decision, decisions live to the learner.
--   ELE-1867  decide_ac_signoff (Mastery Queue) now records a real decision
--             through record_ac_decisions; every decision is mirrored into
--             ac_signoffs so IQA sampling / standardisation readers agree.
--   ELE-1868  portfolio_assessment_decisions joins the realtime publication.
--   ELE-1926  AI-drafted feedback is a held draft (portfolio_ai_feedback_drafts,
--             staff only) until the assessor records a decision with it; then
--             it is released with feedback_confirmed_at / by / name.
--             The released client's "Apply" (writes portfolio_submissions
--             directly with feedback_source 'ai_draft_confirmed') is diverted
--             into the draft table by a trigger, so the rule holds for it too.
-- Backward-compatible with the released web app and iOS build 49: no RPC
-- argument changes; get_portfolio_ac_state only gains trailing columns.
-- ============================================================================

-- ── 1. Provenance columns ───────────────────────────────────────────────────
alter table public.portfolio_assessment_decisions
  add column if not exists feedback_confirmed_at timestamptz;
comment on column public.portfolio_assessment_decisions.feedback_confirmed_at is
  'ELE-1926: when the assessor confirmed AI-drafted feedback by recording this decision (feedback_source = ai_draft_confirmed). Null for the assessor''s own words.';

alter table public.portfolio_submissions
  add column if not exists feedback_confirmed_at timestamptz,
  add column if not exists feedback_confirmed_by uuid references auth.users(id) on delete set null,
  add column if not exists feedback_confirmed_by_name text;
comment on column public.portfolio_submissions.feedback_confirmed_at is
  'ELE-1926: when AI-drafted feedback on this submission was confirmed and released to the learner (set by record_ac_decisions).';

-- ── 2. Held AI drafts ───────────────────────────────────────────────────────
create table if not exists public.portfolio_ai_feedback_drafts (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  submission_id uuid references public.portfolio_submissions(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  source text not null default 'ai_assessor' check (source in ('ai_assessor', 'legacy_apply')),
  verdict text,
  verdict_rationale text,
  ac_analysis jsonb not null default '[]'::jsonb,
  assessor_feedback text,
  strengths_noted text,
  areas_for_improvement text,
  action_required text,
  checked_at timestamptz,
  confirmed_at timestamptz,
  confirmed_by uuid references auth.users(id) on delete set null,
  confirmed_by_name text,
  decision_ids uuid[] not null default '{}',
  discarded_at timestamptz
);
create index if not exists idx_pafd_learner_open
  on public.portfolio_ai_feedback_drafts (learner_id, created_at desc)
  where confirmed_at is null and discarded_at is null;
create index if not exists idx_pafd_submission on public.portfolio_ai_feedback_drafts (submission_id);

comment on table public.portfolio_ai_feedback_drafts is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] AI-drafted assessor feedback held as a DRAFT (ELE-1926). The learner can never read it: staff who _can_assess(learner) only. Released when the assessor records a decision with feedback_source ai_draft_confirmed (record_ac_decisions sets confirmed_at/by and copies it to the submission). Scope: learner_id = apprentice auth uid; submission_id optional. Used by: AiAssessorPanel (writes), AcDecisionSheet (offers it). Rule: never shown to the learner unconfirmed.';

alter table public.portfolio_ai_feedback_drafts enable row level security;
revoke all on public.portfolio_ai_feedback_drafts from anon, public;
grant select, insert, update on public.portfolio_ai_feedback_drafts to authenticated;
grant all on public.portfolio_ai_feedback_drafts to service_role;

drop policy if exists "Assessing staff read AI drafts" on public.portfolio_ai_feedback_drafts;
create policy "Assessing staff read AI drafts" on public.portfolio_ai_feedback_drafts
  for select to authenticated
  using (learner_id <> auth.uid() and public._can_assess(learner_id));
drop policy if exists "Assessing staff write AI drafts" on public.portfolio_ai_feedback_drafts;
create policy "Assessing staff write AI drafts" on public.portfolio_ai_feedback_drafts
  for insert to authenticated
  with check (learner_id <> auth.uid() and public._can_assess(learner_id)
              and confirmed_at is null and created_by = auth.uid());
drop policy if exists "Assessing staff discard AI drafts" on public.portfolio_ai_feedback_drafts;
create policy "Assessing staff discard AI drafts" on public.portfolio_ai_feedback_drafts
  for update to authenticated
  using (learner_id <> auth.uid() and public._can_assess(learner_id) and confirmed_at is null)
  with check (learner_id <> auth.uid() and public._can_assess(learner_id) and confirmed_at is null);

-- ── 3. Divert direct AI "Apply" writes (released client) into a held draft ─
create or replace function public._ps_hold_ai_feedback()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  -- Resubmission cleared the feedback: clear its provenance with it.
  if new.assessor_feedback is null and old.assessor_feedback is not null then
    new.feedback_confirmed_at := null;
    new.feedback_confirmed_by := null;
    new.feedback_confirmed_by_name := null;
    if new.feedback_source = 'ai_draft_confirmed' then new.feedback_source := 'assessor'; end if;
  end if;
  -- Held unless this very update is the release (record_ac_decisions sets a
  -- fresh feedback_confirmed_at when it copies a confirmed draft in).
  if new.feedback_source = 'ai_draft_confirmed'
     and new.feedback_confirmed_at is not distinct from old.feedback_confirmed_at
     and (new.assessor_feedback is distinct from old.assessor_feedback
          or new.strengths_noted is distinct from old.strengths_noted
          or new.areas_for_improvement is distinct from old.areas_for_improvement
          or new.action_required is distinct from old.action_required) then
    insert into public.portfolio_ai_feedback_drafts
      (learner_id, submission_id, created_by, source, assessor_feedback, strengths_noted,
       areas_for_improvement, action_required, checked_at)
    values (new.user_id, new.id, auth.uid(), 'legacy_apply', new.assessor_feedback, new.strengths_noted,
            new.areas_for_improvement, new.action_required, now());
    new.assessor_feedback := old.assessor_feedback;
    new.strengths_noted := old.strengths_noted;
    new.areas_for_improvement := old.areas_for_improvement;
    new.action_required := old.action_required;
    new.last_feedback_at := old.last_feedback_at;
    new.feedback_source := old.feedback_source;
  end if;
  return new;
end; $function$;
revoke all on function public._ps_hold_ai_feedback() from public, anon, authenticated;

drop trigger if exists trg_ps_hold_ai_feedback on public.portfolio_submissions;
create trigger trg_ps_hold_ai_feedback
  before update on public.portfolio_submissions
  for each row execute function public._ps_hold_ai_feedback();

-- ── 4. record_ac_decisions: confirm + release an AI draft ──────────────────
-- Copied from the live definition (7 Oct); additions marked ELE-1926.
create or replace function public.record_ac_decisions(p_learner_id uuid, p_criteria jsonb, p_decision text, p_feedback text default null::text, p_evidence_item_ids uuid[] default '{}'::uuid[], p_submission_id uuid default null::uuid, p_method text default 'evidence_review'::text, p_feedback_source text default 'assessor'::text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_code text;
  c jsonb;
  n int := 0;
  v_list text := '';
  v_name text;
  v_acs text := '';
  v_link text;
  -- ELE-1926
  v_ai boolean := coalesce(p_feedback_source, 'assessor') = 'ai_draft_confirmed';
  v_id uuid;
  v_ids uuid[] := '{}';
  v_draft public.portfolio_ai_feedback_drafts%rowtype;
begin
  if not public._can_assess(p_learner_id) or p_learner_id = auth.uid() then
    raise exception 'you are not an assessor for this learner' using errcode = '42501';
  end if;
  select requirement_code into v_code from public._resolve_qualification(p_learner_id, null);
  if v_code is null then
    raise exception 'this learner has no qualification set' using errcode = 'P0001';
  end if;
  for c in select * from jsonb_array_elements(p_criteria) loop
    insert into public.portfolio_assessment_decisions
      (learner_id, qualification_code, unit_code, ac_code, decision, feedback, feedback_source,
       evidence_item_ids, submission_id, method, assessor_id, feedback_confirmed_at)
    values (p_learner_id, v_code, c->>'unit_code', c->>'ac_code', p_decision, p_feedback,
            coalesce(p_feedback_source, 'assessor'), coalesce(p_evidence_item_ids, '{}'),
            p_submission_id, p_method, auth.uid(), case when v_ai then now() end)
    returning id into v_id;
    v_ids := v_ids || v_id;
    n := n + 1;
    if n <= 3 then
      v_list := v_list || case when n > 1 then ', ' else '' end || (c->>'unit_code') || ' AC ' || (c->>'ac_code');
    end if;
    if n <= 20 then
      v_acs := v_acs || case when n > 1 then ',' else '' end || (c->>'unit_code') || ':' || (c->>'ac_code');
    end if;
  end loop;

  if n > 0 then
    select coalesce(full_name, 'Your assessor') into v_name from public.profiles where id = auth.uid();

    -- ELE-1926: the assessor used a held AI draft. Confirm it, and release its
    -- submission-level feedback to the learner now (never before a decision).
    if v_ai then
      select * into v_draft from public.portfolio_ai_feedback_drafts d
       where d.learner_id = p_learner_id and d.confirmed_at is null and d.discarded_at is null
         and (p_submission_id is null or d.submission_id is null or d.submission_id = p_submission_id)
       order by (d.submission_id is not distinct from p_submission_id) desc, d.created_at desc
       limit 1;
      if v_draft.id is not null then
        update public.portfolio_ai_feedback_drafts
           set confirmed_at = now(), confirmed_by = auth.uid(), confirmed_by_name = v_name, decision_ids = v_ids
         where id = v_draft.id;
        if v_draft.submission_id is not null then
          update public.portfolio_submissions
             set assessor_feedback = coalesce(v_draft.assessor_feedback, assessor_feedback),
                 strengths_noted = coalesce(v_draft.strengths_noted, strengths_noted),
                 areas_for_improvement = coalesce(v_draft.areas_for_improvement, areas_for_improvement),
                 action_required = case when p_decision = 'passed' then action_required
                                        else coalesce(v_draft.action_required, action_required) end,
                 feedback_source = 'ai_draft_confirmed',
                 feedback_confirmed_at = now(),
                 feedback_confirmed_by = auth.uid(),
                 feedback_confirmed_by_name = v_name,
                 last_feedback_at = now()
           where id = v_draft.submission_id;
        end if;
      end if;
    end if;

    -- The decided criteria themselves, ringed, with the assessor's feedback
    -- (and "Add what was missing" on any that need more).
    v_link := '/apprentice/college/progress?ac=' || v_acs;
    perform public.notify_user(p_learner_id, 'assessment_decision',
      case p_decision
        when 'passed' then n || case when n = 1 then ' criterion' else ' criteria' end || ' passed'
        when 'referred' then v_name || ' needs more on ' || n || case when n = 1 then ' criterion' else ' criteria' end
        else 'Not yet: ' || v_name || ' left feedback' end,
      v_list || case when n > 3 then ' and ' || (n - 3) || ' more' else '' end
        || coalesce(': ' || left(p_feedback, 160), ''),
      jsonb_build_object('route', v_link, 'decision', p_decision, 'count', n, 'assessor_id', auth.uid(),
                         'criteria', v_acs, 'evidence_item_ids', to_jsonb(coalesce(p_evidence_item_ids, '{}'::uuid[]))));
  end if;
  return jsonb_build_object('recorded', n, 'qualification_code', v_code);
end; $function$;
revoke all on function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) from public, anon;
grant execute on function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) to authenticated, service_role;

-- ── 5. Mirror every decision into ac_signoffs (one path, old readers agree) ─
-- Copied from the live _pad_after_insert (7 Oct); ac_signoffs upsert added.
create or replace function public._pad_after_insert()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v_student uuid; v_college uuid; v_staff uuid;
begin
  update public.portfolio_assessment_decisions
     set superseded_at = new.decided_at, superseded_by = new.id
   where learner_id = new.learner_id and qualification_code = new.qualification_code
     and unit_code = new.unit_code and ac_code = new.ac_code
     and superseded_at is null and id <> new.id;

  select college_student_id into v_student from public._resolve_qualification(new.learner_id, null);
  if v_student is not null then
    select college_id into v_college from public.college_students where id = v_student;
    select id into v_staff from public.college_staff
     where college_id = v_college and user_id = new.assessor_id and archived_at is null limit 1;
    update public.student_ac_coverage
       set status = case new.decision when 'passed' then 'assessed'
                                      when 'referred' then 'in_progress'
                                      else status end,
           assessor_id = coalesce(v_staff, assessor_id),
           last_assessed_at = new.decided_at,
           notes = coalesce(new.feedback, notes),
           updated_at = now()
     where student_id = v_student and qualification_code = new.qualification_code
       and unit_code = new.unit_code and ac_code = new.ac_code;

    -- ELE-1867: ac_signoffs is no longer written by any client. It mirrors the
    -- current decision so IQA sampling, standardisation and EPA readiness read
    -- the same verdict the learner sees. A new decision resets any IQA verdict
    -- recorded against the previous one.
    insert into public.ac_signoffs as s
      (student_id, qualification_code, unit_code, ac_code, assessor_narrative, assessor_verdict,
       assessor_signed_at, assessor_signed_by, assessor_name_snapshot)
    values (v_student, new.qualification_code, new.unit_code, new.ac_code, new.feedback, new.decision,
            new.decided_at, new.assessor_id, new.assessor_name)
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
  end if;
  return new;
end; $function$;

-- ── 6. Mastery Queue approve = a real "passed" decision ────────────────────
-- Copied from the live decide_ac_signoff (7 Oct); the approve path added.
create or replace function public.decide_ac_signoff(p_proposal_id uuid, p_status text, p_notes text default null::text)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_college_id uuid;
  v_user_role text;
  v_user_college uuid;
  -- ELE-1867
  p public.college_ac_signoff_proposals%rowtype;
  v_learner uuid;
  v_unit text;
  v_ac text;
  v_code text;
begin
  if p_status not in ('approved','rejected') then
    raise exception 'p_status must be approved or rejected';
  end if;
  select college_id into v_college_id from college_ac_signoff_proposals where id = p_proposal_id;
  if v_college_id is null then raise exception 'proposal not found'; end if;
  select college_role, college_id into v_user_role, v_user_college from profiles where id = auth.uid();
  if v_user_role not in ('tutor','admin','head_of_department','iqa') then
    raise exception 'only college staff can decide proposals';
  end if;
  -- prevent cross-college access
  if v_user_college is null or v_user_college <> v_college_id then
    raise exception 'cross-college access denied';
  end if;

  -- ELE-1867: approving is passing the criterion, so it goes through the one
  -- decision path (record_ac_decisions): append-only, verdict, learner told.
  if p_status = 'approved' then
    select * into p from college_ac_signoff_proposals where id = p_proposal_id;
    select user_id into v_learner from college_students where id = p.student_id;
    if v_learner is null then
      raise exception 'this learner has not joined yet, so the criterion cannot be passed' using errcode = 'P0001';
    end if;
    select qr.unit_code, qr.ac_code into v_unit, v_ac from qualification_requirements qr where qr.id = p.ac_id;
    if v_unit is null then
      select requirement_code into v_code from public._resolve_qualification(v_learner, null);
      select min(qr.unit_code), min(qr.ac_code) into v_unit, v_ac
        from qualification_requirements qr
       where qr.qualification_code = v_code and qr.ac_code = p.ac_code
      having count(*) = 1;
    end if;
    if v_unit is null then
      raise exception 'could not match % to one criterion; record it in Assess criteria', p.ac_code using errcode = 'P0001';
    end if;
    perform public.record_ac_decisions(
      v_learner,
      jsonb_build_array(jsonb_build_object('unit_code', v_unit, 'ac_code', v_ac)),
      'passed',
      coalesce(nullif(trim(p_notes), ''),
               'Passed on ' || case p.evidence_kind when 'quiz_attempt' then 'a quiz score of ' || round(p.score_pct) || '%'
                                                    else replace(p.evidence_kind, '_', ' ') end
               || coalesce(' (pass mark ' || p.threshold_pct || '%)', '') || '.'),
      case when p.evidence_kind = 'portfolio_item' and p.evidence_id is not null then array[p.evidence_id] else '{}'::uuid[] end,
      null,
      case p.evidence_kind when 'observation' then 'observation' when 'quiz_attempt' then 'questioning' else 'evidence_review' end,
      'assessor');
  end if;

  update college_ac_signoff_proposals
    set status = p_status, decided_by = auth.uid(),
        decided_at = now(), decision_notes = p_notes
    where id = p_proposal_id;
end;
$function$;
revoke all on function public.decide_ac_signoff(uuid, text, text) from public, anon;
grant execute on function public.decide_ac_signoff(uuid, text, text) to authenticated, service_role;

-- ── 7. get_portfolio_ac_state: + feedback provenance (trailing columns) ─────
-- Copied from the live definition (7 Oct). RETURNS TABLE changes need a drop;
-- the released client reads columns by name, so the extra two are harmless.
drop function if exists public.get_portfolio_ac_state(uuid);
create function public.get_portfolio_ac_state(p_user_id uuid default null::uuid)
 returns table(unit_code text, unit_title text, lo_number integer, lo_text text, ac_code text, ac_text text, state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text, decided_at timestamp with time zone, assessor_name text, iqa_verdict text, qualification_code text, assessor_id uuid, iqa_feedback text, decision_method text, suggested_item_ids uuid[], decision_feedback_source text, decision_feedback_confirmed_at timestamp with time zone)
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, null);
  if r.requirement_code is null then return; end if;

  return query
  with ev as (
    select c.portfolio_item_id item_id, c.unit_code u, c.ac_code a, c.source
      from public.portfolio_item_criteria c
     where c.learner_id = v_user
       and (c.qualification_code is null or c.qualification_code = r.requirement_code)
  ),
  open_items as (
    select si.portfolio_item_id, max(coalesce(ps.submitted_at, ps.created_at)) sent_at
      from public.portfolio_submission_items si
      join public.portfolio_submissions ps on ps.id = si.submission_id
     where ps.user_id = v_user and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
     group by si.portfolio_item_id
  ),
  cur as (
    select distinct on (d.unit_code, d.ac_code) d.*
      from public.portfolio_assessment_decisions d
     where d.learner_id = v_user and d.qualification_code = r.requirement_code and d.superseded_at is null
     order by d.unit_code, d.ac_code, d.decided_at desc
  )
  select qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text, qr.ac_code, qr.ac_text,
    case
      when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'
      when cur.decision = 'passed' and cur.iqa_verdict = 'not_confirmed' then 'iqa_rejected'
      when cur.decision in ('referred', 'not_yet')
           and exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                        where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'
                          and o.sent_at > cur.decided_at) then 'submitted'
      when cur.decision is not null then cur.decision
      when exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                    where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested') then 'submitted'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code
                    and ev.source <> 'ai_suggested') then 'claimed'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'suggested'
      else 'not_started'
    end,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'), '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code,
    cur.assessor_id, cur.iqa_feedback, cur.method,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source = 'ai_suggested'), '{}'),
    cur.feedback_source, cur.feedback_confirmed_at
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $function$;
revoke all on function public.get_portfolio_ac_state(uuid) from public, anon;
grant execute on function public.get_portfolio_ac_state(uuid) to authenticated, service_role;

-- ── 8. Share page: carry feedback provenance on each submission ────────────
-- Copied from the live get_shared_portfolio_structured (7 Oct); 3 keys added.
create or replace function public.get_shared_portfolio_structured(p_share_token text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  s public.portfolio_shares%rowtype;
  v jsonb;
  v_scope uuid[];
  v_comments jsonb;
  v_submissions jsonb;
begin
  select * into s from public.portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  v_scope := public._share_scope(s.entry_ids, s.portfolio_item_id);
  v := public._portfolio_structured(s.user_id, v_scope, true);

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', pc.id, 'context_type', coalesce(pc.context_type, 'evidence'),
           'context_id', pc.evidence_id, 'parent_id', pc.parent_id,
           'author_name', pc.author_name, 'author_role', pc.author_role,
           'author_initials', pc.author_initials, 'content', pc.content,
           'requires_action', coalesce(pc.requires_action, false),
           'is_resolved', coalesce(pc.is_resolved, false), 'created_at', pc.created_at)
           order by pc.created_at desc), '[]'::jsonb)
    into v_comments
    from public.portfolio_comments pc
   where pc.user_id = s.user_id
     and (v_scope is null or pc.evidence_id = any(v_scope));

  if v_scope is null then
    select coalesce(jsonb_agg(jsonb_build_object(
             'id', ps.id, 'category_id', ps.category_id,
             'category_name', coalesce(qc.name, 'Unit'),
             'qualification_id', ps.qualification_id, 'status', ps.status,
             'submitted_at', ps.submitted_at, 'reviewed_at', ps.reviewed_at,
             'assessor_feedback', ps.assessor_feedback, 'grade', ps.grade,
             'action_required', ps.action_required, 'strengths_noted', ps.strengths_noted,
             'areas_for_improvement', ps.areas_for_improvement,
             'submission_count', coalesce(ps.submission_count, 1),
             'signed_off_at', ps.signed_off_at,
             -- ELE-1926
             'feedback_source', ps.feedback_source,
             'feedback_confirmed_at', ps.feedback_confirmed_at,
             'feedback_confirmed_by_name', ps.feedback_confirmed_by_name)
             order by ps.submitted_at desc nulls last), '[]'::jsonb)
      into v_submissions
      from public.portfolio_submissions ps
      left join public.qualification_categories qc on qc.id = ps.category_id
     where ps.user_id = s.user_id;
  end if;

  update public.portfolio_shares
     set view_count = coalesce(view_count, 0) + 1, last_viewed_at = now()
   where id = s.id;

  return v
    || jsonb_build_object('apprentice', (v->'apprentice') || jsonb_build_object(
         'share_title', coalesce(s.title, 'Portfolio'), 'share_description', s.description))
    || jsonb_build_object('comments', v_comments, 'submissions', coalesce(v_submissions, '[]'::jsonb));
end;
$function$;

-- Copied from the live get_shared_portfolio_status (7 Oct); 3 keys added.
create or replace function public.get_shared_portfolio_status(p_share_token text)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_share record;
  v_result jsonb;
begin
  select * into v_share
  from portfolio_shares
  where token = p_share_token
    and is_active = true
    and (expires_at is null or expires_at > now());

  if v_share is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;

  select coalesce(jsonb_agg(
    jsonb_build_object(
      'id', ps.id,
      'category_id', ps.category_id,
      'category_name', coalesce(qc.name, 'Unknown Category'),
      'qualification_id', ps.qualification_id,
      'status', ps.status,
      'submitted_at', ps.submitted_at,
      'reviewed_at', ps.reviewed_at,
      'assessor_feedback', ps.assessor_feedback,
      'grade', ps.grade,
      'action_required', ps.action_required,
      'strengths_noted', ps.strengths_noted,
      'areas_for_improvement', ps.areas_for_improvement,
      'previous_feedback', ps.previous_feedback,
      'previous_grade', ps.previous_grade,
      'submission_count', coalesce(ps.submission_count, 1),
      'signed_off_at', ps.signed_off_at,
      'feedback_source', ps.feedback_source,
      'feedback_confirmed_at', ps.feedback_confirmed_at,
      'feedback_confirmed_by_name', ps.feedback_confirmed_by_name
    )
    order by ps.submitted_at desc
  ), '[]'::jsonb) into v_result
  from portfolio_submissions ps
  left join qualification_categories qc on qc.id = ps.category_id
  where ps.user_id = v_share.user_id;

  return jsonb_build_object(
    'submissions', v_result,
    'user_id', v_share.user_id
  );
end;
$function$;

-- ── 9. Realtime: decisions reach open screens within seconds (ELE-1868) ────
do $$
begin
  if not exists (select 1 from pg_publication_tables
                  where pubname = 'supabase_realtime' and schemaname = 'public'
                    and tablename = 'portfolio_assessment_decisions') then
    alter publication supabase_realtime add table public.portfolio_assessment_decisions;
  end if;
end $$;
