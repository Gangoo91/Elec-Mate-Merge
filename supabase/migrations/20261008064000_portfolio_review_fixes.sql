-- Portfolio review fixes, 8 Oct 2026 (found by a read-only review of the 7–8 Oct
-- portfolio work; approved by Andrew: "i give you permission to do anything backend").
--
-- 1. get_portfolio_ac_state: staff who may VIEW a learner (EQA, support,
--    anyone with learners.view_all) can read the criterion state. It raised
--    for them, so Student 360 and the evidence timeline fell back to the old
--    coverage figures and EQA saw different numbers from the tutor. Reading
--    only; deciding still needs _can_assess.
-- 2. _close_decided_submission: a criterion is still waiting exactly when the
--    learner's own state says so (no current decision, or sent back and sent
--    again since). Before, a resend (S2) of an item whose first submission
--    (S1) was partly decided could never close, because criteria decided
--    before S2 was sent never counted for S2. Claims against another
--    qualification no longer block closing. Re-runs the tidy-up.
-- 3. _shared_portfolio_record: a criterion the IQA did not confirm reads as
--    needs more ('referred') on the shared page, as it does for the learner,
--    not "passed".
-- 4. sign_witness_statement: the fingerprint is taken over exactly what is
--    stored (trimmed and cut to length) with the signing time in UTC ISO
--    form, so it can be recomputed from the row.

-- ── 1 ──────────────────────────────────────────────────────────────────────
create or replace function public.get_portfolio_ac_state(p_user_id uuid default null::uuid)
returns table(unit_code text, unit_title text, lo_number integer, lo_text text, ac_code text, ac_text text,
              state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text,
              decided_at timestamp with time zone, assessor_name text, iqa_verdict text,
              qualification_code text, assessor_id uuid, iqa_feedback text, decision_method text,
              suggested_item_ids uuid[], decision_feedback_source text,
              decision_feedback_confirmed_at timestamp with time zone,
              assessor_qualifications text[])
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (
       v_user = auth.uid()
       or public._can_assess(v_user)
       or exists (select 1 from public.college_students cs
                   where cs.user_id = v_user
                     and public.college_can('learners.view_all', cs.college_id, cs.id))
     ) then
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
    cur.feedback_source, cur.feedback_confirmed_at,
    cur.assessor_qualifications
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $function$;

-- ── 2 ──────────────────────────────────────────────────────────────────────
create or replace function public._close_decided_submission(p_submission_id uuid, p_assessor uuid)
returns text
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  s public.portfolio_submissions%rowtype;
  v_code text;
  n int; n_decided int; n_passed int;
  v_status text;
begin
  select * into s from public.portfolio_submissions where id = p_submission_id for update;
  if s.id is null or s.status not in ('submitted', 'under_review', 'resubmitted') then
    return null;
  end if;
  select requirement_code into v_code from public._resolve_qualification(s.user_id, null);

  with crit as (
    select distinct c.unit_code, c.ac_code
      from public.portfolio_submission_items si
      join public.portfolio_item_criteria c
        on c.portfolio_item_id = si.portfolio_item_id and c.source <> 'ai_suggested'
     where si.submission_id = s.id
       and (v_code is null or c.qualification_code is null or c.qualification_code = v_code)
  ), cur as (
    -- Read as get_portfolio_ac_state reads a criterion: still waiting when it
    -- has no current decision, or was sent back and has been sent again since
    -- (an open submission carrying it was sent after that decision). A pass
    -- stands, whenever it was given.
    select cr.unit_code, cr.ac_code,
           case
             when d.decision is null then null
             when d.decision in ('referred', 'not_yet') and exists (
                    select 1
                      from public.portfolio_submissions ps
                      join public.portfolio_submission_items si2 on si2.submission_id = ps.id
                      join public.portfolio_item_criteria c2
                        on c2.portfolio_item_id = si2.portfolio_item_id and c2.source <> 'ai_suggested'
                     where ps.user_id = s.user_id
                       and (ps.id = s.id or ps.status in ('submitted', 'under_review', 'resubmitted'))
                       and c2.unit_code = cr.unit_code and c2.ac_code = cr.ac_code
                       and coalesce(ps.submitted_at, ps.created_at) > d.decided_at)
               then null
             else d.decision
           end as decision
      from crit cr
      left join lateral (
        select d.decision, d.decided_at
          from public.portfolio_assessment_decisions d
         where d.learner_id = s.user_id and d.unit_code = cr.unit_code and d.ac_code = cr.ac_code
           and (v_code is null or d.qualification_code = v_code)
           and d.superseded_at is null
         order by d.decided_at desc
         limit 1
      ) d on true
  )
  select count(*), count(decision), count(*) filter (where decision = 'passed')
    into n, n_decided, n_passed
    from cur;

  if n = 0 or n_decided < n then
    return null;
  end if;

  v_status := case when n_passed = n then 'signed_off' else 'feedback_given' end;
  perform set_config('app.submission_auto_close', 'on', true);
  update public.portfolio_submissions
     set status = v_status,
         reviewed_at = now(),
         reviewed_by = p_assessor,
         assessor_id = coalesce(assessor_id, p_assessor),
         last_feedback_at = now(),
         grade = case when v_status = 'signed_off' then coalesce(grade, 'pass') else grade end,
         signed_off_at = case when v_status = 'signed_off' then now() else signed_off_at end,
         signed_off_by = case when v_status = 'signed_off' then p_assessor else signed_off_by end
   where id = s.id;
  perform set_config('app.submission_auto_close', 'off', true);
  return v_status;
