-- Site Safety in both hubs, phase 2: get_employer_hub_counts counts the same
-- RAMS the Employer Hub lists.
--
-- The Safety hub's "Pending RAMS" counted rams_documents by creator
-- (user_id in my_employer_scope) OR by firm job, while the RAMS list showed
-- only the signed-in person's own rows — a manager saw a figure the list never
-- explained. Both now mean the firm's RAMS: employer_id (set by
-- safety_set_employer_scope()). Smart Docs' RAMS / method statement counts and
-- recent list follow the same rule, matching the firm library.
--
-- Edits the live definition in place and fails loudly if it has drifted from
-- the text this was written against, rather than overwriting someone's change.
do $mig$
declare
  v_def text;
  v_before text;
  v_n int;
begin
  select pg_get_functiondef(p.oid) into v_def
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'get_employer_hub_counts';
  if v_def is null then
    raise exception 'get_employer_hub_counts not found';
  end if;

  v_before := v_def;
  v_def := replace(
    v_def,
    'where (r.user_id = any (v_owners) or r.employer_job_id = any (v_jobs))',
    'where r.employer_id = any (v_owners)'
  );
  if v_def = v_before then
    raise exception 'rams_pending clause not found — definition has changed';
  end if;

  v_n := (length(v_def) - length(replace(v_def, 'g.user_id = any (v_owners)', '')))
         / length('g.user_id = any (v_owners)');
  if v_n <> 4 then
    raise exception 'expected 4 rams_generation_jobs clauses, found %', v_n;
  end if;
  v_def := replace(v_def, 'g.user_id = any (v_owners)', 'g.employer_id = any (v_owners)');

  execute v_def;
end;
$mig$;
