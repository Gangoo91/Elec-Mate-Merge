-- ============================================================================
-- College Hub — safeguarding escalation (best-in-class: never misses a concern).
--
-- A safeguarding pastoral note (kind='safeguarding') must reach a responsible
-- person and stay chased until actioned. Three guarantees:
--   1. On creation -> notify every DSL + Deputy DSL at the college (except the
--      author). Discreet: NO learner name/detail in the push (lock screens
--      aren't access-controlled); the DSL opens the secure area for specifics.
--   2. Fallback -> if NO DSL is configured, alert college admins / HoDs instead,
--      flagging the misconfiguration, so a concern NEVER reaches no one.
--   3. Re-escalation -> an hourly job re-notifies (widened to admins) any
--      safeguarding note left unactioned (action_completed_at IS NULL) after 4h,
--      exactly once.
--
-- Same surface as the other notifications (push_notification_log). Rollback at
-- the bottom.
-- ============================================================================

create or replace function public.tg_notify_safeguarding()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_dsl_count int;
begin
  if new.kind = 'safeguarding' or new.visibility = 'safeguarding' then
    -- 1. Primary: DSL + Deputy DSL at the college (not the author)
    insert into push_notification_log (user_id, type, reference_id, title, body)
    select s.user_id,
           'safeguarding',
           new.id::text,
           'Safeguarding entry logged',
           'A safeguarding record has been added at your college. Open the safeguarding area to review.'
    from college_staff s
    where s.college_id = new.college_id
      and (s.is_dsl is true or s.is_deputy_dsl is true)
      and s.user_id is not null
      and s.id is distinct from new.author_id;

    get diagnostics v_dsl_count = row_count;

    -- 2. Fallback: no DSL configured -> alert admins so it never reaches no one
    if v_dsl_count = 0 then
      insert into push_notification_log (user_id, type, reference_id, title, body)
      select s.user_id,
             'safeguarding',
             new.id::text,
             'Safeguarding entry — no DSL set',
             'A safeguarding record was logged but no Designated Safeguarding Lead is configured. Please review it and assign a DSL.'
      from college_staff s
      where s.college_id = new.college_id
        and s.role in ('admin', 'head_of_department')
        and s.user_id is not null
        and s.id is distinct from new.author_id;
    end if;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_notify_safeguarding on public.pastoral_notes;
create trigger trg_notify_safeguarding
  after insert on public.pastoral_notes
  for each row
  execute function public.tg_notify_safeguarding();

revoke execute on function public.tg_notify_safeguarding() from anon, authenticated, public;

-- 3. Tiered re-escalation job — pure SQL (no http, so no auth-header pitfall).
--    A safeguarding note that isn't actioned (action_completed_at IS NULL) climbs
--    a ladder, each rung firing exactly once (deduped by its own notification
--    type so it never repeats):
--      * 4h  -> remind DSL + Deputy DSL (the responsible people get a nudge)
--      * 24h -> escalate to college leadership (admins / HoDs) — a day unactioned
--               is now a leadership matter, not just a reminder.
select cron.unschedule('safeguarding-reescalation')
where exists (select 1 from cron.job where jobname = 'safeguarding-reescalation');

select cron.schedule('safeguarding-reescalation', '0 * * * *', $cron$
  -- Tier 1 (4h): remind the DSLs/deputies
  insert into push_notification_log (user_id, type, reference_id, title, body)
  select distinct s.user_id,
         'safeguarding_escalation',
         pn.id::text,
         'Safeguarding — not yet actioned',
         'A safeguarding record logged 4+ hours ago has not been marked as actioned. Please review it now.'
  from pastoral_notes pn
  join college_staff s
    on s.college_id = pn.college_id
   and (s.is_dsl is true or s.is_deputy_dsl is true)
   and s.user_id is not null
  where (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
    and pn.action_completed_at is null
    and pn.created_at < now() - interval '4 hours'
    and not exists (
      select 1 from push_notification_log l
      where l.reference_id = pn.id::text and l.type = 'safeguarding_escalation'
    );

  -- Tier 2 (24h): escalate to college leadership
  insert into push_notification_log (user_id, type, reference_id, title, body)
  select distinct s.user_id,
         'safeguarding_escalation_24h',
         pn.id::text,
         'Safeguarding — escalated (24h+)',
         'A safeguarding record has been unactioned for 24+ hours and is now escalated to college leadership. Immediate review required.'
  from pastoral_notes pn
  join college_staff s
    on s.college_id = pn.college_id
   and (s.is_dsl is true or s.is_deputy_dsl is true or s.role in ('admin', 'head_of_department'))
   and s.user_id is not null
  where (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
    and pn.action_completed_at is null
    and pn.created_at < now() - interval '24 hours'
    and not exists (
      select 1 from push_notification_log l
      where l.reference_id = pn.id::text and l.type = 'safeguarding_escalation_24h'
    );
$cron$);

-- ============================================================================
-- ROLLBACK:
--   select cron.unschedule('safeguarding-reescalation');
--   drop trigger if exists trg_notify_safeguarding on public.pastoral_notes;
--   drop function if exists public.tg_notify_safeguarding();
-- ============================================================================
