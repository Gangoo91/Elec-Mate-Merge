-- ELE-1835 — Mate for the office.
--
-- One read function behind Mate's `get_office_brief` tool, called with the
-- CALLER's JWT so my_employer_scope() and can_see_firm_money() decide what
-- comes back (an office manager never gets invoice money):
--   diary            who's booked where, and who's free, day by day (max 14 days)
--   unpaid           invoices unpaid more than N days (owner/admin only)
--   recurring        repeat visits and certificate renewals coming up
--   apprentice_hours each apprentice's off-the-job hours this month
--   today            the morning picture: jobs today and gaps, approvals,
--                    hours waiting, kit and renewals due
-- And the 7am briefing: one bell to the firm on weekdays, only when there is
-- something that needs them today.

create or replace function public._office_today(p_firm uuid)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  with d as (select (now() at time zone 'Europe/London')::date as today),
  jobs_today as (
    select j.id, j.title,
           exists (select 1 from public.employer_job_assignments a
                    where a.job_id = j.id and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                      and (select today from d) between a.start_date and coalesce(a.end_date, a.start_date)) as crewed
      from public.employer_jobs j
     where j.user_id = p_firm and j.archived_at is null and coalesce(j.is_template, false) = false
       and lower(coalesce(j.status, '')) not in ('cancelled', 'completed')
       and (select today from d) between j.start_date and coalesce(j.end_date, j.start_date)
  ),
  roster as (
    select e.id from public.employer_employees e
     where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'
  )
  select jsonb_build_object(
    'date', (select today from d),
    'jobs_today', (select count(*) from jobs_today),
    'jobs_uncrewed', (select coalesce(jsonb_agg(jsonb_build_object('id', id, 'title', title)), '[]'::jsonb) from jobs_today where not crewed),
    'timesheets_waiting', (select count(*) from public.employer_timesheets t
                            where t.employee_id in (select id from roster) and t.status = 'Pending' and t.clock_out is not null),
    'expenses_waiting', (select count(*) from public.employer_expense_claims x
                          where x.employee_id in (select id from roster) and x.status = 'Pending'),
    'leave_waiting', (select count(*) from public.employer_leave_requests l
                       where l.employee_id in (select id from roster) and l.status = 'Pending'),
    'otj_waiting', (select count(*) from public.college_otj_entries o
                     join public.employer_employees e on e.user_id = o.student_id
                    where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'
                      and o.verification_status = 'pending' and o.source_kind in ('apprentice_submitted', 'in_app')),
    'kit_due', (select coalesce(jsonb_agg(jsonb_build_object('name', t.name,
                         'what', case when t.next_calibration is not null and t.next_calibration <= (select today from d) + 14 then 'calibration' else 'PAT' end,
                         'due', least(coalesce(t.next_calibration, 'infinity'::date), coalesce(t.pat_due, 'infinity'::date)))
                       order by least(coalesce(t.next_calibration, 'infinity'::date), coalesce(t.pat_due, 'infinity'::date))), '[]'::jsonb)
                  from public.employer_company_tools t
                 where t.user_id = p_firm and lower(coalesce(t.status, '')) not in ('retired', 'disposed', 'lost')
                   and (t.next_calibration <= (select today from d) + 14 or t.pat_due <= (select today from d) + 14))
  )
$function$;
revoke all on function public._office_today(uuid) from public, anon, authenticated;

