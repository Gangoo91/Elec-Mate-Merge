-- Fix for 20261007361000: get_payroll_run read v_export.payday on an unassigned
-- record when called without p_export (plpgsql does not short-circuit). The
-- variable is now a rowtype, which starts as all-null. Same body otherwise.
create or replace function public.get_payroll_run(p_firm uuid, p_start date, p_end date, p_export uuid default null)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_money boolean;
  v_workers jsonb;
  v_exports jsonb;
  v_hidden integer := 0;
  v_export employer_payroll_exports%rowtype;
  v_payday date;
  v_source text;
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);

  if p_export is not null then
    select * into v_export from employer_payroll_exports x where x.id = p_export and x.employer_id = p_firm;
    if not found then
      raise exception 'not_found' using errcode = 'P0002';
    end if;
    p_start := v_export.period_start;
    p_end := v_export.period_end;
  end if;

  if p_start is null or p_end is null or p_end < p_start or p_end - p_start > 62 then
    raise exception 'period_invalid' using errcode = '22023';
  end if;

  if p_export is not null and v_export.payday is not null then
    v_payday := v_export.payday;
    v_source := coalesce(v_export.payday_source, 'settings');
  else
    v_payday := public._firm_payday(p_firm, p_end);
    v_source := case when v_payday is null then 'period_end' else 'settings' end;
    v_payday := coalesce(v_payday, p_end);
  end if;

  with emp as (
    select e.id, e.name, e.pay_type, e.hourly_rate, e.overtime_multiplier, e.overtime_threshold_hours
      from employer_employees e
     where e.employer_id = p_firm
  ), ts as (
    select t.* from employer_timesheets t join emp on emp.id = t.employee_id
     where t.status = 'Approved'
       and case when p_export is not null then t.payroll_export_id = p_export
                else t.payroll_export_id is null
                     and t.date <= p_end and t.date >= p_start - 62 end
  ), ex as (
    select c.* from employer_expense_claims c join emp on emp.id = c.employee_id
     where v_money
       and case when p_export is not null then c.payroll_export_id = p_export
                else c.payroll_export_id is null and c.status = 'Approved'
                     and coalesce(c.incurred_on, c.submitted_date, c.created_at::date) <= p_end end
  ), pend as (
    select t.employee_id, count(*) n, coalesce(sum(t.total_hours), 0) h
      from employer_timesheets t join emp on emp.id = t.employee_id
     where p_export is null and t.status = 'Pending' and t.clock_out is not null
       and t.date between p_start and p_end
     group by 1
  ), sent as (
    select t.employee_id, coalesce(sum(t.total_hours), 0) h
      from employer_timesheets t join emp on emp.id = t.employee_id
     where p_export is null and t.status = 'Approved' and t.payroll_export_id is not null
       and t.date between p_start and p_end
     group by 1
  ), lv as (
    select l.employee_id,
           sum(case when l.half_day is not null and l.start_date between p_start and p_end then 0.5
                    when l.half_day is not null then 0
                    else (select count(*) from generate_series(greatest(l.start_date, p_start),
                                                               least(l.end_date, p_end), interval '1 day') d
                           where extract(isodow from d) < 6) end) as days,
           string_agg(distinct replace(lower(coalesce(l.type, 'leave')), '_', ' '), ', ') as detail
      from employer_leave_requests l join emp on emp.id = l.employee_id
     where lower(l.status) = 'approved' and l.start_date <= p_end and l.end_date >= p_start
     group by 1
  ), ids as (
    select employee_id from ts union select employee_id from ex
    union select employee_id from lv where days > 0
    union select employee_id from pend
  )
  select coalesce(jsonb_agg(w order by w->>'name'), '[]'::jsonb) into v_workers
    from (
      select jsonb_build_object(
        'employee_id', emp.id,
        'name', coalesce(nullif(emp.name, ''), 'Unnamed'),
        'pay_type', coalesce(emp.pay_type, 'hourly'),
        'hourly_rate', case when v_money and emp.hourly_rate > 0 then emp.hourly_rate end,
        'overtime_multiplier', coalesce(emp.overtime_multiplier, 1.5),
        'overtime_threshold', coalesce(emp.overtime_threshold_hours, 8),
        'timesheet_ids', coalesce((select jsonb_agg(ts.id) from ts where ts.employee_id = emp.id), '[]'::jsonb),
        'days', coalesce((select jsonb_agg(jsonb_build_object('date', d.date, 'hours', d.h) order by d.date)
                            from (select ts.date, sum(coalesce(ts.total_hours, 0)) h
                                    from ts where ts.employee_id = emp.id group by ts.date) d), '[]'::jsonb),
        'earlier_hours', coalesce((select sum(ts.total_hours) from ts
                                    where ts.employee_id = emp.id and ts.date < p_start), 0),
        'awaiting_count', coalesce((select n from pend where pend.employee_id = emp.id), 0),
        'awaiting_hours', coalesce((select h from pend where pend.employee_id = emp.id), 0),
        'sent_hours', coalesce((select h from sent where sent.employee_id = emp.id), 0),
        'leave_days', coalesce((select days from lv where lv.employee_id = emp.id), 0),
        'leave_detail', coalesce((select detail from lv where lv.employee_id = emp.id and lv.days > 0), ''),
        'expenses', coalesce((select jsonb_agg(jsonb_build_object(
                                 'id', ex.id, 'category', ex.category, 'description', ex.description,
                                 'amount', ex.amount, 'miles', ex.mileage_miles,
                                 'date', coalesce(ex.incurred_on, ex.submitted_date)) order by coalesce(ex.incurred_on, ex.submitted_date))
                                from ex where ex.employee_id = emp.id), '[]'::jsonb)
      ) w
      from emp where emp.id in (select employee_id from ids)
    ) z;

  if not v_money and p_export is null then
    select count(*) into v_hidden
      from employer_expense_claims c join employer_employees e on e.id = c.employee_id
     where e.employer_id = p_firm and c.status = 'Approved' and c.payroll_export_id is null
       and coalesce(c.incurred_on, c.submitted_date, c.created_at::date) <= p_end;
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', x.id, 'period_start', x.period_start, 'period_end', x.period_end,
           'exported_at', x.exported_at, 'kind', x.kind, 'destination', x.destination,
           'timesheet_count', x.timesheet_count, 'expense_count', x.expense_count,
           'total_hours', x.total_hours, 'mileage_miles', x.mileage_miles,
           'people', coalesce(array_length(x.employee_ids, 1), 0),
           'by_name', coalesce(nullif(p.full_name, ''), 'Someone at the firm'),
           'mine', x.exported_by = auth.uid(),
           'payday', x.payday,
           'payday_source', x.payday_source,
           'expenses_paid_at', x.expenses_paid_at,
           'expenses_paid', x.expense_count > 0
                            and (x.expenses_paid_at is not null or (x.payday is not null and x.payday <= v_today)),
           'can_undo', x.exported_at > now() - interval '48 hours'
                       and (v_money or x.exported_by = auth.uid())
                       and (x.timesheet_count + x.expense_count) > 0
                       and not (x.expense_count > 0
                                and (x.expenses_paid_at is not null
                                     or (x.payday is not null and x.payday <= v_today))))
         order by x.exported_at desc), '[]'::jsonb)
    into v_exports
    from employer_payroll_exports x
    left join profiles p on p.id = x.exported_by
   where x.employer_id = p_firm
     and x.period_start <= p_end and x.period_end >= p_start;

  return jsonb_build_object(
    'period_start', p_start,
    'period_end', p_end,
    'export_id', p_export,
    'money_visible', v_money,
    'payday', v_payday,
    'payday_source', v_source,
    'workers', v_workers,
    'hidden_expense_count', v_hidden,
    'exports', v_exports);
end;
$$;

revoke all on function public.get_payroll_run(uuid, date, date, uuid) from public, anon;
grant execute on function public.get_payroll_run(uuid, date, date, uuid) to authenticated;
