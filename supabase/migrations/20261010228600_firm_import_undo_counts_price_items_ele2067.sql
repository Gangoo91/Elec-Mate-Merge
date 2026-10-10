-- ELE-2067 — undo counts each price book item, not the one list that holds
-- them. An import of 6 price book items made one "Imported from …" list;
-- undo deleted the list (and with it all 6 items) but reported 1, so the
-- owner saw "31 added" then "26 taken out". Patched from the live
-- definition; same signature, no change to what is deleted.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.undo_firm_import(uuid, integer)'::regprocedure);
  n := replace(d,
    $a$delete from public.materials_lists where id = r.row_id and user_id = b.employer_id;$a$,
    $a$delete from public.materials_lists where id = r.row_id and user_id = b.employer_id;
        -- the list goes with every item in it; count the items, not the list
        select count(*) into v_remaining from public.employer_import_rows
         where batch_id = p_batch and table_name = 'materials_list_items' and action = 'created';
        if v_remaining > 1 then
          v_deleted := v_deleted + v_remaining - 1;
          v_by := jsonb_set(v_by, array[r.kind], to_jsonb(coalesce((v_by ->> r.kind)::int, 0) + v_remaining - 1));
        end if;$a$);
  if n = d then raise exception 'undo_firm_import price item patch did not apply'; end if;
  execute n;
end
$mig$;
