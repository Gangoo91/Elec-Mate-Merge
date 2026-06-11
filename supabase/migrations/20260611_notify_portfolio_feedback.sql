-- ============================================================================
-- College Hub — connect assessor feedback to the apprentice's notifications.
--
-- Assessors review portfolio submissions (status -> feedback_given / signed_off,
-- IQA -> iqa_verified), but nothing told the apprentice — feedback sat unseen.
-- This wires those events into the apprentice's existing notification surface:
-- a row in push_notification_log (which their NotificationProvider reads live
-- via realtime, keyed on user_id). No edge function, no client change —
-- portfolio_submissions.user_id IS the apprentice, so it's a direct link.
--
-- Rollback at the bottom.
-- ============================================================================

create or replace function public.tg_notify_submission_reviewed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.status is distinct from old.status
     and new.status in ('feedback_given', 'signed_off', 'iqa_verified') then
    insert into push_notification_log (user_id, type, reference_id, title, body)
    values (
      new.user_id,
      'portfolio',
      new.id::text,
      case new.status
        when 'feedback_given' then 'New feedback on your portfolio'
        when 'signed_off'     then 'Portfolio signed off'
        when 'iqa_verified'   then 'Portfolio verified'
      end,
      case new.status
        when 'feedback_given' then 'Your assessor left feedback on a portfolio submission — open it to see what to do next.'
        when 'signed_off'     then 'An assessor has signed off one of your portfolio submissions.'
        when 'iqa_verified'   then 'A portfolio submission has been quality-verified by the IQA.'
      end
    );
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_submission_reviewed on public.portfolio_submissions;

create trigger trg_notify_submission_reviewed
  after update of status
  on public.portfolio_submissions
  for each row
  execute function public.tg_notify_submission_reviewed();

-- ============================================================================
-- ROLLBACK:
--   drop trigger if exists trg_notify_submission_reviewed on public.portfolio_submissions;
--   drop function if exists public.tg_notify_submission_reviewed();
-- ============================================================================
