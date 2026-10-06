-- Review findings #21, #23, #24 (6 Oct): cross-firm edges.
--  #21 the apprentice's "who confirms your hours" list showed QS, but a QS
--      can't confirm OTJ (can_confirm_otj_for). Lists must match the rule.
--  #23 get_job_hub_summary counted any quote pointing at the job, including
--      one another firm pointed at it. Only the job's own firm's quotes count.
--  #24 notify_incident_supervisors looked up the reporter/injured/supervisor
--      by id alone; a report naming another firm's roster id told their
--      supervisor. Van child tables' WITH CHECK let a manager attach a row
--      to another firm's van, or file it under a stranger's user id.

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_my_employer_link()'::regprocedure);
  v_def := replace(v_def, $q$('Supervisor', 'QS', 'Project Manager', 'Apprentice Co-ordinator')$q$,
                          $q$('Supervisor', 'Project Manager', 'Apprentice Co-ordinator')$q$);
  if v_def ~ '''QS''' then raise exception 'get_my_employer_link: QS not removed'; end if;
  execute v_def;

  v_def := pg_get_functiondef('public.get_job_hub_summary(uuid)'::regprocedure);
  -- Skip on a re-run: the filter is already there.
  if position('q.user_id = v_job.user_id' in v_def) = 0 then
    v_def := replace(v_def, 'q.employer_job_id = p_job_id', 'q.employer_job_id = p_job_id and q.user_id = v_job.user_id');
    if (length(v_def) - length(replace(v_def, 'q.user_id = v_job.user_id', ''))) / length('q.user_id = v_job.user_id') <> 6 then
      raise exception 'get_job_hub_summary: expected 6 quote filters';
    end if;
    execute v_def;
  end if;

  v_def := pg_get_functiondef('public.notify_incident_supervisors()'::regprocedure);
  v_def := replace(v_def,
    'select * into v_reporter from public.employer_employees where id = NEW.reported_by::uuid;',
    'select * into v_reporter from public.employer_employees where id = NEW.reported_by::uuid and employer_id = NEW.employer_id;');
  v_def := replace(v_def,
    'select * into v_injured from public.employer_employees where id = NEW.injured_employee_id;',
    'select * into v_injured from public.employer_employees where id = NEW.injured_employee_id and employer_id = NEW.employer_id;');
  v_def := replace(v_def,
    E'where s.id in (v_reporter.supervisor_employee_id, v_injured.supervisor_employee_id)\n',
    E'where s.id in (v_reporter.supervisor_employee_id, v_injured.supervisor_employee_id)\n       and s.employer_id = NEW.employer_id\n');
  if v_def !~ 's.employer_id = NEW.employer_id' or v_def !~ 'injured_employee_id and employer_id' then
    raise exception 'notify_incident_supervisors: firm checks not applied';
  end if;
  execute v_def;
end $$;

do $$
declare t text;
begin
  foreach t in array array['fuel_logs', 'vehicle_checks', 'vehicle_documents', 'vehicle_services', 'vehicle_tools'] loop
    execute format('drop policy if exists %I on public.%I', 'Firm managers manage ' || t, t);
    execute format($p$
      create policy %I on public.%I for all to authenticated
      using (
        user_id in (select public.my_employer_scope())
        or vehicle_id in (select v.id from public.vehicles v where v.user_id in (select public.my_employer_scope()))
      )
      with check (
        (vehicle_id is null
           or vehicle_id in (select v.id from public.vehicles v where v.user_id in (select public.my_employer_scope())))
        and (user_id in (select public.my_employer_scope())
             or user_id in (select e.user_id from public.employer_employees e
                             where e.employer_id in (select public.my_employer_scope()) and e.user_id is not null))
      )$p$, 'Firm managers manage ' || t, t);
  end loop;
end $$;
