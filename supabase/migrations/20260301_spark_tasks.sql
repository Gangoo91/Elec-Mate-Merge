-- ============================================================
-- Spark Tasks — Solo to-do system for electricians (V1)
-- Named spark_tasks to avoid conflict with existing RAMS tasks table
-- ============================================================

-- 1. Main tasks table
create table if not exists public.spark_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  details text,
  status text not null default 'open'
    check (status in ('open', 'done', 'snoozed', 'cancelled')),
  priority text not null default 'normal'
    check (priority in ('low', 'normal', 'high', 'urgent')),
  due_at timestamptz,
  snoozed_until timestamptz,
  customer_id uuid references public.customers(id) on delete set null,
  location text,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

-- 2. Audit / event log
create table if not exists public.spark_task_events (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.spark_tasks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null
    check (event_type in (
      'created', 'updated', 'completed', 'reopened',
      'snoozed', 'cancelled', 'deleted'
    )),
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- 3. RLS
alter table public.spark_tasks enable row level security;
alter table public.spark_task_events enable row level security;

create policy "Users can view own tasks"
  on public.spark_tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.spark_tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on public.spark_tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on public.spark_tasks for delete
  using (auth.uid() = user_id);

create policy "Users can view own task events"
  on public.spark_task_events for select
  using (auth.uid() = user_id);

create policy "Users can insert own task events"
  on public.spark_task_events for insert
  with check (auth.uid() = user_id);

-- 4. Indexes
create index if not exists idx_spark_tasks_user_status
  on public.spark_tasks (user_id, status);

create index if not exists idx_spark_tasks_user_due
  on public.spark_tasks (user_id, due_at)
  where status = 'open';

create index if not exists idx_spark_tasks_customer
  on public.spark_tasks (customer_id)
  where customer_id is not null;

create index if not exists idx_spark_task_events_task
  on public.spark_task_events (task_id);

-- 5. Updated_at trigger (reuse existing function or create one)
create or replace function public.spark_tasks_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger spark_tasks_updated_at
  before update on public.spark_tasks
  for each row
  execute function public.spark_tasks_set_updated_at();