create or replace function public.get_mate_office_brief(
  p_firm uuid, p_kind text, p_from date default null, p_to date default null,
  p_person text default null, p_days integer default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_from date := coalesce(p_from, (now() at time zone 'Europe/London')::date);
  v_to date;
  v_person text := nullif(lower(btrim(coalesce(p_person, ''))), '');
begin
  if p_firm is null or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed';
  end if;

  if p_kind = 'today' then
    return public._office_today(p_firm);

  elsif p_kind = 'diary' then
    v_to := least(coalesce(p_to, v_from), v_from + 13);
    return (
      select coalesce(jsonb_agg(jsonb_build_object(
               'day', g.day,
               'booked', (select coalesce(jsonb_agg(jsonb_build_object('person', e.name, 'job', j.title, 'job_id', j.id) order by e.name), '[]'::jsonb)
                            from public.employer_job_assignments a
                            join public.employer_employees e on e.id = a.employee_id
                            join public.employer_jobs j on j.id = a.job_id
                           where j.user_id = p_firm and j.archived_at is null
                             and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                             and g.day between a.start_date and coalesce(a.end_date, a.start_date)
                             and (v_person is null or lower(e.name) like '%' || v_person || '%')),
               'free', (select coalesce(jsonb_agg(e.name order by e.name), '[]'::jsonb)
                          from public.employer_employees e
                         where e.employer_id = p_firm and lower(coalesce(e.status, '')) = 'active'
                           and (v_person is null or lower(e.name) like '%' || v_person || '%')
                           and not exists (select 1 from public.employer_job_assignments a
                                            join public.employer_jobs j on j.id = a.job_id
                                           where a.employee_id = e.id and j.archived_at is null
                                             and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
                                             and g.day between a.start_date and coalesce(a.end_date, a.start_date))
                           and not exists (select 1 from public.employer_leave_requests l
                                            where l.employee_id = e.id and l.status = 'Approved'
                                              and g.day between l.start_date and coalesce(l.end_date, l.start_date))),
               'on_leave', (select coalesce(jsonb_agg(e.name order by e.name), '[]'::jsonb)
                              from public.employer_leave_requests l
                              join public.employer_employees e on e.id = l.employee_id
                             where e.employer_id = p_firm and l.status = 'Approved'
                               and g.day between l.start_date and coalesce(l.end_date, l.start_date)))
             order by g.day), '[]'::jsonb)
        from (select generate_series(v_from, v_to, interval '1 day')::date as day) g);

  elsif p_kind = 'unpaid' then
    if not public.can_see_firm_money(p_firm) then
      return jsonb_build_object('hidden', true, 'reason', 'Invoice amounts are for the owner and admins only.');
    end if;
    return jsonb_build_object('invoices', coalesce((
      select jsonb_agg(x order by x.days_old desc) from (
        select q.id, coalesce(q.invoice_number, q.quote_number) as number,
               coalesce(q.client_data->>'name', 'Client') as client,
               round(greatest(coalesce(q.total, 0) - coalesce(q.total_paid, 0), 0), 2) as outstanding,
               (v_today - q.invoice_date::date) as days_old,
               greatest(v_today - q.invoice_due_date::date, 0) as days_overdue
          from public.quotes q
         where q.user_id = p_firm and q.deleted_at is null and coalesce(q.invoice_raised, false)
           and lower(coalesce(q.invoice_status, '')) not in ('paid', 'void', 'cancelled', 'credited', 'draft')
           and coalesce(q.total, 0) - coalesce(q.total_paid, 0) > 0.009
           and q.invoice_date::date <= v_today - greatest(coalesce(p_days, 30), 0)
         order by q.invoice_date limit 25) x), '[]'::jsonb));

  elsif p_kind = 'recurring' then
    return jsonb_build_object(
      'visits', (select coalesce(jsonb_agg(r order by r->>'next_due_date'), '[]'::jsonb)
                   from jsonb_array_elements(public.get_firm_recurring(p_firm)) r
                  where r->>'status' = 'active'
                    and (r->>'next_due_date')::date <= v_today + coalesce(p_days, 120)
                    and (v_person is null or lower(coalesce(r->>'title', '') || ' ' || coalesce(r->>'client', '') || ' ' || coalesce(r->>'location', '')) like '%' || v_person || '%')),
      'renewals', public.get_firm_renewals(p_firm, coalesce(p_days, 120)));

  elsif p_kind = 'apprentice_hours' then
    return (
      select coalesce(jsonb_agg(jsonb_build_object(
               'name', e.name,
               'logged_hours', round(coalesce((select sum(o.duration_minutes) from public.college_otj_entries o
                                                where o.student_id = e.user_id and o.verification_status <> 'rejected'
                                                  and o.activity_date >= date_trunc('month', v_today)::date), 0) / 60.0, 1),
               'confirmed_hours', round(coalesce((select sum(o.duration_minutes) from public.college_otj_entries o
                                                   where o.student_id = e.user_id and o.source_kind = 'employer_attested'
                                                     and o.verification_status in ('verified_by_employer', 'verified')
                                                     and o.activity_date >= date_trunc('month', v_today)::date), 0) / 60.0, 1),
               'waiting', (select count(*) from public.college_otj_entries o
                            where o.student_id = e.user_id and o.verification_status = 'pending'
                              and o.source_kind in ('apprentice_submitted', 'in_app')),
               'joined', e.user_id is not null) order by e.name), '[]'::jsonb)
        from public.employer_employees e
       where e.employer_id = p_firm and lower(coalesce(e.team_role, '')) = 'apprentice'
         and lower(coalesce(e.status, '')) <> 'archived'
         and (v_person is null or lower(e.name) like '%' || v_person || '%'));
  end if;
  raise exception 'Unknown brief';
end;
$function$;
revoke all on function public.get_mate_office_brief(uuid,text,date,date,text,integer) from public, anon;
grant execute on function public.get_mate_office_brief(uuid,text,date,date,text,integer) to authenticated;

-- The 7am briefing ---------------------------------------------------------------
create or replace function public.notify_office_morning_brief()
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  r record;
  b jsonb;
  v_lines text[];
  v_ref text := 'morning_brief:' || to_char((now() at time zone 'Europe/London')::date, 'YYYY-MM-DD');
  v_unc int;
begin
  if extract(isodow from (now() at time zone 'Europe/London')) > 5 then return; end if;
  for r in
    select e.employer_id as firm from public.employer_employees e
     where e.employer_id is not null and lower(coalesce(e.status, '')) = 'active' and e.user_id is not null
     group by e.employer_id
  loop
    begin
      b := public._office_today(r.firm);
      v_unc := jsonb_array_length(b->'jobs_uncrewed');
      v_lines := array_remove(array[
        case when (b->>'jobs_today')::int > 0 then
          (b->>'jobs_today') || ' job' || case when (b->>'jobs_today')::int = 1 then '' else 's' end || ' today'
          || case when v_unc > 0 then ', ' || v_unc || ' with nobody booked (' || (b->'jobs_uncrewed'->0->>'title') || case when v_unc > 1 then ' and more' else '' end || ')' else '' end
        end,
        case when (b->>'timesheets_waiting')::int > 0 then (b->>'timesheets_waiting') || ' timesheet' || case when (b->>'timesheets_waiting')::int = 1 then '' else 's' end || ' to approve' end,
        case when (b->>'expenses_waiting')::int > 0 then (b->>'expenses_waiting') || ' expense' || case when (b->>'expenses_waiting')::int = 1 then '' else 's' end end,
        case when (b->>'leave_waiting')::int > 0 then (b->>'leave_waiting') || ' leave request' || case when (b->>'leave_waiting')::int = 1 then '' else 's' end end,
        case when (b->>'otj_waiting')::int > 0 then (b->>'otj_waiting') || ' apprentice training entr' || case when (b->>'otj_waiting')::int = 1 then 'y' else 'ies' end || ' waiting' end,
        case when jsonb_array_length(b->'kit_due') > 0 then (b->'kit_due'->0->>'name') || ' ' || (b->'kit_due'->0->>'what') || ' due ' || to_char((b->'kit_due'->0->>'due')::date, 'FMDD Mon') end
      ], null);
      -- Only when something needs them today: jobs alone don't ring the bell.
      continue when coalesce(array_length(v_lines, 1), 0) = 0
        or (array_length(v_lines, 1) = 1 and v_unc = 0 and (b->>'jobs_today')::int > 0);
      insert into public.employer_expiry_sent (firm, ref) values (r.firm, v_ref) on conflict do nothing;
      continue when not found;
      perform public.notify_employer_bell(
        r.firm, 'morning_brief', 'Today in your firm',
        array_to_string(v_lines, '. ') || '.',
        jsonb_build_object('route', case when v_unc > 0 then '/employer?section=diary' else '/employer' end));
    exception when others then
      raise warning '[notify_office_morning_brief] %: %', r.firm, sqlerrm;
    end;
  end loop;
end;
$function$;
revoke all on function public.notify_office_morning_brief() from public, anon, authenticated;

do $$
begin
  perform cron.unschedule('office-morning-brief') where exists (select 1 from cron.job where jobname = 'office-morning-brief');
  -- 06:00 UTC = 7am in summer (BST), 6am in winter; before the crews set off either way.
  perform cron.schedule('office-morning-brief', '0 6 * * 1-5', 'select public.notify_office_morning_brief();');
end $$;
