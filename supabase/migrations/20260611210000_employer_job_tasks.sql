-- ============================================================================
-- ELE-1073 foundation — employer_job_tasks (Linear-style tickets on jobs)
--
-- The boss (or the AI breakdown, later) creates tickets on a job; assigned
-- workers see them in Worker Tools, flip status, comment and attach photos.
-- Comments thread through employer_job_comments via the new task_id column.
-- Notifications ride the Slice-4 trigger pattern; audit rides log_team_action.
-- ============================================================================

create table public.employer_job_tasks (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null default auth.uid() references public.profiles(id),
  job_id uuid not null references public.employer_jobs(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'Todo' check (status in ('Todo', 'In Progress', 'Blocked', 'Done')),
  priority text not null default 'Medium' check (priority in ('Low', 'Medium', 'High', 'Urgent')),
  assignee_employee_id uuid references public.employer_employees(id) on delete set null,
  due_date date,
  position integer not null default 0,
  photos jsonb not null default '[]'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.employer_job_tasks enable row level security;

create policy "Employer owns tasks"
  on public.employer_job_tasks
  for all to authenticated
  using (employer_id = (select auth.uid()))
  with check (employer_id = (select auth.uid()));

create policy "Worker reads tasks on assigned jobs"
  on public.employer_job_tasks
  for select to authenticated
  using (public.is_assigned_to_job(job_id));

create policy "Worker updates own tasks"
  on public.employer_job_tasks
  for update to authenticated
  using (assignee_employee_id in (select public.my_employee_ids()))
  with check (
    assignee_employee_id in (select public.my_employee_ids())
    and public.is_assigned_to_job(job_id)
  );

create index idx_job_tasks_job on public.employer_job_tasks (job_id, position);
create index idx_job_tasks_assignee on public.employer_job_tasks (assignee_employee_id);
create index idx_job_tasks_employer_status on public.employer_job_tasks (employer_id, status);

alter table public.employer_job_comments
  add column task_id uuid references public.employer_job_tasks(id) on delete cascade;
create index idx_job_comments_task on public.employer_job_comments (task_id) where task_id is not null;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
create trigger touch_job_tasks before update on public.employer_job_tasks
  for each row execute function public.touch_updated_at();

-- ─── Notifications (Slice-4 pattern) ────────────────────────────────────────

create or replace function public.trg_notify_task_assignment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_worker uuid;
  v_job text;
begin
  if new.assignee_employee_id is not null
     and (tg_op = 'INSERT' or new.assignee_employee_id is distinct from old.assignee_employee_id) then
    select e.user_id into v_worker from employer_employees e where e.id = new.assignee_employee_id;
    select j.title into v_job from employer_jobs j where j.id = new.job_id;
    perform team_push(
      v_worker,
      'New task: ' || new.title,
      coalesce(v_job, 'Job') || ' — ' || new.priority || ' priority',
      jsonb_build_object('task_id', new.id, 'job_id', new.job_id, 'route', '/electrician/worker-tools')
    );
  end if;
  return new;
end;
$$;

drop trigger if exists notify_task_assignment on public.employer_job_tasks;
create trigger notify_task_assignment
  after insert or update of assignee_employee_id on public.employer_job_tasks
  for each row execute function public.trg_notify_task_assignment();

create or replace function public.trg_notify_task_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text;
begin
  if new.status is distinct from old.status then
    if new.status = 'Done' and old.status != 'Done' then
      new.completed_at := now();
    end if;

    if auth.uid() is distinct from new.employer_id and new.status in ('Done', 'Blocked') then
      select e.name into v_name from employer_employees e where e.id = new.assignee_employee_id;
      perform notify_employer_bell(
        new.employer_id,
        'task_' || lower(replace(new.status, ' ', '_')),
        'Task ' || lower(new.status),
        coalesce(v_name, 'A team member') || ' marked "' || new.title || '" ' || lower(new.status),
        jsonb_build_object('task_id', new.id, 'job_id', new.job_id)
      );
      perform team_push(
        new.employer_id,
        'Task ' || lower(new.status),
        coalesce(v_name, 'A team member') || ': ' || new.title,
        jsonb_build_object('task_id', new.id, 'route', '/employer?section=jobs')
      );
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists notify_task_status on public.employer_job_tasks;
create trigger notify_task_status
  before update of status on public.employer_job_tasks
  for each row execute function public.trg_notify_task_status();

create or replace function public.trg_notify_task_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_task record;
  v_worker uuid;
begin
  if new.task_id is not null then
    select t.title, t.employer_id, t.assignee_employee_id into v_task
    from employer_job_tasks t where t.id = new.task_id;
    if v_task is null then return new; end if;

    if auth.uid() = v_task.employer_id then
      select e.user_id into v_worker from employer_employees e where e.id = v_task.assignee_employee_id;
      perform team_push(v_worker, 'Comment on: ' || v_task.title,
        left(new.content, 100),
        jsonb_build_object('task_id', new.task_id, 'route', '/electrician/worker-tools'));
    else
      perform notify_employer_bell(v_task.employer_id, 'task_comment',
        'Comment on task',
        coalesce(new.author_name, 'A team member') || ' on "' || v_task.title || '": ' || left(new.content, 80),
        jsonb_build_object('task_id', new.task_id));
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists notify_task_comment on public.employer_job_comments;
create trigger notify_task_comment
  after insert on public.employer_job_comments
  for each row execute function public.trg_notify_task_comment();

-- ─── Audit + realtime ────────────────────────────────────────────────────────
-- log_team_action's table switch gains employer_job_tasks (full body in DB —
-- identical to 20260611200000's plus the one case line)

create trigger audit_team_action
  after insert or update or delete on public.employer_job_tasks
  for each row execute function public.log_team_action();

alter publication supabase_realtime add table public.employer_job_tasks;
