-- ELE-1994 fix: the 14-day "stale" expiry also caught tenders with a future
-- deadline (the daily sync does not refresh fetched_at on tenders it already
-- has). A tender with a deadline closes by its deadline only; the age rule is
-- for tenders that never gave one.
create or replace function public.expire_stale_tender_opportunities()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare v_closed int; v_expired int;
begin
  with c as (
    update public.tender_opportunities set status = 'closed', updated_at = now()
     where status = 'live' and deadline is not null and deadline < now()
    returning 1)
  select count(*) into v_closed from c;
  with e as (
    update public.tender_opportunities set status = 'expired', updated_at = now()
     where status = 'live' and deadline is null and fetched_at < now() - interval '14 days'
    returning 1)
  select count(*) into v_expired from e;
  return jsonb_build_object('closed', v_closed, 'expired', v_expired);
end;
$function$;

-- Put back the live tenders the first run expired by mistake.
update public.tender_opportunities
   set status = 'live', updated_at = now()
 where status = 'expired' and deadline > now()
   and updated_at > timestamptz '2026-10-08 00:00:00+00';
