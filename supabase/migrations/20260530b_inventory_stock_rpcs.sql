-- ELE-1014 — atomic stock decrement + reversal for invoice-linked line items.
-- Replaces the read-then-write JS path with transaction-safe RPCs:
--   * apply_invoice_stock_decrement: decrements stock for each line, idempotent
--     PER (quote, inventory item) — so re-saves never double-count, and items
--     added in a later edit still get decremented.
--   * reverse_invoice_stock_decrement: restores stock when an invoice is voided,
--     idempotent per quote.
-- Both run SECURITY INVOKER so RLS + auth.uid() scope everything to the owner.

create or replace function public.apply_invoice_stock_decrement(p_quote_id uuid, p_lines jsonb)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_uid  uuid := auth.uid();
  v_line jsonb;
  v_item uuid;
  v_qty  numeric;
begin
  if v_uid is null or p_quote_id is null or p_lines is null
     or jsonb_typeof(p_lines) <> 'array' then
    return;
  end if;

  for v_line in select * from jsonb_array_elements(p_lines)
  loop
    v_item := nullif(v_line->>'inventory_item_id','')::uuid;
    v_qty  := (v_line->>'quantity')::numeric;
    if v_item is null or v_qty is null or v_qty <= 0 then
      continue;
    end if;

    -- Per-item idempotency: never decrement the same item twice for one invoice.
    if exists (
      select 1 from public.inventory_movements
      where quote_id = p_quote_id
        and inventory_item_id = v_item
        and reason = 'invoice_raised'
        and user_id = v_uid
    ) then
      continue;
    end if;

    -- Atomic, owner-scoped decrement.
    update public.personal_inventory
       set quantity = greatest(0, quantity - v_qty),
           last_used_date = current_date
     where id = v_item and user_id = v_uid;

    if not found then
      continue; -- item not ours / deleted
    end if;

    insert into public.inventory_movements
      (user_id, inventory_item_id, quantity, direction, reason, quote_id, note)
    values
      (v_uid, v_item, v_qty, 'out', 'invoice_raised', p_quote_id, nullif(v_line->>'note',''));
  end loop;
end;
$$;

create or replace function public.reverse_invoice_stock_decrement(p_quote_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_mov record;
begin
  if v_uid is null or p_quote_id is null then
    return;
  end if;

  -- Idempotent: if we've already reversed this invoice, do nothing.
  if exists (
    select 1 from public.inventory_movements
    where quote_id = p_quote_id and reason = 'reversal' and user_id = v_uid
  ) then
    return;
  end if;

  for v_mov in
    select inventory_item_id, quantity
    from public.inventory_movements
    where quote_id = p_quote_id
      and reason = 'invoice_raised'
      and direction = 'out'
      and user_id = v_uid
  loop
    update public.personal_inventory
       set quantity = quantity + v_mov.quantity
     where id = v_mov.inventory_item_id and user_id = v_uid;

    insert into public.inventory_movements
      (user_id, inventory_item_id, quantity, direction, reason, quote_id, note)
    values
      (v_uid, v_mov.inventory_item_id, v_mov.quantity, 'in', 'reversal', p_quote_id, 'Invoice voided — stock restored');
  end loop;
end;
$$;

grant execute on function public.apply_invoice_stock_decrement(uuid, jsonb) to authenticated;
grant execute on function public.reverse_invoice_stock_decrement(uuid) to authenticated;
