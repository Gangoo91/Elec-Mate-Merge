-- Phase 3.5 — let the stock ledger + decrement work for AI-created invoices too.
--   * AI/mate-documents invoices live in `invoices` (not `quotes`), so the strict
--     FK on inventory_movements.quote_id is dropped — it's now a generic
--     "source document id" (a quotes.id OR an invoices.id).
--   * The Business Hub AI edge function runs as service_role (no auth.uid()), so
--     the decrement RPC gains an optional p_user_id. The frontend keeps calling
--     it with 2 args (p_user_id defaults null → auth.uid()).

alter table public.inventory_movements drop constraint if exists inventory_movements_quote_id_fkey;

-- Re-create with the extra optional arg (drop the old 2-arg signature first).
drop function if exists public.apply_invoice_stock_decrement(uuid, jsonb);

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
  v_uid  uuid := coalesce(p_user_id, auth.uid());
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

    if exists (
      select 1 from public.inventory_movements
      where quote_id = p_quote_id
        and inventory_item_id = v_item
        and reason = 'invoice_raised'
        and user_id = v_uid
    ) then
      continue;
    end if;

    update public.personal_inventory
       set quantity = greatest(0, quantity - v_qty),
           last_used_date = current_date
     where id = v_item and user_id = v_uid;

    if not found then
      continue;
    end if;

    insert into public.inventory_movements
      (user_id, inventory_item_id, quantity, direction, reason, quote_id, note)
    values
      (v_uid, v_item, v_qty, 'out', 'invoice_raised', p_quote_id, nullif(v_line->>'note',''));
  end loop;
end;
$$;

grant execute on function public.apply_invoice_stock_decrement(uuid, jsonb, uuid) to authenticated, service_role;
