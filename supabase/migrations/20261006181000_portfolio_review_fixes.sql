-- Review fixes, 6 Oct (independent code review of the Portfolio 2.0 backbone).
--  1. One notification per decision call, linking to where feedback is shown
--     (/apprentice/college/progress); was one row per criterion to /apprentice/portfolio.
--  2. IQA "not confirmed" is its own state (iqa_rejected), with the IQA's
--     feedback, and the state function returns assessor_id so the UI hides
--     confirm buttons on the viewer's own decisions.
--  3. An assessor invite can only be accepted by the email it was sent to; the
--     learner is told when it is accepted.

-- 1 ---------------------------------------------------------------------------
drop trigger if exists trg_pad_notify_learner on public.portfolio_assessment_decisions;

create or replace function public.record_ac_decisions(
  p_learner_id uuid,
  p_criteria jsonb,
  p_decision text,
  p_feedback text default null,
  p_evidence_item_ids uuid[] default '{}',
  p_submission_id uuid default null,
  p_method text default 'evidence_review',
  p_feedback_source text default 'assessor')
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_code text;
  c jsonb;
  n int := 0;
  v_list text := '';
  v_name text;
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
       evidence_item_ids, submission_id, method, assessor_id)
    values (p_learner_id, v_code, c->>'unit_code', c->>'ac_code', p_decision, p_feedback,
            coalesce(p_feedback_source, 'assessor'), coalesce(p_evidence_item_ids, '{}'),
            p_submission_id, p_method, auth.uid());
    n := n + 1;
    if n <= 3 then
      v_list := v_list || case when n > 1 then ', ' else '' end || (c->>'unit_code') || ' AC ' || (c->>'ac_code');
    end if;
  end loop;

  if n > 0 then
    select coalesce(full_name, 'Your assessor') into v_name from public.profiles where id = auth.uid();
    begin
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (p_learner_id, 'assessment_decision',
              case p_decision
                when 'passed' then n || case when n = 1 then ' criterion' else ' criteria' end || ' passed'
                when 'referred' then v_name || ' needs more on ' || n || case when n = 1 then ' criterion' else ' criteria' end
                else 'Not yet: ' || v_name || ' left feedback' end,
              v_list || case when n > 3 then ' and ' || (n - 3) || ' more' else '' end
                || coalesce(': ' || left(p_feedback, 160), ''),
              '/apprentice/college/progress',
              jsonb_build_object('decision', p_decision, 'count', n, 'assessor_id', auth.uid()));
    exception when others then null;
    end;
  end if;
  return jsonb_build_object('recorded', n, 'qualification_code', v_code);
end; $$;
revoke all on function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) from public, anon;
grant execute on function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) to authenticated;

-- 2 ---------------------------------------------------------------------------
drop function if exists public.get_portfolio_ac_state(uuid);
create function public.get_portfolio_ac_state(p_user_id uuid default null)
returns table (
  unit_code text, unit_title text, lo_number int, lo_text text, ac_code text, ac_text text,
  state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text,
  decided_at timestamptz, assessor_name text, iqa_verdict text, qualification_code text,
  assessor_id uuid, iqa_feedback text, decision_method text)
language plpgsql stable security definer set search_path to 'public' as $$
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
    select pi.id item_id,
      coalesce(
        (regexp_match(s, 'Unit\s*([A-Za-z0-9/._-]+)'))[1],
        (regexp_match(s, '^\s*([A-Za-z0-9/._-]+)\s+AC\b'))[1],
        (regexp_match(s, '([A-Za-z0-9/._-]+)\s*AC\b'))[1]) as u,
      (regexp_match(s, 'AC\s*([0-9]+(?:\.[0-9]+)*)'))[1] as a
    from public.portfolio_items pi, unnest(pi.assessment_criteria_met) s
    where pi.user_id = v_user
  ),
  open_items as (
    select si.portfolio_item_id
      from public.portfolio_submission_items si
      join public.portfolio_submissions ps on ps.id = si.submission_id
     where ps.user_id = v_user and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
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
      when cur.decision is not null then cur.decision
      when exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                    where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'submitted'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'claimed'
      else 'not_started'
    end,
    coalesce((select array_agg(distinct ev.item_id) from ev where ev.u = qr.unit_code and ev.a = qr.ac_code), '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code,
    cur.assessor_id, cur.iqa_feedback, cur.method
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $$;
revoke all on function public.get_portfolio_ac_state(uuid) from public, anon;
grant execute on function public.get_portfolio_ac_state(uuid) to authenticated;

-- 3 ---------------------------------------------------------------------------
create or replace function public.accept_assessor_invite(p_token text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare l public.portfolio_assessor_links%rowtype; v_name text; v_me text; v_my_name text;
begin
  if auth.uid() is null then return jsonb_build_object('error', 'sign_in_required'); end if;
  select * into l from public.portfolio_assessor_links where token = p_token for update;
  if l.id is null then return jsonb_build_object('error', 'invite_not_found'); end if;
  if l.status = 'revoked' then return jsonb_build_object('error', 'invite_revoked'); end if;
  if l.learner_id = auth.uid() then return jsonb_build_object('error', 'cannot_assess_self'); end if;
  if l.status = 'active' then
    if l.assessor_user_id = auth.uid() then
      return jsonb_build_object('success', true, 'learner_id', l.learner_id, 'already', true);
    end if;
    return jsonb_build_object('error', 'invite_already_used');
  end if;
  if l.expires_at < now() then return jsonb_build_object('error', 'invite_expired'); end if;
  -- A forwarded link must not hand a stranger the learner's evidence.
  select lower(email) into v_me from auth.users where id = auth.uid();
  if v_me is distinct from lower(trim(l.assessor_email)) then
    return jsonb_build_object('error', 'wrong_account', 'invited_email', l.assessor_email);
  end if;
  update public.portfolio_assessor_links
     set status = 'active', assessor_user_id = auth.uid(), accepted_at = now()
   where id = l.id;
  select coalesce(full_name, 'Apprentice') into v_name from public.profiles where id = l.learner_id;
  select coalesce(full_name, l.assessor_name, l.assessor_email) into v_my_name from public.profiles where id = auth.uid();
  begin
    insert into public.user_notifications (user_id, type, title, message, link, metadata)
    values (l.learner_id, 'assessor_accepted', coalesce(v_my_name, 'Your assessor') || ' accepted your invite',
            'They can now see your evidence and record decisions. You can remove them at any time.',
            '/apprentice/college/progress', jsonb_build_object('link_id', l.id));
  exception when others then null;
  end;
  return jsonb_build_object('success', true, 'learner_id', l.learner_id, 'learner_name', v_name, 'role', l.role);
end; $$;
revoke all on function public.accept_assessor_invite(text) from public, anon;
grant execute on function public.accept_assessor_invite(text) to authenticated;
