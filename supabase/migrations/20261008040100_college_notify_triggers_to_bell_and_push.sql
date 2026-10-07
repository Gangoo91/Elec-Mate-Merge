-- ELE-1913 (2/4): the College Hub triggers that only wrote push_notification_log
-- (no push, not in the header bell) now go through notify_user, with a deep
-- link to the item. Plus link fixes on three direct-insert triggers and the
-- assessor decision RPC, and the safeguarding re-escalation cron.

-- Safeguarding concern -> DSL / deputies (or admins + heads when no lead set).
-- Importance 2: goes through quiet hours; cannot be switched off.
create or replace function public.tg_notify_safeguarding()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid;
  v_has_lead boolean;
  v_link text := '/college?section=safeguardingqueue&concern=' || new.id;
begin
  if new.kind = 'safeguarding' or new.visibility = 'safeguarding' then
    v_has_lead := public._safeguarding_has_lead(new.college_id);
    for v_uid in
      select distinct s.user_id
      from college_staff s
      where s.college_id = new.college_id
        and s.user_id is not null
        and s.archived_at is null
        and lower(coalesce(s.status, 'active')) = 'active'
        and s.id is distinct from new.author_id
        and case when v_has_lead then (s.is_dsl is true or s.is_deputy_dsl is true)
                 else s.role in ('admin', 'head_of_department') end
    loop
      perform public.notify_user(
        v_uid, 'safeguarding_logged',
        case when v_has_lead then 'Safeguarding concern logged' else 'Safeguarding concern, no DSL set' end,
        case when v_has_lead
             then 'A safeguarding concern has been logged at your college. Open it to acknowledge.'
             else 'A safeguarding concern was logged but no Designated Safeguarding Lead is set. Review it and assign a DSL.' end,
        jsonb_build_object('route', v_link, 'ref_id', new.id::text, 'concern_id', new.id));
    end loop;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_safeguarding] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

-- Pastoral flag / concern -> the learner's tutors, else heads, else admins.
create or replace function public.tg_notify_pastoral_concern()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_author_user uuid;
  v_learner uuid;
  v_uids uuid[] := '{}';
  v_title text; v_body text;
  v_uid uuid;
  v_link text := '/college?section=student360&studentId=' || new.student_id || '#notes';
begin
  if new.kind not in ('flag', 'concern')
     or new.visibility in ('author_only', 'safeguarding') then
    return new;
  end if;

  select user_id into v_author_user from college_staff where id = new.author_id;
  select user_id into v_learner from college_students where id = new.student_id;

  if new.visibility = 'tutors' and v_learner is not null then
    select coalesce(array_agg(u), '{}') into v_uids
    from public._learner_tutor_uids(v_learner) u
    where u is distinct from v_author_user;
    v_title := 'A learner has been flagged';
    v_body := 'A flag has been raised about a learner you support. Open their record to review.';
  end if;

  if new.visibility = 'course_lead' or cardinality(v_uids) = 0 then
    select coalesce(array_agg(distinct s.user_id), '{}') into v_uids
    from college_staff s
    where s.college_id = new.college_id and s.role = 'head_of_department'
      and s.user_id is not null and s.archived_at is null
      and s.id is distinct from new.author_id;
    v_title := 'A concern needs your attention';
    v_body := 'A concern has been logged about a learner at your college. Open their record to review.';
  end if;

  if cardinality(v_uids) = 0 then
    select coalesce(array_agg(distinct s.user_id), '{}') into v_uids
    from college_staff s
    where s.college_id = new.college_id and s.role = 'admin'
      and s.user_id is not null and s.archived_at is null
      and s.id is distinct from new.author_id;
    v_title := 'A learner concern needs attention';
    v_body := 'A flagged concern about a learner has not reached a tutor or course lead. Review it and check staff roles are assigned.';
  end if;

  foreach v_uid in array v_uids loop
    perform public.notify_user(v_uid, 'pastoral_flag', v_title, v_body,
      jsonb_build_object('route', v_link, 'ref_id', new.id::text, 'note_id', new.id));
  end loop;
  return new;
exception when others then
  raise warning '[tg_notify_pastoral_concern] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

