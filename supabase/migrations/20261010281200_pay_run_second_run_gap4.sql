-- Gap #4 follow-up: a second run in the same pay period (late approvals) must
-- not pay SSP twice or record holiday built up twice.
--   * send_pay_run() (this migration's own function, not called by HEAD or
--     build 49) now keeps SSP days per person in pay_check.ssp (days only,
--     no pay), which the next run in the period reads.
--   * Accrual rows top up: only hours above what is already recorded for that
--     person and pay period are written.
-- Signature unchanged.

create or replace function public.send_pay_run(
  p_firm uuid,
  p_start date,
  p_end date,
  p_preset text,
  p_timesheet_ids uuid[],
  p_expense_ids uuid[],
  p_holiday_rows jsonb default '[]'::jsonb,
  p_pay_check jsonb default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_money boolean;
  v_kind text;
  v_res jsonb;
  v_id uuid;
  v_below int;
  v_names text;
  v_reason text := nullif(btrim(coalesce(p_pay_check->>'override_reason', '')), '');
  v_rows jsonb := coalesce(p_holiday_rows, '[]'::jsonb);
  r jsonb;
  v_kind_row text;
  v_emp record;
  v_n int := 0;
  v_ssp jsonb;
  v_before numeric;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  v_money := public.can_see_firm_money(p_firm);
  if p_preset is null
     or p_preset not in ('xero', 'sage', 'quickbooks', 'brightpay', 'moneysoft', 'generic', 'hours') then
    raise exception 'preset_invalid' using errcode = '22023';
  end if;
  if not v_money and p_preset <> 'hours' then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  if jsonb_typeof(v_rows) <> 'array' or jsonb_array_length(v_rows) > 500 then
    raise exception 'invalid' using errcode = '22023';
  end if;

  -- Minimum wage: checked here, on the rows being sent, not just on screen.
  select count(*), string_agg(b.name, ', ' order by b.name)
    into v_below, v_names
    from public._pay_run_below_minimum(p_firm, p_timesheet_ids) b;
  if v_below > 0 then
    if not v_money then
      raise exception 'pay_check_needed' using errcode = '22023',
        hint = 'Someone in this run is paid below the legal minimum. The owner or an admin must check it.';
    end if;
    if v_reason is null then
      raise exception 'below_minimum' using errcode = '22023', detail = v_names;
    end if;
  end if;

  v_kind := case when p_preset in ('xero', 'sage', 'quickbooks', 'hours') then p_preset else 'csv' end;
  v_res := public.send_payroll_run(p_firm, p_start, p_end, v_kind, p_timesheet_ids, p_expense_ids);
  v_id := (v_res->>'export_id')::uuid;

  if coalesce((v_res->>'replayed')::boolean, false) then
    return v_res || jsonb_build_object(
      'holiday_rows', (select x.holiday_rows from employer_payroll_exports x where x.id = v_id),
      'preset', (select x.preset from employer_payroll_exports x where x.id = v_id));
  end if;

  -- The 6-year holiday record, written with the run.
  for r in select * from jsonb_array_elements(v_rows) loop
    v_kind_row := r->>'kind';
    continue when v_kind_row is null or v_kind_row not in ('accrual', 'holiday_pay', 'rolled_up_pay');
    continue when not v_money and (v_kind_row <> 'accrual' or r->>'amount' is not null);
    select e.id, e.name into v_emp
      from employer_employees e
     where e.id = (r->>'employee_id')::uuid and e.employer_id = p_firm
       and coalesce(e.team_role, '') <> 'Subcontractor';
    continue when v_emp.id is null;
    if v_kind_row = 'accrual' then
      v_before := coalesce((select sum(h.hours) from employer_holiday_records h
                             where h.employer_id = p_firm and h.employee_id = v_emp.id and h.kind = 'accrual'
                               and h.period_start is not distinct from (r->>'period_start')::date
                               and h.period_end is not distinct from (r->>'period_end')::date), 0);
      continue when coalesce((r->>'hours')::numeric, 0) - v_before <= 0;
      if v_before > 0 then
        r := jsonb_set(r, '{hours}', to_jsonb(coalesce((r->>'hours')::numeric, 0) - v_before));
        r := jsonb_set(r, '{method}', to_jsonb(left(coalesce(r->>'method', ''), 440) || ', less ' || v_before || 'h already recorded'));
      end if;
    end if;
    continue when exists (
      select 1 from employer_holiday_records h
       where h.employer_id = p_firm and h.employee_id = v_emp.id and h.kind = v_kind_row
         and h.period_start is not distinct from (r->>'period_start')::date
         and h.period_end is not distinct from (r->>'period_end')::date
         and h.hours is not distinct from (r->>'hours')::numeric
         and h.days is not distinct from (r->>'days')::numeric
         and h.amount is not distinct from (case when v_money then (r->>'amount')::numeric end));
    insert into employer_holiday_records
      (employer_id, employee_id, employee_name, kind, period_start, period_end, days, hours,
       amount, basis, method, is_estimate, source, source_id)
    values (p_firm, v_emp.id, v_emp.name, v_kind_row, (r->>'period_start')::date, (r->>'period_end')::date,
            (r->>'days')::numeric, (r->>'hours')::numeric,
            case when v_money then (r->>'amount')::numeric end,
            case when r->>'basis' in ('fixed', 'irregular', 'part_year') then r->>'basis' end,
            left(r->>'method', 500), coalesce((r->>'is_estimate')::boolean, false),
            'pay_run', v_id);
    v_n := v_n + 1;
  end loop;

  -- SSP days carried per person (days only, no pay), so a later run in the
  -- same period does not pay them again.
  select coalesce(jsonb_object_agg(k, to_jsonb(least(62, greatest(0, (v #>> '{}')::numeric)))), '{}'::jsonb)
    into v_ssp
    from jsonb_each(case when jsonb_typeof(p_pay_check->'ssp') = 'object' then p_pay_check->'ssp' else '{}'::jsonb end) e(k, v)
   where k ~ '^[0-9a-f-]{36}$' and jsonb_typeof(v) = 'number'
     and exists (select 1 from employer_employees x where x.id = k::uuid and x.employer_id = p_firm);

  update employer_payroll_exports
     set preset = p_preset,
         holiday_rows = v_n,
         pay_check = jsonb_build_object(
           'checked_at', now(),
           'below', v_below,
           'no_birth_date', greatest(0, coalesce((p_pay_check->>'no_birth_date')::int, 0)),
           'override_reason', case when v_below > 0 then left(v_reason, 300) end,
           'ssp', v_ssp)
   where id = v_id;

  return v_res || jsonb_build_object('holiday_rows', v_n, 'preset', p_preset, 'below', v_below);
end $$;

revoke all on function public.send_pay_run(uuid, date, date, text, uuid[], uuid[], jsonb, jsonb) from public, anon;
grant execute on function public.send_pay_run(uuid, date, date, text, uuid[], uuid[], jsonb, jsonb) to authenticated;
