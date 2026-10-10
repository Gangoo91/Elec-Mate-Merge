-- ELE-1912 performance budget: get_portfolio_ac_state is the criterion read
-- model behind the learner's portfolio, the College Hub portfolio overview
-- (college_portfolio_overview calls it once per learner), the EPA pace board
-- (get_college_epa_pace, once per learner) and the gateway. It scanned the
-- learner's evidence (ev) up to five times PER CRITERION ROW through
-- correlated EXISTS / array_agg subqueries. This aggregates the evidence per
-- criterion once (evagg) and joins it.
--
-- Identical apart from the query body: same signature, return columns,
-- permission check, qualification resolution, ordering and answers.
-- Proved before applying: the old and new bodies were run side by side for
-- every learner in the database (30 learners, 10,724 criterion rows) and
-- returned exactly the same rows (EXCEPT ALL both ways = 0); total time
-- 167 ms -> 43 ms, worst learner 17 ms -> 3 ms.

CREATE OR REPLACE FUNCTION public.get_portfolio_ac_state(p_user_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(unit_code text, unit_title text, lo_number integer, lo_text text, ac_code text, ac_text text, state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text, decided_at timestamp with time zone, assessor_name text, iqa_verdict text, qualification_code text, assessor_id uuid, iqa_feedback text, decision_method text, suggested_item_ids uuid[], decision_feedback_source text, decision_feedback_confirmed_at timestamp with time zone, assessor_qualifications text[])
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  -- ELE-1912: the evidence for each criterion, aggregated ONCE, instead of
  -- five correlated scans of ev per criterion row. Same answers.
  evagg as (
    select ev.u, ev.a,
           bool_or(ev.source <> 'ai_suggested') has_claim,
           bool_or(ev.source <> 'ai_suggested' and o.portfolio_item_id is not null) has_open,
           max(o.sent_at) filter (where ev.source <> 'ai_suggested') max_open_sent,
           array_agg(distinct ev.item_id) filter (where ev.source <> 'ai_suggested') claim_ids,
           array_agg(distinct ev.item_id) filter (where ev.source = 'ai_suggested') sugg_ids
      from ev
      left join open_items o on o.portfolio_item_id = ev.item_id
     group by ev.u, ev.a
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
      when cur.decision in ('referred', 'not_yet') and ea.max_open_sent > cur.decided_at then 'submitted'
      when cur.decision is not null then cur.decision
      when ea.has_open then 'submitted'
      when ea.has_claim then 'claimed'
      when ea.u is not null then 'suggested'
      else 'not_started'
    end,
    coalesce(ea.claim_ids, '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code,
    cur.assessor_id, cur.iqa_feedback, cur.method,
    coalesce(ea.sugg_ids, '{}'),
    cur.feedback_source, cur.feedback_confirmed_at,
    cur.assessor_qualifications
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  left join evagg ea on ea.u = qr.unit_code and ea.a = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $function$

;