create or replace function public.tg_notify_grade_recorded()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_user uuid;
begin
  if lower(coalesce(new.status, '')) = 'graded'
     and (tg_op = 'INSERT' or lower(coalesce(old.status, '')) is distinct from 'graded') then
    select user_id into v_user from college_students where id = new.student_id;
    if v_user is not null then
      perform public.notify_user(v_user, 'grade_recorded', 'New grade recorded',
        'Your assessment' || coalesce(' for ' || nullif(new.unit_name, ''), '') || ' has been graded.',
        jsonb_build_object('route', '/apprentice/college/progress', 'ref_id', new.id::text, 'grade_id', new.id));
    end if;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_grade_recorded] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

create or replace function public.tg_notify_ilp_reviewed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_user uuid;
begin
  if new.last_reviewed is not null
     and (tg_op = 'INSERT' or old.last_reviewed is distinct from new.last_reviewed) then
    select user_id into v_user from college_students where id = new.student_id;
    if v_user is not null then
      perform public.notify_user(v_user, 'ilp_reviewed', 'Learning plan reviewed',
        'Your tutor has reviewed your learning plan. Open it to see your updated targets.',
        jsonb_build_object('route', '/apprentice/college/plan', 'ref_id', new.id::text, 'ilp_id', new.id));
    end if;
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_ilp_reviewed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

create or replace function public.tg_notify_epa_judgement()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_user_id uuid; v_title text; v_body text; v_prev text;
begin
  if new.source is distinct from 'tutor'
     or new.is_current is not true
     or not (tg_op = 'INSERT' or old.verdict is distinct from new.verdict) then
    return new;
  end if;

  if tg_op = 'INSERT' then
    select verdict into v_prev
    from public.college_epa_judgements
    where superseded_by = new.id and source = 'tutor'
    order by created_at desc limit 1;
    if v_prev is not null and v_prev = new.verdict then
      return new;
    end if;
  end if;

  select user_id into v_user_id from college_students where id = new.college_student_id;
  if v_user_id is null then return new; end if;

  if new.verdict = 'ready' then
    v_title := 'EPA gateway: ready';
    v_body  := 'Your tutor confirms you''re ready for End-Point Assessment.';
  elsif new.verdict = 'almost' then
    v_title := 'EPA gateway reviewed';
    v_body  := 'You''re almost there. Your tutor has set a few actions to complete before EPA.';
  else
    v_title := 'EPA gateway reviewed';
    v_body  := 'Your tutor has reviewed your EPA readiness and added actions to complete first.';
  end if;

  perform public.notify_user(v_user_id, 'epa_judgement', v_title, v_body,
    jsonb_build_object('route', '/apprentice/college/epa', 'ref_id', new.id::text, 'judgement_id', new.id));
  return new;
exception when others then
  raise warning '[tg_notify_epa_judgement] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

create or replace function public.tg_notify_gateway_passed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.user_id is not null
     and new.gateway_passed is true
     and (tg_op = 'INSERT' or old.gateway_passed is distinct from new.gateway_passed) then
    perform public.notify_user(new.user_id, 'gateway_passed', 'EPA gateway passed',
      'You''ve passed the EPA gateway. You''re ready for End-Point Assessment.',
      jsonb_build_object('route', '/apprentice/college/epa', 'ref_id', new.id::text));
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_gateway_passed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

create or replace function public.tg_notify_submission_reviewed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.status is distinct from old.status
     and new.status in ('feedback_given', 'signed_off', 'iqa_verified') then
    perform public.notify_user(new.user_id, 'portfolio_reviewed',
      case new.status
        when 'feedback_given' then 'New feedback on your portfolio'
        when 'signed_off'     then 'Portfolio signed off'
        else 'Portfolio verified' end,
      case new.status
        when 'feedback_given' then 'Your assessor left feedback on a portfolio submission. Open it to see what to do next.'
        when 'signed_off'     then 'An assessor has signed off one of your portfolio submissions.'
        else 'A portfolio submission has been quality-verified by the IQA.' end,
      jsonb_build_object('route', '/apprentice/college/progress',
                         'ref_id', new.id::text || ':' || new.status, 'submission_id', new.id));
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_submission_reviewed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

-- Diary question -> tutors: land on the learner's diary, not the overview.
create or replace function public.tg_site_diary_question_notify()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  q text := btrim(coalesce(new.issues_or_questions, ''));
  v_student record;
  v_name text;
  v_uid uuid;
