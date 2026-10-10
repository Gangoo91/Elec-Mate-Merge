-- L7 (review of ELE-2077, firm API):
--  * the certificates resource listed deleted certificates (reports.deleted_at
--    was not filtered);
--  * a key kept working after the firm stopped being an Employer account.
--    _firm_api_read now returns nothing for a firm that is not an Employer
--    account, as a backstop to firm-api's own check (which answers 403).
--
-- Patched in place by exact text replacement (checked). Signature unchanged;
-- only firm-api calls it. No API keys exist today.

do $mig$
declare d text; n text;
begin
  d := pg_get_functiondef('public._firm_api_read(uuid,text,timestamptz,integer,integer)'::regprocedure);
  if position('r.deleted_at is null' in d) > 0 then return; end if;
  n := replace(d,
$a$       where l.employer_id = p_firm and greatest(l.linked_at, r.updated_at) > v_since$a$,
$a$       where l.employer_id = p_firm and r.deleted_at is null and greatest(l.linked_at, r.updated_at) > v_since$a$);
  n := replace(n,
$a$  if p_firm is null then return '[]'::jsonb; end if;$a$,
$a$  if p_firm is null then return '[]'::jsonb; end if;
  -- L7: a firm that is no longer an Employer account gets nothing.
  if not public.is_employer_account(p_firm) then return '[]'::jsonb; end if;$a$);
  if position('r.deleted_at is null' in n) = 0 or position('is_employer_account(p_firm)' in n) = 0 then
    raise exception '_firm_api_read patch did not apply';
  end if;
  execute n;
end
$mig$;
