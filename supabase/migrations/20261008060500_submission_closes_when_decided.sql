-- ELE-1863 / ELE-1867: a submission closes when every criterion it carries
-- has a decision.
--
-- Decisions are recorded per criterion (record_ac_decisions, or a direct
-- insert by assessing staff), and nothing moved the submission on: the old
-- client path that set portfolio_submissions.status (useAssessorActions) has
-- no live caller. So a fully decided submission stayed "submitted" and sat in
-- every "Waiting for a decision" queue for ever (be77d632…, 5 of 5 decided,
-- found 8 Oct).
--
-- After each decision, every open submission of that learner is checked: the
-- criteria are the learner's own claims (not AI suggestions) on the items in
-- portfolio_submission_items; each needs a current decision made at or after
-- the submission was sent. All passed → signed_off (grade 'pass', so the LTI
-- grade sync never sends 0); any other outcome → feedback_given.
--
-- The learner was already told by record_ac_decisions ('assessment_decision'),
-- so tg_notify_submission_reviewed stays quiet for this automatic close.
-- Approved by Andrew 8 Oct ("do it all, you have my go ahead").

create or replace function public._close_decided_submission(p_submission_id uuid, p_assessor uuid)
returns text
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  s public.portfolio_submissions%rowtype;
  n int; n_decided int; n_passed int;
  v_status text;
begin
  select * into s from public.portfolio_submissions where id = p_submission_id for update;
  if s.id is null or s.status not in ('submitted', 'under_review', 'resubmitted') then
    return null;
  end if;

  with crit as (
    select distinct c.unit_code, c.ac_code
      from public.portfolio_submission_items si
      join public.portfolio_item_criteria c
        on c.portfolio_item_id = si.portfolio_item_id and c.source <> 'ai_suggested'
     where si.submission_id = s.id
  ), cur as (
    select cr.unit_code, cr.ac_code, d.decision
      from crit cr
      left join lateral (
        select d.decision
          from public.portfolio_assessment_decisions d
         where d.learner_id = s.user_id and d.unit_code = cr.unit_code and d.ac_code = cr.ac_code
           and d.superseded_at is null and d.decided_at >= coalesce(s.submitted_at, s.created_at)
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

create or replace function public._pad_close_submissions()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_sub uuid;
begin
  for v_sub in
    select id from public.portfolio_submissions
     where user_id = new.learner_id and status in ('submitted', 'under_review', 'resubmitted')
  loop
    perform public._close_decided_submission(v_sub, new.assessor_id);
  end loop;
  return new;
exception when others then
  -- Never lose a decision because the queue tidy-up failed.
  raise warning '[_pad_close_submissions] %: %', new.id, sqlerrm;
  return new;
end; $$;

-- Named to sort after trg_pad_after_insert, which supersedes older decisions first.
drop trigger if exists trg_pad_zz_close_submissions on public.portfolio_assessment_decisions;
create trigger trg_pad_zz_close_submissions
  after insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_close_submissions();

create or replace function public.tg_notify_submission_reviewed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_item uuid;
begin
  -- The learner already had an 'assessment_decision' notification for the
  -- decisions that closed this submission.
  if coalesce(current_setting('app.submission_auto_close', true), 'off') = 'on' then
    return new;
  end if;
  if new.status is distinct from old.status
     and new.status in ('feedback_given', 'signed_off', 'iqa_verified') then
    select si.portfolio_item_id into v_item from public.portfolio_submission_items si
     where si.submission_id = new.id limit 1;
    perform public.notify_user(new.user_id, 'portfolio_reviewed',
      case new.status
        when 'feedback_given' then 'New feedback on your portfolio'
        when 'signed_off'     then 'Portfolio signed off'
        else 'Portfolio verified' end,
      case new.status
        when 'feedback_given' then 'Your assessor left feedback on a portfolio submission. Open it to see what to do next.'
        when 'signed_off'     then 'An assessor has signed off one of your portfolio submissions.'
        else 'A portfolio submission has been quality-verified by the IQA.' end,
      jsonb_build_object('route', coalesce('/apprentice/hub?item=' || v_item, '/apprentice/hub'), 'evidence_id', v_item,
                         'ref_id', new.id::text || ':' || new.status, 'submission_id', new.id));
  end if;
  return new;
exception when others then
  raise warning '[tg_notify_submission_reviewed] %: %', new.id, sqlerrm;
  return new;
end;
$function$;

-- Close the submissions already fully decided, quietly (the decisions were notified).
do $$
declare r record;
begin
  for r in
    select s.id,
           (select d.assessor_id from public.portfolio_assessment_decisions d
             where d.learner_id = s.user_id order by d.decided_at desc limit 1) as assessor
      from public.portfolio_submissions s
     where s.status in ('submitted', 'under_review', 'resubmitted')
  loop
    perform public._close_decided_submission(r.id, r.assessor);
  end loop;
end $$;