begin
  if not new.share_with_tutor then return new; end if;
  if length(q) <= 2
     or lower(regexp_replace(q, '[.!]+$', '')) in ('none', 'n/a', 'na', 'nope', 'nothing', 'no') then
    return new;
  end if;
  if tg_op = 'UPDATE'
     and old.share_with_tutor
     and old.issues_or_questions is not distinct from new.issues_or_questions then
    return new;
  end if;

  begin
    select s.id, s.name into v_student
    from public.college_students s
    where s.user_id = new.user_id
    order by s.created_at desc
    limit 1;
    if v_student.id is null then return new; end if;
    v_name := coalesce(nullif(split_part(v_student.name, ' ', 1), ''), 'A learner');

    for v_uid in select public._learner_tutor_uids(new.user_id) loop
      perform public.notify_user(v_uid, 'diary_question',
        v_name || ' asked a question in their site diary',
        left(q, 160),
        jsonb_build_object('route', '/college?section=student360&studentId=' || v_student.id || '#diary',
                           'ref_id', new.id::text,
                           'diary_entry_id', new.id, 'college_student_id', v_student.id));
    end loop;
  exception when others then
    null;
  end;
  return new;
end;
$function$;

-- Hours fixed and resent -> tutors: bell only (the 08:00 digest pushes hours),
-- landing on that entry in the hours inbox.
create or replace function public.tg_otj_resubmit_notify_tutor()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_student record;
  v_name text;
  v_hours numeric;
  v_txt text;
  v_uid uuid;
begin
  if coalesce(old.verification_status, '') <> 'rejected'
     or coalesce(new.verification_status, '') <> 'pending'
     or coalesce(new.source_kind, '') <> 'apprentice_submitted' then
    return new;
  end if;

  begin
    select s.id, s.name into v_student
    from public.college_students s
    where s.user_id = new.student_id
    order by s.created_at desc
    limit 1;
    if v_student.id is null then return new; end if;
    v_name := coalesce(nullif(split_part(v_student.name, ' ', 1), ''), 'An apprentice');
    v_hours := round(coalesce(new.duration_minutes, 0) / 60.0, 1);
    v_txt := case when v_hours = trunc(v_hours) then trunc(v_hours)::int::text else v_hours::text end
             || case when v_hours = 1 then ' training hour' else ' training hours' end;

    for v_uid in select public._learner_tutor_uids(new.student_id) loop
      continue when v_uid = new.recorded_by;
      perform public.notify_user(v_uid, 'otj_resubmitted',
        v_name || ' fixed and resent ' || v_txt,
        coalesce(new.title, 'Off-the-job training') || ' · ' || to_char(new.activity_date, 'FMDD Mon')
          || ' · tap to review',
        jsonb_build_object('route', '/college/otj/inbox?entry=' || new.id,
                           'ref_id', new.id::text,
                           'otj_entry_id', new.id, 'college_student_id', v_student.id));
    end loop;
  exception when others then
    null;
  end;
  return new;
end;
$function$;

-- Review booked / moved -> learner: open that review.
create or replace function public.tg_tripartite_notify_booking()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_user uuid;
begin
  if new.scheduled_at is null or new.status = 'cancelled' or new.locked_at is not null then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.scheduled_at is not distinct from old.scheduled_at then
    return new;
  end if;
  select user_id into v_user from college_students where id = new.student_id;
  if v_user is null then return new; end if;
  perform public.notify_user(v_user, 'tripartite_booked',
    case when tg_op = 'INSERT' then 'Progress review booked' else 'Progress review moved' end,
    to_char(new.scheduled_at at time zone 'Europe/London', 'Dy DD Mon, HH24:MI')
      || ' with your tutor and employer. Add your view before you meet.',
    jsonb_build_object('route', '/apprentice/college-plan?review=' || new.id,
                       'ref_id', new.id::text || ':' || to_char(new.scheduled_at, 'YYYYMMDDHH24MI'),
                       'review_id', new.id));
  return new;
exception when others then
  raise warning '[tg_tripartite_notify_booking] %: %', new.id, sqlerrm;
  return new;
end; $function$;

