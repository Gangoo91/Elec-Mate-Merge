-- Assessed lock: a trainee pass awaiting countersignature does not lock (10 Oct 2026).
--
-- 20261011022000_portfolio_assessed_lock locks a portfolio item (edit-lock
-- trigger, storage DELETE policy) once a passing decision cites it, via
-- _portfolio_item_assessed(). 20261011032000 made a trainee assessor's pass
-- not count until a qualified assessor countersigns it, and the app (via
-- get_portfolio_ac_occasions) no longer treats such an item as assessed, so
-- the app offered Edit and the database refused the save. The lock now
-- follows the same rule: an item locks once a pass on it actually counts.
-- Countersigning (countersign_decisions) stamps countersigned_at, and from
-- then on the item is locked as normal.
begin;
set local lock_timeout = '5s';

create or replace function public._portfolio_item_assessed(p_item_id uuid, p_owner uuid)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select exists (
    select 1 from public.portfolio_assessment_decisions d
     where d.learner_id = p_owner
       and d.decision = 'passed'
       and not (d.countersign_required and d.countersigned_at is null)
       and p_item_id = any (d.evidence_item_ids)
  );
$function$;

commit;
