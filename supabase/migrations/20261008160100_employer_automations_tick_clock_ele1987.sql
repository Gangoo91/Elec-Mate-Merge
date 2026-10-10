-- ELE-1987 follow-up: the automations tick takes the clock as a parameter
-- (default now()) so the Friday 4pm and office-hours rules can be tested in a
-- rolled-back transaction without waiting for Friday. Behaviour unchanged.

drop function if exists public.run_employer_automations();

create or replace function public.run_employer_automations(p_now timestamptz default now())
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_local timestamp := p_now at time zone 'Europe/London';
  v_dow int := extract(isodow from v_local);
  v_hour int := extract(hour from v_local);
  v_week_start date := date_trunc('week', v_local)::date;
  v_week_end date := date_trunc('week', v_local)::date + 4;
  f record;
  e record;
  q record;
  rq record;
  v_run uuid;
  v_n int;
  v_oldest date;
  v_key text;
  v_counts jsonb := '{}'::jsonb;
  v_made int;
begin
  -- 1. Friday 4pm: remind anyone on a job this week with no hours logged.
  if v_dow = 5 and v_hour >= 16 then
    v_made := 0;
    for f in select r.employer_id from public.employer_automation_rules r
              where r.rule_key = 'timesheet_friday_reminder' and r.enabled
                and public._automation_on(r.employer_id, r.rule_key) loop
      for e in
        select em.id, em.name, em.user_id from public.employer_employees em
         where em.employer_id = f.employer_id and em.user_id is not null
           and lower(coalesce(em.status, '')) = 'active'
           and exists (
             select 1 from public.employer_job_assignments a
               join public.employer_jobs j on j.id = a.job_id
              where a.employee_id = em.id
                and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                and j.archived_at is null and coalesce(j.status, '') <> 'Cancelled'
                and coalesce(a.start_date, j.start_date) <= v_week_end
                and coalesce(a.end_date, j.end_date, a.start_date, j.start_date) >= v_week_start)
           and not exists (
             select 1 from public.employer_timesheets t
              where t.employee_id = em.id and t.date between v_week_start and v_week_end
                and t.total_hours is not null)
      loop
        begin
          v_run := public._automation_claim(f.employer_id, 'timesheet_friday_reminder',
                     e.id::text || ':' || v_week_start, null, '');
          if v_run is not null then
            perform public.worker_notify(e.user_id, 'timesheet_reminder', 'Log this week''s hours',
              'You haven''t logged any hours this week. Add them before you finish so your pay is right.',
              jsonb_build_object('employee_id', e.id, 'route', '/electrician/worker-tools/timesheets'));
            perform public._automation_finish(v_run, 'done',
              'Reminded ' || coalesce(e.name, 'a team member') || ' to log this week''s hours.');
            v_made := v_made + 1;
          end if;
        exception when others then
          perform public._automation_fail(f.employer_id, 'timesheet_friday_reminder',
            e.id::text || ':' || v_week_start, null, sqlerrm);
        end;
      end loop;
    end loop;
    v_counts := v_counts || jsonb_build_object('timesheet_friday_reminder', v_made);
  end if;

  -- Office-hours rules: weekdays 9am to 5pm UK time.
  if v_dow between 1 and 5 and v_hour between 9 and 16 then
    -- 2. Timesheets waiting over 2 days: one nudge a day to the office.
    v_made := 0;
    for f in select r.employer_id from public.employer_automation_rules r
              where r.rule_key = 'timesheet_waiting_reminder' and r.enabled
                and public._automation_on(r.employer_id, r.rule_key) loop
      begin
        select count(*), min(t.date) into v_n, v_oldest
          from public.employer_timesheets t
          join public.employer_employees em on em.id = t.employee_id
         where em.employer_id = f.employer_id
           and lower(coalesce(t.status, '')) in ('pending', 'submitted')
           and t.total_hours is not null
           and coalesce(t.resubmitted_at, t.clock_out, t.created_at) < p_now - interval '2 days';
        if v_n > 0 then
          v_run := public._automation_claim(f.employer_id, 'timesheet_waiting_reminder',
                     'day:' || v_local::date, null, '');
          if v_run is not null then
            perform public.notify_employer_bell(f.employer_id, 'automation',
              v_n || ' timesheet' || case when v_n = 1 then '' else 's' end || ' waiting over 2 days',
              'The oldest is from ' || to_char(v_oldest, 'FMDD Mon') || '. Approve them so pay runs on time.',
              jsonb_build_object('rule', 'timesheet_waiting_reminder',
                                 'route', '/employer?section=timesheets&tab=pending'));
            perform public._automation_finish(v_run, 'done',
              'Reminded the office: ' || v_n || ' timesheet' || case when v_n = 1 then '' else 's' end
                || ' waiting over 2 days.');
            v_made := v_made + 1;
          end if;
        end if;
      exception when others then
        perform public._automation_fail(f.employer_id, 'timesheet_waiting_reminder',
          'day:' || v_local::date, null, sqlerrm);
      end;
    end loop;
    v_counts := v_counts || jsonb_build_object('timesheet_waiting_reminder', v_made);

    -- 3. Invoices unpaid 14 days after sending: queue a polite reminder.
    --    Only invoices that reach 14 days AFTER the rule was turned on, so
    --    switching it on never chases a backlog of old invoices at once.
    v_made := 0;
    for rq in select r.employer_id, r.enabled_at from public.employer_automation_rules r
               where r.rule_key = 'invoice_unpaid_reminder' and r.enabled and r.enabled_at is not null
                 and public._automation_on(r.employer_id, r.rule_key) loop
      for q in
        select x.id, x.invoice_number, x.employer_job_id, nullif(btrim(x.client_data->>'name'), '') as client
          from public.quotes x
         where x.user_id = rq.employer_id and x.invoice_raised and x.deleted_at is null
           and lower(coalesce(x.invoice_status, '')) in ('sent', 'overdue')
           and x.invoice_sent_at is not null
           and x.invoice_sent_at <= p_now - interval '14 days'
           and x.invoice_sent_at + interval '14 days' >= rq.enabled_at
           and (x.invoice_due_date is null or x.invoice_due_date < p_now)
           and coalesce(x.last_reminder_sent_at, '-infinity'::timestamptz) < p_now - interval '7 days'
           and nullif(btrim(coalesce(x.client_data->>'email', '')), '') is not null
         order by x.invoice_sent_at
         limit 20
      loop
        if public._automation_claim(rq.employer_id, 'invoice_unpaid_reminder', q.id::text, q.employer_job_id,
             'Reminding ' || coalesce(q.client, 'the customer') || ' about invoice ' || coalesce(q.invoice_number, ''),
             'queued', jsonb_build_object('invoice_id', q.id)) is not null then
          v_made := v_made + 1;
        end if;
      end loop;
    end loop;
    v_counts := v_counts || jsonb_build_object('invoice_unpaid_reminder', v_made);
  end if;

  -- 4. Hand queued customer emails to the sender (after a 2 minute settle).
  v_made := 0;
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  for q in
    select r.id, r.employer_id, r.rule_key from public.employer_automation_runs r
     where r.status = 'queued' and r.created_at < p_now - interval '2 minutes'
     order by r.created_at limit 25
     for update skip locked
  loop
    if not public._automation_on(q.employer_id, q.rule_key) then
      perform public._automation_finish(q.id, 'skipped',
        'Not sent: the rule was turned off or paused before it ran.');
    elsif v_key is null then
      raise warning '[run_employer_automations] service_role_key not in vault';
      exit;
    else
      update public.employer_automation_runs set status = 'sending' where id = q.id;
      perform net.http_post(
        url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/employer-automation-send',
        headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_key),
        body := jsonb_build_object('run_id', q.id));
      v_made := v_made + 1;
    end if;
  end loop;
  v_counts := v_counts || jsonb_build_object('dispatched', v_made);

  -- 5. Anything the sender never answered for an hour: failed, not retried.
  for q in select r.id from public.employer_automation_runs r
            where r.status = 'sending' and r.created_at < p_now - interval '1 hour' loop
    perform public._automation_finish(q.id, 'failed', 'Not confirmed as sent. Check with the customer before sending it again.');
  end loop;

  return v_counts;
end;
$$;

revoke all on function public.run_employer_automations(timestamptz) from public, anon, authenticated;
grant execute on function public.run_employer_automations(timestamptz) to service_role;
