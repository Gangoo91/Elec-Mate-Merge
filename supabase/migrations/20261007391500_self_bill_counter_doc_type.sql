-- ELE-1830: self-bill statement numbers (SB-0001…) use the firm's
-- document_number_counters row like every other document; allow the doc type.
-- Re-reads the live list so any type added since is kept.
do $do$
declare
  v_def text;
begin
  select pg_get_constraintdef(oid) into v_def
    from pg_constraint where conname = 'document_number_counters_doc_type_check';
  if v_def is null or position('self_bill' in v_def) > 0 then
    return;
  end if;
  alter table public.document_number_counters drop constraint document_number_counters_doc_type_check;
  execute 'alter table public.document_number_counters add constraint document_number_counters_doc_type_check '
          || replace(v_def, 'ARRAY[', 'ARRAY[''self_bill''::text, ');
end
$do$;
