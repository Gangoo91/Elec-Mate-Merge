-- Fire price alerts. Applied to production 2026-08-06.
--
-- The table, the RPC (fn_check_price_alerts), the hook
-- (useMarketplacePriceAlerts, with watchProduct/unwatchProduct/watchedProducts)
-- and the banner all already existed — and the table had ZERO rows. Nothing in
-- the UI ever called watchProduct, so no alert could be created, and nothing
-- ever checked the ones that did not exist. The whole feature was built and
-- never connected at either end.
--
-- This is the back half. The front half is a watch toggle on the product card.
--
-- Two things trigger a notification:
--   1. The product reached the user's target price.
--   2. It fell 10% or more below what it cost when they saved it, even with no
--      target — most people will not set one, and a fifth off is worth knowing.
--
-- `last_alerted_price` stops the same drop being announced on every run: to
-- speak again it has to have fallen further.

create or replace function public.dispatch_marketplace_price_alerts()
returns integer
language plpgsql security definer set search_path to 'public', 'extensions'
as $$
declare
  r record; v_title text; v_body text; n integer := 0;
begin
  for r in
    select a.id, a.user_id, a.target_price, a.price_when_saved, a.last_alerted_price,
           p.id as product_id, p.name, p.current_price, p.product_url, s.name as supplier_name
    from public.marketplace_price_alerts a
    join public.marketplace_products p on p.id = a.product_id
    join public.marketplace_suppliers s on s.id = p.supplier_id
    where a.is_active and p.current_price > 0
      and (
        (a.target_price is not null and p.current_price <= a.target_price)
        or (a.target_price is null and a.price_when_saved is not null
            and p.current_price <= a.price_when_saved * 0.9)
      )
      and (a.last_alerted_price is null or p.current_price < a.last_alerted_price)
    limit 500
  loop
    v_title := r.name || ' — now ' || to_char(r.current_price, 'FM£999,990.00');
    v_body := r.supplier_name || case
        when r.price_when_saved is not null and r.price_when_saved > r.current_price
          then ' · down from ' || to_char(r.price_when_saved, 'FM£999,990.00')
        else '' end;

    perform public.notify_user(
      r.user_id, 'price_drop', v_title, v_body,
      jsonb_build_object('ref_id', r.id::text, 'route', '/electrician/materials',
                         'push_type', 'default', 'product_id', r.product_id,
                         'product_url', r.product_url));

    update public.marketplace_price_alerts
      set last_alerted_price = r.current_price, updated_at = now() where id = r.id;
    n := n + 1;
  end loop;
  return n;
end;
$$;

revoke all on function public.dispatch_marketplace_price_alerts() from public, anon, authenticated;

-- importance 1 keeps it inside quiet hours: a price drop is never urgent
-- enough to wake someone.
insert into public.notification_types (type, category, push, importance)
values ('price_drop', 'invoices_quotes', true, 1)
on conflict (type) do update
  set category = excluded.category, push = excluded.push,
      importance = excluded.importance, updated_at = now();

-- Daily at 9am. Supplier prices move a handful of times a day across the whole
-- catalogue; nobody needs telling twice before lunch.
select cron.unschedule('marketplace-price-alerts')
where exists (select 1 from cron.job where jobname = 'marketplace-price-alerts');
select cron.schedule('marketplace-price-alerts', '0 9 * * *',
  $$select public.dispatch_marketplace_price_alerts()$$);
