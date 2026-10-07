-- ELE-2007 — "Due today" reminder for a worker's task, the morning it is due.
--
-- Runs inside the existing daily cron (job 147, 08:15 UTC = 09:15 BST / 08:15
-- GMT) rather than a parallel job. De-duplicated by employer_task_due_sent, not
-- by user_notifications/employer_notifications (people clear those).
-- Only the assignee's ACTIVE roster row at the task's own firm is reminded, so
-- a firm you have left never pings you.

create table if not exists public.employer_task_due_sent (
  task_id uuid not null references public.employer_job_tasks(id) on delete cascade,
  due_date date not null,
  sent_at timestamptz not null default now(),
  primary key (task_id, due_date)
);

alter table public.employer_task_due_sent enable row level security;
revoke all on public.employer_task_due_sent from public, anon, authenticated;

comment on table public.employer_task_due_sent is
  '[EMPLOYER HUB → WORKER TOOLS] One row per task "due today" reminder ever sent, so clearing the bell can''t make it repeat and a moved due date reminds again. Scope: task_id → employer_job_tasks. Used by: notify_task_due_reminders (cron 147). Rule: server-only, no client policies.';

create or replace function public.notify_task_due_reminders()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_sent integer := 0;
begin
  for r in
    select t.id, t.title, t.priority, t.due_date, t.job_id, e.user_id, e.id as employee_id,
           j.title as job_title
      from public.employer_job_tasks t
      join public.employer_employees e on e.id = t.assignee_employee_id
      left join public.employer_jobs j on j.id = t.job_id
     where t.due_date = v_today
       and coalesce(t.status, '') <> 'Done'
       and e.user_id is not null
       and e.employer_id = t.employer_id
       and lower(coalesce(e.status, '')) = 'active'
       and (j.id is null or (j.archived_at is null
            and lower(coalesce(j.status, '')) not in ('completed', 'complete', 'cancelled')))
  loop
    begin
      insert into public.employer_task_due_sent (task_id, due_date)
      values (r.id, r.due_date)
      on conflict do nothing;
      continue when not found;

      perform public.worker_notify(
        r.user_id,
        'task_due',
        'Due today: ' || r.title,
        coalesce(r.job_title || ' · ', '') || coalesce(r.priority, 'Medium') || ' priority',
        jsonb_build_object(
          'task_id', r.id,
          'job_id', r.job_id,
          'employee_id', r.employee_id,
          'route', '/electrician/worker-tools/tasks?task=' || r.id
        )
      );
      v_sent := v_sent + 1;
    exception when others then
      raise warning '[notify_task_due_reminders] task %: %', r.id, sqlerrm;
    end;
  end loop;
  return v_sent;
exception when others then
  raise warning '[notify_task_due_reminders] %', sqlerrm;
  return v_sent;
end;
$$;

revoke all on function public.notify_task_due_reminders() from public, anon, authenticated;

-- Extend the existing daily job (147) — reminders first; the function swallows
-- its own errors so the compliance run always follows.
select cron.alter_job(
  147,
  command := 'select public.notify_task_due_reminders(); select public.notify_compliance_expiries();'
)
where exists (select 1 from cron.job where jobid = 147
               and command = 'select public.notify_compliance_expiries()');
