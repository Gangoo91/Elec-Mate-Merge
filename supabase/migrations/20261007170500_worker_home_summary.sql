-- Worker Tools hub redesign (Andrew, 6 Oct): every card shows a live line,
-- and the stat strip shows numbers a worker cares about. One call, scoped to
-- the caller's OWN roster rows (my_employee_ids) — never anyone else's.
create or replace function public.get_worker_home()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with me as (
    select e.id, e.employer_id, e.name
      from public.employer_employees e
     where e.user_id = auth.uid()
       and e.employer_id is not null
       and lower(coalesce(e.status, '')) = 'active'
     order by e.created_at
     limit 1
  ),
  wk as (
    -- Monday of this week, UK time.
    select date_trunc('week', (now() at time zone 'Europe/London'))::date as monday
  ),
  open_shift as (
    select t.clock_in, j.title as job_title
      from public.employer_timesheets t
      join me on me.id = t.employee_id
      left join public.employer_jobs j on j.id = t.job_id
     where t.clock_out is null
     order by t.clock_in desc
     limit 1
  ),
  next_job as (
    select j.id, j.title, j.location, coalesce(a.start_date, j.start_date) as starts
      from public.employer_job_assignments a
      join me on me.id = a.employee_id
      join public.employer_jobs j on j.id = a.job_id
     where j.archived_at is null
       and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled', 'archived')
       and lower(coalesce(a.status, '')) not in ('removed', 'cancelled', 'completed')
     order by (coalesce(a.start_date, j.start_date) < current_date), coalesce(a.start_date, j.start_date) nulls last
     limit 1
  ),
  creds as (
    select q.qualification_name as name, q.expiry_date as due
      from public.employer_elec_id_qualifications q
      join public.employer_elec_id_profiles p on p.id = q.profile_id
      join public.employer_employees stub on stub.id = p.employee_id
     where stub.user_id = auth.uid() and q.expiry_date is not null
    union all
    select 'ECS card', p.ecs_expiry_date
      from public.employer_elec_id_profiles p
      join public.employer_employees stub on stub.id = p.employee_id
     where stub.user_id = auth.uid() and p.ecs_expiry_date is not null
  )
  select case when not exists (select 1 from me) then null else jsonb_build_object(
    'first_name', (select split_part(btrim(regexp_replace(coalesce(me.name, ''), '\(.*?\)', '', 'g')), ' ', 1) from me),
    'firm', (select coalesce(nullif(btrim(cp.company_name), ''), nullif(btrim(p.full_name), ''), 'Your employer')
               from me left join public.company_profiles cp on cp.user_id = me.employer_id
                       left join public.profiles p on p.id = me.employer_id),
    'open_shift', (select jsonb_build_object('clock_in', clock_in, 'job_title', job_title) from open_shift),
    'week_hours', (select round(coalesce(sum(t.total_hours), 0)::numeric, 1)
                     from public.employer_timesheets t, me, wk
                    where t.employee_id = me.id and t.date >= wk.monday and t.clock_out is not null
                      and lower(coalesce(t.status, '')) <> 'rejected'),
    'timesheets_waiting', (select count(*) from public.employer_timesheets t, me
                            where t.employee_id = me.id and t.status = 'Pending' and t.clock_out is not null),
    'timesheets_sent_back', (select count(*) from public.employer_timesheets t, me
                              where t.employee_id = me.id and t.status = 'Rejected'
                                and t.updated_at > now() - interval '14 days'),
    'expenses_waiting', (select jsonb_build_object('count', count(*), 'total', coalesce(sum(x.amount), 0))
                           from public.employer_expense_claims x, me
                          where x.employee_id = me.id and x.status = 'Pending'),
    'owed_to_you', (select coalesce(sum(x.amount), 0) from public.employer_expense_claims x, me
                     where x.employee_id = me.id and x.status = 'Approved' and x.paid_date is null),
    'next_leave', (select jsonb_build_object('start', l.start_date, 'end', l.end_date, 'type', l.type)
                     from public.employer_leave_requests l, me
                    where l.employee_id = me.id and l.status = 'Approved' and l.end_date >= current_date
                    order by l.start_date limit 1),
    'leave_waiting', (select count(*) from public.employer_leave_requests l, me
                       where l.employee_id = me.id and l.status = 'Pending'),
    'next_job', (select jsonb_build_object('id', id, 'title', title, 'location', location, 'starts', starts) from next_job),
    'jobs_active', (select count(distinct a.job_id) from public.employer_job_assignments a
                      join me on me.id = a.employee_id
                      join public.employer_jobs j on j.id = a.job_id
                     where j.archived_at is null
                       and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled', 'archived')),
    'tasks_open', (select count(*) from public.employer_job_tasks k, me
                    where k.assignee_employee_id = me.id and lower(coalesce(k.status, '')) not in ('done', 'completed')),
    'tasks_due', (select count(*) from public.employer_job_tasks k, me
                   where k.assignee_employee_id = me.id and lower(coalesce(k.status, '')) not in ('done', 'completed')
                     and k.due_date is not null and k.due_date <= current_date),
    'to_sign', (select count(*) from public.employer_job_pack_acknowledgements a, me
                 where a.employee_id = me.id and a.acknowledged_at is null),
    'kit_due', (select count(*) from public.employer_company_tools t, me
                 where t.assigned_to_employee_id = me.id
                   and (t.pat_due <= current_date + 14 or t.next_calibration <= current_date + 14)),
    'next_expiry', (select jsonb_build_object('name', name, 'due', due) from creds
                     where due >= current_date - 365 order by due limit 1),
    'kit_count', (select count(*) from public.employer_company_tools t, me
                   where t.assigned_to_employee_id = me.id),
    'reports_open', (select count(*) from public.job_issues i, me
                      where i.reported_by = me.id
                        and lower(coalesce(i.status, '')) not in ('resolved', 'closed'))
                  + (select count(*) from public.employer_incidents x, me
                      where x.reported_by = me.id::text
                        and lower(coalesce(x.status, '')) not in ('resolved', 'closed')),
    -- Mon..Sun hours for the week chart (completed shifts, not rejected).
    'week_days', (select jsonb_agg(jsonb_build_object('date', d.day, 'hours',
                    coalesce((select round(sum(t.total_hours)::numeric, 1)
                                from public.employer_timesheets t, me
                               where t.employee_id = me.id and t.date = d.day and t.clock_out is not null
                                 and lower(coalesce(t.status, '')) <> 'rejected'), 0)) order by d.day)
                    from wk, generate_series(wk.monday, wk.monday + 6, interval '1 day') g(dt),
                         lateral (select g.dt::date as day) d),
    -- "Coming up": dated things in the next 21 days, soonest first.
    'upcoming', coalesce((
      select jsonb_agg(u order by (u->>'date'), (u->>'kind')) from (
        select jsonb_build_object('kind', 'job', 'date', coalesce(a.start_date, j.start_date),
                                  'title', j.title, 'detail', j.location, 'id', j.id) u
          from public.employer_job_assignments a
          join me on me.id = a.employee_id
          join public.employer_jobs j on j.id = a.job_id
         where j.archived_at is null
           and coalesce(a.start_date, j.start_date) between current_date and current_date + 21
        union all
        select jsonb_build_object('kind', 'leave', 'date', l.start_date,
                                  'title', coalesce(l.type, 'Leave'),
                                  'detail', case when l.end_date > l.start_date
                                                 then 'Until ' || to_char(l.end_date, 'FMDD Mon') else 'One day' end,
                                  'id', l.id)
          from public.employer_leave_requests l, me
         where l.employee_id = me.id and l.status = 'Approved'
           and l.start_date between current_date and current_date + 21
        union all
        select jsonb_build_object('kind', 'task', 'date', k.due_date, 'title', k.title,
                                  'detail', 'Task due', 'id', k.id)
          from public.employer_job_tasks k, me
         where k.assignee_employee_id = me.id and lower(coalesce(k.status, '')) not in ('done', 'completed')
           and k.due_date between current_date and current_date + 21
        union all
        select jsonb_build_object('kind', 'expiry', 'date', c.due, 'title', c.name,
                                  'detail', 'Expires', 'id', null)
          from creds c
         where c.due between current_date and current_date + 21
        limit 12
      ) x), '[]'::jsonb)
  ) end
  from (select 1) one
$$;
revoke execute on function public.get_worker_home() from public, anon;
grant execute on function public.get_worker_home() to authenticated;
