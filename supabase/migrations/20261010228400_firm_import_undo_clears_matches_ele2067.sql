-- ELE-2067 — once an import is fully undone, its 'matched' map rows (links
-- to records that were already in Elec-Mate) go too, so nothing of the
-- import is left but the batch history row. Patched from the live
-- definition; same signature.
do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public.undo_firm_import(uuid, integer)'::regprocedure);
  n := replace(d,
    $a$delete from public.employer_import_rows where batch_id = p_batch and table_name = 'materials_list_items';$a$,
    $a$delete from public.employer_import_rows where batch_id = p_batch and (table_name = 'materials_list_items' or action = 'matched');$a$);
  if n = d then raise exception 'undo_firm_import patch did not apply'; end if;
  execute n;
end
$mig$;
