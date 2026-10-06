-- ELE-1831 phase 2.
--  * Supervisors approve their OWN crew (people whose supervisor_employee_id
--    is them) — timesheets, expenses and leave — and nothing else. The writes
--    match what the hub writes (same status, approver name and stamps), and
--    the existing decision triggers notify the worker as before.
--  * Seat pricing helper: Office managers aren't roster seats at all;
--    Supervisor/QS roles are free; apprentices are free while they have an
--    active college record. manage-employer-seats uses employer_seat_is_paid.

create or replace function public.my_crew_employee_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select e.id
    from public.employer_employees e
   where e.supervisor_employee_id in (select public.my_employee_ids())
     and lower(coalesce(e.status, '')) = 'active'
$$;
revoke execute on function public.my_crew_employee_ids() from public, anon;
grant execute on function public.my_crew_employee_ids() to authenticated, service_role;

create or replace function public.get_crew_approvals()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with crew as (
    select e.id, e.name from public.employer_employees e
     where e.id in (select public.my_crew_employee_ids())
  )
  select jsonb_build_object(
    'crew_count', (select count(*) from crew),
    'timesheets', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', t.id, 'employee_id', t.employee_id, 'name', c.name, 'date', t.date,
        'total_hours', t.total_hours, 'notes', t.notes, 'job_id', t.job_id
      ) order by t.date desc)
        from public.employer_timesheets t join crew c on c.id = t.employee_id
       where t.status = 'Pending'), '[]'::jsonb),
    'expenses', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', x.id, 'employee_id', x.employee_id, 'name', c.name, 'amount', x.amount,
        'category', x.category, 'description', x.description, 'submitted_date', x.submitted_date
      ) order by x.submitted_date desc)
        from public.employer_expense_claims x join crew c on c.id = x.employee_id
       where x.status = 'Pending'), '[]'::jsonb),
    'leave', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', l.id, 'employee_id', l.employee_id, 'name', c.name, 'type', l.type,
        'start_date', l.start_date, 'end_date', l.end_date, 'total_days', l.total_days,
        'half_day', l.half_day, 'reason', l.reason
      ) order by l.start_date)
        from public.employer_leave_requests l join crew c on c.id = l.employee_id
       where l.status = 'Pending'), '[]'::jsonb)
  )
$$;
revoke execute on function public.get_crew_approvals() from public, anon;
grant execute on function public.get_crew_approvals() to authenticated;

create or replace function public.decide_crew_request(p_kind text, p_id uuid, p_approve boolean, p_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
  v_reason text := nullif(left(btrim(coalesce(p_reason, '')), 1000), '');
  n int;
begin
  if auth.uid() is null then
    raise exception 'Sign in again';
  end if;
  if not p_approve and v_reason is null then
    raise exception 'Say why, so they can fix it';
  end if;
  select coalesce(nullif(btrim(full_name), ''), 'Supervisor') into v_name from public.profiles where id = auth.uid();

  if p_kind = 'timesheet' then
    update public.employer_timesheets
       set status = case when p_approve then 'Approved' else 'Rejected' end,
           approved_by = case when p_approve then v_name end,
           approved_by_id = case when p_approve then auth.uid() end,
           approved_at = case when p_approve then now() end,
           rejection_reason = case when p_approve then null else v_reason end,
           updated_at = now()
     where id = p_id and status = 'Pending'
       and employee_id in (select public.my_crew_employee_ids());
  elsif p_kind = 'expense' then
    update public.employer_expense_claims
       set status = case when p_approve then 'Approved' else 'Rejected' end,
           approved_by = v_name,
           approved_date = now(),
           rejection_reason = case when p_approve then null else v_reason end,
           updated_at = now()
     where id = p_id and status = 'Pending'
       and employee_id in (select public.my_crew_employee_ids());
  elsif p_kind = 'leave' then
    update public.employer_leave_requests
       set status = case when p_approve then 'Approved' else 'Rejected' end,
           approved_by = v_name,
           approved_date = now(),
           rejected_reason = case when p_approve then null else v_reason end
     where id = p_id and status = 'Pending'
       and employee_id in (select public.my_crew_employee_ids());
  else
    raise exception 'Unknown request type';
  end if;

  get diagnostics n = row_count;
  if n = 0 then
    raise exception 'This request is no longer waiting, or isn''t from your crew';
  end if;
  return jsonb_build_object('ok', true, 'status', case when p_approve then 'Approved' else 'Rejected' end);
end;
$$;
revoke execute on function public.decide_crew_request(text, uuid, boolean, text) from public, anon;
grant execute on function public.decide_crew_request(text, uuid, boolean, text) to authenticated;

-- Seats: who costs money.
create or replace function public.employer_seat_is_paid(p_employee_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case
    when e.id is null then true
    when public.employer_access_role(e.team_role) = 'supervisor' then false
    when public.employer_access_role(e.team_role) = 'apprentice'
         and e.user_id is not null
         and exists (select 1 from public.college_students cs
                      where cs.user_id = e.user_id
                        and coalesce(lower(cs.status), '') not in ('withdrawn', 'archived', 'completed'))
      then false
    else true
  end
  from (select 1) one
  left join public.employer_employees e on e.id = p_employee_id
$$;
revoke execute on function public.employer_seat_is_paid(uuid) from public, anon;
grant execute on function public.employer_seat_is_paid(uuid) to authenticated, service_role;

comment on function public.employer_seat_is_paid(uuid) is
  'ELE-1831 seat pricing: Supervisor/QS/PM/Apprentice Co-ordinator free; apprentice free while on an active college record; Engineer/Subcontractor paid. Office managers are employer_admins, not seats.';

-- What Stripe should bill: active seats on paid roles only.
create or replace function public.employer_paid_seat_count(p_employer uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::int
    from public.employer_seats s
   where s.employer_id = p_employer
     and s.status = 'active'
     and public.employer_seat_is_paid(s.employee_id)
$$;
revoke execute on function public.employer_paid_seat_count(uuid) from public, anon, authenticated;
grant execute on function public.employer_paid_seat_count(uuid) to service_role;

-- A role change can move someone between a paid and a free seat: resync billing.
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.tg_employer_employee_seat()'::regprocedure);
  if position('ELE-1831 role change' in v_def) > 0 then return; end if;
  if position('  -- Side effects: resync the Stripe seat quantity' in v_def) = 0 then
    raise exception 'tg_employer_employee_seat: anchor not found';
  end if;
  v_def := replace(v_def, '  -- Side effects: resync the Stripe seat quantity',
    E'  -- ELE-1831 role change: paid <-> free seat.\n'
    || E'  if tg_op = ''UPDATE'' and new.team_role is distinct from old.team_role\n'
    || E'     and new.user_id is not null and new.employer_id is not null then\n'
    || E'    v_billing_dirty := true;\n'
    || E'  end if;\n\n'
    || '  -- Side effects: resync the Stripe seat quantity');
  execute v_def;
end $$;
