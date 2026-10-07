-- QA follow-up (ELE-1831): get_job_hub_summary handed office managers the job
-- value and the contract value; only the screen hid them. Office keeps
-- invoiced / paid / outstanding (they chase payment), never the job's worth.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_job_hub_summary(uuid)'::regprocedure);
  if position($q$'job_value', case when v_money$q$ in v_def) = 0 then
    v_def := replace(v_def, $q$'job_value', v_job.value,$q$, $q$'job_value', case when v_money then v_job.value end,$q$);
    v_def := replace(v_def, $q$'outstanding', f.outstanding, 'contract_value', f.contract_value,$q$,
                            $q$'outstanding', f.outstanding, 'contract_value', null,$q$);
    if position($q$'job_value', case when v_money$q$ in v_def) = 0
       or position($q$'contract_value', null$q$ in v_def) = 0 then
      raise exception 'get_job_hub_summary not patched';
    end if;
    execute v_def;
  end if;
end $$;
