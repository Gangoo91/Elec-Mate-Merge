-- Revert 20261008191200 on the live database until the Site Safety client ships.
--
-- 191200 made the hub counts read rams_documents / rams_generation_jobs by
-- employer_id. Nothing sets employer_id until the new Site Safety client is
-- live, so on the live app every firm's RAMS and AI-drafted counts fell to 0.
-- This puts back the creator-based clauses. RELEASE-HELD: after the push that
-- ships the firm-scoped Site Safety client, apply 20261008191200's change again
-- as a new migration.
do $mig$
declare
  v_def text;
  v_before text;
begin
  select pg_get_functiondef(p.oid) into v_def
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'get_employer_hub_counts';
  v_before := v_def;
  v_def := replace(v_def,
    'where r.employer_id = any (v_owners)',
    'where (r.user_id = any (v_owners) or r.employer_job_id = any (v_jobs))');
  if v_def = v_before then
    raise exception 'rams clause not found, nothing reverted';
  end if;
  v_def := replace(v_def, 'g.employer_id = any (v_owners)', 'g.user_id = any (v_owners)');
  execute v_def;
end;
$mig$;
