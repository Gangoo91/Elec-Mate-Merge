-- ============================================================
-- Spark Projects — optional umbrella grouping for tasks, quotes,
-- certificates, RAMS, circuit designs, and site visits.
--
-- Key principle: project_id is NULLABLE everywhere. All entities
-- continue to work independently. A project is purely optional.
-- ============================================================

-- 1. Create spark_projects table (if not exists — may already exist from task tools)
create table if not exists public.spark_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  project_type text, -- 'rewire', 'eicr', 'new-build', 'maintenance', 'ev-charging', etc.
  status text not null default 'open'
    check (status in ('open', 'active', 'completed', 'cancelled')),
  priority text not null default 'normal'
    check (priority in ('low', 'normal', 'high', 'urgent')),
  customer_id uuid references public.customers(id) on delete set null,
  property_id uuid, -- references customer_properties if it exists
  location text,
  estimated_value numeric,
  start_date date,
  due_date date,
  completed_at timestamptz,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. RLS for spark_projects
alter table public.spark_projects enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'spark_projects' and policyname = 'Users can view own projects'
  ) then
    create policy "Users can view own projects"
      on public.spark_projects for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'spark_projects' and policyname = 'Users can insert own projects'
  ) then
    create policy "Users can insert own projects"
      on public.spark_projects for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'spark_projects' and policyname = 'Users can update own projects'
  ) then
    create policy "Users can update own projects"
      on public.spark_projects for update
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'spark_projects' and policyname = 'Users can delete own projects'
  ) then
    create policy "Users can delete own projects"
      on public.spark_projects for delete
      using (auth.uid() = user_id);
  end if;
end $$;

-- 3. Indexes for spark_projects
create index if not exists idx_spark_projects_user_status
  on public.spark_projects (user_id, status);

create index if not exists idx_spark_projects_customer
  on public.spark_projects (customer_id)
  where customer_id is not null;

-- 4. Updated_at trigger
create or replace function public.spark_projects_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists spark_projects_updated_at on public.spark_projects;
create trigger spark_projects_updated_at
  before update on public.spark_projects
  for each row
  execute function public.spark_projects_set_updated_at();

-- ============================================================
-- 5. Add nullable project_id to existing tables
-- All are nullable with ON DELETE SET NULL — nothing breaks.
-- ============================================================

-- spark_tasks
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'spark_tasks' and column_name = 'project_id'
  ) then
    alter table public.spark_tasks
      add column project_id uuid references public.spark_projects(id) on delete set null;
    create index idx_spark_tasks_project on public.spark_tasks (project_id) where project_id is not null;
  end if;
end $$;

-- quotes (also used as invoices)
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'quotes' and column_name = 'project_id'
  ) then
    alter table public.quotes
      add column project_id uuid references public.spark_projects(id) on delete set null;
    create index idx_quotes_project on public.quotes (project_id) where project_id is not null;
  end if;
end $$;

-- reports (certificates)
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'reports' and column_name = 'project_id'
  ) then
    alter table public.reports
      add column project_id uuid references public.spark_projects(id) on delete set null;
    create index idx_reports_project on public.reports (project_id) where project_id is not null;
  end if;
end $$;

-- rams_generation_jobs
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'rams_generation_jobs' and column_name = 'project_id'
  ) then
    alter table public.rams_generation_jobs
      add column project_id uuid references public.spark_projects(id) on delete set null;
    create index idx_rams_project on public.rams_generation_jobs (project_id) where project_id is not null;
  end if;
end $$;

-- circuit_design_jobs
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'circuit_design_jobs' and column_name = 'project_id'
  ) then
    alter table public.circuit_design_jobs
      add column project_id uuid references public.spark_projects(id) on delete set null;
    create index idx_circuit_design_project on public.circuit_design_jobs (project_id) where project_id is not null;
  end if;
end $$;

-- site_visits
do $$ begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'site_visits' and column_name = 'project_id'
  ) then
    alter table public.site_visits
      add column project_id uuid references public.spark_projects(id) on delete set null;
    create index idx_site_visits_project on public.site_visits (project_id) where project_id is not null;
  end if;
end $$;

-- ============================================================
-- 6. quiz_results table (for save_quiz_result / get_quiz_history)
-- ============================================================

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text not null,
  score integer not null check (score >= 0 and score <= 100),
  total_questions integer not null check (total_questions > 0),
  correct_answers integer not null check (correct_answers >= 0),
  category_breakdown jsonb,
  difficulty text,
  source text default 'whatsapp_quiz',
  created_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

create policy "Users can view own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

create index if not exists idx_quiz_results_user_topic
  on public.quiz_results (user_id, topic);

create index if not exists idx_quiz_results_user_created
  on public.quiz_results (user_id, created_at desc);

-- ============================================================
-- 7. Safe isolation records + electrician site diary
-- ============================================================

create table if not exists public.safe_isolation_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  location text not null,
  circuit_description text not null,
  supply_type text,
  isolation_point text,
  voltage_before numeric,
  voltage_after numeric,
  proving_unit_used boolean default false,
  lock_off_applied boolean default false,
  caution_notice_posted boolean default false,
  gs38_compliant boolean default false,
  notes text,
  date date not null default current_date,
  customer_id uuid references public.customers(id) on delete set null,
  job_id uuid,
  created_at timestamptz not null default now()
);

alter table public.safe_isolation_records enable row level security;

create policy "Users can view own safe isolation records"
  on public.safe_isolation_records for select
  using (auth.uid() = user_id);

create policy "Users can insert own safe isolation records"
  on public.safe_isolation_records for insert
  with check (auth.uid() = user_id);

create table if not exists public.electrician_site_diary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  summary text not null,
  location text,
  work_completed text,
  issues_encountered text,
  materials_used text,
  weather_conditions text,
  hours_worked numeric,
  customer_id uuid references public.customers(id) on delete set null,
  project_id uuid references public.spark_projects(id) on delete set null,
  photos text[] default '{}',
  created_at timestamptz not null default now()
);

alter table public.electrician_site_diary enable row level security;

create policy "Users can view own site diary"
  on public.electrician_site_diary for select
  using (auth.uid() = user_id);

create policy "Users can insert own site diary"
  on public.electrician_site_diary for insert
  with check (auth.uid() = user_id);

create index if not exists idx_electrician_site_diary_user_date
  on public.electrician_site_diary (user_id, date desc);