end; $$;

revoke all on function public._close_decided_submission(uuid, uuid) from public, anon, authenticated;

do $$
declare r record;
begin
  for r in
    select s.id,
           (select d.assessor_id from public.portfolio_assessment_decisions d
             where d.learner_id = s.user_id order by d.decided_at desc limit 1) as assessor
      from public.portfolio_submissions s
     where s.status in ('submitted', 'under_review', 'resubmitted')
     order by s.submitted_at nulls last
  loop
    perform public._close_decided_submission(r.id, r.assessor);
  end loop;
end $$;

-- ── 3 ──────────────────────────────────────────────────────────────────────
create or replace function public._shared_portfolio_record(p_user_id uuid, p_scope uuid[])
 returns jsonb
 language plpgsql
 stable
 security definer
 set search_path to 'public'
as $function$
declare
  r record;
  v_decisions jsonb := '[]'::jsonb;
  v_witnesses jsonb;
  v_filter boolean := p_scope is not null and array_length(p_scope, 1) is not null;
begin
  select * into r from public._resolve_qualification(p_user_id, null);

  -- Criteria with a current decision, or sent to an assessor and waiting,
  -- read as get_portfolio_ac_state reads them. A share scoped to some
  -- evidence only shows criteria that evidence is mapped to.
  if r.requirement_code is not null then
    with ev as (
      select c.portfolio_item_id item_id, c.unit_code u, c.ac_code a
        from public.portfolio_item_criteria c
       where c.learner_id = p_user_id
         and c.source <> 'ai_suggested'
         and (c.qualification_code is null or c.qualification_code = r.requirement_code)
    ),
    open_items as (
      select si.portfolio_item_id, max(coalesce(ps.submitted_at, ps.created_at)) sent_at
        from public.portfolio_submission_items si
        join public.portfolio_submissions ps on ps.id = si.submission_id
       where ps.user_id = p_user_id
         and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
       group by si.portfolio_item_id
    ),
    cur as (
      select distinct on (d.unit_code, d.ac_code) d.*
        from public.portfolio_assessment_decisions d
       where d.learner_id = p_user_id
         and d.qualification_code = r.requirement_code
         and d.superseded_at is null
       order by d.unit_code, d.ac_code, d.decided_at desc
    ),
    acs as (
      select qr.unit_code, qr.unit_title, qr.lo_number, qr.ac_code, qr.ac_text, cur.decision,
             cur.feedback, cur.assessor_name, cur.decided_at, cur.iqa_verdict, cur.iqa_at,
             cur.evidence_item_ids,
             (select max(o.sent_at) from ev join open_items o on o.portfolio_item_id = ev.item_id
               where ev.u = qr.unit_code and ev.a = qr.ac_code) sent_at
        from public.qualification_requirements qr
        left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
       where qr.qualification_code = r.requirement_code
    )
    select coalesce(jsonb_agg(jsonb_build_object(
             'unit_code', x.unit_code,
             'unit_title', x.unit_title,
             'ac_code', x.ac_code,
             'ac_text', x.ac_text,
             'state', case
                        when x.decision in ('referred', 'not_yet') and x.sent_at > x.decided_at then 'submitted'
                        when x.decision = 'passed' and x.iqa_verdict = 'not_confirmed' then 'referred'
                        when x.decision is not null then x.decision
                        else 'submitted'
                      end,
             'decision', x.decision,
             'feedback', x.feedback,
             'assessor_name', x.assessor_name,
             'decided_at', x.decided_at,
             'iqa_verdict', x.iqa_verdict,
             'iqa_at', x.iqa_at)
             order by x.unit_code, x.lo_number, x.ac_code), '[]'::jsonb)
      into v_decisions
      from acs x
     where (x.decision is not null or x.sent_at is not null)
       and (not v_filter
            or x.evidence_item_ids && p_scope
            or exists (select 1 from ev
                        where ev.item_id = any(p_scope) and ev.u = x.unit_code and ev.a = x.ac_code));
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', w.id,
           'portfolio_item_id', w.portfolio_item_id,
           'witness_name', w.witness_name,
           'witness_role', w.witness_role,
           'witness_company', w.witness_company,
           'statement', w.statement,
           'criteria', w.criteria,
           'statement_hash', w.statement_hash,
           'signed_at', w.signed_at)
           order by w.signed_at desc), '[]'::jsonb)
    into v_witnesses
    from public.portfolio_witness_statements w
   where w.learner_id = p_user_id
     and w.status = 'signed'
     and (not v_filter or w.portfolio_item_id = any(p_scope));

  return jsonb_build_object('decisions', v_decisions, 'witnesses', v_witnesses);
