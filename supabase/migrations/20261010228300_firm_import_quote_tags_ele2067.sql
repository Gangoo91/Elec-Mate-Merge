-- ELE-2067 — two fixes to import_firm_rows found by the fixture test:
--   * quotes.tags only allows the five workflow tags (quotes_tags_check), so
--     imported quotes and invoices carry no tags; "imported" lives in
--     job_details.imported and settings.imported instead.
--   * quotes_invoice_status_check has no 'cancelled'. A voided invoice is
--     left out with a reason rather than brought in as a draft that could
--     be sent.
-- Patched in place from the live definition; same signature, same callers.
do $mig$
declare d text;
begin
  d := pg_get_functiondef('public.import_firm_rows(uuid, text, uuid, text, jsonb, boolean)'::regprocedure);
  d := replace(d,
    $a$              array['imported', 'imported:' || p_source],
              false, true, null,$a$,
    $a$              '{}'::text[],
              false, true, null,$a$);
  d := replace(d,
    $a$                   when v_status in ('void', 'voided', 'cancelled', 'deleted') then 'cancelled'
$a$, '');
  d := replace(d,
    $a$            v_status := lower(coalesce(public._imp_txt(r, 'status', 40), ''));
$a$,
    $a$            v_status := lower(coalesce(public._imp_txt(r, 'status', 40), ''));
            if p_kind = 'invoices' and v_status in ('void', 'voided', 'cancelled', 'deleted') then
              v_reason := 'Voided in ' || v_label || ', so left out'; raise exception using errcode = 'P0010';
            end if;
$a$);
  if position($a$array['imported', 'imported:' || p_source],
              false, true, null,$a$ in d) > 0 then
    raise exception 'import_firm_rows patch did not apply';
  end if;
  execute d;
end
$mig$;
