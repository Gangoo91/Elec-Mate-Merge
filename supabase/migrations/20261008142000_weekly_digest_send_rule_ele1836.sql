-- ELE-1836 (3/3): the Sunday email is about the TEAM, so it only goes to a firm
-- that has one (at least one active person on the roster) — a firm that only
-- sends invoices from the Electrical Hub gets nothing. And when next week has
-- work booked but nobody on any day, say that plainly instead of listing five
-- weekdays.
create or replace function public._employer_weekly_digest(p_firm uuid, p_sunday date)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_from date := p_sunday - 6;
  v_to date := p_sunday;
  v_next_from date := p_sunday + 1;
  v_next_to date := p_sunday + 7;
  v_office uuid[];
  v_jobs int; v_hours numeric; v_invoiced numeric; v_paid numeric; v_snags int;
  v_booked int; v_ts_wait int; v_unpaid int; v_unpaid_sum numeric;
  v_events int; v_empty text[]; v_attest jsonb; v_fix jsonb;
  v_name text;
  v_roster int;
begin
  select array_agg(x) into v_office from (
    select p_firm x
    union select a.user_id from public.employer_admins a
     where a.employer_id = p_firm and a.status = 'active' and a.user_id is not null) o;

  select coalesce(nullif(btrim(c.company_name), ''), 'your firm') into v_name
    from public.company_profiles c where c.user_id = p_firm limit 1;

  select count(*) into v_roster from public.employer_employees e
   where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'
     and e.user_id is distinct from p_firm;

  select count(*) into v_events from public.employer_usage_events e
   where e.employer_id = p_firm and e.actor_role <> 'backfill'
     and e.created_at >= (v_from::timestamp at time zone 'Europe/London')
     and e.created_at < ((v_to + 1)::timestamp at time zone 'Europe/London');

  select count(distinct job_id) into v_jobs from (
    select t.job_id from public.employer_timesheets t
      join public.employer_employees e on e.id = t.employee_id
     where e.employer_id = p_firm and t.job_id is not null and t.date between v_from and v_to
    union
    select a.job_id from public.employer_job_assignments a
      join public.employer_jobs j on j.id = a.job_id
     where j.user_id = p_firm and a.start_date is not null
       and a.start_date <= v_to and coalesce(a.end_date, a.start_date) >= v_from
    union
    select j.id from public.employer_jobs j
     where j.user_id = p_firm and j.completed_at is not null
       and (j.completed_at at time zone 'Europe/London')::date between v_from and v_to
  ) w;

  select coalesce(sum(t.total_hours), 0) into v_hours
    from public.employer_timesheets t join public.employer_employees e on e.id = t.employee_id
   where e.employer_id = p_firm and lower(coalesce(t.status, '')) = 'approved'
     and t.date between v_from and v_to;

  select coalesce(sum(q.total), 0) into v_invoiced from public.quotes q
   where q.user_id = any (v_office) and q.invoice_sent_at is not null
     and (q.invoice_sent_at at time zone 'Europe/London')::date between v_from and v_to;

  select coalesce(sum(coalesce(nullif(q.total_paid, 0), q.total)), 0) into v_paid from public.quotes q
   where q.user_id = any (v_office) and q.invoice_status = 'paid' and q.invoice_paid_at is not null
     and (q.invoice_paid_at at time zone 'Europe/London')::date between v_from and v_to;

  select count(*) into v_snags from public.job_issues s join public.employer_jobs j on j.id = s.job_id
   where j.user_id = p_firm
     and lower(coalesce(s.status, '')) not in ('resolved', 'closed', 'done', 'fixed', 'cancelled');

  select count(distinct j.id) into v_booked from public.employer_jobs j
   where j.user_id = p_firm and j.archived_at is null and coalesce(j.is_template, false) = false
     and lower(coalesce(j.status, '')) not in ('cancelled', 'completed', 'complete')
     and (
       (j.start_date between v_next_from and v_next_to)
       or exists (select 1 from public.employer_job_assignments a
                   where a.job_id = j.id and a.start_date is not null
                     and a.start_date <= v_next_to and coalesce(a.end_date, a.start_date) >= v_next_from)
     );

  -- Weekdays next week with nobody on any job (only worth saying when work is booked).
  if v_booked > 0 then
    select array_agg(to_char(d, 'FMDay') order by d) into v_empty
      from generate_series(v_next_from, v_next_from + 4, interval '1 day') d
     where not exists (
       select 1 from public.employer_job_assignments a join public.employer_jobs j on j.id = a.job_id
        where j.user_id = p_firm and a.start_date is not null
          and a.start_date <= d::date and coalesce(a.end_date, a.start_date) >= d::date);
  end if;

  select count(*) into v_ts_wait from public.employer_timesheets t
    join public.employer_employees e on e.id = t.employee_id
   where e.employer_id = p_firm and lower(coalesce(t.status, '')) in ('pending', 'submitted')
     and t.total_hours is not null;

  select count(*), coalesce(sum(greatest(q.total - coalesce(q.total_paid, 0), 0)), 0)
    into v_unpaid, v_unpaid_sum
    from public.quotes q
   where q.user_id = any (v_office) and q.invoice_status in ('sent', 'overdue')
     and q.invoice_due_date is not null and q.invoice_due_date < (p_sunday::timestamp at time zone 'Europe/London');

  -- Apprentice hours the firm signed off last week (names: the boss's own team).
  select coalesce(jsonb_agg(jsonb_build_object('name', x.name, 'hours', x.hours) order by x.hours desc), '[]'::jsonb)
    into v_attest
    from (
      select split_part(coalesce(nullif(btrim(e.name), ''), 'Apprentice'), ' ', 1) name,
             round(sum(o.duration_minutes)::numeric / 60, 1) hours
        from public.college_otj_entries o
        join public.employer_employees e on e.user_id = o.student_id and e.employer_id = p_firm
       where o.verification_status = 'verified_by_employer' and o.verified_at is not null
         and (o.verified_at at time zone 'Europe/London')::date between v_from and v_to
       group by 1 order by 2 desc limit 3
    ) x;

  -- The one thing to fix, in the ticket's order.
  v_fix := case
    when coalesce(array_length(v_empty, 1), 0) = 5 then jsonb_build_object(
      'kind', 'unassigned_day',
      'text', 'Nobody is booked on next week''s jobs yet',
      'route', '/employer?section=diary')
    when coalesce(array_length(v_empty, 1), 0) between 1 and 4 then jsonb_build_object(
      'kind', 'unassigned_day',
      'text', case when array_length(v_empty, 1) = 1 then v_empty[1] || ' has nobody booked on a job'
                   else array_to_string(v_empty[1:array_length(v_empty, 1) - 1], ', ') || ' and '
                        || v_empty[array_length(v_empty, 1)] || ' have nobody booked on a job' end,
      'route', '/employer?section=diary')
    when v_ts_wait > 0 then jsonb_build_object(
      'kind', 'timesheets',
      'text', v_ts_wait || case when v_ts_wait = 1 then ' timesheet is' else ' timesheets are' end || ' waiting for you to approve',
      'route', '/employer?section=timesheets&tab=pending')
    when v_unpaid > 0 then jsonb_build_object(
      'kind', 'unpaid',
      'text', v_unpaid || case when v_unpaid = 1 then ' invoice is' else ' invoices are' end || ' overdue',
      'amount', v_unpaid_sum,
      'route', '/employer?section=quotes')
    else null end;

  return jsonb_build_object(
    'firm_name', v_name,
    'week_from', v_from, 'week_to', v_to,
    'next_from', v_next_from, 'next_to', v_next_to,
    'activity', v_events,
    'jobs', v_jobs,
    'hours_approved', v_hours,
    'invoiced', v_invoiced,
    'paid_in', v_paid,
    'snags_open', v_snags,
    'jobs_booked', v_booked,
    'empty_days', to_jsonb(coalesce(v_empty, '{}')),
    'timesheets_waiting', v_ts_wait,
    'unpaid_count', v_unpaid,
    'unpaid_sum', v_unpaid_sum,
    'attested', v_attest,
    'fix', v_fix,
    'roster', v_roster,
    'should_send', (v_roster > 0 and (v_events > 0 or v_booked > 0))
  );
end;
$$;
revoke all on function public._employer_weekly_digest(uuid, date) from public, anon, authenticated;
