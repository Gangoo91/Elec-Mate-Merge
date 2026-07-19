-- S6 review fix: un-ticking a stock-linked material returns it to the van (undo path)
-- Applied to prod via MCP 2026-07-19
create or replace function public.mark_job_material_needed(p_material_id uuid, p_restock boolean default false)
returns void
language plpgsql security invoker set search_path = ''
as $$
declare
  m public.job_materials;
begin
  select * into m from public.job_materials
    where id = p_material_id and user_id = auth.uid();
  if not found then
    raise exception 'Material not found';
  end if;

  update public.job_materials set status = 'needed' where id = m.id;

  if p_restock and m.inventory_item_id is not null then
    update public.personal_inventory
      set quantity = quantity + m.quantity
      where id = m.inventory_item_id and user_id = auth.uid();
    insert into public.inventory_movements
      (user_id, inventory_item_id, quantity, direction, reason, project_id, note)
    values
      (auth.uid(), m.inventory_item_id, m.quantity, 'in', 'returned_to_stock', m.project_id, m.name);
  end if;
end $$;

revoke execute on function public.mark_job_material_needed(uuid, boolean) from public, anon;
grant execute on function public.mark_job_material_needed(uuid, boolean) to authenticated;
