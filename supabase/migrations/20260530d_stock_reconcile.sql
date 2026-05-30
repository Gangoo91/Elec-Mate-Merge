-- Phase 2 hardening: make the stock decrement RECONCILE to the desired line set
-- instead of appending once. For each stock-linked item it computes
--   desired  = sum of quantities in p_lines for that item
--   recorded = net of prior movements for (quote,item)  [out(invoice_raised) − in(reversal)]
--   delta    = desired − recorded
-- and decrements (delta>0) or restores (delta<0). This closes the gap where
-- removing a line or lowering a quantity after the first raise left stock
-- decremented. Re-saves with no change converge to delta=0 (idempotent).
--
-- reverse_invoice_stock_decrement becomes "reconcile to empty" (full restore)
-- and gains an optional p_user_id so it can also run from a service_role context.
--
-- Known edge: if an item was over-allocated (quoted more than on hand), the
-- physical quantity floors at 0 while the ledger records the requested amount,
-- so a later full restore can over-restore by the floored remainder. Rare
-- (UI warns on over-quote); accepted for v1.

create or replace function public.apply_invoice_stock_decrement(
  p_quote_id uuid,
  p_lines jsonb,
  p_user_id uuid default null
)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_uid      uuid := coalesce(p_user_id, auth.uid());
  v_item     uuid;
  v_desired  numeric;
  v_recorded numeric;
  v_delta    numeric;
begin
  if v_uid is null or p_quote_id is null then
    return;
  end if;
  if p_lines is null or jsonb_typeof(p_lines) <> 'array' then
    p_lines := '[]'::jsonb;
  end if;

  -- Every item that is either desired now OR has prior movement for this quote.
  for v_item in
    select item
    from (
      select nullif(l->>'inventory_item_id','')::uuid as item
        from jsonb_array_elements(p_lines) l
      union
      select inventory_item_id
        from public.inventory_movements
       where quote_id = p_quote_id and user_id = v_uid
         and reason in ('invoice_raised','reversal')
    ) u
    where item is not null
  loop
    select coalesce(sum((l->>'quantity')::numeric), 0)
      into v_desired
      from jsonb_array_elements(p_lines) l
     where nullif(l->>'inventory_item_id','')::uuid = v_item
       and (l->>'quantity')::numeric > 0;

    select coalesce(sum(case when direction = 'out' then quantity else -quantity end), 0)
      into v_recorded
      from public.inventory_movements
     where quote_id = p_quote_id and inventory_item_id = v_item and user_id = v_uid
       and reason in ('invoice_raised','reversal');

    v_delta := v_desired - v_recorded;
    if v_delta = 0 then
      continue;
    end if;

    if v_delta > 0 then
      update public.personal_inventory
         set quantity = greatest(0, quantity - v_delta),
             last_used_date = current_date
       where id = v_item and user_id = v_uid;
      if not found then continue; end if;
      insert into public.inventory_movements
        (user_id, inventory_item_id, quantity, direction, reason, quote_id, note)
      values
        (v_uid, v_item, v_delta, 'out', 'invoice_raised', p_quote_id, null);
    else
      update public.personal_inventory
         set quantity = quantity + (-v_delta)
       where id = v_item and user_id = v_uid;
      if not found then continue; end if;
      insert into public.inventory_movements
        (user_id, inventory_item_id, quantity, direction, reason, quote_id, note)
      values
        (v_uid, v_item, -v_delta, 'in', 'reversal', p_quote_id, 'reconcile/restore');
    end if;
  end loop;
end;
$$;

drop function if exists public.reverse_invoice_stock_decrement(uuid);

create or replace function public.reverse_invoice_stock_decrement(
  p_quote_id uuid,
  p_user_id uuid default null
)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  -- Full restore = reconcile to an empty desired set.
  perform public.apply_invoice_stock_decrement(p_quote_id, '[]'::jsonb, p_user_id);
end;
$$;

grant execute on function public.apply_invoice_stock_decrement(uuid, jsonb, uuid) to authenticated, service_role;
grant execute on function public.reverse_invoice_stock_decrement(uuid, uuid) to authenticated, service_role;
