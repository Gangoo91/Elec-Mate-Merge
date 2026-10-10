-- Fix: client_portal_get failed for every link with "column reference
-- l.job_id is ambiguous". The certificates clause added for ELE-1832 aliased
-- employer_job_certificates as "l", which is also the function's link
-- variable. Renames the alias; nothing else changes.
do $mig$
declare v_def text; v_before text;
begin
  select pg_get_functiondef('public.client_portal_get(text)'::regprocedure) into v_def;
  v_before := v_def;
  v_def := replace(v_def,
    'select 1 from public.employer_job_certificates l
                             join public.employer_jobs jj on jj.id = l.job_id
                            where l.report_uuid = r.id and l.employer_id = v_firm and jj.customer_id = v_cust',
    'select 1 from public.employer_job_certificates jc
                             join public.employer_jobs jj on jj.id = jc.job_id
                            where jc.report_uuid = r.id and jc.employer_id = v_firm and jj.customer_id = v_cust');
  if v_def = v_before then raise exception 'certificates clause not found'; end if;
  execute v_def;
end $mig$;
