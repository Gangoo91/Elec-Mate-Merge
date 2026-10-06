-- Shared view shows evidence files (photos, test sheets): include the item's
-- storage_urls list in shared entries. URLs are signed for anonymous viewers by
-- the sign-shared-portfolio-evidence edge function. Source of truth for the
-- function body is 20261006177000 (edited to match); this patches the live one.
do $mig$
declare d text;
begin
  d := pg_get_functiondef('public._portfolio_structured(uuid,uuid[],boolean)'::regprocedure);
  if position('''files''' in d) = 0 then
    d := replace(d, $q$'file_url', pi.file_url, 'file_type', pi.file_type)$q$,
                    $q$'file_url', pi.file_url, 'file_type', pi.file_type, 'files', coalesce(pi.storage_urls, '[]'::jsonb))$q$);
    execute d;
  end if;
end $mig$;
