-- What store subscribers are actually on.
--
-- Apple and Google do not expose a per-subscriber price the way Stripe does, so
-- the web price ladder has no store equivalent from the billing side. What we do
-- have is our own `billing_events`, which RevenueCat webhooks fill with the
-- store and product id for every event.
--
-- 🔴 Coverage is partial and the UI must say so: `billing_events` starts on
-- 1 Aug 2026, so store subscribers who joined before that have no product
-- recorded. Roughly 104 of 131 are covered today. The counts are real; the
-- denominator is not the whole store base.
create or replace function public.get_store_price_mix()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  payload jsonb;
begin
  if not exists (select 1 from profiles where id = auth.uid() and admin_role is not null) then
    raise exception 'not authorized';
  end if;

  with latest as (
    -- One row per user: whatever product their most recent billing event names.
    select distinct on (be.user_id)
           be.user_id, be.store, be.product_id, be.created_at
    from billing_events be
    where be.source = 'revenuecat' and be.product_id is not null
    order by be.user_id, be.created_at desc
  ),
  active as (
    select l.store, l.product_id
    from latest l
    join profiles p on p.id = l.user_id
    where coalesce(p.subscribed, false)
      and p.subscription_source in ('app_store', 'play_store')
      -- Trials are not revenue. `is_trial` is the flag the rest of admin uses.
      and not coalesce(p.is_trial, false)
  ),
  rows as (
    select store, product_id, count(*)::int as subscribers
    from active group by 1, 2
  )
  select jsonb_build_object(
    'rows', (select coalesce(jsonb_agg(to_jsonb(r) order by r.subscribers desc), '[]'::jsonb) from rows r),
    -- Everything needed to state coverage honestly on the page.
    'covered', (select coalesce(sum(subscribers), 0)::int from rows),
    'store_paying', (
      select count(*)::int from profiles
      where coalesce(subscribed, false)
        and subscription_source in ('app_store', 'play_store')
        and not coalesce(is_trial, false)
    ),
    'events_from', (select min(created_at) from billing_events where source = 'revenuecat'),
    'generated_at', now()
  )
  into payload;

  return payload;
end;
$function$;

grant execute on function public.get_store_price_mix() to authenticated;
