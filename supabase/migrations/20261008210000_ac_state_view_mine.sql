-- A tutor who can see a learner can see that learner's criteria (8 Oct 2026).
--
-- get_portfolio_ac_state let in the learner, assessing staff and staff with
-- learners.view_all, but not a tutor scoped to their own learners
-- (learners.view_mine). Those tutors already see the learner, their hours,
-- reviews and starting point (all gated on view_all OR view_mine), yet Student
-- 360, criteria gaps and the readiness screens showed their learners'
-- criteria as missing. college_can('learners.view_mine', college, student)
-- is true only for that tutor's own learners. Only the permission check
-- changes; the body is the live definition.

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
