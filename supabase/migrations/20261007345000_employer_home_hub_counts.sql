-- Employer Hub Overview "Your hub" navigation (7 Oct 2026).
-- Adds one key to get_employer_home: hub { clients, docs } so the Clients and
-- Smart Docs area cards carry a live line without their own queries.
-- Every existing key, the SECURITY DEFINER / search_path, the grants (kept
-- by CREATE OR REPLACE) and the money-null rule are unchanged: the new
-- figures are counts, not money.
do $mig$
declare
  v_def text := pg_get_functiondef('public.get_employer_home(uuid)'::regprocedure);
  v_anchor text := E'\n  ) into v_result;';
  v_add text := $add$,

    'hub', jsonb_build_object(
      'clients', (select count(*) from public.customers c
                   where c.user_id = any (array(select public.my_employer_scope()))),
      'docs',
        (select count(*) from public.rams_generation_jobs g
          where g.user_id = any (array(select public.my_employer_scope()))
            and g.status in ('complete', 'partial') and g.rams_data is not null)
        + (select count(*) from public.rams_generation_jobs g
          where g.user_id = any (array(select public.my_employer_scope()))
            and g.status in ('complete', 'partial') and g.method_data is not null)
        + (select count(*) from public.circuit_design_jobs d
          where d.user_id = any (array(select public.my_employer_scope()))
            and d.status in ('complete', 'completed'))
        + (select count(*) from public.employer_job_packs p
          where p.employer_id = any (array(select public.my_employer_scope()))
            and coalesce(p.briefing_pack_generated, false)))$add$;
begin
  if position('''hub''' in v_def) > 0 then
    raise notice 'get_employer_home already has hub';
    return;
  end if;
  if (length(v_def) - length(replace(v_def, v_anchor, ''))) / length(v_anchor) <> 1 then
    raise exception 'get_employer_home: anchor not found exactly once';
  end if;
  execute replace(v_def, v_anchor, v_add || v_anchor);
end
$mig$;