-- Assessor decision -> learner. Sent back: open capture with those criteria
-- ticked (same link the learner's Do next uses). Passed with evidence: open
-- that evidence. Otherwise the qualification page.
create or replace function public.record_ac_decisions(p_learner_id uuid, p_criteria jsonb, p_decision text, p_feedback text DEFAULT NULL::text, p_evidence_item_ids uuid[] DEFAULT '{}'::uuid[], p_submission_id uuid DEFAULT NULL::uuid, p_method text DEFAULT 'evidence_review'::text, p_feedback_source text DEFAULT 'assessor'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_code text;
  c jsonb;
  n int := 0;
  v_list text := '';
  v_name text;
  v_acs text := '';
  v_link text;
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
    if n <= 20 then
      v_acs := v_acs || case when n > 1 then ',' else '' end || (c->>'unit_code') || ':' || (c->>'ac_code');
    end if;
  end loop;

  if n > 0 then
    select coalesce(full_name, 'Your assessor') into v_name from public.profiles where id = auth.uid();
    v_link := case
      when p_decision <> 'passed' then '/apprentice/hub?capture=1&ac=' || v_acs
      when cardinality(coalesce(p_evidence_item_ids, '{}')) > 0 then '/apprentice/hub?item=' || p_evidence_item_ids[1]
      else '/apprentice/college/progress' end;
    perform public.notify_user(p_learner_id, 'assessment_decision',
      case p_decision
        when 'passed' then n || case when n = 1 then ' criterion' else ' criteria' end || ' passed'
        when 'referred' then v_name || ' needs more on ' || n || case when n = 1 then ' criterion' else ' criteria' end
        else 'Not yet: ' || v_name || ' left feedback' end,
      v_list || case when n > 3 then ' and ' || (n - 3) || ' more' else '' end
        || coalesce(': ' || left(p_feedback, 160), ''),
      jsonb_build_object('route', v_link, 'decision', p_decision, 'count', n, 'assessor_id', auth.uid()));
  end if;
  return jsonb_build_object('recorded', n, 'qualification_code', v_code);
end; $function$;

-- Safeguarding re-escalation (was cron 135 writing push_notification_log only).
create or replace function public.safeguarding_reescalate()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  n int := 0;
begin
  -- Tier 1 (4h unacknowledged): designated leads.
  -- Tier 2 (24h unacknowledged): leads plus admins and heads of department.
  for r in
    select distinct s.user_id, pn.id, t.tier
    from pastoral_notes pn
    cross join (values (1), (2)) as t(tier)
    join college_staff s
      on s.college_id = pn.college_id
     and s.user_id is not null
     and s.archived_at is null
     and (s.is_dsl is true or s.is_deputy_dsl is true
          or (t.tier = 2 and s.role in ('admin', 'head_of_department')))
    where (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
      and pn.acknowledged_at is null
      and pn.action_completed_at is null
      and pn.closed_at is null
      and pn.created_at < now() - case when t.tier = 1 then interval '4 hours' else interval '24 hours' end
      and not exists (
        select 1 from push_notification_log l
        where l.reference_id = pn.id::text
          and l.type = case when t.tier = 1 then 'safeguarding_escalation' else 'safeguarding_escalation_24h' end)
      and not exists (
        select 1 from user_notifications un
        where un.type = 'safeguarding_escalation'
          and un.metadata->>'ref_id' = pn.id::text || ':' || t.tier)
  loop
    perform public.notify_user(r.user_id, 'safeguarding_escalation',
      case when r.tier = 1 then 'Safeguarding concern not yet acknowledged'
           else 'Safeguarding concern escalated (24 hours)' end,
      case when r.tier = 1
           then 'A safeguarding concern logged 4 or more hours ago has not been acknowledged. Review and acknowledge it now.'
           else 'A safeguarding concern has been unacknowledged for 24 hours and is now escalated to college leadership.' end,
      jsonb_build_object('route', '/college?section=safeguardingqueue&concern=' || r.id,
                         'ref_id', r.id::text || ':' || r.tier, 'concern_id', r.id));
    n := n + 1;
  end loop;
  return n;
end;
$function$;

revoke all on function public.safeguarding_reescalate() from public, anon, authenticated;

select cron.alter_job(
  (select jobid from cron.job where jobname = 'safeguarding-reescalation'),
  command := 'select public.safeguarding_reescalate();');
