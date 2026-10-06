-- ELE-2005: worker leave — no invented allowance, cancel tells the office only
-- when it matters, and a team-overlap hint that leaks no names.
--
-- 1. maintain_holiday_allowance(): stops CREATING a 28-day allowance row the
--    first time someone books annual leave. That row was indistinguishable from
--    one the office set, so the worker saw "28 days" as fact. It now only keeps
--    the counters of rows the office has created. Everything else unchanged.
-- 2. fill_holiday_allowance_counters(): when the office creates an allowance
--    row, used/pending are worked out from the leave already booked that year,
--    so a late-set allowance starts with the right balance.
-- 3. cancel_my_leave_request(): row lock; the firm bell fires when APPROVED
--    leave is cancelled (a pending request just leaves the queue, which is live).
-- 4. team_leave_overlap_count(start, end): how many OTHER active people in the
--    caller's firm have approved or pending leave overlapping those dates.
--    Returns a number only — never names or ids.

create or replace function public.maintain_holiday_allowance()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_year int;
  v_days numeric;
  v_old text;
  v_new text;
begin
  if coalesce(new.type, '') <> 'annual' then
    return new;
  end if;

  v_year := extract(year from new.start_date)::int;
  v_days := coalesce(new.total_days, 0);

  -- ELE-2005: no row is created here. An allowance exists only when the office
  -- sets one; fill_holiday_allowance_counters() back-fills it at that point.

  if tg_op = 'INSERT' and lower(new.status) = 'pending' then
    update employee_holiday_allowances
      set pending_days = coalesce(pending_days, 0) + v_days, updated_at = now()
      where employee_id = new.employee_id and year = v_year;
    return new;
  end if;

  if tg_op = 'INSERT' and lower(new.status) = 'approved' then
    update employee_holiday_allowances
      set used_days = coalesce(used_days, 0) + v_days, updated_at = now()
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

create or replace function public.fill_holiday_allowance_counters()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select
    coalesce(sum(r.total_days) filter (where lower(r.status) = 'approved'), 0),
    coalesce(sum(r.total_days) filter (where lower(r.status) = 'pending'), 0)
  into new.used_days, new.pending_days
  from public.employer_leave_requests r
  where r.employee_id = new.employee_id
    and r.type = 'annual'
    and extract(year from r.start_date)::int = new.year;
  return new;
end;
$$;

revoke all on function public.fill_holiday_allowance_counters() from public, anon;

drop trigger if exists fill_holiday_allowance_counters on public.employee_holiday_allowances;
create trigger fill_holiday_allowance_counters
  before insert on public.employee_holiday_allowances
  for each row execute function public.fill_holiday_allowance_counters();

create or replace function public.cancel_my_leave_request(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_leave_requests%rowtype;
  v_employer uuid;
  v_was_approved boolean;
  v_days text;
begin
  select * into v_row from public.employer_leave_requests
   where id = p_id and employee_id in (select public.my_employee_ids())
   for update;
  if not found then
    raise exception 'Leave request not found';
  end if;

  if lower(v_row.status) = 'pending' then
    v_was_approved := false;
  elsif lower(v_row.status) = 'approved' and v_row.start_date > current_date then
    v_was_approved := true;
  else
    raise exception 'Only pending requests, or approved leave that has not started, can be cancelled';
  end if;

  update public.employer_leave_requests
     set status = 'Cancelled'
   where id = p_id;

  if v_was_approved then
    select employer_id into v_employer from public.employer_employees where id = v_row.employee_id;
    v_days := trim_scale(coalesce(v_row.total_days, 0))::text;
    perform public.notify_employer_bell(
      v_employer,
      'leave_cancelled',
      'Approved leave cancelled',
      coalesce(v_row.employee_name, 'A team member') || ' cancelled approved leave: ' ||
        to_char(v_row.start_date, 'FMDD Mon') ||
        case when v_row.end_date is distinct from v_row.start_date
             then ' to ' || to_char(v_row.end_date, 'FMDD Mon') else '' end ||
        ' (' || v_days || case when v_days = '1' then ' day)' else ' days)' end,
      jsonb_build_object('leave_id', p_id)
    );
  end if;

  return jsonb_build_object('ok', true, 'status', 'Cancelled', 'office_told', v_was_approved);
end;
$$;

revoke all on function public.cancel_my_leave_request(uuid) from public, anon;
grant execute on function public.cancel_my_leave_request(uuid) to authenticated;

create or replace function public.team_leave_overlap_count(p_start date, p_end date)
returns integer
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if auth.uid() is null or p_start is null or p_end is null or p_end < p_start
     or p_end - p_start > 366 then
    return 0;
  end if;

  select count(distinct r.employee_id)::int into v_count
    from public.employer_leave_requests r
    join public.employer_employees e on e.id = r.employee_id
   where e.employer_id in (
           select me.employer_id from public.employer_employees me
            where me.id in (select public.my_employee_ids()) and me.employer_id is not null)
     and e.status ilike 'active'
     and r.employee_id not in (select public.my_employee_ids())
     and lower(r.status) in ('approved', 'pending')
     and r.start_date <= p_end
     and r.end_date >= p_start;

  return coalesce(v_count, 0);
end;
$$;

comment on function public.team_leave_overlap_count(date, date) is
  'ELE-2005: count of other active people in the caller''s firm with approved/pending leave overlapping the dates. Count only — never names.';

revoke all on function public.team_leave_overlap_count(date, date) from public, anon;
grant execute on function public.team_leave_overlap_count(date, date) to authenticated;
