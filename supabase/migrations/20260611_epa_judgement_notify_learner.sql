-- ============================================================================
-- College Hub — notify the learner when a TUTOR records an EPA gateway verdict.
--
-- Gap: the only EPA notification (tg_notify_gateway_passed) hangs off
-- epa_gateway_checklist.gateway_passed, which is entirely null/unused. The real
-- decision lives in college_epa_judgements.verdict. A tutor marking a learner
-- 'not_yet' / 'almost' / 'refer' (not ready) was completely SILENT — the learner
-- was never told their gateway was reviewed or what to do next. And the positive
-- 'ready' case never reached them either.
--
-- Rules:
--   * Only source='tutor' judgements notify. AI rows (source='ai') are
--     predictions, not decisions — notifying on them would alarm/mislead.
--   * Only the current judgement (is_current), on insert or when the verdict
--     actually changes.
--   * Framed constructively — never "failed". 'not ready' points the learner to
--     their action plan rather than dumping raw blockers.
--   * Skips learners with no linked account (college_students.user_id null).
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_notify_epa_judgement()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_user_id uuid;
  v_title   text;
  v_body    text;
begin
  -- only authoritative tutor decisions, current, on insert or verdict change
  if new.source is distinct from 'tutor'
     or new.is_current is not true
     or not (tg_op = 'INSERT' or old.verdict is distinct from new.verdict) then
    return new;
  end if;

  select user_id into v_user_id
  from college_students
  where id = new.college_student_id;

  if v_user_id is null then
    return new;  -- learner not linked to an account yet
  end if;

  if new.verdict = 'ready' then
    v_title := 'EPA gateway: ready';
    v_body  := 'Your tutor confirms you''re ready for End-Point Assessment.';
  elsif new.verdict = 'almost' then
    v_title := 'EPA gateway reviewed';
    v_body  := 'You''re almost there — your tutor has set a few actions to complete before EPA. Tap to view your plan.';
  else
    -- not_yet / refer / anything else short of ready
    v_title := 'EPA gateway reviewed';
    v_body  := 'Your tutor has reviewed your EPA readiness and added actions to complete first. Tap to view your plan.';
  end if;

  insert into push_notification_log (user_id, type, reference_id, title, body)
  values (v_user_id, 'epa', new.id::text, v_title, v_body);

  return new;
end;
$function$;

drop trigger if exists trg_notify_epa_judgement on public.college_epa_judgements;
create trigger trg_notify_epa_judgement
  after insert or update of verdict, is_current on public.college_epa_judgements
  for each row
  execute function public.tg_notify_epa_judgement();

revoke execute on function public.tg_notify_epa_judgement() from anon, authenticated, public;

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_notify_epa_judgement on public.college_epa_judgements;
--   drop function if exists public.tg_notify_epa_judgement();
-- ============================================================================
