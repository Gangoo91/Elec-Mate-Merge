-- ELE-2005 / ELE-1953: worker leave.
-- 1. cancel_my_leave_request(): a worker can withdraw a pending request, or an
--    approved one that hasn't started. Workers have no UPDATE policy on
--    employer_leave_requests, so this is a narrow SECURITY DEFINER RPC that only
--    ever sets status='cancelled' on the caller's own row. The firm is told.
-- 2. maintain_holiday_allowance(): pending→cancelled releases pending days and
--    approved→cancelled gives used days back (it only handled approved/rejected).
-- 3. trg_notify_leave_decision(): the decline alert now carries the reason.

create or replace function public.cancel_my_leave_request(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_leave_requests%rowtype;
  v_employer uuid;
begin
  select * into v_row from public.employer_leave_requests
   where id = p_id and employee_id in (select public.my_employee_ids());
  if not found then
    raise exception 'Leave request not found';
  end if;

  if lower(v_row.status) = 'pending' then
    null;
  elsif lower(v_row.status) = 'approved' and v_row.start_date > current_date then
    null;
  else
    raise exception 'Only pending requests, or approved leave that has not started, can be cancelled';
  end if;

  update public.employer_leave_requests
     set status = 'Cancelled'
   where id = p_id;

  select employer_id into v_employer from public.employer_employees where id = v_row.employee_id;
  perform public.notify_employer_bell(
    v_employer,
    'leave_cancelled',
    'Leave cancelled',
    coalesce(v_row.employee_name, 'A team member') || ' cancelled ' ||
      coalesce(v_row.total_days::text, '?') || ' day(s) from ' || to_char(v_row.start_date, 'FMDD Mon'),
    jsonb_build_object('leave_id', p_id)
  );

  return jsonb_build_object('ok', true, 'status', 'Cancelled');
end;
$$;

revoke all on function public.cancel_my_leave_request(uuid) from public;
grant execute on function public.cancel_my_leave_request(uuid) to authenticated;

create or replace function public.maintain_holiday_allowance()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_employer uuid;
  v_year int;
  v_days numeric;
  v_old text;
  v_new text;
begin
  if coalesce(new.type, '') <> 'annual' then
    return new;
  end if;

  select employer_id into v_employer from employer_employees where id = new.employee_id;
  if v_employer is null then
    return new;
  end if;

  v_year := extract(year from new.start_date)::int;
  v_days := coalesce(new.total_days, 0);

  insert into employee_holiday_allowances (user_id, employee_id, year, total_days, used_days, pending_days)
  values (v_employer, new.employee_id, v_year, 28, 0, 0)
  on conflict do nothing;

  if tg_op = 'INSERT' and lower(new.status) = 'pending' then
    update employee_holiday_allowances
      set pending_days = coalesce(pending_days, 0) + v_days, updated_at = now()
      where employee_id = new.employee_id and year = v_year;
    return new;
  end if;

  if tg_op = 'UPDATE' then
    v_old := lower(coalesce(old.status, ''));
    v_new := lower(coalesce(new.status, ''));
    if v_old = v_new then return new; end if;

    if v_old = 'pending' and v_new = 'approved' then
      update employee_holiday_allowances
        set pending_days = greatest(coalesce(pending_days, 0) - v_days, 0),
            used_days = coalesce(used_days, 0) + v_days,
            updated_at = now()
        where employee_id = new.employee_id and year = v_year;
    elsif v_old = 'pending' and v_new in ('rejected', 'cancelled') then
      update employee_holiday_allowances
        set pending_days = greatest(coalesce(pending_days, 0) - v_days, 0), updated_at = now()
        where employee_id = new.employee_id and year = v_year;
    elsif v_old = 'approved' and v_new in ('rejected', 'cancelled') then
      update employee_holiday_allowances
        set used_days = greatest(coalesce(used_days, 0) - v_days, 0), updated_at = now()
        where employee_id = new.employee_id and year = v_year;
    end if;
  end if;

  return new;
end;
$function$;

create or replace function public.trg_notify_leave_decision()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_worker uuid;
begin
  if new.status is distinct from old.status and lower(new.status) in ('approved','rejected') then
    select e.user_id into v_worker from employer_employees e where e.id = new.employee_id;
    perform worker_notify(
      v_worker, 'leave',
      case when lower(new.status) = 'approved' then 'Leave approved' else 'Leave declined' end,
      to_char(new.start_date, 'FMDD Mon') ||
        case when new.end_date is distinct from new.start_date
             then ' to ' || to_char(new.end_date, 'FMDD Mon') else '' end ||
        case when lower(new.status) = 'rejected' and nullif(trim(new.rejected_reason), '') is not null
             then ' — ' || left(new.rejected_reason, 140)
             else ' — ' || lower(new.status) end,
      jsonb_build_object('leave_id', new.id, 'route', '/electrician/worker-tools/leave'));
  end if;
  return new;
end; $function$;
