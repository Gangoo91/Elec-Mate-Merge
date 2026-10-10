-- ELE-2079 review fixes, part 3 (see 20261010272000): decline cancels the
-- unpaid deposit invoice; accept gives the calendar copy its window. Plus
-- dispatch_assign_crew below.

/* ── Office ─────────────────────────────────────────────────────────────── */

create or replace function public.decide_online_booking(
  p_booking uuid, p_action text, p_employee uuid default null,
  p_day date default null, p_half text default null, p_reason text default null)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  b public.employer_online_bookings;
  v_emp uuid;
  v_day date;
  v_half text;
  v_start time;
  v_assignment uuid;
  v_dep_cancelled boolean := false;
begin
  select * into b from public.employer_online_bookings where id = p_booking for update;
  if b.id is null or auth.uid() is null or b.firm_id not in (select public.my_employer_scope()) then
    raise exception 'Booking not found' using errcode = '42501';
  end if;
  if b.status <> 'tentative' then
    raise exception 'This booking has already been %', b.status using errcode = '22023';
  end if;

  if p_action = 'decline' then
    update public.employer_online_bookings
       set status = 'declined', decided_at = now(), decided_by = auth.uid(),
           decline_reason = nullif(left(btrim(coalesce(p_reason, '')), 300), ''), updated_at = now()
     where id = b.id;
    if b.job_id is not null then
      update public.employer_jobs set archived_at = now(), updated_at = now()
       where id = b.job_id and archived_at is null;
    end if;
    -- An unpaid deposit invoice is cancelled, so it can't be paid at /pay/<id>
    -- and no longer counts as owed. A paid one stays: the office refunds it.
    if b.deposit_invoice_id is not null then
      update public.invoices set status = 'cancelled', updated_at = now()
       where id = b.deposit_invoice_id and user_id = b.firm_id
         and paid_at is null and coalesce(status, '') <> 'paid' and coalesce(total_paid, 0) = 0;
      v_dep_cancelled := found;
    end if;
    return jsonb_build_object('ok', true, 'status', 'declined', 'customer', b.customer_name,
                              'phone', b.customer_phone, 'email', b.customer_email,
                              'deposit_cancelled', v_dep_cancelled);
  end if;

  if p_action <> 'accept' then raise exception 'Unknown action' using errcode = '22023'; end if;
  if b.job_id is null then raise exception 'The diary job for this booking was removed' using errcode = '22023'; end if;

  v_emp := coalesce(p_employee, b.suggested_employee_id);
  if v_emp is null then raise exception 'Choose who goes' using errcode = '22023'; end if;
  v_day := coalesce(p_day, b.day);
  v_half := coalesce(p_half, b.half);
  if v_half not in ('am', 'pm', 'day') then raise exception 'Choose morning, afternoon or all day' using errcode = '22023'; end if;
  v_start := public._booking_half_start(v_half);

  -- The job's day moves with the booking; then the person is booked through
  -- the existing dispatch path (push to the worker, change log, calendar).
  update public.employer_jobs
     set start_date = v_day, end_date = v_day, board_stage = 'Scheduled', updated_at = now()
   where id = b.job_id;
  v_assignment := public.dispatch_assign(b.job_id, v_emp, v_day, v_day, v_start,
                                         round(b.minutes / 60.0, 2), 'Booked online, ref ' || b.reference);

  update public.employer_online_bookings
     set status = 'confirmed', decided_at = now(), decided_by = auth.uid(),
         day = v_day, half = v_half, start_time = v_start, suggested_employee_id = v_emp, updated_at = now()
   where id = b.id;
  -- Now the booking is confirmed, the calendar copy takes its window.
  perform public.sync_firm_job_calendar(b.job_id);
  update public.calendar_events set customer_reminder_opt_in = true
   where mirrored_from_job = b.job_id and user_id = b.firm_id and b.customer_email is not null;

  return jsonb_build_object('ok', true, 'status', 'confirmed', 'job_id', b.job_id, 'assignment_id', v_assignment,
                            'has_email', b.customer_email is not null, 'day', v_day, 'half', v_half,
                            'moved', v_day <> b.day or v_half <> b.half);
end;
$$;

revoke all on function public.decide_online_booking(uuid, text, uuid, date, text, text) from public, anon;
grant execute on function public.decide_online_booking(uuid, text, uuid, date, text, text) to authenticated;

-- ELE-2079 review fix 8 (with ELE-2072) — "Suggest a slot" books a crew of
-- two or more in one go.
--
-- SuggestSlotSheet booked each person with its own dispatch_assign call, so a
-- failure on the second left the first booked on their own. This books them
-- all through dispatch_assign (same checks, same triggers: push, change log,
-- calendar) inside one transaction: all of them, or none, and no push goes
-- for a booking that was rolled back.
--
-- Additive: a new function. Authorisation is dispatch_assign's own
-- (dispatch_job_firm / dispatch_check_person, as the caller).

create or replace function public.dispatch_assign_crew(
  p_job uuid, p_employees uuid[], p_start date, p_end date default null,
  p_start_time time default null, p_hours numeric default null, p_notes text default null)
returns uuid[]
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_ids uuid[] := '{}';
  v_emp uuid;
begin
  if auth.uid() is null then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if p_employees is null or cardinality(p_employees) = 0 or cardinality(p_employees) > 10 then
    raise exception 'Choose who goes' using errcode = '22023';
  end if;
  foreach v_emp in array (select array_agg(distinct x) from unnest(p_employees) x where x is not null) loop
    v_ids := v_ids || public.dispatch_assign(p_job, v_emp, p_start, p_end, p_start_time, p_hours, p_notes);
  end loop;
  return v_ids;
end;
$$;

revoke all on function public.dispatch_assign_crew(uuid, uuid[], date, date, time, numeric, text) from public, anon;
grant execute on function public.dispatch_assign_crew(uuid, uuid[], date, date, time, numeric, text) to authenticated;