end;
$function$;

revoke all on function public._shared_portfolio_record(uuid, uuid[]) from public, anon, authenticated;
grant execute on function public._shared_portfolio_record(uuid, uuid[]) to service_role;

-- ── 4 ──────────────────────────────────────────────────────────────────────
create or replace function public.sign_witness_statement(
  p_token text,
  p_name text,
  p_role text,
  p_company text,
  p_statement text,
  p_signature text,
  p_confirmed boolean default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  w public.portfolio_witness_statements%rowtype;
  v_hash text; v_ip text;
  v_now timestamptz := now();
  v_name text := left(trim(coalesce(p_name, '')), 120);
  v_role text := nullif(left(trim(coalesce(p_role, '')), 120), '');
  v_company text := nullif(left(trim(coalesce(p_company, '')), 160), '');
  v_statement text := left(trim(coalesce(p_statement, '')), 6000);
begin
  if v_name = '' or v_statement = '' or coalesce(p_signature, '') = '' then
    return jsonb_build_object('error', 'name_statement_and_signature_required');
  end if;
  if p_confirmed is false then
    return jsonb_build_object('error', 'confirmation_required');
  end if;
  select * into w from public.portfolio_witness_statements where token = p_token for update;
  if w.id is null then return jsonb_build_object('error', 'not_found'); end if;
  if w.status <> 'requested' then return jsonb_build_object('error', 'already_' || w.status); end if;
  if w.expires_at < v_now then return jsonb_build_object('error', 'expired'); end if;
  if length(p_signature) > 400000 then return jsonb_build_object('error', 'signature_too_large'); end if;
  begin
    v_ip := left(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', 60);
  exception when others then v_ip := null; end;
  -- Over exactly what is stored, with the time in UTC ISO form, so the
  -- fingerprint can be recomputed from the row.
  v_hash := encode(extensions.digest(concat_ws('|', w.id, v_name, coalesce(v_role, ''), coalesce(v_company, ''),
                                    v_statement, coalesce(w.evidence_hash, ''),
                                    to_char(v_now at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
                                    case when p_confirmed then 'confirmed_observed' end), 'sha256'), 'hex');
  update public.portfolio_witness_statements
     set witness_name = v_name, witness_role = v_role, witness_company = v_company,
         statement = v_statement, signature_data = p_signature, status = 'signed',
         signed_at = v_now, statement_hash = v_hash, signer_ip = v_ip, witness_confirmed = p_confirmed
   where id = w.id;
  return jsonb_build_object('success', true, 'statement_hash', v_hash);
end; $$;

revoke all on function public.sign_witness_statement(text, text, text, text, text, text, boolean) from public;
grant execute on function public.sign_witness_statement(text, text, text, text, text, text, boolean) to anon, authenticated, service_role;
